const app = getApp()
const {
  formatTime,
  toastMessage,
  toastAlert
} = require('../../utils/util.js')
Page({
  data: {
    lon: '', //经度
    lat: '', //纬度
    picList: [], //考勤照片
    imgUrl: [], //图片ID
    userName: null, //姓名
    personPhone: null, //电话
    userLocation: '', //地点
    time: null, //时间
    remark: '', //备注
    // timer:null,
    // count:0
  },
  onLoad() {

    // this.data.timer = setInterval(()=>{
    //   this.getLocatiohnFn()
    // },5000)
    let dateTime = formatTime(new Date(), 'yyyy-mm-dd hh:mm:ss'); //年月日
    this.setData({
      userName: wx.getStorageSync('personJson').personName,
      personPhone: wx.getStorageSync('personJson').personPhone,
      time: dateTime
    })
    this.getLocatiohnFn(); //获取考勤地点
  },
  //上传图片API
  chooseImage() {
    let that = this;
    return new Promise((resolve, reject) => {
      //遍历临时图片地址转为图片ID
      for (let i = 0; i < that.data.picList.length; i++) {
        app.uploadFile(this.data.picList[i], (res) => {
          let resData = JSON.parse(res.data);
          if (resData.code && resData.code != '0000') {
            toastAlert('上传图片接口失败')
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
  //获取考勤地点
  getLocatiohnFn() {
    let that = this;
    wx.getLocation({
      success: function(res) {
        //逆解析
        wx.request({
          url: `https://api.map.baidu.com/geocoder/v2/?ak=WcbpCI46nm8taXRifjnIGsyCTbX9GKMf&location=${res.latitude},${res.longitude}&output=json&coordtype=wgs84ll`,
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success(resp) {
            // that.data.count++
            // toastAlert(resp.data.result.formatted_address +'====='+that.data.count)
            that.setData({
              lon: res.longitude,
              lat: res.latitude,
              userLocation: resp.data.result.formatted_address
            })

          }
        })
      },
    })
  },
  // 校验
  checkFn() {
    if (this.data.userName === '') {

      toastAlert('姓名获取失败!')
      return false;
    }
    if (this.data.userLocation === '') {

      toastAlert('考勤地点获取失败!')
      return false;
    }
    if (this.data.time === '') {

      toastAlert('考勤时间获取失败!')
      return false;
    }
    if (this.data.picList.length < 2 || this.data.picList.length > 4) {

      toastAlert('考勤照片请上传2-4张!')
      return false;
    }
    return true;
  },
  //提交
  rectifyDetailSubmit() {
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
      const dataJson = {
        'userPhone': this.data.personPhone,
        'location': this.data.userLocation,
        'lon': this.data.lon,
        'lat': this.data.lat,
        'createTime': this.data.time,
        'imgUrl': this.data.imgUrl,
        'remark': this.data.remark,
      }
      app.res.req('content/update', dataJson, (res) => {
        wx.hideLoading()
        let appData = app.globalData.personJson;
        if (res.resCode && res.resCode === '0000') {
          toastMessage(res.resMsg)
          setTimeout(() => {
            wx.switchTab({
              url: '../user/user',
            })
          }, 500)

        } else {

          toastMessage(res.resMsg)
        }
      })
    })
  },
  // 获取备注
  getRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  //考勤时间
  setTime: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  //考勤拍照
  addPic() {
    let that = this;
    if (this.data.picList.length >= 4) {
      toastAlert('最多上传4张')
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