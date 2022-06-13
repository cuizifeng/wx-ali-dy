<template>
	<view :style="'height:'+''+co.height+u+';'+'background:'+co.colorBg+';'"></view>
</template>

<script>
	export default {
		name: "blank",
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
		methods: {},
		created: function() {}
	}
</script>