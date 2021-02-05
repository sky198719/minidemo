const {
  toastAlert
} = require('./util.js')
// let sUrl = "http://192.168.255.1:8564/smartcity-chengguan/"; //本地环境
let sUrl = "http://10.8.171.66:8088/smartcity-chengguan/"; //新测试环境
let fileUrl = 'http://10.8.171.66:8088'
// let sUrl = 'http://112.64.178.196:8088/streets/smartcity-chengguan/'//原测试接口
function getData(url, data, nb) {
  wx.showLoading({
    title: '',
  })
  wx.request({
    url: sUrl + url,
    data: data,
    method: 'POST',
    header: {
      // "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/x-www-form-urlencoded", //POST请求的时候这样写
      'token': 123
    },
    success: function(res) {
      wx.hideLoading()
      if (res.statusCode !== 200) {
        toastAlert('接口数据失败' + res.statusCode)
      }
      return typeof nb == "function" && nb(res.data)
    },
    fail: function(res) {
      wx.hideLoading()
      toastAlert('接口数据失败' + res.statusCode)
      return typeof nb == "function" && nb(res.data)
    },
    complete: function() {}
  })
}
module.exports = {
  http: getData,
  webpath: sUrl,
  fileUrl: fileUrl
}