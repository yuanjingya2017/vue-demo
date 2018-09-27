<template>
  <upload-button v-bind="$attrs" />
</template>
<script>
import uploadButton from './button'

export default {
  inheritAttrs: false,
  props: {
    // 文件上传类型
    // 目前支持 button
    type: {
      type: String,
      default: 'button'
    }
  },
  // render (upload) {
  //   console.log('this.$attrs', this.$attrs)
  //   switch (this.type) {
  //     case 'button':
  //     default:
  //       return upload(button, {
  //         props: {
  //           ...this.$attrs
  //         },
  //         on: {
  //           input: (v) => this.$emit('input', v)
  //         }
  //       })
  //   }
  // },
  components: {
    uploadButton
  }
}

</script>
