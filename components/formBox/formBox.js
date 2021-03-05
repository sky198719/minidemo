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
    // 是否显示label
    labelShow:{
      type:Boolean,
      value:''
    },
    // input类型 text:文本 password:密码 number:数字 selector:文本下拉框 data:日期下拉框 time:时间下拉框
    mode:{
      type:String,
      value:''
    },
    // 回吐值
    value:{
      type:String,
      value:''
    },
    // 时下拉框范围 picker=selector时有效
    range:{
      type:Array,
      value:[]
    },
    // placeholder值 mode=test mode=password mode=number时有效
    placeholder:{
      type:String,
      value:''
    }
  },
  methods:{
    // 监听input值变化
    postEvent(e){
      this.triggerEvent('listenEvent',e.detail.value)
    }
  }
})