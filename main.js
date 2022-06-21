import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;
import store from './store';
import '@/plugins'
import {
    GLOBAL
} from './globalData';
import {
    mapActions,
    mapState,
} from 'vuex'
import mgCell from '@/components/common/mg-cell';
import mgImg from '@/components/common/mg-img';
import tabBar from '@/components/common/tabbar';
import request from 'lib/api/util';
import {
    bus,
    getSb,
    makeTel,
    message
} from 'common/util';
import {
    subMessage
} from 'lib/utils/utils';


// start
import navBar from "@/components/navBar/index.vue";
//end

Vue.component('mgImg', mgImg);
Vue.component('tabBar', tabBar);
Vue.component('mgCell', mgCell);


Vue.component('navBar', navBar);


// var d = requirePlugin("subscribeMsg");
// 	var h = d.requestSubscribeMessage;
Vue.mixin({

    methods: {
        ...mapActions(['getSystem', 'getLayout', 'getLoginInfo', "refreshUser", "getSmConfig", "getAddInfo", "setCityInfo",
            "setAddInfo"
        ]),
        // 添加访问记录
        addFwjl(t) {
            return
            return this.$api.cloud_visit__collect({
                storeId: t.storeId,
                moduleName: t.origin
            });
        },
        setData: function (obj, callback) {
            let that = this;
            const handleData = (tepData, tepKey, afterKey) => {
                tepKey = tepKey.split('.');
                tepKey.forEach(item => {
                    if (tepData[item] === null || tepData[item] === undefined) {
                        let reg = /^[0-9]+$/;
                        tepData[item] = reg.test(afterKey) ? [] : {};
                        tepData = tepData[item];
                    } else {
                        tepData = tepData[item];
                    }
                });
                return tepData;
            };
            const isFn = function (value) {
                return typeof value == 'function' || false;
            };
            Object.keys(obj).forEach(function (key) {
                let val = obj[key];
                key = key.replace(/\]/g, '').replace(/\[/g, '.');
                let front, after;
                let index_after = key.lastIndexOf('.');
                if (index_after != -1) {
                    after = key.slice(index_after + 1);
                    front = handleData(that, key.slice(0, index_after), after);
                } else {
                    after = key;
                    front = that;
                }
                if (front.$data && front.$data[after] === undefined) {
                    Object.defineProperty(front, after, {
                        get() {
                            return front.$data[after];
                        },
                        set(newValue) {
                            front.$data[after] = newValue;
                            that.$forceUpdate();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    front[after] = val;
                } else {
                    that.$set(front, after, val);
                }
            });
            // this.$forceUpdate();
            isFn(callback) && this.$nextTick(callback);
        },
        changeUrl: function (t) {
            var e = "";
            if ("platform" == t.params) switch (t.name.id) {
                case "index":
                    e = "/pages/tabbar/index/index";
                    break;

                case "goods":
                case "TakeFood":
                case "takeOutFood":
                    e = "/pages/tabbar/order/index";
                    break;

                case "myOrder":
                    e = "/yb_wm/index/order-index";
                    break;

                case "member":
                    e = "/yb_wm/index/my-index";
                    break;

                case "myAddress":
                    e = "/yb_wm/my/address/index";
                    break;

                case "contactCustomer":
                    e = "/yb_wm/my/other/kf";
                    break;

                case "businessCooperate":
                    e = "/yb_wm/my/settled/apply";
                    break;

                case "aboutUs":
                    e = "/yb_wm/my/other/gywmtwo";
                    break;

                case "helpCenter":
                    e = "/yb_wm/my/other/bzzx";
                    break;

                case "couponCenter":
                    e = "/yb_wm/my/coupon/center";
                    break;

                case "myCoupon":
                    e = "/yb_wm/my/coupon/my";
                    break;

                case "live":
                    e = "/yb_wm/other/live-list";
                    break;

                case "balanceRecharge":
                    e = "/yb_wm/other/recharge/index";
                    break;

                case "signIndex":
                    e = "/yb_wm/my/signin/index";
                    break;

                case "integralShop":
                    e = "/pages/tabbar/shop/index";
                    break;

                case "collectionCourtesy":
                    e = "/yb_wm/other/scyl";
                    break;

                case "information":
                    e = "/yb_wm/other/info/index";
                    break;

                case "cashier":
                    e = "/pages/individualAccount/Collection/index";
                    break;

                case "navigation":
                    e = "/yb_wm/shop/select/index?page=index&storeId=" + this.$store.state.config.storeInfo.id;
                    break;

                case "fastOrder":
                    e = "/yb_wm/shop/ffmode/goods";
                    break;

                case "cardIndex":
                    e = "/pages/tabbar/my/index";
                    break;

                case "scanOrder":
                    return new Promise((resolve, j) => {
                        uni.scanCode({
                            success: (e) => {
                                // console.log('e11: ', e);
                                var r = e.path,
                                    n = "/" + r;
                                this.go({
                                    t: 1,
                                    url: n
                                });
                                resolve(n);
                            },
                            fail: function (t) {
                                // console.log("扫码fail");
                            }
                        });
                    }), '';
                    break;
            }

            return e;
        },
        // 路由切换
        go: function (e) {
            switch (e.t) {
                case void 0:
                case 1:
                    uni.navigateTo({
                        url: e.url
                    });
                    break;

                case 2:
                    uni.redirectTo({
                        url: e.url
                    });
                    break;

                case 6:
                    uni.switchTab({
                        url: e.url
                    });
                    break;

                case 3:
                    uni.reLaunch({
                        url: e.url
                    });
                    break;

                case 4:
                    uni.navigateBack({
                        delta: 1
                    });
                    break;

                case 5:
                    getCurrentPages().length > 1 ? uni.navigateBack({
                        delta: 1
                    }) : uni.reLaunch({
                        url: e.url
                    });
            }
        },
        // 是否登录
        checkLogin: function () {
            return new Promise((t, e) => {
                if (!this.isLogin) {
                    uni.reLaunch({
                        url: "/pages/user/userLogin/index"
                    })
                } else {
                    t()
                }
            });
        },
        goUrl: function (t, r) {
            // console.log('t, r: ', t, r);
            var o = this;
            var a, i;
            if (t) {
                i = t.t || "1";
                switch (t.params) {
                    // 5
                    case "platform":
                        if ("inviteCenter" == t.param) {
                            request({
                                url: o.api.DistributionInfo,
                                mask: 1,
                                data: {
                                    userId: o.uId
                                }
                            }).then(res => {
                                if (res) {
                                    if (res.state == 1) message("请等待平台审核您的申请", 3)
                                    else if (res.state == 3) message("您的申请已被拒绝", 3)
                                    else if (res.state == 2) o.go({
                                        url: "/yb_o2o/invite/fxzx"
                                    })
                                }
                            })
                        } else {
                            if (a = this.changeUrl(t), a) {
                                if (i = "1", -1 == a.indexOf("/index/")) {

                                    // 21
                                    break;
                                } else if (i = "4", "takeOutFood" != t.name.id) {
                                    break;
                                } else {
                                    return o.go({
                                        url: "/yb_wm/my/address/index?from=4&storeId=".concat(o.$store.state.config.storeInfo.id)
                                    })
                                }
                            }

                        }
                        break;
                    //22
                    case "link":
                        i = "1", a = t.category.indexOf("http") > -1 ? "/yb_o2o/other/web-view?src=" +
                            encodeURIComponent(JSON.stringify("h" == t.category.substring(0, 1) ? t.category : t
                                .category.substring(7))) : t.category;
                        break;
                    //25
                    case "appjump":
                        a = t.name.path, i = "5";
                        break;
                    //28
                    case "call":
                        makeTel(t.param.phone);
                        break;
                    //30
                    case "product":
                        a = "/yb_wm/shop/out/goods-dl?gid=".concat(t.name.id, "&storeId=").concat(o.$store.state.config.storeInfo.id,
                            "&page=index")
                        break;
                    //32
                    case "productCategory":
                        a = "/pages/tabbar/order/index", i = "4";
                        break;
                    //35
                    case "customPage":
                        a = "/yb_wm/order/other/custom?pid=" + t.name.id;
                        break;
                    //37
                    default:
                        break;
                }
                "1" == i ? uni.navigateTo({
                    url: a
                }) :
                    "4" == i ? (uni.switchTab({
                        url: a
                    }),
                        "TakeFood" == t.name.id ? setTimeout((function () {
                            bus.$emit("qjjtsj", "TakeFood" == t.name.id ? 2 : 1)
                        }), 200) :
                            "productCategory" == t.params && setTimeout((function () {
                                bus.$emit("qjjtsj", {
                                    flid: t.name.pid > 0 ? t.name.pid : t.name.id
                                })
                            }), 200)) :
                        "2" == i ? uni.redirectTo({
                            url: a
                        }) :
                            "3" == i ? uni.reLaunch({
                                url: a
                            }) :
                                "5" == i && uni.navigateToMiniProgram({
                                    appId: t.name.appId,
                                    path: t.name.path,
                                    complete: function (e) { }
                                })
            }
        },
        getSjgd: function (t) {
            return parseInt(2 * t * getSb().rate);
        },
        // 订阅通知
        requestSM: function (e, res1) {
            var t = this;
            return new Promise((r, j) => {
                t.getSmConfig().then(res => {
                    subMessage(t.smConfig[e], res1 => {
                        r('订阅结束');
                    });
                }).catch(e => {
                    j(e);
                })
            });
        }
    },
    computed: {
        ...mapState(['smConfig']),
        ...mapState({
            user: function (e) {
                return e.user
            },
            uId: function (e) {
                return e.user.id || ""
            },
            isVip: function (e) {
                return e.user.level > 0
            },
            isLogin: function (e) {
                return e.isLogin
            },
            tColor: function (e) {
                return e.system.color
            },
            system: function (e) {
                return e.system
            },
            isIpx: function (e) {
                return e.isIpx
            },
            sl: function (e) {
                return e.system.custom.hbfh
            },
            dw: function (e) {
                return e.system.custom.hbmc
            }
        }),
        onImgurl: function () {
            return GLOBAL.onImgurl;
        },
        isDev: function () {
            return GLOBAL.siteInfo.isDev;
        },
    }
});

App.mpType = 'app';

const app = new Vue({
    ...App,
    store
});
app.$mount();