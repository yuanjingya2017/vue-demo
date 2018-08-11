<template>
  <nav id="nav-bar" class="wrapper" :style="{zIndex: showSearch ? 1000 : 15}">

    <breadcrumb></breadcrumb>

    <ul class="nav navbar-top-links navbar-right-custome">
      <li class="bar-avatar-wp dropdown"
          v-if="user"
          v-dropdown.click.closeByBody.closeBySelf>
        <a>
          <img :src="user.avatar || avatar" />
          <span style="color: #0081ff;">{{user.name || user.username || '欢迎您'}}</span>
        </a>
      </li>
      <li class="divider color-gray">|</li>
      <li>
        <a href="" @click.prevent="logout" style="padding-right: 15px; color: #999; font-size: 13px;">退出</a>
      </li>
    </ul>

  </nav>
</template>

<script>
import {
  each,
  size,
  isEmpty,
  map,
  merge
} from 'lodash'
import Breadcrumb from './breadcrumb.vue'
import NbSvg from '@/components/svg'
import avatar from '@/assets/imgs/user-avatar.png'
export default {
  name: 'TopNavBar',
  data () {
    return {
      avatar,
      self: this,
      opened: false,
      fadeIn: false,
      keywords: '',
      searching: false,
      searched: false,
      noResults: false,
      timerOffset: 300,
      cacheTime: 0,
      timer: null,
      moveToIndex: 0,
      suggestion: []
    }
  },
  components: {
    Breadcrumb,
    NbSvg
  },
  computed: {
    user () {
      return this.$store.state.user.account
    },
    showSearch () {
      return this.$store.state.app.layout.search
    }
  },
  methods: {
    openSearch () {
      this.searched = false
      this.fadeIn = false
      this.suggestion = []
      this.moveToIndex = 0
      this.keywords = ''
      this.$store.dispatch('TOGGLE_SEARCH')
      setTimeout(() => {
        this.fadeIn = true
        this.$refs.searchInput.focus()
      }, 100)
    },
    closeSearch () {
      this.$store.dispatch('TOGGLE_SEARCH')
    },
    realmMap (realm) {
      return {
        Fund: '基金',
        MotherFund: '母基金',
        Customer: '客户',
        Enterprise: '项目'
      }[realm]
    },
    moveActiveItem (code) {
      let current = 0
      each(this.suggestion, (item, idx) => {
        if (item.active) {
          current++
          this.suggestion[idx].active = false
          if (code === 40) {
            this.moveToIndex = idx === size(this.suggestion) - 1 ? 0 : idx + 1
          }
          if (code === 38) {
            this.moveToIndex = idx ? idx - 1 : size(this.suggestion) - 1
          }
          this.suggestion[this.moveToIndex].active = true
          this.keywords = this.suggestion[this.moveToIndex].fullName
          return false
        }
      })
      if (!current) {
        this.suggestion[0].active = true
        this.keywords = this.suggestion[0].fullName
      }
    },
    prekeyup (event) {
      if ([13, 27, 38, 40].indexOf(event.keyCode) > -1) {
        return this.keyup(event)
      }
      let now = Date.now()
      if (this.cacheTime > 0 && now - this.cacheTime < this.timerOffset) {
        this.timer && clearTimeout(this.timer)
      }
      this.cacheTime = now
      this.timer = setTimeout(() => {
        this.keyup(event)
      }, this.timerOffset)
    },
    keyup (event) {
      // keyCode => 40:下  38:上
      switch (event.keyCode) {
        case 13:
          this.submit()
          break
        case 27:
          this.closeSearch()
          break
        case 38:
          this.moveActiveItem(event.keyCode)
          break
        case 40:
          this.moveActiveItem(event.keyCode)
          break
        default:
          this.search()
      }
    },
    unActive () {
      each(this.suggestion, itm => {
        itm.active = false
      })
    },
    async search () {
      if (this.keywords === '') return
      this.searching = true
      let res = await this.$store.dispatch('SEARCH_ALL', this.keywords)
      this.suggestion = map(res, itm => {
        return merge({}, itm, {active: false})
      })
      setTimeout(() => {
        this.searching = false
      }, 300)
      this.searched = true
    },
    routerMap (realm) {
      return {
        Fund: 'fund',
        MotherFund: 'fof',
        Customer: 'customer',
        Enterprise: 'project'
      }[realm]
    },
    submit (idx) {
      if (!idx && isEmpty(this.keywords)) {
        return
      }
      if (idx) {
        this.moveToIndex = idx
      }
      let o = this.suggestion[this.moveToIndex]
      if (o) {
        this.$router.push({
          name: `${this.routerMap(o.realmEntity.realm)}_detail`,
          params: {
            id: o.realmEntity.dataId
          }
        })
      }
      this.closeSearch()
    },
    logout () {
      this.$store.dispatch('LOGOUT')
      this.$router.replace('/login')
    },
    backHome () {
      location.href = '/dashboard'
    }
  }
}
</script>

<style lang="less">
@media(min-width: 200px) {
  .navbar-right-custome{
    float: right !important;
    margin-right: -15px;
    min-width: 160px;
  }
}
li.dropdown a.text-default {
  color: #7a8599;
  font-weight: normal;
  &:hover {
    color: #555;
  }
}
.dropdown-menu.dropdown-fastgo {
  box-shadow: 0 2px 12px rgba(0,0,0,.06);
  border: 1px solid #e6e9f0;
  border-radius: 0 0 3px 3px;
  padding: 30px;
  width: 382px;
  .triangle:before {
    content: '';
    display: block;
    border: 8px solid transparent;
    border-bottom-color: #e6e9f0;
    position: absolute;
    top: -16px;
    left: 45px;
  }
  .triangle:after {
    content: '';
    display: block;
    border: 8px solid transparent;
    border-bottom-color: #fff;
    position: absolute;
    top: -15px;
    left: 45px;
  }
  > li {
    display: inline-block;
    text-align: center;
    > a {
      padding: 20px 20px 10px;
      text-align: center;
      &:hover {
        background-color: rgba(245, 245, 245, 0.35);
      }
      > img {
        display: inline-block;
        max-width: 40px;
      }
    }
  }
}
.dropdown-opened {
  .dropdown-menu {
    margin-top: -2px;
  }
}
.bar-avatar-wp {
  img {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    overflow: hidden;
  }
  span {
    font-weight: 400;
    font-size: 13px;
    padding-left: 5px;
    padding-right: 10px;
  }
  a{
    color: #0081ff;
  }
}
</style>
