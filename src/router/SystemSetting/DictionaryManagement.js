/*
 * @Descripttion:字典管理
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-06 22:48:30
 */
export default [
  {
    path: 'dictionaryConfig',
    name: 'dictionaryConfig',
    component: () => import('@/views/SystemSetting/DictionaryManagement/dictionaryConfig.vue'),
    meta: {
      title: '字典配置',
      root: true
    }
  }

]
