import request from "@/utils/request.js";


//商城列表 & 商城推荐
export function goodsList(data) {
    return request.get("channelApi/integral-shop/goods-list", data);
}
