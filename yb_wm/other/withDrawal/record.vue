<template>
	<view class="bf mvh100">
		<view class="cont">
			<view class="item cell" v-for="item of recordList" :key="item.outTradeNo">
				<view class="top f-x-bt">
					<view class="opera">提现</view>
					<view class="opera-price">-{{item.money?item.money:'0.00'}}</view>
				</view>
				<view class="bottom f-x-bt">
					<view class="opera-time">{{item.createdAt?item.createdAt:'-'}}</view>
					<view class="operaSuc" v-if="item.state=='申请中'">{{item.state}}</view>
					<view class="operaSuc" v-else-if="item.state=='已通过'">{{item.state}}</view>
					<view class="operaFail" v-else>{{item.state}}</view>
				</view>
			</view>
			<jzz bgcolor="transparent" class="" imgn="zwjf" :mygd="mygd" :nodata="recordList.length<=0?true:false" vueId="16eaf28c-7">
			</jzz>
			<load class="" vueId="16eaf28c-8" v-if="showLoading"></load>
		</view>
	</view>
</template>

<script>
	import load from "@/components/common/load.vue";
	import jzz from "@/components/common/jzz.vue";
	import {setNT,sljz,setNB} from "@/common/util";
	export default{
		data(){
			return {
				title:'提现记录',//导航栏标题
				mygd:true,//底部加载状态
				showLoading:false,//页面加载状态
				page:1,//页码
				size:10,//每页条数
				recordList:'',//提现列表
				scrollFalg:true,//滚动开关
			}
		},
		components:{
			jzz,load
		},
		onLoad(){
			setNT(this.title)//设置导航栏标题
			this.wlh_memberWithdrawalList()
		},
		//上拉加载
		onReachBottom(){
			if(this.scrollFalg){
				this.page+=1
				this.wlh_memberWithdrawalList()
			}
		},
		methods:{
			//查询提现记录
			wlh_memberWithdrawalList(){
				this.$api['member_withdrawal__list']({
					page:this.page,
					size:this.size,
					item:3,//1老带新 2分销商 3全员
				}).then(res=>{
					// console.log(res)
					this.recordList=this.recordList?this.recordList.concat(res):res
					this.scrollFalg=this.recordList.length<10?false:true
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.cont{
		padding: 0 55rpx;
		box-sizing: border-box;
		.item{
			padding: 27rpx 0;
			box-sizing: border-box;
			.top{
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;
			} 
			.bottom{
				margin-top: 10rpx;
				.operaSuc{
					font-size: 22rpx;
					font-weight: 600;
					color: #07BC60;
					letter-spacing: 2rpx;
				}
				.operaFail{
					font-size: 22rpx;
					font-weight: 400;
					color: #FA6400;
					letter-spacing: 2rpx;
				}
				.opera-time{
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
	
</style>
