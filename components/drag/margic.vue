<template>
	<view class="margic o-h " :style="'margin:'+''+co.marginTop+u+' '+co.marginLR+u+' '+co.marginBottom+u+';'">
		<view class="f-row " v-if="co.type==1">
			<view @tap="goTo(v)" :class="['bf margi1 f-1 b-re o-h ',co.shifting>0||v.img?'b-n':'']"
				:style="'margin-right:'+(i!=1?co.shifting+u:'')+';'+'border-radius:'+co.circle+u+';'+'height:'+imgH+';'" v-if="i<2"
				v-for="(v, i) in co.imgList1" :key="i">
				<mg-img class="" :src="v.img" :vueId="'d0f4851a-1-'+i" v-if="v.img"></mg-img>
			</view>
		</view>
		<block v-else>
			<view class="f-row " v-if="co.type==2">
				<view @tap="goTo(v)" :class="['bf margi2 f-1 b-re o-h ',co.shifting>0||v.img?'b-n':'']"
					:style="'margin-right:'+(i!=2?co.shifting+u:'')+';'+'border-radius:'+co.circle+u+';'+'height:'+imgH+';'" v-if="i<3"
					v-for="(v, i) in co.imgList1" :key="i">
					<mg-img class="" :src="v.img" :vueId="'d0f4851a-2-'+i" v-if="v.img"></mg-img>
				</view>
			</view>
			<block v-else>
				<view class="f-row " v-if="co.type==3">
					<view @tap="goTo(v)" :class="['bf f-1 b-re o-h ',co.shifting>0||v.img?'b-n':'']"
						:style="'margin-right:'+(i!=2?co.shifting+u:'')+';'+'border-radius:'+co.circle+u+';'" v-if="i==0"
						v-for="(v, i) in co.imgList1" :key="i">
						<mg-img class="" :src="v.img" :vueId="'d0f4851a-3-'+i" v-if="v.img"></mg-img>
					</view>
					<view class="f-1 f-col ">
						<view @tap="goTo(v)" :class="['bf margi2 f-1 b-be o-h ',co.shifting>0||v.img?'b-n':'']"
							:style="'margin-bottom:'+(i!=2?co.shifting+u:'')+';'+'border-radius:'+co.circle+u+';'+'height:'+co.height+'rpx'+';'"
							v-if="i>0" v-for="(v, i) in co.imgList1" :key="i">
							<mg-img class="" :src="v.img" :vueId="'d0f4851a-4-'+i" v-if="v.img"></mg-img>
						</view>
					</view>
				</view>
				<block v-else>
					<view class="" v-if="co.type==4">
						<view @tap="goTo(v)" :class="['bf margi1 b-be o-h ',co.shifting>0||v.img?'b-n':'']"
							:style="'margin-bottom:'+co.shifting+u+';'+'border-radius:'+co.circle+u+';'+'height:'+imgH+';'" v-if="i==0"
							v-for="(v, i) in co.imgList1" :key="i">
							<mg-img class="" :src="v.img" :vueId="'d0f4851a-5-'+i" v-if="v.img"></mg-img>
						</view>
						<view class="f-row ">
							<view @tap="goTo(v)" :class="['bf margi1 f-1 b-re o-h ',co.shifting>0||v.img?'b-n':'']"
								:style="'margin-right:'+(i!=2?co.shifting+u:'')+';'+'border-radius:'+co.circle+u+';'+'height:'+imgH+';'"
								v-if="i>0" v-for="(v, i) in co.imgList1" :key="i">
								<mg-img class="" :src="v.img" :vueId="'d0f4851a-6-'+i" v-if="v.img"></mg-img>
							</view>
						</view>
					</view>
				</block>
			</block>
		</block>
	</view>
</template>

<script>
	export default {
		name: "margic",
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
		computed: {
			imgH: function() {
				return 2 * this.co.height + "rpx";
			}
		},
		methods: {
			goTo: function(n) {
				this.goUrl(n.url, n);
			}
		}
	}
</script>
<style scoped>
	.margic .margi1 {
		height: 360rpx;
	}

	.margic .margi2 {
		height: 250rpx;
	}

	.margic .margi3 {
		height: 720rpx;
	}
</style>