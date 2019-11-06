/*
 * @Descripttion:社区机构
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-06 22:19:44
 */
export default [
  {
    path: 'agencyManage',
    name: 'agencyManage',
    component: () => import('@/views/ResourceCenter/CommunityAgency/agencyManage.vue'),
    meta: {
      title: '社区机构',
      root: true
    }
  }
]
