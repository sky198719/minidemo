const app = getApp()
const {
  formatTime,
  toastMessage,
  toastAlert
} = require('../../utils/util.js');
Page({
  data: {
    decInfo: '',
    picList: [],
    imgUrl: [],
    state: null, //状态
    workId: '', //工单ID
    type: null //处理类型
  },
  onShow() {
    this.setData({
      personJson: wx.getStorageSync('personJson')
    })
  },
  onLoad(opt) {

    //设置工单id
    this.setData({
      workId: opt.workId,
      state: opt.state, //工单状态
      type: opt.type //工单权限
    })
  },

  //上传图片API
  chooseImage() {
    let that = this;
    let typeNum = this.data.type; //传进来的事件类型
    return new Promise((resolve, reject) => {
      // type ==0管理员处理 误报工单 
      // type ==1管理员处理 确认工单
      // type ==2管理员处理 审核工单通过
      // type ==3管理员处理 审核工单不通过
      // type ==7城管处理 处罚工单
      if (typeNum == 0 || typeNum == 1 || typeNum == 2 || typeNum == 3 || typeNum == 7) {
        resolve()
        return
      }
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
  //整改照片
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
  //整改描述
  decInfo(e) {
    this.setData({
      decInfo: e.detail.value
    })
  },
  // 验证
  checkFn() {
    //7 城管角色处罚 可以不用上传图片
    //2 管理员 审核确认 可以不用上传图片
    let typeBool = this.data.type
    if (typeBool != 1 && typeBool != 0 && typeBool != 2 && typeBool != 7 && typeBool != 3 && (this.data.picList.length < 2 || this.data.picList.length > 4)) {
      toastAlert('整改照片请上传2-4张!')

      return false;
    }
    if (this.data.decInfo === '') {

      toastAlert('请填写描述信息!')
      return false;
    }
    return true;
  },
  //单独的特保处罚接口
  punishSubmit() {
    this.rectifyDetailSubmit('6');
  },
  //判断请求接口
  apiUrl(punish) {
    //type类型
    // 0 待确认误报
    // 1 待确认确认
    // 2 待审核确认完成
    // 3 待审核 再次确认
    // 4 商户提交处理接口
    // 5 特保提交处理接口
    // 6 特保人员提交处罚接口 
    //7 城管处理处罚完毕
    let typeSend = punish == '6' ? punish : this.data.type;
    let urlData = '';
    switch (typeSend) {
      case '0':
        urlData = 'content/closeWork';
        break;
      case '1':
        urlData = 'content/confirmWork';
        break;
      case '2':
        urlData = 'content/closeWork';
        break;
      case '3':
        urlData = 'content/returnWork';
        break;
      case '4':
        urlData = 'content/shopWork';
        break;
      case '5':
        urlData = 'content/processWork';
        break;
      case '6':
        urlData = 'content/punishWork';
        break;
      case '7':
        urlData = 'content/closeWork';
        break;
    }
    return urlData
  },
  //提交
  rectifyDetailSubmit(punish) {
    this.setData({
      imgUrl: []
    })
    if (!this.checkFn()) {
      return;
    }
    wx.showLoading({
      title: '上传中',
    })

    let path = this.apiUrl(punish)
    this.chooseImage().then((res) => {
      const time = formatTime(new Date(), 'yyyy-mm-dd hh:mm');
      let dataJson = {
        workId: this.data.workId,
        userId: this.data.personJson.personId,
        vehicleId: '',
        userName: this.data.personJson.personName,
        imgUrl: this.data.imgUrl,
        desp: this.data.decInfo,
        time: time,
        // status: 2,
        remark: ''
      }
      //不同状态请求不同接口
      app.res.req(path, dataJson, (res) => {
        wx.hideLoading()
        if (res.resCode === '0000') {
          toastAlert(res.resMsg)
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 500)

        } else {
          toastMessage(JSON.stringify(res.resMsg))
        }
      })
    })

  }
})