<!-- <template>
	<view class="pb115 o-h "
		:style="'background:'+(layout.pageSetting?layout.pageSetting[0].styles.moduleTitle==1?layout.pageSetting[0].styles.colorIcon:'url('+layout.pageSetting[0].styles.img+')':'')+';'">
		<open-list :co="layout.open[0].styles" vueId="1de1c492-1" v-if="layout.open&&layout.open[0]"></open-list>
		<uni-nav-bar :bg="layout.pageSetting[0].styles.colorBg" border="false" :color="layout.pageSetting[0].styles.colorWord"
			fixed="true" id="uninavbar" isleft="false" ispr="true" statusBar="true"
			:title="layout.pageSetting[0].styles.navTitle" uropcity="1" vueId="1de1c492-2"
			v-if="layout.pageSetting[0].styles.modulePage==1"></uni-nav-bar>
		<block v-for="(v, i) in layout.attention" :key="i">
			<atten-tion :co="v.styles" :vueId="'1de1c492-3-'+i" v-if="v.name=='attention'">
			</atten-tion>
		</block>
		<block v-for="(v, i) in layout.list" :key="i">
			<search-box :co="v.styles" :vueId="'1de1c492-4-'+i" v-if="v.name=='search'" />
			<fixed-set :co="v.styles" :vueId="'1de1c492-5-'+i" v-if="v.name=='fixed'" />
			<notice-sue :co="v.styles" :shopinfo="shopinfo" :vueId="'1de1c492-6-'+i" v-if="v.name=='notice'" />
			<pic-lunbo-by :co="v.styles" :vueId="'1de1c492-7-'+i" v-if="v.name=='picLunbo'" />
			<zx-list :co="v.styles" :vueId="'1de1c492-8-'+i" v-if="v.name=='information'" />
			<btn-group :co="v.styles" :vueId="'1de1c492-9-'+i" v-if="v.name=='btn'" />
			<pictures :co="v.styles" :vueId="'1de1c492-10-'+i" v-if="v.name=='pictures'" />
			<titles-bar :co="v.styles" :vueId="'1de1c492-11-'+i" v-if="v.name=='titles'" />
			<blank :co="v.styles" :vueId="'1de1c492-12-'+i" v-if="v.name=='blank'" />
			<lines-wire :co="v.styles" :vueId="'1de1c492-13-'+i" v-if="v.name=='lines'" />
			<store-message :co="v.styles" :vueId="'1de1c492-14-'+i" v-if="v.name=='storeMessage'" />
			<book-text :co="v.styles" :vueId="'1de1c492-15-'+i" v-if="v.name=='book'" />
			<hot-spots :co="v.styles" :vueId="'1de1c492-16-'+i" v-if="v.name=='hot'" />
			<margic-cube :co="v.styles" :vueId="'1de1c492-17-'+i" v-if="v.name=='margic'" />
			<list-nav :co="v.styles" :vueId="'1de1c492-18-'+i" v-if="v.name=='listNav'" />
			<discount-coupons :styles="v.styles" :vueId="'1de1c492-19-'+i" v-if="v.name=='discount'" />
		</block>
		<sus-btn :co="layout.susBtn[0].styles" vueId="1de1c492-21" v-if="layout.susBtn&&layout.susBtn[0]">
		</sus-btn>
		<view v-for="(v, i) in layout.remind" :key="i">
			<order-prompt :styles="v.styles" :vueId="'1de1c492-22-'+i" v-if="v.name=='remind'"></order-prompt>
		</view>
		<tcyhq @close="xkzxshow = !1" v-model="xkzxshow" :co="xkzxInfo" :color="tColor" type="3" vueId="1de1c492-23"
			v-if="xkzxInfo"></tcyhq>

		<tcyhq v-model="fqbshow" @ :co="fqbInfo" type="2" vueId="1de1c492-24" v-if="fqbInfo"></tcyhq>
		<footc vueId="1de1c492-25"></footc>
		<tab-bar vueId="1de1c492-26"></tab-bar>
		<load vueId="1de1c492-27" v-if="showloading"></load>

	</view>
