<template>
  <view>
    <view class="bf p23 " :style="'margin:'+''+co.marginTop+u+' '+co.marginLR+u+' '+co.marginBottom+u+';'+'border-radius:'+co.circle+u+';'+'background:'+co.colorBg+';'" v-if="type==1&&co.html">
      <!-- <rich-text class="wbba " :nodes="nodes"></rich-text> -->
    </view>
    <block v-else>
      <!-- <rich-text class="wbba " :nodes="nodes" v-if="type==2"></rich-text> -->
  <!--    <block v-else>
        <u-parse @navigate="navigate" @preview="preview" class="" :content="nodes" vueId="2d4caf72-1" v-if="type==3">
        </u-parse>
      </block> -->
    </block>
  </view>
</template>

<script>
export default {
  name: "searchBox",
  components: {
    // uParse: function () {
    //   Promise.all([e.e("common/vendor"), e.e("components/uParse/src/wxParse")]).then(function () {
    //     return resolve(e("edaf"));
    //   }.bind(null, e)).catch(e.oe);
    // }
  },
  props: {
    type: {
      type: String,
      default: "1"
    },
    co: {
      type: Object,
      default: function () {
        return {
          richText: "",
          topMargin: 0
        };
      }
    },
    u: {
      type: String,
      default: "px"
    },
    color: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {};
  },
  computed: {
    nodes: function () {
      return 1 == this.type ? this.co.html.replace(/\<p class="ql-align-center/gi,
        '<p style="text-align:center" class="ql-align-center').replace(/\<img/gi,
          '<img style="max-width:100%;height:auto"') : this.content.replace(/\<img/gi,
            '<img style="width:100%;height:auto"');
    }
  },
  methods: {
    preview: function (n, t) {
      console.log("src: " + n);
    },
    navigate: function (t, e) {
      console.log("href: " + t), uni.showModal({
        content: "点击链接为：" + t,
        showCancel: !1
      });
    }
  },
}
</script>
<style scoped>
.wxParse {
  width: 100%;
  font-family: Helvetica, sans-serif;
  font-size: 30rpx;
  color: #666;
  line-height: 1.8;
}

.wxParse view {
  word-break: hyphenate;
}

.wxParse .inline {
  display: inline;
  margin: 0;
  padding: 0;
}

.wxParse .div {
  margin: 0;
  padding: 0;
}

.wxParse .h1 .text {
  font-size: 2em;
  margin: 0.67em 0;
}

.wxParse .h2 .text {
  font-size: 1.5em;
  margin: 0.83em 0;
}

.wxParse .h3 .text {
  font-size: 1.17em;
  margin: 1em 0;
}

.wxParse .h4 .text {
  margin: 1.33em 0;
}

.wxParse .h5 .text {
  font-size: 0.83em;
  margin: 1.67em 0;
}

.wxParse .h6 .text {
  font-size: 0.67em;
  margin: 2.33em 0;
}

.wxParse .h1 .text,
.wxParse .h2 .text,
.wxParse .h3 .text,
.wxParse .h4 .text,
.wxParse .h5 .text,
.wxParse .h6 .text,
.wxParse .b,
.wxParse .strong {
  font-weight: bolder;
}

.wxParse .p {
  margin: 1em 0;
}

.wxParse .i,
.wxParse .cite,
.wxParse .em,
.wxParse .var,
.wxParse .address {
  font-style: italic;
}

.wxParse .pre,
.wxParse .tt,
.wxParse .code,
.wxParse .kbd,
.wxParse .samp {
  font-family: monospace;
}

.wxParse .pre {
  overflow: auto;
  background: #f5f5f5;
  padding: 16rpx;
  white-space: pre;
  margin: 1em 0rpx;
}

.wxParse .code {
  display: inline;
  background: #f5f5f5;
}

.wxParse .big {
  font-size: 1.17em;
}

.wxParse .small,
.wxParse .sub,
.wxParse .sup {
  font-size: 0.83em;
}

.wxParse .sub {
  vertical-align: sub;
}

.wxParse .sup {
  vertical-align: super;
}

.wxParse .s,
.wxParse .strike,
.wxParse .del {
  text-decoration: line-through;
}

.wxParse .strong,
.wxParse .s {
  display: inline;
}

.wxParse .a {
  color: #00bfff;
}

.wxParse .video {
  text-align: center;
  margin: 22rpx 0;
}

.wxParse .video-video {
  width: 100%;
}

.wxParse .img {
  display: inline-block;
  width: 0;
  height: 0;
  max-width: 100%;
  overflow: hidden;
}

.wxParse .blockquote {
  margin: 10rpx 0;
  padding: 22rpx 0 22rpx 22rpx;
  font-family: Courier, Calibri, 宋体;
  background: #f5f5f5;
  border-left: 6rpx solid #dbdbdb;
}

.wxParse .blockquote .p {
  margin: 0;
}

.wxParse .ul,
.wxParse .ol {
  display: block;
  margin: 1em 0;
  padding-left: 33rpx;
}

.wxParse .ol {
  list-style-type: disc;
}

.wxParse .ol {
  list-style-type: decimal;
}

.wxParse .ol > weixin-parse-template,
.wxParse .ul > weixin-parse-template {
  display: list-item;
  -webkit-box-align: baseline;
  align-items: baseline;
  text-align: match-parent;
}

.wxParse .ol > .li,
.wxParse .ul > .li {
  display: list-item;
  -webkit-box-align: baseline;
  align-items: baseline;
  text-align: match-parent;
}

.wxParse .ul .ul,
.wxParse .ol .ul {
  list-style-type: circle;
}

.wxParse .ol .ol .ul,
.wxParse .ol .ul .ul,
.wxParse .ul .ol .ul,
.wxParse .ul .ul .ul {
  list-style-type: square;
}

.wxParse .u {
  text-decoration: underline;
}

.wxParse .hide {
  display: none;
}

.wxParse .del {
  display: inline;
}

.wxParse .figure {
  overflow: hidden;
}

.wxParse .table {
  width: 100%;
}

.wxParse .thead,
.wxParse .tfoot,
.wxParse .tr {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
}

.wxParse .tr {
  width: 100%;
  display: flex;
  border-right: 2rpx solid #e0e0e0;
  border-bottom: 2rpx solid #e0e0e0;
}

.wxParse .th,
.wxParse .td {
  display: flex;
  width: 1276rpx;
  overflow: auto;
  -webkit-box-flex: 1;
  flex: 1;
  padding: 11rpx;
  border-left: 2rpx solid #e0e0e0;
}

.wxParse .td:last {
  border-top: 2rpx solid #e0e0e0;
}

.wxParse .th {
  background: #f0f0f0;
  border-top: 2rpx solid #e0e0e0;
}
</style>