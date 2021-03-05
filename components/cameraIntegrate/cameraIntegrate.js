const global = require('../../utils/global.js')

Component({
  properties:{
    // id
    id:{
      type:String,
      value:''
    },
    // label名称
    labelName:{
      type:String,
      value:''
    },
    // 拍摄类型 image:图片 video:视频 scan:扫一扫
    mode:{
      type:String,
      value:''
    },
    // 摄像头方向 mode=video时有效
    camera:{
      type:String,
      value:''
    },
    // 呼出类型
    sourceType:{
      type:String,
      value:''
    },
    // 选择照片数量
    count:{
      type:String,
      value:''
    }
  },
  methods:{
    // 监听图片列表和视频变化
    postEvent(){
      if(this.properties.mode == 'image'){
        wx.chooseImage({
          count:this.properties.count,
          sourceType:[this.properties.sourceType],
          success:(res) => {
            this.triggerEvent('listenEvent',res)
          }
        })
      }else if(this.properties.mode == 'video'){
        wx.chooseVideo({
          sourceType:[this.properties.sourceType],
          camera:this.properties.camera,
          success:(res) => {
            this.triggerEvent('listenEvent',res)
          }
        })
      }else if(this.properties.mode == 'scan'){
        wx.scanCode({
          success:(res) => {
            this.triggerEvent('listenEvent',res)
          }
        })
      }
    }
  }
})