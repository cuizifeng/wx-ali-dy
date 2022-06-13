<template>
	<view class="">
		<view class="p3 ">
			<view class="bf9 bs10 p2 ">
				<textarea class="w100 c6 " maxlength="50" placeholder="请输入备注、偏好等要求" placeholderClass="f24" style="height:160rpx;"
					v-model="note"></textarea>
				<view class="f-x-e f24 c9 ">{{note.length}}<text class="m05 ">/</text>50个字</view>
			</view>
			<view class="kjsr " v-if="larr.length">快捷输入</view>
			<view class="f-raw ">
				<view @tap="djnote(v)" class="label bs10 f-c c6 f26 " v-for="(v, i) in larr" :key="i">
					{{v}}</view>
			</view>
		</view>
		<view class="foot-btnc posi-r mt30 ">
			<button @tap="save" class="foot-btn b00 bs15 " :disabled="loading" hoverClass="btnhc" :loading="loading"
				:style="'background:'+btncolor+';'">提交</button>
		</view>
	</view>
</template>

<script>
import { getPage, message, setNT } from 'common/util'
	import {
		mapActions,
		mapState,
	} from 'vuex'
	export default {
		name: "order-index",
		data: function() {
			return {
				note: "",
				loading: !1,
				btncolor: "",
				type: "1"
			}
		},
		onLoad: function(t) {
			setNT("订单备注"), this.note = t.note || "", this.btncolor = t.color, this.type = t.type
		},
		computed: {
			...mapState(["sjxx"]),
			larr: function() {
				var e = uni.getStorageSync("note") ? [uni.getStorageSync("note")] : [];
				return e.concat([])
			}
		},
		methods: {
			djnote: function(t) {
				var e = this.note + t + "，",
					n = this.note.substr(this.note.length - 1, 1);
				if (e.length > 50) return message("上限50字哦", 3);
				this.note += "，" == n || "," == n || "" == n ? t + "，" : "，" + t
			},
			save: function() {
				this.loading = !0;
				var t = getPage();
				t.$vm.params.userNote = this.note, this.go({
					t: 4
				})
			}
		}
	}
</script>
<style scoped>
	page {
		background: #fff;
	}

	.m05 {
		margin: 0 5rpx;
	}

	.kjsr {
		margin: 35rpx 0;
		color: #8f8f8f;
	}

	.label {
		border: 1px solid #efefef;
		padding: 8rpx 15rpx;
		margin: 0 20rpx 20rpx 0;
	}
</style>