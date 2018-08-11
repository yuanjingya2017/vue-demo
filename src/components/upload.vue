<template>
  <div class="nb-upload-wrapper hauto relative">
    <el-upload
      v-if="$store.state.user.account"
      ref="nbUpload"
      class="nb-upload"
      :class="klass"
      :action="API"
      :disabled="disabled"
      :data="merge(postParams, {staffId: $store.state.user.account.id})"
      :show-file-list="showFileList"
      :list-type="listType"
      :before-upload="beforeUpload"
      :on-preview="preview"
      :on-remove="onRemove"
      :on-change="change"
      :on-progress="progress"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :file-list="fileList">
      <template v-if="isEmpty($slots)">
        <button class="btn btn-outline btn-sm btn-default " type="button" :disabled="disabled">
          <i class="fa fa-upload"></i> {{btnName}}
        </button>
        <div slot="tip" class="el-upload__tip" v-if="!isEmpty(tips)">{{tips}}</div>
      </template>
      <template>
        <template v-if="$slots.default">
          <slot></slot>
          <template v-if="!$slots.tips">
            <div slot="tip" class="el-upload__tip" v-if="!isEmpty(tips)">{{tips}}</div>
          </template>
        </template>
        <template v-else>
          <slot name="button"></slot>
          <slot name="tips"></slot>
          <a style="visibility:hidden" v-if="number == 1">PLACEHOLDER</a>
          <template v-else>
            <a class="up-placeholder"
              v-for="(itm, idx) in fileList"
              :key="idx"
              :style="idx == 0 ? {marginTop: '4px'}:''"></a>
          </template>
        </template>
      </template>
    </el-upload>
    <template v-if="$slots.noselect">
      <div class="upload-noselect" :class="number == 0 || number > 1 ? 'multiple-noselect' : ''">
        <slot name="noselect"></slot>
      </div>
    </template>
    <div class="uploading-tips" v-if="uploading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
import {Upload} from 'element-ui'
import {
  remove,
  each,
  merge,
  isEmpty
} from 'lodash'
import {COOKIE} from '@/common/const'
export default {
  name: 'fileUpload',
  props: {
    klass: {
      type: String,
      default: ''
    },
    extDatas: {
      type: Object,
      default: function () {
        return null
      }
    },
    listType: {
      type: String,
      default: 'text'
    },
    fileName: {
      type: String,
      default: 'file'
    },
    btnName: {
      type: String,
      default: '添加附件'
    },
    tips: {
      type: String,
      default: ''
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    api: {
      type: String,
      default: '/api/v1/$tenant/storage/file/upload/and/store'
    },
    postParams: {
      type: Object,
      default () {
        return {}
      }
    },
    // 允许上传的数量
    number: {
      type: Number,
      default: 0
    },
    // 允许上传文件大小(单位：MB)
    size: {
      type: Number,
      default: 10
    },
    accept: {
      type: String,
      default: null
    },
    fileList: {
      type: Array,
      default () {
        return [
          /* {name: '', url: ''} */
        ]
      }
    },
    autoReset: {
      type: Boolean,
      default: false
    },
    before: {
      type: Function,
      default () {}
    },
    error: {
      type: Function,
      default () {}
    },
    remove: {
      type: Function,
      default () {}
    },
    preview: {
      type: Function,
      default () {}
    },
    change: {
      type: Function,
      default () {}
    },
    progress: {
      type: Function,
      default () {}
    },
    success: {
      type: Function,
      default () {}
    }
  },
  data () {
    return {
      API: null,
      disabled: false,
      uploading: false,
      currentFileList: [],
      merge,
      isEmpty
    }
  },
  components: {
    ElUpload: Upload
  },
  watch: {
    fileList: {
      deep: true,
      handler (list) {
        if (this.fileList.length) {
          // 针对初始化数据中fileList里没有uid的file自动生成uid
          each(this.fileList, file => {
            file.uid = 'uid-' + Date.now()
          })
        }
        this.currentFileList = this.fileList.slice()
      }
    }
  },
  created () {
    let tenant = this.$cookie.get(COOKIE.KEY_TENANT)
    this.API = `${this.api}?access_token=${this.$store.state.user.token}`
    this.API = this.API.replace('/$tenant/', `/${tenant}/`)
  },
  methods: {
    beforeUpload (file) {
      if (!this.postParams.ownerType || this.postParams.ownerType === '') {
        this.$message.warning('请先选择文件类型')
        return false
      }
      // check number
      if (!this.checkNumber(file)) {
        this.$message.warning(`最多只能上传${this.number}个`)
        return false
      }

      // check ext
      if (!this.checkExt(file)) {
        this.$message.warning('上传文件格式错误')
        return false
      }

      // check size
      if (!this.checkSize(file)) {
        this.$message.warning(`文件大小不能超过${this.size}MB`)
        return false
      }

      this.uploading = true
      this.before(file)
      this.currentFileList.push(file)
      return true
    },
    onRemove (file, fileList) {
      if (!file) return
      this.remove(file, fileList)
      // 清除删掉的文件
      remove(this.currentFileList, r => r.uid === file.uid)
    },
    checkNumber (file) {
      if (this.number === 0) {
        return true
      }
      return this.currentFileList.length < this.number
    },
    checkExt (file) {
      if (!this.accept) return true
      let arrAccept = file.name.split('.')
      let length = file.name.split('.').length
      let accept = arrAccept[length - 1].toUpperCase()
      let arr = this.accept.toUpperCase().split('|')

      if (accept === 'XLS' || accept === 'XLSX') {
        accept = 'EXCEL'
      } else if (accept === 'DOC' || accept === 'DOCX') {
        accept = 'WORD'
      }

      return arr.indexOf(accept) > -1
    },
    checkSize (file) {
      return file.size / 1024 / 1024 <= this.size
    },
    uploadError (err, file, fileList) {
      console.log('err:', err)
      this.$refs.nbUpload.abort(file)
      this.uploading = false
      this.currentFileList.pop()
      this.error(err, file, fileList)
    },
    uploadSuccess (res, file, fileList) {
      this.uploading = false
      this.success(res, file, fileList, this.extDatas)
    }
  }
}
</script>
<style lang="less">
.nb-upload-wrapper {
  .upload-noselect {
    position: absolute;
    z-index: 999;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    background-color: #fff;
    width: 100%;
    ul {
      li {
        overflow: hidden;
        > a {
          display: inline-block;
          width: 80%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-indent: 0;
        }
        span {
          text-indent: 0;
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translate(0, -50%);
          cursor: pointer;
          transition: all .2s;
        }
      }
    }
    &.multiple-noselect {}
  }
  .uploading-tips {
    display: inline-block;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    opacity: .7;
    cursor: default;
    padding-left: 70px;
    background-color: #fff;
  }
  .up-placeholder {
    display: block;
    width: 100%;
    clear: both;
    &:after {
      content: "";
      display: block;
      height: 24px;
    }
  }
}
.nb-upload {
  position: relative;
  .el-upload__tip {
    color: #aaaaaa;
  }
  text-align: left;
  .btn-upload-icon {
    transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    -moz-transform: rotateZ(45deg);
    -ms-transform: rotateZ(45deg);
    -o-transform: rotateZ(45deg);
  }
}
</style>
