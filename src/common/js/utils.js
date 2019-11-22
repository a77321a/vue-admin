/*
 * @Descripttion: 枚举值返回label
 * @Author:
 * @Date: 2019-11-19 21:09:55
 * @LastEditors:
 * @LastEditTime: 2019-11-22 21:24:14
 */
const func = {
  transLabel: (arr, str) => {
    if (arr.length === 0) return
    for (let i in arr) {
      if (arr[i].dictionaryValue === str) {
        return arr[i].dictionaryLabel
      }
    }
    return '--'
  }
}

export default func
