<template>
  <view>
    <view class="xc-upload-section">
      <view class="xc-upload-list">
        <!-- 列表 -->
        <view class="xc-upload-item" :style="'width:'+width*2+'rpx;height:'+height*2+'rpx;'" v-for="(item,index) of list" :key="index">
          <view class="xc-upload-item-del" @click="delImage(index)">
            <view></view>
          </view>
          <view class="xc-upload-item-img" @click="previewImage(item)">
            <image :src="item" mode="aspectFill"></image>
          </view>
        </view>

        <!-- 上传按钮 -->
        <view class="xc-upload-item xc-upload-add" :style="'width:'+width*2+'rpx;height:'+height*2+'rpx;'" v-if="(this.count - this.list.length)>0" @click="chooseUploads">

          <!-- 		<view class="xc-upload-item-img">
					<image src="../../static/img/ico-fuwujilu.png"  mode="aspectFill" ></image>
					</view> -->
          <view class="xc-upload-add-icon"></view>
          <view class="xc-upload-add-text" v-if="btnText">{{btnText}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    //图片类型
    types: {
      type: String,
      default: 'image'
    },
    //上传按钮文字
    btnText: {
      type: String,
      default: ''
    },
    //图片宽度
    width: {
      type: Number,
      default: 80
    },
    //图片宽度
    height: {
      type: Number,
      default: 80
    },
    //已上传图组
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    //上传API接口
    uploadUrl: {
      type: String,
      default: ''
    },
    //限制上传图片数
    count: {
      type: Number,
      default: 1
    },
    //上传图片大小 默认3M
    maxSize: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      //展示的图片地址
      uploads: [],
      //临时上传图组
      tmp_uploads: [],

      exceeded_list: [],
    };
  },
  methods: {
    //图片预览
    previewImage(url) {
      console.log(url);
      uni.previewImage({
        current: url,
        urls: this.list
      })
    },
    //选择图片
    chooseUploads() {
      var that = this;
      switch (this.types) {
        case 'image':
          uni.chooseImage({
            count: this.count - this.list.length, //默认1
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
              //选中图片组
              let len = res.tempFiles.length;

              for (let i = 0; i < len; i++) {
                if (Math.ceil(res.tempFiles[i].size / 1024) < this.maxSize * 1024) {
                  that.tmp_uploads.push(res.tempFiles[i].path)
                } else {
                  // this.exceeded_list.push(i === 0 ? 1 : i + 1);
                  // uni.showModal({
                  // 	title: '提示',
                  // 	content: `第${[...new Set(this.exceeded_list)].join(',')}张图片超出限制${this.maxSize}MB,已过滤`
                  // });
                }
              }
              console.log("待上传临时图组", that.tmp_uploads);
              //选中后上传
              that.uploadAll();
            },
            fail: (err) => {
              uni.showModal({
                content: JSON.stringify(err)
              });
            }
          });
          break;
        case 'video':
          uni.chooseVideo({
            sourceType: ['camera', 'album'],
            success: (res) => {
              if (Math.ceil(res.size / 1024) < this.maxSize * 1024) {
                that.tmp_uploads.push(res.tempFilePath)
                // uni.uploadFile({
                // 	url: that.uploadUrl, //仅为示例，非真实的接口地址
                // 	filePath: res.tempFilePath,
                // 	name: 'file',
                // 	//请求参数
                // 	formData: {
                // 		'user': 'test'
                // 	},
                // 	success: (uploadFileRes) => {
                // 		that.list.push()
                // 		//this.$emit('successVideo',uploadFileRes)
                // 	}
                // });
                console.log("待上传临时图组", that.tmp_uploads);
                that.uploadAll();

              } else {
                uni.showModal({
                  title: '提示',
                  content: `第${[...new Set(this.exceeded_list)].join(',')}张视频超出限制${this.maxSize}MB,已过滤`
                });
              }
            },
            fail: (err) => {
              uni.showModal({
                content: JSON.stringify(err)
              });
            }
          });
          break;
      }
    },
    delImage(index) {

      this.list.splice(index, 1)

    },
    //开始上传图片
    uploadAll() {
      var that = this;
      if (!this.uploadUrl) {
        uni.showModal({
          content: '请填写上传接口'
        });
        return;
      };

      for (let file_url of this.tmp_uploads) {

        that.upload(file_url).then(res => {
          console.log("成功上传返回", res);
          //接口返回data是字符串，需要转换一下
          let data = JSON.parse(res.data);

          that.list.push(data.data);
          let del_index = that.tmp_uploads.findIndex(item => {
            return item == file_url;
          });
          that.tmp_uploads.splice(del_index, 1);
        }).catch(err => {
          uni.showModal({
            content: JSON.stringify(err)
          });
        })
      }

      //that.$emit('done',that.list);
    },
    //开始上传
    upload(tmp_url) {

      return new Promise((scb, ecb) => {
        uni.uploadFile({
          url: this.uploadUrl,
          filePath: tmp_url,
          name: 'file',
          //请求参数
          formData: {
            'user': 'test'
          },
          success: (uploadFileRes) => {
            scb(uploadFileRes);
          },
          fail(err) {
            ecb(err);
          }
        });
      })

    }
  }
}
</script>

<style scoped>
.xc-upload-section {
  width: 100%;
  box-sizing: border-box;
}
/* 图片列表 */
.xc-upload-list {
  display: flex;
  width: 104%;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.xc-upload-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  position: relative;
  box-sizing: border-box;
  width: 160rpx;
  height: 160rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}
/* 左上角删除按钮 */
.xc-upload-item .xc-upload-item-del {
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  right: -10rpx;
  top: -10rpx;
  background-color: #cc0000;
  color: #fff;
  z-index: 5;
  border-radius: 200rpx;
  font-size: 32rpx;
  text-align: center;
}
.xc-upload-item .xc-upload-item-del view {
  position: relative;
  width: 100%;
  height: 100%;
}
.xc-upload-item .xc-upload-item-del view::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 30rpx;
  height: 2px;
  display: block;
  background-color: #ffffff;
}
.xc-upload-item .xc-upload-item-del view::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(135deg);
  width: 30rpx;
  height: 2px;
  display: block;
  background-color: #ffffff;
}

/* 图片*/
.xc-upload-item .xc-upload-item-img {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.xc-upload-item .xc-upload-item-img image {
  width: 100%;
  height: 100%;
}

/* 添加按钮 */
.xc-upload-add {
  flex-direction: column;
}
.xc-upload-add-icon {
  width: 100%;
  flex: 1;
  position: relative;
}
.xc-upload-add-icon::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 1px;
  display: block;
  background-color: #999;
}
.xc-upload-add-icon::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  width: 50%;
  height: 1px;
  display: block;
  background-color: #999;
}
.xc-upload-add-text {
  height: 30rpx;
  line-height: 30rpx;
  margin-bottom: 10rpx;
  text-align: center;
  font-size: 28rpx;
  color: #888;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
