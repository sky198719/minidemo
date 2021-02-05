const app = getApp()

Page({
  data:{
    pendingDetailData:{
      title:'mock商户',
      time:'2020-12-11 12:33:44',
      type:'mock违章类型',
      img1:'http://image.yukei.vip/Upload_IMG/0//date_20190716/ys201907161563255751959437.jpg',
      img2:'http://image.yukei.vip/Upload_IMG/0//date_20190716/ys201907161563255751959437.jpg',
      desc:'mock违章描述',
      suggest:'mock处理意见'
    },
    id:''
  },
  rectify:function(){
    wx.navigateTo({
      url: '../rectifyDetail/rectifyDetail?id=' + this.id,
    })
  },
  onLoad: function (options){
    this.id = options.id
  }
})