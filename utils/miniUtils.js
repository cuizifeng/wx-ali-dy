export const getSystemInfo = () => {
    return new Promise((resolve, reject) => {
        uni.getSystemInfo({
            success: (result) => {
                // 获取手机系统的状态栏高度（不同手机的状态栏高度不同）  （ 不要使用uni-app官方文档的var(--status-bar-height) 官方这个是固定的20px  不对的 ）
                // console.log('当前手机的状态栏高度',result.statusBarHeight)
                let statusBarHeight = result.statusBarHeight + 'px'

                // 获取右侧胶囊的信息 单位px
                const menuButtonInfo = uni.getMenuButtonBoundingClientRect()

                //bottom: 胶囊底部距离屏幕顶部的距离
                //height: 胶囊高度
                //left:   胶囊左侧距离屏幕左侧的距离
                //right:  胶囊右侧距离屏幕左侧的距离
                //top:    胶囊顶部距离屏幕顶部的距离
                //width:  胶囊宽度
                // console.log(menuButtonInfo.width, menuButtonInfo.height, menuButtonInfo.top)
                // console.log('计算胶囊右侧距离屏幕右边距离', result.screenWidth - menuButtonInfo.right)
                let menuWidth = menuButtonInfo.width + 'px'
                let menuHeight = menuButtonInfo.height + 'px'
                let menuBorderRadius = menuButtonInfo.height / 2 + 'px'
                let menuRight = result.screenWidth - menuButtonInfo.right + 'px'
                let menuTop = menuButtonInfo.top + 'px'
                let contentTop = result.statusBarHeight + 44 + 'px'
                let top = result.statusBarHeight + 44
                let menuInfo = {
                    contentTop: contentTop,//内容区距离页面最上方的高度--用来给自定义导航条页面的内容区定位距离使用
                    statusBarHeight: statusBarHeight,//状态栏高度----用来给自定义导航条页面的顶部导航条设计padding-top使用：目的留出系统的状态栏区域
                    menuWidth: menuWidth,//右侧的胶囊宽度--用来给自定义导航条页面的左侧胶囊设置使用
                    menuHeight: menuHeight,//右侧的胶囊高度--用来给自定义导航条页面的左侧胶囊设置使用
                    menuBorderRadius: menuBorderRadius,//一半的圆角--用来给自定义导航条页面的左侧胶囊设置使用
                    menuRight: menuRight,//右侧的胶囊距离右侧屏幕距离--用来给自定义导航条页面的左侧胶囊设置使用
                    menuTop: menuTop,//右侧的胶囊顶部距离屏幕顶部的距离--用来给自定义导航条页面的左侧胶囊设置使用
                    top: top
                }
                // uni.setStorageSync('menuInfo', menuInfo)
                resolve(menuInfo)
            },
            fail: (error) => {
                console.log(error)
            }
        })
    })

}

export const decimalPoint = (val, large, Small, color) => {
    const str = typeof (val) == 'string' ? Number(val).toFixed(2).toString() : val.toFixed(2).toString();
    const splitPrice = (str || '0.00').split('.')
    const numb1 = splitPrice[0];
    var numb2 = '00';
    if (splitPrice.length > 1) {
        numb2 = splitPrice[1]
    }
    return `<div style="display:flex;align-items:center;justify-content:center;font-family: PingFangSC, PingFangSC-Semibold;font-weight:600;color:${color}"> <div style="font-size:${Small}px;padding-left:5px;padding-top:10px">￥</div> <div style="font-size:${large}px">${numb1}</div><div style="font-size:${Small}px;padding-top:10px">.${numb2}</div></div>`
}

/**
 * 转换富文本的图片最大为100%
 * 转换行内样式的双引号问题
 */
export const formatRichText = function (html) { //控制小程序中图片大小
    // return html.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ').replace(/\style="width: auto;/gi,'')
    let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        match = match.replace(/style=""/g, '');
        return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
    return newContent;
}

//版本更新器
export const setUpdateManager = function () {
    //使用更新对象之前判断是否可用
    if (uni.canIUse('getUpdateManager')) {
        const updateManager = uni.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            if (res.hasUpdate) {
                updateManager.onUpdateReady(function () {
                    uni.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好,重启当前应用',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                // 新的版本已经下载好，调用applyUpdate应用新版本并重启
                                updateManager.applyUpdate()
                            }
                        }
                    })
                })
                // 新版本下载失败时执行
                updateManager.onUpdateFailed(function () {
                    uni.showModal({
                        title: '发现新版本',
                        content: '请删除当前小程序，重新搜索打开...',
                    })
                })
            }
        })
    } else {
        //如果小程序需要在最新的微信版本体验，如下提示
        uni.showModal({
            title: '更新提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
    }
}


export const Tips = function ({ title = '', type = 0, url = '', end = 3000, num = 1 }) {  //{title=提示，type=1，url=路径，end=结束时间,num=返回上级}
    if (title) { uni.showToast({ title: title, icon: 'none', duration: end }); }
    switch (type) {
        case 1: //打开新页面
            setTimeout(() => {
                uni.navigateTo({
                    url: url,
                });
            }, end)
            break;
        case 2://页面重定向
            setTimeout(() => {
                uni.redirectTo({
                    url: url,
                });
            }, end)
            break;
        case 3://页面返回
            setTimeout(() => {
                uni.navigateBack({
                    delta: num,
                });
            }, end)
            break;
        case 4://Tab 切换
            setTimeout(() => {
                uni.switchTab({
                    url: url,
                });
            }, end)
            break;
        case 5://重加载
            setTimeout(() => {
                uni.reLaunch({
                    url: url,
                });
            }, end)
            break;
    }
}

export const getUrlParams = (param, k, p) => {
    if (typeof param != 'string') return {};
    k = k ? k : '&';//整体参数分隔符
    p = p ? p : '=';//单个参数分隔符
    var value = {};
    if (param.indexOf(k) !== -1) {
        param = param.split(k);
        for (var val in param) {
            if (param[val].indexOf(p) !== -1) {
                var item = param[val].split(p);
                value[item[0]] = item[1];
            }
        }
    } else if (param.indexOf(p) !== -1) {
        var item = param.split(p);
        value[item[0]] = item[1];
    } else {
        return param;
    }
    return value;
}

export const showModal = function ({ title = '提示', content = '', url = '', type = 0, showCancel = true, confirmColor = '#FF4B48' }) {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title: title,
            content: content,
            showCancel: showCancel,
            confirmColor: confirmColor,
            success: function (res) {
                if (res.confirm) {
                    switch (type) {
                        case 1: //打开新页面
                            uni.navigateTo({
                                url: url,
                            });
                            break;
                        case 2://页面重定向
                            uni.redirectTo({
                                url: url,
                            });
                            break;
                        case 3://页面返回
                            uni.navigateBack({
                                delta: 1,
                            });
                            break;
                        case 4://Tab 切换
                            uni.switchTab({
                                url: url,
                            });
                            break;
                        case 5://重加载
                            uni.reLaunch({
                                url: url,
                            });
                            break;
                    }
                } else if (res.cancel) {

                }
            }
        });
    })
}