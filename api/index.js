import request from "@/utils/request.js";


// 首页轮播图
// export function getDragRow(data) {
//     return request.get("channelApi/config/get-drag-row", data);
// }
// 首页商品列表
export function goodRankType(data) {
    return request.post("channelApi/good/good-rank-type", data);
}

//首页轮播图
export function pageImage(data) {
    return request.get("channelApi/member/page-images", data);
}

//根据Appid获取uniacid
export function uniacidIndex(data) {
    return request.get("index/uniacid/index", data);
}
