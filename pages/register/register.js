const app = getApp()
const {
  toastMessage,
  toastAlert
} = require('../../utils/util.js');
Page({
  data: {
    // nameVal: '', //姓名
    mobileVal: '', //手机号
    passwordVal: '', //密码
    // currentSessionKey: app.globalData.sessionKey,//key
  },
  //填写姓名
  // setName: function(e) {
  //   this.setData({
  //     nameVal: e.detail.value
  //   })
  // },
  // 获取手机号
  getPhoneNumber: function(e) {
    const {
      encryptedData,
      iv
    } = e.detail;
    const options = {
      encryptedData: encryptedData,
      iv: iv,
      sessionKey: this.data.currentSessionKey
    };
    this.doGetPhone(options);
  },
  //获取手机号
  // doGetPhone: function (options) {
  //   const {
  //     sessionKey,
  //     encryptedData,
  //     iv
  //   } = options;

  //   const that = this;
  //   // 向服务器请求解密
  //   wx.request({
  //     // 这里是解密用的接口
  //     url: 'https://xxx.com/python/decrypt',
  //     method: 'POST',
  //     data: {
  //       sessionKey: sessionKey,
  //       encryptedData: encryptedData,
  //       iv: iv
  //     },
  //     success(res) {
  //       // 最终获取到用户数据，国家代号前缀、不带前缀的手机号。默认是不带前缀
  //       const { countryCode, purePhoneNumber } = res.data;
  //       that.pageForward(countryCode, purePhoneNumber);
  //     },
  //     fail(error) {
  //       console.log(error);
  //       that.pageForward();
  //     }
  //   })
  // },
  // pageForward: function (countryCode, purePhoneNumber) {
  //   // 获取成功后我是跳转到另一个页面
  //   wx.navigateTo({
  //     url: `/pages/person/index?phone=${purePhoneNumber}`
  //   })
  // },
  //填写手机号
  setMobile: function(e) {
    this.setData({
      mobileVal: e.detail.value
    })
  },
  //填写密码
  setPassword: function(e) {
    this.setData({
      passwordVal: e.detail.value
    })
  },
  //验证
  checkFn() {
    // if (this.data.nameVal === '') {
    // toastAlert('请输入真实姓名!')
    //   return false;
    // }
    if (this.data.mobileVal.length != 11) {

      toastAlert('手机号输入不正确!')
      return false;
    }
    if (this.data.passwordVal === '') {
      toastAlert('请输入密码!')
      return false;
    }
    if (this.data.passwordVal.length < 6) {
      toastAlert('请输入至少6位密码!')
      return false;
    }
    return true;
  },
  //注册
  register: function() {

    if (!this.checkFn()) {
      return
    }
    const dataJson = {
      // name: this.data.nameVal,
      phone: this.data.mobileVal,
      password: this.data.passwordVal,
      openId: app.globalData.openId
    }
    app.res.req('content/register', dataJson, (res) => {
      if (res.resCode && res.resCode === '0000') {

        toastAlert(res.resMsg)
        app.globalData.loginType = 1; //注册成功b后变为1  活动中用户
        setTimeout(() => {
          wx.redirectTo({
            url: '../login/login'
          })
        }, 500)

      } else {
        toastMessage(res.resMsg)
      }
    })

  },
  loginFn() {
    wx.reLaunch({
      url: '../login/login',
    })
  }
})