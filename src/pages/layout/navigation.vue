<template>
  <nav class="nav-pagination-wrapper">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :unique-opened="true"
      text-color="#fff"
      :default-active="defaultActive"
    >
      <template v-for="(item0, index0) in MenuData">
        <el-submenu :index="index0.toString()" :key="index0"  v-if="item0.subResources && item0.subResources.length">
          <template slot="title">
            <i class="navigation-icon" :class="item0.icon"></i>
            <span slot="title">{{item0.name}}</span>
          </template>
          <template v-if="item0.subResources && item0.subResources.length" v-for="item1 in item0.subResources">
            <el-menu-item :key="item1.id" :index="item1.id" @click="jump(item1)">
              {{item1.name}}
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :key="item0.id" :index="item0.id" @click="jump(item0)" v-else>
          <i class="navigation-icon" :class="item0.icon"></i>
          <span slot="title">{{item0.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </nav>
</template>

<script>
 import {Menu, Submenu, MenuItem} from 'element-ui'
 import {menu} from '@/common/menu'
 export default {
   data () {
     return {
       MenuData: menu.menus,
       defaultActive: this.$route.meta.index
     }
   },
   components: {
     ElMenu: Menu,
     ElSubmenu: Submenu,
     ElMenuItem: MenuItem
   },
   watch: {
     $route () {
       this.defaultActive = this.$route.meta.index
     }
   },
   computed: {
     isCollapse () {
       return this.$store.state.tmp.isCollapse
     }
   },
   methods: {
     jump (data) {
       this.$router.push({name: data.webUrl})
     }
    //  侧边栏伸缩
    //  hoverNav () {
    //    document.body.onmousemove = e => {
    //      if (e.clientX < 64 && this.isCollapse) {
    //        this.$store.commit('UPDATE_ISCOLLAPSE')
    //      } else if (e.clientX > 220 && !this.isCollapse) {
    //        this.$store.commit('UPDATE_ISCOLLAPSE')
    //      }
    //    }
    //  }
   }
 }
</script>

<style lang="less" >
  .nav-pagination-wrapper{
    padding-bottom: 60px;
    padding-top: 50px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #202533;
  }
  .el-menu{
    box-sizing:border-box;
    background: transparent;
    border: none;
    .el-submenu{
      .el-submenu__title{
        font-size: 13px !important;
        color: #fff !important;
        height: 45px;
        line-height: 45px;
        i{
          font-size: 16px !important;
          margin-right: 4px;
          color: white;
        }
      }
      .el-menu{
        .el-menu-item{
          color: #fff !important;
          margin: 4px 0px;
        }
        .el-menu-item.is-active {
          color: #3ea8f5 !important;
          background: #474a55;
          position: relative;
        }
        .el-menu-item:hover{
          color: #3ea8f5 !important;
        }
      }
      .el-submenu__title:hover{
        color: #3ea8f5 !important;
        background: #474a55;
        position: relative;
        i{
          color: #3ea8f5 !important;
        }
      }
    }
    .el-menu-item{
      font-size: 13px !important;
      color: #fff !important;
      height: 45px;
      line-height: 45px;
      margin: 4px 0px;
      i{
        font-size: 16px !important;
        margin-right: 4px;
        color: white;
      }
    }
    .el-menu-item:hover{
      color: #3ea8f5 !important;
      background: #474a55;
      position: relative;
      i{
        color: #3ea8f5 !important;
      }
    }
    .el-menu-item.is-active {
      color: #3ea8f5 !important;
      background: #474a55;
      position: relative;
      i{
        color: #3ea8f5 !important;
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 170px;
  }
  .el-submenu{
    .el-menu-item{
      height: 45px;
      line-height: 45px;
      font-size: 13px;
      min-width: 170px;
    }
  }
  .navigation-icon{
    margin-left: 4px;
    display: inline-block;
    width: 18px;
    text-align: left;
  }
</style>
