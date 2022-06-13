const {
    default: store
} = require("store");
const {
    message
} = require("./util");
export const getLocation = function (cb) {
    var n = Date.parse(new Date());
    uni.getLocation(
        {
            type: "gcj02",
            success: function (e) {
                store.commit("setLatLng", {
                    lat: e.latitude,
                    lng: e.longitude
                }), getApp().globalData.gdlocation = e, uni.setStorageSync("firstdwtime", n);
            },
            fail: function (e) {
                cb({
                    latitude: "39.906930",
                    longitude: "116.397570"
                }),
                    store.commit("setLatLng", {
                        lat: "39.906930",
                        lng: "116.397570"
                    }), getApp().globalData.gdlocation = {
                        latitude: "39.906930",
                        longitude: "116.397570"
                    }, e.errMsg.indexOf("auth deny") >= 0 ? message("访问位置被拒绝", 3) : uni.showModal({
                        title: "温馨提示",
                        showCancel: !1,
                        content: "定位失败,请检查GPS后,重新进入"
                    });
            }
        }
    );

}