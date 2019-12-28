/*
 * @Descripttion: 枚举值返回label
 * @Author:
 * @Date: 2019-11-19 21:09:55
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-28 09:38:26
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

  getWeek: (src) => {
    let isDate = (date) => {
      if (date === null || date === undefined) return false
      if (isNaN(new Date(date).getTime())) return false
      if (Array.isArray(date)) return false // deal with `new Date([ new Date() ]) -> new Date()`
      return true
    }
    if (!isDate(src)) return null
    const date = new Date(src.getTime())
    date.setHours(0, 0, 0, 0)
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4)
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
  }
  // getWeek: (dt) => {
  //   let d1 = new Date(dt)
  //   let d2 = new Date(dt)
  //   d2.setMonth(0)
  //   d2.setDate(1)
  //   let rq = d1 - d2
  //   let days = Math.ceil(rq / (24 * 60 * 60 * 1000))
  //   let num = Math.ceil(days / 7)
  //   return num
  // }
}

export default func
