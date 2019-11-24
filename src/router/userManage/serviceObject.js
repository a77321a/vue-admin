/*
 * @Descripttion:服务对象
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-24 15:27:58
 */
export default [
  {
    path: 'serviceObject',
    name: 'serviceObject',
    component: () => import('@/views/UserManage/ServiceObject/serviceObject.vue'),
    meta: {
      title: '服务对象',
      root: true
    }
  },
  {
    path: 'editObject',
    name: 'editObject',
    component: () => import('@/views/UserManage/ServiceObject/editObject.vue'),
    meta: {
      title: '新增/编辑服务对象',
      parent: 'serviceObject'
    }
  },
  {
    path: 'serviceObjectInfo',
    name: 'serviceObjectInfo',
    component: () => import('@/views/UserManage/ServiceObject/serviceObjectInfo.vue'),
    meta: {
      title: '服务对象详情',
      parent: 'serviceObject'
    }
  }

]
