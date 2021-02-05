// 权限
// 1 管理员  只能处理待确认工单，和待审核两个状态的工单
// 2 特保 只能新增工单  处理待处理的工单
// 3 商户 只能处理待处理的工单
// 4 城管 只能处理处罚的工单

 



//app.js
let {
  http,
  webpath,
  fileUrl,
  toastMessage,
  toastAlert
} = require('utils/http.js')
App({
  globalData: {
    userInfo: null, //用户微信个人信息
    openId: '', //openid
    loginType: null, //登录类型
    webpath: webpath, //公共域名地址路径
    timer:null,//未读消息小红点定时器
    //用户角色信息
    personJson: {
      personId: null, //用户ID
      personName: null, //用户姓名
      personPhone: null, //用户手机号
      roleType: null, //用户权限类型
      disorderList: null, //用户对应的乱点
      menuList: null //用户可以看到的菜单
    }
  },
  //封装请求
  res: {
    req: http //这里配置我们需要的方法
  },
  onLaunch: function() {
    // 登录
    this.login();
  },
  //查询待办消息数量
  scanCartFn(){
    let dataJson = {
      phone:wx.getStorageSync('personJson').personPhone
    }
    this.res.req('content/getNumber',dataJson,(res)=>{
      if (res.resCode && res.resCode === '0000') {
        wx.setTabBarBadge({ //购物车不为空 ，给购物车的tabar右上角添加购物车数量标志
          index: 0,						//标志添加位置
          text: '99'				//通过编译，将购物车总数量放到这里
        })
      }else{
        toastAlert(JSON.stringify(res.message))
      }
     
    })
    
  },
  //图片上传
  uploadFile(picList, cb) {
    wx.uploadFile({
      url: this.globalData.webpath + 'content/uploadImage',
      filePath: picList,
      header:{
        token:123
      },
      name: 'file',
      success(res) {
        cb && cb(res)
      },
      fail: function(err) {
        toastAlert('上传图片接口失败')
      }
    })
  },
  //获取微信用户信息
  getUserInfo() {
    return new Promise((rsolve, reject) => {
      wx.getUserInfo({
        success: res => {
          this.globalData.userInfo = res.userInfo
          rsolve(res.userInfo)
        }
      })
    })
  },
  //登陆获取openId
  login: function() {
    let that = this;
    wx.showLoading({
      title: '',
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = {
          code: res.code
        };
        http('api/weixin/getOpenId', code, (resp) => {
          // console.log(resp.result.openid)
          if (resp.result) {
            that.globalData.openId = resp.result.openid
            that.globalData.loginType = resp.result.loginType
          } else {
            toastMessage(JSON.stringify(resp))
          }
        })
       
      }
    })
  },
  //图片路径更换
  formatFilePath(path){
    
    return `${fileUrl}${path}`
  }
})