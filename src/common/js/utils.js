/*
 * @Descripttion: 枚举值返回label
 * @Author:
 * @Date: 2019-11-19 21:09:55
 * @LastEditors:
 * @LastEditTime: 2019-12-03 11:28:54
 */
const func = {
  baseUrl: 'http://118.24.54.72:8061/',
  transLabel: (arr, str) => {
    if (arr.length === 0) return
    for (let i in arr) {
      if (arr[i].dictionaryValue === str) {
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
  }
}

export default func
