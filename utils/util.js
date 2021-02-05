// 时间控件
const formatTime = (date, dateFormat) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds();
  let firstArr = [];
  let lastArr = [];
  let formatBool = formatDate(dateFormat)
  if (formatBool.firstBool) {
    formatBool.firstVal.split('-').map(val => {
      switch (val) {
        case 'yyyy':
          firstArr.push(year);
          break;
        case 'mm':
          firstArr.push(month);
          break;
        case 'dd':
          firstArr.push(day);
          break;
      }
    })
  }
  if (formatBool.lastBool) {
    formatBool.lastVal.split(':').map(val => {
      switch (val) {
        case 'hh':
          lastArr.push(hour);
          break;
        case 'mm':
          lastArr.push(minute);
          break;
        case 'ss':
          lastArr.push(second);
          break;
      }
    })
  }

  return firstArr.map(formatNumber).join('-') + ' ' + lastArr.map(formatNumber).join(':')
}

const formatDate = val => {
  const valArr = val.split(' ');
  let fotmatBool = {
    firstBool: false,
    lastBool: false,
    firstVal: '',
    lastVal: ''
  }
  valArr.map((item) => {
    //如果包含- 则前半部分需要
    if (item.includes('-')) {
      fotmatBool.firstBool = true;
      fotmatBool.firstVal = item
    }
    //如果包含: 则后半部分需要
    if (item.includes(':')) {
      fotmatBool.lastBool = true;
      fotmatBool.lastVal = item
    }

  })
  return fotmatBool
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 违章类型
const typeFn = data => {
  let typeName = '';
  switch (data) {
    case '1':
      typeName = '乱设摊';
      break;
    case '2':
      typeName = '乱堆放';
      break;
    case '3':
      typeName = '乱停车';
      break;
    case '4':
      typeName = '乱晾晒';
      break;
    case '5':
      typeName = '乱张贴';
      break;
    case '6':
      typeName = '乱搭建';
      break;
    case '7':
      typeName = '跨门经营';
      break;
  }
  return typeName
}

// const showMyInfo = (contant, time, success) => {
//   wx.showToast({
//     title: contant,
//     icon: success ? 'succes' : 'loading',
//     duration: time,
//     mask: true
//   });
// }
// const showMyInfoBack = (contant, time, success) => {
//   wx.showToast({
//     title: contant,
//     icon: success ? 'succes' : 'loading',
//     duration: time,
//     mask: true
//   });
//   wx.navigateBack({
//     delta: 1,
//   })
// }
const toastMessage = (content, cb) => {
  wx.showModal({
    title: '提示',
    content: content,
    showCancel: false,
    success: function(res) {
      cb && cb()
    }
  })
}
const toastAlert = (content)=>{
  wx.showToast({
    title: content,
    icon: 'none'
  })
}
module.exports = {
  formatTime: formatTime, //日期格式化
  typeFn: typeFn, //违章类型格式化
  toastMessage: toastMessage,//提示弹框
  toastAlert: toastAlert//弹框
}