<template>
	<view class="discount "
		:style="'margin-top:'+styles.marginTop+'px'+';'+'margin-bottom:'+styles.marginBottom+'px'+';'+'margin-left:'+styles.marginLR+'px'+';'+'margin-right:'+styles.marginLR+'px'+';'">
		<view class="discount-list ">
			<view class="discount-list-detail ">
				<view>
					<view>
						<text>￥</text>
						<text>5</text>
					</view>
					<view>
						<view class="_p ">满105可用</view>
						<view class="_p ">全品类可用(特殊商品除外)</view>
					</view>
				</view>
				<view>
					<view>
						<text></text>
					</view>
					<view>今日限量1万张</view>
					<view class="receive ">立即领取</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "discount",
		data: function() {
			return {};
		},
		props: ["styles"]
	}
</script>
<style scoped>
	.discount {
		background-color: #f7c54c;
		padding: 20rpx;
	}

	.discount .discount-list .discount-list-detail:last-child {
		margin-bottom: 0;
	}

	.discount .discount-list .discount-list-detail {
		display: flex;
		background-color: #fff;
		border: 1px solid #eee;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}

	.discount .discount-list .discount-list-detail>._div {
		padding: 10px 0;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(1) {
		width: 60%;
		display: flex;
		justify-content: space-around;
		-webkit-box-align: center;
		align-items: center;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(1)>view:nth-of-type(1) {
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		width: 20%;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(1)>view:nth-of-type(1)>._span {
		color: #c99f22;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(1)>view:nth-of-type(1)>text:nth-of-type(1) {
		font-size: 36rpx;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(1)>view:nth-of-type(1)>text:nth-of-type(2) {
		font-size: 42rpx;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(1)>view:nth-of-type(2) {
		width: 80%;
		padding: 0 20rpx;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(1)>view:nth-of-type(2)>text:nth-of-type(1) {
		display: inline;
		font-size: 24rpx;
		color: #c99f22;
		background-color: #fcf1f9;
		padding: 0 20rpx;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(1)>view:nth-of-type(2)>._p:nth-of-type(2) {
		margin-top: 4px;
		font-size: 12px;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(2) {
		width: 40%;
		padding-left: 20rpx;
		text-align: center;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(2)>view:nth-of-type(1) {
		width: 80%;
		height: 20rpx;
		background-color: #d8ac2d;
		margin: 0 auto 10rpx;
		border-radius: 20rpx;
		position: relative;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(2)>view:nth-of-type(1)>text {
		position: absolute;
		left: 0;
		top: 0;
		display: inline-block;
		width: 40%;
		height: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(2)>view:nth-of-type(1) {
		font-size: 24rpx;
		color: #9b780c;
	}

	.discount .discount-list .discount-list-detail>view:nth-of-type(2) .receive {
		padding: 10rpx 20rpx;
		background-color: #2b3142;
		width: 60%;
		margin: 30rpx auto 0;
		font-size: 20rpx;
		color: #fff;
		border-radius: 60rpx;
	}
</style>