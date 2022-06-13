<template>
<view class="page__bd " :style="'background:'+bgcolor+';'">
    <view class="no-data-tip " :style="[sname]" v-if="nodata">
        <image class="no-data-tipimg " src=""></image>
        <view class="" :style="'color:'+tcolor+';'">{{otext||'暂无相关内容~'}}</view>
        <view class="" :style="'color:'+tcolor+';'" v-if="ttext">{{ttext}}</view>
    </view>
    <block v-else>
        <view class="weui-loadmore" v-if="!mygd">
            <view class="weui-loading "></view>
            <view class="weui-loadmore__tips " :style="'margin:0;'+'color:'+tcolor+';'">正在加载</view>
        </view>
        <view class="weui-loadmore" v-if="mygd">
            <view class="hx "></view>
            <view class="weui-loadmore__tips " :style="'color:'+tcolor+';'">加载完毕</view>
            <view class="hx "></view>
        </view>
    </block>
</view>
</template>

<script>
export default {
      name: "mg-img",
      props: {
        sname: Object,
        imgn: {
          type: String,
          default: "zwdd"
        },
        bgcolor: "",
        mygd: {
          type: Boolean,
          default: !1
        },
        tcolor: {
          type: String,
          default: ""
        },
        nodata: "",
        otext: {
          type: String,
          default: ""
        },
        ttext: {
          type: String,
          default: ""
        }
      },
      data: function () {
        return {};
      }
    }
</script>
 <style scoped>
.page__bd {
    background: #fff;
    font-size: 28rpx;
}

.weui-loadmore {
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding: 20rpx;
}

.weui-loadmore__tips {
    color: #999;
    margin: 0 20rpx;
}

.hx {
    width: 100rpx;
    height: 2rpx;
    background: #e5e5e5;
}

.no-data-tip {
    padding: 0 0 30rpx;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    color: #999;
}

.no-data-tipimg {
    width: 480rpx;
    height: 480rpx;
}
</style>