import { colorToRGB, dateToTime, ldColor, timeToDate } from "./util";

export const utilMixins = {
    data: function () {
        return {
            dataList: [],
            bfList: [],
            isget: !1,
            mygd: !1
        };
    },
    onReachBottom() {
        !this.mygd && this.isget && (this.isget = !1, this.getList());
    },
    // onReachBottom: a.default.debounce(function (t) {
    // !this.mygd && this.isget && (this.isget = !1, this.getList());
    // }, 300),
    methods: {
        timeToDate: function (t, e) {
            return timeToDate(t, e);
        },
        dateToTime: function (t) {
            return dateToTime(t);
        },
        getSingleImg: function (t) {
            return t.indexOf("http") > -1 ? t : this.url + t;
        },
        snText: function (t, e) {
            return t && t.length > e ? t.substring(0, e) + "..." : t;
        },
        blxs: function (t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
            return Number(Number(t).toFixed(e));
        },
        payName: function (t) {
            var e = "";
            switch (+t) {
                case 1:
                    e = "微信支付";
                    break;

                case 2:
                    e = "支付宝支付";
                    break;

                case 3:
                    e = "百度支付";
                    break;

                case 5:
                    e = "余额支付";
            }
            return e;
        },
        cTR: function (t) {
            return colorToRGB(t);
        },
        cTRld: function (t, e) {
            return ldColor(t, e);
        }
    }
}