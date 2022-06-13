<template>
	<view class="mh100 pb115 ">
		<view @tap="go({url:'/yb_wm/other/info/detail?id='+v.id})" class="weui-cell f-sh " v-for="(v, i) in dataList"
			:key="i">
			<view class="f-1 f-y-bt ">
				<view class="">
					<view class="f26 t-o-e ">{{v.title}}</view>
					<view class="f24 t-o-e c9 " v-if="v.introduction">{{v.introduction}}</view>
				</view>
				<view class="c9 f24 l-n ">{{timeToDate(v.createdAt, "MM月dd日")}}</view>
			</view>
			<view class="img ml30 bs10 ">
				<mg-img class="" :src="v.icon" :vueId="'00fdf9b6-1-'+i"></mg-img>
			</view>
		</view>
		<jzz bgcolor="transparent" class="" imgn="zwjf" :mygd="mygd" :nodata="dataList.length==0&&isget" vueId="00fdf9b6-2">
		</jzz>
		<tab-bar class="" vueId="00fdf9b6-3"></tab-bar>
	</view>
</template>

<script>
	import jzz from "components/common/jzz.vue";
	import {
		utilMixins
	} from 'common/utilMixins';
	import {
    mpShare,
		setNT,
		sljz
	} from 'common/util';

	export default {
		name: "myIntegral",
		components: {
			jzz
		},
		data: function() {
			return {
				params: {
					page: 1,
					size: 10
				}
			}
		},
		onLoad: function() {
			var t = this;
			t.getSystem().then((function() {
				setNT(t.system.custom.informationTitle)
			})), t.getList();
		},
		mixins: [utilMixins, sljz],
		computed: {},
		methods: {
			getList: function() {
				var t = this;
				this.$api.config_information(t.params).then(res => {
					t.dataList = t.dataList.concat(res), t.isget = !0,
						t.mygd = t.params.size > res.length, t.params.page++;
				})
			}
		},
		onShareAppMessage: function() {
			return mpShare({
				t: "进来看看" + this.system.custom.informationTitle
			})
		},
		onShareTimeline: function(t) {
			return {
				title: "进来看看" + this.system.custom.informationTitle
			}
		}
	}
</script>
<style scoped>
	.img {
		width: 178rpx;
		height: 123rpx;
	}
</style>