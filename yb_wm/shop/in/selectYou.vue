<template>
  <view class="wrap">
    <view class="bigBox">
      <view class="itemBox" v-for="(item,index) in dataList" :key="index" @tap="getCurrtent(item,index)">
        <view v-show="index===selectCheck" class="selectIcon">
          <image src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/dmf1.png" mode=""></image>
        </view>
        <view class="left">
          <text class="pri">￥{{item.money}}</text>
          <text class="prititle">无门槛</text>
        </view>
        <view class="right">
          <text class="texttitle">{{item.couponName}}</text>
          <text class="limittime">{{item.useExplain}}</text>
        </view>
      </view>
    </view>

    <view class="btn" @tap="okSelect">
      <text>完成</text>
    </view>
  </view>
</template>

<script>
import {
  setNT,
  sljz,
  message
} from 'common/util';
import { log } from 'lib/utils/QS-SharePoster/app';
export default {

  data: function () {
    return {
      aIdx: 0,
      params: {
        size: 10,
        page: 1,
        state: 1,
        type: 2
      },
      dataList: [],
      selectCheck: '',
      couponArrs: {},//优惠券信息
    }
  },
  onLoad(t) {
    this.getList(), setNT("优惠券")
  },
  mixins: [sljz],
  methods: {
    getList() {
      var t = this;
      t.params.type = 2
      t.params.size = 100
      this.$api.coupon_my__coupon(t.params).then(res => {
        t.dataList = res
      })
    },
    getCurrtent(e, index) {
      this.couponArrs = e;
      this.selectCheck = index;
    },

    okSelect() {
      if (this.selectCheck === '') {
        return message("请选择优惠券", 3)
      }
      uni.$emit("handClick", { couponName: this.couponArrs.couponName, id: this.couponArrs.id, money: this.couponArrs.money });
      uni.navigateBack({
        delta: 1
      });
      //   uni.navigateTo({
      //     url: '/yb_wm/shop/in/dmf?obj=' + JSON.stringify(this.selectItem)
      //   })


      // yb_wm/shop/in/dmf

    }
    // btntap: function(t) {
    // 	var e = this;
    // 	e.checkLogin().then(() => {
    // 		t.storeId > 0 ? e.go({
    // 			t: 6,
    // 			url: "/yb_wm/index/goods"
    // 		}) : e.go({
    // 			t: 6,
    // 			url: "/yb_wm/index/index"
    // 		});
    // 	})
    // }
  }
}

</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  // height: 500rpx;
  // background: red;
  height: auto;
  // padding-bottom: 20rpx;
  position: relative;

  .bigBox {
    padding-bottom: 50rpx;
    .itemBox {
      width: 90%;
      height: 200rpx;
      border-radius: 10rpx;
      background: #ffffff;
      margin: 20rpx auto;
      display: flex;
      align-items: center;
      justify-content: space-around;
      position: relative;
      .selectIcon {
        width: 50rpx;
        height: 50rpx;
        position: absolute;
        top: 0;
        right: 0rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .left {
        width: 100rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .pri {
          color: red;
          font-size: 38rpx;
          font-weight: 600;
        }
        .prititle {
          font-size: 24rpx;
          color: #666666;
          margin-top: 10rpx;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        .texttitle {
          font-size: 32rpx;
          font-weight: 600;
          color: #333333;
        }
        .limittime {
          font-size: 24rpx;
          color: #666666;
          margin-top: 10rpx;
        }
      }
    }
  }

  .btn {
    width: 85%;
    height: 86rpx;
    border-radius: 25rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#f8a144, #d84333);

    position: fixed;
    bottom: 50rpx;
    left: 7.5%;

    text {
      color: #ffffff;
    }
  }
}
</style>
