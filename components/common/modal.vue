<template>
  <view class="" :hidden="!(vs?value:true)">
    <view @tap="maskTap" :class="['i-modal-mask ',value?'i-modal-mask-show':'']" :style="'z-index:'+zIndex+';'"></view>
    <view :class="['i-modal ',value?'i-modal-show':'']" :style="'width:'+''+width+';'+'z-index:'+zIndex+';'">
      <slot v-if="ismr"></slot>
      <view class="f-c-c p23 bf " v-else>
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "popup",
  props: {
    className: {
      type: String,
      default: ""
    },
    vs: {
      type: Boolean,
      default: !1
    },
    value: {
      type: Boolean,
      default: !1
    },
    width: {
      type: String,
      default: "70%"
    },
    ismr: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 999
    },
    close: {
      type: Boolean,
      default: !0
    }
  },
  data: function () {
    return {};
  },
  computed: {},
  methods: {
    maskTap: function () {
      this.close && this.$emit("input", !1);
    }
  }
}
</script>
<style scoped>
.i-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  transition: all 0.2s ease-in-out;
  opacity: 0;
  visibility: hidden;
}

.i-modal-mask-show {
  opacity: 1;
  visibility: visible;
}

.i-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  overflow: hidden;
  transition: all 0.2s;
  transform: translate3d(-50%, -50%, 0) scale(0.6);
  opacity: 0;
  visibility: hidden;
}

.i-modal-show {
  visibility: visible;
  transform: translate3d(-50%, -50%, 0) scale(1);
  opacity: 1;
}
</style>