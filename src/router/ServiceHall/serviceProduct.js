/*
 * @Descripttion:服务产品
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-06 21:44:36
 */
export default [
  {
    path: 'serviceProduct',
    name: 'serviceProduct',
    component: () => import('@/views/ServiceHall/ServiceProduct/serviceProduct.vue'),
    meta: {
      title: '服务产品',
      root: true
    }
  },
  {
    path: 'serviceType',
    name: 'serviceType',
    component: () => import('@/views/ServiceHall/ServiceProduct/serviceType.vue'),
    meta: {
      title: '服务类型',
      root: true
    }
  }
]
