<template>
  <div>
    <button class="start" open-type="getAuthorize" scope="phoneNumber" @getAuthorize="getPhoneNumber" @error="errorPhoneNumber">授权手机号</button>
  </div>
</template>

<script>
export default {
  methods: {
    getPhoneNumber(e) {
      my.getPhoneNumber({
        success: (res) => {
          let userInfo = JSON.parse(res.response).response
          console.log(userInfo, "==================");
        },
        fail: (err) => {
          console.log('授权失败', err)
        }
      })
    },
    // 拒绝手机号
    errorPhoneNumber(e) {
      console.log('拒绝授权', e)
      this.exitAccount()
    },

    // 退出登录 功能
    exitAccount() {
      my.confirm({
        title: '提示',
        content: '取消授权，可能会使部分功能无法使用，或页面信息不完整',
        confirmButtonText: '重新授权',//确定按钮
        cancelButtonText: '我知道了',//取消按钮
        success: (res) => {
          //res打印出来是{confirm:true}
        },
      })
    },

  },
}
</script>

<style>
</style>