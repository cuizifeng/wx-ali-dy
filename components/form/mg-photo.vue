<template>
	<view :class="['',cname]">
		<view class="f-raw ">
			<view class="mpimgc posi-r " v-for="(v, i) in filePaths" :key="i">
				<view class="mpimg o-h " :style="'width:'+w+';'+'height:'+w+';'">
					<mg-img class="" :local="v.tmp" :src="v.url" :vueId="'66ab5c32-1-'+i"></mg-img>
				</view>
				<icon @tap="deletePic(i)" class="posi-a mpclose " size="20" type="clear"></icon>
			</view>
			<view class="mpimgc " v-if="filePaths.length<max">
				<view @tap="add" class="mpimg mpaddc f-c-c " :style="'width:'+w+';'+'height:'+w+';'">
					<text :class="['iconfont f40 c9 ',icon]"></text>
					<view class="c9 f22 t-c mt10 p02 " v-if="pt">{{pt}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MgCell from 'components/common/mg-cell.vue';
	import {
		choosePhoto
	} from 'common/util';
import { platform } from 'common/apiconfig';

	export default {
		components: {
			MgCell
		},
		props: {
			cname: "",
			max: {
				type: String,
				default: "9"
			},
			fileList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			pt: {
				type: String,
				default: ""
			},
			mark: {
				type: [String, Number],
				default: ""
			},
			pkey: {
				type: String,
				default: ""
			},
			icon: {
				type: String,
				default: "iconjia"
			},
			title: "",
			ftitle: "",
			w: ""
		},
		data: function() {
			return {
				filePaths: [],
				files: []
			};
		},
		computed: {},
		watch: {
			fileList: {
				handler: function(t) {
					this.filePaths = Object.assign([], t.map(function(t) {
						return {
							url: t
						};
					})), t.length && (this.$emit("change-img", {
						p: this.filePaths,
						mark: this.mark,
						pkey: this.pkey
					}), "weChat" == platform && (this.files = this.filePaths));
				},
				immediate: !0
			}
		},
		methods: {
			add: function() {
				var t = this;
				choosePhoto({
					num: t.max - t.filePaths.length
				}).then(res => {
					t.filePaths = t.filePaths.concat(res.map(function(t) {
						return {
							tmp: 1,
							url: t
						};
					}));
					t.$emit("change-img", {
						p: t.filePaths,
						mark: t.mark,
						pkey: t.pkey
					})
				})
			},
			deletePic: function(t) {
				this.filePaths.splice(t, 1), "weChat" != platform ? this.$emit("change-img", {
					p: this.filePaths,
					mark: this.mark,
					pkey: this.pkey
				}) : (this.files.splice(t, 1), this.$emit("change-img", {
					p: this.files,
					mark: this.mark,
					pkey: this.pkey
				}));
			}
		}
	}
</script>
<style scoped>
	.mpimgc {
		padding: 20rpx 20rpx 0 0;
		margin: 0 10rpx 20rpx 0;
	}

	.mpimg {
		width: 136rpx;
		height: 136rpx;
		border-radius: 10rpx;
	}

	.mpclose {
		top: 0rpx;
		right: 0rpx;
	}

	.mpaddc {
		border: 1px dashed #d5d5d5;
	}
</style>