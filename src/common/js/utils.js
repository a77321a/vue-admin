/*
 * @Descripttion: 枚举值返回label
 * @Author:
 * @Date: 2019-11-19 21:09:55
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-30 16:40:06
 */
const func = {
  baseUrl: 'http://118.24.54.72:8061/',
  transLabel: (arr, str) => {
    if (arr.length === 0) return
    for (let i in arr) {
      if (arr[i].dictionaryValue == str) {
        return arr[i].dictionaryLabel
      }
    }
    return '--'
  },
  getWeek: (dt) => {
    let d1 = new Date(dt)
    let d2 = new Date(dt)
    d2.setMonth(0)
    d2.setDate(1)
    let rq = d1 - d2
    let days = Math.ceil(rq / (24 * 60 * 60 * 1000))
    let num = Math.ceil(days / 7)
    return num
  },
  getNowDateAndNowWeek: (time) => {
    // 选中的时间戳
    var timestamp = new Date(time).getTime()
    var serverDate = new Date(time)

    // 本周周日的的时间
    var sundayTiem = timestamp + ((7 - serverDate.getDay()) * 24 * 60 * 60 * 1000)
    var SundayData = new Date(sundayTiem)
    // 年
    var tomorrowY = SundayData.getFullYear()
    // 月
    var tomorrowM = (SundayData.getMonth() + 1 < 10 ? '0' + (SundayData.getMonth() + 1) : SundayData.getMonth() + 1)
    // 日
    var tomorrowD = SundayData.getDate() < 10 ? '0' + SundayData.getDate() : SundayData.getDate()

    // 本周周一的时间
    var mondayTime = timestamp - ((serverDate.getDay() - 1) * 24 * 60 * 60 * 1000)
    var mondayData = new Date(mondayTime)
    // 年
    var mondayY = mondayData.getFullYear()
    // 月
    var mondayM = (mondayData.getMonth() + 1 < 10 ? '0' + (mondayData.getMonth() + 1) : mondayData.getMonth() + 1)
    // 日
    var mondayD = mondayData.getDate() < 10 ? '0' + mondayData.getDate() : mondayData.getDate()
    // 输出值
    var config = {
      SunDay: tomorrowY + '-' + tomorrowM + '-' + tomorrowD + ' 00:00:00',
      Monday: mondayY + '-' + mondayM + '-' + mondayD + ' 00:00:00'
    }
    return config
  }
}

export default func
