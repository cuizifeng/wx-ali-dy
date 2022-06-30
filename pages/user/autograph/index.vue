<template>
  <view class="page-content">
    <view class="form">
      <view class="form-content">
        <canvas
          class="form-content__canvas"
          canvas-id="canvas_sign"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
          disable-scroll="true"
        ></canvas>
      </view>

      <view class="form-footer">
        <button class="form-footer__reset" @click="autographClick(1)">
          重置
        </button>
        <button class="form-footer__save" @click="autographClick(2)">
          保存
        </button>
        <button class="form-footer__preview" @click="autographClick(3)">
          预览
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      canvasCtx: "", //绘图图像
      points: [], //路径点集合
      hasSign: false,
      isInit: false,
    };
  },
  onLoad(query) {
    this.canvasCtx = uni.createCanvasContext("canvas_sign", this); //创建绘图对象
    //设置画笔样式
    this.canvasCtx.lineWidth = 6;
    // 设置线条的端点样式
    this.canvasCtx.lineCap = "round";
    // 设置线条的交点样式
    this.canvasCtx.lineJoin = "round";
  },

  methods: {
    touchstart: function (e) {
      if (!this.isInit) {
        this.isInit = true;
        this.autographClick(1);
      }
      let startX = e.changedTouches[0].x;
      let startY = e.changedTouches[0].y;
      let startPoint = {
        X: startX,
        Y: startY,
      };
      this.points.push(startPoint);
      //每次触摸开始，开启新的路径
      this.canvasCtx.beginPath();
    },

    touchmove: function (e) {
      let moveX = e.changedTouches[0].x;
      let moveY = e.changedTouches[0].y;
      let movePoint = {
        X: moveX,
        Y: moveY,
      };
      this.points.push(movePoint); //存点
      let len = this.points.length;
      if (len >= 2) {
        this.draw(); //绘制路径
      }
    },

    touchend: function () {
      this.points = [];
      this.canvasCtx.draw(true);
    },

    draw: function () {
      let point1 = this.points[0];
      let point2 = this.points[1];
      this.points.shift();
      this.canvasCtx.moveTo(point1.X, point1.Y);
      this.canvasCtx.lineTo(point2.X, point2.Y);
      this.canvasCtx.stroke();
      this.canvasCtx.draw(true);
      this.hasSign = true;
    },

    // 底部按钮点击操作
    autographClick(type) {
      let that = this;
      if (type === 1) {
        //清空画布
        this.hasSign = false;
        uni.getSystemInfo({
          success: function (res) {
            let canvas = uni
              .createSelectorQuery()
              .select(".form-content__canvas");
            canvas.boundingClientRect().exec(function (data) {
              let canvasw = Math.ceil(data[0].width);
              let canvash = Math.ceil(data[0].height);
              that.canvasCtx.fillStyle = "#fff";
              that.canvasCtx.fillRect(0, 0, canvasw, canvash);
              that.canvasCtx.draw(true);
            });
          },
        });
      } else {
        if (!this.hasSign) {
          uni.showToast({
            title: "签名不能为空",
            icon: "none",
            duration: 2000,
          });
          return;
        }
        uni.getSystemInfo({
          success: function (res) {
            let canvas = uni
              .createSelectorQuery()
              .select(".form-content__canvas");
            canvas.boundingClientRect().exec(function (data) {
            //   console.log(
            //     "canvas saveSign:",
            //     data[0].width + "X" + data[0].height
            //   );
              let canvasw = Math.ceil(data[0].width);
              let canvash = Math.ceil(data[0].height);
              uni.canvasToTempFilePath({
                destWidth: canvasw,
                destHeight: canvash,
                fileType: "jpg",
                canvasId: "canvas_sign",
                success: function (res) {
                //   console.log("图片导出成功：", res);
                  let path = res.tempFilePath;

                  // 保存图片
                  if (type === 2) {
                    that.uploadPic(path);
                  } else if (type === 3) {
                    // 预览图片
                    uni.previewImage({
                      urls: [path],
                    });
                  }
                },
                fail: (err) => {
                  // http://tmp/2LVQyvzddk2R820a9009dff43323d8e7fc9ef7a8d076.jpg
                //   console.log("图片导出失败：", err);
                },
              });
            });
          },
        });
      }
    },

    // 图片上传处理
    uploadPic(tempFile) {
      // 1、将本地图片上传到服务器（假装是七牛云服务器）
      // 2、将七牛云返回的链接，上传到我们的服务器平台
    //   console.log("------:", tempFile);
      uni.showLoading({
        title: "正在上传中...",
      });
      setTimeout(() => {
        uni.showToast({
          title: "假装签名上传成功",
          duration: 2000,
          icon: "none",
        });
      }, 1000);
    },
  },
};
</script>


<style lang="scss" scoped>
/*
	* 横屏后的适配方案
	* @param $rpx为需要转换的字号
	* @参考 https://blog.csdn.net/sdfsfsdscd/article/details/91375066
	**/
@function tovmin($rpx) {
  @return #{$rpx * 100 / 750}vmin;
}

.page-content {
  width: 100vw;
  height: 100vh;

  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .form-content {
      width: 100%;
      height: 100%;

      &__canvas {
        // height: calc(
        //   100vh - tovmin(20) - tovmin(120) - constant(safe-area-inset-bottom)
        // );
        // height: calc(
        //   100vh - tovmin(20) - tovmin(120) - env(safe-area-inset-bottom)
        // );
        // width: 100vw;
        height: 100%;
        width: 100%;
      }
    }

    .form-footer {
      padding-top: tovmin(20);
      height: calc(tovmin(120) + constant(safe-area-inset-bottom));
      height: calc(tovmin(120) + env(safe-area-inset-bottom));
      width: 100%;

      display: flex;
      flex-direction: row;

      background: #ffffff;
      box-shadow: 0 tovmin(4) tovmin(20) tovmin(2) rgba(183, 183, 183, 0.2);

      button {
        width: 20vw;

        height: tovmin(88);
        line-height: tovmin(88);
        border-radius: tovmin(48);
        text-align: center;
        font-size: tovmin(36);
        font-weight: bold;
      }

      button::after {
        border: none;
      }

      &__reset {
        color: #008afe;
        border: tovmin(1) solid #008afe;
      }

      &__save {
        background-image: linear-gradient(135deg, #1bc5ff 0%, #008afe 100%);
      }

      &__preview {
        color: #008afe;
        border: tovmin(1) solid #008afe;
      }
    }
  }
}
</style>

