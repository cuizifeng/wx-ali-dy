<template>
  <view class="pb130 " :hidden="!carInfo.sjxx">
    <navBar :title="'提交订单'" :backgroundColor="'linear-gradient(227deg, #FAC763 0%, #F9BD40 100%)'" :wordColor="'#fff'"></navBar>
    <view class="header " :style="'background:'+'#fff'+';'">
      <view class="w100 t0 f-y-c p23 " :style="'background:'+'rgba('+ cTR(tColor)+',0.1)'+';'" v-if="carInfo.sjxx&&carInfo.sjxx.moreSet.orderNotice">
        <text class="iconfont icontishi " :style="'color:'+tColor+';'"></text>
        <view class="f-1 " :style="'color:'+tColor+';'">
          <uni-notice-bar backgroundColor="transparent" :color="tColor" scrollable="true" single="true" :speed="25" :text="carInfo.sjxx.moreSet.orderNotice" vueId="870ed774-1"></uni-notice-bar>
        </view>
      </view>
      <view class="p-r ">
        <get-address :address="wmAddress" class=" vue-ref" ref="getaddress" vueId="870ed774-2" v-if="params.deliveryMode==2"></get-address>
        <get-ztd :sjxx="carInfo.sjxx" vueId="870ed774-3" v-if="params.deliveryMode==1">
        </get-ztd>
        <!-- <view class="p-a psmsc f-x-bt bf6 " v-if="ModeArr.length">
          <view @tap="clickMode(v)" :class="['psms f-c f24 c9 ',v.value==params.deliveryMode?'f28':'']" :style="'color:'+(v.value==params.deliveryMode?'#fff':'')+';'+'background:'+(v.value==params.deliveryMode?'#333':'')+';'" v-for="(v, i) in ModeArr" :key="i">{{v.name}}</view>
        </view> -->
      </view>
      <view :hidden="!(params.deliveryMode==1)">
        <mg-cell cname="p23" isr="1" vueId="870ed774-4" :vueSlots="['bd']">
          <view class="f-y-c " slot="bd">
            <view class="f-g-0 f30 ">预留手机</view>
            <input v-model="params.userTel" class="f-g-1 weui-input t-r " maxlength="11" placeholder="请输入手机号" type="number" />
            <!-- <sq-btn @refresh="setTel" cname="text-btn f24 ml20 p0" h="50" t="自动填写" type="2" :vueId="'870ed774-5'+','+'870ed774-4'" w="120"></sq-btn> -->
          </view>
        </mg-cell>
        <!-- <mg-agree v-model="agree" :color="tColor" p="7" :title="carInfo.sjxx.moreSet.selfName+'服务协议'" :value="agree" vueId="870ed774-6" v-if="ModeArr.length"></mg-agree> -->
      </view>
    </view>
    <view class="mainc ">
      <!-- <view class="mt20 bs20 ">
        <view :hidden="!(params.deliveryMode==2)">
          <mg-cell :acolor="tColor" :arrow="timearrow" :color="tColor" last="1" vueId="870ed774-7" :vueSlots="['bd']">
            <view class="f-y-c " slot="bd">
              <view class="f-g-0 f30 ">预计送达时间</view>
              <view @tap="showTime = !0" class="f-g-1 " v-if="yjTime.length">
                <view class="t-r " :style="'color:'+tColor+';'">
                  <text class="mr15 "></text>
                  <text>{{yjTime[yjIndex].dayTitle+yjrV.timeTitle}}</text>
                </view>
              </view>
              <view class="f-g-1 " v-if="!yjTime.length&&wmTime.length">
                <view class="t-r " :style="'color:'+tColor+';'">{{wmTime[wmIndex].timeTitle}}</view>
              </view>
            </view>
          </mg-cell>
        </view>
        <view :hidden="!(params.deliveryMode==1)">
          <mg-cell isr="1" vueId="870ed774-8" :vueSlots="['bd']" v-if="ztTypeArr.length">
            <view class="f-x-bt " slot="bd">
              <view @tap="clickztMode(v)" class="pstypec bs10 f-c " :style="'color:'+(v.value==params.isOut?tColor:'')+';'+'border-color:'+(v.value==params.isOut?tColor:'')+';'" v-for="(v, i) in ztTypeArr" :key="i">
                <text :class="['iconfont c3 mr20 ',v.icon]" :style="'color:'+(v.value==params.isOut?tColor:'')+';'"></text>
                <text class="f32 ">{{v.name}}</text>
                <view class="yddsj posi-a " :style="'border-bottom:'+(v.value==params.isOut?'41rpx solid '+tColor:'')+';'">
                </view>
                <text class="gou posi-a iconfont icongou cf f20 " v-if="v.value==params.isOut"></text>
              </view>
            </view>
          </mg-cell>
          <mg-cell :acolor="tColor" :arrow="timearrow" :color="tColor" last="1" vueId="870ed774-9" :vueSlots="['bd']">
            <view class="f-y-c " slot="bd">
              <view class="f-g-0 f30 ">自取时间</view>
              <view @tap="showTime = !0" class="f-g-1 " v-if="yjTime.length">
                <view class="t-r " :style="'color:'+tColor+';'">
                  <text class="mr15 "></text>
                  <text>{{yjTime[yjIndex].dayTitle+yjrV.timeTitle}}</text>
                </view>
              </view>
              <view class="f-g-1 " v-if="!yjTime.length&&wmTime.length">
                <view class="t-r " :style="'color:'+tColor+';'">{{wmTime[wmIndex].zttimeTitle}}</view>
              </view>
            </view>
          </mg-cell>
        </view>
        <mg-cell cname="p033 f30" vueId="870ed774-10" :vueSlots="['bd']" v-if="zzsj.open==1">
          <view slot="bd">
            <view>前面<text :style="'color:'+tColor+';'">
                <text class="wei ">{{zzsj.num}}</text>
                <text>{{zzsj.unit}}</text>
              </text>制作中</view>
            <view class="mt20 bf5 jdt bs30 p-r mb10 t-c ">
              <view class="p-a h100 bs30 " :style="{'background':tColor,'width':(zzsj.proportion>0?zzsj.proportion:2) + '%'}"></view>
            </view>
          </view>
        </mg-cell>
      </view> -->
      <view class="mt20 p03 bf bs20 ">
        <mg-cell btt="商品明细" bttc="f30" cname="p30" isl="1" vueId="870ed774-11"></mg-cell>
        <mg-cell brs="5rpx" cname="p30 la124" h="104" :img="v.icon" :isl="i==carInfo.carList.length-1&&1" last="1" :vueId="'870ed774-12-'+i" :vueSlots="['bd']" w="104" v-for="(v, i) in pcarList" :key="i">
          <view slot="bd">
            <view class="f-bt ">
              <view class="t-o-e ">{{v.name}}</view>
              <view class="f-g-0 f32 ">{{sl+itemTotal(v.money, v.spnum)}}</view>
            </view>
            <view class="f-bt mt10 f24 c9 ">
              <view class="f-g-1 f-raw ">
                <text class="ml10 " v-if="v.groupName">{{v.groupName}}</text>
                <text v-if="v.attribute">{{'('+v.attribute+')'}}</text>
                <text class="ml10 " v-if="v.materialName">{{'+'+v.materialName}}</text>
              </view>
              <view class="ml10 ">{{'x'+v.num}}</view>
            </view>
          </view>
        </mg-cell>
        <mg-cell bdmw="180rpx" cname="p15" last="1" vueId="870ed774-13" :vueSlots="['bd','ft']" v-if="carInfo.getTotal.hyzk>0">
          <view class="f-y-c " slot="bd">
            <view class="yhic f22 cf f-c f-g-0 " style="background:#EDA555;">V</view>
            <view>会员折扣</view>
          </view>
          <view class="f32 cf7 " slot="ft">{{sl+carInfo.getTotal.hyzk}}</view>
        </mg-cell>
        <mg-cell btt="商品小计" cname="p15" :ft="''+sl+carInfo.getTotal.spzj" ftc="f32 c3" last="1" vueId="870ed774-14">
        </mg-cell>
        <mg-cell btt="包装费" cname="p15" last="1" vueId="870ed774-15" :vueSlots="['ft']" v-if="carInfo.getTotal.bzf>=0">
          <view class="f32 c3 " slot="ft">
            <text class="mr30 t-d-l f24 c9 " v-if="params.deliveryMode==1&&params.isOut==1">{{sl+carInfo.getTotal.bzf}}</text>
            <text>{{sl+xjMoney.bzf}}</text>
          </view>
        </mg-cell>
        <mg-cell cname="p15" last="1" vueId="870ed774-16" :vueSlots="['bd','ft']" v-if="params.deliveryMode==2">
          <view slot="bd">
            <text>配送费</text>
            <text class="c9 f24 ">{{'（'+(carInfo.sjxx&&carInfo.sjxx.shopData.deliveryMode)+'）'}}</text>
            <text class="f24 " style="color:#8395B1;" v-if="orderMuster.isDelivery==1">(会员免配送费)</text>
            <block v-else>
              <text class="c9 f24 " v-if="wmAddress&&wmAddress.fullMoney>0">{{'(满'+wmAddress.fullMoney+'免配送费)'}}</text>
            </block>
          </view>
          <view class="f32 c3 " slot="ft">
            <text class="mr30 t-d-l f24 c9 " v-if="deliveryPreferential>0&&wmAddress">{{sl+wmAddress.oldMoney}}</text>
            <text>{{wmAddress?''+sl+xjMoney.psf:''}}</text>
          </view>
        </mg-cell>
        <mg-cell cname="p15" :ft="'-'+sl+carInfo.mjInfo.mjMoney" ftc="f32 cf5f" last="1" vueId="870ed774-17" :vueSlots="['bd']" v-if="carInfo.mjInfo.mjMoney>0">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf bf5f f-c ">减</view>
            <view>商品满减</view>
          </view>
        </mg-cell>
        <mg-cell cname="p15" :ft="'-'+sl+orderMuster.newReduction" ftc="f32 cf5f" last="1" vueId="870ed774-18" :vueSlots="['bd']" v-if="orderMuster.newReduction>0">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf b00 f-c ">新</view>
            <view>门店新客立减</view>
          </view>
        </mg-cell>
        <mg-cell bdmw="180rpx" cname="p15" last="1" vueId="870ed774-19" :vueSlots="['bd','ft']" v-if="jsInfo.mzInfo.title">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf bf5f f-c f-g-0 ">赠</view>
            <view>{{jsInfo.mzInfo.name}}</view>
          </view>
          <view class="cf5f " slot="ft">{{jsInfo.mzInfo.title}}</view>
        </mg-cell>
        <mg-cell bdmw="180rpx" cname="p15" last="1" vueId="870ed774-20" :vueSlots="['bd','ft']" v-if="jsInfo.mfInfo.title">
          <view class="f-y-c " slot="bd">
            <view class="yhic f18 cf bf5f f-c f-g-0 ">返</view>
            <view>{{jsInfo.mfInfo.name}}</view>
          </view>
          <view class="cf5f " slot="ft">{{jsInfo.mfInfo.title}}</view>
        </mg-cell>
        <mg-cell arrow="1" @tab="tzxqyhq(1)" cname="p15" :color="kyhb.dpyhq.n>0?tColor:''" last="1" vueId="870ed774-21" :vueSlots="['hd','ft']" v-if="orderMuster.newReduction<=0||orderMuster.newandcoupon==1">
          <view class="f-y-c " slot="hd">
            <view class="yhic f18 cf bf5f f-c ">券</view>
            <view>门店代金券</view>
          </view>
          <view slot="ft">
            <text class="f32 " :style="'color:'+tColor+';'" v-if="couponInfo.store">{{'-'+sl+yhqPreferential.store}}</text>
            <block v-else>
              <view class="hongbao bs5 f20 f-y-c " v-if="kyhb.dpyhq.n>0">
                <text class="iconfont iconhb cf mr10 f26 "></text>{{kyhb.dpyhq.n+'个可用'}}
              </view>
              <block v-else>
                <view class="f24 f-y-c " v-if="kyhb.dpyhq.n==0">暂无可用</view>
              </block>
            </block>
          </view>
        </mg-cell>
        <!-- <mg-cell arrow="1" @tab="tzxqyhq(2)" cname="p15" :color="kyhb.ptyhq.n>0?tColor:''" last="1" vueId="870ed774-22" :vueSlots="['hd','ft']" v-if="orderMuster.newReduction<=0||orderMuster.newandcoupon==1">
          <view class="f-y-c " slot="hd">
            <view class="yhic f18 cf bf5f f-c ">券</view>
            <view>{{system.custom.systemRedbag}}</view>
          </view>
          <view slot="ft">
            <text class="f32 " :style="'color:'+tColor+';'" v-if="couponInfo.platform">{{'-'+sl+yhqPreferential.platform}}</text>
            <block v-else>
              <view class="hongbao bs5 f20 f-y-c " v-if="kyhb.ptyhq.n>0">
                <text class="iconfont iconhb cf mr10 f26 "></text>{{kyhb.ptyhq.n+'个可用'}}
              </view>
              <block v-else>
                <view class="f24 f-y-c " v-if="kyhb.ptyhq.n==0">暂无可用</view>
              </block>
            </block>
          </view>
        </mg-cell> -->
        <mg-cell cname="p15" isl="1" vueId="870ed774-23" :vueSlots="['bd','ft']">
          <view @tap="showyhgz = !0" class="f-y-c c9 f24 " slot="bd">优惠说明<text class="iconfont iconwen f20 c9 ml10 "></text>
          </view>
          <view class="ml10 c3 " slot="ft">
            <text class="f24 ">{{'共'+carInfo.getTotal.num+'件商品'}}</text>
            <text class="m02 ">小计</text>
            <text class="f34 ">{{sl+(xjMoney.total||0)}}</text>
          </view>
        </mg-cell>
        <mg-cell cname="p15" isl="1" vueId="870ed774-24" :vueSlots="['bd','ft']" v-if="system.taxRatio>0">
          <view class="f-y-c " slot="bd">税率<text class="ml10 c6 f24 ">{{'('+system.taxRatio+'%)'}}</text>
          </view>
          <view class="f32 c3 " slot="ft">{{'+'+sl+(xjMoney.slje||0)}}</view>
        </mg-cell>
      </view>
      <view class="mt20 p30 bf bs20 " v-if="orderMuster.changePay&&orderMuster.changePay.goodsArr">
        <view class="p03 mb10 f-y-c ">
          <view class="yhic f18 cf bf5f f-c ">换</view>
          <view>超值换购</view>
          <!-- <view class="ml20 f22 c9 " :hidden="!(hgInfo.id&&hgInfo.price>hgInfo.money)">
            {{'商品最多可为您节省'+sl+itemTotal(v.discountPrice, v.spnum)}}</view> -->
        </view>
        <view class="bf f-row o-x-s p13 ">
          <view @tap="xzhg(v)" class="bf f-g-0 hgic mr30 bs15 b-s-4 f-row p-r " v-for="(v, i) in orderMuster.changePay.goodsArr" :key="i">
            <view class="hgimg ">
              <mg-img :src="v.icon" :vueId="'870ed774-25-'+i"></mg-img>
              <view class="p-a spzk t0 f18 cf bf5f l-n  " v-if="hgInfo.price - hgInfo.money">{{blxs(hgInfo.price - hgInfo.money)+'折'}}</view>
            </view>
            <view class="f-1 f-y-bt p-10-15 f24 ">
              <view class="t-o-e ">{{v.name}}</view>
              <view class="f-y-c ">
                <view class="f-1 t-o-e f22 ">{{sl}}<text class="f28 ">{{v.money}}</text>
                  <text class="t-d-l ml10 ">{{sl+v.price}}</text>
                </view>
                <text :class="['iconfont icongx f38 ce mt0 ml10 ',hgInfo.id==v.id?'cf5f':'']"></text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="mt20 p03 bf bs20 ">
        <mg-cell arrow="1" bdmw="100rpx" @tab="go({t:1,url:'/yb_wm/shop/out/bz?note='+params.userNote})" btt="备注" bttc="f30" cname="p30" :ft="params.userNote||'请填写你的其他要求'" isl="1" vueId="870ed774-26"></mg-cell>
      </view>
    </view>
    <view class="bgf " v-if="isIpx"></view>
    <mg-popup v-model="showTime" vueId="870ed774-27" :vueSlots="['default']">
      <view class="bf " v-if="yjTime.length">
        <view class="f-c p253 f30 b-b-e ">{{'选择'+(params.deliveryMode=='1'?'自取':'预计送达')+'时间'}}</view>
        <view class="f-row " style="height:450rpx;">
          <scroll-view class="f-g-0 " scroll-y="true" style="width:250rpx;background:#F2F2F2;">
            <view @tap="yjlClick(i)" :class="['p253 f-c ',yjIndex==i?'bf':'',yjIndex!=i?'c6':'']" v-for="(v, i) in yjTime" :key="i">{{v.dayTitle}}</view>
          </scroll-view>
          <scroll-view class="f-g-1 " :scrollIntoView="rsiv" scroll-y="true">
            <view @tap="yjrClick(v)" class="p253 f-x-bt " :id="'r'+i" :style="'color:'+(yjrV.time==v.time?tColor:'')+';'" v-for="(v, i) in yjTime[yjIndex].time" :key="i">
              <view>{{v.timeTitle}}</view>
              <icon :color="tColor" size="22" type="success" v-if="yjrV.time==v.time"></icon>
            </view>
          </scroll-view>
        </view>
        <view @tap="showTime = !1" class="f-c p253 f30 b-t-e ">取消</view>
      </view>
    </mg-popup>
    <mg-modal v-model="showyhgz" ismr="true" vueId="870ed774-28" :vueSlots="['default']" width="630rpx" :zIndex="3000">
      <view class="bf bs10 ">
        <view class="p3 c9 ">
          <view class="t-c f32 c0 mb20 ">优惠规则详情</view>
          <view class="p10 f-y-c " v-if="carInfo.mjInfo.mjMoney>0">
            <view class="f-1 ">满减</view>
            <view>{{'-'+sl+carInfo.mjInfo.mjMoney}}</view>
          </view>
          <view class="p10 f-y-c " v-if="orderMuster.newReduction>0">
            <view class="f-1 ">新客立减</view>
            <view>{{'-'+''+sl+orderMuster.newReduction}}</view>
          </view>
          <view class="p10 f-y-c ">
            <view class="f-1 ">门店代金券抵扣</view>
            <view>{{'-'+''+sl+yhqPreferential.store}}</view>
          </view>
          <view class="p10 f-y-c ">
            <view class="f-1 ">{{system.custom.systemRedbag+'抵扣'}}</view>
            <view>{{'-'+''+sl+yhqPreferential.platform}}</view>
          </view>
          <view class="p10 f-y-c " v-if="carInfo.getTotal.hyzk>0">
            <view class="f-1 ">会员折扣</view>
            <view>{{'-'+''+sl+carInfo.getTotal.hyzk}}</view>
          </view>
          <view class="p10 f-y-c " v-if="params.deliveryMode==1&&params.isOut==1">
            <view class="f-1 ">包装费优惠</view>
            <view>{{'-'+''+sl+carInfo.getTotal.bzf}}</view>
          </view>
          <view class="p10 f-y-c " v-if="params.deliveryMode==2&&deliveryPreferential>0">
            <view class="f-1 ">配送费优惠</view>
            <view>{{'-'+''+sl+deliveryPreferential}}</view>
          </view>
          <view class="p10 f-y-c c0 ">
            <view class="f-1 ">总计</view>
            <view>{{'-'+''+sl+jsInfo.yhzj}}</view>
          </view>
        </view>
        <view class="hlt " style="height:100rpx;">
          <button @tap.stop="showyhgz = !1" class="tcbtn f-1 bf h100 f28 f-c cf70 " hoverClass="be">我知道了</button>
        </view>
      </view>
    </mg-modal>
    <mg-modal v-model="showqrtc" ismr="true" vueId="870ed774-29" :vueSlots="['default']" width="600rpx" :zIndex="3000">
      <view class="qrtcc ">
        <view class="img ma p-r ">
          <!-- <mg-img :src="onImgurl+'qrdd.png'" :vueId="'870ed774-30'+','+'870ed774-29'">
          </mg-img> -->
        </view>
        <view class="bf qrtc ">
          <view class="f-c-c ">
            <view class="f32 wei " style="color:#183162;">{{'请确认'+(params.deliveryMode==1?'下单门店':'配送地址')}}
            </view>
            <view class="f22 mt10 cgt hlb ">支付成功后，下单门店无法修改!</view>
          </view>
          <view class="f-y-c p30 ">
            <block v-if="params.deliveryMode==1">
              <view class="f-1 ">
                <view class="f32 ">{{carInfo.sjxx.shopData.name}}</view>
                <view class="f22 c9 " style="color:#8C94A5;">{{carInfo.sjxx.moreSet.address}}</view>
              </view>
              <view class="f22 c6 hll " style="color:#183162;padding-left:30rpx;">
                <view>距离</view>
                <view>{{storeInfo.distance}}</view>
              </view>
            </block>
            <block v-if="params.deliveryMode==2">
              <view class="f-1 ">
                <view class="f32 ">{{wmAddress.address+wmAddress.details}}</view>
                <view class="f22 c9 " style="color:#8C94A5;">
                  {{wmAddress.userName+'('+wmAddress.sex+') '+wmAddress.userTel}}</view>
              </view>
              <view class="hll " style="padding-left:30rpx;">
                <view class="iconfont iconddys f46 " style="color:#8C94A5;"></view>
              </view>
            </block>
          </view>
          <view @tap="showqrtc = !1" class="t-c mb50 " style="color:#183162;">
            [返回修改]</view>
          <button @tap="ljzf" class="f30 btn cf " :disabled="loading" :loading="loading" :style="'background:'+tColor+';'">确定并支付</button>
        </view>
      </view>
    </mg-modal>
    <view class="dbbtnc " :style="'bottom:'+(isIpx?'40rpx':0)+';'">
      <view class="dbbtn ">
        <view class="f-g-1 lt f-c-xc ">
          <view>
            <text class="mr10 ">合计</text>
            <text class="f36 ">{{sl+(jsInfo.hjMoney||0)}}</text>
          </view>
          <view class="f-y-c f22 c9 ">
            <view>为您节省</view>
            <view>{{sl+(jsInfo.yhzj||0)}}</view>
          </view>
        </view>
        <button @tap="ljzf" class="rt f-c " :disabled="loading" :loading="loading" :style="'background:'+tColor+';'">立即支付</button>
      </view>
    </view>
  </view>
