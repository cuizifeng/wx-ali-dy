<script>
import { setUpdateManager } from '@/utils/miniUtils.js'
import { getAppId } from '@/utils/getCode.js';
import { uniacidIndex } from "@/api/index.js"
export default {
  globalData: {
    siteInfo: '',
    onImgurl: "https://new.gxmd666.com/static/miniapp/"
  },

  onLaunch(options) {
    getAppId().then(res => {
      uniacidIndex({ appid: res.appid }).then(res1 => {
        if (res1.data.uniacid) {
          uni.setStorageSync('uniacid', res1.data.uniacid);
          this.$isResolve()
          this.getLoginInfo()
        }

      })
    })
  },

  methods: {

  },
  onShow: function () {

    // #ifdef MP-WEIXIN
    setUpdateManager() //更新版本
    // #endif
    //#ifdef MP-ALIPAY
    setUpdateManager() //更新版本
    //#endif
  },
  onHide: function () { }
}
</script>

<style lang="scss">
@import "uview-ui/index.scss";
</style>