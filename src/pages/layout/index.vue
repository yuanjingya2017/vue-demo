<template>
  <section class="nb-top-page">
    <div class="wrapper_main">
      <div class="nav_wrapper" data-scrollbar>
        <navigation ref="nav"></navigation>
      </div>
      <div class="main-wrapper" :class="{'min-left': $store.state.tmp.isCollapse}">
        <div class="router-content">
          <nav-bar></nav-bar>
          <div class="nb-scroll-content scroll-content-none-trans min_main_content" data-scrollbar>
            <transition name="fade" :appear="true">
              <router-view class="page-wrapper"></router-view>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import {
  debounce
} from 'lodash'
import Navigation from './navigation.vue'
import NavBar from './nav-bar.vue'
import Breadcrumb from './breadcrumb.vue'
import FooterBar from './footer.vue'
import Scrollbar from 'smooth-scrollbar'
export default {
  name: 'Layout',
  components: {
    Navigation,
    NavBar,
    Breadcrumb,
    FooterBar
  },
  data () {
    return {}
  },
  computed: {
    miniNavigation () {
      return this.$store.state.app.layout.miniNavigation
    },
    search () {
      return this.$store.state.app.layout.search
    }
  },
  created () {
    this.resizeHandler = debounce(this.resizeControl, 200)
    this.$nextTick(() => {
      this.resizeHandler(true)
      window.addEventListener('resize', this.resizeHandler)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    resizeControl (force = false) {
      if (!this.$refs.wrapper) return
      let width = this.$refs.wrapper.offsetWidth
      force
        ? width <= 1024
          ? this.$store.dispatch('TOGGLE_NAVIGATION', true)
          : null
        : this.$store.dispatch('TOGGLE_NAVIGATION', width <= 1024)
    }
  },
  mounted () {
    Scrollbar.init(document.querySelector('.nav'))
  }
}
</script>

<style lang="less">
.nb-top-page{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #my-scrollbar {
    width: 500px;
    height: 500px;
    overflow: auto;
  }
.wrapper_main{
  height: 100%;
  .nav_wrapper{
    height: 100%;
    float:left;
    overflow-y: auto;
    background: #202533;
  }
  .main-wrapper{
    background: #f3f3f4;
    height: 100%;
    overflow: hidden;
    transition: all 0.3s linear;
    .router-content{
      height: 100%;
      width: 100%;
      // 内容区域的最小宽度
      min-width: 580px;
      padding-bottom: 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .scroll-content-none-trans{
        transform: none!important;
      }
      .nb-scroll-content{
        height: 100%;
        overflow: auto;
        .page-wrapper{
          margin: 65px 15px 0;
          background-color: #fff;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          position: relative;
        }
      }
    }
  }
  .main-wrapper.min-left {
     /*padding-left: 64px;*/
  }
}
.fade-enter{
  opacity: 0;
  transform: translate3d(30px, 0, 0)
}
.fade-enter-active{
  transition: all 0.3s linear
}
</style>
