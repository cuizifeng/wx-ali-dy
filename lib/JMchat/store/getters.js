const getters = {
	hasLogin(state) {
		return state.hasLogin
	},
	jimUserInfo(state) {
		return state.jimUserInfo
	},
	isJimInit(state) {
		return state.isJimInit
	},
	syncConversation(state) {
		return state.syncConversation
	},
	conversation(state) {
		return state.conversation
	},
	chatList(state) {
		return state.chatList
	},
	singleInfo(state) {
		return state.singleInfo
	},
	unReadCount(state) {
		return state.unReadCount
	}
}


export default getters