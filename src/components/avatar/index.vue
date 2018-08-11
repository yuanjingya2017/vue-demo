<template>
  <el-dialog class="dialog-small"
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="visiable"
    :before-close="close">
    <div class="dialog-avatar" v-if="showUpload">
      <nb-upload class="no-uplist"
        :class="uploading ? 'up-to-down' : ''"
        accept="PNG|JPG|JPEG"
        :number="100"
        :size="10"
        :fileList="fileList"
        :postParams="{ownerType}"
        :progress="progress"
        :error="(errs, file) => {
          uploading = false
          $message.error(`${file.name} 上传失败`)
        }"
        :success="(res) => {
          uploading = false
          fileList.push(res.data)
          uploaded = res.data.url
          showUpload = false
          showReUpload = true
          imgData = res.data
        }">
        <a class="btn btn-primary"
          style="width: 200px;">上传图片</a>
      </nb-upload>
      <p v-if="!uploading">请上传PNG/JPG/JPEG格式图片文件，不超过10M</p>
    </div>
    <div class="dialog-avatar" v-else>
      <div v-if="uploaded || url" style="width: 100%">
        <croppr
          :img="uploaded || url"
          @update="cropprUpdate"></croppr>
      </div>
    </div>
    <div class="nb-form-footer">
      <div class="row">
        <div class="col-lg-12 align-right">
          <button type="button" class="btn btn-primary btn-outline mr10"
            @click="close()">取消</button>
          <template v-if="type == 'create'">
            <button type="submit" class="btn btn-outline btn-primary btn-hover-nobg mr10 animated fadeInLeft"
              v-if="showReUpload"
              @click="reUpload">重新上传</button>
            <button type="submit" class="btn btn-primary"
              :disabled="!newUrl"
              @click="save">{{saveBtn}}</button>
          </template>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  isEmpty
} from 'lodash'
import NbUpload from '@/components/upload'
import Croppr from '@/components/croppr'
export default {
  name: 'AvatarForm',
  props: {
    visiable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '上传LOGO'
    },
    type: {
      type: String,
      default: 'create'
    },
    ownerType: {
      type: String,
      default: 'Enterprise'
    },
    url: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 210
    },
    height: {
      type: Number,
      default: 210
    },
    saveBtn: {
      type: String,
      default: '保存'
    }
  },
  data () {
    return {
      isEmpty,
      fileList: [],
      showUpload: true,
      showReUpload: false,
      uploading: false,
      newUrl: null,
      uploaded: null,
      imgData: null
    }
  },
  components: {
    NbUpload,
    Croppr
  },
  created () {
    this.uploading = false
    this.uploaded = null
  },
  watch: {
    visiable (v) {
      this.showUpload = true
      if (v) {
        this.newUrl = null
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    progress () {
      this.uploading = true
    },
    deleteFile (idx) {
      this.fileList.splice(idx, 1)
      this.datas.businessPlan = null
    },
    reUpload () {
      this.newUrl = null
      this.showUpload = true
    },
    cropprUpdate (value, url) {
      this.newUrl = url
    },
    save () {
      if (!this.newUrl) return
      let _url = `,image/resize,m_fixed,h_${this.height},w_${this.width}`
      let url = this.newUrl + _url
      let obj = null
      if (this.imgData) {
        this.imgData.url = url
        obj = this.imgData
      }
      this.$emit('success', url, obj)
    }
  }
}
</script>

<style lang="less">
@import './style.less';
</style>
