<template>
  <view class="container pb115 ">
    <!-- <view class="bf mb20 f-c maint ">
			<view class="timg bsf ">
				<mg-img class="" :src="user.portrait" vueId="25a86aaa-1"></mg-img>
				<button v-if="canIUseGetUserProfile" open-type="getUserInfo" @click="getUserProfile" class="wrap-button">
					<image style="width:220rpx;height:220rpx;border-radius:100%;" :src="user.portrait" mode="aspectFit" />
				</button>
				<button v-else open-type="getUserInfo" @getuserinfo="getUserInfo" class="wrap-button">
					<image style="width:220rpx;height:220rpx;border-radius:100%;" :src="user.portrait" mode="aspectFit" />
				</button>
			</view>
		</view> -->
    <view class="bf ">
      <!-- <mg-input dis="1" ht="昵称" isr="1" v-model="user.userName" vueId="25a86aaa-2"></mg-input>
			<mg-input dis="1" ht="用户ID" isr="1" v-model="user.id" vueId="25a86aaa-3"></mg-input> -->
      <span class="iconfont icon-xingming"></span>
      <mg-input ht="姓名" isr="1" pr="姓名" v-model="params.realName" vueId="25a86aaa-4"></mg-input>
      <mg-cell class="" cname="p03" ht="性别" htc="f30" isr="1" vueId="25a86aaa-7" :vueSlots="['bd']">
        <view class="" slot="bd">
          <mg-radio :arr="sexArr" :color="tColor" v-model="params.sex" :vueId="'25a86aaa-8'+','+'25a86aaa-7'">
          </mg-radio>
        </view>
      </mg-cell>
      <mg-input ht="电话" isr="1" :max="11" pr="请输入手机号" t="number" v-model="params.userTel" vueId="25a86aaa-5" :vueSlots="['ft']">
        <sq-btn @refresh="setTel" class="" cname="text-btnf f24 ml20 p0" h="50" slot="ft" t="自动填写" type="2" :vueId="'25a86aaa-6'+','+'25a86aaa-5'" w="120"></sq-btn>
      </mg-input>

      <!-- <mg-input ht="出生日期" dis="1" isr="1" v-model="params.birthday" vueId="25a86aaa-2">
			</mg-input> -->
      <view style="display: flex; margin-left:30rpx;font-size: 30rpx;padding: 24rpx 0 16rpx 0">
        <view>出生日期</view>
        <picker mode="date" :value="params.birthday" class="picker" @change="bindDateChange">
          <view style="height: 60rpx;width: 440rpx;">{{params.birthday}}</view>
        </picker>
      </view>
    </view>
    <view class="foot-btnc posi-r ">
      <button @tap="save" class="foot-btn bs5 f32 f-c " :disabled="loading" hoverClass="btnhc" :loading="loading" :style="'background:'+tColor+';'">保存</button>

      <view class="receive_vip">
        <navigator url="/pages/tabbar/my/index" hover-class="none">
          <button class="btn1" hover-class="none">稍后领取</button>
        </navigator>
        <button @tap="save" class="btn2" :disabled="loading" :loading="loading">领取会员卡</button>

      </view>

    </view>
  </view>
</template>

