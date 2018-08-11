// 自定义指令
import {
  addClass,
  removeClass
} from '@/common/dom'
import {
  each,
  isObject
} from 'lodash'
import store from '@/store'
import PERMISSION_MAP from '@/permission'

export default {
  install (Vue, options) {
    // 设置背景色
    Vue.directive('bgit', (el, binding) => {
      el.style.backgroundColor = binding.value
    })

    // input聚焦
    Vue.directive('focus', {
      inserted: (el) => {
        el.focus()
      }
    })

    Vue.directive('search', {
      inserted: (el) => {
        el.onfocus = () => {
          el.style.width = `200px`
        }
        el.onblur = () => {
          setTimeout(() => {
            el.style.width = ''
          }, 100)
        }
      }
    })

    Vue.directive('img', {
      inserted: (el, binding) => {
        let color = Math.floor(Math.random() * 1000000)
        el.style.backgroundColor = `#${color}`

        let img = new Image()
        img.src = binding.value
        img.onload = () => {
          el.style.backgroundImage = `url(${binding.value})`
        }
      }
    })

    // dropdown menu
    // document.styleSheet[0].addRule('.red:before','background-color:green')
    // document.styleSheet[0].insertRule('.red:before{background-color:green}',0)
    Vue.directive('dropdown', {
      inserted: (el, binding) => {
        let klass = `v-dir-${Date.now()}`
        let opened = 'dropdown-opened'
        addClass(el, klass)

        let openMenu = () => {
          let $right = el.firstChild.getBoundingClientRect().width / 2 - 8 // 16/2
          document.styleSheets[0].addRule('.triangle:after', `right:${$right}px`)
          document.styleSheets[0].addRule('.triangle:before', `right:${$right}px`)
          document.styleSheets[0].insertRule(`.triangle:after{right:${$right}px}`, 0)
          document.styleSheets[0].insertRule(`.triangle:before{right:${$right}px}`, 0)
          el.setAttribute('class', `${el.getAttribute('class')} ${opened}`)
        }
        let closeMenu = () => {
          el.setAttribute('class', el.getAttribute('class').replace(' ' + opened, ''))
        }

        if (binding.modifiers.click) {
          let bodyClickHandle = null
          el.onclick = () => {
            if (el.getAttribute('class').indexOf(opened) === -1) {
              openMenu()
            } else if (binding.modifiers.closeBySelf) {
              closeMenu()
            }
          }

          if (!bodyClickHandle && binding.modifiers.closeByBody) {
            bodyClickHandle = e => {
              e = e || window.event
              let elem = e.target || e.srcElement
              while (elem) {
                if (
                  elem.className &&
                  !isObject(elem.className) &&
                  elem.className.indexOf(klass) > -1
                ) {
                  return
                }
                elem = elem.parentNode
              }
              closeMenu()
            }
            document.body.addEventListener('click', bodyClickHandle, null)
          }
        } else {
          el.onmouseenter = () => {
            if (el.getAttribute('class').indexOf(opened) === -1) {
              openMenu()
            }
          }
          el.onmouseleave = () => {
            if (el.getAttribute('class').indexOf(opened) > -1) {
              closeMenu()
            }
          }
        }
      }
    })

    // textarea auto height
    Vue.directive('auto-textarea', {
      update: (el) => {
        if (el.value !== '' && el.style.height === '') {
          el.style.height = `${Math.min(el.scrollHeight, 250)}px`
        }
      }
    })

    Vue.directive('toggle-textarea', {
      inserted: (el, binding, vnode) => {
        const offset = binding.value || 100
        el.setAttribute('data-h', el.getBoundingClientRect().height)
        vnode.context.__focusHandler = () => {
          const __handler = () => {
            if (el.style.height === '') {
              let height = el.getBoundingClientRect().height
              el.style.height = `${height}px`
              setTimeout(() => {
                el.style.height = `${offset}px`
              }, 100)
            }
          }
          if (binding.modifiers.delay) {
            setTimeout(() => {
              __handler()
            }, binding.value || 200)
          } else {
            __handler()
          }
        }
        vnode.context.__blurhandler = () => {
          el.style.height = `${el.getAttribute('data-h')}px`
          setTimeout(() => {
            el.style.height = ''
          }, 200)
        }
        el.addEventListener('focus', vnode.context.__focusHandler)
        el.addEventListener('blur', vnode.context.__blurhandler)
      },
      unbind: (el, binding, vnode) => {
        el.removeEventListener('focus', vnode.context.__focusHandler)
        el.removeEventListener('blur', vnode.context.__blurhandler)
      }
    })

    // navigation menus
    Vue.directive('menu', {
      inserted: (el, binding, vnode) => {
        let $ul = el.nextElementSibling
        const id = 'nav-clone'

        const setPos = () => {
          let $el = document.getElementById(id)
          let $nav = document.getElementById('navigation')
          let position = el.getBoundingClientRect()
          let navWith = $nav.offsetWidth - 1

          if ($el) {
            $el.remove()
          }

          let $cloneUl = $ul.cloneNode(true)

          // 重新绑定subMenu的click事件
          each($cloneUl.getElementsByClassName('sidebar-item'), node => {
            node && node.addEventListener('click', vnode.context.subMenuClick, true)
          })

          $cloneUl.setAttribute('id', id)
          $cloneUl.setAttribute('style', `top:${position.top}px;left:${navWith - 1}px`)
          const cloneLeave = () => {
            document.getElementById(id).remove()
          }
          $cloneUl.addEventListener('mouseleave', cloneLeave, false)
          document.body.append($cloneUl)
        }
        el.onmouseenter = () => {
          setPos()
        }
        el.onmouseleave = (e) => {
          e = e || window.event
          let elem = e.toElement || e.relatedTarget
          while (elem) {
            if (elem.id && elem.id === id) {
              return
            }
            elem = elem.parentNode
          }
          document.getElementById(id).remove()
        }
      }
    })

    Vue.directive('toggle', {
      inserted: (el, binding, vnode) => {
        let $body = el.parentNode.parentNode.nextElementSibling
        vnode.context.clickHandler = () => {
          let height = $body.getBoundingClientRect().height
          if (height) {
            addClass(el, 'toggled-img')
            $body.style.height = `${height}px`
            setTimeout(() => {
              $body.style.height = '0px'
            }, 10)
          } else {
            removeClass(el, 'toggled-img')
            $body.style.height = 'auto'
            height = $body.getBoundingClientRect().height
            $body.style.height = '0'
            setTimeout(() => {
              $body.style.height = `${height}px`
              setTimeout(() => {
                $body.style.height = ''
              }, 300)
            }, 10)
          }
        }
        el.addEventListener('click', vnode.context.clickHandler)
      },
      unbind: (el, binding, vnode) => {
        el.addEventListener('click', vnode.context.clickHandler)
      }
    })

    // 权限指令
    Vue.directive('can', {
      inserted: (el, binding, vnode) => {
        if (!binding.value) return
        let can = false
        let permission = []
        if (store.state.permission.tmp) {
          permission = store.state.permission.tmp
        }
        if (store.state.user.permission) {
          permission = permission.concat(store.state.user.permission)
        }
        if (permission.length) {
          let keys = binding.value.replace(/ /g, '').split(',')
          let accessCount = 0
          each(keys, itm => {
            if (permission.indexOf(
              PERMISSION_MAP[itm] && PERMISSION_MAP[itm].toString()) > -1
            ) {
              accessCount++
            }
          })
          can = accessCount === keys.length
        }
        // el.style.display = can ? 'block' : 'none'
        if (!can) vnode.elm.remove()
      },
      update: (el, binding) => {}
    })

    // v-can静态方法
    const CAN = (value) => {
      if (!value) return
      let can = false
      let permission = []
      if (store.state.permission.tmp) {
        permission = store.state.permission.tmp
      }
      if (store.state.user.permission) {
        permission = permission.concat(store.state.user.permission)
      }
      if (permission.length) {
        let keys = value.replace(/ /g, '').split(',')
        let accessCount = 0
        each(keys, itm => {
          if (permission.indexOf(
            PERMISSION_MAP[itm] && PERMISSION_MAP[itm].toString()) > -1
          ) {
            accessCount++
          }
        })
        can = accessCount === keys.length
      }
      return can
    }
    Object.defineProperties(Vue.prototype, {
      $can: {
        get () {
          return CAN
        }
      }
    })
  }
}
