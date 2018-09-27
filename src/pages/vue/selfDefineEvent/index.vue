<template>
  <div>
    <div class="module">
      有时候我们需要prop的“双向绑定”，希望子元素也能修改父元素的属性，但是这会带来维护上的问题，
      推荐以 update:my-prop-name 的模式触发事件取而代之
      <br>
      title: {{doc.title}}
       <br>
      titlesync: {{doc.titlesync}}
       <br>
      doc: {{testObj}}
       <br>
      <!-- 监听那个事件并根据需要更新一个本地的数据属性 -->
      <sync @update:title="doc.title = $event" :display="[1,0,0]"></sync>
      <sync :titlesync.sync="doc.titlesync" :display="[0,1,0]"></sync>
      <sync v-bind.sync="testObj" :display="[0,0,1]"></sync>
      <!-- <sync @getObj="getObj"></sync> -->
    </div>
  </div>
</template>

<script>
import sync from './coms/sync'
export default {
  data () {
    return {
      doc: {
        title: '',
        titlesync: ''
      },
      testObj: {
        doc: {
          title: '',
          titlesync: ''
        }
      }
    }
  },
  methods: {
    // update
    getObj (data) {
      console.log(data)
    }
  },
  components: {
    sync
  }
}
</script>

<style>

</style>
