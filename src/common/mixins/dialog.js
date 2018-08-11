export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  mixins: [],
  watch: {
    dialogVisible (v) {
      this.$emit('update:visible', v)
    },
    visible (v) {
      this.dialogVisible = v
    }
  },
  props: ['visible'],
  methods: {
    close (submit = false, params) {
      (submit === true) && this.$emit('on-submit', params)
      this.dialogVisible = false
    }
  }
}
