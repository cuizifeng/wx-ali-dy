<template>
  <view class="" :hidden="!show"></view>
</template>

<script>
import { message } from 'common/util';
import {
  mapActions,
  mapState,
} from 'vuex'
import mgPopup from 'components/common/popup.vue';
export default {
  name: "mg-map",
  components: {
    mgPopup
  },
  props: {
    co: {
      type: Object,
      default: function () {
        return {};
      }
    },
    value: {
      type: Boolean,
      default: !1
    }
  },
  data: function () {
    return {
      show: !1,
      getMapSrc: "",
      chooselocation: ""
    };
  },
  computed: {
    ...mapState(['latLng'])
  },
  watch: {},
  methods: {
    choose: function () {
      var t = this;
      uni.chooseLocation({
        success: function (e) {
          t.$emit("get-cl", e), console.log(e);
        }
      });
    },
    qd: function () {
      var e = this.chooselocation;
      if (!e) return message("请选择位置", 3);
      this.show = !1, this.$emit("get-cl", {
        address: e.poiaddress,
        name: e.poiname,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      });
    }
  },
  created: function () { }
}
</script>
<style scoped>
.iframe {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 0;
}

.iframe .map-fb {
  border-top: 1.1px solid #e5e5e5;
  height: 12%;
  padding: 0 8%;
}

.iframe .map-fb view {
  width: 45%;
  height: 60%;
  border-radius: 20rpx;
  border: 1.1px solid #d5d5d5;
  color: #666;
}

.iframe .map-fb view:nth-child(2) {
  color: #fff;
  border-color: #fff;
}
</style>