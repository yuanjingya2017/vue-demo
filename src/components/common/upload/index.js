import button from './button'

export default {
  props: {
    // 文件上传类型
    // 目前支持 button
    type: {
      type: String
    },
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
  render (upload) {
    switch (this.type) {
      case 'button':
      default:
        return upload(button, {
          props: {
            btnText: this.btnText,
            maxLength: this.maxLength,
            value: this.value,
            name: this.name,
            tips: this.tips,
            listType: this.listType,
            maxSize: this.maxSize,
            fileType: this.fileType
          },
          on: {
            input: (v) => this.$emit('input', v)
          }
        })
    }
  }
}
