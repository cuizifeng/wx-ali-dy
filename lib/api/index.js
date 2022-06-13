import Vue from 'vue'
import request from './util';
import fns from '@/common/apiconfig';
import { BASEURL, CODE, loginUrl, RefreshUrl } from '@/common/apiconfig';
import { Token } from '../utils/storage';
import { toast } from '../utils/fn';

const api = {};
var pathStack = []; //存放接口请求的参数,用于禁于频繁点击
fns.forEach(e => {
    var subs = e.url.split('/');
    var url = `${BASEURL}/${e.url}`;
    api[`${subs[1]}_${subs[2].replace(/\-/g, '__')}`] = (param = {}, showMsg = true) => new Promise((resolve, reject) => {
        //序列化参数
        if (e.showMsg !== undefined) showMsg = e.showMsg;
        var stringifyParams = JSON.stringify({ param, url });
        var release = () => setTimeout(_ => pathStack = pathStack.filter(i => i !== stringifyParams), 500);
        // 小程序登录
        if (pathStack.includes(stringifyParams) && CODE.frequent) {
            reject('频繁点击')
        } else {
            pathStack.push(stringifyParams); // 存放请求参数
            // 判断token 是否过期
            var req = ({ url, param }) => {
                var wxLogin = () => {
                    // #ifdef MP
                    uni.login({
                        provider: "weixin",
                        success(l) {
                            // console.log(l, "222")
                            let { code } = l;
                            request({ url: BASEURL + loginUrl, method: 'post', data: { code } }).then(e => {
                                if (e[CODE.code] == CODE.success) {
                                    if (e[CODE.auth]) Token.set(e[CODE.auth]);
                                    req({ url, param });
                                } else if (e[CODE.code] == CODE.token_expired) {
                                    getNewToken();
                                } else {
                                    toast(e.msg || e);
                                }
                            })
                        },
                    });
                    // #endif
                };

                // 刷新token
                var NUM = 0;
                var getNewToken = () => {
                    NUM++;
                    if (NUM > 3) { toast('令牌获取错误'); return; }
                    let t = Token.get();
                    if (t && t.refresh_token) {
                        request({ url: BASEURL + RefreshUrl, method: 'post', data: { refresh_token: t.refresh_token } }).then(e => {
                            if (e[CODE.code] == CODE.success) {
                                if (e[CODE.auth]) Token.set(e[CODE.auth]);
                                req({ url, method: e.method, param });
                            } else if (e[CODE.code] == CODE.login) {
                                wxLogin();
                            } else {
                                toast(e.msg || e);
                            }
                        })
                    } else {
                        wxLogin();
                    }
                }

                return request({
                    url,
                    data: param,
                    method: param.method || e.method || 'post'
                }).then(data => {
                    release();
                    if (data.auth) {
                        Token.set(data.auth)
                        delete (data['auth']);
                    }
                    if (data[CODE.code] == CODE.success) {
                        switch (e.ret) {
                            case 'data':
                                resolve(data);
                                break;
                            case 'data.data':
                                // console.log(`${url}`, data.data);
                                resolve(data.data);
                                break;
                            default:
                                // showMsg && toast(data.msg);
                                setTimeout(() => resolve(data), 1500);
                                break;
                        }
                    } else if (data[CODE.code] == CODE.token_expired) {
                        showMsg && toast(data.msg);
                        // #ifndef MP-WEIXIN
                        uni.navigateTo({
                            url: '/pages/login/login'
                        });
                        // #endif
                        getNewToken();
                    } else if (data[CODE.code] == CODE.login) {
                        showMsg && toast(data.msg);
                        setTimeout(() => {
                            // #ifndef MP-WEIXIN
                            uni.navigateTo({
                                url: '/pages/login/login'
                            });
                            // #endif
                        }, 1500);
                        wxLogin();
                    } else {
                        showMsg && toast(data.msg);
                        setTimeout(() => reject(data), 1500);
                    }
                }).catch(e => {
                    release();
                    showMsg && toast(e.msg || e);
                    setTimeout(() => reject(e), 1500);
                })
            }
        }
        req({ url, param });
    });

});


export default api;
// console.log('api', api);
Vue.prototype.$api = api;