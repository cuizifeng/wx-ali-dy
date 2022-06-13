<template>
  <view>
    <mg-cell :arrow="arrow" @tab="$emit('tab')" class="" :cname="cname" :ft="ft" :ftc="ftc" :ht="ht" :htc="'f30 '+htc" :hw="hw" :iconn="iconn" :isl="isl" :isr="isr" :last="last" vueId="3d92774f-1" :vueSlots="['bd','hd','ft']" v-if="formt==1">
      <view slot="bd">
        <input v-model="inputVal" @tap.stop="" :class="['weui-input ',icn]" :disabled="dis" :maxlength="max" :placeholder="pr" placeholderStyle="color:#BBBBBB;" :type="t" :value="inputVal" v-if="!dis" />
        <view :class="['weui-input t-o-e ',icn]" :style="'color:'+(inputVal?'':'#BBBBBB')+';'" v-else>{{inputVal||pr}}
        </view>
      </view>
      <view class="" slot="hd">
        <slot name="hd"></slot>
      </view>
      <view class="" slot="ft">
        <slot name="ft"></slot>
      </view>
    </mg-cell>
    <block v-else>
      <mg-cell class="" :cname="cname" :ht="ht" :hw="hw" :isl="isl" :isr="isr" :last="last" vueId="3d92774f-2" :vueSlots="['ft']" v-if="formt==2">
        <switch @change="switchChange" :checked="value==1" class="" :color="tColor" slot="ft" style="transform:scale(0.85);">
        </switch>
      </mg-cell>
    </block>
  </view>
</template>

<script>
export default {
  name: "mg-input",
  components: {
    MgCell: function () {
      e.e("components/common/mg-cell").then(function () {
        return resolve(e("0fd7"));
      }.bind(null, e)).catch(e.oe);
    }
  },
  props: {
    cname: {
      type: String,
      default: "p23"
    },
    sname: "",
    last: "",
    iconn: {
      type: String,
      default: ""
    },
    formt: {
      type: String,
      default: "1"
    },
    hw: {
      type: String,
      default: ""
    },
    isl: {
      type: String,
      default: ""
    },
    isr: {
      type: String,
      default: ""
    },
    ht: {
      type: String,
      default: ""
    },
    htc: {
      type: String,
      default: ""
    },
    ft: {
      type: String,
      default: ""
    },
    ftc: {
      type: String,
      default: ""
    },
    arrow: {
      type: String,
      default: ""
    },
    dis: {
      type: [Boolean, String],
      default: !1
    },
    t: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    },
    icn: {
      type: String,
      default: ""
    },
    max: {
      type: [String, Number],
      default: 60
    },
    pr: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {};
  },
  computed: {
    inputVal: {
      get: function () {
        return this.value;
      },
      set: function (t) {
        this.$emit("input", t);
      }
    }
  },
  methods: {
    switchChange: function (t) {
      this.$emit("input", t.detail.value ? "1" : "2"), console.log(t.detail.value);
    },
    maskTap: function () {
      this.$emit("input", !1);
    }
  }
}
</script>
<style scoped>
.weui-input {
  width: 100%;
  font-size: 30rpx;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: inherit;
}

.weui-input:disabled {
  background: transparent;
}
</style>