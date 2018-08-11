<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  import '../../static/ue/ueditor.config.js'
  import '../../static/ue/ueditor.all.js'
  import '../../static/ue/lang/zh-cn/zh-cn.js'
  export default {
    name: 'UE',
    data () {
      return {
        editor: this.content
      }
    },
    props: {
      content: {
        type: String
      },
      config: {
        type: Object
      }
    },
    beforeCreate () {
      window.UEDITOR_CONFIG.uploadSetting.uploadFn = (form, success, error) => {
        this.$store.dispatch('OSS_FILE', form).then(res => {
          if (typeof success === 'function') {
            success(res[0].fileUrl)
          }
        }).catch((e) => {
          if (typeof error === 'function') {
            error(e)
          }
        })
      }
    },
    mounted () {
      const _this = this
      this.editor = window.UE.getEditor('editor', this.config)
      this.editor.addListener('ready', function () {
        _this.editor.setContent(_this.content)
      })
    },
    methods: {
      getUEContent () {
        return this.editor.getContent()
      },
      getUEText () {
        return this.editor.body.innerText
      }
    },
    destroyed () {
      this.editor.destroy()
    }
  }
</script>
