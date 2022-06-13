<template>
  <view class="">
    <view :class="['fab-box fab ',leftBottom?'leftBottom':'',rightBottom?'rightBottom':'',leftTop?'leftTop':'',rightTop?'rightTop':'']">
      <view @tap="open" :class="['fab-circle ',horizontal==='left'&&direction==='horizontal'?'left':'',vertical==='top'&&direction==='vertical'?'top':'',vertical==='bottom'&&direction==='vertical'?'bottom':'',horizontal==='right'&&direction==='horizontal'?'right':'']" :style="'background-color:'+styles.buttonColor+';'">
        <text :class="['iconfont icontop ',showContent?'active':'']"></text>
      </view>
      <view :class="['fab-content ',horizontal==='left'?'left':'',horizontal==='right'?'right':'',direction==='vertical'?'flexDirection':'',flexDirectionStart?'flexDirectionStart':'',flexDirectionEnd?'flexDirectionEnd':'']" :style="'width:'+boxWidth+';'+'height:'+boxHeight+';'+'background:'+styles.backgroundColor+';'">
        <view class="fab-item first " v-if="flexDirectionStart||horizontalLeft"></view>
        <view @tap="taps(tabs[index],item)" :class="['fab-item ',showContent?'active':'']" :style="'color:'+(item.active?styles.selectedColor:styles.color)+';'" v-for="(item, index) in content" :key="index">
          <text :class="['content-image iconfont f40 t-c ',item.icon]"></text>
          <text class="text ">{{item.text}}</text>
        </view>
        <view class="fab-item first " v-if="flexDirectionEnd||horizontalRight"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    pattern: {
      type: Object,
      default: function () {
        return {};
      }
    },
    horizontal: {
      type: String,
      default: "left"
    },
    vertical: {
      type: String,
      default: "bottom"
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    content: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data: function () {
    return {
      fabShow: !1,
      flug: !0,
      showContent: !1,
      styles: {
        color: "#3c3e49",
        selectedColor: "#007AFF",
        backgroundColor: "#fff",
        buttonColor: "#3c3e49"
      }
    };
  },
  created: function () {
    0 === this.top && (this.fabShow = !0), this.styles = Object.assign({}, this.styles, this.pattern);
  },
  methods: {
    open: function () {
      this.showContent = !this.showContent;
    },
    taps: function (t, n) {
      this.$emit("trigger", {
        index: t,
        item: n
      });
    },
    getPosition: function (t, n, o) {
      return 0 === t ? this.horizontal === n && this.vertical === o : 1 === t ? this.direction === n && this.vertical ===
        o : 2 === t ? this.direction === n && this.horizontal === o : this.showContent && this.direction === n ? this
          .contentWidth : this.contentWidthMin;
    }
  },
  watch: {
    pattern: function (t, n) {
      console.log(JSON.stringify(t)), this.styles = Object.assign({}, this.styles, t);
    }
  },
  computed: {
    contentWidth: function (n) {
      return t.upx2px(85 * (this.content.length + 1) + 20) + "px";
    },
    contentWidthMin: function () {
      return t.upx2px(85) + "px";
    },
    boxWidth: function () {
      return this.getPosition(3, "horizontal");
    },
    boxHeight: function () {
      return this.getPosition(3, "vertical");
    },
    leftBottom: function () {
      return this.getPosition(0, "left", "bottom");
    },
    rightBottom: function () {
      return this.getPosition(0, "right", "bottom");
    },
    leftTop: function () {
      return this.getPosition(0, "left", "top");
    },
    rightTop: function () {
      return this.getPosition(0, "right", "top");
    },
    flexDirectionStart: function () {
      return this.getPosition(1, "vertical", "top");
    },
    flexDirectionEnd: function () {
      return this.getPosition(1, "vertical", "bottom");
    },
    horizontalLeft: function () {
      return this.getPosition(2, "horizontal", "left");
    },
    horizontalRight: function () {
      return this.getPosition(2, "horizontal", "right");
    }
  }
}
</script>
<style scoped>
.fab-box {
  position: fixed;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  z-index: 2;
}

.fab-box.top {
  width: 60rpx;
  height: 60rpx;
  right: 30rpx;
  bottom: 60rpx;
  border: 1px #5989b9 solid;
  background: #69c;
  border-radius: 10rpx;
  color: #fff;
  transition: all 0.3;
  opacity: 0;
}

.fab-box.active {
  opacity: 1;
}

.fab-box.fab {
  z-index: 10;
}

.fab-box.fab.leftBottom {
  left: 30rpx;
  bottom: 60rpx;
}

.fab-box.fab.leftTop {
  left: 30rpx;
  top: 80rpx;
}

.fab-box.fab.rightBottom {
  right: 30rpx;
  bottom: 190rpx;
}

.fab-box.fab.rightTop {
  right: 30rpx;
  top: 80rpx;
}

.fab-circle {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  position: absolute;
  width: 85rpx;
  height: 85rpx;
  background: #3c3e49;
  border-radius: 50%;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  z-index: 11;
}

.fab-circle.left {
  left: 0;
}

.fab-circle.right {
  right: 0;
}

.fab-circle.top {
  top: 0;
}

.fab-circle.bottom {
  bottom: 0;
}

.fab-circle .icontop {
  color: #fff;
  font-size: 50rpx;
  transition: all 0.3s;
}

.fab-circle .icontop.active {
  transform: rotate(180deg);
}

.fab-content {
  background: #69c;
  box-sizing: border-box;
  display: flex;
  border-radius: 100rpx;
  overflow: hidden;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  width: 85rpx;
}

.fab-content.left {
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.fab-content.right {
  -webkit-box-pack: end;
  justify-content: flex-end;
}

.fab-content.flexDirection {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: end;
  justify-content: flex-end;
}

.fab-content.flexDirectionStart {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.fab-content.flexDirectionEnd {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: end;
  justify-content: flex-end;
}

.fab-content .fab-item {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 85rpx;
  height: 85rpx;
  font-size: 22rpx;
  color: #fff;
  opacity: 0;
  transition: opacity 0.2s;
}

.fab-content .fab-item.active {
  opacity: 1;
}

.fab-content .fab-item .content-image {
  width: 45rpx;
  height: 45rpx;
  margin-bottom: 5rpx;
}

.fab-content .fab-item.first {
  width: 85rpx;
}
</style>