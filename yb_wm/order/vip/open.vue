<template>
  <view class="container pb115 ">
    <view class="main ">
      <view class="bf bs10 mainc ">
        <view class="p03 ">
          <view class="p30 f32 wei t-c ">{{(isbj?'修改':'填写')+'个人资料'}}</view>
          <view class="mb30 f24 c6 ">*请提供正确的个人资料与联系方式，以便获得最新会员优惠信息</view>
        </view>
        <mg-input ht="姓名" hw="130" isr="1" pr="请输入姓名" v-model="params.realName" vueId="5b591ef8-1">
        </mg-input>
        <mg-input ht="电话" hw="130" isr="1" :max="11" pr="请输入手机号" t="number" v-model="params.userTel" vueId="5b591ef8-2" :vueSlots="['ft']">
          <sq-btn @refresh="setTel" cname="text-btnf f24 ml20 p0 b00" h="50" slot="ft" t="自动填写" type="2" :vueId="'5b591ef8-3'+','+'5b591ef8-2'" w="120"></sq-btn>
        </mg-input>
        <mg-cell cname="p03" ht="性别" hw="130" isr="1" vueId="5b591ef8-4" :vueSlots="['bd']">

          <view slot="bd">
            <mg-radio :arr="sexArr" color="#F8A144" v-model="params.sex" :vueId="'5b591ef8-5'+','+'5b591ef8-4'"></mg-radio>
          </view>
        </mg-cell>
        <!-- v-if='vipset.register.includes("USER_FORM_INFO_FLAG_BIRTHDAY")' -->
        <block>
          <mg-cell ht="生日" hw="130" isr="1" last="1" vueId="5b591ef8-6" :vueSlots="['bd']" v-if="!isbj">
            <picker @change="bindDateChange" :end="endDate" mode="date" slot="bd" :value="date">
              <view class="c6 ">{{date}}</view>
            </picker>
          </mg-cell>
          <mg-cell :btt="date" bttc="c9" ht="生日" hw="130" isr="1" last="1" vueId="5b591ef8-7" v-else>
          </mg-cell>
        </block>
        <view class="p13 f24 c9 ">*温馨提示：生日时间一旦保存后，将不能再次修改哦！</view>
      </view>
    </view>
    <view class="foot-btnc posi-r mt30 ">
      <!-- <navigator url="./wkk"> -->
      <button @tap="save" class="foot-btn b00 bs15 " style="background:linear-gradient(#F8A144 , #D84333);" :disabled="loading" hoverClass="btnhc" :loading="loading">提交</button>
      <!-- </navigator> -->
    </view>
  </view>
</template>

<script>
import bkB from "components/common/block-b.vue";
import MgCell from "components/common/mg-cell.vue";
import sqBtn from "components/common/sq-btn.vue";
import mgInput from "components/form/mg-input.vue";
import mgRadio from "components/form/mg-radio.vue";
import {
  mapActions,
  mapState,
} from 'vuex'
import {
  utilMixins
} from 'common/utilMixins';
import {
  dateToTime,
  message,
  isFailParams,
  isTelCode,
  setNT,
  swnb,
  timeToDate
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
        userTel: "",
        birthday: "",
        sex: "男",
        realName: ""
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
      endDate: "",
      isbj: !1
    }
  },
  onLoad: function (e) {
    var t = this;
    t.date = t.endDate = timeToDate(dateToTime(), "yyyy-MM-dd"),
      e.userId && (t.isbj = !0), t.getSystem().then((function (e) {
        setNT("".concat(t.vipset.title || '会员', "-").concat(t.isbj ? "修改资料" : "提交资料"))
        t.date = '请选择生日'
      })),

      t.getLoginInfo().then((
        function () {
          t.params.userTel = t.user.userTel || "", t.isbj && (t.params.realName = t.user.realName, t
            .params.sex = t.user.sex, t.date = timeToDate(t.user.birthday, "yyyy-MM-dd"))
        })
      );
  },
  mixins: [utilMixins],
  computed: {
    ...mapState({
      vipset: function (e) {
        console.log('e: ', e);
        if (e.config.vipset && !e.config.vipset.register) e.config.vipset.register = [];
        return e.config.vipset
      }
    })
  },
  methods: {
    setTel: function (e) {
      this.params.userTel = e.data
    },
    bindDateChange: function (e) {
      this.date = e.target.value
      this.params.birthday = dateToTime(this.date)
    },
    save: function () {
      var e = this;
      var n, a, u;
      // try {
      // 	e.params.birthday = dateToTime(e.date),
      // 		n = [],
      // 		e.vipset.register.includes("USER_FORM_INFO_FLAG_NAME")|| n.push("realName"), e.vipset.register.includes("USER_FORM_INFO_FLAG_SEX") || n.push("sex"), e.vipset.register.includes("USER_FORM_INFO_FLAG_BIRTHDAY") || n.push("birthday"),
      // 		 a = isFailParams({
      // 				field: e.params,
      // 				filter: n,
      // 				tips: {
      // 					realName: "请输入姓名",
      // 					userTel: "请输入手机号",
      // 					birthday: "请选择生日"
      // 				}
      // 			});
      // 			console.log(a);
      // } catch (error) {

      // }
      // params: {
      // 					userTel: "",
      // 					birthday: "",
      // 					sex: "男",
      // 					realName: ""
      // 				},
      console.log(this.params.userTel);
      console.log(this.params.birthday);
      console.log(this.params.realName);
      if (this.params.userTel === '' || this.params.birthday === '' || this.params.realName === '') {
        return message("请完善表单", 3);
      }
      // return
      if (a) {
        if (e.params.userTel.length != 11) return message("请输入正确的手机号", 3);
        e.requestSM("vip");
        if (!e.isbj) {
          console.log(e, "852")
          this.$api['vip-card_receive__card'](e.params).then(res => {
            console.log(res, "741")
            e.refreshUser({
              nomask: 1,
              get: 1,
              now: 1
            })
          })
        }

      }

      uni.switchTab({
        url: "/pages/tabbar/my/index"
      })

    }
  }
}
</script>

<style scoped>
.main {
  padding: 90rpx 40rpx 30rpx;
}

.mainc {
  padding: 20rpx 0 30rpx;
  box-shadow: 0rpx 10rpx 15rpx 5rpx hsla(0, 0%, 86.7%, 0.8);
}
</style>
