<template>
  <view class="listbox">
    <view class="item1">
      <view class="item1-arrs" v-for="(item,index) in list" :key="index" @click="myDataClick(item)">
        <view :class="['num']" v-if="index!=2">{{item.num || 0}}</view>
        <uni-icons v-else type="shop" size="30"></uni-icons>
        <view class="name">{{item.name}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },

  methods: {
    myDataClick: function (e) {
      console.log(e)
      var n = "";
      e.url && (n = e.url, "会员说明" == e.name && t.setStorageSync("fwb", this.vipset.content)),
        this.go({
          t: 1,
          url: n
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.listbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  .item1 {
    width: 665rpx;
    padding: 40rpx 0rpx;
    background: #fff;
    border-radius: 10rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 30rpx;
    .item1-arrs {
      display: flex;
      flex-direction: column;
      align-items: center;
      .name {
        flex-wrap: 400;
        padding-top: 10rpx;
      }
      .num {
        font-size: 30px;
        font-weight: 400;
      }
    }
  }
}
</style>