</template>

<script>
	import footc from '../../components/common/footc.vue';
	import bookText from '../../components/common/functionCmp/rich-text.vue';
	import load from '../../components/common/load.vue';
	import attenTion from '../../components/drag/attenTion.vue';
	import blank from '../../components/drag/blank.vue';
	import btnGroup from '../../components/drag/btn.vue';
	import cardTab from '../../components/drag/card.vue';
	import discountCoupons from '../../components/drag/discount.vue';
	import fixedSet from '../../components/drag/fixed.vue';
	import hotSpots from '../../components/drag/hot.vue';
	import linesWire from '../../components/drag/lines.vue';
	import listNav from '../../components/drag/listNav.vue';
	import margicCube from '../../components/drag/margic.vue';
	import noticeSue from '../../components/drag/notice.vue';
	import openList from '../../components/drag/open.vue';
	import picLunboBy from '../../components/drag/picLunbo.vue';
	import pictures from '../../components/drag/pictures.vue';
	import productGroup from '../../components/drag/product.vue';
	import orderPrompt from '../../components/drag/remind.vue';
	import searchBox from '../../components/drag/search.vue';
	import storeMessage from '../../components/drag/storeMessage.vue';
	import susBtn from '../../components/drag/susBtn.vue';
	import titlesBar from '../../components/drag/titles.vue';
	import zxList from '../../components/drag/zx-list.vue';
	import tcyhq from '../../components/template/tcyhq.vue';
	import uniNavBar from '../../components/third/uni-nav-bar.vue';



	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		getOptions,
		mpShare
	} from 'common/util';
	import {
		getLocation
	} from 'common/location';
	export default {
		name: "index",
		data: function() {
			return {
				showloading: !0,
				shopinfo: {},
				opcity: 0,
				xkzxshow: !1,
				xkzxInfo: "",
				fqbshow: !1,
				fqbInfo: ""
			};
		},
		components: {
			footc,
			bookText,
			load,
			attenTion,
			blank,
			btnGroup,
			cardTab,
			discountCoupons,
			fixedSet,
			hotSpots,
			linesWire,
			listNav,
			margicCube,
			noticeSue,
			openList,
			picLunboBy,
			pictures,
			productGroup,
			orderPrompt,
			searchBox,
			storeMessage,
			susBtn,
			titlesBar,
			zxList,
			tcyhq,
			uniNavBar,
		},
		onLoad: function(n) {
			this.query = n,
				this.storeId = getOptions(n, {
					key: "storeId",
					q1: this.storeInfo.id
				}) || "",
				this.xlsx(n);
		},
		onShow: function() {
			this.shopinfo.id && this.storeId != this.storeInfo.id && this.changeStore(this.storeInfo);
			console.log('storeInfo: ', this.storeInfo);
			this.changeStore('');

		},
		computed: {
			...mapState(["latLng"]),
			...mapState({
				storeInfo: function(n) {
					return n.config.storeInfo;
				}
			}),
			layout() {
				try {
					return this.$store.state.layout.index.body || {};
				} catch (error) {
					return {};
				}
			},
		},
		methods: {
			aaa(){
				uni.navigateTo({
					url:"../shop/in/dmf"
				})
			},
			...mapActions(["getConfig"]),
			xlsx: function(n) {
				var e = this;
				e.getLayout();
				e.showloading = !1;
				// e.getAddInfo(t),
				e.getLoginInfo({
					inviteId: e.query.userId
				}).then(function() {
					e.getXkzx();
				}), e.refreshInfo();
				// 获取地址
				getLocation();
			},
			changeStore: function(n) {
				this.storeId = n.id, this.refreshInfo();
			},
			refreshInfo: function() {
				var n = this;
				this.$api.shop_lately__store({
					storeId: this.storeId || '',
					lat: this.latLng.lat || '',
					lng: this.latLng.lng || ''
				}).then(data => {
					var o = data;
					n.storeId = o.id,
						n.getConfig({
							key: "storeInfo",
							data: {
								id: o.id,
								name: o.name,
								distance: o.distance
							}
						}),
						n.shopinfo = o, n.getSystem(), setTimeout(function() {
							if (uni.getStorageSync("userId")) n.addFwjl({
								storeId: n.storeId,
								origin: "1"
							});
						}, 1e3);
				});
			},
			getXkzx() {
				var n = this;
				this.$api.member_new().then(res => {

					if (res && !Array.isArray(res)) {
						n.xkzxInfo = res,
							setTimeout(function() {
								n.xkzxshow = !0;
							}, 400);
					}
				});
				this.$api.member_window().then(res => {
					if (res && !Array.isArray(res.issueCoupons)) {
						n.fqbInfo = res.issueCoupons,
							setTimeout(function() {
								n.fqbshow = !0;
							}, 400);
					}
				})
			}
		},
		onPullDownRefresh: function() {
			var e = this;
			n.setStorageSync("firstdwtime", 0), e.getSystem({
				get: 1
			}), e.$store.state.layout.index = {}, e.xlsx();
			n.stopPullDownRefresh();
		},
		onShareAppMessage: function() {
			return mpShare({
				t: this.system.forwardTitle,
				i: this.getImgS(this.system.forwardIcon)
			});
		},
		onShareTimeline: function(n) {
			return {
				title: this.system.shareTitle,
				imageUrl: this.getImgS(this.system.shareIcon)
			};
		}
	}
