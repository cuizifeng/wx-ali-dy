<template>
	<view class="l-chat">	
		<view class="l-chat-body " >
			<scroll-view 
			scroll-y="true" 
			class="l-char-scroll" 
			scroll-with-animation
			
			:scroll-top="chatScrollTop">
				<view class="l-char-scroll-content">
					<view class="l-char-empty">
						已经没有聊天记录了~
					</view>
					<view class="l-chat-item" 
					v-for="(s, i) in chatList" :key="i"
					:class="{ 'l-chat-mine': s.content.from_id !== thouUsername }">
						<view class="l-chat-item-time">
							{{ s.ctime_ms | formatTime }}
						</view>
						<view class="l-chat-item-content">
							<view class="l-chat-avatar">
								<image class="l-chat-img-avatar" 
								v-if="s.content.from_id == thouUsername"
								:src="singleInfoAvatar" mode="aspectFill"></image>
								<image class="l-chat-img-avatar" 
								v-else
								:src="jimUserInfoAvatar" mode="aspectFill"></image>
							</view>
							<view class="l-chat-view">
								<view class="l-chat-name">
									{{ s.content.from_id !== thouUsername ? (jimUserInfo.nickname || jimUserInfo.username) : (singleInfo.nickname || singleInfo.username)}}
								</view>
								<view  class="l-chat-text">
									{{ s.content.msg_body.text || '' }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="l-chat-foot">
			<view class="l-chat-form">
				<textarea class="l-chat-textarea" 
				v-model="content" 
				fixed 
				@focus="onFocus"
				auto-height 
				placeholder="请输入" 
				:cursor-spacing="20" />
			</view>
			<view class="l-chat-handle">
				<button class="l-chat-send-btn" @tap="submit" type="default">发送</button>
			</view>
		</view>
		<!-- <pop-is-login></pop-is-login> -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				isVoice:true,
				isPop: true,
				ifHaveMore:false,
				hideEmoji:false,
				voiceTis:'按住 说话',
				content: '',
				chatScrollTop: 9999999,
				thouUsernameAppkey: '',
				thouUsername: '',
				thouNickName: '',
				
				scrollViewStyle: '',
				value:''
			}
		},
		computed:{
			isEmpty(){
				return !this.content.length
			},
			hasLogin(){
				return this.$store.getters.hasLogin;
			},
			syncConversation(){
				return this.$store.getters.syncConversation;
			},
			conversation(){
				return this.$store.getters.conversation;
			},
			chatList(){
				return this.$store.getters.chatList;
			},
			singleInfo(){
				return this.$store.getters.singleInfo;
			},
			jimUserInfo(){
				return this.$store.getters.jimUserInfo;
			},
			singleInfoAvatar(){
				return this.singleInfo.avatar 
				? this.$config.jimLocalhost + this.singleInfo.avatar 
				: this.$config.$defaultAvatar;
			},
			jimUserInfoAvatar(){
				return this.jimUserInfo.avatar
				? this.$config.jimLocalhost + this.jimUserInfo.avatar 
				: this.$config.$defaultAvatar;
			}
		},
		onLoad(e) {
			this.thouUsername = e.username || '';
			if(this.hasLogin){
				this.$store.dispatch('jimGetSingleInfo', this.thouUsername);
			}
		},
		watch:{
			hasLogin(n){
				if(n){
					this.$store.dispatch('jimGetSingleInfo', this.thouUsername)
				}
			},
			chatList(){
				this.setChatScrollTop()
			},
			singleInfo(n){
				if(n.nickname || n.username){
					uni.setNavigationBarTitle({
						title: n.nickname || n.username
					})
				}
			}
		},
		onReady() {
		},
		onUnload() {
			this.$store.dispatch('jimGetConversation')
		},
		methods:{
			submit(){
				if(this.isEmpty){
					this.$toast('请先输入内容')
					return
				}
				let params = {
					content: this.content,
					appkey: this.singleInfo.appkey,
					target_username: this.singleInfo.username,
					target_nickname: this.singleInfo.nickname
				}
				this.$store.dispatch('jimSendSingleMsg', params);
				this.content = '';
			},
			onFocus(e){
				this.setChatScrollTop()
			},
			setChatScrollTop(){
				setTimeout(() => {
					this.chatScrollTop += 1;
				},200)
			},
			onSyncConversation() {
			  
			},
			getConversation() {
			    
			},
		}
	}
</script>

<style scoped>
.l-chat {
	width: 100%;
	color: #000000;
	font-size: 34rpx;
	background-color: #FFFFFF;
}

.l-chat-status {
	width: 100%;
	height: var(--status-bar-height);
}

.l-chat-head {
	display: flex;
	position: relative;
	width: 100%;
	box-sizing: border-box;
	justify-content: center;
	align-items: center;
	height: 88rpx;
	padding: 0 30rpx;
}

.l-chat-back {
	width: 105rpx;
	display: flex;
	align-items: center;
}

