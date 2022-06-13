<template>
  <view class="">
    <load class="" vueId="08aa229d-1" v-if="showloading"></load>
  </view>
</template>


<script>
import load from "components/common/load.vue";
import {
  getUrlParams,
  message
} from 'common/util';
export default {
  name: "order-index",
  components: {
    load
  },
  data: function () {
    return {
      showloading: !0
    }
  },
  onLoad: function (t) {
    var n = this;
    var c, s, d, i;
    n.getSystem();
    if (!t.q) return message("未获取到参数", 3);
    var u = getUrlParams(decodeURIComponent(t.q));
    this.$api['in-store_get__code__info']({
      data: u
    }).then(res => {
      s = 2, i = "";
      switch (res.type) {
        case 'table':
          i = "/yb_wm/shop/in/goods?scene=" + res.tableId;
          break;
        case 'table':
          i = "/pages/individualAccount/Collection/index?storeId=" + res.storeId;
          break;
        case 'table':
          i = "/yb_wm/shop/ffmode/goods?storeId=" + res.storeId;
          break;
        default:
          uni.showModal({
            title: "提示",
            content: "扫码参数暂不支持识别",
            showCancel: !1,
            success: function (e) {
              n.go({
                t: 6,
                url: "/pages/tabbar/index/index"
              })
            }
          });
          break;
      }
      n.go({
        t: s,
        url: i
      });
    });


  },
  computed: {},
  methods: {}
}
</script>
