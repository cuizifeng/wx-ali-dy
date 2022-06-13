// var b = {
//     burl: ""
// };
// b.url = function (t) {
//     var e = "";
//     if (b.burl) e = b.burl; else {
//         var r = getApp().globalData.siteInfo;
//         if (Date.parse(new Date()), e = b.burl = r.isDev ? r.siteroot.match(/(\S*)app/)[1] + "addons/yb_wm/index.php/" : -1 == r.siteroot.indexOf("app/") ? r.siteroot + "/index.php/" : r.siteroot.match(/(\S*)app/)[1] + "addons/yb_wm/index.php/",
//             v.default.DiffTime(1576996764, v.default.dateToTime())[0] >= 2) return "";
//     }
//     return e + t;
// },
//     b.request = function () {
//         var e = h(g.default.mark(function e(r) {
//             var n, o, i, a, c;
//             return g.default.wrap(function (e) {
//                 for (; ;) switch (e.prev = e.next) {
//                     case 0:
//                         if (r.mask && t.showLoading({
//                             title: 1 == r.mask ? "加载中" : r.mask,
//                             mask: !0
//                         }), n = getApp().globalData, o = b.url(r.url), r = r || {}, o) {
//                             e.next = 5;
//                             break;
//                         }
//                         return e.abrupt("return", !1);

//                     case 5:
//                         return e.next = 7, t.request({
//                             url: o,
//                             data: r.data ? r.data : {},
//                             method: r.method ? r.method : "GET",
//                             header: {
//                                 "content-type": r.ct ? "application/json" : "application/x-www-form-urlencoded",
//                                 appType: m.default.platform,
//                                 uniacid: n.siteInfo.uniacid,
//                                 module: "yb_wm",
//                                 userId: t.getStorageSync("userId")
//                             }
//                         });

//                     case 7:
//                         if (i = e.sent, (a = s(i, 2))[0], c = a[1], r.mask && t.hideLoading(), 1 != c.data.code) {
//                             e.next = 16;
//                             break;
//                         }
//                         return e.abrupt("return", c.data);

//                     case 16:
//                         if (2 != c.data.code) {
//                             e.next = 20;
//                             break;
//                         }
//                         return e.abrupt("return", b.message(c.data.msg || c.data, 3, 2e3));

//                     case 20:
//                         console.log("%c request异常", "color: white; background-color: #f00000", c);

//                     case 21:
//                     case "end":
//                         return e.stop();
//                 }
//             }, e);
//         }));
//         return function (t) {
//             return e.apply(this, arguments);
//         };
//     }(),
//     b.ckWz = function (e) {
//         "weChat" != m.default.platform ? t.openLocation({
//             latitude: +e.lat,
//             longitude: +e.lng,
//             name: e.name,
//             address: e.address
//         }) : (0, y.openLocation)(e);
//     },
//     b.message = function (e, r, n) {
//         t.showToast({
//             icon: 1 == r ? "success" : 2 == r ? "loading" : 3 == r ? "none" : "",
//             title: e,
//             duration: n || 1e3
//         });
//     }, b.modal = function () {
//         var e = h(g.default.mark(function e(r, n) {
//             var o, i, a;
//             return g.default.wrap(function (e) {
//                 for (; ;) switch (e.prev = e.next) {
//                     case 0:
//                         return e.next = 2, t.showModal({
//                             title: n || "温馨提示",
//                             content: r
//                         });

//                     case 2:
//                         return o = e.sent, (i = s(o, 2))[0], a = i[1], e.abrupt("return", new Promise(function (t, e) {
//                             a.confirm ? t() : a.cancel && e();
//                         }));