.l-icon-back {
	width: 21rpx;
	height: 37rpx;
}

.l-icon-handle {
	width: 34rpx;
	height: 34rpx;
}

.l-icon-handle-1 {
	margin-left: 37rpx;
}

.l-chat-title {
	flex: 1;
	text-align: center;
	padding: 0 20rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.l-chart-sub {
	text-align: center;
	color: #828282;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 22rpx;
	box-sizing: border-box;
	padding: 0 110rpx 16rpx;
}

.l-chat-tool {
	width: 100%;
	box-sizing: border-box;
	display: flex;
	height: 90rpx;
	align-items: center;
}

.l-chat-tool-item {
	flex: 1;
	height: 100%;
	display: flex;
	position: relative;
	font-size: 30rpx;
	color: #000000;
	align-items: center;
	justify-content: center;
}

.l-chat-tool-item:not(:last-of-type)::after {
	content: ' ';
	display: block;
	width: 2rpx;
	height: 44rpx;
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	background: rgba(237, 237, 237, 1);
}

.l-icon-tool {
	width: 40rpx;
	height: 40rpx;
	margin-right: 18rpx;
}

.l-chat-top {
	width: 100%;
	border-bottom: 1rpx solid #EDEDED;
}

.l-chat-body {
	width: 100%;
}

.l-char-scroll {
	width: 100%;
	/* #ifdef H5 */
	height: calc(100vh - 190rpx);
	/* #endif */
	/* #ifndef H5 */
	height: calc(100vh - 110rpx);
	/* #endif */
	background-color: #F6F6F6;
}

.l-char-content {
	width: 100%;
	box-sizing: border-box;
	padding: 40rpx 20rpx 40rpx;
}

.l-chat-foot {
	position: fixed;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	width: 100%;
	display: flex;
	align-items: center;
	min-height: 100rpx;
	overflow: hidden;
	display: flex;
	padding: 18rpx 21rpx;
	background-color: #f6f6f6;
	border-top: 1rpx solid #EDEDED;
}

.l-chat-form{
	flex: 1;
	margin-right: 30rpx;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	min-height: 64rpx;
	padding: 10rpx 0;
	background-color: #FFFFFF;
}

.l-chat-textarea{
	flex: 1;
	width: auto;
	line-height: 1.5;
	padding: 0 20rpx;
	font-size: 30rpx;
}

.l-chat-handle{
	min-width: 100rpx;
	width: 100rpx;
	height: 64rpx;
	padding: 6rpx 0;
	display: flex;
	align-items: center;
	align-self: flex-end;
}

.l-chat-send-btn{
	width: 100%;
	height: 46rpx;
	font-size: 28rpx;
	display: flex;
	margin: 0;
	padding: 0;
	color: #FFFFFF;
	align-items: center;
	background-color: #007AFF;
	justify-content: center;
}


.l-chart-form {
	width: 100%;
	min-height: 64rpx;
	display: flex;
	border-radius: 10rpx;
	padding: 14rpx 13rpx;
	justify-content: center;
	box-sizing: border-box;
	background-color: #FFFFFF;
}

.l-char-scroll-content{
	padding: 0 20rpx 20rpx;
	width: 100%;
	box-sizing: border-box;
}

.l-chat-item{
	width: 100%;
	font-size: 32rpx;
}

.l-char-empty,
.l-chat-item-time{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 92rpx;
	font-size: 28rpx;
	color: #999999;
}

.l-chat-item-content{
	display: flex;
}

.l-chat-img-avatar,
.l-chat-avatar{
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}

.l-chat-avatar{
	margin: 0 20rpx 0 0;
}

.l-chat-view{
	max-width: 515rpx;
}

.l-chat-name{
	width: 100%;
	font-size: 24rpx;
	color: #666666;
	margin-bottom: 20rpx;
}

.l-chat-text{
	min-width: 100rpx;
	max-width: 515rpx;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	background-color: #FFFFFF;
	margin: 0 0 0 15rpx;
	position: relative;
	word-break: break-all;
}

.l-chat-text::after{
	content: ' ';
	display: block;
	position: absolute;
	top: 40rpx;
	width: 0;
	height: 0;
	left: -28rpx;
	transform: translate(0, -50%);
	border: 15rpx solid;
	border-color: transparent #FFFFFF transparent transparent;
}

.l-chat-mine .l-chat-item-content{
	flex-direction: row-reverse;
}

.l-chat-mine .l-chat-avatar{
	margin: 0 0 0 20rpx;
}

.l-chat-mine .l-chat-name{
	text-align: right;
}

.l-chat-mine .l-chat-text{
	background-color: #007AFF;
	color: #FFFFFF;
	margin: 0 15rpx 0 0;
}

.l-chat-mine .l-chat-text::after{
	left: auto;
	right: -28rpx;
	border-color: transparent transparent transparent #007AFF;
}
</style>
