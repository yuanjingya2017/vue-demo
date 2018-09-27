<template>
  <div>
    <input type="text" v-model="newTitle">
    <button v-if="display[0]" @click="passData">pass data</button>
    <button v-if="display[1]" @click="passData2">test titlesync</button>
    <button v-if="display[2]" @click="passData1">sync</button>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    display: {
      type: Array,
      default: [0, 0, 0]
    }
  },
  data  () {
    return {
      newTitle: ''
    }
  },
  methods: {
    passData () {
      this.$emit('update:title', 'test title')
    },
    passData2 () {
      this.$emit('update:titlesync', 'test titlesync')
    },
    passData1 () {
      this.$emit('update:doc', {
        title: this.newTitle,
        titlesync: 'test titlesync'
      })
    }
  }
}
</script>

<style>

</style>
