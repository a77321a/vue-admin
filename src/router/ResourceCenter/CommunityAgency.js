/*
 * @Descripttion:养老机构
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors  : Please set LastEditors : Please set LastEditors
 * @LastEditTime : 2019-12-24 15:13:288
 */
export default [
  {
    path: 'agencyManage',
    name: 'agencyManage',
    component: () => import('@/views/ResourceCenter/CommunityAgency/agencyManage.vue'),
    meta: {
      title: '养老机构',
      root: true
    }
  },
  {
    path: 'agencyManageEdit',
    name: 'agencyManageEdit',
    component: () => import('@/views/ResourceCenter/CommunityAgency/editAgency.vue'),
    meta: {
      title: '编辑机构',
      parent: 'agencyManage'
    }
  },
  {
    path: 'agencyManageAdd',
    name: 'agencyManageAdd',
    component: () => import('@/views/ResourceCenter/CommunityAgency/editAgency.vue'),
    meta: {
      title: '新增机构',
      parent: 'agencyManage'
    }
  },
  {
    path: 'agencyInfo',
    name: 'agencyInfo',
    component: () => import('@/views/ResourceCenter/CommunityAgency/agencyInfo.vue'),
    meta: {
      title: '机构详情',
      parent: 'agencyManage'
    }
  }
]
