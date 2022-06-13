<template>
	<view :class="['bf p23 p-r ',cname]">
		<checkbox-group @change="checkboxChange">
			<label class="f-y-c ">
				<block v-if="type==1">
					<checkbox :checked="cbVal" class="weui-check "></checkbox>
					<text :class="['iconfont mr10 ',cbVal?'icongx':'iconwgx']" :style="'color:'+(cbVal?color:'')+';'"></text>
					<view class="">阅读并同意</view>
					<navigator @tap.stop="" class="weui-agree__link " :style="'color:'+color+';'"
						:url="'/yb_wm/my/other/gywm?t='+title+'&p='+p">{{'《'+title+'》'}}</navigator>
				</block>
				<block v-else>
					<checkbox :checked="cbVal" class="weui-check "></checkbox>
					<text :class="['iconfont mr10 ',cbVal?'icongx':'icongx']" :style="'color:'+(cbVal?color:'')+';'"></text>
					<view class="c9 f24 ">{{title}}</view>
				</block>
			</label>
		</checkbox-group>
	</view>
</template>

<script>
	import MgCell from 'components/common/mg-cell.vue';
	export default {
		components: {
			MgCell
		},
		props: {
			title: "",
			value: "",
			color: "",
			p: "",
			cname: "",
			sname: "",
			type: {
				type: String,
				default: "1"
			}
		},
		data: function() {
			return {};
		},
		computed: {
			cbVal: {
				get: function() {
					return this.value;
				},
				set: function(n) {
					this.$emit("input", n);
				}
			}
		},
		methods: {
			checkboxChange: function(n) {
				this.cbVal = !this.cbVal;
			}
		}
	}
</script>
<style scoped>
	.weui-cell {
		padding: 30rpx 40rpx 30rpx 0;
	}
</style>