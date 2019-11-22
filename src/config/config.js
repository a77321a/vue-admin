/*
 * @Descripttion:枚举值
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-22 22:19:42
 */
const config = {
  activityStatus: [
    { dictionaryValue: 0, dictionaryLabel: '即将开始' },
    { dictionaryValue: 1, dictionaryLabel: '进行中' },
    { dictionaryValue: 2, dictionaryLabel: '已结束' },
    { dictionaryValue: 3, dictionaryLabel: '已总结' }
  ],
  seasonStatus: [
    { dictionaryValue: 'spring', dictionaryLabel: '春季' },
    { dictionaryValue: 'summer', dictionaryLabel: '夏季' },
    { dictionaryValue: 'autumn', dictionaryLabel: '秋季' },
    { dictionaryValue: 'winter', dictionaryLabel: '冬季' }
  ],
  systemConfig: [
    { dictionaryValue: 'http://118.24.54.72/uploads/', dictionaryLabel: '图片域名' }
  ],
  foodType: [
    { dictionaryValue: 'dinner', dictionaryLabel: '主食' },
    { dictionaryValue: 'dim_sum', dictionaryLabel: '点心' },
    { dictionaryValue: 'cooked_wheaten', dictionaryLabel: '面食' },
    { dictionaryValue: 'soup', dictionaryLabel: '汤' }
  ],
  position: [
    { dictionaryValue: 'cook', dictionaryLabel: '厨师' },
    { dictionaryValue: 'master', dictionaryLabel: '负责人' }
  ],
  orgType: [
    { dictionaryValue: 'service', dictionaryLabel: '服务机构' },
    { dictionaryValue: 'manage', dictionaryLabel: '管理机构' }
  ],
  operationModeList: [
    { dictionaryValue: 'society', dictionaryLabel: '社会化运营' },
    { dictionaryValue: 'related', dictionaryLabel: '涉老机构' }
  ],
  serviceType: [
    { dictionaryValue: 'xfy', dictionaryLabel: '幸福苑' },
    { dictionaryValue: 'rjzlzx', dictionaryLabel: '日间照料中心' },
    { dictionaryValue: 'lnhds', dictionaryLabel: '老年活动室' },
    { dictionaryValue: 'zcd', dictionaryLabel: '助餐点' }
  ],
  pensionModeList: [
    { dictionaryValue: 'home', dictionaryLabel: '居家养老' }
  ],
  pensionServiceList: [
    { dictionaryValue: 'a', dictionaryLabel: '养老服务A' },
    { dictionaryValue: 'b', dictionaryLabel: '养老服务B' }
  ],
  govBuyTypeList: [
    { dictionaryValue: 'a', dictionaryLabel: '购买类型A' },
    { dictionaryValue: 'b', dictionaryLabel: '购买类型B' }
  ],
  pensionTypeList: [
    { dictionaryValue: 'a', dictionaryLabel: '老人类别A' },
    { dictionaryValue: 'b', dictionaryLabel: '老人类别B' }
  ],
  hobbyList: [
    { dictionaryValue: 'fishing', dictionaryLabel: '钓鱼' },
    { dictionaryValue: 'card', dictionaryLabel: '打牌' }
  ]
}

export default config
