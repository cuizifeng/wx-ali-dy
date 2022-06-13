<template>
	<view class="mh100 ">
		<view class="gyhead posi-r ">
			<view class="wh " :style="'background:'+tColor+';'"></view>
			<view class="posi-a t270 wh ">
				<view class="m03 ">
					<view class="bf mb20 bs20 p3 minhe ">
						<view class="iconwidth bs10 ">
							<mg-img class="" :src="system.icon" vueId="71bb9fda-1"></mg-img>
						</view>
						<view class="f-c c0 f32 mt90 f26 c3 ">{{system.name}}</view>
						<view class="f28 c6 mt30 ">
							<mg-rtext class="" :content="system.introduction" type="2" vueId="71bb9fda-2"></mg-rtext>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mgRtext from "components/common/functionCmp/rich-text.vue";
	import {
		mapActions,
		mapState,
	} from 'vuex'
	import {
		setNT
	} from 'common/util';
	export default {
		name: "gywm",
		components: {
			mgRtext
		},
		data: function() {
			return {
				loading: !1,
				content: "",
				systemData: ""
			}
		},
		onLoad: function(t) {
			var e = this;
			e.getSystem({
				setNB: 1
			}), setNT("关于我们")
		},
		computed: {

			...mapState(['vipConfig'])
		},
		methods: {}
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
		margin: .67em 0;
	}

	.wxParse .h2 .text {
		font-size: 1.5em;
		margin: .83em 0;
	}

	.wxParse .h3 .text {
		font-size: 1.17em;
		margin: 1em 0;
	}

	.wxParse .h4 .text {
		margin: 1.33em 0;
	}

	.wxParse .h5 .text {
		font-size: .83em;
		margin: 1.67em 0;
	}

	.wxParse .h6 .text {
		font-size: .67em;
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
		font-size: .83em;
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

	.wxParse .ol>weixin-parse-template,
	.wxParse .ul>weixin-parse-template {
		display: list-item;
		-webkit-box-align: baseline;
		align-items: baseline;
		text-align: match-parent;
	}

	.wxParse .ol>.li,
	.wxParse .ul>.li {
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

	.gyhead {
		width: 100%;
		height: 300rpx;
	}

	.t270 {
		top: 100rpx;
	}

	.iconwidth {
		width: 120rpx;
		height: 120rpx;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		position: absolute;
	}

	.minhe {
		min-height: 800rpx;
		margin-top: 60rpx;
	}
</style>