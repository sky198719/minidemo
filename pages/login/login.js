const app = getApp()
const {
  toastMessage,
  toastAlert
} = require('../../utils/util.js')
Page({
  data: {
    usernameVal: '', //账号
    passwordVal: '', //密码

  },
  onLoad() {},
  //微信通知授权
  wxMessage() {
    return new Promise((resolve, reject) => {
      wx.requestSubscribeMessage({
        tmplIds: ['JGNqwk4sy9gsVMUwh1TORnW5EBNeoZwvWP5-5bbQ1HY'],
        success(res) {
          resolve(res)
        },
        fail(res) {
          resolve(res)
        },
      })
    })
  },

  //验证
  checkFn() {
    if (this.data.usernameVal === '') {
      toastAlert('请输入您的账号!')
      return false;
    }
    if (this.data.passwordVal === '') {
      toastAlert('请输入您的密码!')
      return false;
    }
    if (this.data.passwordVal.length <6) {
      toastAlert('密码输入错误!')
      return false;
    }
    return true;
  },
  //输入账号
  setUsername: function(e) {
    this.setData({
      usernameVal: e.detail.value
    })
  },
  //输入密码
  setPassword: function(e) {
    this.setData({
      passwordVal: e.detail.value
    })
  },
  //登录
  login: function() {
    if (!this.checkFn()) {
      return;
    }
    this.wxMessage().then(() => {

      const dataJson = {
        // 'phone': this.data.usernameVal,//暂时不用传
        //动态
        'password': this.data.passwordVal,
        'openId': app.globalData.openId,
        'loginType': app.globalData.loginType,
        //管理员
        // 'password': '123123',
        // 'openId': 'okSb_44KSvSuKBTZbecr_LTOOgXI',
        // 'loginType': app.globalData.loginType,


        //商户
        // 'password': '5842993', //商户
        // 'openId': 'okSb_45xUu2Hpoh9IjYoLzjNTxhI', //商户
        // 'loginType': app.globalData.loginType,


        //特保
        // 'password': '123456',//特保
        // 'openId': 'okSb_4_62zptyfsJChV37b-Etgww',//特保
        // 'loginType': app.globalData.loginType,

        // 城管
        // 'password': '123456',//城管
        // 'openId': 'okSb_4982147azn2v2HEeDCdch1Q',//城管
        // 'loginType': app.globalData.loginType,
      }

      app.res.req('content/login', dataJson, (res) => {
        wx.clearStorage('personJson')
        let appData = app.globalData.personJson;
        if (res.resCode && res.resCode === '0000') {
          //获取登陆用户ID 设置为全局
          appData.personId = res.roleDetail.personId;
          appData.personName = res.roleDetail.personName;
          appData.personPhone = res.roleDetail.personPhone;
          appData.roleType = res.roleDetail.roleType;
          appData.disorderList = res.roleDetail.disorderList;
          appData.menuList = res.roleDetail.menuList;
          wx.setStorageSync('personJson', appData)
          toastAlert('登录成功!')
          if (res.roleDetail.isCheckin == 0) {
            //未考勤跳转考勤
            setTimeout(() => {
              wx.navigateTo({
                url: '../attendance/attendance',
              })
              // wx.switchTab({
              //   url: '../message/message'
              // })
            }, 500)
          } else {
            setTimeout(() => {
              wx.switchTab({
                url: '../message/message'
              })
            }, 500)
          }
        } else {
          toastMessage(JSON.stringify(res.resMsg))
        }
      })

    });

  },
  //注册
  registerFn() {
    wx.navigateTo({
      url: '../register/register',
    })
  }
})