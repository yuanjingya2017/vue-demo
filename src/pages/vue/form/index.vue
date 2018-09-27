<template>
  <div class="form_bind">
    <div class="module">
      修饰符：
      使用 .lazy 和不使用的情况对比：
      <!-- 在“change”时而非“input”时更新 失焦情况下更新-->
      <input type="text" v-model.lazy="msg">
      {{msg}}
      <br>
      使用.number 将用户的输入值转为数值类型
      <input type="number" v-model.number="age">
      <input type="number" v-model="age">
      {{age}}
      <br>
      使用.trim 过滤用户输入的首尾空白字符
      <input v-model.trim="text">
      <span style="background: red;">{{text}}</span>
    </div>
    <div class="module">
      <!-- 
        为了让它正常工作，这个组件内的 <input> 必须：
        将其 value 特性绑定到一个名叫 value 的 prop 上
        在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
      -->
      {{componentsData}}
      <test v-model="componentsData"></test>
    </div>
    <div class="module">
      <div id='example-3'>
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
      </div>
      type为checkBox的时候，value可能用作他用，所以把value的值给checked，testCheck:{{checkData}}
      <test-check v-model="checkData"></test-check>
      <!-- 推荐你始终使用 kebab-case 的事件名 -->
      <div v-for="(item, index) in ckData" :key="item.value">
        {{item.name}}
        <test-prop :key="item.value" :value="item.value" v-model="lovingVue[index]"></test-prop>
      </div>
      {{lovingVue}}
    </div>
    <div class="module">
      <!-- 你可能有很多次想要在一个组件的根元素上直接监听一个原生事件
      你可以使用 v-on 的 .native 修饰符： -->
      <base-input v-on:test="onFather" v-on:focus.native="onFocus"></base-input>
    </div>
    <div class="module">
      <child1
        :p-child1="child1"
        :p-child2="child2"
        v-on:test1="onTest1"
        v-on:test2="onTest2"> 
        <!-- //此处监听了两个事件，可以在B组件或者C组件中直接触发 -->
      </child1>
    </div>
    <upload
      v-model="file"
      :max-length=2
    ></upload>
  </div>
</template>

<script>
import test from './component/test'
import upload from '@/components/common/upload/index.vue'
import testProp from './component/testProp'
import baseInput from './component/listeners'
import Child1 from './component/Child1.vue'
import testCheck from './component/testCheck.vue'
export default {
  name: 'formBind',
  data () {
    return {
      checkData: 'checkData',
      child1: '111',
      child2: '222',
      file: [],
      checkedNames: [],
      ckData: [
        {name: 'a', value: 1},
        {name: 'b', value: 2},
        {name: 'c', value: 3},
        {name: 'd', value: 4}
      ],
      msg: '',
      age: '',
      text: '',
      componentsData: '',
      lovingVue: []
    }
  },
  components: {
    test,
    testProp,
    baseInput,
    Child1,
    testCheck,
    upload
  },
  methods: {
    onFather () {
      console.log('test running')
    },
    onTest1 () {
      console.log('test1 running...')
    },
    onTest2 () {
      console.log('test2 running')
    }
  }
}
</script>

<style lang="less">
</style>
