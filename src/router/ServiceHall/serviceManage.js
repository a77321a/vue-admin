/*
 * @Descripttion:服务管理
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-16 20:06:27
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
  },
  {
    path: 'editServiceUser',
    name: 'editServiceUser',
    component: () => import('@/views/ServiceHall/ServiceManage/editServiceUser.vue'),
    meta: {
      title: '新增/编辑服务人员',
      parent: 'serviceUser'
    }
  },
  {
    path: 'editServiceCenter',
    name: 'editServiceCenter',
    component: () => import('@/views/ServiceHall/ServiceManage/editServiceCenter.vue'),
    meta: {
      title: '新增/编辑服务信息',
      parent: 'serviceCenter'
    }
  }
]
