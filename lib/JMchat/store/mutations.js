import utils from '../utils/utils.js'

const mutations = {
	jimLogin(state, data) {
		state.hasLogin = true;
	},
	jimInit(state, data) {
		state.isJimInit = data;
	},
	jimLoginOut(state, data) {
		state.hasLogin = false;
		state.jimUserInfo = {};
		state.isJimInit = false;
		state.syncConversation = [];
		state.conversation = [];
		state.chatList = [];
		state.singleInfo = {};
		utils.$setStorage('jimLoginInfo', '');
	},
	jimGetUserInfo(state, data) {
		state.jimUserInfo = data;
	},
	unReadCount(state, data) {
		state.unReadCount = data;
	},
	setHasLogin(state, data) {
		state.hasLogin = data;
	},
	jimOnSyncConversation(state, data) {
		if (Object.prototype.toString.call(data) === "[object Array]") {
			state.syncConversation = data;
		} else {
			state.syncConversation = [];
		}
	},
	jimGetConversation(state, data) {
		if (Object.prototype.toString.call(data) === "[object Array]") {
			data.forEach(e => { e.content = '' })
			state.conversation = data;
		} else {
			state.conversation = [];
		}
	},
	jimGetSingleMsg(state, data) {
		if (data.isfind) {
			state.chatList = data._chatInfoList;
		} else {
			state.conversation.unshift(data._chatList);
			state.chatList = [];
		}
	},
	jimSetSingleInfo(state, data) {
		state.singleInfo = data;
	},
	jimSendMsgAdd(state, data) {
		let from_username = data.from_username;
		let appkey = data.from_appkey;
		let list = state.syncConversation.map(e => e.from_username);
		let index = list.indexOf(from_username)
		if (index != -1) {
			state.syncConversation[index].msgs.push(data);
		} else {
			let syncConversation = {
				from_username: from_username,
				from_appkey: appkey,
				msg_type: 3,
				receipt_msgs: [],
				unread_msg_count: 0,
				msgs: [data]
			};
			state.syncConversation.push(syncConversation);
		}

	},
	jimGetConversationFormat(state, data) {
		state.conversation = data;
	}
}


export default mutations