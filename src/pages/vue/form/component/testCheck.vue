<template>
  <!-- https://www.jianshu.com/p/4147d3ed2e60 -->
  <input type="checkbox" :checked="value" v-on:change="test">
</template>

<script>
export default {
  name: 'checkboxTest',
  props: ['value'],
  data () {
    return {}
  },
  methods: {
    test (event) {
      console.log(event.target.value)
      console.log(this.value)
      this.$emit('input', event.target.checked)
    }
  }
}
</script>

<style>

</style>
