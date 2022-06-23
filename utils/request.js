/*
 * @Descripttion:
 * @version:
 * @Author: cuizifeng
 * @Date: 2021-08-10 10:43:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-23 18:01:34
 * 发送请求
 */
const HTTP_REQUEST_URL = 'https://yunbei.lianmengfu.net/';

function baseRequest(url, method, data) {
    return new Promise((reslove, reject) => {
        uni.request({
            url: HTTP_REQUEST_URL + url,
            method: method || 'GET',
            header: middleWare() || {},
            data: data || {},
            success: (res) => {
                reslove(res.data);
            },
        })
    });
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
    request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});

export function middleWare() {
    return {
        "content-type": "application/x-www-form-urlencoded",

        // #ifdef MP-WEIXIN
        appType: 'mini',
        // #endif

        // #ifdef MP-ALIPAY
        appType: 'ali',
        // #endif

        // #ifdef MP-TOUTIAO
        appType: 'toutiao',
        // #endif

        // 修改获取uniacid
        uniacid: uni.getStorageSync("uniacid"),
        // uniacid: 9,

        module: "yb_wm",
        userId: uni.getStorageSync("userId")
    }
}

export default request;
