<template>
  <view :class="['pb130 mh100']">
    <!-- #ifdef MP-WEIXIN -->
    <navBar :title="'会员中心'" :leftView="leftView" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <!-- #endif -->
    <!-- <block v-if="type==1">
			<view class="o-h ">
				<view class="wk1 " :style="'background:'+tColor+';'"></view>
				<view class="wk1ic ">
					<ls-swiper @change="lschange" crown="true" data-vue-generic="scoped" height="180" imgKey="imgUrl"
						imgRadius="15" :list="lsarr" loop="true" nextMargin="84" previousMargin="84" shadow="true"
						slots="true" :swcurrent="swcurrent" vueId="fb34f8ba-1" :vueSlots="['default']">
					</ls-swiper>
				</view>
			</view>
			<view class="p03 ">
				<view class="p03 bf bs20 mb30 pb10 ">
					<view class="f30 wei c0 mt30 ">会员权益</view>
					<btn-group :co="qyarr" vueId="fb34f8ba-3"></btn-group>
				</view>
				<view class="p03 bf bs20 mb30 ">
					<view class="f30 wei c0 p30 ">升级礼包</view>
					<block v-if="xzdjinfo.isCoupon==1">
						<mg-cell isl="1" :vueId="'fb34f8ba-4-'+i" :vueSlots="['bd']"
							v-for="(v, i) in xzdjinfo.couponList" :key="i">
							<view class="f-row " slot="bd">
								<view class="mr30 ">
									<text class="iconfont iconzyhq f48 c3 "></text>
								</view>
								<view class="f22 f-1 ">
									<view class="f-row ">
										<view class="f24 wei ">{{v.name}}<text class="ml10 nowei "
												:style="'color:'+tColor+';'">x1</text>
										</view>
										<view @tap="go({url:'/yb_wm/my/coupon/coupon-dl?nobtn=1&id='+v.id})"
											class="cf xqc f-c ml10 f-g-0 f20 " :style="'background:'+tColor+';'">详情
										</view>
									</view>
									<view class="c6 mt10 ">自动转入您的账户中</view>
								</view>
							</view>
						</mg-cell>
					</block>
					<mg-cell isl="1" vueId="fb34f8ba-5" :vueSlots="['bd']" v-if="xzdjinfo.isBalance==1">
						<view class="f-row " slot="bd">
							<view class="mr30 ">
								<text class="iconfont iconye1 f48 c3 "></text>
							</view>
							<view class="f22 f-1 ">
								<view class="f24 wei ">{{'赠送'+system.custom.balance}}<text class="m01 "
										:style="'color:'+tColor+';'">{{xzdjinfo.balance}}</text>{{dw}}</view>
								<view class="c6 mt10 ">{{'自动转入您的'+system.custom.balance+'中'}}</view>
							</view>
						</view>
					</mg-cell>
					<mg-cell isl="1" vueId="fb34f8ba-6" :vueSlots="['bd']" v-if="xzdjinfo.isIntegral==1">
						<view class="f-row " slot="bd">
							<view class="mr30 ">
								<text class="iconfont iconjf f48 c3 "></text>
							</view>
							<view class="f22 f-1 ">
								<view class="f24 wei ">{{'赠送'+system.custom.integral}}<text class="m01 "
										:style="'color:'+tColor+';'">{{xzdjinfo.integral}}</text>{{system.custom.integral}}
								</view>
								<view class="c6 mt10 ">{{'自动转入您的'+system.custom.integral+'中'}}</view>
							</view>
						</view>
					</mg-cell>
					<mg-cell isl="1" vueId="fb34f8ba-7" :vueSlots="['bd']" v-if="xzdjinfo.isGrowth==1">
						<view class="f-row " slot="bd">
							<view class="mr30 ">
								<text class="iconfont iconwc f48 c3 "></text>
							</view>
							<view class="f22 f-1 ">
								<view class="f24 wei ">赠送成长值<text class="m01 "
										:style="'color:'+tColor+';'">{{xzdjinfo.growth}}</text>成长值</view>
								<view class="c6 mt10 ">自动转入您的成长值中</view>
							</view>
						</view>
					</mg-cell>
				</view>
			</view>
			<view class="foot-btnc p-r " v-if="!isVip">
				<button @tap="ljkk" class="foot-btn " :disabled="loading" :loading="loading"
					:style="'background:'+tColor+';'">立即开卡</button>
			</view>
		</block> -->
    <block>
      <view class="p34">
        <!-- style="padding-top: 1rpx; background-image:url('../../../static/imgs/lang.png');background-size: 100% 70%;background-repeat: no-repeat;" -->
        <view class="bkimg">
          <image src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/1.png" mode=""></image>
        </view>
        <view class="bgg">
          <view class="p-r ">
            <view class="wk2img bs20 mb20 ">
              <!-- <mg-img :src="vipInfo.bgType==2?vipInfo.bgImg:'/static/wd/vip/vipbg.png'" vueId="fb34f8ba-8">
							</mg-img> -->
              <image src="https://yunbei.lianmengfu.net/xcxpic/imgs/3.png/imgs/lang.png" mode="" class="img1"></image>
            </view>
            <view class="p-a t0 wh cf f-col ">
              <view class="f-1 ">
                <view class="wk2c1 ">
                  <view class="f-y-c ">
                    <view class="himg bsf mr20 ">
                      <mg-img :src="companyInfo.icon||'https://yunbei.lianmengfu.net/xcxpic/wd/mrtx.png'" vueId="fb34f8ba-9"></mg-img>
                    </view>
                    <view class="f-1 ">
                      <view class="f32 ">{{vipset.brandName}}</view>
                      <view class="f20 mt10 ">{{vipset.serviceTel}}</view>
                      <!-- <view class="rdj b-d f26 mb20 l-n " style="width: 90rpx;">{{'VIP'+vipInfo.level}}</view> -->
                    </view>
                    <view class="f-x-e mt15 ">
                      <text @tap="go({url:'/yb_wm/other/recharge/smzf'})" class="iconfont iconewm cf f56 "></text>
                    </view>
                  </view>

                </view>
              </view>
              <view v-if="user.vipCode" class="p2 f26 mb10 ">{{'NO.'+user.vipCode}}</view>
            </view>
          </view>
        </view>
        <view style="padding: 30rpx 40rpx;padding-bottom: 200rpx;">
          <myItem :list="darr"></myItem>
          <!-- <view class="p23 f-row " style="margin-bottom: 30rpx;">
            <view @tap="myDataClick(v)" class="f-1 wei t-c " v-for="(v, i) in darr" :key="i">
              <view v-if="v.num !=='zw'" class="f38 wbba " style="font-size: 30px;font-weight: 400;">{{v.num}}</view>
              <view v-else class="f38 wbba ">
                <uni-icons type="shop" size="30"></uni-icons>
              </view>
              <view style="font-weight: 400;">{{v.name}}</view>
            </view>
          </view> -->
          <!-- <view class="mt20 ">
					<mg-cell ac="iconright1" arrow="1" @tab="myDataClick(v)" :btt="v.name" bttc="f30" cname="p30" ftc="f24 cd"
						:iconn="v.icn+' icname'" last="1" :vueId="'fb34f8ba-10-'+i" v-for="(v, i) in arr" :key="i"></mg-cell>
				</view> -->
          <view class="cygn">
            <view class="gn" style="font-weight: 600;">
              常用功能
            </view>
            <navigator url="../../other/recharge/yemx">
              <view class="xfjl">
                <view class="">
                  消费记录
                </view>
                <view class="">
                  <uni-icons type="right" size="20"></uni-icons>
                </view>
              </view>
            </navigator>
          </view>

          <view class="cygn">
            <view class="gn" style="font-weight: 600;">
              商家信息
            </view>
            <view class="xfjl">
              <view class="">
                丰台科技园店
              </view>
              <!-- <view class="" style="display: flex;align-items: center;justify-content: center;">
							更多门店 <uni-icons type="right" size="20"></uni-icons>
						</view> -->
            </view>
            <view class="xfjl">
              <view class="">
                北京市丰台科技园3区3号楼104
              </view>
              <!-- <view class="">
							<uni-icons type="right" size="20"></uni-icons>
						</view> -->
            </view>
          </view>

        </view>

      </view>
      <!-- <view class="foot-btnc p-r p34 " v-if="vipset.wechatCard==1">
				<navigator appId="wxeb490c6f9b154ef9" :extraData="adata" hoverClass="none" target="miniProgram"
					v-if="adata&&user.WeChatCard==2">
					<button class="foot-btn f30 wei bf b-f5 "
						:style="'border-color:'+tColor+';'+'color:'+tColor+';'">同步微信卡包</button>
				</navigator>
				<navigator appId="wxeb490c6f9b154ef9" :extraData="adata" hoverClass="none" target="miniProgram"
					v-if="user.WeChatCard==1">
					<button class="foot-btn f30 wei bf b-f5 "
						:style="'border-color:'+tColor+';'+'color:'+tColor+';'">查看微信卡包</button>
				</navigator>
			</view> -->
    </block>
    <tab-bar vueId="fb34f8ba-11" v-if="!query.type"></tab-bar>
    <!-- <load vueId="fb34f8ba-12" v-if="showloading"></load> -->

    <!-- <view class="footer">
      <view class="itemicon" @tap="tabchang(0)">
        <image src="../../../static/imgs/barindexnoselect.png" mode=""></image>
      </view>
      <view class="itemicon" @tap="tabchang(1)">
        <image src="../../../static/imgs/barshopnoselect.png" mode=""></image>
      </view>
      <view class="itemicon" @tap="tabchang(2)">
        <image src="../../../static/imgs/barmineselect.png" mode=""></image>
      </view>
    </view> -->
  </view>
