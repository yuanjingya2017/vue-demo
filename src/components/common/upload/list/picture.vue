<template>
<div class="picture-list picture-list-container file-upload">
  <ul class="img-ul el-upload-list el-upload-list--picture-card">
    <li class="img-li el-upload-list__item is-success" v-for="(item, index) in fileArray" :key="index">
      <img :src="item.url" :alt="item.name">
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-delete" @click="deleteItem(index)">
          <i class="el-icon-delete"></i>
        </span>
      </span>
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
  .file-upload.picture-list-container .el-upload-list--picture-card .img-li {
    float: left;
    margin-right: 10px;
    height: 100px;
    width: 100px;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }
  .file-upload.picture-list-container .img-li .img-li-actions:hover {
    opacity: 1;
  }
  .file-upload.picture-list-container .img-li .img-li-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s;
  }
  .file-upload.picture-list-container .img-ul img {
    height: 100%;
    width: 100%;
  }
</style>
