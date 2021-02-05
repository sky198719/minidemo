const app = getApp()

Page({
  data:{
    roleType:''
  },
  onShow(){
    this.setData({
      roleType: wx.getStorageSync('personJson').roleType
    })
  },
  pending:function(){
    wx.navigateTo({
      url: '../pending/pending',
    })
  },
  report:function(){
    wx.navigateTo({
      url: '../report/report',
    })
  },
  search:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  }
})