</script> -->

<template>
  <view class="box">
    <!-- <fixed-set />
		<view class="" style="width: 100%;height: 100rpx;background: red;margin-top: 500rpx;">
		</view> -->

    <image class="indexImg" src="https://yunbei.lianmengfu.net/xcxpic/imgs/shouyebg.jpg" mode=""></image>
    <view class="img">
      <view class="">
        <view class="sytselect" @tap="changeStore">
          <view class="lineBox">
            <text style="margin-left: 30rpx;">{{storename}}</text>
            <uni-icons type="right" size="20"></uni-icons>
          </view>
        </view>
        <view class="syt" @click="aaa()">收银台</view>
      </view>

    </view>
    <!-- 
    <view class="footer">
      <view class="itemicon" @tap="tabchang(0)">
        <image src="../../static/imgs/barindexselect.png" mode="aspectFit"></image>
      </view>
      <view class="itemicon" @tap="tabchang(1)">
        <image src="../../static/imgs/barshopnoselect.png" mode="aspectFit"></image>
      </view>
      <view class="itemicon" @tap="tabchang(2)">
        <image src="../../static/imgs/barminenoselect.png" mode="aspectFit"></image>
      </view>
    </view> -->

  </view>
</template>

<script>
import { getCode } from "@/utils/getCode.js";
import fixedSet from '../../components/drag/fixed.vue';



