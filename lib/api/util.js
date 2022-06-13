import { middleWare } from "../../common/apiconfig";

// 封装了添加token的逻辑
export default function request(options, showLoading = true) {
    middleWare(options);
    let { url = '', method = 'post', data = {}, header = {} } = options;
    //if (showLoading) uni.showLoading({ title: '加载中...' })
    return new Promise((resolve, reject) => {
        uni.request({
            url, method, header, data,
            success: (res) => resolve(res.data),
            fail: (e) => reject(e),
            complete: (e) => { }
            //complete: (e) => showLoading && uni.hideLoading()
        })
    })
}