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
        switch (setType.TYPE) {
            case 'mini':
                uni.login({
                    success: (res) => {
                        resolve(res.code)
                    }
                })
                break;
            case 'ali':
                my.getAuthCode({
                    scopes: 'auth_base', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
                    success: (auth) => {
                        resolve(auth.authCode)
                    },
                });
                break;
            default:
                break;
        }
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