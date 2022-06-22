import api from '@/lib/api';
import {
    getSb,
    setNB
} from 'common/util';
import {
    toast
} from 'lib/utils/fn';
import { getCode } from "@/utils/getCode.js";
export default {
    state: {
        dndcConfig: {},
        ldxConfig: {},
        smConfig: {},
        addInfo: null,
        cityInfo: {},
        latLng: {},
        myAdData: [],
        mySwitch: {},
        fxsInfo: {},

        //
        system: {
            custom: {
                live: "",
                takeOut: "",
                integral: "",
                balance: "",
                informationTitle: "",
                hbfh: "",
                hbmc: "",
                inStore: ""
            },
            powerList: {}
        },
        user: {},
        isLogin: !1,
        isIpx: !1,
        carList: [],
        scarList: {
            out: {
                data: []
            },
            fast: {
                data: []
            },
            ins: {
                data: []
            }
        },
        sjxx: {},
        layout: {
            index: {},
            personalcenter: {},
            custom: {}
        },
        config: {
            showTips: uni.getStorageSync("tips"),
            hasKp: !1,
            enterset: {},
            orderset: {
                outName: ""
            },
            citys: {
                sArr: []
            },
            isshopdl: !1,
            storeInfo: {},
            payConfig: {},
            recharge: {},
            vipset: {}
        }
    },
    mutations: {
        setDndcConfig: function (t, e) {
            t.dndcConfig = e;
        },
        setLdxConfig: function (t, e) {
            t.ldxConfig = e || {};
        },
        setSmConfig: function (t, e) {
            t.smConfig = e;
        },
        setAddInfo: function (t, e) {
            t.addInfo = e;
        },
        setCityInfo: function (t, e) {
            t.cityInfo = e;
        },
        setLatLng: function (t, e) {
            t.latLng = e;
        },
        setMyAdData: function (t, e) {
            t.myAdData = e;
        },
        setMySwitch: function (t, e) {
            t.mySwitch = e;
        },
        setFsxInfo: function (t, e) {
            t.fxsInfo = e;
        },
        // 

        setUser: function (e, r) {
            uni.setStorageSync("userId", r.id),
                r.integral = r.integral || 0,
                r.balance = r.balance || 0,
                e.user = r;
            if (r.portrait) e.isLogin = true;
        },
        setSystem: function (t, e) {
            t.system = e;
        },
        setCarList: function (t, e) {
            t.carList = e;
        },
        setScarList: function (t, e) {
            e.key ? t.scarList[e.key] = e.data : t.scarList.out = e.data;
        },
        setSjxx: function (e, r) {
            e.sjxx = r, uni.setStorageSync("storeId", r.shopData.id);
        },
        setLayout: function (t, e) {
            var r = e.params,
                n = e.data;
            t.layout[r.page] = n;
        },
        setConfig: function (t, e) {
            var r = e.params,
                n = e.data;
            t.config[r.key] = n;
        }
    },
    actions: {
        // 获取地址信息
        getAddInfo: function (t, e) {
            var n, o, i, u, f;
            n = t.commit;
            if (!(o = t.state).addInfo) {
                i = {
                    maddress: "",
                    city: ""
                };
                if (e.city) {
                    i.maddress = e.address, i.city = e.city;
                    return;
                }
            }
            api['config_coordinate__to__add']({
                lat: t.latitude,
                lng: t.longitude
            }).then(res => { }).then(res => {
                f = res, i.maddress = e.address || f.result.formatted_addresses && f.result
                    .formatted_addresses.recommend || f.result.address,
                    i.city = f.result.address_component.city;
                n("setAddInfo", i);
            })
        },
        getSwitchConfig: function (t, e) {
            // return i(a.default.mark(function e() {
            // 	var r, n, o;
            // 	return a.default.wrap(function(e) {
            // 		for (;;) switch (e.prev = e.next) {
            // 			case 0:
            // 				if (r = t.commit, (n = t.state).mySwitch.hasOwnProperty("jfName")) {
            // 					e.next = 6;
            // 					break;
            // 				}
            // 				return e.next = 4, s.default.request({
            // 					url: c.default.Getswitch
            // 				});

            // 			case 4:
            // 				(o = e.sent) && r("setMySwitch", o.data);

            // 			case 6:
            // 			case "end":
            // 				return e.stop();
            // 		}
            // 	}, e);
            // }))();
        },
        getDndcConfig: function (t, e) {
            var r, n, o;
            r = t.commit;
            if (!(n = t.state).dndcConfig.location) {
                api.config_config({
                    ident: "instoreset"
                }).then(res => {
                    r("setDndcConfig", res);
                })
            }
        },
        getLdxConfig: function (t, e) {
            var r, n;
            if (r = t.commit, n = t.state, !n.ldxConfig.location) {
                api.config_config({
                    ident: "partnerset"
                }).then(res => {
                    r("setLdxConfig", res);
                })
            }
        },
        // 获取模板
        getSmConfig: function (t, e) {
            var r, n, o;
            r = t.commit;
            return new Promise((resolve, reject) => {
                // console.log('(n = t.state).smConfig.saveOrder: ', (n = t.state).smConfig.saveOrder);
                if (!(n = t.state).smConfig.saveOrder) {
                    api.config_template__list().then(res => {
                        r("setSmConfig", res);
                        resolve(res);
                    }).catch(e => {
                        reject(e);
                    })
                } else {
                    resolve(n)
                }
            })
        },
        getMyAd: function (t, e) {
            // return i(a.default.mark(function e() {
            // 	var r, n, o;
            // 	return a.default.wrap(function(e) {
            // 		for (;;) switch (e.prev = e.next) {
            // 			case 0:
            // 				if (r = t.commit, (n = t.state).myAdData.length) {
            // 					e.next = 6;
            // 					break;
            // 				}
            // 				return e.next = 4, s.default.request({
            // 					url: c.default.PlatformAdList,
            // 					data: {
            // 						location: 6,
            // 						type: 1
            // 					}
            // 				});

            // 			case 4:
            // 				(o = e.sent) && r("setMyAdData", o.data);

            // 			case 6:
            // 			case "end":
            // 				return e.stop();
            // 		}
            // 	}, e);
            // }))();
        },
        getFxzx: function (t, e) {
            // return i(a.default.mark(function r() {
            // 	var n, o;
            // 	return a.default.wrap(function(r) {
            // 		for (;;) switch (r.prev = r.next) {
            // 			case 0:
            // 				return n = t.commit, t.state, r.next = 3, s.default.request({
            // 					url: c.default.distributionCenter,
            // 					data: {
            // 						userId: e.uId,
            // 						notcheck: e.notcheck || ""
            // 					}
            // 				});
            // 			case 3:
            // 				(o = r.sent) ? (o.data.createdAt = o.data.createdAt.substring(0, 16), n("setFsxInfo", o.data)) :
            // 				setTimeout(function() {
            // 					e.that.go({
            // 						t: 5,
            // 						url: "/yb_o2o/my/index"
            // 					});
            // 				}, 1500);

            // 			case 5:
            // 			case "end":
            // 				return r.stop();
            // 		}
            // 	}, r);
            // }))();
        },


        // 获取系统令牌
        getSystem: function (t) {
            var e = arguments;
            var n, o, i, a;
            n = t.commit,
                o = t.state,
                i = e.length > 1 && void 0 !== e[1] ? e[1] : {};

            if (o && o.system && o.system.color && !i.get) {
                setNB && setNB(o.system.color, i.nofc);
            } else {
                // a = {},
                //     o.isIpx = -1 != getSb().model.search("iPhone X") ||
                //     -1 != getSb().model.search("iPhone 1") ||
                //     -1 != getSb().model.search("iPhone1");
                api['config_config']({
                    ident: "system"
                }).then(res => {
                    // console.log('configres: ', res, i);
                    n("setSystem", res), setNB && setNB(res.color, i.nofc);
                })
            }
        },
        checkBindTel: function (e, r) {
            var n;
            e.commit, n = e.rootState;
            return new Promise((resolve, r) => {
                n.user.userTel ? resolve() : uni.showModal({
                    title: "提示",
                    content: "请先绑定手机号",
                    confirmText: "前往绑定",
                    cancelText: "暂不绑定",
                    success: function (e) {
                        e.confirm && uni.navigateTo({
                            url: "/yb_o2o/my/login/index"
                        });
                    }
                });
            })
        },
		// 获取登录令牌
		/*  */getLoginInfo: function (e) {
            return new Promise((resolve, reject) => {
                var r = arguments;
                var o, i, a;
                o = e.commit, i = e.state, a = r.length > 1 && void 0 !== r[1] ? r[1] : {};
                if (!i.user.id || (a.flag === true)) {
                    getCode().then(code => {
                        api.login_login({
                            code: code,
                            inviteId: a.inviteId || "",
                            type: a.type || ""
                        }).then(res => {
                            o("setUser", res);
                            resolve(res)
                            //#ifdef MP-WEIXIN
                            if (!res.session_key) {
                                toast('请检查小程序秘钥等相关配置');
                            }
                            getApp().globalData.session_key = res.session_key;
                            //#endif
                        })
                    })
                    return
                    uni.login({
                        success: function (e) {
                            api.login_login({
                                code: e.code,
                                inviteId: a.inviteId || ""
                            }).then(res => {
                                o("setUser", res);
                                if (!res.session_key) {
                                    toast('请检查小程序秘钥等相关配置');
                                }
                                getApp().globalData.session_key = res.session_key;
                            })
                        },
                        fail: function (t) {
                            // console.log("接口调用失败，将无法正常使用开放接口等服务", t);
                        }
                    });
                }
            })

        },
        refreshUser: function (t, e) {
            var n, o, i;
            n = t.commit;
            e.method = e.get ? "GET" : "POST";
            return new Promise((r, j) => {
                api.login_save__user(e).then(res => {
                    // console.log('setUserres: ', res);
                    e.now ? (res.data && n("setUser", res.data), r(res)) : setTimeout(function () {
                        res.data && n("setUser", res.data);
                        r(res);
                    }, 200);
                }).catch(e => {
                    j(e);
                })
            })
        },
        loginBind: function (t, e) {
            // return c(u.default.mark(function r() {
            // 	var n, o;
            // 	return u.default.wrap(function(r) {
            // 		for (;;) switch (r.prev = r.next) {
            // 			case 0:
            // 				return n = t.commit, t.state, r.next = 3, p.default.request({
            // 					url: d.default.bind,
            // 					method: "POST",
            // 					mask: 1,
            // 					data: e
            // 				});

            // 			case 3:
            // 				return (o = r.sent) && n("setUser", o.data), r.abrupt("return", o);

            // 			case 6:
            // 			case "end":
            // 				return r.stop();
            // 		}
            // 	}, r);
            // }))();
        },
        addCar: function (t, e) {
            t.commit;
            var r, n = t.state,
                o = n.user.rankId > 0,
                i = {
                    gnum: e.gnum || 1
                };
            if (r = 1 != e.g.isSpec && 1 != e.g.isMaterial && 1 != e.g.isAttribute ? n.carList.findIndex(function (t) {
                return t.goodsId == e.g.goodsId;
            }) : n.carList.findIndex(function (t) {
                return t.goodsId == e.g.goodsId && t.groupId == e.g.groupId && t.jlids == e.g.jlids && t.attribute == e.g
                    .attribute;
            }), 1 == e.outin) {
                var a = n.carList.find(function (t) {
                    return t.goodsId == e.g.goodsId && t.groupId == e.g.groupId && t.jlids == e.g.jlids && t.attribute == e.g
                        .attribute;
                }) || {
                    num: 0
                };
                if (a.num >= e.g.outStock) return p.default.message("此商品库存不足", 3), {
                    isxg: !0
                };
                if (a.num >= 99) return p.default.message("最多添加99个", 3), {
                    isxg: !0
                };
            }
            if (r > -1) {
                if (e.g.maxNum > 0 && n.carList[r].num >= e.g.maxNum) return p.default.message("此商品限购".concat(e.g.maxNum, "份"),
                    3), {
                    isxg: !0
                };
                n.carList[r].num++;
            } else {
                e.g.minNum > 1 && 1 == e.outin && (i.gnum = +e.g.minNum);
                var s = Object.assign({}, e.g);
                s.num = i.gnum, s.price = 1 == e.outin ? o && e.g.outVipPrice > 0 ? +e.g.outVipPrice : +e.g.outSalesPrice : +e.g
                    .inSalesPrice,
                    s.price += e.g.jlmoney || 0, s.price = +s.price.toFixed(2), n.carList.push(s);
            }
            return 1 == e.outin && g.getters.hcCar(), i;
        },
        decCar: function (t, e) {
            t.commit;
            var r, n = t.state,
                o = {
                    gnum: e.gnum || 1
                };
            return (r = 1 != e.g.isSpec && 1 != e.g.isMaterial && 1 != e.g.isAttribute ? n.carList.findIndex(function (t) {
                return t.goodsId == e.g.goodsId;
            }) : n.carList.findIndex(function (t) {
                return t.goodsId == e.g.goodsId && t.groupId == e.g.groupId && t.jlids == e.g.jlids && t.attribute == e.g
                    .attribute;
            })) > -1 && (e.g.minNum > 1 && 1 == e.outin && e.g.minNum == n.carList[r].num && (o.gnum = +e.g.minNum),
                n.carList[r].num -= o.gnum, 0 == n.carList[r].num && n.carList.splice(r, 1)), 1 == e.outin && g.getters.hcCar(),
                o;
        },
        cshCar: function (e, r) {
            var n = e.commit,
                o = (e.state, uni.getStorageSync("hcCar") || []).find(function (t) {
                    return t.storeId == r;
                });
            n("setCarList", o ? o.list : []);
        },
        clearMycar: function (t, e) {
            var n = t.commit
            return new Promise((r, j) => {
                api.order_del__car(e).then(res => {
                    n("setScarList", {
                        key: e.key,
                        data: {}
                    });
                    r(res);
                }).catch(e => {
                    j(e);
                })
            });
        },
        getMycar: function (t, e) {
            var n, o;
            n = t.commit, o = t.state;
            return new Promise((r, j) => {
                api.order_get__car__list(e).then(res => {
                    n("setScarList", {
                        key: e.key,
                        data: res
                    });
                    r(res);
                }).catch(e => {
                    j(e)
                })
            });
        },
        supdCar: function (t, e) {
            return new Promise((r, j) => {
                api.order_save__shop__car(e).then(res => {
                    var n = t.commit;
                    n("setScarList", {
                        key: e.key,
                        data: res.data
                    })
                    r(res.count)
                }).catch(e => {
                    j(e)
                })
            });
        },
        // 获取商品列表
        getSjxx: function (t, e) {
            var n, o, i;
            n = t.commit, t.state
            return new Promise((r, j) => {
                api.good_get__product__list(e).then(res => {
                    (i = res).newStoreSet && i.newStoreSet.data || (i.newStoreSet = {
                        data: []
                    }), i.storeSet && i.storeSet.data || (i.storeSet = {
                        data: []
                    }), i.vipStoreSet && i.vipStoreSet.data || (i.vipStoreSet = {
                        data: []
                    }), n("setSjxx", i);
                    r(i);
                })
            });
        },
        // 获取自定义页面
        getLayout: function (t) {
            var e = arguments;
            var n, o, i, a;
            n = t.commit, o = t.state, i = e.length > 1 && void 0 !== e[1] ? e[1] : {
                page: "index",
                id: "1"
            };
            // 未定义
            if (!o.layout[i.page].id) {
                api.config_get__drag__row(i).then(res => {
                    // console.log('res: ', res);
                    n("setLayout", {
                        params: i,
                        data: res
                    });
                })
            }
            // 自定义
            if ("custom" != i.page) {
                return;
            }
            // return c(u.default.mark(function r() {
            //     return u.default.wrap(function (r) {
            //         for (; ;) switch (r.prev = r.next) {
            //             case 0:
            //                 if (n = t.commit, o = t.state, i = e.length > 1 && void 0 !== e[1] ? e[1] : {
            //                     page: "index",
            //                     id: "1"
            //                 }, !o.layout[i.page].id) {
            //                     r.next = 7;
            //                     break;
            //                 }
            //                 if ("custom" != i.page) {
            //                     r.next = 6;
            //                     break;
            //                 }
            //                 r.next = 7;
            //                 break;

            //             case 6:
            //                 return r.abrupt("return");

            //             case 7:
            //                 return r.next = 9, p.default.request({
            //                     url: d.default.layout,
            //                     data: i
            //                 });

            //             case 9:
            //                 (a = r.sent) && n("setLayout", {
            //                     params: i,
            //                     data: a.data
            //                 });

            //             case 11:
            //             case "end":
            //                 return r.stop();
            //         }
            //     }, r);
            // }))();
        },
        // 获取配置令牌
        getConfig: function (t, e) {
            // console.log(t, "ttttttttttttttttttttttttttttttttttttttttt");
            // console.log(e, 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            var n, o, a;
            n = t.commit, o = t.state;
            return new Promise((r, j) => {
                if (!e.api) {
                    "storeInfo" == e.key && (e.data.distance = Number((e.data.distance / 1e3).toFixed(e.data.distance < 100 ? 2 :
                        1)) +
                        "km"),
                        n("setConfig", {
                            params: e,
                            data: e.data
                        });
                    r(e.data)
                }
                if (!o.config[e.key].isget) {
                    if (e.api) api[e.api](e.params).then(res => {
                        // console.log('580getconfig: ', res);
                        (o.config[e.key].sArr ? n("setConfig", {
                            params: e,
                            data: {
                                isget: !0,
                                sArr: res
                            }
                        }) : n("setConfig", {
                            params: e,
                            data: {
                                isget: !0,
                                ...res
                            }
                        }));

                        r(res)
                    })
                } else {
                    r();
                }
            });

        }
    }
}