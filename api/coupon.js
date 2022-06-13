import request from "@/utils/request.js";


//支付-领取优惠券
export function receiveWindowCoupon(data) {
    return request.get("channelApi/shop/receive-window-coupon", data);
}