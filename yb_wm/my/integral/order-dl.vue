<template>
  <view class="mh100 " :hidden="!dlDatl.id">
    <view class="ptb7 cf " :style="'background:'+tColor+';'">
      <view class="f-bt ">
        <view class="f32 " v-if="dlDatl.state=='1'">未付款</view>
        <view class="f32 " v-if="dlDatl.deliveryMode=='1'&&dlDatl.state=='2'">待发货</view>
        <view class="f32 " v-if="dlDatl.deliveryMode=='2'&&dlDatl.state=='2'">待核销</view>
        <view class="f32 " v-if="dlDatl.state=='3'">已发货</view>
        <view class="f32 " v-if="dlDatl.state=='4'">已完成</view>
        <view class="">
          <text class="iconfont iconddys mr10 f60 cf "></text>
        </view>
      </view>
      <view class="f32 mt20 " v-if="dlDatl.goodsType=='1'&&dlDatl.deliveryMode=='2'">{{'核销码：'+dlDatl.selfCode}}</view>
    </view>
    <view class="m23 ">
      <view class="bf bs20 f24 p32 f-bt mb20 " v-if="dlDatl.goodsType=='1'">
        <view class="f-g-0 mr20 ">
          <view class="yuan f-c " :style="'background:'+tColor+';'">
            <text class="iconfont iconditu mr10 f42 cf ml10 "></text>
          </view>
        </view>
        <view class="f-g-1 ">
          <view class="f28 c3 ">
            <text class="f32 mr20 ">{{dlDatl.receiveName}}</text>
            <text class="c9 ">{{dlDatl.receiveTel}}</text>
          </view>
          <view class="f28 t-o-e2 mt0 ">{{dlDatl.receiveAddress}}</view>
        </view>
      </view>
      <view class="f28 bf bs20 p32 c3 mb20 ">
        <view class="f-row ">
          <view class="f-g-0 mr30 ">
            <view class="imgw bs10 bf7 ">
              <mg-img class="" :src="dlDatl.goodsIcon" vueId="28b243ce-1"></mg-img>
            </view>
          </view>
          <view class="f-g-1 f-y-bt ">
            <view class="wei4 f30 t-o-e2 c6 ">{{dlDatl.goodsName}}</view>
            <view class="f-x-bt ">
              <view class="cfa t-o-e wei4 ">
                <!-- 	<text class="" v-if="dlDatl.score>0">{{dlDatl.score}}</text>
								<text class="f26 ml10 nowei " v-if="dlDatl.score>0">{{jfName}}</text>
								<text class="nowei " v-if="dlDatl.score>0&&dlDatl.money>0">+</text> -->
                <text class="" v-if="dlDatl.money>0">
                  <text class="f22 ">{{sl}}</text>{{dlDatl.money}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="f-bt mt20 ">
          <view class="">购买数量</view>
          <view class="">{{'x'+dlDatl.convertNum}}</view>
        </view>
        <view class="f-bt mt20 ">
          <view class="">商品类型</view>
          <view class="">{{dlDatl.goodsType==1?'实物':'虚拟'}}</view>
        </view>
        <view class="f-bt mt20 " v-if="dlDatl.goodsType=='1'&&dlDatl.deliveryMode!='0'">
          <view class="f-g-0 mr30 ">配送方式</view>
          <view class="f-g-1 f-bt " v-if="dlDatl.deliveryMode=='1'">
            <view class="c9 ">快递配送</view>
            <view class="" :style="'color:'+tColor+';'">{{dlDatl.deliveryMoney>0?'运费:'+sl+dlDatl.deliveryMoney:'免邮'}}</view>
          </view>
          <view class="f-g-1 " v-if="dlDatl.deliveryMode=='2'">
            <view class="c9 ">到店自取</view>
          </view>
        </view>
        <view class="wei4 cfa f-x-e mt20 mb20 line24 ">
          <text class="c3 ">实付：</text>
          <!-- <text class="" v-if="dlDatl.score>0">{{dlDatl.score}}</text>
					<text class="f26 ml10 nowei " v-if="dlDatl.score>0">{{jfName}}</text>
					<text class="nowei " v-if="dlDatl.score>0&&dlDatl.money>0">+</text> -->
          <text class="" v-if="dlDatl.money>0">
            <text class="f22 ">{{sl}}</text>{{dlDatl.money}}</text>
        </view>
        <mg-cell bgc="#FAFBFC" @tab="go({url:'/yb_wm/my/other/kf'})" class="" cname="b-t-e" last="1" vueId="28b243ce-2" :vueSlots="['bd']" v-if="dlDatl.goodsType=='1'">
          <view class="" slot="bd">
            <view class="f30 f-c ">
              <text class="iconfont f42 icondh1 c0 mr20 "></text>
              <text class="t-o-e ">联系平台</text>
            </view>
          </view>
        </mg-cell>
      </view>
      <view class="f28 bf bs20 p32 c3 mb20 ">
        <view class="f32 ">订单信息</view>
        <view class="f-bt mt20 ">
          <view class="f-g-0 mr30 ">订单编号</view>
          <view class="f-g-1 c6 ">{{dlDatl.outTradeNo}}</view>
        </view>
        <view class="f-bt mt20 ">
          <view class="f-g-0 mr30 ">支付时间</view>
          <view class="f-g-1 c6 ">{{timeToDate(dlDatl.payAt, "yyyy-MM-dd hh:mm")}}</view>
        </view>
        <view class="f-bt mt20 " v-if="dlDatl.logisticsName">
          <view class="f-g-0 mr30 ">快递名称</view>
          <view class="f-g-1 c6 ">{{dlDatl.logisticsName}}</view>
        </view>
        <view class="f-bt mt20 " v-if="dlDatl.logisticsCode">
          <view class="f-g-0 mr30 ">快递单号</view>
          <view class="f-g-1 c6 ">{{dlDatl.logisticsCode}}</view>
        </view>
        <view class="f-bt mt20 " v-if="dlDatl.payMode>0">
          <view class="f-g-0 mr30 ">支付方式</view>
          <view class="f-g-1 c6 ">{{payName(dlDatl.payMode)}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import MgCell from "components/common/mg-cell.vue";
import {
  setNT,
  timeToDate
} from 'common/util';
import {
  utilMixins
} from 'common/utilMixins';

export default {
  name: "orderDl",
  components: {
    MgCell
  },
  data: function () {
    return {
      dlDatl: "",
      // timeToDate,
    }
  },
  onLoad: function (t) {
    console.log('8888888888888');
    var n;
    n = t.scene ? decodeURIComponent(t.scene) : t.id, this.id = n, this.getSystem({
      setNB: 1
    }), setNT("商城-订单详情"), this.getData()
  },
  mixins: [utilMixins],
  computed: {
    jfName: function () {
      return this.system.custom.integral
    }
  },
  methods: {
    getData: function () {
      var t = this;
      this.$api['integral-shop_integral__order__info']({
        id: t.id
      }).then(res => {
        console.log(res);
        t.dlDatl = res.data;
      })
    }
  }
}
</script>

<style scoped>
.imgw {
  width: 100rpx;
  height: 100rpx;
}

.ptb7 {
  padding: 40rpx 70rpx;
}

.mt60 {
  margin-top: 60rpx;
}

.line24 {
  line-height: 24rpx;
}

.yuan {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
}
</style>