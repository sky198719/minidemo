// 逻辑
// 通过工单状态state判断显示
// state : 
// 1 为商户待处理状态 显示立即处理
// 2 为待确认状态 显示确认 和 误报
// 3 为关闭状态  显示关闭
// 4 为特保待处理状态 显示立即处理
// 5 为待处罚 显示立即处理
// 6 为待审核  显示确认完成和需再次确认

// 通过自定义type判断处理页面的接口
// type:
// 0 管理员处理 待确认误报
// 1 管理员处理 待确认确认
// 2 管理员处理 待审核确认完成
// 3 管理员处理 待审核 再次确认
// 4 商户处理 处理工单
// 5 特保处理 处理工单
// 6 城管人员处理 处罚工单 





Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //工单ID
    alertWorkId: {
      type: Number
    },
    //弹框数据
    alertData: {
      type: Object
    },


    //弹框开关状态
    alertState: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  observers: {
    'alertData': function(val) {
      // 在 numberA 或者 numberB 被设置时，执行这个函数
      // console.log(val)
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {},
    ready() {},
    moved: function() {},
    detached: function() {},
  },
  /**
   * 组件的方法列表type
   * 0 管理员处理 待确认误报
   * 1 管理员处理 待确认确认
   * 2 管理员处理 待审核确认完成(通过)
   * 3 管理员处理 待审核 再次确认(不通过)
   * 4 商户处理 处理工单
   * 5 特保处理 处理工单
   * 6 城管人员处理 处罚工单 
   */
  methods: {
    //待确认 确认
    confirmFn() {
      this.handleFn(1)
    },
    //待确认 误报
    cancelFn() {
      this.handleFn(0)
    },
    //审核 确认完成
    confirmOverFn() {
      this.handleFn(2)
    },

    //需再次确认 
    againConfirmFn() {
      this.handleFn(3)
    },

    //商户和特保待处理立即处理
    handle() {
      let that = this;
      wx.getStorage({
        key: 'personJson',
        success(res) {
          //判断是商户还是特保
          if (res.data.roleType == '2') {
            //特保处理完成
            that.handleFn(5)
          } else if (res.data.roleType == '3') {
            // 商户处理完毕
            that.handleFn(4)
          } else if (res.data.roleType == '4'){
            //城管处理处罚
            that.handleFn(7)
          }
        }
      })

    },

    handleFn(opt) {
      const workId = this.data.alertWorkId; //工单号
      const stateType = this.data.alertData.state
      const handleType = opt; //处理类型
      this.setData({
        alertState: false
      })
      wx.navigateTo({
        url: `../rectifyDetail/rectifyDetail?workId=${workId}&state=${stateType}&type=${handleType}`
      })
    },
    //关闭  跳转到工作台
    closeFn() {

      this.setData({
        alertState: false
      })
    },
    //关闭详情
    closeAlert() {
      this.setData({
        alertState: false
      })
    }
  }
})