<template>
	<view class="lines " :style="'margin:'+''+co.marginTB+u+' 0'+';'">
		<view class="one "
			:style="'border-color:'+co.colorBg+';'+'border-width:'+co.height+u+';'+'border-top-style:'+(co.type==1?'solid':co.type==3?'dashed':'dotted')+';'"
			v-if="co.type!=2"></view>
		<view class="two " :style="'border-color:'+co.colorBg+';'+'height:'+co.height+u+';'" v-else></view>
	</view>
</template>

<script>
	export default {
		name: "lines",
		props: {
			co: {
				type: Object,
				default: function() {
					return {};
				}
			},
			u: {
				type: String,
				default: "px"
			}
		},
		data: function() {
			return {};
		},
		methods: {
			goTo: function(n) {
				this.goUrl(n.url, n);
			}
		}
	}
</script>
<style scoped>
	.lines .one {
		border-top: 1px solid #eee;
	}

	.lines .two {
		border-width: 1px 0;
		border-style: solid;
	}
</style>