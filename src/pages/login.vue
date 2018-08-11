<template>
  <div id="page-login" class="gray-bg full-width">

    <div class="middle-box text-center loginscreen animated fadeInDown pt10">
      <div style="padding-top: 35%">
        <h3 style="margin-top:10%;margin-bottom:50px;">
          <router-link to="/" style="color:#333">NewBanker</router-link>
        </h3>
        <form class="m-t" action="post" @submit.prevent="submit">
          <div class="form-group">
            <input type="text" class="form-control"
              v-focus
              v-model="user.username"
              placeholder="输入账号" required="">
          </div>
          <div class="form-group">
            <input type="password" class="form-control"
              v-model="user.password"
              placeholder="输入密码" required="">
          </div>

          <button type="submit" class="btn btn-primary block full-width m-b btn-lg"
            v-if="!success"
            @click.prevent="submit($event)"
            v-bind:disabled="disabled">登录</button>
          <button type="submit" class="btn btn-primary block full-width m-b btn-lg"
            v-if="success"
            v-bind:disabled="disabled"
            @click.prevent="">
            <span class="fa fa-check"></span> 登录成功
          </button>
        </form>
        <div class="demo_password" style="margin-top: 12px;">
          用户名/密码： demo/1
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {
  each,
  isEmpty
} from 'lodash'
import {
  COOKIE
} from '@/common/const'
import {
  Loading
} from 'element-ui'
export default {
  data () {
    return {
      success: null,
      disabled: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  beforeCreate () {
    let $dialog = document.getElementsByClassName('v-modal')
    let $wrapper = document.getElementsByClassName('el-dialog__wrapper')
    each($dialog, node => {
      node && node.remove()
    })
    each($wrapper, node => {
      node && node.remove()
    })
  },
  created () {
    if (this.$PASSPORT) {
      this.$router.replace({name: 'dashboard'})
    }
  },
  methods: {
    loading () {
      this.loadingInstance = Loading.service({fullscreen: true})
    },
    loginRedirect () {
      let redirect = this.$cookie.get(COOKIE.KEY_REDIRECT)
      this.$cookie.remove(COOKIE.KEY_REDIRECT)
      this.$router.push(redirect || {name: 'vueCompute'})
    },
    async submit (e) {
      if (isEmpty(this.user.username)) {
        this.$message.error('请输入您的账号')
        return
      }
      if (isEmpty(this.user.password)) {
        this.$message.error('请输入登录密码')
        return
      }

      this.disabled = true
      this.loading()

      let res = await this.$store.dispatch('LOGIN', this.user)
      this.$nextTick(() => {
        this.loadingInstance && this.loadingInstance.close()
      })

      if (!res) {
        this.disabled = false
        this.$message.error('账号或密码错误')
        return
      }

      this.success = true

      setTimeout(() => {
        this.loginRedirect()
      }, 500)
    }
  }
}
</script>

<style lang="less">
#page-login {
  height: 100%;
  .form-control {
    height: 48px;
  }
}
</style>
