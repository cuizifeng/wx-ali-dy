<template>
	<image @tap="$emit('click')" :class="['wh',cname]" :mode="m" :src="src" :style="[sname]"></image>
</template>

<script>
	export default {
		name: "mg-img",
		props: {
			cname: "",
			sname: "",
			src: "",
			local: "",
			m: {
				type: String,
				default: "aspectFill"
			}
		},
		data: function() {
			return {};
		},
		methods: {
			getUrl: function(n) {
				return n ? n.indexOf("http") > -1 || n.indexOf("/static/") > -1 || n.indexOf("base64") > -1 || 1 ==
					this.local ? n : this.url + n : "/static/static/no.png";
			}
		},
		computed: {}
	}
</script>
<style scoped>
	.wh {
		display: block;
	}
</style>