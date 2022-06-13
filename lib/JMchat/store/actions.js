import jpushIM from '../utils/jim.js'
import utils from '../utils/utils.js'
import config from '../utils/config.js'
import jimMsg from '../utils/imMsgApi.js'

let number = 0;
const actions = {
	jimInit(ctx) {
		jpushIM.init()
			.then(res => {
				let inter = setInterval(() => {
					if (jpushIM.isInit() || number > 20) {
						clearInterval(inter);
						ctx.commit('jimInit', true);
					} else {
						number++;
					}
				}, 200)
			})
	},
	jimGetSingleInfo(ctx, data) {
		if (data) {
			let params = {
				username: data
			};
			jpushIM.getUserInfo(params)
				.then(res => {
					if (res.code == 0) {
						let user = res && res.user_info || {
							username: data
						}
						ctx.dispatch('jimGetSingleMsg', user)
					}
				})
		}
	},
	jimResetUnreadCount(ctx, data) {
		let params = {
			username: data.username,
			appkey: data.appkey
		}
		jpushIM.resetUnreadCount(params)
		ctx.dispatch('jimUpdateConversation', data)
	},
	jimUpdateConversation(ctx, data) {
		let params = {
			username: data.username,
			appkey: data.appkey
		}

		jpushIM.updateConversation(params)
	},
	jimGetSingleMsg(ctx, user) {
		let chatList = jimMsg.getSingleMsg(ctx.state.conversation, ctx.state.syncConversation, user);
		chatList._chatInfoList && chatList._chatInfoList.forEach(i => {
			if (i.content.msg_type === 'image') {
				jpushIM.getResource({ media_id: i.content.msg_body.media_id }).then(res => {
					i.content.msg_body.url = res.url;
				}).catch(data => {
				})
			}
		})
		ctx.commit('jimGetSingleMsg', chatList);
		if (user && user.avatar) {
			jpushIM.getResource({ media_id: user.avatar }).then(res => {
				user.avatar = res.url;
				ctx.commit('jimSetSingleInfo', user);
			}).catch(data => {
				ctx.commit('jimSetSingleInfo', user);
			})
		}
		ctx.dispatch('jimResetUnreadCount', user)
	},
	jimLoginOut(ctx) {
		jpushIM.loginOut();
		ctx.commit('jimLoginOut');
		// utils.$toast("退出成功");
		setTimeout(() => {
			if (!jpushIM.isInit()) {
				jpushIM.init()
			}
		}, 500)
	},
	jimLogin(ctx, data) {
		utils.$setStorage('jimLoginInfo', data);
		jpushIM.login(data)
			.then(res => {
				ctx.commit('jimLogin');
				ctx.dispatch('jimGetUserInfo', data.username)
				ctx.dispatch('jimOnSyncConversation')
				ctx.dispatch('jimOnMsgReceive')
				ctx.dispatch('jimGetConversation')
				// utils.$toast('登录成功')
				setInterval(() => {
				}, 1000)
			})

	},
	// 获取资源访问路径
	getMedia({ }, mediaId) {
		return new Promise((resolve, reject) => {
			if (mediaId) {
				jpushIM.getResource({ media_id: mediaId }).then(res => {
					resolve(res);
				}).catch(data => {
					reject(data);
					// Notification.error(data);
				})
			}
		});
	},
	jimGetConversation(ctx) {
		jpushIM.getConversation().then(res => {
			if (res.code == 0) {
				let conversations = res.conversations || [];
				conversations.forEach(e => {
					if (e.avatar) {
						jpushIM.getResource({ media_id: e.avatar }).then(res => {
							e.avatar = res.url;
						})
					}
				})
				ctx.dispatch('jimGetConversationFormat', conversations)
			}
		})
	},
	jimOnMsgReceive(ctx) {
		jpushIM.onMsgReceive(res => {
			let msgs = res.messages || [];
			if (msgs && msgs[0]) {
				let msg = jimMsg.formatMsgInfoReceive(msgs[0])
				ctx.commit('jimSendMsgAdd', msg)
				ctx.dispatch('jimGetConversation')
			}
		})
	},
	jimGetConversationFormat(ctx, data) {
		let count = data.reduce((p, v) => p += v.unread_msg_count, 0);
		let conversation = jimMsg.formatConversation(data, ctx.state.syncConversation);
		ctx.commit('jimGetConversationFormat', conversation)
		ctx.commit('unReadCount', count)
	},
	jimOnSyncConversation(ctx) {
		jpushIM.onSyncConversation()
			.then(res => {
				ctx.commit('jimOnSyncConversation', res)
			})

	},
	jimRegister(ctx, data) {
		jpushIM.register(data)
			.then(res => {
				// utils.$toast('注册成功')
			})

	},
	jimGetUserInfo(ctx, data) {
		let params = {
			username: data
		}

		jpushIM.getUserInfo(params)
			.then(res => {
				if (res.code == 0) {
					let user = res && res.user_info || {
						username: data
					}
					ctx.dispatch('getMedia', user.avatar).then(res => {
						user.avatar = res.url
						ctx.commit('jimGetUserInfo', user);
					}).catch(e => {
						ctx.commit('jimGetUserInfo', user);
					})
				}
			})
	},
	jimUpdateSelfInfo(ctx, data) {
		let params = data;

		jpushIM.updateSelfInfo(params)
			.then(res => {
				if (res.code == 0) {
					ctx.dispatch('jimGetUserInfo', ctx.state.jimUserInfo.username)
				}
			})
	},
	jimUpdateSelfPwd(ctx, data) {
		let object = utils.$json(data);
		let params = data;
		jpushIM.updateSelfPwd(params)
			.then(res => {
				if (res.code == 0) {
					let jimLoginInfo = utils.$getStorage('jimLoginInfo');
					if (jimLoginInfo.username) {
						jimLoginInfo.password = object.new_pwd;
						utils.$setStorage('jimLoginInfo', jimLoginInfo);
					}
				}
			})
	},
	jimSendSingleMsg(ctx, data) {
		let params = data;
		jpushIM.sendSingleMsg(params)
			.then(res => {
				if (res.code == 0) {
					let jimUserInfo = ctx.state.jimUserInfo;
					let msgInfo = jimMsg.formatMsgInfo(jimUserInfo, params, res)
					ctx.commit('jimSendMsgAdd', msgInfo)
				}
			})
	},
	updateSelfAvatar(ctx, data) {

		let params = {
			avatar: data
		}
		jpushIM.updateSelfAvatar(params)
			.then(res => {
				if (res.code == 0) {
					ctx.dispatch('jimGetUserInfo', ctx.state.jimUserInfo.username)
				}
			})
	}
}





export default actions
