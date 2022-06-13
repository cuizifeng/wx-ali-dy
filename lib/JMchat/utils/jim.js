const JMessage = require('./jmessage-wxapplet-sdk-1.4.3.min.js')
// const JMessage = require('./jmessage-sdk-web.2.6.0.min')
import config from './config.js'
import utils from './utils.js'
import $errorCode from './errorCode.js'
import md5 from './md5.js';

// 文档链接  https://docs.jiguang.cn/jmessage/client/im_sdk_js_v2/

const JIM = new JMessage({
    debug: false
});

const paramsInit = {
    "appkey": config.jimAppkey,
    "flag": 1
}
const key = config.jimMasterSecret

/*
* 参数后面带有  REQUIRE 为必传参数
* 用户名和密码皆为用户的 userId
*/
const jpushIM = {
    /*
    * 初始化  调用其他api都需要先初始化
    * @param{ params.appkey } REQUIRE 开发者在极光平台注册的IM应用 appkey
    * @param{ params.random_str } REQUIRE 随机字符串
    * @param{ params.timestamp } REQUIRE 当初时间戳
    * @param{ params.signature } REQUIRE 签名 算法如下 signature = md5(appkey={appkey}&timestamp={timestamp}&random_str={random_str}&key={secret}) 其中 secret 为开发者在极光平台注册的 IM 应用 masterSecret。
    * @param{ params.flag } 是否启用消息记录漫游，默认 0 否，1 是
    */
    init() {
        var timestamp = +new Date();
        paramsInit.random_str = Math.random().toString(16).slice(-20)
        paramsInit.timestamp = timestamp;
        var signature = md5(
            `appkey=${paramsInit.appkey}&timestamp=${paramsInit.timestamp}&random_str=${paramsInit.random_str}&key=${key}`
        )
        paramsInit.signature = signature;

        return myPromise('init', paramsInit)
    },
    /*
    * 初始化状态
    * @return{ true,false } 是否初始化
    */
    isInit() {
        return JIM.isInit()
    },
    /*
    * 登录状态
    * @return{ true,false } 是否登录
    */
    isLogin() {
        return JIM.isLogin()
    },
    /*
    * 连接状态
    * @return{ true,false } 是否连接
    */
    isConnect() {
        return myBoolean('isConnect')
    },
    /*
    * 断线监听
    * @param{ callback } 回调函数
    */
    onDisconnect(callback) {
        JIM.onDisconnect(() => {
            callback && callback()
        });
    },
    /*
    * 注册
    * @param{ params.username } REQUIRE 用户名
    * @param{ params.password } REQUIRE 密码
    * @param{ params.nickname } REQUIRE 昵称
    * 其他字段和  updateSelfInfo  一致
    */
    register(params) {
        return myPromise('register', params)
    },
    /*
    * 登录
    * @param{ params.username } 用户名
    * @param{ params.password } 密码
    */
    login(params) {
        return myPromise('login', params)
    },
    /*
    * 登出
    * @param{ callback } 回调函数
    */
    loginOut(callback) {
        JIM.loginOut(() => {
            callback && callback()
        });
    },
    /*
    * 获取用户信息
    * @param{ params.username } 用户登陆名称
    * @param{ params.appkey } 跨应用时需要传
    */
    getUserInfo(params) {
        return myPromise('getUserInfo', params)
    },
    /*
    * 更新个人头像
    * @param{ params.avatar } 头像头像图片的 DataForm 对象
    */
    updateSelfAvatar(params) {
        return myPromise('updateSelfAvatar', params)
    },
    /*
    * 获取资源
    * @param{ params.avatar } 头像头像图片的 DataForm 对象
    */
    getResource(params) {
        return myPromise('getResource', params)
    },
    /*
    * 更新密码
    * @param{ params.old_pwd } 旧的密码
    * @param{ params.new_pwd } 新的密码
    * @param{ params.is_md5 } 是否md5加密
    */
    updateSelfPwd(params) {
        return myPromise('updateSelfPwd', params)
    },
    /*
    * 更新个人信息
    * @param{ params.nickname } 昵称
    * @param{ params.birthday } 生日
    * @param{ params.signature } 签名
    * @param{ params.gender } 性别，0 未知, 1 男，2 女
    * @param{ params.region } 地区
    * @param{ params.address } 地址
    */
    updateSelfInfo(params) {
        return myPromise('updateSelfInfo', params)
    },
    /*
    * 获取会话列表
    */
    getConversation() {
        return myPromise('getConversation')
    },
    /*
    * 聊天消息实时监听
    * @param{ callback } 回调函数
    */
    onMsgReceive(callback) {
        JIM.onMsgReceive((res) => {
            callback && callback(res)
        });
    },

    /*
    * 离线消息同步监听
    * @param{ callback } 回调函数
    */
    onSyncConversation() {
        return new Promise((resolve, reject) => {
            JIM.onSyncConversation((res) => {
                resolve(res)
            });
            setTimeout(() => {
                resolve({})
            }, 1000)
        })

    },
    /*
    * 重置会话未读数
    * @param{ params.gid } 群 id,群聊会话有效
    * @param{ params.username } 用户username,单聊会话有效
    * @param{ params.appkey } 用户appkey,单聊会话有效
    */
    resetUnreadCount(params) {
        JIM.resetUnreadCount(params);
    },
    updateConversation(params) {
        JIM.updateConversation(params);
    },
    /*
    * 发送单聊文本
    * @param{ params.target_username } REQUIRE 接收消息者 username
    * @param{ params.content } REQUIRE 消息文本
    * @param{ params.appkey } REQUIRE 跨应用查询时必填，目标应用的 appkey
    * @param{ params.no_offline } 消息离线控制标志，false，默认值，保存离线消息；true，不保存离线消息
    * @param{ params.no_notification } 状态栏显示消息标志，false，默认值，状态栏显示消息；true，状态栏不显示消息
    * @param{ params.custom_notification } 通知栏参数
    * @param{ params.need_receipt } 是否需要已读回执，需要:true 不需要:false
    */
    sendSingleMsg(params) {
        return myPromise('sendSingleMsg', params)
    },
    onSyncMsgReceipt(callback) {
        JIM.onMutiUnreadMsgUpdate(data => {
            callback && callback(data)
        })
    },
    onMutiUnreadMsgUpdate(callback) {
        JIM.onMutiUnreadMsgUpdate(data => {
            callback && callback(data)
        })
    },
    onSyncEvent(callback) {
        JIM.onSyncEvent(data => {
            callback && callback(data)
        })
    },
    getUnreadMsgCnt(params) {
        return JIM.getUnreadMsgCnt(params)
    }
}

function myPromise(key, params) {
    return new Promise((resolve, reject) => {
        try {
            JIM[key](params)
                .onSuccess(function (data) {
                    // console.log('%c '+JSON.stringify(data) + '-----' + key,'color:blue;')
                    resolve(data)
                }).onFail(function (data) {
                    // console.log('%c '+JSON.stringify(data),'color:red;')
                    reject(data)
                    if (data.error) {
                        toastError(data.error)
                    } else {
                        toastError(data)
                    }
                }).onTimeout(function (data) {
                    reject(data)
                    if (data.error) {
                        toastError(data.error)
                    } else {
                        toastError(data)
                    }
                })
        } catch (e) {
            //utils.$toast('状态连接有误,请刷新页面重新操作')
        }

    })
    //    .catch(err => {
    // 	console.log('%c '+JSON.stringify(err),'color:red;')
    // })
}

function myBoolean(key) {
    return JIM[key]()
}
function toastError(res) {
    let msg = '错误码:' + res.code + ';';
    if (res.code && res.code !== 882002) {
        msg += $errorCode[res.code] || '';
    } else {
        msg += res.message;
    }
    // utils.$toast(msg)////////////////////////////////
}


export default jpushIM
