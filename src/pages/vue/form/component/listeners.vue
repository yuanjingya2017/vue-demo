<template>
  <label>
    {{ label }}
    <!-- https://www.jb51.net/article/132371.htm -->
    <input
      v-bind="$attrs"
      v-bind:value="value"
      v-on="inputListeners"
    >
  </label>
</template>

<script>
export default {
  name: 'listenerComponent',
  methods: {
  },
  data () {
    console.log('listeners in listeners.vue', this.$listeners)
    return {}
  },
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      /**
       * vm.$listeners
      类型：{ [key: string]: Function | Array<Function> }

      只读

      详细：

      包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。
      它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。
       */
      console.log(this.$listeners)
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            console.log('input')
            vm.$emit('input', event.target.value)
          },
          focus: function (event) {
            console.log('focus')
          }
        }
      )
    }
  }
}
</script>

<style>

</style>
