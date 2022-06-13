import Vue from 'vue';
import api from '../api';
import { parseTime } from './utils';
export const toast = (title, duration = 1500) => {
    if (typeof title !== 'string') title = JSON.stringify(title);
    //#ifdef MP-ALIPAY
    uni.showToast({
        icon: "none",
        title,
        duration
    });
    //#endif
    //#ifdef MP-ALIPAY
    my.showToast({
        type: "none",
        content: title,
        duration,
    })
    //#endif
}



Vue.prototype.$toast = toast;
Vue.filter('formatTime', function (value, fmt) {
    return parseTime(value, fmt);
})

//上页面
function prePage() {
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    // #ifdef H5
    return prePage;
    // #endif
    return prePage.$vm;
}
Vue.prototype.vm = prePage;
// 确认框
export const openConfirm = (content, cb = Function, cancel = Function) => {
    uni.showModal({
        title: '提示',
        content,
        success: (res) => {
            if (res.confirm) {
                cb()
            } else if (res.cancel) {
                cancel();
            }
        }
    });
}

Vue.prototype.$openConfirm = openConfirm;
var timer;
Vue.prototype.debounce = function (method, delay) {
    if (timer) {
        return;
    }
    method();
    timer = setTimeout(function () {
        timer = undefined;
    }, delay);
}
// 去除字符串头尾空格符
String.prototype.trim = function () {
    return this.replace(/^(\s|\u00A0)+/, "").replace(/(\s|\u00A0)+$/, "");
};
/**
 * 金额格式化
 */
export const moneyFormat = function (money, currency, decimals) {
    const digitsRE = /(\d{3})(?=\d)/g
    money = parseFloat(money)
    if (!isFinite(money) || (!money && money !== 0)) return ''
    currency = currency != null ? currency : '￥'
    decimals = decimals != null ? decimals : 2
    var stringified = Math.abs(money).toFixed(decimals)
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
    var i = _int.length % 3
    var head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : ''
    var _float = decimals ? stringified.slice(-1 - decimals) : ''
    if (_float === '.00') {
        _float = '';
    }
    var sign = money < 0 ? '-' : ''
    return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
}
Vue.prototype.moneyFormat = moneyFormat;
//日期封装
Date.prototype.format = function (fmt = 'yyyy-MM-dd') {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
// 全局混入
Vue.mixin({
    data() {
        return {
            userInfo: {},
        }
    },
    onLoad() {
        // 多值传参
        var moreParams = uni.getStorageSync('moreParams');
        if (moreParams) {
            var p = JSON.parse(moreParams);
            // console.log('more', p);
            uni.removeStorage({
                key: 'moreParams'
            })
            Object.keys(p).map(i => {
                this[i] = p[i];
            })
        }
    },
    onShow() {
        // 回退传参
        var params = uni.getStorageSync('backParams');
        if (params) {
            var p = JSON.parse(params);
            uni.removeStorage({
                key: 'backParams'
            })
            // console.log('params', params);
            Object.keys(p).map(i => {
                this[i] = p[i];
            })
        }
    },
    methods: {
        /**
         * 
         * @param {*} type 
         * @param {*} url 
         * @param {*} param 
         * @param {*} events navigateTo接收回调
         * @param {*} more 多值传参
         */
        goRoute(type, url, param, more, delta = 1) {
            console.log('param: ', param);
            if (param == undefined) param = ''
            var createURL = function (path, obj) {
                if (Object.prototype.toString.call(param) === '[object Object]') {
                    var i, url = '';
                    for (i in obj) url += '&' + i + '=' + obj[i];
                    return path + url.replace(/./, '?');
                }
                return path + param;
            }
            var newUrl = createURL(url, param);
            if (more) uni.setStorage({
                key: 'moreParams',
                data: JSON.stringify(more)
            });
            // console.log('111more', more);
            switch (type) {
                case 'nt':
                    uni.navigateTo({
                        url: newUrl,
                    });
                    break;
                case 'rt':
                    uni.redirectTo({
                        url: newUrl
                    });
                    break;
                case 'rl':
                    uni.reLaunch({
                        url: newUrl
                    });
                    break;
                case 'st':
                    if (param) uni.setStorage({
                        key: 'backParams',
                        data: JSON.stringify(param)
                    });
                    uni.switchTab({
                        url: newUrl
                    })
                    break;
                case 'nb':
                    if (param) uni.setStorage({
                        key: 'backParams',
                        data: JSON.stringify(param)
                    });
                    uni.navigateBack({
                        delta
                    });
                    break;
                default:
                    break;
            }
        },
    }
})
// 授权获取位置
export function getAddress() {
    const that = this;
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(res) {
                if (
                    res.authSetting["scope.userLocation"] != undefined &&
                    res.authSetting["scope.userLocation"] != true
                ) {
                    wx.showModal({
                        title: "请求授权当前位置",
                        content: "需要获取您的地理位置，请确认授权",
                        success: function (showmodal) {
                            if (showmodal.cancel) {
                                wx.showToast({
                                    title: "拒绝授权",
                                    icon: "none",
                                    duration: 1000
                                });
                            } else if (showmodal.confirm) {
                                wx.openSetting({
                                    success(res) {
                                        if (opensetting.authSetting["scope.userLocation"] == true) {
                                            wx.showToast({
                                                title: "授权成功",
                                                icon: "success",
                                                duration: 1000
                                            });
                                        } else {
                                            wx.showToast({
                                                title: "授权失败",
                                                icon: "none",
                                                duration: 1000
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    wx.getLocation({
                        type: "wgs84",
                        success: (locationD) => {
                            api.location_getLocationByCoordinate({
                                coordX: locationD.latitude,
                                coordY: locationD.longitude
                            }).then(data => {
                                // let obj = {};
                                // obj.item1 = that.cityTransform(res.data.areaId);
                                // obj.item2 = [res.data.parentId, res.data.areaId];
                                resolve(data);
                            })
                            // flyio.post("/Edison/common/getLocationByCoordinate", {
                            // 	coordX: locationD.latitude,
                            // 	coordY: locationD.longitude
                            // },
                            // 	false
                            // )
                            // 	.then(res => {
                            // 		let obj = {};
                            // 		obj.item1 = that.cityTransform(res.data.areaId);
                            // 		obj.item2 = [res.data.parentId, res.data.areaId];
                            // 		resolve(obj);
                            // 	});
                        }
                    });
                }
            }
        });
    })
};
