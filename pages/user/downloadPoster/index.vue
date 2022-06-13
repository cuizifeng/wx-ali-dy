<template>
  <view>
    <navBar :title="'海报'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #FAAE18 100%);'" :wordColor="'#fff'"></navBar>

    <view class="my-canvas-box">
      <canvasDrawer class="canvasCenter" ref="poster" :width="690" :height="1100">
        <template v-slot="{src}">
          <image :src="src" @longpress.stop="saveImageToPhotosAlbum" style="width: 690rpx;height: 1100rpx;border-radius: 15rpx;"></image>
        </template>
      </canvasDrawer>

      <view class="footer" @longpress.stop="saveImageToPhotosAlbum">长按保存海报</view>
    </view>

  </view>
</template>

<script>
import canvasDrawer from "@/components/canvas-drawer/index.vue";
import { Tips } from "@/utils/miniUtils.js";
import { getCode } from '@/api/my.js'
export default {
  components: {
    canvasDrawer
  },

  data() {
    return {
      posterRef: null
    }
  },
  onLoad(options) {
    uni.showLoading({ title: '渲染海报中...' })
    this.getCode(options.shareIcon)

  },

  methods: {
    getCode(shareIcon) {
      getCode({
        page: 'pages/activity/apply/index',
        ident: 'distribution',
        scene: uni.getStorageSync('userId')
      }).then(res => {
        this.generatePoster(shareIcon, res.data)
      })
    },


    saveImageToPhotosAlbum() {
      var that = this;
      uni.showModal({
        title: '提示',
        content: '确定要保存分享海报吗？',
        success: res => {
          if (res.cancel) {
            // 用户点击了取消属性
            Tips({ title: '', type: 3, end: 1000, num: 1 })
          } else if (res.confirm) {
            // 用户点击了确定属性
            that.posterRef.saveImageToPhotosAlbum().then(res => {
              if (res == 200) {
                Tips({ title: '您的二维码已保存到相册', end: 3000, type: 3, num: 1 })
              }
            });
          }
        },
        fail: (err) => {
          Tips({ title: '', type: 3, end: 1000, num: 1 })
        }
      })
    },

    generatePoster(a, b) {
      this.posterRef = this.$refs.poster;
      this.posterRef
        .setBackgroundColor("#fff") //指定渲染图片的背景色
        .addImage(a, 0, 0, 750, 1100, false)
        .addImage(b, 200, 700, 300, 300, true)
        // //   .addRect(0, 0, 750, 198, "#fff") //绘制矩形
        // .addImage(this.setUrl(data.avatar), 32, 28, 98, 98, true) //绘制圆图片，如果不绘制圆图片最后一个参数可以不传或传false，当最后一个参数为true时圆形的直径为w，h参数将没有意义
        // .addText(`${data.nickname}，我已购买`, 140, 45, 25, "#000", 300, false)
        // .addText(`推荐给你，立省 ¥ ${math.subtract(data.ot_price, data.price)}`, 140, 85, 25, "#000", 300, false)
        // //   .addQRCode("http://www.shengxinyustudio.com", 585, 22, 130, 130) //绘制二维码（不要太长否则会扫不出来）
        // //   .addText("扫码查看我的主页", 581, 159, 20, "#333333") //绘制文本
        // .addImage(data.image, 19, 150, 650, 650, false) //绘制云端图片时第一个参数直接传云端图片地址即可，不需要require。注意不要跨域
        // //   .addRect(0, 690, 750, 158, "#FEFEFE")
        // .addText(data.store_name, 19, 820, 34, "#FF0000", 600, false)
        // .addText(`官网价 ¥ ${data.ot_price}`, 39, 880, 34, "#FF0000", 300, false)
        // .addText(`折扣价 ¥ ${data.price}`, 39, 950, 34, "#FF0000", 300, false)
        // .addText(`立即省 ¥ ${math.subtract(data.ot_price, data.price)}`, 39, 1020, 34, "#FF0000", 300, false)
        // .addQRCode(data.url, 430, 870, 200, 200) //绘制二维码
        .draw();
      this.isCanvasLoading = true;
      uni.hideLoading();
    },

    setUrl(url) {
      return url.replace('https://thirdwx.qlogo.cn', 'https://wx.qlogo.cn').replace('132', '0')
    }
  },
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  left: 91rpx;
  bottom: 30rpx;
  width: 568rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  background: linear-gradient(180deg, #ffcb4c 0%, #f8a605 100%);
  border-radius: 45rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.my-canvas-box {
  width: 750rpx;
  height: 100%;
  position: fixed;
  z-index: 99;
}
.canvasCenter {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
</style>