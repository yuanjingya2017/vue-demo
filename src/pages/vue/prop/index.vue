<template>
  <div class="prop_test">
    <div class="module">
       <!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
      <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
      <test-v-bind :display="true"></test-v-bind>
    </div>
    <div class="module">
      <!-- 将一个对象传到子组件里面 -->
      <!-- 自组需要进行接收 -->
      <test-obj v-bind="obj"></test-obj>
    </div>
    <div class="module">
       <!-- 规定 必须给子组件传的值 -->
      <props-require :PersonA=testPerson :propB="1" :propC="'ssss'"></props-require>
    </div>
  </div>
</template>

<script>
import {Person} from '@/common/utils'
import testVBind from './coms/boolean'
import testObj from './coms/testObj'
import propsRequire from './coms/propsRequire'
export default {
  name: 'porpTest',
  data () {
    return {
      Person,
      obj: {
        title: 'testObj',
        id: '1'
      },
      testPerson: new Person()
    }
  },
  components: {
    testVBind,
    testObj,
    propsRequire
  }
}
</script>

<style lang="less">
.prop_test{

}
</style>
