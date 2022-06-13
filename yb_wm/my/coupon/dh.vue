<template>
	<view class="pt30 v">
		<view class="p23 f-y-c bf hlt hlb v">
			<input v-model.trim="dhm" @blur="$forceUpdate" class="f-1 mr30 srk f30 v" 
			placeholder="请输入兑换码"  />
			<text @tap="cleanKey" class="iconfont iconyx f42 v" style="color:#CBCBCB;"></text>
		</view>
		<view @tap="go({url:'/yb_wm/order/coupon-bag/gmjl'})" class="f-c c9 f24 p23 v">
			<view class="v">购买记录</view>
			<text class="iconfont iconright f28 v"></text>
		</view>
		<view class="foot-btnc v">
			<button @tap="dhcx" class="foot-btn f30 v" :disabled="loading" :loading="loading"
				:style="'background:'+tColor+';'">兑换卡券</button>
		</view>
		<mg-modal v-model="showyhq" ismr="true" vueId="10c0e10b-1" :vueSlots="['default']" width="630rpx" :zIndex="3000">
			<view class="bf bs30 v">
				<view class="p3 v">
					<view class="t-c f32 mb20 c6 v">查询结果</view>
					<view class="p2 v">{{'兑换码名称：'+dhmInfo.name}}</view>
					<view class="f-y-c p2 v" v-for="(v, i) in dhmInfo.couponArr" :key="i">
						<view class="f-1 mr30 v">{{v.name}}</view>
						<view class="v">x1</view>
					</view>
				</view>
				<view class="hlt f-row wei v" style="height:100rpx;">
					<button @tap="showyhq = !1" class="tcbtn f-1 bf f-c f32 v" hoverClass="be">取消</button>
					<button @tap="save" class="tcbtn f-1 bf f-c f32 v" hoverClass="be" :loading="dhloading"
						:style="'color:'+tColor+';'">立即兑换</button>
				</view>
			</view>
		</mg-modal>
	</view>
</template>

<script>
	import mgModal from 'components/common/modal.vue'
	import {
		message,
		modal,
		setNT,
		stfn
	} from 'common/util'
	export default {
		name: "coupon-dh",
		components: {
			mgModal
		},
		data: function() {
			return {
				dhm: "",
				loading: !1,
				showyhq: !1,
				dhloading: !1,
				dhmInfo: {}
			}
		},
		onLoad: function(n) {
			this.getSystem(), setNT("兑换卡券")
		},
		computed: {},
		methods: {
			cleanKey: function() {
				this.dhm = ""
			},
			dhcx: function() {
				var n = this;
				if (!n.dhm.trim()) {
					message("请输入兑换码", 3)
				} else {
					this.$api.member_exchange__code({
						code: n.dhm
					}).then(res => {
						n.dhmInfo = res;
					})
				}
			},
			save: function() {
				var n = this;
				modal("您确认兑换吗？").then(() => {
					this.$api.member_exchange__code({
						code: n.dhmInfo.code
					}).then(res => {
						n.showyhq = !1;
						stfn(() => {
							n.dhloading = n.showyhq = !1;
							n.go({
								t: 4,
								url: "/yb_wm/my/coupon/my"
							})
						}, 900);
					})
				})
			}
		}
	}
</script>

<style scoped>
	.srk {
		height: 2rem;
	}
</style>