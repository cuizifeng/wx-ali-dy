export const BASEURL = process.env.NODE_ENV === 'development' ? 'https://yunbei.lianmengfu.net' : 'httpxxx';
export const uploadUrl = BASEURL + '/v1/upload/image';
export const RefreshUrl = '/v1/token/refresh'; //刷新token
export const loginUrl = '/v1/token/wxapp'; //登录url
export const PROJECT = 'MADEHOME_Wxapp';
export const platform = 'mini';
export const CODE = {
    code: 'code',
    auth: 'data',
    success: 1,
    token_expired: 10001,
    login: 10003,
    frequent: false,//频繁点击false关闭
}
export function middleWare(options) {
    // console.log(options.data, options.data.ct, "options.data , options.data.ct=====================================================================");

    options.header = {
        "content-type": options.data && options.data.ct ? "application/json" : "application/x-www-form-urlencoded",

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
        uniacid: uni.getStorageSync("uniacid") || 1,
        // uniacid: 9,

        module: "yb_wm",
        userId: uni.getStorageSync("userId")
    }
    try {
    } catch (error) {
    }
}

export default [
    { method: 'POST', url: 'channelApi/config/coordinate-to-add', ret: 'data' },
    { method: 'GET', url: 'channelApi/shop/lately-store', ret: 'data.data' },
    { method: 'POST', url: 'channelApi/cloud/visit-collect', ret: 'data' },
    { method: 'GET', url: 'channelApi/login/login', ret: 'data.data' },
    { method: 'GET', url: 'channelApi/config/config', ret: 'data.data' },
    { method: 'POST', url: 'channelApi/good/good-rank-type', ret: '' },
    { method: 'POST', url: 'channelApi/member/new', ret: 'data.data' },
    { method: 'GET', url: 'channelApi/member/window', ret: 'data.data' },
    { method: 'GET', url: 'channelApi/config/get-drag-row', ret: 'data.data' }, //获取自定义页面
    // 订 
    { method: 'POST', url: 'channelApi/order/order-list', ret: 'data.data' },
    { method: 'POST', url: 'channelApi/order/order-set', ret: 'data' },
    { method: 'POST', url: 'channelApi/in-store/my-fast-order', ret: 'data.data' },
    { method: 'post', url: 'channelApi/in-store/save-fast-order', ret: '' }, // 快餐点单
    //点单
    { method: 'GET', url: 'channelApi/good/get-product-list', ret: 'data.data' },
    { method: 'GET', url: 'channelApi/order/get-car-list', ret: 'data.data' },
    { method: 'GET', url: 'channelApi/shop/window-collection', ret: 'data.data' },
    { method: 'GET', url: 'channelApi/member/my-address', ret: 'data.data' },

    { method: 'POST', url: 'channelApi/shop/coordinate-to-add', ret: 'data' },
    { method: 'GET', url: 'channelApi/shop/store-list', ret: 'data.data' },
    { method: 'GET', url: 'channelApi/shop/collection-store-list', ret: 'data.data' },
    // 规格
    { method: 'get', url: 'channelApi/good/get-good-oper', ret: 'data.data' },  // 
    //保存购物车
    { method: 'post', url: 'channelApi/order/save-shop-car', ret: 'data' },
    { method: 'post', url: 'channelApi/order/del-car', ret: '' }, //
    { method: 'get', url: 'channelApi/coupon/available-coupon', ret: 'data.data' },  // 获取可用优惠券
    { method: 'get', url: 'channelApi/order/order-muster', ret: 'data.data' },  // 
    { method: 'get', url: 'channelApi/order/production-time', ret: 'data.data' },  // 
    { method: 'get', url: 'channelApi/member/receiving-address', ret: 'data.data', showMsg: false },
    { method: 'get', url: 'channelApi/order/store-time', ret: 'data.data' },  // 获取门店时间,预约时间
    // 获取绑定手机
    { method: 'get', url: 'channelApi/login/decrypt', ret: 'data.data' },  // 
    { method: 'post', url: 'channelApi/order/save-order', ret: '' }, // 保存订单
    { method: 'post', url: 'channelApi/order/order-info', ret: 'data' }, // 
    { method: 'get', url: 'channelApi/member/recharge-rule', ret: 'data.data' },
    { method: 'post', url: 'channelApi/pay/pay', ret: 'data' },
    { method: 'post', url: 'channelApi/login/save-user', ret: 'data', showMsg: false }, // 修改用户
    { method: 'post', url: 'channelApi/order/cancel-order', ret: '' }, // 取消订单
    { method: 'post', url: 'channelApi/order/reminder', ret: '' }, // 催单
    { method: 'post', url: 'channelApi/order/receiving', ret: '' },
    //
    { method: 'get', url: 'channelApi/in-store/my-fast-order', ret: 'data.data' },
    { method: 'post', url: 'channelApi/cashier/save-cashier', ret: 'data' },//111
    { method: 'get', url: 'channelApi/cashier/my-cashier', ret: 'data.data' },
    { method: 'get', url: 'channelApi/in-store/my-in-store-order', ret: 'data.data' },
    { method: 'get', url: 'channelApi/config/information', ret: 'data.data' },
    { method: 'get', url: 'channelApi/config/get-article-list', ret: 'data.data' },  // 文章列表
    { method: 'get', url: 'channelApi/good/good-rank-type', ret: 'data.data' },
    { method: 'get', url: 'channelApi/shop/get-city', ret: 'data.data' },
    { method: 'post', url: 'channelApi/coupon/receive-coupon', ret: '' },
    { method: 'get', url: 'channelApi/shop/receive-window-coupon', ret: 'data.data' },
    { method: 'get', url: 'channelApi/member/receive-issue-coupons', ret: 'data.data' },
    { method: 'get', url: 'channelApi/config/template-list', ret: 'data.data' },
    // 当面付  用户优惠券领取个数 /channelApi/shop/get-coupon
    { method: 'get', url: 'channelApi/shop/get-coupon', ret: 'data.data' },

    { method: 'get', url: 'channelApi/coupon/coupon-list', ret: 'data.data' },//优惠券
    { method: 'get', url: 'channelApi/coupon/coupon-info', ret: 'data.data' },//优惠券
    { method: 'get', url: 'channelApi/coupon/my-coupon', ret: 'data.data' },//优惠券


    { method: 'post', url: 'channelApi/in-store/refund-fast', ret: '' },

    { method: 'post', url: 'channelApi/member/save-user-address', ret: '' },
    { method: 'post', url: 'channelApi/member/del-user-address', ret: '' },
    { method: 'get', url: 'channelApi/integral-shop/goods-info', ret: 'data.data' },
    { method: 'post', url: 'channelApi/member/exchange-code', ret: '' },
    { method: 'get', url: 'channelApi/integral-shop/self-list', ret: 'data.data' },
    { method: 'post', url: 'channelApi/integral-shop/save-integral-order', ret: '' },// 
    { method: 'get', url: 'channelApi/integral-shop/my-integral-order', ret: 'data.data' },  // 
    { method: 'get', url: 'channelApi/member/integral-details', ret: 'data.data' },  // 
    { method: 'get', url: 'channelApi/integral-shop/goods-list', ret: 'data.data' },  // 
    { method: 'post', url: 'channelApi/integral-shop/modify-order', ret: '' },
    { method: 'post', url: 'channelApi/integral-shop/integral-order-info', ret: '' }, //
    { method: 'get', url: 'channelApi/integral-shop/goods-type-list', ret: 'data.data' },
    { method: 'get', url: 'channelApi/member/get-helps-list', ret: 'data.data' },  // 
    { method: 'get', url: 'channelApi/member/get-helps-detail', ret: 'data.data' },  // 
    { method: 'get', url: 'channelApi/sign-in/my-sign-record', ret: 'data.data' },  // 
    { method: 'get', url: 'channelApi/roll-bag/order-list', ret: 'data.data' },  // 
    { method: 'post', url: 'channelApi/roll-bag/roll-bag-order', ret: '' },
    { method: 'get', url: 'channelApi/roll-bag/roll-bag-info', ret: 'data.data' },
    { method: 'get', url: 'channelApi/in-store/get-code-info', ret: 'data.data' },
    { method: 'get', url: 'channelApi/member/balance-details', ret: 'data.data' },
    { method: 'get', url: 'channelApi/order/pay-politely', ret: 'data.data' },
    { method: 'get', url: 'channelApi/config/information-info', ret: 'data.data' },
    { method: 'post', url: 'channelApi/vip-card/receive-card', ret: '' },
    { method: 'get', url: 'channelApi/member/growth-details', ret: 'data.data' },
    { method: 'get', url: 'channelApi/config/get-mini-live', ret: 'data.data' },
    { method: 'get', url: 'channelApi/in-store/fast-order-info', ret: 'data.data' },
    { method: 'get', url: 'channelApi/sign-in/week-sign-record', ret: 'data.data' },
    { method: 'get', url: 'channelApi/order/meal-code', ret: 'data.data' },
    { method: 'post', url: 'channelApi/sign-in/my-sign', ret: 'data' },
    { method: 'post', url: 'channelApi/sign-in/sign', ret: 'data' },
    { method: 'get', url: 'channelApi/vip-card/level-list', ret: 'data.data' },
    { method: 'get', url: 'channelApi/member/collection', ret: 'data.data' },
    { method: 'get', url: 'channelApi/in-store/in-store-order-info', ret: 'data.data' },
    { method: 'post', url: 'channelApi/member/recharge-order', ret: 'data' },
    { method: 'post', url: 'channelApi/member/save-collection', ret: '' },
    { method: 'post', url: 'channelApi/good/get-good-detail', ret: 'data.data' },
    { method: 'post', url: 'channelApi/config/get-code', ret: 'data.data' },
    { method: 'post', url: 'channelApi/in-store/add-food', ret: '' },
    { method: 'post', url: 'channelApi/in-store/shop-car-require', ret: '' }, // 
    { method: 'post', url: 'channelApi/in-store/save-in-store-order', ret: '' },
    { method: 'post', url: 'channelApi/in-store/table-info', ret: 'data.data' },
    { method: 'post', url: 'channelApi/shop/search-store', ret: 'data' },
    { method: 'post', url: 'channelApi/login/decrypt', ret: '' },
    { method: 'post', url: 'channelApi//WxUpload', ret: '' },
    { method: 'post', url: 'channelApi/in-store/close-in-order', ret: '' },
    { method: 'get', url: 'channelApi/good/select-good', ret: 'data.data' },
    { method: 'post', url: 'channelApi/member/member-order', ret: 'data' },
    { method: 'post', url: 'channelApi/sound/store', ret: 'data' },
    { method: 'post', url: 'channelApi/pay-notice/wei', ret: '' },
    { method: 'post', url: 'channelApi/member/give', ret: 'data.data' },//余额转赠
    { method: 'post', url: 'channelApi/member/withdrawal-list', ret: 'data.data' },
    { method: 'post', url: 'channelApi/code/list', ret: 'data.data' },//奖励金额
    { method: 'post', url: 'channelApi/cashier/cashier-order-info', ret: 'data.data' }
];
