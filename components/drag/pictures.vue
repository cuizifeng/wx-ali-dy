<template>
	<view class="pictures o-h "
		:style="'margin-top:'+co.marginTop+u+';'+'margin-bottom:'+co.marginBottom+u+';'+'margin-left:'+co.marginLR+u+';'+'margin-right:'+co.marginLR+u+';'">
		<view @tap="goTo(v)" class="imgc o-h "
			:style="'border-radius:'+co.circle+u+';'+'height:'+''+(u=='px'?getSjgd(co.height):co.height)+u+';'+'margin-top:'+(i>0?co.paddingTop+'px':'')+';'"
			v-for="(v, i) in co.imgUrl" :key="i">
			<mg-img class="" :src="v.img" :vueId="'3f1a4dbe-1-'+i"></mg-img>
		</view>
	</view>
</template>

<script>
	export default {
		name: "pictures",
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
			return {
				img: ""
			};
		},
		methods: {
			goTo: function(n) {
				this.goUrl(n.url, n);
			}
		}
	}
</script>
<style scoped>
	.pictures .imgc {
		width: 100%;
	}
</style>