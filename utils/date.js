const newDate = new Date()
const formatTime = (obj) => {
  let tempObj = ''
  tempObj = obj <= 9 ? '0' + obj : obj
  return tempObj
}
const formatDate = (obj) => {
  let tempObj = ''
  switch(obj){
    case 0:
      tempObj = '星期日'
      break
    case 1:
      tempObj = '星期一'
      break
    case 2:
      tempObj = '星期二'
      break
    case 3:
      tempObj = '星期三'
      break
    case 4:
      tempObj = '星期四'
      break
    case 5:
      tempObj = '星期五'
      break
    case 6:
      tempObj = '星期六'
      break
  }
  return tempObj
}
let currentYear = newDate.getFullYear()
let currentMonth = formatTime(newDate.getMonth() + 1)
let currentDay = formatTime(newDate.getDay())
let currentHour = formatTime(newDate.getHours())
let currentMinute = formatTime(newDate.getMinutes())
let currentSecond = formatTime(newDate.getSeconds())
let currentDate = formatDate(newDate.getDate())
let currentFullDay = currentYear + '-' + currentMonth + '-' + currentDay
let currentFullTime = currentHour + ':' + currentMinute + ':' + currentSecond
let currentFullDate = currentYear + '-' + currentMonth + '-' + currentDay + ' ' + currentDate
let currentAllTime = currentYear + '-' + currentMonth + '-' + currentDay + ' ' + currentHour + ':' + currentMinute + ':' + currentSecond + ' ' + currentDate
let currentTimeToMinute = currentHour + ':' + currentMinute
let currentDayToMinute = currentYear + '-' + currentMonth + '-' + currentDay + ' ' + currentHour + ':' + currentMinute

module.exports = {
  currentYear, // 年
  currentMonth, // 月
  currentDay, // 日
  currentHour, // 时
  currentMinute, // 分
  currentSecond, // 秒
  currentDate, // 星期
  currentFullDay, // 年-月-日
  currentFullTime, // 时:分:秒
  currentFullDate, // 年-月-日 星期
  currentAllTime, // 年-月-日 时:分:秒 星期
  currentTimeToMinute, // 时:分
  currentDayToMinute // 年-月-日 时:分
}