</template>

<script>
import getAddress from 'components/address/get-address.vue';
import getZtd from 'components/address/get-ztd.vue';
import uniNoticeBar from 'components/third/uni-notice-bar.vue';
import mgPopup from 'components/common/popup.vue';
import bkB from 'components/common/block-b.vue';
import sqBtn from 'components/common/sq-btn.vue';
import mgRadio from 'components/form/mg-radio.vue';
import mgAgree from 'components/form/mg-agree.vue';
import mgModal from 'components/common/modal.vue';
import load from 'components/common/load.vue';
import {
  utilMixins
} from 'common/utilMixins';
import {
  bus,
  getPage,
  isTelCode,
  message,
  setNT,
  showLoading
} from 'common/util';
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex';
export default {
  name: "pay-order",
  components: {
    getAddress,
    getZtd,
    uniNoticeBar,
    mgPopup,
    bkB,
    sqBtn,
    mgRadio,
    mgAgree,
    mgModal,
    load,
  },
  data: function () {
    return {
      showLoading: !1,
      closePay: !1,
      showPay: !1,
      carInfo: {},
      pcarList: [],
      ModeArr: [],
      wmAddress: "",
      params: {
        storeId: "",
        userAddId: "",
        deliveryMode: "2",
        serviceAt: "",
        appointment: "",
        serviceTime: "",
        userTel: "",
        couponId: {
          store: "",
          platform: ""
        },
        userNote: "",
        isOut: "",
        changeId: "",
        changeGoodsId: ""
      },
      loading: !1,
      payObj: {},
      showTime: !1,
      wmIndex: 0,
      wmTime: [],
      yjIndex: 0,
      yjTime: [],
      rsiv: "",
      yjrV: {},
      deliveryPreferential: 0,
      yhqPreferential: {
        store: 0,
        platform: 0
      },
      kyhb: {
        dpyhq: {
          n: 0,
          data: []
        },
        ptyhq: {
          n: 0,
          data: []
        }
      },
      couponInfo: {
        store: "",
        platform: ""
      },
      orderMuster: {},
      ztTypeArr: [],
      agree: !0,
      showyhgz: !1,
      hgInfo: {},
      zzsj: {},
      showqrtc: !1
    }
  },
  onLoad: function () {
    var t = this;
    var o, s;
    t.getSystem(),
      //   setNT("提交订单"),
      t.carInfo = uni.getStorageSync("carInfo"),
      o = [];
    for (s in t.carInfo.carList) {
      t.carInfo.carList[s].originalNum > 0 && o.push(Object.assign({
        ishd: 0,
        spnum: t.carInfo.carList[s].originalNum
      }, t.carInfo.carList[s])), t.carInfo.carList[s].discountNum > 0 && o.push(Object.assign({
        ishd: 1,
        spnum: t.carInfo.carList[s].discountNum
      }, t.carInfo.carList[s]));
    }

    t.pcarList = o,
      t.params.storeId = t.carInfo.sjxx.shopData.id,
      t.params.userTel = t.user.userTel ? t.user.userTel : '',
      t.wmAddress = getApp().globalData.xzdzInfo || "",
      t.getOrderset(),
      t.getWmAddress(),
      t.getOrderMuster(),
      t.getyhqArr(),
      bus.$on("payorder", (
        function (e) {
          e.hasOwnProperty("hbInfo") && (1 == e.type ? (t.couponInfo.store = e.hbInfo || "", t.params
            .couponId.store = t.couponInfo.store ? t.couponInfo.store.id : "") : 2 == e.type && (t
              .couponInfo.platform = e.hbInfo || "", t.params.couponId.platform = t.couponInfo
                .platform ? t.couponInfo.platform.id : ""));
        })),
      setTimeout((function () {
        t.isOnLoad = !0
      }));
  },
  onUnload: function () {
    bus.$off("payorder")
  },
  onShow: function () {
    this.isOnLoad && (this.refreshAddress(getApp().globalData.xzdzInfo))
  },
  mixins: [utilMixins],
  computed: {
    ...mapState({
      orderset: function (e) {
        return e.config.orderset
      },
      storeInfo: function (e) {
        return e.config.storeInfo
      }
    }),
    ...mapState(['latLng']),
    xjMoney: function () {
      if (this.carInfo.carPrice) {
        var e = +(this.carInfo.getTotal.spzj - this.carInfo.mjInfo.mjMoney).toFixed(2),
          t = this.orderMuster.newReduction || 0,
          r = 0,
          n = 0;
        this.couponInfo.store && (this.orderMuster.newReduction <= 0 || 1 == this.orderMuster.newandcoupon) && (
          1 == this.couponInfo.store.type ? r = +this.couponInfo.store.money || 0 : 2 == this.couponInfo.store
            .type && (r = +this.couponInfo.store.money), r < 0 && (r = 0)), this.couponInfo.platform && (this
              .orderMuster.newReduction <= 0 || 1 == this.orderMuster.newandcoupon) && (1 == this.couponInfo
                .platform.type ? n = +this.couponInfo.platform.money || 0 : 2 == this.couponInfo.platform.type && (
                  n = +this.couponInfo.platform.money), n < 0 && (n = 0));
        var o = +(this.wmAddress && this.wmAddress.deliveryMoney || 0),
          s = this.carInfo.getTotal.bzf,
          a = 0,
          i = 0,
          c = +(e - r - n - t).toFixed(2);
        return this.deliveryPreferential = 0, 1 == this.params.deliveryMode ? (o = 0, 1 == this.params.isOut &&
          (s = 0)) : this.wmAddress && (this.deliveryPreferential = this.wmAddress.discount), c <= 0 && (c =
            .01), a = +(c + o + s).toFixed(2), a <= 0 && (a = .01), this.yhqPreferential.store = r, this
              .yhqPreferential.platform = n, this.system.taxRatio > 0 && (i = +(a * (this.system.taxRatio / 100))
                .toFixed(2)), {
          total: a,
          psf: o,
          slje: i,
          bzf: s
        }
      }
    },
    jsInfo: function () {
      var e = this;
      if (this.carInfo.carPrice) {
        var t = this.carInfo.getTotal.total + (2 == this.params.deliveryMode && this.wmAddress ? Number(this
          .deliveryPreferential > 0 ? this.wmAddress.oldMoney : this.wmAddress.deliveryMoney) : 0) - this
            .xjMoney.total,
          r = this.xjMoney.total + this.xjMoney.slje,
          n = {},
          o = {};
        t += this.carInfo.getTotal.hyzk;
        var s = this.carInfo.sjxx.discount.give.moneyArr && this.carInfo.sjxx.discount.give.moneyArr.find((
          function (t) {
            return e.xjMoney.total >= t.fullMoney
          }));
        return s && (n = {
          name: "满赠优惠",
          title: "".concat(s.give)
        }), this.xjMoney.total >= this.carInfo.sjxx.discount.grantCoupon.orderMoney && (o = {
          name: "满返门店代金券",
          title: this.carInfo.sjxx.discount.grantCoupon.name
        }), this.hgInfo.id && (r = +this.hgInfo.money + r), {
          yhzj: +t.toFixed(2),
          hjMoney: +r.toFixed(2),
          mzInfo: n,
          mfInfo: o
        }
      }
    },
    timearrow: function () {
      return this.yjTime.length
    },
    appointment: function () {
      return this.yjrV.timeTitle && -1 == this.yjrV.timeTitle.indexOf("现在下单")
    },
    ljsctext: function () {
      return 1 == this.params.deliveryMode ? this.yjrV.timeTitle ? "立即自取" : "" : this.yjrV.timeTitle ? "约"
        .concat(this.yjrV.timeTitle.substring(4, 9), "送达") : ""
    }
  },
  methods: {
    ...mapActions(['getConfig']),
    ...mapMutations(['setScarList']),
    clickMode: function (e) {
      e.value != this.params.deliveryMode && (
        // showLoading("设置中..."),
        this.params.deliveryMode = e
          .value, this.getWmAddress())
    },
    clickztMode: function (e) {
      this.params.isOut = e.value
    },
    setTel: function (e) {
      this.params.userTel = e.data || e;
    },
    getOrderset: function () {
      var t = this;
      var o, s;
      o = t.carInfo.sjxx.moreSet, s = t.carInfo.sjxx.outSet, s.includes("2") && t.ModeArr.push({
        icon: "iconmd",
        name: o.selfName,
        value: "1"
      }), s.includes("1") && t.ModeArr.push({
        icon: "iconps",
        name: o.outName,
        value: "2"
      }), 2 == s.length && 2 == t.carInfo.sjxx.moreSet.auto && t.ModeArr.reverse(), t.params
        .deliveryMode = 1 == t.carInfo.buyType ? 2 : 1, o.diningType.includes("1") && t.ztTypeArr
          .push({
            value: "1",
            name: "店内就餐",
            icon: "icondianneitubiao f36"
          }), o.diningType.includes("2") && t.ztTypeArr.push({
            value: "2",
            name: "打包带走",
            icon: "icondabao f42"
          }), t.ztTypeArr[0] && (t.params.isOut = t.ztTypeArr[0].value), t.getConfig({
            key: "orderset",
            api: "order_order__set"
          }).then((function () {
            uni.setStorageSync("fwb", t.orderset.selfAgreement)
          }));
    },
    tzxqyhq: function (t) {
      1 == t ? (uni.setStorageSync("kyhb", this.kyhb.dpyhq), this.go({
        t: 1,
        url: "/yb_wm/my/coupon/use-coupon?t=1&name=门店代金券&couponId=" + this.params.couponId.store
      })) : 2 == t && (uni.setStorageSync("kyhb", this.kyhb.ptyhq), this.go({
        t: 1,
        url: "/yb_wm/my/coupon/use-coupon?t=2&name=" + this.system.custom.systemRedbag + "&couponId=" + this
          .params.couponId.platform
      }))
    },
    getyhqArr: function () {
      var t = this;
      var o;
      t.kyhb = {};
      this.$api.coupon_available__coupon({
        storeId: t.params.storeId,
        type: 1,
        storeType: 1
      }).then(res => {
        t.kyhb.dpyhq = {
          n: res.length,
          data: res
        };
      })
      this.$api.coupon_available__coupon({
        storeId: t.params.storeId,
        type: 1,
        storeType: 2
      }).then(res => {
        t.kyhb.ptyhq = {
          n: res.length,
          data: res
        };
      })
    },
    getOrderMuster: function () {
      var e = this;
      this.$api.order_order__muster({
        storeId: e.params.storeId
      }).then(res => {
        e.orderMuster = res || {
          newReduction: 0
        }, e.getZzsj();
      })
    },
    getZzsj: function () {
      var e = this;
      this.$api.order_production__time({
        storeId: e.params.storeId
      }).then(res => {
        e.zzsj = res;
      })
    },
    checkQsj: function () {
      var t = this;
      this.wmAddress && +this.wmAddress.startMoney > this.carInfo.getTotal.total && uni.showModal({
        title: "提示",
        content: "您的商品总计金额".concat(this.sl + this.carInfo.getTotal.total, "，未达到此收货地址的起送价").concat(this.sl +
          this.wmAddress.startMoney),
        showCancel: !1,
        success: function (e) {
          var r = getPage();
          r.$vm.startMoney = t.wmAddress.startMoney, t.go({
            t: 4
          })
        }
      })
    },
    refreshAddress: function (e) {
      this.wmAddress = e || "", this.getWmAddress()
    },
    getWmAddress: function () {
      var e = this;
      //12
      if (2 != e.params.deliveryMode) {
        e.wmAddress ? (e.params.userAddId = e.wmAddress.id, 2 == e.params.deliveryMode ? (e
          .checkQsj(), e.getyjTime(e.params.userAddId)) : e.getyjTime()) : (e.params.userAddId = "", e
            .getyjTime()), e.showLoading = !0;
        return;
      }
      // 7
      if (e.wmAddress.id) {
        this.$api.member_receiving__address({
          storeId: e.carInfo.sjxx.shopData.id,
          lat: e.latLng.lat,
          lng: e.latLng.lng
        }).then(res => {
          res || e.$refs.getaddress && e.$refs.getaddress.goChoose();
          e.wmAddress = res || "";
          e.wmAddress ? (e.params.userAddId = e.wmAddress.id,
            2 == e.params.deliveryMode ? (e.checkQsj(), e.getyjTime(e.params.userAddId)) : e.getyjTime()) :
            (e.params.userAddId = "", e.getyjTime());
        })
        return;
      }
      this.$api.member_receiving__address({
        storeId: e.carInfo.sjxx.shopData.id,
        addressId: e.wmAddress.id,
        lat: e.latLng.lat,
        lng: e.latLng.lng
      }).then(res => {
        res || e.$refs.getaddress && e.$refs.getaddress.goChoose();
        e.wmAddress = res || "";
        e.wmAddress ? (e.params.userAddId = e.wmAddress.id,
          2 == e.params.deliveryMode ? (e.checkQsj(), e.getyjTime(e.params.userAddId)) : e.getyjTime()) :
          (e.params.userAddId = "", e.getyjTime());
      })
    },
    getyjTime: function () {
      var t = arguments,
        r = this;
      var s, a, i;
      s = t.length > 0 && void 0 !== t[0] ? t[0] : "",
        r.yjIndex = 0;
      this.$api.order_store__time({
        userAddId: s,
        storeId: r.params.storeId,
        orderType: 1 == r.params.deliveryMode ? 2 : 1
      }).then(res => {
        i = res,
          i[0] ? r.yjrV = i[0].time[0] : uni.showModal({
            title: "提示",
            content: "此商家营业时间或预约单设置不合理，无有效的供用户选择的时间，无法下单",
            showCancel: !1,
            success: function (e) {
              r.go({
                t: 4
              })
            }
          }),
          //  e.hideLoading(), 
          r.yjTime = i;
      })
    },
    yjlClick: function (e) {
      var t = this;
      this.yjIndex = e, this.rsiv = "r", setTimeout((function () {
        t.rsiv = "r".concat(Object.keys(t.yjTime[e].time)[0])
      }), 10)
    },
    yjrClick: function (e) {
      var t = this;
      this.yjrV = e, setTimeout((function () {
        t.showTime = !1
      }), 200)
    },
    itemTotal: function (e, t) {
      return (e * t).toFixed(2)
    },
    xzhg: function (e) {
      this.hgInfo = e.id == this.hgInfo.id ? {} : e
    },
    ljzf: function () {
      var t = this;
      // if (!t.params.userAddId) return t.$refs.getaddress.goChoose();
      if (!t.yjrV.time) return message("请选择时间", 3);
      // if (2 != t.params.deliveryMode) {}
      if (!t.agree) return message("请阅读并同意服务协议", 3);
      if (!isTelCode(t.params.userTel)) return message("请输入合理的预留手机号", 3);

      if (2 == t.params.deliveryMode && !t.params.userAddId) {
        message('未添加地址', 3);
        t.$refs.getaddress.goChoose()
        return;
      }
      // if (!(2 == t.params.deliveryMode && t.params.userAddId)) {
      // r.next = 5;13
      if (1 != t.orderset.confirmSwitch || t.showqrtc) {
        // r.next = 15;
        // if (!t.jjmbxx) return
        t.loading = true;
        t.requestSM("saveOrder").then(res => {
          // r.next = 27;
          t.hgInfo.id && (t.params.changeId = t.orderMuster.changePay.id, t.params
            .changeGoodsId = t.hgInfo.id), t.params.serviceAt = -1 == t.yjrV.timeTitle.indexOf(
              "现在下单") ? t.yjTime[t.yjIndex].dayTitle + " " + t.yjrV.timeTitle : t.yjrV.timeTitle, t.params
                .serviceTime = t.yjrV.time, t.params.appointment = t.appointment ? 1 : "", 1 != t.params
                  .appointment && (t.params.serviceAt = t.params.serviceAt.substr(4))
          var jsons = {
            ...t.params,
            // couponId: JSON.stringify(t.params.couponId),
            couponId: ''
          }

          this.$api.order_save__order(jsons).then(res => {
            var s = getPage();
            s.$vm.refreshInfo(),
              t.go({
                t: 2,
                url: "/yb_wm/other/mg-pay?payObj=" + encodeURIComponent(JSON.stringify({
                  orderId: res.data,
                  orderType: 1,
                  info: {
                    money: t.jsInfo.hjMoney,
                    storeName: t.carInfo.sjxx.shopData.name,
                    type: "下单支付",
                    go: {
                      t: 3,
                      url: "/yb_wm/index/order-index"
                    }
                  }
                }))

              })
            t.loading = false;
          }).catch(e => {
            t.loading = false;
          });
          uni.setStorageSync("note", t.params.userNote);
        })
      } else {
        t.showqrtc = !0;
      }
      // } else {
      // 	t.$refs.getaddress.goChoose()
      // 	message('未添加地址', 3);
      // }

    }
  },
  created: function () { },
  watch: {
    hgInfo: {
      handler: function (a, b) {
        // console.log(a, b);
      },
      immediate: true,
    },
    jsInfo: {
      handler: function (a, b) {
        // console.log(a, b);
      },
      immediate: true,
    },

  }
}
</script>
<style scoped>
.p15 {
  padding: 12rpx 0;
}

