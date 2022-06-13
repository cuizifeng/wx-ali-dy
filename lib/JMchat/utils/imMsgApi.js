const jimMsg = {
    getSingleMsg(chatList = [], chatInfoList = [], userInfo) {
        let object = {};
        let _chatList = chatList.map(e => e.username);
        let _chatInfoList = chatInfoList.map(e => e.from_username);
        let index = _chatList.indexOf(userInfo.username);
        if (index === -1) {
            object.isfind = false;
            object._chatInfoList = null;
            object._chatList = {
                name: userInfo.username,
                username: userInfo.username,
                appkey: userInfo.appkey,
                type: 3,
                mtime: new Date().getTime(),
                avatar: userInfo.avatar,
                nickName: userInfo.nickName,
                extras: userInfo.extras,
                unread_msg_count: 0
            }
        } else {
            let _index = _chatInfoList.indexOf(userInfo.username);
            object.isfind = true;
            object._chatList = null;
            object._chatInfoList = _index > -1 ? chatInfoList[_index].msgs : [];
        }
        return object;
    },
    formatConversation(chatList = [], chatInfoList = []) {
        chatList.forEach(e => {
            chatInfoList.forEach(el => {
                // console.log('el: ', el);
                if (e.username === el.from_username) {
                    let msgs = el.msgs || [];
                    let content = msgs[msgs.length - 1] && msgs[msgs.length - 1].content || null;
                    e.content = content ? content.msg_body && content.msg_body.text || '' : '';
                }
            })
        })
        return chatList;
    },
    formatMsgInfo(jimUserInfo = {}, params = {}, res = {}) {
        let content = {
            from_type: "user",
            from_id: jimUserInfo.username,
            set_from_name: 0,
            target_appkey: params.appkey,
            target_name: params.target_username,
            create_time: new Date().getTime(),
            from_appkey: jimUserInfo.appkey,
            target_type: "single",
            from_platform: "web",
            target_id: params.target_username,
            from_name: jimUserInfo.username,
            version: 1,
            msg_body: { text: params.content },
            msg_type: "text"
        }
        let msgInfo = {
            ctime_ms: res.ctime_ms,
            from_appkey: params.appkey,
            from_username: params.target_username,
            msg_type: 3,
            need_receipt: false,
            custom_notification: {
                alert: '',
                at_prefix: '',
                title: '',
                enabled: ''
            },
            msg_id: res.msg_id,
            msg_level: res.msg_level || 0,
            content
        }
        return msgInfo
    },
    formatMsgInfoReceive(msg) {
        let content = msg.content;
        console.log('content: ', content);
        let msgInfo = {
            from_appkey: content.from_appkey,
            from_username: content.from_id,
            ctime_ms: msg.ctime_ms,
            msg_type: 3,
            need_receipt: false,
            custom_notification: {
                alert: '',
                at_prefix: '',
                title: '',
                enabled: ''
            },
            msg_id: msg.msg_id,
            msg_level: msg.msg_level,
            content
        }
        return msgInfo
    }
}


export default jimMsg