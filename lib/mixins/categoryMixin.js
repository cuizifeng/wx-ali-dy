export default {
    data() {
        return {
            // 滚动设置
            scrollTop: 0, //tab标题的滚动条位置
            oldScrollTop: 0,
            current: 0, // 预设当前项的值
            menuHeight: 0, // 左边菜单的高度
            menuItemHeight: 0, // 左边菜单item的高度
            arr: [],
            timer: null, // 定时器
            navsid: '',
            viewid: '',
        }
    },
    onReady() {
        this.getMenuItemTop()
    },
    methods: {
        navi(e, i) {
            this.current = i;
            this.viewid = e.toString();
        },
        // 获取一个目标元素的高度
        getElRect(elClass, dataVal) {
            new Promise((resolve, reject) => {
                const query = uni.createSelectorQuery().in(this);
                query.select('.' + elClass).fields({
                    size: true
                }, res => {
                    // 如果节点尚未生成，res值为null，循环调用执行
                    if (!res) {
                        setTimeout(() => {
                            this.getElRect(elClass);
                        }, 10);
                        return;
                    }
                    this[dataVal] = res.height;
                    resolve();
                }).exec();
            })
        },
        // 观测元素相交状态
        async observer() {
            this.tabbar.map((val, index) => {
                let observer = uni.createIntersectionObserver(this);
                // 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
                // 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
                observer.relativeTo('.right-box', {
                    top: 0
                }).observe('#item' + index, res => {
                    if (res.intersectionRatio > 0) {
                        let id = res.id.substring(4);
                        this.leftMenuStatus(id);
                    }
                })
            })
        },
        // 设置左边菜单的滚动状态
        async leftMenuStatus(index) {
            if (index >= this.list.length) {
                index = 0;
            }
            this.current = index;
            // 如果为0，意味着尚未初始化
            if (this.menuHeight == 0 || this.menuItemHeight == 0) {
                await this.getElRect('menu-scroll-view', 'menuHeight');
                await this.getElRect('u-tab-item', 'menuItemHeight');
            }
            // 将菜单活动item垂直居中
            this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
        },
        // 获取右边菜单每个item到顶部的距离
        getMenuItemTop() {
            new Promise(resolve => {
                let selectorQuery = uni.createSelectorQuery();
                selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
                    // 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
                    if (!rects.length) {
                        setTimeout(() => {
                            this.getMenuItemTop();
                        }, 10);
                        return;
                    }
                    rects.forEach((rect) => {
                        // 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
                        this.arr.push(rect.top - rects[0].top);
                        resolve();
                    })
                }).exec()
            })
        },
        // 右边菜单滚动
        async rightScroll(e) {
            this.oldScrollTop = e.detail.scrollTop;
            if (this.arr.length == 0) {
                await this.getMenuItemTop();
            }
            if (this.timer) return;
            if (!this.menuHeight) {
                await this.getElRect('menu-scroll-view', 'menuHeight');
            }
            console.log(11, e);
            setTimeout(() => { // 节流
                this.timer = null;
                // scrollHeight为右边菜单垂直中点位置
                let scrollHeight = e.detail.scrollTop
                // + this.menuHeight / 2;
                for (let i = 0; i < this.arr.length; i++) {
                    let height1 = this.arr[i];
                    let height2 = this.arr[i + 1];
                    // 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
                    if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
                        if (i >= this.list.length) i = 0;
                        this.leftMenuStatus(i);
                        return;
                    }
                }
            }, 10)
        }
    }
}