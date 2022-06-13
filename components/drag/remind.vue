<template>
	<view class="remind"
		:style="'margin-top:'+co.marginTop+'px'+';'+'margin-bottom:'+co.marginBottom+'px'+';'"></view>
</template>

<script>
	export default {
		name: "remind",
		data: function() {
			return {
				img: "/static/tubiao/xuanfu.png",
				activeIndex: 0,
				intnum: void 0
			};
		},
		computed: {
			top: function() {
				return 30 * -this.activeIndex + "px";
			}
		},
		props: ["co"],
		mounted: function() {},
		methods: {
			ScrollUp: function() {
				var n = this;
				this.intnum = setInterval(function(t) {
					n.activeIndex < n.co.numberList.length ? n.activeIndex += 1 : n.activeIndex = 0;
				}, 1e3);
			},
			Stop: function() {
				clearInterval(this.intnum);
			},
			Up: function() {
				this.ScrollUp();
			}
		}
	}
</script>