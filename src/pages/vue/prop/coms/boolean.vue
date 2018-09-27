<template>
  <div v-if="display">
    测试v-bind: 和 不用的时候对应的反应
  </div>
</template>

<script>
export default {
  name: 'propBoolean',
  props: {
    display: Boolean
  }
}
</script>

<style>

</style>