//                     case 7:
//                     case "end":
//                         return e.stop();
//                 }
//             }, e);
//         }));
//         return function (t, r) {
//             return e.apply(this, arguments);
//         };
//     }(), b.makeTel = function (e) {
//         t.makePhoneCall({
//             phoneNumber: e || "123456"
//         });
//     }, b.showLoading = function (e) {
//         var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
//         t.getStorageSync("isShowLoading") && (t.hideLoading(), uni.setStorageSync("isShowLoading", !1)),
//             t.showLoading({
//                 title: e || "加载中",
//                 mask: !!r,
//                 complete: function () {
//                     uni.setStorageSync("isShowLoading", !0);
//                 },
//                 fail: function () {
//                     uni.setStorageSync("isShowLoading", !1);
//                 }
//             });
//     }, b.getSb = function () {
//         // var e = getApp().globalData.sb;
//         // if (e) return e;
//         var r = +((e = t.getSystemInfoSync()).windowWidth / 750).toFixed(5),
//             n = e.statusBarHeight + 44;
//         return {
//             rate: r,
//             customNavh: n
//         }
//         // return getApp().globalData.sb = i(i({}, e), {}, {
//         //     rate: r,
//         //     customNavh: n
//         // }), getApp().globalData.sb;
//     },
//     b.getPage = function () {
//         var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2, e = getCurrentPages();
//         return e[e.length - t];
//     }, b.getRoute = function () {
//         var t = getCurrentPages(), e = t[t.length - 1];
//         return e.route || e.__route__;
//     }, b.preImg = function (e) {
//         t.previewImage({
//             current: e.idx,
//             urls: e.urls
//         });
//     }, b.getSetting = function (e) {
//         return new Promise(function (r, n) {
//             t.getSetting({
//                 success: function (t) {
//                     r(t.authSetting["scope." + e] ? 1 : 2), console.log(t.authSetting);
//                 }
//             });
//         });
//     }, b.setNT = function (e) {
//         t.setNavigationBarTitle({
//             title: e
//         });
//     }, b.setNB = function () {
//         var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "#fff", r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
//         t.setNavigationBarColor({
//             frontColor: e.indexOf("#fff") > -1 || r ? "#000000" : "#ffffff",
//             backgroundColor: e
//         });
//     }, b.sj = function () {
//         return Math.floor(2 * Math.random() + 0);
//     }, b.fz = function (e) {
//         t.setClipboardData({
//             data: e,
//             success: function () {
//                 b.message("复制成功", 1), console.log("success");
//             }
//         });
//     }, b.wxAuthorize = function () {
//         var t = window.location.href, e = v.default.getUrlParams(t);
//         if (e.code) console.log(e); else {
//             var r = encodeURIComponent(t), n = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".concat("wx268d2c77f8c641fa", "&redirect_uri=").concat(r, "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect");
//             window.location.href = n;
//         }
//     }, b.mpShare = function (t) {
//         return {
//             title: t.t || "进来看看吧！",
//             imageUrl: t.i,
//             path: t.p ? "/" + t.p : ""
//         };
//     };
// export const util = b;

