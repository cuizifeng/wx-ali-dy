<template>
	<view class="l-container">
		<view class="l-body">
			<view class="l-chat-list-item" v-for="(s, i) in conversation" :key="i" @tap="navChat(s)">
				<view class="l-chat-list-avatar">
					<image class="l-chat-img-avatar" :src="s.avatar" mode="aspectFill"></image>
				</view>
				<view class="l-chat-list-content">
					<view class="l-clc-view l-clc-view-1">
						<view class="l-clcv-content">
							{{ s.nickName || s.username || '' }}
						</view>
						<view class="l-clcv-sub">
							{{ s.mtime | formatTime }}
						</view>
					</view>
					<view class="l-clc-view l-clc-view-2">
						<view class="l-clcv-content">
							{{ s.content || '' }}
						</view>
						<view class="l-clcv-sub">
							<view class="l-clcv-bag" v-if="s.unread_msg_count">
								{{ s.unread_msg_count }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<pop-is-login></pop-is-login>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		computed:{
			hasLogin(){
				return this.$store.getters.hasLogin;
			},
			syncConversation(){
				return this.$store.getters.syncConversation;
			},
			conversation(){
				return this.$store.getters.conversation.reverse();
			}
		},
		watch:{
			syncConversation(n){
				if(n.length){
					this.$store.dispatch('jimGetConversation')
				}
			}
		},
		onPullDownRefresh() {
			if(this.hasLogin){
				this.$store.dispatch('jimGetConversation')
			}
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1500)
		},
		onShow() {
			if(this.hasLogin){
				this.$store.dispatch('jimGetConversation')
			}
		},
		methods:{
			navChat(s){
				uni.navigateTo({
					url: '/pages/chat/chat?username=' + s.username
				})
			}
		}
		
	}
</script>

<style scoped>
	@import url("./style.css");
</style>
