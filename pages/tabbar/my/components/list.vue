<template>
  <view class="listbox">
    <view class="item1">
      <view class="item1-arrs" v-for="(item,index) in list" :key="index" @click="myDataClick(item)">
        <view :class="['num']" v-if="!item.icon">{{item.num || 0}} <text class="numFont">{{item.text}}</text> </view>
        <view v-else>
          <image :src="item.icon" class="arrsImg" mode="aspectFit" />
        </view>
        <view class="name">{{item.name}}</view>
      </view>
    </view>
    <uni-popup ref="popup" :safe-area="area" style="z-index:99999">
      <view class="opa_box">
        <view class="title">填写手机号绑定</view>
        <view class="inputBox">
          <view class="txt">手机号</view> <input class="input" confirm-type="done" v-model="num" placeholder-style="font-size:28rpx;font-weight: 400;color: #999999" type="text" placeholder="请输入手机号">
        </view>
        <view class="inputBox">
          <view class="txt">金额</view> <input class="input" confirm-type="done" v-model="code" placeholder-style="font-size:28rpx;font-weight: 400;color: #999999" type="text" placeholder="请输入转赠金额">
          <view style="color:red">元</view>
        </view>
        <view class="butn">
          <view class="btnItemA" @click="unopa">取消</view>
          <view class="btnItemB" @click="submit">确认</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
// import { message } from 'common/util';
import { Tips } from "@/utils/miniUtils.js";
import { memberGive } from '@/api/my.js';
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      area: false,
      num: '',
      code: '',
    }
  },
  methods: {
    myDataClick: function (e) {
      var n = "";
      e.url && (n = e.url, "会员说明" == e.name && t.setStorageSync("fwb", this.vipset.content));
      if (e.name == '商城') {
        uni.switchTab({
          url: n
        });
      } else if (e.name == '转赠') {
        this.$refs.popup.open('bottom')
      } else {
        this.go({
          t: 1,
          url: n
        })
      }
    },
    unopa() {
      this.num = '';
      this.code = '';
      this.$refs.popup.close()
    },
    // code_fis:function(){
    //   if(!this.disabled){
    //     var test = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    //     this.disabled = true;
    //     if(test.test(this.num)){
    //       this.disabled = true;
    //       var num = 60 , vm = this;
    //       vm.tim = setInterval(function(){
    //         if(num > 0){
    //           num--
    //           vm.code_html = num+'秒后重新发送'
    //         }else if(num == 0){
    //           vm.code_html = '重新发送';
    //           clearInterval(vm.tim)
    //           vm.disabled = false
    //         }
    //       },1000)
    //     }else{
    //       message("请输入正确的手机号", 3)
    //       this.disabled = false;
    //     }
    //   }
    // },
    submit() {
      uni.showLoading({ title: '加载中...' });
      var test = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, reg = new RegExp(/^\d{0,10}?\.?\d{1,2}$/);
      if (this.num == '' || !test.test(this.num)) {
        return Tips({ title: '请输入正确的手机号' })
      } else if (this.code == '') {
        return Tips({ title: '请输入正确的转账金额' })
      } else if (!reg.test(this.code)) {
        return Tips({ title: '金额输入不正确' })
      } else {
        memberGive({
          money: this.code,
          tel: this.num
        }).then(res => {
          this.unopa()
          if (res.code == 1) {
            Tips({ title: res.msg, end: 3000 })
          } else {
            Tips({ title: res.msg, end: 3000 })
          }
        })
      }
    }
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
    width: 690rpx;
    padding: 28rpx 0rpx;
    background: #fff;
    border-radius: 10rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30rpx;
    .item1-arrs {
      display: flex;
      flex-direction: column;
      align-items: center;
      .name {
        flex: 1;
        padding-top: 15rpx;
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
      .num {
        font-size: 40rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #f9bc3e;
        .numFont {
          font-size: 22rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #f9bc3e;
          padding-left: 5rpx;
        }
      }
      .arrsImg {
        width: 35rpx;
        height: 32rpx;
      }
    }
  }
  .opa_box {
    padding: 20rpx 57rpx;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    background: #fff;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 32rpx;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #222222;
      padding: 20rpx 0rpx;
    }
    .inputBox {
      display: flex;
      align-items: center;
      height: 110rpx;
      border-bottom: 1rpx solid rgba(151, 151, 151, 0.3);
      .txt {
        width: 130rpx;
        display: flex;
        align-items: center;
        font-size: 30rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #222222;
      }
      .input {
        // padding-top: 10rpx;
      }
    }
    .butn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 50rpx 0rpx;
      .btnItemA {
        width: 214rpx;
        height: 73rpx;
        line-height: 73rpx;
        text-align: center;
        background: #e8e8e8;
        font-size: 25rpx;
        color: #666666;
        border-radius: 10rpx;
      }
      .btnItemB {
        width: 214rpx;
        height: 73rpx;
        line-height: 73rpx;
        text-align: center;
        background: #fbba2a;
        font-size: 25rpx;
        color: #ffffff;
        border-radius: 10rpx;
      }
    }
  }
}
</style>