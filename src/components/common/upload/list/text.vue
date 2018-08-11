<template>
<div class="picture-list picture-list-container file-upload">
  <ul class="img-ul el-upload-list el-upload-list--text">
    <li class="img-li el-upload-list__item is-success" v-for="(item, index) in fileArray" :key="index">
      <a class="el-upload-list__item-name">
        <i class="el-icon-document"></i><a :href="item.url" target="_blank">{{item.name}}</a>
      </a>
      <label class="el-upload-list__item-status-label">
        <i class="el-icon-upload-success el-icon-circle-check"></i>
      </label>
      <i class="el-icon-close" @click="deleteItem(index)"></i>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  name: 'pictureList',
  props: {
    fileArray: {
      type: Array,
      default: []
    }
  },
  methods: {
    deleteItem (index) {
      this.$emit('delete-item', index)
    }
  }
}
</script>
<style lang="less">
  .file-upload.picture-list-container {
    overflow: hidden;
  }
</style>
