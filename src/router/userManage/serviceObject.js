/*
 * @Descripttion:服务对象
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-06 22:25:07
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
  }

]
