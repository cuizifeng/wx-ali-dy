// 时间格式
export function parseTime(time, cFormat) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string')) {
            if ((/^[0-9]+$/.test(time))) {
                // support "1548221490638"
                time = parseInt(time)
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                time = time.replace(new RegExp(/-/gm), '/')
            }
        }

        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        return value.toString().padStart(2, '0')
    })
    return time_str
}
// 获取指定的参数
export function getUrlKey(name) { //获取url 参数
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1]
        .replace(/\+/g, '%20')) || null;
};
// 获取code值
export function wxAuthorize(cb = Function) {
    let link = window.location.href;
    let code = getUrlKey('code')
    // 已经授权登录过的就不用再授权了
    if (store.state.token) return;
    // 如果拿到code，调用授权接口，没有拿到就跳转微信授权链接获取
    if (code) {
        // api.wxAuth(params.code); // 调用后台接口，授权
        cb(code)
    } else {
        let appid = 'wxa0baea5091cd7b0f';
        let uri = encodeURIComponent(link);
        let authURL =
            `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
        window.location.href = authURL;
    }
}
// 是否是微信浏览器
export function isWexinPlat() {
    let ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
}
// 动态计算图片设置高度
export function imageLoad(t) {
    var e = t.detail.height,
        a = t.detail.width,
        i = Math.floor(750 * e / a);
    if (e == a) return 750;
    return i
};


/**
    * 订阅通知,目前仅小程序
    */
export const subMessage = function (temlIds, callback) {
    // let self = this;
    // #ifdef  MP-WEIXIN
    //小程序订阅消息
    // const version = wx.getSystemInfoSync().SDKVersion;
    console.log(temlIds, "=------------------------------temlIds");
    if (temlIds && temlIds.length != 0) {
        wx.requestSubscribeMessage({
            tmplIds: temlIds,
            success(res) {
                console.log(res, "=======");
            },
            fail(res1) {
                console.log(res1, "=======");
            },
            complete(res) {
                callback();
            },
        });
    } else {
        callback();
    }
    // #endif
    // #ifndef MP-WEIXIN
    callback();
    // #endif
};