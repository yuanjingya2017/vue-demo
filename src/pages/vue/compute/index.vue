<template>
  <div class="vue_compute">
    这里放置计算属性和侦听器相关的内容
    <div class="module">
      ex1:基本用法
      computed: {{ aIsChange }}
      <button @click="changeA()">changeA</button>
      <div class="tips">
        aIsChange不可在data里面定义,如果定义会报错,因为对应的aIsChange作为计算属性定义aIsChange并返回对应的结果给这个变量,变量不可被重复定义和赋值
      </div>
    </div>
    <div class="module">
      ex2:Date.now() 不是响应式依赖
      <div>
        {{nowTime}}
        <button @click="changeDate()">changeDate</button>
      </div>
      <div>
        {{changeDateByCom}}
      </div>
      <div class="tips">
          计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
          Date.now() 不是响应式依赖，所以changeDateByCom不再更新
      </div>
    </div>
    <div class="module">
      ex3：<span class="tips">计算属性的setter，默认只有getter，也可以提供setter</span>
      <div>
        <div>全名：{{fullName}}</div>
        <div>firstname：{{firstName}}</div>
        <div>lastname：{{lastName}}</div>
        <button @click="changeFullName()">changeFullName</button>
      </div>
    </div>
    <div class="module">
      ex4: watch基本用法
      <div>
          watch string: {{ first }}
          <button @click="changeFirst()">changeFirst</button>
      </div>
      <div>
        string: {{e}}
        <button @click="changeE()">changeE watch object</button>
      </div>
      <div>
        <input v-model="b.c" />
        deep watch obj: {{ b.c }}
        <button @click="changeB()">changeB deep watch object</button>
      </div>
      <div>
        immediate: {{ d }}
      </div>
    </div>
  </div>
</template>

<script>
import selectcoms from '@/components/common/select'
export default {
  name: 'compute',
  components: {
    selectcoms
  },
  data () {
    return {
      first: '1',
      a: 'a',
      b: {
        c: '00'
      },
      e: 'eee',
      d: 'dddd',
      nowTime: Date.now(),
      firstName: '1',
      lastName: '2'
    }
  },
  watch: {
    first (v, ov) {
      this.first = ov
      console.log('first:', this.first)
    },
    // b (newVal, oldVal) {
    //   console.log('b oldVal:', oldVal)
    //   console.log('b newVal:', newVal)
    // },
    b: {
      handler (newVal, oldVal) {
        console.log('b oldVal:', oldVal)
        console.log('b newVal:', newVal)
      },
      deep: true
    },
    d: {
      handler: function (val, oldVal) {
        console.log('d newVal:', val)
        console.log('d oldVal:', oldVal)
      },
      immediate: true
    },
    e: function (val, oldVal) {
      console.log('e val, oldval', val, oldVal)
    }
  },
  computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        console.log('fullName:', this.firstName.length + 1, names.length - 1)
        this.lastName = newValue.substr(this.firstName.length + 1)
      }
    },
    // 计算属性的 getter
    aIsChange: function () {
      // `this` 指向 vm 实例
      console.log('a:', this.a)
      return this.a
    },
    changeDateByCom: function () {
      return Date.now()
    }
  },
  methods: {
    changeDate () {
      this.nowTime = Date.now()
    },
    changeA () {
      this.a = '111'
    },
    changeFullName () {
      this.fullName = 'marsi yjy'
    },
    changeB () {
      this.b.c = '232323'
    },
    changeE () {
      this.e = '5555'
    },
    changeFirst () {
      this.first = 'first'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
