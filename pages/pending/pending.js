const app = getApp()
const {
  formatTime,
  typeFn,
  toastMessage,
  toastAlert
} = require('../../utils/util.js');
const webpath = app.globalData.webpath
Page({
  data: {
    alertState: false, //弹框显示状态
    // alertType: 0, //弹框种类
    alertWorkId: '', //查看工单详情ID
    // 工单详情
    messageInfo: {
      title: '占道经营',
      name: '水果摊',
      time: '2020-02-11',
      type: '占道经营',
      images: '',
      dec: '存在违法占道经营情况',
      idea: '立即处理'
    },
    messageData: [],
    loading: false, //是否为加载列表状态
    pageIndex: 1, //当前页数
    pageSize: 10, //总页数
    totalSize: '', //总条数
    totalPage: '' //总页数
  },
  onShow() {
    this.getDataList(1, 10);
  },
  onLoad() {

  },
  //获取消息列表
  getDataList(index, num) {
    const dataJson = {
      // startTime: '', //开始时间
      // endTime: '', //结束时间
      personId: wx.getStorageSync('personJson').personId, //用户ID
      // state: 1, //处理类型
      // type: 0,//违章类型
      startIndex: index || this.data.pageIndex, //起始页数
      pageSize: num || this.data.pageSize //每页数量
    };
    app.res.req('content/queryTodoWork', dataJson, (res) => {
      if (res.resCode && res.resCode === '0000') {
        let messageArr = this.data.messageData;

        for (let i = 0; i < res.result.length; i++) {
          // res.result[i].time = formatTime(new Date(res.result[i].time), 'yyyy-mm-dd hh:mm')
          res.result[i].type = typeFn(res.result[i].type)
        }
        if (index) {
          messageArr = res.result
        } else {
          messageArr.push(...res.result)
        }

        this.setData({
          messageData: messageArr
        })

      } else {
        toastMessage(JSON.stringify(res.resMsg))
      }
    })
  },



  //查看详情
  toDetail: function(e) {
    let that = this;
    let dataJson = {
      workId: e.currentTarget.dataset.id
    };
    this.setData({
      alertWorkId: e.currentTarget.dataset.id
    })
    app.res.req('content/queryWorkDetails', dataJson, (res) => {
      if (res.resCode && res.resCode === '0000') {
        // res.reportTime = formatTime(new Date(res.reportTime),'yyyy-mm-dd hh:mm')
        res.reportImgUrl = (res.reportImgUrl != null) ? res.reportImgUrl.split(',') : null;
        res.processImgUrl = res.processImgUrl != null ? res.processImgUrl.split(',') : null;
        res.type = typeFn(res.type)
        this.setData({
          messageInfo: res
        })


      } else {
        toastMessage(JSON.stringify(res.resMsg))
      }
      this.setData({
        alertState: true
      })
    })



  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getDataList(1, 10);
    wx.stopPullDownRefresh();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let pageIndex = this.data.pageIndex; //页数
    let pageSize = this.data.totalPage; //条数


    if (pageIndex > pageSize) {
      return false;
    }

    this.getDataList();
  },
})