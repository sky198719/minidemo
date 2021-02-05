const app = getApp()
const {
  formatTime,
  typeFn,
  toastMessage,
  toastAlert
} = require('../../utils/util.js');
Page({
  data: {
    alertState: false, //弹框显示状态
    // alertType: 0, //弹框种类
    jsonData: null,
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
  onLoad(opt) {
    //加载查询结果
    this.getMessageData(opt);
    this.setData({
      jsonData: opt
    })
  },
  //加载查询结果
  getMessageData(opt) {
    let optJson = JSON.parse(opt.dataJson);
    let pageJson = {
      startIndex: this.data.pageIndex, //起始页数
      pageSize: this.data.pageSize //每页数量
    };
    let dataJson = { ...optJson,
      ...pageJson
    }

    app.res.req('content/queryWork', dataJson, (res) => {
      if (res.resCode && res.resCode === '0000') {
        let messageArr = this.data.messageData;
        messageArr.push(...res.result)
        for (let i = 0; i < res.result.length; i++) {
          // res.result[i].time = formatTime(new Date(res.result[i].time), 'yyyy-mm-dd hh:mm')
          res.result[i].type = typeFn(res.result[i].type)
        }
        this.setData({
          messageData: messageArr,
          totalSize: res.totalSize,
          pageIndex: this.data.pageIndex + 1,
          totalPage: res.totalPages
        })

      } else {
        toastMessage(JSON.stringify(res.resMsg))
      }
    })
  },
  //查看工单详情
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

        // res.reportTime = formatTime(new Date(res.reportTime), 'yyyy-mm-dd hh:mm')
        // if (res.processTime){
        //   res.processTime = formatTime(new Date(res.processTime), 'yyyy-mm-dd hh:mm')
        // };
        res.reportImgUrl = (res.reportImgUrl != null) ? res.reportImgUrl.split(',') : null;
        res.processImgUrl = res.processImgUrl != null ? res.processImgUrl.split(',') : null;
        res.type = typeFn(res.type)
        this.setData({
          messageInfo: res
        })
        // if (res.processImgUrl){
        //   this.setData({
        //     alertType:1
        //   })
        // }

      } else {
        toastMessage(JSON.stringify(res.resMsg))
      }
      this.setData({
        alertState: true
      })
    })



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

    this.getMessageData(this.data.jsonData);
  },
})