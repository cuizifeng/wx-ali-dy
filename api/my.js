import request from "@/utils/request.js";



//老带新
//邀请收益
export function index(data) {
    return request.post("channelApi/old-with-new/index", data);
}

//获取时间段 || 榜单
export function rank(data) {
    return request.post("channelApi/old-with-new/rank", data);
}

//提现记录
export function withdrawalList(data) {
    return request.post("channelApi/member/withdrawal-list", data);
}

//提现页面
export function config(data) {
    return request.post("channelApi/config/config", data);
}

//提现接口
export function bonusWithdrawal(data) {
    return request.post("channelApi/member/bonus-withdrawal", data);
}

//老带新分享
export function invitationInsert(data) {
    return request.post("channelApi/old-with-new/invitation-insert", data);
}

//分销商
//创建分销商
export function applyDistribution(data) {
    return request.post("channelApi/distribution/apply-distribution", data);
}

export function applyDistributionGet(data) {
    return request.get("channelApi/distribution/apply-distribution", data);
}

//分销商页面
export function distribution(data) {
    return request.post("channelApi/distribution/index", data);
}

//销商订单
export function distributionOrder(data) {
    return request.post("channelApi/distribution/distribution-order", data);
}


//判断是否是分销商
export function isDistribution(data) {
    return request.post("channelApi/distribution/is-distribution", data);
}

//我的团队
export function getOffline(data) {
    return request.post("channelApi/distribution/get-offline", data);
}

//获取太阳码
export function getCode(data) {
    return request.post("channelApi/config/get-code", data);
}

//余额转赠
export function memberGive(data) {
    return request.post("channelApi/member/give", data);
}


