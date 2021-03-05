// 状态管理器
const globalData = {
  title:'测试公用变量'
}

// 弹出框
const showPopUp = (object) => {
  // 提示框 mode=alert title:显示内容 icon:提示状态(success:成功 error:错误 loading:加载中 none:不显示图标) duration:持续时间
  if(object.mode == 'alert'){
    wx.showToast({
      title:object.title,
      icon:object.icon,
      duration:object.duration
    })
  }
  // 确认框 mode=confirm title:标题 content:内容 confirmFunction:确认回调 cancel:取消回调
  else if(object.mode == 'confirm'){
    wx.showModal({
      title:object.title,
      content:object.content,
      success:(res) => {
        if(res.confirm){
          object.confirmCallback()
        }else if(res.cancel){
          object.cancelCallback()
        }
      }
    })
  }
  // 加载框 mode=loading title:显示内容 hideFunction:隐藏后回调 duration:持续时间
  else if(object.mode == 'loading'){
    wx.showLoading({
      title:object.title,
    })
    setTimeout(() => {
      wx.hideLoading({
        success:(res) => {
          object.hideCallback()
        }
      })
    },object.duration)
  }
}

// 获取用户信息
const getUserInformation = (object) => {
  return new Promise((resolve,reject) => {
    // 获取位置信息 mode=location
    if(object.mode == 'location'){
      wx.getLocation({
        success:(res) => {
          resolve(res)
        },
        fail:(res) => {
          showPopUp({
            mode:'confirm',
            title:'温馨提示',
            content:'小程序已经被禁止获取您的位置信息，点击确定手动设置',
            confirmCallback:() => {
              wx.openSetting()
            },
            cancelCallback:() => {

            }
          })
        }
      })
    }
    // 获取底层信息 mode=openid
    else if(object.mode == 'openid'){
      wx.login({
        success:(res) => {
          wx.request({
            url:'https://api.weixin.qq.com/sns/jscode2session?appid=wx7c5032248a9c9f80&secret=12a93f2235e049996536b55fef588a92&js_code=' + res.code + '&grant_type=authorization_code',
            success:(res) => {
              resolve(res)
            }
          })
        },
        fail:(res) => {
          console.log(res)
        }
      })
    }
    // 获取公开信息 mode=info
    else if(object.mode == 'info'){
      wx.getUserInfo({
        success:(res) => {
          resolve(res)
        },
        fail:(res) => {
          showPopUp({
            mode:'confirm',
            title:'温馨提示',
            content:'小程序已经被禁止获取您的用户信息，点击确定手动设置',
            confirmCallback:() => {
              wx.openSetting()
            },
            cancelCallback:() => {
              
            }
          })
        }
      })
    }
  })
}
  
module.exports = {
  globalData,
  showPopUp,
  getUserInformation
}