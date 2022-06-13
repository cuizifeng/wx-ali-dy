<template>
	<view class="card " :style="'margin-top:'+styles.marginTop+'px'+';'+'margin-bottom:'+styles.marginBottom+'px'+';'">
		<view class="" :style="'background:'+styles.colorBg+';'">
			<v-tabs v-model="current" :activeColor="styles.colorSelect" @change="changeTab" bold="false" class=""
				:color="styles.colorWord" field="name" :lineColor="styles.colorSelect" lineHeight="5rpx"
				:style="'margin-right:'+styles.marginRight+'px'+';'" :tabs="styles.cardList" :value="current" vueId="2c177626-1">
			</v-tabs>
		</view>
	</view>
</template>

<script>
	export default {
		name: "card",
		data: function() {
			return {
				current: 2
			};
		},
		components: {},
		methods: {
			changeTab: function(n) {}
		},
		mounted: function() {},
		props: ["styles"]
	}
</script>