<template>
  <view :class="['f-x-bt ',cname]">
    <view :class="['f-g-1 wei t-o-e ',pcname,'cf0a']" v-if="isprice">
      <text class="f26 mr5 ">{{sl}}</text>{{co.price+''}}<text class="nowei c9 f24 " v-if="isunit">{{'/'+co.unit}}</text>
      <text class="t-d-l nowei ml10 c9 f24 " v-if="isyprice">{{sl+co.price}}</text>
    </view>
    <view @tap.stop="isClose && $emit('add', { addwz: addwz,g:co })" class="f-g-0 cartggc f-c " v-if="(co.isSpecs==1||co.isMaterial==1||co.isAttr==1)&&showspec">
      <view class="text-btnf f22 f-c ggc " :style="'background:'+(isClose?color||tColor:'#ccc')+';'">
        <text class="">选 择</text>
        <text class="dot f-c " :style="'background:'+(isClose?color||tColor:'#ccc')+';'" v-if="co.num>0">{{co.num}}</text>
      </view>
    </view>
    <block v-else>
      <view class="f-g-0 f-bt " v-if="showjj">
        <view class="reducecon active f-y-c " v-if="co.num>0">
          <view @tap.stop=" isClose && $emit('dec', { addwz: addwz,g:co })" class="cartc f-c ">
            <button class="cartdec " :style="'border-color:'+(color||tColor)+';'">
              <view class="cartdecab " :style="'background:'+(isClose?color||tColor:'#ccc')+';'"></view>
            </button>
          </view>
          <text :class="['f26 ma c0 ',numc]">{{co.num}}</text>
        </view>
        <view @tap.stop="isClose && $emit('add', { addwz: addwz,g:co })" class="cartc f-c ">
          <button class="cartadd " :style="'background:'+(isClose?color||tColor:'#ccc')+';'"></button>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: "add-goods",
  props: {
    co: {
      type: Object,
      default: function () {
        return {};
      }
    },
    cname: {
      type: String,
      default: ""
    },
    numc: String,
    addwz: {
      type: String,
      default: "1"
    },
    outin: {
      type: String,
      default: "1"
    },
    pcname: "",
    isprice: {
      type: Number,
      default: 1
    },
    isyprice: {
      type: Boolean,
      default: !1
    },
    isunit: {
      type: Boolean,
      default: !1
    },
    showspec: {
      type: Boolean,
      default: !0
    },
    showjj: {
      type: Boolean,
      default: !0
    },
    nocheckgd: {
      type: Boolean,
      default: !1
    },
    addgb: {
      type: Boolean,
      default: !0
    },
    color: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {};
  },
  computed: {
    isClose: function () {
      return this.nocheckgd || this.addgb;
    }
  },
  methods: {}
}
</script>
<style scoped>
.ggc {
  position: relative;
  border-radius: 30rpx;
  height: 43rpx;
  padding: 3rpx 15rpx;
  width: 97rpx;
}

.dot {
  position: absolute;
  width: 36rpx;
  height: 36rpx;
  right: -10rpx;
  top: -18rpx;
  border-radius: 50%;
  color: #fff;
  border: 1rpx solid #fff;
}

.mr5 {
  margin-right: 5rpx;
}
</style>