<template>
  <div class="button_upload">
    <el-button @click="choseFile" size="small" type="primary" :loading="loading">{{btnTextComputer}}</el-button>
    <el-input type="text" :value="inputValue" class="hidden-input"></el-input>
    <p class="help-block m-b-none">{{tips}}</p>
    <component :is="listType | typeFilter" :file-array="imgArray" @delete-item="deleteItem"></component>
  </div>
</template>
<script>
import pictureList from './list/picture'
import textList from './list/text'
import {
  checkAttchmentType,
  checkFileSize
} from '@/common/utils'

export default {
  name: 'buttonUpload',
  computed: {
    imgArray () {
      if (this.maxLength > 1) {
        return this.value.map(item => ({
          url: item,
          name: this.fileKey(item)
        }))
      }
      if (this.value) {
        return [{
          url: this.value,
          name: this.fileKey(this.value)
        }]
      }
      return []
    },
    sizeObject () {
      const result = new RegExp('(\\d+)([m|g|kb])', 'i').exec(this.maxSize)
      return {
        number: result[1],
        unit: result[2] || 'kb'
      }
    },
    btnTextComputer () {
      return this.loading ? '上传中...' : this.btnText
    },
    inputValue () {
      if (this.value instanceof Array) {
        return this.value.join('')
      }
      return this.value
    }
  },
  data () {
    return {
      loading: false
    }
  },
  filters: {
    typeFilter (type) {
      switch (type) {
        case 'text':
          return 'textList'
        case 'picture':
        default:
          return 'pictureList'
      }
    }
  },
  props: {
    // 按钮文案
    btnText: {
      type: String,
      default: '点击上传'
    },
    // 最大文件数
    maxLength: {
      type: Number,
      default: 1
    },
    // 当是一张的时候value是字符串
    // 当是多张的时候value是数组
    value: [String, Array],
    // input[file]的name属性
    name: {
      type: String,
      default: 'file'
    },
    tips: {
      type: String,
      default: ''
    },
    listType: {
      type: String,
      default: 'picture'
    },
    maxSize: {
      // size 需求要求大小类型 type (默认KB,可选M,G,KB) 单位大小写不区分
      // 默认为 5M
      type: String,
      default: '5M'
    },
    fileType: {
      // 文件对象file 文件类型type(pdf、video、audio、image)
      // 默认image
      type: String,
      default: 'image'
    }
  },
  methods: {
    fileKey (filePath) {
      const result = new RegExp('/([^/]+$)', 'g').exec(filePath)
      return result ? result[1] : filePath
    },
    deleteItem (index) {
      if (this.maxLength > 1) {
        const imgArray = [...this.value]
        imgArray.splice(index, 1)
        this.$emit('input', imgArray)
      } else {
        this.$emit('input', '')
      }
    },
    choseFile () {
      // 判断文件数是不是超过最大文件数
      if (this.maxLength > 1) {
        if (this.value.length >= this.maxLength) {
          return this.$message.error(`您最多只能上传${this.maxLength}个文件！`)
        }
      }
      const file = document.createElement('input')
      file.type = 'file'
      file.name = this.name
      file.onchange = this.handlerFileChange.bind(this)
      file.click()
    },
    handlerFileChange (e) {
      const fileInput = e.target
      const file = fileInput.files[0]
      if (!file) {
        return this.$message.error('未选中任何文件！')
      } else if (!checkFileSize(e, this.sizeObject.number, this.sizeObject.unit)) {
        return this.$message.error(`文件不能超过${this.maxSize}！`)
      } else if (!checkAttchmentType([file], this.fileType)) {
        return this.$message.error('文件格式不对！')
      }
      const form = document.createElement('form')
      form.appendChild(fileInput)
      const fileForm = new FormData(form)
      this.loading = true
      this.$store.dispatch('OSS_FILE', fileForm)
      .then(res => {
        this.loading = false
        return this.resolvePath(res)
      }).catch(() => {
        this.loading = false
      })
    },
    resolvePath (res) {
      this.$emit('on-upload-success', res)
      if (res[0]) {
        if (this.maxLength > 1) {
          const imgArray = [...this.value]
          imgArray.push(res[0].fileUrl)
          this.$emit('input', imgArray)
        } else {
          this.$emit('input', res[0].fileUrl)
        }
        return res[0]
      }
    }
  },
  components: {
    pictureList,
    textList
  }
}
</script>
<style lang="less">
.hidden-input {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>

