import { Tips } from "@/utils/miniUtils.js";
export const setRequestPayment = function (data, i, type) {
    uni.getProvider({
        service: 'payment',
        success: function (res) {
            uni.requestPayment({
                provider: res.provider.join(),
                // #ifdef MP-WEIXIN
                ...data,
                //   #endif

                // #ifdef MP-ALIPAY
                tradeNO: data.alipay_trade_create_response.trade_no,
                // #endif
                success: function (res1) {
                    // #ifdef MP-WEIXIN
                    Tips({ title: '支付成功', type: 5, url: "/pages/individualAccount/paymentSuccessful/index?orderId=" + i.orderId + "&payType=" + '' + "&orderType=" + i.orderType })
                    //   #endif

                    // #ifdef MP-ALIPAY
                    if (res1.resultCode == 9000) {
                        return Tips({ title: '支付成功', type: 5, url: "/pages/individualAccount/paymentSuccessful/index?orderId=" + i.orderId + "&payType=" + '' + "&orderType=" + i.orderType })
                    } else {
                        if (type === 'Collection') {
                            Tips({ title: res1.memo, type: 5, url: "/pages/tabbar/index/index" })
                        } else {
                            return Tips({ title: res1.memo, type: 5, url: "/yb_wm/index/order-index" })
                        }
                    }
                    // #endif
                },
                fail: () => {
                    // #ifdef MP-WEIXIN
                    if (type === 'Collection') {
                        return Tips({ title: '取消支付', type: 5, url: "/pages/tabbar/index/index" })
                    } else {
                        return Tips({ title: '取消支付', type: 5, url: "/yb_wm/index/order-index" })
                    }

                    //   #endif
                },
                complete: function () {
                    console.log('支付完');
                }
            })
        }
    });
}