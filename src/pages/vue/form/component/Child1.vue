<template>
 <div class="child-1">
  <p>in child1:</p>
  <p>props: {{pChild1}}</p>
  <p>$attrs: {{$attrs}}</p>
  <!-- inheritAttrs
      2.4.0 新增

      类型：boolean

      默认值：true

      详细：

      默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 
      将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。
      当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。
      通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。
      而通过 (同样是 2.4 新增的) 实例属性 $attrs 可以让这些特性生效，
      且可以通过 v-bind 显性的绑定到非根元素上。

      注意：这个选项不影响 class 和 style 绑定。 -->

      <!-- 如果你不希望组件的根元素继承特性，你可以设置在组件的选项中设置 inheritAttrs: false。 -->
  <br>
  <!-- C组件中能直接触发test的原因在于 B组件调用C组件时 使用 v-on 绑定了$listeners 属性 -->
  <!-- 通过v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的） -->
  <child2 v-bind="$attrs" v-on="$listeners"></child2>
  <!-- 使用 v-bind=”$attrs”, 将父组件中不被认为 props特性绑定的属性传入子组件中，通常配合 interitAttrs 选项一起使用。 -->
 </div>
</template>
<script>
  import Child2 from './Child2.vue'
  export default {
    props: ['pChild1'],
    data () {
      console.log('in child1 $listeners', this.$listeners)
      return {}
    },
    inheritAttrs: false,
    components: { Child2 },
    mounted () {
      this.$emit('test1')
    }
  }
</script>
