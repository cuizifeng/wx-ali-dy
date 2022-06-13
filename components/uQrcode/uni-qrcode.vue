<template>
  <view class="hidecanvas">
    <canvas :canvasId="cid" :id="cid" :style="'width:'+size+'px'+';'+'height:'+size+'px'+';'"></canvas>
  </view>
</template>

<script>
import {
  UNICAVAS
} from 'common/p';
export default {
  props: {
    cid: {
      type: String,
      required: !0
    },
    text: {
      type: String,
      required: !0
    },
    size: {
      type: Number,
      default: 129
    },
    margin: {
      type: Number,
      default: 0
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    foregroundColor: {
      type: String,
      default: "#000000"
    },
    backgroundImage: {
      type: String
    },
    logo: {
      type: String
    },
    makeOnLoad: {
      type: Boolean,
      default: !1
    }
  },
  data: function () {
    return {};
  },
  mounted: function () {
    this.makeOnLoad && this.make();
  },
  methods: {
    async make() {
      var e = this;
      var t, a;
      t = {
        canvasId: e.cid,
        componentInstance: e,
        text: e.text,
        size: e.size,
        margin: e.margin,
        backgroundColor: e.backgroundImage ? "rgba(255,255,255,0)" : e.backgroundColor,
        foregroundColor: e.foregroundColor
      };
      let icon = await e.makeSync(t);
      if (e.backgroundImage) {
        await e.drawBackgroundImageSync(a);
      }
      if (e.logo) {
        await e.drawLogoSync(a);
      };
      e.makeComplete(icon);
    },
    makeComplete: function (e) {
      this.$emit("makeComplete", e);
    },
    drawBackgroundImage: function (n) {
      var t = this,
        a = uni.createCanvasContext(this.cid, this);
      a.drawImage(this.backgroundImage, 0, 0, this.size, this.size), a.drawImage(n.filePath, 0, 0, this.size,
        this.size),
        a.draw(!1, function () {
          uni.canvasToTempFilePath({
            canvasId: t.cid,
            success: function (e) {
              n.success && n.success(e.tempFilePath);
            },
            fail: function (e) {
              n.fail && n.fail(e);
            }
          });
        });
    },
    drawBackgroundImageSync: function (e) {
      var n = this;
      return new Promise((t, a) => {
        n.drawBackgroundImage({
          filePath: e,
          success: function (e) {
            t(e);
          },
          fail: function (e) {
            a(e);
          }
        });
      })
    },
    fillRoundRect: function (e, n, t, a, r, o) {
      e.save(), e.translate(t, a), e.beginPath(), e.arc(r - n, o - n, n, 0, Math.PI / 2), e.lineTo(n, o), e
        .arc(n, o - n,
          n, Math.PI / 2, Math.PI), e.lineTo(0, n), e.arc(n, n, n, Math.PI, 3 * Math.PI / 2), e.lineTo(
            r - n, 0), e.arc(r -
              n, n, n, 3 * Math.PI / 2, 2 * Math.PI), e.lineTo(r, o - n), e.closePath(), e.setFillStyle(
                "#ffffff"), e.fill(), e
                  .restore();
    },
    drawLogo: function (n) {
      var t = this,
        a = uni.createCanvasContext(this.cid, this);
      a.drawImage(n.filePath, 0, 0, this.size, this.size);
      var r = this.size / 4,
        o = this.size / 2 - r / 2,
        c = o,
        u = r + 10,
        i = this.size / 2 - u / 2,
        s = i;
      this.fillRoundRect(a, 5, i, s, u, u), a.drawImage(this.logo, o, c, r, r), a.draw(!1, function () {
        uni.canvasToTempFilePath({
          canvasId: t.cid,
          success: function (e) {
            n.success && n.success(e.tempFilePath);
          },
          fail: function (e) {
            n.fail && n.fail(e);
          }
        });
      });
    },
    drawLogoSync: function (e) {
      var n = this;
      return new Promise((t, a) => {
        n.drawLogo({
          filePath: e,
          success: function (e) {
            t(e);
          },
          fail: function (e) {
            a(e);
          }
        });
      });
    },
    makeSync: function (e) {
      return new Promise((n, t) => {
        UNICAVAS.make({
          canvasId: e.canvasId,
          componentInstance: e.componentInstance,
          text: e.text,
          size: e.size,
          margin: e.margin,
          backgroundColor: e.backgroundColor,
          foregroundColor: e.foregroundColor,
          success: function (e) {
            n(e);
          },
          fail: function (e) {
            t(e);
          }
        });
      })
    }
  }
}
</script>
