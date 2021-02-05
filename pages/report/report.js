const app = getApp()
const {
  formatTime,
  toastMessage,
  toastAlert
} = require('../../utils/util.js')
Page({
  data: {
    violationList: ['乱设摊', '乱堆放', '乱停车', '乱晾晒', '乱张贴', '乱搭建', '跨门经营'],
    violationCounter: 0, //类型
    storeList: null,
    storeListCounter: 0, //商户类型
    time: "00:00",
    reportTime: null, //表单提交的上报时间
    picList: [], //图片网络地址
    imgUrl: [], //提交图片ID
    storeName: '', //商户名称
    decInfo: '', //违章描述
    handleIdeaInfo: '', //处理意见
  },
  onLoad() {
    this.setData({
      storeList: wx.getStorageSync('personJson').disorderList,
      time: formatTime(new Date(), 'hh:mm'),
      reportTime: formatTime(new Date(), 'yyyy-mm-dd hh:mm')
    })
  },
  //获取商户名称
  setStore(e) {
    this.setData({
      storeListCounter: e.detail.value
    })
  },
  //违章描述
  decFn(e) {
    this.setData({
      decInfo: e.detail.value
    })
  },
  // 校验
  checkFn() {
    if (this.data.picList.length < 2 || this.data.picList.length > 4) {

      toastAlert('违章照片请上传2-4张!')
      return false;
    }
    if (this.data.decInfo === '') {

      toastAlert('请填写违章描述!')
      return false;
    }
    if (this.data.handleIdeaInfo === '') {

      toastAlert('请填写处理意见!')
      return false;
    }
    return true;
  },
  //提交
  reportSubmit: function() {
    //重置
    this.setData({
      imgUrl: []
    })
    if (!this.checkFn()) {
      return;
    }
    wx.showLoading({
      title: '上传中',
    })
    this.chooseImage().then((res) => {
      let dataJson = {
        disorderId: this.data.storeListCounter * 1 + 1,
        createTime: this.data.reportTime,
        type: this.data.violationCounter * 1 + 1,
        imgUrl: this.data.imgUrl,
        disorderDesp: this.data.decInfo,
        handleDesp: this.data.handleIdeaInfo,
        reporterId: wx.getStorageSync('personJson').personId,
        handleVehicle: '',
        status: 1,
        remarks: ''
      }
      app.res.req('content/createWork', dataJson, (res) => {
        wx.hideLoading()
        if (res.resCode && res.resCode === '0000') {

          toastAlert('上报成功!')
          setTimeout(() => {
            wx.switchTab({
              url: '../message/message'
            })
          }, 500)

        } else {
          toastMessage(JSON.stringify(res.resMsg))
        }
      })
    });
    // wx.navigateTo({
    //   url: '../workbench/workbench',
    // })
  },
  //违章类型
  setViolation: function(e) {
    this.setData({
      violationCounter: e.detail.value
    })
  },
  //上报时间
  setTime: function(e) {
    let dateData = formatTime(new Date(), 'yyyy-mm-dd')
    this.setData({
      reportTime: `${dateData} ${e.detail.value}`,
      time: e.detail.value
    })

  },
  //违章描述
  decFn(e) {
    this.setData({
      decInfo: e.detail.value
    })
  },
  //处理意见
  handleIdea(e) {
    this.setData({
      handleIdeaInfo: e.detail.value
    })
  },
  //上传图片API
  chooseImage() {
    let that = this;
    return new Promise((resolve, reject) => {

      for (let i = 0; i < that.data.picList.length; i++) {
        app.uploadFile(this.data.picList[i], (res) => {
          let resData = JSON.parse(res.data);
          if (resData.code && resData.code != '0000') {

            toastAlert('上传图片接口失败!')
            return
          }
          let imgUrlArr = that.data.imgUrl;
          imgUrlArr.push(resData.pictureId)

          that.setData({
            imgUrl: imgUrlArr
          }, () => {
            // 成功回调后调用
            if (that.data.picList.length == that.data.imgUrl.length) {
              resolve(res)
            }
          })
        })
      }
    })
  },
  //违章拍照
  addPic() {
    let that = this;
    if (this.data.picList.length >= 4) {

      toastAlert('最多上传4张!')
      return;
    }
    wx.chooseImage({
      count: 4 - that.data.picList.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        let picListArr = that.data.picList;
        picListArr.push(...tempFilePaths)
        that.setData({
          picList: picListArr
        })
      }
    })
  },
})