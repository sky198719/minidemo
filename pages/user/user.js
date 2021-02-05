const app = getApp()

Page({
  data: {
    userInfo: {
      avatarUrl: '/images/account.png',
      nickName: '哈哈哈',
    },
    userId: '----',
    roleType:null,//角色
    qpInfo:'',//二维码扫描的信息
  },
  scanCodeFn(){
    let that = this;
    wx.scanCode({
      success: (res) => {
        this.setData({
          qpInfo: res
        })
      }
    })
  },
  //获取用户信息
  onShow() {
    this.setData({
      userId: wx.getStorageSync('personJson').personId,
      roleType: wx.getStorageSync('personJson').roleType
    })
  },

  // 跳转考勤
  jumpAtten(){
    wx.navigateTo({
      url: '../attendance/attendance',
    })
  },
  //退出
  quitFn(){
    wx.clearStorageSync('personJson');
    wx.reLaunch({
      url: '../login/login',
    })
  }
})