<template>
  <ul class="nb-breadcrumb nav" v-if="breadcrumb">
    <template v-for="(item, index) of breadcrumb.list">
      <li v-if="index > 0" :key="index + Math.random() * 100">
        <span class="el-icon-arrow-right"></span>
      </li>
      <li class="active" v-if="index == breadcrumb.list.length - 1" :key="index + Math.random() * 100">
        <a>{{item.name}}</a>
      </li>
      <li v-else :class="hasSys?'no-pointer':''" :key="index + Math.random() * 100">
        <template v-if="item.link">
          <router-link :to="parseRoute(item.link)">{{item.name}}</router-link>
        </template>
        <template v-else><a>{{item.name}}</a></template>
      </li>
    </template>
    <template>
      <div class="breadRight">
        <label class="btn btn-sm btn-white go-back" v-if="breadcrumb.back" @click="$router.go(breadcrumb.step || -1)">
          <i class="fa fa-angle-left"></i> {{breadcrumb.backTit || '返回'}}
        </label>
      </div>
    </template>
  </ul>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      hasSys: false
    }
  },
  computed: {
    breadcrumb () {
      return this.$store.state.app.layout.breadcrumb
    }
  },
  watch: {
    '$route' () {
      // 一旦路由变更就隐藏breadcrumbs
      // 下个视图要不要显示由下个视图说了算
      this.$store.commit('LAYOUT', {
        breadcrumb: null
      })
    }
  },
  methods: {
    parseRoute (link) {
      if (link.indexOf('/') > -1) {
        return link
      }
      return {name: link}
    }
  },
  created () {
    this.hasSys = /sys/g.test(this.$router.currentRoute.path)
  }
}
</script>
<style>
  .nav.nb-breadcrumb > li.no-pointer a {
    cursor: auto;
  }
  .go-back {
    position: absolute;
    top: 75px;
    right: 30px;
  }
</style>
