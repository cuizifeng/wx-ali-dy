<template>
  <view class="xc-picker-box">
    <!-- 显示标题 -->
    <view v-if="show" class="xc-picker-title" :class="[showRight? 'show-right':'']" @tap.stop="showPicker">
      <view class="xc-flex-1 text-cut">
        <text v-if="selItems.length==0">请选择</text>
        <text v-if="selItems.length>0">{{ selItems.map(item=>{return item[itemName] }).join(",") }}</text>
      </view>
    </view>
    <!-- 遮罩层 -->
    <view class="xc-picker-mask" :class="{'active': showBg}" @tap.stop="hidePicker"></view>
    <!-- 弹出框 -->
    <view class="xc-picker-bg" :class="{'active': showBg}">
      <view class="xc-picker-header">
        <view>
          <button v-if="more && max===0" class="cu-btn line-orange sm" @tap.stop="toggleAllSelect">全选/不选</button>
          <span v-if="!(more && max===0)">请选择</span>
        </view>
        <view>
          <button class="cu-btn sm xc-text-14 xc-c-555" @tap.stop="hidePicker">关闭</button>
          <button class=" cu-btn  sm margin-left xc-text-14 xc-c-fff " :class="[submitClass]" @tap.stop="submitSelete">确定</button>
        </view>
      </view>
      <scroll-view :scroll-y="true" :style="'height:' + (height*2-90)  + 'rpx;'">
        <view class="xc-picker-item" :class="{'active':selItemsTemp.find(function(selitem){
					return selitem[itemId] == item[itemId];
				})}" v-for="(item,index) of list" :key="index" @tap.stop="chooseItem(item,index)">
          {{item[itemName]}}
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: "xc-picker",
  props: {

    //是否多选
    more: {
      type: Boolean,
      default: false
    },
    showRight: {
      type: Boolean,
      default: false
    },
    submitClass: {
      type: String,
      default: 'xc-bg-294D7C'
    },
    //多选上限
    max: {
      type: Number,
      default: 0
    },
    //当前值，单选number, 多选string
    value: {
      type: [Number, String],
      default: ''
    },
    //弹框高度
    height: {
      type: Number,
      default: 250
    },
    //列表数据
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    //返回键值
    itemId: {
      type: String,
      default: "id"
    },
    //显示名称
    itemName: {
      type: String,
      default: "name"
    },
    show: {
      type: Boolean,
      default: true
    },
    //返回值分割字符串
    splitChar: {
      type: String,
      default: ','
    }

  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      //传值类型，取值成功后原样返回，仅用于单选类返回值
      valueType: 'string',
      //临时选项
      selItemsTemp: [],
      //已选项
      selItems: [],
      showBg: false
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    value() {
      this.init()
    },
  },
  methods: {
    init() {
      let arr = [];
      //临时转换字符串类型

      this.valueType = typeof (this.value);
      let value = this.value + '';
      console.log("传值类型", this.valueType);
      if (this.valueType != "undefined") {
        //console.log(value);

        let arr_v = value.split(this.splitChar);
        console.log("转换value", arr_v);
        arr = this.list.filter(item => {
          var index = arr_v.findIndex(sub => {
            console.log(sub + ' vs ' + item[this.itemId]);
            return sub == item[this.itemId]
          })
          if (index > -1) {
            return item;
          }
        });

      }

      this.selItemsTemp = JSON.parse(JSON.stringify(arr));
      this.selItems = JSON.parse(JSON.stringify(arr));
    },
    //全选或不全选, max == false有效
    toggleAllSelect() {
      if (this.selItemsTemp.length > 0) {
        this.selItemsTemp = [];
      } else {
        this.selItemsTemp = JSON.parse(JSON.stringify(this.list));
      }
    },
    //确定勾选
    submitSelete() {
      this.selItems = JSON.parse(JSON.stringify(this.selItemsTemp));
      let selIds = this.selItems.map(item => {
        return item[this.itemId]
      }).join(this.splitChar);
      //数据类型原样返回
      if (this.valueType == 'number') selIds = selIds - 0;
      this.$emit("change", selIds);
      this.hidePicker();
    },
    //临时选中
    chooseItem(item) {

      if (this.more === false) {
        this.selItemsTemp = [];
      }


      let sel_index = this.selItemsTemp.findIndex((selitem) => {
        return selitem[this.itemId] == item[this.itemId]
      });
      if (sel_index > -1) {
        this.selItemsTemp.splice(sel_index, 1);
      } else {
        //判断选项上限
        if (this.more === true && this.selItemsTemp.length >= this.max && this.max > 0) {
          uni.showToast({
            title: '最多只能选' + this.max + "项",
            icon: 'none'
          });
          return;
        }

        this.selItemsTemp.push(item);
      }

      this.$emit('onChoose', this.selItemsTemp);
    },
    //显示
    showPicker() {
      this.showBg = true;
      console.log('show');
    },
    //隐藏
    hidePicker() {
      this.showBg = false;
      console.log('hide');
    }
  }
}
</script>

<style lang="scss" scoped>
.xc-picker-box {
  flex: 1;
  font-size: 15px;
  color: grey;

  position: relative;
  overflow: hidden;
}

.xc-picker-title {
  position: relative;
  overflow: hidden;
  padding-right: 40rpx;
}

.show-right::after {
  position: absolute;
  top: -2rpx;
  right: 5px;
  bottom: 0;
  display: block;
  margin: auto;
  width: 14rpx;
  height: 14rpx;
  transform: rotate(45deg);
  border-top: 2rpx solid #666;
  border-right: 2rpx solid #666;
  content: "";
}

.xc-picker-mask {
  position: fixed;
  z-index: 886;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  visibility: hidden;
  transition: visibility 0.2s linear;
}

.xc-picker-bg {
  background-color: #fff;
  padding: 0;
  position: fixed;
  bottom: -1100rpx;
  left: 0;
  width: 100%;
  z-index: 887;
  transition: bottom 0.2s linear;
}

.xc-picker-mask.active {
  visibility: visible;
}

.xc-picker-bg.active {
  bottom: 0rpx;
}

.xc-picker-header {
  height: 90rpx;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}

.xc-picker-item {
  padding: 20rpx;
  border-bottom: 1px dashed #ddd;
  text-align: left;
  position: relative;
}

.xc-picker-item.active {
  /* color: #F60; */
  color: #365276;
}

.xc-picker-item.active::after {
  position: absolute;
  top: -6rpx;
  right: 20rpx;
  bottom: 0;
  display: block;
  margin: auto;
  width: 30rpx;
  height: 16rpx;
  transform: rotate(135deg);
  border-top: 2px solid #365276;
  border-right: 2px solid #365276;
  content: "";
}
</style>