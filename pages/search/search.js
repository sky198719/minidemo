const app = getApp()
const {
  formatTime,
  toastMessage,
  toastAlert
} = require('../../utils/util.js');
Page({
  data: {
    id: '123',
    violationList: ['乱设摊', '乱堆放', '乱停车', '乱晾晒', '乱张贴', '乱搭建', '跨门经营'], //违章类型
    violationCounter: 0,
    orderList: ['全部', '待处理', '待确认', '处理完成', '商户完成', '待处罚', '待审核'], //工单类型 0 全部 1待处理 2待确认 3处理完成 4 商户完成 5 待处罚 6待审核
    orderCounter: 0,
    startDate: formatTime(new Date(), 'yyyy-mm-dd'),
    endDate: formatTime(new Date(), 'yyyy-mm-dd')
  },
  //查询
  searchSubmit: function() {
    const dataJson = {
      startTime: this.data.startDate, //开始时间
      endTime: this.data.endDate, //结束时间
      // personId: app.globalData.personJson.personId, //用户ID
      personId: wx.getStorageSync('personJson').personId, //用户ID
      status: this.data.orderCounter, //处理类型
      type: this.data.violationCounter * 1 + 1 //违章类型
    };
    wx.navigateTo({
      url: '../searchResult/searchResult?dataJson=' + JSON.stringify(dataJson),
    })
  },
  //违章类型
  setViolation: function(e) {
    this.setData({
      violationCounter: e.detail.value
    })
  },
  //工单状态
  setOrder: function(e) {
    this.setData({
      orderCounter: e.detail.value
    })
  },
  //起始时间
  setStartDate: function(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  //上报时间
  setEndDate: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  }
})