<template>
	<view @tap="$emit('tab')"
		:class="['weui-cell ',[last?'last':''],[isl?'left0':''],[isr?'right30':''],[noc?'aligns':''],cname]"
		:hoverClass="hc?'weui-cell_active':''" :style="{ background: bgc }">
		<view :class="['f-g-0 f-c ',hdc]">
			<view class="img o-h "
				:style="'width:'+w+'rpx'+';'+'height:'+h+'rpx'+';'+'border-radius:'+brs+';'+'margin-right:'+imgr+'rpx'+';'"
				v-if="img">
				<mg-img   :m="m" :src="img" vueId="197e4b7a-1"></mg-img>
			</view>
			<text :class="['iconfont mr30 ',iconn]" v-if="iconn"></text>
			<view :class="['weui-label ',htc]" :style="'width:'+hw+'rpx'+';'" v-if="ht">{{ht}}</view>
			<slot name="hd"></slot>
		</view>
		<view class="f-1 " :style="'min-width:'+bdmw+';'">
			<view :class="['',bttc]" v-if="btt">{{btt}}</view>
			<view class="mt10 c9 f24 " v-if="bbt">{{bbt}}</view>
			<slot name="bd"></slot>
		</view>
		<view :class="['c9 ',ftc]" :style="'color:'+color+';'" v-if="ft">{{ft}}</view>
		<slot name="ft"></slot>
		<text :class="['iconfont iconright c9 arrow ml5 ',ftc,ac]"
			:style="'color:'+acolor+';'+'font-size:'+asize+'rpx'+';'" v-if="arrow"></text>
	</view>
</template>

<script>
	export default {
		name: "mg-cell",
		props: {
			bgc: {
				type: String,
				default: ""
			},
			htc: "",
			last: "",
			cname: "",
			noc: "",
			sname: "",
			isl: "",
			isr: "",
			iconn: "",
			ht: "",
			hdc: "",
			hw: "",
			img: "",
			m: {
				type: String,
				default: "aspectFill"
			},
			w: "",
			h: "",
			brs: "",
			imgr: "",
			bdmw: {
				type: String,
				default: "0"
			},
			btt: "",
			bttc: "",
			bbt: "",
			ft: "",
			ftc: "",
			color: "",
			arrow: "",
			ac: "",
			asize: "",
			acolor: "",
			hc: {
				type: String,
				value: ""
			}
		},
		data: function() {
			return {};
		},
		computed: {},
		methods: {
			maskTap: function() {
				this.$emit("input", !1);
			}
		}
	}
</script>
<style scoped>
	.weui-cell:after {
		display: block;
	}

	.img {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.last:after {
		display: none;
	}

	.left0:after {
		left: 0rpx;
	}

	.right30:after {
		right: 30rpx;
	}

	.arrow {
		margin-right: -5rpx;
	}

	.aligns {
		-webkit-box-align: start;
		align-items: flex-start;
	}
</style>