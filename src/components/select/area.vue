<template>
  <el-cascader
    class="area-cascader"
    :options="areaList"
    filterable
    clearable
    ref="regionSelect"
    separator="/"
    size="small"
    :value="regions"
    @change="handlerRegionChange"
    :props="{value: 'code', label: 'name', children: 'children'}"
  ></el-cascader>
</template>
<script>
import {
  Cascader
} from 'element-ui'
import {AREAS as areaList} from '@/common/area'

export default {
  name: 'AreaCascader',
  data () {
    return {
      areaList
    }
  },
  props: ['value'],
  computed: {
    regions () {
      if (!this.value || !this.value.code) {
        return []
      }
      const regionCode = this.value.code
      const provinceCode = regionCode.slice(0, 2) + '0000'
      const cityCode = regionCode.slice(0, 4) + '00'
      return [provinceCode, cityCode, regionCode]
    }
  },
  methods: {
    handlerRegionChange (regions) {
      const value = {}
      value.code = regions[regions.length - 1]
      this.$nextTick(_ => {
        value.name = this.getSubmitRegionName()
        this.$emit('input', value)
      })
    },
    // 获取提交的时候的地区名 需要去重 比如 北京市 北京市 朝阳区 => 北京市朝阳区
    getSubmitRegionName () {
      const regionNameArr = this.$refs.regionSelect.$el.innerText.split('/').map(item => item.trim())
      return [...new Set(regionNameArr)].join('')
    },
    // 00省 00市 00县
    // 根据末级的regionCode获取到regionArray
    getRegionArrByRegionCode (regionCode) {
      const provinceCode = regionCode.slice(0, 2) + '0000'
      const cityCode = regionCode.slice(0, 4) + '00'
      return [provinceCode, cityCode, regionCode]
    }
  },
  components: {
    [Cascader.name]: Cascader
  }
}
</script>
<style lang="less">
.area-cascader {
  width: 200px;
}
</style>