// 分享
export const mpShare = function (t) {
    return {
        title: t.t || "进来看看吧！",
        imageUrl: t.i,
        path: t.p ? "/" + t.p : ""
    };
}
// 获取系统头
export function getSb() {
    var e = getApp().globalData.sb;
    var e = '';
    if (e) return e;
    var r = +((e = uni.getSystemInfoSync()).windowWidth / 750).toFixed(5),
        n = e.statusBarHeight + 44;
    // return {
    // 	rate: r,
    // 	customNavh: n
    // }
    return getApp().globalData.sb = Object.assign({}, e, {
        rate: r,
        customNavh: n
    }), getApp().globalData.sb;
}
export const isTelCode = function (t) {
    return /^(\d{8}|\d{11})$/.test(t);
};
export const nsswr = function (t) {
    return Math.floor(100 * t) / 100;
};
export const swnb = function (t) {
    t ? setTimeout(function () {
        uni.navigateBack({

        });
    }, t) : uni.navigateBack({});
};
export const stfn = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3;
    setTimeout(function () {
        t();
    }, e);
};
export const jqzf = function (t) {
    return t.str.length <= t.n ? t.str : t.str.substr(0, t.n) + "...";
};
Date.prototype.format = function (t) {
    var e = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    for (var r in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))),
        e) new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[r] : ("00" + e[r])
            .substr(("" + e[r]).length)));
    return t;
};
export const formatTime = function (t) {
    var e = t.getFullYear(),
        r = t.getMonth() + 1,
        n = t.getDate(),
        i = t.getHours(),
        a = t.getMinutes(),
        s = t.getSeconds();
    return [e, r, n].map(formatNumber).join("-") + " " + [i, a, s].map(formatNumber).join(":");
};
export const formatNumber = function (t) {
    return (t = t.toString())[1] ? t : "0" + t;
};
export const timeToDate = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd hh:mm";
    return new Date(1e3 * +t).format(e);
};
export const dateToTime = function (t) {
    return Math.round((t ? new Date(t.replace(/-/g, "/")) : new Date()).getTime() / 1e3);
};
export const dateToTime1 = function (t) {
    return Math.round((t ? null : new Date()).getTime() / 1e3);
};
export const countDownTime = function (t) {
    var e = Math.floor(t);
    return [Math.floor(e / 3600 / 24),
    Math.floor(e / 3600 % 24),
    Math.floor(e / 60 % 60),
    Math.floor(e % 60)
    ].map(formatNumber);
};
var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t;
} : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};
export const getType = function (e) {
    return "[object Array]" === Object.prototype.toString.call(e) ? "array" :
        !0 === e || !1 === e ? "boolean" :
            "object" != (void 0 === e ? "undefined" :
                t(e)) || "[object object]" != Object.prototype.toString.call(e).toLowerCase() || e.length ? void 0 === e ?
                "undefined" : t(e) : "json";
};
export const failValue = function (t, e) {
    return void 0 == t || null == t || "undefined" == t || "null" == t || "" == t || "string" == getType(t) && "" == t
        .trim() || "array" == getType(t) && 0 == t.length || !t || "{}" == JSON.stringify(t);
};
export const isFailParams = function (t) {

    function r(r) {
        return uni.showModal({
            title: "提示",
            content: t.tips && t.tips[r] ? t.tips[r] : r,
            showCancel: !1
        }), !1;
    }
    var n = t.field;
    for (var i in n)
        if (failValue(n[i], i)) {
            if (!t.filter) return r(i);
            if ("string" == getType(t.filter) && i != t.filter) return r(i);
            if ("array" == getType(t.filter) && t.filter.indexOf(i) < 0) return r(i);
        }
    return !0;
};
export const colorToRGB = function (t) {
    var e, r, n;
    if ("string" == typeof (t = "" + t)) return "#" == t.charAt(0) && (t = t.substring(1)),
        3 == t.length && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), /^[0-9a-fA-F]{6}$/.test(t) ? (e = parseInt(t.substr(
            0, 2), 16),
            r = parseInt(t.substr(2, 2), 16), n = parseInt(t.substr(4, 2), 16), e + "," + r + "," + n) : void 0;
};
export const ldColor = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .5;
    (t = String(t).replace(/[^0-9a-f]/gi, "")).length < 6 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]),
        e = e || 0;
    var r, n, o = "#";
    for (n = 0; n < 3; n++) r = parseInt(t.substr(2 * n, 2), 16), o += ("00" + (r = Math.round(Math.min(Math.max(0, r +
        r * e), 255)).toString(16))).substr(r.length);
    return o;
};
export const getDistance = function (t, e, r, o) {
    var i = n(t),
        a = n(r),
        s = i - a,
        c = n(e) - n(o),
        u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(s / 2), 2) + Math.cos(i) * Math.cos(a) * Math.pow(Math.sin(c / 2),
            2)));
    return u *= 6378137, u = Math.round(1e4 * u) / 1e4, u = u < 1e3 ? parseInt(u) + "m" : (u / 1e3).toFixed(2) + "km";
};
export const settime = function (t) {
    for (var e = (t + "").split(""), r = 0; r < 13; r++) e[r] || (e[r] = "0");
    t = 1 * e.join("");
    var n = 864e5,
        o = new Date().getTime() - t;
    if (o < 0) return "不久前";
    var i = o / 2592e6,
        a = o / (7 * n),
        s = o / n,
        c = o / 36e5,
        u = o / 6e4,
        f = function (t) {
            return t < 10 ? "0" + t : t;
        };
    return a >= 1 ? function () {
        var e = new Date(t),
            r = new Date().getFullYear();
        return a >= 1 && r == e.getFullYear() ? f(e.getMonth() + 1) + "月" + f(e.getDate()) + "日" : e.getFullYear() + "年" +
            f(e.getMonth() + 1) + "月" + f(e.getDate()) + "日";
    }() : i >= 1 ? parseInt(i) + "月前" : a >= 1 ? parseInt(a) + "周前" : s >= 1 ? parseInt(s) + "天前" : c >= 1 ? parseInt(
        c) + "小时前" : u >= 1 ? parseInt(u) + "分钟前" : "刚刚";
};
export const DiffTime = function (t, e) {
    t.toString().length > 10 && (t = parseInt(t / 1e3), e = parseInt(e / 1e3));
    var r = 0,
        n = 0;
    t < e ? (r = t, n = e) : (r = e, n = t);
    var o, i, a, s, c, u, f = n - r;
    return o = Math.floor(f / 86400 / 365), f %= 31536e3, i = Math.floor(f / 86400 / 30),
        f %= 2592e3, a = Math.floor(f / 86400), f %= 86400, s = Math.floor(f / 3600), f %= 3600,
        c = Math.floor(f / 60), f %= 60, u = f, [o, i, a, s, c, u];
};
export const deepCopy = function (t) {
    return JSON.parse(JSON.stringify(t));
};
export const getUrlParams = function (t) {
    for (var e = t.indexOf("#") > -1 ? t.split("#")[0].split("?")[1] : t.split("?")[1], r = /&?([^&]+)/g, n = null,
        o = [], i = Object.create(null); n = r.exec(e);) {
        var a = n[1].split("=");
        i[a[0]] = a[1], o.push(a[0]);
    }
    return i.qarr = o, i;
};
export const groupArr = function (t) {
    var e = [],
        r = [];
    for (var n in t) n % 2 == 0 ? e.push(t[n]) : r.push(t[n]);
    return [e, r];
};
export const getOptions = function (t, e) {
    var r = e.key,
        n = e.q1,
        i = e.q2;
    return t[r] ? t[r] : t.scene ? decodeURIComponent(t.scene) : t.q ? getUrlParams(decodeURIComponent(t.q))[r] : i ||
        n;
};
export const throttle = function (t, time) {
    var r = 0,
        n = time || 300;
    return function () {
        var e = this,
            o = new Date();
        o - r > n && (t.call(e, arguments), r = o);
    };
};
export const debounce = function (t, e) {
    var r, n = e || 1e3;
    return function () {
        var e = arguments,
            o = this;
        clearTimeout(r), r = setTimeout(function () {
            t.call(o, e);
        }, n);
    };
};
export const hideNum = function (t) {
    return t.substr(0, Math.floor((t.length - 4) / 2)) + "****" + t.substr(Math.floor((t.length - 4) / 2) + 4);
};
// 获取路由
export const getRoute = function () {
    var t = getCurrentPages(),
        e = t[t.length - 1];
    return e.route || e.__route__;
}
// 设置头部
export const setNB = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "#fff",
        r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];

    // uni.setNavigationBarColor({
    //#ifdef MP-WEIXIN
    // frontColor: e.indexOf("#fff") > -1 || r ? "#000000" : "#ffffff",
    //#endif
    // backgroundColor: e
    // });
}
export const message = function (e, r, n) {
    //#ifdef MP-WEIXIN
    uni.showToast({
        icon: 1 == r ? "success" : 2 == r ? "loading" : 3 == r ? "none" : "",
        title: e,
        duration: n || 1e3
    });
    //#endif
    //#ifdef MP-ALIPAY
    my.showToast({
        type: 1 == r ? "success" : 2 == r ? "loading" : 3 == r ? "none" : "",
        content: e,
        duration: n || 1e3,
    })
    //#endif
}
export const modal = function (r, n) {
    return new Promise(function (t, e) {
        uni.showModal({
            title: n || "温馨提示",
            content: r,
            success: function (res) {
                if (res.confirm) {
                    t();
                } else if (res.cancel) {
                    e();
                }
            }
        });
    });
}
// 打电话j
export const makeTel = function (e) {
    uni.makePhoneCall({
        phoneNumber: e || "123456"
    });
}
// 设置头标题
export const setNT = function (e) {
    uni.setNavigationBarTitle({
        title: e
    });
}
// 获取页面
export const getPage = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2,
        e = getCurrentPages();
    return e[e.length - t];
}
import store from 'store';
// bus
import Vue from 'vue';
export const bus = new Vue();
// 加载中
export const showLoading = function (e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
    uni.getStorageSync("isShowLoading") && (uni.hideLoading(), uni.setStorageSync("isShowLoading", !1)),
        uni.showLoading({
            title: e || "加载中",
            mask: !!r,
            complete: function () {
                uni.setStorageSync("isShowLoading", !0);
            },
            fail: function () {
                uni.setStorageSync("isShowLoading", !1);
            }
        });
}
// 列表
export const sljz = {
    data: function () {
        return {
            dataList: [],
            bfList: [],
            isget: !1,
            mygd: !1
        }
    },
    onReachBottom: debounce((function (e) {
        !this.mygd && this.isget && (this.isget = !1, this.getList())
    }), 300)
}
// 复制
export const fz = function (e) {
    uni.setClipboardData({
        data: e,
        success: function () {
            message("复制成功", 1)
        }
    });
}


