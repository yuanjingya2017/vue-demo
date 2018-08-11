<template>
  <router-view></router-view>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
export default {
  name: 'App',
  created () {
    // only for dev test
    if (process.env.NODE_ENV !== 'production') {
      window.that = this
    }
  }
}
</script>

<style lang="less">
@import '../node_modules/bootstrap/less/bootstrap.less';
@import '../node_modules/element-ui/lib/theme-chalk/index.css';
@import './assets/less/animatecss/animate.css';
@import './assets/less/style.less';
</style>
