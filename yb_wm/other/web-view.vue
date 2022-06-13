<template>
	<view v-if="src">
		<web-view @message="getMessage" :src="src"></web-view>
	</view>
</template>


<script>
import { setNT } from 'common/util'
	export default {
		data: function() {
			return {
				src: ""
			}
		},
		onLoad: function(t) {
			setNT("外链"), this.src = JSON.parse(decodeURIComponent(t.src))
		},
		methods: {
			getMessage: function(n) {
				uni.showModal({
					content: JSON.stringify(n.detail),
					showCancel: !1
				})
			}
		}
	}
</script>