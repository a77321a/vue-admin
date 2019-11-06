/*
 * @Descripttion:服务管理
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-06 17:41:30
 */
export default [
  {
    path: 'serviceCenter',
    name: 'serviceCenter',
    component: () => import('@/views/ServiceHall/ServiceManage/serviceCenter.vue'),
    meta: {
      title: '服务中心',
      root: true
    }
  },
  {
    path: 'serviceUser',
    name: 'serviceUser',
    component: () => import('@/views/ServiceHall/ServiceManage/serviceUser.vue'),
    meta: {
      title: '服务人员',
      root: true
    }
  }
]