<script>
import mgInput from 'components/form/mg-input.vue';
import mgRadio from 'components/form/mg-radio.vue';
import MgCell from 'components/common/mg-cell.vue';
import bkB from 'components/common/block-b.vue';
import sqBtn from 'components/common/sq-btn.vue';
import {
  dateFormat
} from '../../utils/common.js'
import {
  utilMixins
} from 'common/utilMixins';
import {
  isFailParams,
  isTelCode,
  message,
  setNT,
  swnb
} from 'common/util';
export default {
  components: {
    mgInput,
    mgRadio,
    MgCell,
    bkB,
    sqBtn,
  },
  data: function () {
    return {
      t: "digit",
      params: {
        userId: "",
        userTel: "",
        sex: "男",
        realName: "",
        birthday: ""

      },
      sexArr: [{
        value: "男",
        name: "男"
      }, {
        value: "女",
        name: "女",
        checked: "true"
      }],
      loading: !1,
      isEdit: !1,
      date: "",
      canIUseGetUserProfile: false,
      endDate: "",
      isbj: !1
    }
  },
  onLoad: function (e) {
    var n = this;
    console.log(n.user);
    setNT("个人信息"),
      n.getSystem(),
      n.date = n.endDate = n.timeToDate(n.dateToTime(),
        "yyyy-MM-dd"),
      n.getLoginInfo().then(function (res) {
        console.log('编辑生日的res', res);
        console.log(n.user.birthday, "1")
        n.params.userId = n.uId,
          n.params.birthday = null,
          n.params.userTel = n.user.userTel || "",
          null != n.user.sex && (n.isbj = !0, n.params.realName = n.user.realName, n.params.sex = n
            .user.sex)
      });
    if (uni.getUserProfile) {
      this.canIUseGetUserProfile = true;
    }
  },
  mixins: [utilMixins],
  computed: {},
  methods: {
    // 生日日期选择开始
    bindDateChange: function (e) {
      this.params.birthday = e.target.value
    },
    // 生日日期选择结束
    setTel: function (e) {
      this.params.userTel = e
    },
    bindDateChange: function (e) {
      this.params.birthday = e.target.value
    },
    save() {
      var e = this;
      var t, u, o;
      t = ["realName"];
      u = isFailParams({
        field: e.params,
        filter: t,
        tips: {
          userId: "缺少用户id",
          realName: "请输入姓名",
          userTel: "请输入手机号",
          birthday: "请选择生日"
        }
      });
      if (!u) return;
      if (!isTelCode(e.params.userTel)) {
        return message("请输入正确的手机号", 3);
      }
      this.$api.login_save__user(e.params).then(res => {
        console.log(res, "7")
        swnb(1e3)
      })
    },
    //获取头像
    getUserInfo(e) {
      if (e.detail.errMsg == 'getUserInfo:ok') {
        uni.getUserInfo({
          provider: "weixin",
          success: (e) => {
            console.log('e: ', e);
            let param = {};
            param['nickName'] = e.userInfo.nickName;
            param['avatarUrl'] = e.userInfo.avatarUrl;
            this.params.userName = e.userInfo.nickName;
            this.params.portrait = e.userInfo.avatarUrl;
          }
        })
      }
    },
    //新接口
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      uni.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (e) => {
          console.log('e1: ', e);
          let param = {};
          param['userName'] = e.userInfo.nickName;
          param['avatarUrl'] = e.userInfo.avatarUrl;
          this.params.userName = e.userInfo.nickName;
          this.params.portrait = e.userInfo.avatarUrl;

        }
      })
    },
  }
}
</script>

<style>
</style>
<style scoped lang="less">
.picker {
  padding-left: 54rpx;
}
.uni-list-cell {
  margin-left: 27rpx;
  font-size: 30rpx;
  border-bottom: 1px solid #eeeeee;
}

.maint {
  padding: 50rpx 0;
}

.timg {
  width: 220rpx;
  height: 220rpx;
}

.foot-btnc {
  padding: 40rpx;
}

.foot-btn {
  height: 102rpx;
}

.wrap-button {
  margin-left: unset;
  border: none;
  margin-right: unset;
  background-color: unset;
  color: unset;
  border: 0;
  padding: 0;
}

.wrap-button::after {
  display: none;
}

.btn1 {
  width: 538rpx;
  height: 72rpx;
  border-radius: 50rpx;
  border: 1px solid #ff9f38;
  line-height: 72rpx;
  color: #ff9f38;
  margin-top: 500rpx;
}

.btn2 {
  width: 538rpx;
  height: 72rpx;
  border-radius: 50rpx;
  line-height: 72rpx;
  color: #ffffff;
  background: linear-gradient(#f38b5d, #f44771);
  margin-top: 48rpx;
}
</style>
