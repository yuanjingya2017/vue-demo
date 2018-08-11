<template>
    <div class="detail_header">
      <div class="detail_header_left">
        <img v-if="type==='Img'" :src="hdData.avatar || avatar" alt="">
        <div v-if="type==='icon'" :class="hdData.iconStyle || 'fa-users'" class="fa detail_header_left_icon"></div>
        <div class="detail_header_left_info">
          <div class="detail_header_left_info_name">{{hdData.name || '-'}}</div>
          <div class="detail_header_left_info_tel">{{hdData.tel || '-'}}</div>
        </div>
      </div>
      <div class="detail_header_right">
        <div class="detail_header_right_item" v-for="item in hdData.arr" :key="item.keyname + (Math.random() * 100)">
          <div class="detail_header_right_item_value">{{item.value || '-'}}</div>
          <div class="detail_header_right_item_name">{{item.keyname}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import avatar from '@/assets/imgs/user-avatar.png'
export default {
  name: 'DetailHeader',
  props: {
    initialType: {
      type: String,
      default: 'icon'
    },
    hdData: {
      type: Object,
      default () {
        return {
          name: '',
          tel: '',
          arr: []
        }
      }
    }
  },
  data () {
    return {
      avatar,
      type: this.initialType
    }
  },
  mounted () {
  },
  method: {
  }
}
</script>

<style lang='less'>
.detail_header{
  border: solid 1px #dcdcdc;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  min-width: 740px;
  display: flex;
  box-shadow: 1px 5px 10px 2px #ddd;
  .detail_header_left{
    display: flex;
    align-content: center;
    min-width: 300px;
    img{
      width: 70px;
      height: 70px;
    }
    .detail_header_left_icon {
      margin-top: 10px;
      margin-right: 10px;
      font-size: 50px;
      height: 50px;
      color: #0081ff;
    }
    .detail_header_left_info{
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 10px;
      height: 70px;
      .detail_header_left_info_name{
        font-size: 17px;
      }
      .detail_header_left_info_tel{
        font-size: 13px;
        color: #969696;
      }
    }
  }
  .detail_header_right{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .detail_header_right_item{
      height: 70px;
      width: 140px;
      display: flex;
      text-align: center;
      flex-direction: column;
      justify-content: space-around;
      .detail_header_right_item_name{
        color: #969696;
      }
    }
  }
}
</style>
