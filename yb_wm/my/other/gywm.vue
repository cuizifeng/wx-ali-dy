<template>
  <view class="bf p23 " v-if="content">
    <mg-rtext class="" :content="content" type="2" vueId="4bb5bd9d-1"></mg-rtext>
  </view>
</template>

<script>
import mgRtext from "components/common/functionCmp/rich-text.vue";
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  setNT
} from 'common/util';
export default {
  name: "gywm",
  components: {
    mgRtext
  },
  data: function () {
    return {
      loading: !1,
      content: ""
    }
  },
  async onLoad(e) {
    console.log('e:28 ', e);
    var r = this;
    var c, u, o, i;
    r.getSystem(),
      setNT(e.t),
      c = "";
    switch (+e.p) {
      // 6
      case 1:
        c = r.system.introduction;
        break;
      // 8
      case 2:
        await this.$api['member_get__helps__detail']({
          id: e.id
        }).then(res => {
          c = res.body
          // r.content = c;
        });
        break;
      // 14
      case 3:
        c = r.vipConfig.cardNotice;
        break;
      //16
      case 4:
        c = uni.getStorageSync("fwb");
        break;
      //18
      case 5:
        c = uni.getStorageSync("fwb");
        break;
      // 20
      case 6:
      case 7:
      case 9:
        c = uni.getStorageSync("fwb");
        break;
      //22
      case 8:
        await this.$api.config_config({
          ident: "integralShop "
        }).then(res => {
          c = res.details
        });
        break;
      //27
      case 10:
        c = r.enterset.agreement;
        break;
      //29
      case 11:
        c = r.storageset.content;
        break;
      //31
      case 12:
        c = r.payVipset.introduction;
        break;
      //33
      default:
        break;
    }
    r.content = c;
  },
  computed: {
    ...mapState(['vipConfig',]),
    ...mapState({
      enterset: function (t) {
        return t.config.enterset
      },
      storageset: function (t) {
        return t.config.storageset
      },
      recharge: function (t) {
        return t.config.recharge
      },
      payVipset: function (t) {
        return t.config.payVipset
      }
    })
  },
  methods: {}
}
</script>