import api from '@/lib/api';
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
                        login(res).then(ev => {
                            resolve(ev)
                        })
                    }
                })
                break;
            case 'ali':
                my.getAuthCode({
                    scopes: 'auth_user',
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

function login(event) {
    return new Promise(function (resolve, reject) {
        api.login_login({
            code: event.code,
        }).then(res => {
            uni.setStorageSync('userId', res.userId)
            getApp().globalData.session_key = res.session_key;
            resolve(res)
        })
    })

}