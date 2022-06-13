<template>
	<radio-group @change="radioChange" v-model="radioVal">
		<view class="f-raw " v-if="rtype==1">
			<label class="weui-cell mr-r1i noafter " :style="[rsname]" v-for="(item, index) in arr" :key="index">
				<view class="mr10 ">
					<radio :checked="item.value==radioVal" class="weui-check " :value="item.value"></radio>
					<text :class="['iconfont f40 ',item.value==radioVal?'icongx':'iconwgx']"
						:style="'color:'+(item.value==radioVal?color||tColor:'')+';'"></text>
				</view>
				<view>{{item.name}}</view>
			</label>
		</view>
		<block v-else>
			<view v-if="rtype==2">
				<label v-for="(item, index) in arr" :key="index">
					<mg-cell :btt="item.name" :bttc="'c3 '+bttc" cname="p253" isr="1" :last="last||index==arr.length-1"
						:vueId="'2a669c84-1-'+index" :vueSlots="['default']">
						<view class="f-y-c " slot="ft" v-if="ranktype==1">
							<radio :checked="item.value==radioVal" class="weui-check " :value="item.value"></radio>
							<text :class="['iconfont f40 ',item.value==radioVal?'icongx':'iconwgx']"
								:style="'color:'+(item.value==radioVal?color||tColor:'')+';'"></text>
						</view>
						<view class="f-y-c mr30 " slot="hd" v-else>
							<radio :checked="item.value==radioVal" class="weui-check " :value="item.value"></radio>
							<text :class="['iconfont f40 ',item.value==radioVal?'icongx':'iconwgx']"
								:style="'color:'+(item.value==radioVal?color||tColor:'')+';'"></text>
						</view>
					</mg-cell>
				</label>
			</view>
		</block>
	</radio-group>
</template>

<script>
	import MgCell from 'components/common/mg-cell.vue';
	export default {
		components: {
			MgCell
		},
		props: {
			arr: "",
			value: "",
			color: "",
			rtype: {
				type: String,
				default: "1"
			},
			rsname: Object,
			ranktype: {
				type: String,
				default: "1"
			},
			bttc: {
				type: String,
				default: ""
			},
			last: {
				type: String,
				default: ""
			}
		},
		data: function() {
			return {
				items: [],
				current: ""
			};
		},
		computed: {
			radioVal: {
				get: function() {
					return this.value;
				},
				set: function(t) {
					this.$emit("input", t);
				}
			}
		},
		methods: {
			radioChange: function(t) {
				this.radioVal = t.detail.value, this.$emit("change", t.detail.value);
			}
		}
	}
</script>
<style scoped>
	.mr-r1i {
		padding: 30rpx 40rpx 30rpx 0;
	}
</style>