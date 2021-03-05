const global = require('../../utils/global.js')

Page({
  data:{
    currentTab:1
  },
  changeTab(e){
    this.setData({
      currentTab:e.currentTarget.dataset.tabid
    })
    console.log(this.data.currentTab)
  }
})