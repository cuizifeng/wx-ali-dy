<template>
	<view class="p0 o-h "
		:style="'background-color:'+co.colorBg+';'+'margin:'+''+co.marginTop+u+' '+co.marginLR+u+' '+co.marginBottom+u+';'+'border-radius:'+co.circle+u+';'">
		<mg-cell bgc="transparent" class="" cname="p0" last="1" vueId="e6969bbe-1" :vueSlots="['bd']">
			<view class="" slot="bd">
				<view class="gwglc f-raw f24 " v-if="co.arrange==1">
					<view @tap="gwglClick('',v)" class="f-c-c gwgl " :hidden="!!v.hide" :style="'width:'+10/co.num*10+'%'+';'"
						v-for="(v, i) in myGwgl" :key="i">
						<view class="glimg mb15 " :style="'width:'+ftw.w+'rpx'+';'+'height:'+ftw.w+'rpx'+';'">
							<mg-img class="" :src="v.img" :vueId="'e6969bbe-2-'+i+','+'e6969bbe-1'"></mg-img>
						</view>
						<view class="" :style="'color:'+co.colorWord+';'+'font-size:'+ftw.ft+'rpx'+';'">{{v.word}}</view>
					</view>
				</view>
				<block v-else>
					<mg-cell @tab="gwglClick('',v)" class="" cname="p253" :h="ftw.w" :img="v.img" isr="1" :last="i==myGwgl.length-1"
						:vueId="'e6969bbe-3-'+i+','+'e6969bbe-1'" :vueSlots="['bd','ft']" :w="ftw.w" v-for="(v, i) in myGwgl" :key="i">
						<view class="" slot="bd">
							<view class="f30 " :style="'color:'+co.leftColor+';'+'font-size:'+ftw.ft+'rpx'+';'">{{v.leftWord}}
							</view>
						</view>
						<view class="f24 f-y-c " slot="ft" :style="'color:'+co.rightColor+';'">
							<view class="">{{v.rightWord}}</view>
							<view class="glimg ml20 " v-if="co.img">
								<mg-img class="" :src="co.img" :vueId="'e6969bbe-4-'+i+','+'e6969bbe-3-'+i"></mg-img>
							</view>
							<text class="iconfont iconright ml20 f28 " v-else></text>
						</view>
					</mg-cell>
				</block>
			</view>
		</mg-cell>
	</view>
</template>

<script>
	export default {
		name: "tj-tools",
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
			myGwgl: function() {
				return this.co.imgUrl;
			},
			ftw: function() {
				return {
					ft: 2 * (this.co.fontSize || 14),
					w: 2 * (this.co.width || 23)
				};
			}
		},
		methods: {
			gwglClick: function(n) {
				var t = this;
				t.goUrl(n.url, n);
			}
		}
	}
</script>
<style scoped>
	.gwglc {
		padding: 0 0 20rpx;
	}

	.gwgl {
		margin: 18rpx 0;
	}

	.ddimg {
		width: 52rpx;
		height: 52rpx;
	}

	.glimg {
		width: 46rpx;
		height: 46rpx;
	}
</style>