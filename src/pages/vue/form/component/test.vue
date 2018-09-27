<template>
  <div>
    value in components: {{value}}
    <br>
    <input type="text" :value="value" v-on:input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'textComponent',
  data () {
    return {
    }
  },
  props: ['value']
}
</script>

<style>

</style>
