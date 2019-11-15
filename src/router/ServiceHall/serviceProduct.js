/*
 * @Descripttion:服务产品
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-15 22:45:26
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
  },
  {
    path: 'editServiceType',
    name: 'editServiceType',
    component: () => import('@/views/ServiceHall/ServiceProduct/editServiceType.vue'),
    meta: {
      title: '新增/编辑服务类型',
      parent: 'serviceType'
    }
  }
]
