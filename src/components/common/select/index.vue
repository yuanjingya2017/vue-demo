<template>
  <div class="select_con">
    <select v-model="categoryValue" name="selectCategory" id="selectCategory">
      <option value="">请选择</option>
      <option v-for="item in INVEST_CATEGORY" :value="item.name" :key="item.name">{{item.value}}</option>
    </select>
  </div>
</template>

<script>
import {INVEST_CATEGORY} from '@/common/const'
export default {
  name: 'selectCategory',
  data () {
    return {
      INVEST_CATEGORY,
      categoryValue: ''
    }
  },
  watch: {
    categoryValue (val, oldValue) {
      console.log(val, oldValue)
    }
  }
}
</script>

<style lang="less" scoped>
.select_con{

}
</style>
