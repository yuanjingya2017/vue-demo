<template>
  <div class="vue_style">
    <div class="module">
      ex1:
      <div class="change_red" :class="{add_border: addborder, change_bg: changebg }">
        绑定html class，对象语法
      </div>
    </div>
    <div class="module">
      ex2:
      <div :class="classArr">
        这里放置class与style绑定相关内容
      </div>
      <button @click="changeRed">change red</button>
      <button @click="removeRed">remove red</button>
      <button @click="addBorder">add border</button>
      <button @click="removeBorder">remove border</button>
      <!-- <button @click="changeBg">change background color</button>
      <button @click="changeFontsize">change fontsize</button> -->
    </div>
    <div class="module">
      ex3:
      <div :class="[activeClass, errorClass]">
        绑定html class，数组语法
      </div>
      <div :class="[isRed ? activeClass : '', errorClass]">
        绑定html class，数组语法
      </div>
      <div :class="[{activeClass: isRed}, errorClass]">
        绑定html class，数组语法
      </div>
      <div :class="classObj">
        这里放置class与style绑定相关内容
      </div>
    </div>
    <div class="module">
      ex4:
      <div :style="{color: activeColor, fontSize: fontSize + 'px'}">绑定内联样式 对象语法</div>
      <div v-bind:style="styleObject">绑定内联样式 直接绑定到一个样式对象</div>
      <div v-bind:style="[baseStyles, overridingStyles]">绑定内联样式 数组语法</div>
    </div>
    <div class="module">
      ex5:
      <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">1111</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'style',
  data () {
    return {
      baseStyles: {
        color: 'red'
      },
      overridingStyles: {
        fontSize: '30px'
      },
      styleObject: {
        color: 'red',
        fontSize: '30px'
      },
      activeColor: 'red',
      fontSize: '30',
      activeClass: 'change_red',
      isRed: false,
      errorClass: 'change_bg',
      addborder: true,
      changebg: true,
      classArr: [],
      classObj: [
        {change_bg: true},
        {add_border: true},
        {change_red: true}
      ]
    }
  },
  methods: {
    addClass (classArr, className) {
      classArr.push(className)
    },
    removeClass (classArr, className) {
      classArr.splice(className, 1)
    },
    changeRed () {
      this.classArr.push('change_red')
    },
    removeRed () {
      this.classArr.splice('change_red', 1)
    },
    addBorder () {
      // this.classArr.push('add_border')
      this.addClass(this.classArr, 'add_border')
    },
    removeBorder () {
      // this.classArr.splice('add_border', 1)
      this.removeClass(this.classArr, 'add_border')
    }
  }
}
</script>

<style lang="less" scoped>
.change_red {
  color: red;
}
.add_border{
  border: 1px solid #000;
}
.change_bg{
  background-color: aquamarine;
}
.font_size{
  font-size: 20px;
}
</style>
