<template>
  <view class="bf bgfix ">
    <canvas canvasId="hbctx" class="" style="width:330px;height:490px;position:fixed;top:9999px;"></canvas>
    <view class="wh f-col f-y-c " v-if="show">
      <image class="img bs15 " mode="scaleToFill" :src="img" :style="'height:'+'980rpx'+';'"></image>
    </view>
    <view class="foot-btnc ">
      <button @tap="bc" class="bcan foot-btn " :style="'background:'+(tColor||'#07c160')+';'">保存</button>
    </view>
  </view>
</template>

<script>
import {
  getSb,
  jqzf,
  message,
  setNT,
  showLoading
} from 'common/util'
import {
  mapActions,
  mapState,
} from 'vuex'
export default {
  name: "order-hb",
  components: {},
  data: function () {
    return {
      hbh: "",
      img: "",
      show: !1
    }
  },
  onLoad: function (e) {
    if (getApp().globalData.sphb && getApp().globalData.sphb.id == uni.getStorageSync("bdhc").co.id) {
      (
        this.show = true,
        this.img = getApp().globalData.sphb.img,
        console.log("有缓存"))
    };
    showLoading("海报生成中"),
      this.getSystem({
        setNB: 1
      }),
      setNT("海报"),
      this.query = Object.assign({}, e, {
        co: uni.getStorageSync("bdhc")
      }),
      console.log(this.query, 600 / getSb().rate)
  },
  onReady: function () {
    var t = this;
    setTimeout((function () {
      t.getCanvas()
    }), 100)
  },
  computed: {
    ...mapState(["fxsInfo"])
  },
  methods: {
    getCanvas: function () {
      var e = this;
      var r, i, a, u, s, l, f, d;
      console.log('r, i, a, u, s, l, f, d: ', r, i, a, u, s, l, f, d);
      if (+e.query.type == 1) {
        try {
          r = uni.createCanvasContext("hbctx"),
            i = e.query.co.bgimg || '',
            a = e.query.co.code || '',
            u = e.query.co.logo || '',
            console.log('2222', i, a, u);
          s = 20,
            l = 0,
            f = 290,
            d = 290,
            r.setFillStyle("#fff"),
            r.fillRect(0, 0, 330, 490),
            r.drawImage(i, s, l, f, d),
            r.drawImage(a, 330 - s - 100, d + 20, 100, 100),
            r.save(),
            r.beginPath(),
            r.arc(330 - s - 100 + 50, d + 20 + 50, 22.5, 0, 2 * Math.PI),
            r.clip(),
            r.drawImage(u, 330 - s - 100 + 27.5, d + 20 + 27.5, 45, 45),
            r.restore(),
            r.setFillStyle("#000"),
            r.setFontSize(16),
            r.setTextAlign("left"),
            r.fillText(jqzf({
              str: e.query.co.co.name,
              n: 9
            }), s, d + 30),
            r.setFillStyle(e.tColor),
            r.setFontSize(12),
            r.setTextAlign("left"),
            r.fillText(e.sl, s, d + 20 + 120),
            r.setFillStyle(e.tColor),
            r.setFontSize(23),
            r.setTextAlign("left"),
            r.fillText(e.query.co.co.price, s + 10, d + 20 + 120),
            r.setFillStyle("#666"),
            r.setFontSize(12),
            r.setTextAlign("center"),
            r.fillText("长按小程序码去购买", 260, 430),
            r.draw(), setTimeout((function () {
              uni.canvasToTempFilePath({
                canvasId: "hbctx",
                success: function (t) {
                  e.show = !0;
                  e.img = t.tempFilePath;
                  console.log('e.img: ', e.img);
                  getApp().globalData.sphb = {
                    id: e.query.co.co.id,
                    img: t.tempFilePath
                  }
                },
                complete: function (e) {
                  uni.hideLoading(), console.log(e)
                }
              })
            }), 200)
        } catch (o) {
          console.log('o: ', o);
          message("生成失败", 2)
        }
      }
    },
    bc: function () {
      var e = this;
      uni.saveImageToPhotosAlbum({
        filePath: this.img,
        success: function (n) {
          uni.showModal({
            content: "图片已保存到相册，赶紧晒一下吧~",
            showCancel: !1,
            confirmText: "好的",
            success: function () {
              e.go({
                t: 4
              })
            }
          })
        },
        complete: function (e) {
          e.errMsg.indexOf("deny") > -1 && uni.showModal({
            title: "温馨提示",
            content: "授权失败,请打开小程序设置开启授权",
            showCancel: !1
          }), console.log(e)
        }
      })
    }
  }
}
</script>
<style scoped>
.img {
  width: 660rpx;
  margin-top: 100rpx;
  box-shadow: 0 0 12rpx 3rpx hsla(0, 0%, 86.7%, 0.6);
}

.bcan {
  width: 650rpx;
}
</style>