.cf7 {
  color: #eda555;
}

.header .psmsc {
  right: 30rpx;
  top: 26rpx;
  height: 66rpx;
  padding: 0 6rpx;
  border-radius: 60rpx;
}

.header .psmsc .psms {
  border-radius: 66rpx;
  height: 56rpx;
  padding: 0 10rpx;
  min-width: 90rpx;
}

.pstypec {
  width: 330rpx;
  height: 95rpx;
  border: 1rpx solid #333;
  position: relative;
}

.yddsj {
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: 41rpx solid #fff;
  border-left: 46rpx solid transparent;
}

.gou {
  right: 4rpx;
  bottom: 3rpx;
}

.mainc {
  padding: 0 0rpx;
}

.bs20 {
  border-radius: 0;
}

.hdwith {
  width: 100rpx;
}

.dbbtnc {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0rpx;
}

.dbbtnc .dbbtn {
  height: 104rpx;
  border-radius: 0rpx;
  overflow: hidden;
  display: flex;
  box-shadow: 0rpx 8rpx 18rpx 5rpx hsla(0, 0%, 86.7%, 0.9);
}

.dbbtnc .dbbtn .lt {
  color: #333;
  padding: 0 30rpx 0 30rpx;
  background: #fff;
}

.dbbtnc .dbbtn .rt {
  color: #fff;
  width: 179rpx;
  height: 100%;
  border-radius: 0;
  font-size: 28rpx;
  padding: 0;
}

.mt20 {
  margin-top: 18rpx;
}

.hgic {
  width: 382rpx;
  height: 140rpx;
}

.hgic .hgimg {
  width: 140rpx;
  height: 140rpx;
}

.hgic .spzk {
  border-bottom-right-radius: 15rpx;
  padding: 5rpx 14rpx;
}

.jdt {
  height: 28rpx;
}

.qrtcc .img {
  margin-bottom: -70rpx;
  width: 220rpx;
  height: 140rpx;
}

.qrtcc .qrtc {
  padding: 110rpx 40rpx 60rpx;
  border-radius: 25rpx;
}

.qrtcc .qrtc .btn {
  width: 70%;
}

.qrtcc .qrtc .cgt {
  padding-bottom: 36rpx;
}
</style>