const global = require('../../utils/global.js')
const date = require('../../utils/date.js')

Page({
  data:{
    inputTextData:'', // 文本框数据
    inputPasswordData:'', // 密码框数据
    inputNumberData:'', // 数字框数据
    pickerSelectorRange:['选项一','选项二','选项三','选项四','选项五'], // 文本选择器范围
    pickerSelectorData:'请选择', // 文本选择器数据
    pickerDateData:date.currentFullDay, // 日期选择器当前日期
    pickerTimeData:date.currentTimeToMinute, // 时间选择器当前时间
    takePhotoData:[], // 拍照图片列表
    choosePhotoData:[], // 选择图片列表
    takeVideoData:'', // 拍摄录像数据
    chooseVideoData:'', // 选择录像数据
    scanData:'', // 扫一扫数据
    userLocationData:'', // 用户位置信息
    userOpenidData:'', // 用户openid
    userInfoData:'' // 用户公开信息
  },
  onLoad(){
    // 公用变量存储
    console.log(global.globalData.title)
  },
  // 监听文本框值
  listenInputTextChange(e){
    this.setData({
      inputTextData:e.detail
    })
    console.log(this.data.inputTextData)
  },
  // 监听密码框值
  listenInputPasswordChange(e){
    this.setData({
      inputPasswordData:e.detail
    })
    console.log(this.data.inputPasswordData)
  },
  // 监听数字框值
  listenInputNumberChange(e){
    this.setData({
      inputNumberData:e.detail
    })
    console.log(this.data.inputNumberData)
  },
  // 监听文本下拉框值
  listenPickerSelectorChange(e){
    this.setData({
      pickerSelectorData:this.data.pickerSelectorRange[e.detail]
    })
    console.log(this.data.pickerSelectorData)
  },
  // 监听日期下拉框值
  listenPickerDateChange(e){
    this.setData({
      pickerDateData:e.detail
    })
    console.log(this.data.pickerDateData)
  },
  // 监听时间下拉框值
  listenPickerTimeChange(e){
    this.setData({
      pickerTimeData:e.detail
    })
    console.log(this.data.pickerTimeData)
  },
  // 监听拍照数据
  listenTakePhotoData(e){
    this.setData({
      takePhotoData:e.detail
    })
    console.log(this.data.takePhotoData)
  },
  // 监听选择照片数据
  listenChoosePhotoData(e){
    this.setData({
      choosePhotoData:e.detail
    })
    console.log(this.data.choosePhotoData)
  },
  // 监听录像数据
  listenTakeVideoData(e){
    this.setData({
      takeVideoData:e.detail
    })
    console.log(this.data.takeVideoData)
  },
  // 监听选择录像数据
  listenChooseVideoData(e){
    this.setData({
      chooseVideoData:e.detail
    })
    console.log(this.data.chooseVideoData)
  },
  // 监听扫一扫值
  listenScanData(e){
    this.setData({
      scanData:e.detail
    })
    console.log(this.data.scanData)
  },
  // 监听用户位置信息
  listenUserLocationData(e){
    this.setData({
      userLocationData:e.detail
    })
    console.log(this.data.userLocationData)
  },
  // 监听用户openid
  listenUserOpenidData(e){
    this.setData({
      userOpenidData:e.detail
    })
    console.log(this.data.userOpenidData)
  },
  // 监听用户公开信息
  listenUserInfoData(e){
    this.setData({
      userInfoData:e.detail
    })
    console.log(this.data.userInfoData)
  },
  // 显示提示框
  showAlert(){
    global.showPopUp({
      mode:'alert',
      title:'提示框文案',
      icon:'none',
      duration:1000
    })
  },
  // 显示确认框
  showConfirm(){
    global.showPopUp({
      mode:'confirm',
      title:'确认框标题',
      content:'确认框正文',
      confirmCallback:() => {
        global.showPopUp({
          mode:'alert',
          title:'确认',
          icon:'none',
          duration:1000
        })
      },
      cancelCallback:() => {
        global.showPopUp({
          mode:'alert',
          title:'取消',
          icon:'none',
          duration:1000
        })
      }
    })
  },
  // 显示加载框
  showLoading(){
    global.showPopUp({
      mode:'loading',
      title:'加载中文案',
      duration:1000,
      hideCallback:() => {
        global.showPopUp({
          mode:'alert',
          title:'加载框已隐藏',
          icon:'none',
          duration:1000
        })
      }
    })
  },
  // 获取用户位置信息
  getUserLocation(){
    global.getUserInformation({mode:'location'})
    .then((res) => {
      this.setData({
        userLocationData:res
      })
      console.log(this.data.userLocationData)
    })
  },
  // 获取用户公开信息
  getUserInfor(){
    global.getUserInformation({mode:'info'})
    .then((res) => {
      this.setData({
        userInfoData:res
      })
      console.log(this.data.userInfoData)
    })
  },
  // 获取用户openid
  getUserOpenid(){
    global.getUserInformation({mode:'openid'})
    .then((res) => {
      this.setData({
        userOpenidData:res
      })
      console.log(this.data.userOpenidData)
    })
  }
})