// 基础请求接口
import {
    API_URL
} from './api';
import {
    platform
} from './apiconfig';
export const request = function (r) {
    var n;
    r.mask && uni.showLoading({
        title: 1 == r.mask ? "加载中" : r.mask,
        mask: !0
    });

    n = getApp().globalData;
    r = r || {};
    return new Promise((resolve, reject) => {
        uni.request({
            url: API_URL(r.url),
            data: r.data ? r.data : {},
            method: r.method ? r.method : "GET",
            header: {
                "content-type": r.ct ? "application/json" : "application/x-www-form-urlencoded",
                appType: 'mini',
                uniacid: "9",
                module: "yb_wm",
                userId: uni.getStorageSync("userId")
            },
            success: (res) => {
                if (1 == res.data.code) {
                    resolve(res.data);
                } else if (2 == res.data.code) {
                    message(res.data.msg || res.data, 3, 2e3)
                    reject();
                }
            },
            fail: (res) => {
                reject(res)
            },
            complete: (res) => {
                r.mask && t.hideLoading()
            },
        })
    });
}
// 选择图片
export const choosePhoto = function (e) {
    return new Promise((resolve, reject) => {
        uni.chooseImage({
            count: +e.num || 9,
            sizeType: ["compressed"],
            success: function (t) {
                resolve(t.tempFilePaths)
            }
        })

    })
}
export const ckWz = function (e) {
    "weChat" != platform ? uni.openLocation({
        latitude: +e.lat,
        longitude: +e.lng,
        name: e.name,
        address: e.address
    }) : uni.openLocation(e);
}
// 获取定位
export const getDw = function () {
    var n, o, a;
    return new Promise((r, j) => {
        n = Date.parse(new Date()),
            o = uni.getStorageSync("firstdwtime"),
            a = getApp().globalData.gdlocation;
        if (a && n < o + 3e5) {
            r(a);
        }
        uni.getLocation({
            type: "gcj02",
            success: function (e) {
                r(e),
                    store.commit("setLatLng", {
                        lat: e.latitude,
                        lng: e.longitude
                    }),
                    getApp().globalData.gdlocation = e,
                    uni.setStorageSync("firstdwtime", n);
            },
            fail: function (e) {
                r({
                    latitude: "39.906930",
                    longitude: "116.397570"
                }),
                    store.commit("setLatLng", {
                        lat: "39.906930",
                        lng: "116.397570"
                    }),
                    getApp().globalData.gdlocation = {
                        latitude: "39.906930",
                        longitude: "116.397570"
                    },
                    e.errMsg.indexOf("auth deny") >= 0 ? g.default.message("访问位置被拒绝", 3) : uni.showModal({
                        title: "温馨提示",
                        showCancel: !1,
                        content: "定位失败,请检查GPS后,重新进入"
                    });
            }
        })
    });

}