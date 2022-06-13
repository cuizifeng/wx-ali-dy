<template>
  <view>
    <view :class="['','product',co.type==1?'f-x-bt f-w':co.type==2?'f-raw':'']" :style="'background:'+(co.typeBg==3?'url('+co.img+')':co.typeBg==2?co.colorBg:'')+';'+'margin:'+''+co.marginTop+u+' '+co.marginLR+u+' '+co.marginBottom+u+';'" v-if="list.length">
      <block v-for="(v, i) in list" :key="i">
        <view @tap="goodinfo(v.id)" :class="['spi mb20 o-h p-r ',co.type==2?'spi2':co.type==3?'spi3 f-row':co.type==4?'spi4':'']" :style="'background:'+co.colorProductBg+';'+'border-radius:'+co.circle+u+';'+'width:'+(co.type==1?'49%':co.type==2?'32%':'')+';'" v-if="co.type<=4">
          <view class="img f-g-0 ">
            <mg-img class="" :src="v.icon" :vueId="'0bc97717-1-'+i"></mg-img>
          </view>
          <view class="spbtm p2 bf f-y-bt ">
            <view :class="['',co.type!=3?'l-h1':'']">
              <view class="f30 t-o-e " :style="'color:'+co.colorTitle+';'">{{v.name}}</view>
              <view :class="['mt15 f20 c9 ',co.type!=3?'t-o-e':'t-o-e3']" v-if="v.body">{{v.body}}</view>
            </view>
            <view class="f-y-c ">
              <view class="f-1 f-y-e ln ">
                <view class="" :style="'color:'+co.colorBtn+';'">{{'￥'+v.price}}</view>
              </view>
              <text :class="['iconfont f40 ',co.typeBtn==1?'icongwc':co.typeBtn==2?'iconkxj':'iconsxj']" :style="'color:'+co.colorBtn+';'"></text>
            </view>
          </view>
          <view class="p-a zsjtb " v-if="co.typePay<=3&&co.typePay>0">
            <image class="pimg " :src="'/static/pay'+co.typePay+'.png'"></image>
            <view class="p-a f22 cf ptxt l-h1 ">{{co.typeText}}</view>
          </view>
        </view>
      </block>
    </view>
    <jzz bgcolor="transparent" class="" :mygd="isget" :nodata="isget" otext="暂无商品" vueId="0bc97717-2" v-else></jzz>
  </view>
</template>

<script>
export default {
  name: "product",
  components: {
    jzz: function () {
      n.e("components/common/jzz").then(function () {
        return resolve(n("33bd"));
      }.bind(null, n)).catch(n.oe);
    }
  },
  props: {
    type: {
      type: String,
      default: "1"
    },
    co: {
      type: Object,
      default: function () {
        return {};
      }
    },
    u: {
      type: String,
      default: "px"
    },
    shopinfo: Object
  },
  data: function () {
    return {
      list: [],
      isget: !1
    };
  },
  watch: {
    shopinfo: {
      handler: function (t) {
        if (t.id)
          if (1 == this.co.typeProduct && this.co.productName && this.co.productName.length) {
            var e = this.co.productName.map(function (t) {
              return t.name.id;
            }).toString();
            this.getData({
              type: 1,
              ids: e
            }), console.log("商品组", e);
          } else 2 == this.co.typeProduct && this.co.productGroup && this.co.productGroup.length ? this.co.productGroup[0]
            .name.pid > 0 ? (this.getData({
              type: 2,
              pid: this.co.productGroup[0].name.pid,
              id: this.co.productGroup[0].name.id,
              num: this.co.productNum
            }), console.log("商品组2级分类")) : (this.getData({
              type: 2,
              pid: this.co.productGroup[0].name.id,
              num: this.co.productNum
            }), console.log("商品组1级分类")) : 3 == this.co.typeProduct && this.getData({
              type: 3,
              ranktype: this.co.productMarket,
              num: this.co.productNum
            });
      },
      immediate: !0
    }
  },
  methods: {
    getData: function (t) {
      var e = this;
      var jsons = Object.assign({}, t, {
        storeId: e.shopinfo.id
      });
      this.$api.good_good__rank__type(jsons).then(res => {
        e.list = res;
        e.isget = true;
      })
    },
    goodinfo: function (t) {
      this.go({
        t: 1,
        url: "/yb_wm/shop/out/goods-dl?gid=".concat(t, "&storeId=").concat(this.shopinfo.id, "&page=index")
      });
    }
  },
  created: function () { }
}
</script>
<style scoped>
.product {
  padding: 20rpx 20rpx 0;
  border: 1px solid transparent;
}

.product .spi .img {
  height: 348rpx;
}

.product .spbtm {
  height: 180rpx;
}

.product .spi2 {
  margin-right: 2%;
}

.product .spi2 .img {
  height: 218rpx;
}

.product .spi2:nth-of-type(3n) {
  margin-right: 0;
}

.product .spi3 .img {
  width: 260rpx;
  height: 260rpx;
}

.product .spi3 .spbtm {
  -webkit-box-flex: 1;
  flex: 1;
  height: auto;
}

.product .spi4 .img {
  height: 706rpx;
}

.product .zsjtb {
  left: 0;
  top: 0;
  padding: 6rpx;
}

.product .zsjtb .pimg {
  width: 78rpx;
  height: 40rpx;
}

.product .zsjtb .ptxt {
  padding: 14rpx 20rpx;
  top: 0rpx;
  left: 0;
}
</style>