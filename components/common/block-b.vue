<template>
	<block>
		<text @tap.stop="$emit('tab')" :class="['text-btnf ',cName]" :style="{
							background: color,
							borderColor: color,
							display: block && 'block'
			 }" v-if="type==1">{{t}}</text>
		<text @tap.stop="$emit('tab')" :class="['text-btn ',cName]" :style="{
							color: color,
							borderColor: color,
							display: block && 'block'
				}" v-else-if="type==2">{{t}}</text>
	</block>
</template>

<script>
	export default {
		name: "popup",
		props: {
			cName: {
				type: String,
				default: ""
			},
			sname: "",
			type: {
				type: String,
				default: "1"
			},
			t: {
				type: String,
				default: ""
			},
			color: {
				type: String,
				default: ""
			},
			block: {
				type: String,
				default: ""
			}
		},
		methods: {}
	}
</script>