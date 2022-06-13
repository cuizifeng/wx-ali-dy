<template>
	<view class="container pb115 ">
		<mg-input v-model="params.userName" ht="联系人" hw="130" pr="请输入联系人" :value="params.userName" vueId="2fb9fb3f-1">
		</mg-input>
		<mg-cell cname="p03" ht="性别" hw="130" vueId="2fb9fb3f-2" :vueSlots="['bd']">
			<view slot="bd">
				<mg-radio v-model="params.sex" :arr="sexArr" :vueId="'2fb9fb3f-3'+','+'2fb9fb3f-2'"></mg-radio>
			</view>
		</mg-cell>
		<mg-input v-model="params.userTel" ht="手机号" hw="130" :max="11" pr="请输入手机号" t="number" :value="params.userTel"
			vueId="2fb9fb3f-4"></mg-input>
		<mg-input arrow="1" @tab="chooseLocation" dis="1" ht="地址" hw="130" pr="请选择地址" :value="params.address"
			vueId="2fb9fb3f-5"></mg-input>
		<mg-input v-model="params.details" ht="门牌号" hw="130" pr="如：5号楼208室" :value="params.details" vueId="2fb9fb3f-6">
		</mg-input>
		<mg-cell ht="标签" hw="130" last="1" vueId="2fb9fb3f-7" :vueSlots="['bd']">
			<view class="f-raw " slot="bd">
				<bk-b @tab="label(v)" :cName="'be6 mr30 '+(params.label!=v&&'c3')" :color="params.label==v?tColor:''" :t="v"
					:vueId="'2fb9fb3f-8-'+i+','+'2fb9fb3f-7'" v-for="(v, i) in labels" :key="i"></bk-b>
			</view>
		</mg-cell>
		<mg-cell last="1" vueId="2fb9fb3f-9" :vueSlots="['ft']" v-if="isEdit">
			<view @tap="deleteAdd" class="f-y-c " slot="ft">
				<text class="iconfont iconshanchu f40 "></text>
				<text class="ml10 ">删除</text>
			</view>
		</mg-cell>
		<view class="foot-btnc ">
			<button @tap="save" class="foot-btn " :disabled="loading" :loading="loading"
				:style="'background:'+tColor+';'">保存</button>
		</view>
		<mg-map @getCl="setCLP" class=" vue-ref" ref="mgmap" vueId="2fb9fb3f-10"></mg-map>
	</view>
</template>

<script>
	import {
		getPage,
		isFailParams,
		isTelCode,
		setNT,
		swnb,
		modal,
    message
	} from "common/util";
	import bkB from "components/common/block-b.vue";
	import MgCell from "components/common/mg-cell.vue";
	import mgInput from "components/form/mg-input.vue";
	import mgMap from "components/form/mg-map.vue";
	import mgRadio from "components/form/mg-radio.vue";

	export default {
		components: {
			mgInput,
			mgRadio,
			mgMap,
			MgCell,
			bkB,
		},
		data: function() {
			return {
				t: "digit",
				params: {
					userName: "",
					sex: "先生",
					userTel: "",
					address: "",
					details: "",
					label: "公司",
					lat: "",
					lng: "",
					id: ""
				},
				sexArr: [{
					value: "先生",
					name: "先生"
				}, {
					value: "女士",
					name: "女士",
					checked: "true"
				}],
				labels: ["公司", "家", "学校"],
				loading: !1,
				isEdit: !1
			}
		},
		onLoad: function(e) {
			var t = this;
			t.getSystem(), setNT("编辑地址");
			if (e.id) {
				this.$api.member_save__user__address({
					id: e.id
				}).then(res => {
					for (var u in t.params) t.params[u] = res[u];
				})
			}
		},
		methods: {
			label: function(e) {
				this.params.label = e
			},
			chooseLocation: function() {
				this.$refs.mgmap.choose()
			},
			setCLP: function(e) {
				this.params.address = e.address, this.params.details = e.name, this.params.lat = e.latitude, this.params
					.lng = e.longitude
			},
			save: function() {
				var e = this;
				var n, a, i, s;
				n = ["lat", "lng"], e.params.id || n.push("id"), a = isFailParams({
					field: e.params,
					filter: n,
					tips: {
						userId: "缺少用户id",
						userName: "请输入联系人",
						userTel: "输入手机号",
						address: "请选择地址",
						details: "请输入门牌号等详细地址",
						label: "请选择标签",
						id: "缺少地址id"
					}
				});
				if (a) {
					if (!isTelCode(e.params.userTel)) {
						return message("请输入正确的手机号", 3)
					}
					this.$api.member_save__user__address(e.params).then(res => {
						s = getPage(), s.$vm.getData(),
							swnb(1e3)
					})
				}

			},
			deleteAdd: function() {
				var e = this;
				modal("确认删除此地址吗？").then(() => {
					this.$api.member_del__user__address({
						id: e.params.id
					}).then(res => {
						s = getPage(), s.$vm.getData(),
							swnb(1e3)
					})
				})
			}
		}
	}
</script>