<template>
  <view>
    <block v-if="navbar&&navbar.navs&&navbar.navs.length>0">
      <view class="navbar f-row" :style="'backgroun:'+navbar.colorBg+';'+'border-top:'+'1rpx solid '+navbar.border_color+';'+'bottom:'+(isIpx?'40rpx':'')+';'">
        <block v-for="(item, idx) in navbar.navs" :key="idx">
          <view class="navbargator f-g-1 f-y-c" @tap="goPage(item,idx)" v-if="!item.item">
            <view class="navbar-view f-c-c">
              <image class="navbar-icon" mode="aspectFit" :src="item.active?item.icon.active:item.icon.normal" v-if="item.icon">
              </image>
              <block v-else>
                <text :class="[item.icon2,'iconfont f42']" :style="'color:'+(item.active?navbar.color:navbar.colorOff)+';'" v-if="item.icon2"></text>
              </block>
              <view class="navbar-text" :style="'color:'+(item.active?navbar.color:navbar.colorOff)+';'">{{item.text+''}}
              </view>
            </view>
          </view>
        </block>
      </view>
      <view class="bgf" v-if="isIpx"></view>
    </block>
  </view>
</template>

<script>
import {
  deepCopy,
  getRoute,
  throttle
} from 'common/util';
import {
  GLOBAL
} from 'globalData';
import {
  mapState
} from 'vuex';
export default {
  name: "tabbar",
  props: {
    type: {
      type: Object,
      default: function () {
        return {
          message: "hello"
        };
      }
    },
    ptype: {
      type: String,
      default: "index"
    },
    color: {
      type: String,
      default: ""
    }
  },
  data: function () {
    return {};
  },
  computed: {
    ...mapState({
      layout: function (e) {
        return e.layout.index.body && e.layout.index.body.menu;
      },
      cmlayout: function (e) {
        return e.layout.custom.body && e.layout.custom.body.menu;
      },
      isshopdl: function (e) {
        return e.config.isshopdl;
      }
    }),
    navbar: function () {
      var e = this;

      if ("index" != this.ptype || this.isshopdl) {
        if ("custom" == this.ptype && this.cmlayout) {
          var t = {
            colorBg: "#fff",
            border_color: "rgba(0,0,0,0.05)",
            color: "#333",
            colorOff: "#888",
            navs: []
          };

          if (this.cmlayout[0] && this.cmlayout[0].styles.imgUrl.length) {
            var n = this.cmlayout[0].styles;
            t.colorBg = n.colorBg, t.border_color = n.colorLine, t.color = n.colorSelect, t.colorOff = n.colorUnselect;
            var o = deepCopy(n.imgUrl);

            for (var r in o) o[r].icon = {
              active: o[r].front[0].img,
              normal: o[r].back[0].img
            }, o[r].link = this.changeUrl(o[r].url), delete o[r].front, delete o[r].back, delete o[r].url;

            t.navs = o;
          } else t.navs = [
            {
              icon2: "iconjiayuan",
              text: "首页",
              link: "/pages/tabbar/index/indexx"
            },
            {
              icon2: "iconjiayuan",
              text: "订单",
              link: "/yb_wm/index/order-index"
            }, {
              icon2: "iconjiayuan",
              text: "我的",
              link: "/yb_wm/index/my-index"
            }];

          t.navs.forEach(function (e) {
            e.t = -1 != e.link.indexOf("/index/") ? 6 : 1;
          });
          var i = t.navs.findIndex(function (t) {
            return t.link == "/" + e.pageroute;
          });
          return i > -1 && (t.navs[i].active = !0, this.$emit("refresh", !0)), t;
        }
      } else {

        if (GLOBAL.tabbar) {
          var a = deepCopy(GLOBAL.tabbar),
            l = a.navs.findIndex(function (t) {
              return t.link == "/" + e.pageroute;
            });
          return l > -1 ? (a.navs[l].active = !0, this.$emit("refresh", !0)) : a = null, a;
        }

        if (this.layout) {
          var u = {
            colorBg: "#fff",
            border_color: "rgba(0,0,0,0.05)",
            color: "#333",
            colorOff: "#888",
            navs: []
          };

          if (this.layout[0] && this.layout[0].styles.imgUrl.length) {
            var f = this.layout[0].styles;
            u.colorBg = f.colorBg, u.border_color = f.colorLine, u.color = f.colorSelect, u.colorOff = f.colorUnselect;
            var s = JSON.parse(JSON.stringify(f.imgUrl));

            for (var d in s) s[d].icon = {
              active: s[d].front[0].img,
              normal: s[d].back[0].img
            }, s[d].link = this.changeUrl(s[d].url), delete s[d].front, delete s[d].back, delete s[d].url;

            u.navs = s;
          } else u.navs = [
            {
              icon2: "iconjiayuan",
              text: "首页",
              link: "/pages/tabbar/index/index"
            },
            {
              icon2: "iconjiayuan",
              text: "点单",
              link: "/pages/tabbar/order/index"
            }, {
              icon2: "iconjiayuan",
              text: "订单",
              link: "/yb_wm/index/order-index"
            }, {
              icon2: "iconjiayuan",
              text: "我的",
              link: "/yb_wm/index/my-index"
            }];

          u.navs.forEach(function (e) {
            e.t = -1 != e.link.indexOf("/index/") ? 6 : 1;
          }), GLOBAL.tabbar = deepCopy(u);
          var b = u.navs.findIndex(function (t) {
            return t.link == "/" + e.pageroute;
          });
          return b > -1 ? (u.navs[b].active = !0, this.$emit("refresh", !0)) : u = null, u;
        }
      }
    }
  },
  methods: {
    goPage: throttle(function (e) {
      if (!e[0].active) {
        var t = 6 == e[0].t ? 6 : this.pageroute.indexOf("/index/") > -1 ? 1 : 2;
        this.go({
          t: t,
          url: e[0].link
        });
      }
    }, 500),
  },
  created: function () {
    this.pageroute = getRoute(), uni.hideTabBar();
  }
}
</script>