import api from '@/lib/api';
import { log } from 'lib/utils/QS-SharePoster/app';
export default {
  data: function () {
    return {
      money: "",
      params: {
        money: "",
        storeId: "",
        userNote: "",
        useCouponId: ""
      },
      shopinfo: {},
      mdconfig: null,
      loading: !1,
      kyhb: {
        n: 0,
        data: []
      },
      couponInfo: null,
      show: 1,
      isshow: false,
      arr: {
        userId: "",
        location: "2",
        storeId: "1"
      },
      orderId: '',
      yhj: {},
      RechargeList: [],
      zfshow: false,
      bordershow: 0,
      users: {},
      userTel: '',
      userId: "",


      storeList: '',
      storename: '',
      storeposition: '',
      sheetopen: false
    }
  },
  components: {
    fixedSet,
  },
  onLoad: function () {
    // getCode().then(res => {
    //   console.log(res, "---");
    //   return
    //   this.$api.login_login({
    //     code: res
    //   }).then(r => {
    //     console.log(r, '66666666666666666');
    //     this.users = r
    //     this.userId = r.userId
    //     uni.setStorageSync("userId", r.userId)
    //     uni.setStorageSync("session_key", r.session_key)
    //     this.userTel = r.userTel
    //     console.log(this.users, "2")
    //   })
    // })
    // return;
    uni.login({
      success: (res) => {
        const { code } = res
        console.log(code)
        this.$api.login_login({
          code: code
        }).then(r => {
          console.log(r, '66666666666666666');
          this.users = r
          this.userId = r.userId
          uni.setStorageSync("userId", r.userId)
          uni.setStorageSync("session_key", r.session_key)
          this.userTel = r.userTel
          console.log(this.users, "2")
        })
      }
    })


    // 获取门店列表
    console.log(api, '7887878');
    this.$api.shop_store__list({

    }).then(r => {
      console.log(r, '9999');
      this.storeList = r;
      this.storename = r[0].name;
      this.storeposition = r[0].address;
      let storeid = r[0].id;

      uni.setStorage({
        key: 'storeinfo',
        data: {
          storename: this.storename,
          storeposition: this.storeposition,
          storeid: storeid
        }

      });

    })

  },
  methods: {
    tabchang(index) {
      console.log(index);

      if (index == 1) {
        uni.switchTab({
          url: '/pages/tabbar/shop/index'
        })
      } else if (index == 2) {
        uni.switchTab({
          url: '/pages/tabbar/my/index'
        })
      }
    },

    changeStore() {
      var _this = this;
      let list = [];
      this.storeList.map((item, index) => {
        list.push(item.name)
      });
      uni.showActionSheet({
        itemList: list,
        success: function (res) {
          _this.storename = _this.storeList[res.tapIndex].name;
          _this.storeposition = _this.storeList[res.tapIndex].address;
          let storeid = _this.storeList[res.tapIndex].id;
          console.log('选中了第' + (res.tapIndex + 1) + '个按钮');

          // 切换后存储本地
          uni.setStorage({
            key: 'storeinfo',
            data: {
              storename: _this.storename,
              storeposition: _this.storeposition,
              storeid: storeid
            }

          });
        },
        fail: function (res) {
          console.log(res.errMsg);
        }
      });
    },
    aaa() {
      //旧的收款
      //   uni.navigateTo({
      //     url: "../shop/in/dmf"
      //   })

      //新的收款
      uni.navigateTo({
        url: '/pages/individualAccount/Collection/index'
      })
    },
    bbb() {

      uni.navigateTo({
        url: "/pages/tabbar/my/index"
      })
    },
  }
}
</script>

<style scoped lang="less">
.indexImg {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0rpx;
  top: 0rpx;
  right: 0rpx;
  bottom: 0rpx;
}
.box {
  width: 100%;
  height: 100%;
  //   overflow: hidden;

  .footer {
    width: 100%;
    height: 120rpx;
    background: #ffffff;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .itemicon {
      width: 30%;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      image {
        width: 80rpx;
        height: 80rpx;
      }
    }
  }
}

.img {
  width: 100%;
  height: 100%;
  position: relative;
}

.img image {
  width: 100%;
  height: 100%;
}

.sytselect {
  width: 100%;
  height: 150rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 0rpx;
  left: 0;
  padding: 10rpx 0;
  padding-top: 20rpx;
  .lineBoxone {
    width: 95%;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 30rpx;
  }
  .lineBox {
    width: 95%;
    height: 80rpx;
    // background: red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 32rpx;
  }
}

.syt {
  width: 330rpx;
  // height: 55rpx;
  line-height: 55rpx;
  text-align: center;
  color: #ffffff;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -165rpx;
  margin-top: 800rpx;
  background: none;
  background-image: url("https://yunbei.lianmengfu.net/xcxpic/imgs/3.png");
  background-size: 100% 100%;
  // background:transparent;
}

.syt2 {
  margin-top: 280rpx;
}
</style>