</template>
<!-- 白的 返回再返回就有图了，为什么，这，我也不知道啊，我这里也在搞渲染，我这里渲染也有问题，很奇怪啊，而且你看，别的页面进都没事，就这个页面不行，你看看我的 -->
<script>
import MgSwiper from 'components/common/functionCmp/swiper.vue';
import load from 'components/common/load.vue';
import btnGroup from 'components/drag/btn.vue';
import LsSwiper from 'components/third/ls-swiper/index';
import myItem from "./components/myItem.vue";
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  mpShare,
  setNB,
  setNT
} from 'common/util';
export default {
  name: "wkk",
  components: {
    LsSwiper,
    MgSwiper,
    btnGroup,
    load,
    myItem
  },
  data: function () {
    return {
      leftView: false,//导航栏配置

      showloading: !0,
      type: 1,
      loading: !1,
      qyarr: {
        btnList: [],
        circle: 10,
        circleBtn: "10",
        colorBg: "",
        colorWord: "",
        line: "2",
        marginBottom: 0,
        marginLR: 0,
        marginTop: 0,
        num: "3"
      },
      arr: [{
        icn: "iconcz f44",
        url: "/yb_wm/other/recharge/index",
        name: "在线储值"
      }, {
        icn: "iconjfgz f44",
        url: "czz",
        name: "成长值"
      }, {
        icn: "iconqy f42",
        url: "wkk?type=1",
        name: "会员权益"
      }, {
        icn: "icondhjl f40",
        url: "/yb_wm/my/other/gywm?t=会员说明&p=6",
        name: "会员说明"
      }],
      lsarr: [],
      xzdjinfo: {},
      swcurrent: 0,
      vipInfo: {},
      adata: "",
      query: {},
      storeId: "1",
      companyInfo: '',
    }
  },
  onLoad: function (t) {
    //获取门店信息
    this.$api.shop_lately__store().then(res => {
      this.storeId = res.id
    })
    this.$api.sound_store({
      storeId: this.storeId
    }).then(r => {
      this.companyInfo = r.data
      console.log(r, "mdxx")
    })

    var e = this;
    e.query = t, Promise.all([e.getSystem(), e.getLoginInfo()]);
    e.type = e.isVip ? 2 : 1,
      e.query.type && (e.type = e.query.type),
      1 == e.type && setNB(e.tColor),
      e.getConfig({
        key: "vipset",
        api: "config_config",
        params: {
          ident: "vipSet"
        }
      });
    1 == e.type ? setNT(e.vipset.title) : setNT("会员中心"), e.getDjlb();

    //获取会员信息
    this.$api['vip-card_level__list']().then(res => {
      console.log(res, "huiyuan")
      this.vipInfo = res[0]
    })
    this.$api.login_save__user().then(res => {
      this.uesr = res.data
      if (res.data.portrait == null) {
        this.checkLogin().then(res => { })
      }
    })


  },
  onShow: function () {
    var t = this;
    this.isload ? !this.query.type && this.isVip && 1 == this.type && (this.vipInfo = this.lsarr.find((
      function (
        e) {
        return e.level == t.user.level
      })), this.type = 2, setNB(), setNT("会员中心")) : this.isload = !0
  },

  computed: {
    ...mapState({
      vipset: function (t) {
        return t.config.vipset
      }
    }),
    lbswiper: function () {
      return {
        class: "",
        swiper: [{
          url: "https://images.ddycms.cn/yb_wm/39/2021/01/13/202101131541554298.jpg"
        }],
        duration: "",
        mode: "",
        height: "360",
        radius: "30",
        auto: !0,
        interval: 5
      }
    },
    darr: function () {
      return [
        {
          url: "/yb_wm/other/recharge/yesy",
          num: this.user.balance,
          name: this.system.custom.balance
        },
        {
          num: this.user.couponNum || 0,
          name: "优惠券",
          url: "/yb_wm/my/coupon/my"
        },
        {
          num: 'zw',
          name: "商城",
          url: "/pages/tabbar/shop/index"
        }

      ]
    }
  },
  methods: {

    ...mapActions(["getConfig"]),
    tabchang(index) {
      console.log(index);

      if (index == 0) {
        uni.switchTab({
          url: '/pages/tabbar/index/index'
        })
      } else if (index == 1) {
        // 
        uni.switchTab({
          url: '/pages/tabbar/shop/index'
        })
      }
    },

    lschange: function (t) {
      this.xzdjinfo = t, this.qyarr.btnList = t.rightsList.map((function (t) {
        return {
          img: t.icon,
          word: t.name
        }
      }))
    },
    getDjlb: function () {
      var t = this;
      this.$api['vip-card_level__list']().then(res => {
        console.log('res:271 ', res);
        var i = res;
        t.lsarr = res, res.length && (t.lschange(i[0]), t.isVip && (t
          .refreshUser({
            nomask: 1,
            get: 1,
            now: 1
          }), t.swcurrent = res.findIndex((function (e) {
            return e.level == t.user.level
          })), t.vipInfo = res[t.swcurrent]))
        t.showloading = false;
      })
    },
    myDataClick: function (e) {
      console.log(e)
      var n = "";
      e.url && (n = e.url, "会员说明" == e.name && t.setStorageSync("fwb", this.vipset.content)),
        this.go({
          t: 1,
          url: n
        })
    },
    ljkk: function () {
      var t = this;
      t.checkLogin().then(res => {
        t.go({
          url: "open"
        });
      })
    }
  },
  onShareAppMessage: function () {
    var t = "pages/tabbar/my/index";
    return mpShare({
      t: this.vipset.title,
      p: t
    })
  },
  onShareTimeline: function (t) {
    return {
      title: this.vipset.title,
      imageUrl: this.getImgS(this.vipset.logo)
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 120rpx;
  background: #ffffff;
  position: fixed;
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

.p34 {
  width: 100%;
  height: 500rpx;

  .bkimg {
    width: 100%;
    height: 500rpx;
    position: absolute;
    top: 0;
    left: 0;
    image {
      width: 100%;
      height: 70%;
    }
  }

  .bgg {
    width: 90%;
    margin: 0 auto;
    margin-top: 20rpx;
    // background-color: red;
  }
}

.wk1 {
  width: 140%;
  margin-left: -20%;
  height: 345rpx;
  border-radius: 0 0 50% 50%;
  overflow: hidden;
}

.wk1ic {
  margin: -300rpx 0 42rpx;
}

.wk1ic .imgc {
  height: 360rpx;
}

.xqc {
  height: 30rpx;
  padding: 0 16rpx;
}

.wk2img {
  height: 390rpx;
}

.wk2c1 {
  padding: 40rpx;
}

.wk2c1 .himg {
  width: 90rpx;
  height: 90rpx;
}

.rdj {
  padding: 6rpx 16rpx;
  border-radius: 30rpx;
  border-color: #fff;
}

.icname {
  margin-right: 20rpx;
  color: #333;
}

.cygn {
  background: #ffffff;
  margin-bottom: 30rpx;
  border-radius: 10rpx;
  padding: 8rpx 24rpx;
}

.cygn .gn {
  color: #2f2f2f;
  font-size: 32rpx;
  margin-bottom: 30rpx;
}

.cygn .xfjl {
  color: #2f2f2f;
  font-size: 30rpx;
  padding-left: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 19rpx;
}

.img1 {
  width: 100%;
  height: 100%;
}
</style>
