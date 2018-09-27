<template>
  <div class="vue_event">
    <div class="module" @click="testParent($event)">
      ex1：内联语句处理器中访问原始的DOM事件，可以用$event把它传入方法中：
      <button @click="warn('form cannot be submit', $event)">submit</button>
      <!-- 终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。
      调用该方法后，该节点上处理该事件的处理程序将被调用，
      事件不再被分派到其他节点。 -->
      <a v-on:click="doThis">test .stop => event.stopPropagation()</a>
      <a v-on:click.stop="doThis">test .stop => event.stopPropagation()</a>
    </div>
    <div class="module">
      <!-- 禁止默认事件 -->
      <form v-on:submit.prevent="onSubmit">
        test .prevent => event.preventDefault()
        <button type="submit">提交1</button>
      </form>
      <form v-on:submit="onSubmitEvent($event)">
        test event.preventDefault()
        <button type="submit">提交2</button>
      </form>
    </div>
    <div class="module">
      <!-- 修饰符可以串联 -->
      <a v-on:click.stop.prevent="doThat" href="www.baidu.com">修饰符串联</a>
      <!-- 添加事件监听器时使用事件捕获模式 -->
      <!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
      <div style="background: red;" v-on:click.capture="captureOut"><a @click="captureIn">事件捕获模式</a></div>
      <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
      <!-- 即事件不是从内部元素触发的 -->
      <div style="background: orange;" v-on:click.self="captureOut"><a @click="captureIn">事件捕获模式</a></div>
      <a href="www.baidu.com" v-on:click.self.prevent="captureOut">
        test prevent.self  & self.prevent
        <a href="www.google.com" style="color: red;">1111</a>
      </a>
    </div>
    <div class="module" v-on:click.once="doThis">click use once</div>
      <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
      <!-- 而不会等待 `onScroll` 完成  -->
      <!-- 这其中包含 `event.preventDefault()` 的情况 -->
    <!-- <div v-on:scroll.passive="onScroll">.passive</div> -->
    <div class="module">
      <h3>按键修饰符</h3>
      只有在 `keyCode` 是 13 时调用 `vm.submit()`
      <input v-on:keyup.13="changeKeyPress">
    </div>
    <div class="module">
      全部的按键别名：
      .enter
      .tab // 有点问题
      .delete (捕获“删除”和“退格”键)
      .esc
      .space
      .up
      .down
      .left
      .right
      <input v-on:keyup.space="changeKeyPress">
      <input v-on:click.alt.tab="changeKeyPress">
    </div>
    <div class="module">
      <h3>系统修饰键</h3>
      .ctrl
      .alt
      .shift
      .meta (command/windows...)
      <!-- Alt + C -->
      <input v-on:keyup.alt.67="changeKeyPress">
      <!-- ctrl + C -->
      <input v-on:keyup.ctrl.67="changeKeyPress">
    </div>
    <div class="module">
      exact 修饰符允许你控制由精确的系统修饰符组合触发的事件
      <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
      <button @click.alt="changeKeyPress">A</button>

      <!-- 有且只有 Alt 被按下的时候才触发/存在问题 -->
      <button @click.alt.exact="changeKeyPress">B</button>

      <!-- 没有任何系统修饰符被按下的时候才触发 -->
      <button @click.exact="changeKeyPress">C</button>
    </div>
    <div class="module">
      .left
      .right
      .middle
      会限制处理函数仅响应特定的鼠标按钮。
      <button @click.right="changeKeyPress">D</button>
    </div>
    <div class="module">
      <!-- c -->
      test Self Define KeyCodes 1<input @keyup.v="testSelfDefineKeyCodes" />
      <!-- x -->
      test Self Define KeyCodes 2 短线方式<input v-on:keyup.return-key="testSelfDefineKeyCodes"/>

      test Self Define KeyCodes 2<input v-on:keyup.ReturnKey="testSelfDefineKeyCodes"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eventDemo',
  data () {
    return {}
  },
  methods: {
    testParent (event) {
      console.log('this is parent node console, ', 'child node is：' + event.target.nodeName)
    },
    warn (str, event) {
      console.log('this is btn', event.target.nodeName)
      if (event) {
        event.stopPropagation()
      }
      alert(str)
    },
    doThis () {
      console.log('this is test .stop', event.target.nodeName)
    },
    onSubmit () {
      console.log('onSubmit', arguments)
      console.log('this is test .prevent', event.target.nodeName)
    },
    onSubmitEvent (event) {
      console.log('this is test event.preventDefault()', event.target.nodeName)
      if (event) {
        event.preventDefault()
      }
    },
    doThat () {
      console.log('this is test 修饰符串联')
    },
    captureOut () {
      console.log('captureOut', arguments)
      console.log('captureOut', event.target.nodeName)
    },
    captureIn () {
      console.log('captureIn', event.target.nodeName)
    },
    onScroll () {
      console.log('onScroll')
    },
    changeKeyPress (event) {
      console.log(event.keyCode)
    },
    testSelfDefineKeyCodes () {
      console.log(event.keyCode)
    }
  }
}
</script>

<style lang="less" scoped>
.vue_event{
  font-size: 15px;
  color: #666;
}
</style>
