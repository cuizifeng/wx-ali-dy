export const setType = {
    //#ifdef MP-WEIXIN
    TYPE: 'mini',
    //#endif
    //#ifdef MP-ALIPAY
    TYPE: 'ali'
    //#endif
}
export const getCode = function () {
    return new Promise((resolve, reject) => {
        uni.getProvider({
            service: 'oauth',
            success: function (res) {
                uni.login({
                    provider: res.provider.join(),
                    success: (res1) => {
                        resolve(res1.code)
                    }
                })
            }
        });
    })
}


// 获取appid
export const getAppId = function () {
    return new Promise((resolve, reject) => {
        switch (setType.TYPE) {
            case 'mini':
                const wxAppId = uni.getAccountInfoSync();
                resolve({ appid: wxAppId.miniProgram.appId })
                break;
            case 'ali':
                const appIdRes = my.getAppIdSync();
                resolve({ appid: appIdRes.appId })
                break;
            default:
                break;
        }
    })
}