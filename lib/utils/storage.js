class Storage {
	constructor(keyValue) {
		this.key = keyValue;
	}
	get() {
		let value;
		try {
			return (value = uni.getStorageSync(this.key)) &&
				typeof value !== 'undefined' ?
				JSON.parse(value) :
				undefined;
		} catch (err) { }
		return undefined;
	}
	set(data) {
		uni.setStorageSync(this.key, JSON.stringify(data))
	}
	del() {
		uni.removeStorageSync(this.key);
	}
	remove() {
		uni.removeStorageSync(this.key);
	}
}
// const PROJECT = 'KXPAPP';

import { PROJECT } from '../../setting';
//简化了key值的输入 方便统一管理
export const UserInfo = new Storage(`${PROJECT}_userInfo`); //登录用户信息
export const Token = new Storage(`${PROJECT}_token`); //登录token
