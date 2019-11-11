/*
 * @Descripttion:社区机构
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-09 11:08:46
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
  },
  {
    path: 'editAgency',
    name: 'editAgency',
    component: () => import('@/views/ResourceCenter/CommunityAgency/editAgency.vue'),
    meta: {
      title: '新增/编辑机构',
      parent: 'agencyManage'
    }
  }
]
