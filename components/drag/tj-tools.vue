<template>
  <view class="p0 o-h " :style="'background-color:'+co.colorBg+';'+'margin-top:'+co.marginTop+u+';'+'margin-bottom:'+co.marginBottom+u+';'+'margin-left:'+co.marginLR+u+';'+'margin-right:'+co.marginLR+u+';'+'border-radius:'+co.circle+u+';'">
    <mg-cell bgc="transparent" class="" cname="p0" last="1" vueId="09ff3c1c-1" :vueSlots="['bd']">
      <view class="" slot="bd">
        <mg-cell bgc="transparent" :btt="co.title" bttc="wei f30" class="" cname="p23" last="1" :vueId="'09ff3c1c-2'+','+'09ff3c1c-1'"></mg-cell>
        <view class="gwglc f-raw f24 " v-if="co.arrange==1">
          <view @tap="gwglClick(v)" class="f-c-c gwgl " :hidden="!!v.hide" :style="'width:'+10/co.num*10+'%'+';'" v-for="(v, i) in myGwgl" :key="i">
            <view class="glimg mb15 " :style="'width:'+ftw.w+'rpx'+';'+'height:'+ftw.w+'rpx'+';'">
              <mg-img class="" :src="v.img" :vueId="'09ff3c1c-3-'+i+','+'09ff3c1c-1'"></mg-img>
            </view>
            <view class="" :style="'color:'+co.colorWord+';'+'font-size:'+ftw.ft+'rpx'+';'">{{v.word}}</view>
          </view>
        </view>
        <block v-else>
          <mg-cell arrow="1" @tab="gwglClick(v)" class="" cname="p23" :h="ftw.w" :img="v.img" last="1" :vueId="'09ff3c1c-4-'+i+','+'09ff3c1c-1'" :vueSlots="['bd']" :w="ftw.w" v-for="(v, i) in myGwgl" :key="i">
            <view class="" slot="bd">
              <view class="f30 " :style="'color:'+co.colorWord+';'+'font-size:'+ftw.ft+'rpx'+';'">{{v.word}}
              </view>
            </view>
          </mg-cell>
        </block>
      </view>
    </mg-cell>
  </view>
</template>

<script>
export default {
  name: "tj-tools",
  props: {
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
    color: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {};
  },
  computed: {
    myGwgl: function () {
      return this.co.btnList;
    },
    ftw: function () {
      return {
        ft: 2 * this.co.fontSize,
        w: 2 * this.co.width
      };
    }
  },
  methods: {
    gwglClick: function (t) {
      var n = this;
      console.log("tourl", t);
      n.goUrl(t.url, t);
    }
  }
}
</script>
<style scoped>
.gwglc {
  padding: 0 0 20rpx;
}

.gwgl {
  margin: 18rpx 0;
}

.ddimg {
  width: 52rpx;
  height: 52rpx;
}

.glimg {
  width: 46rpx;
  height: 46rpx;
}
</style>