/*
 * @Descripttion:养老机构
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-01-12 21:35:37
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
    path: 'serviceUserInfo',
    name: 'serviceUserInfo',
    component: () => import('@/views/ServiceHall/ServiceManage/serviceUserInfo.vue'),
    meta: {
      title: '服务人员详情',
      parent: 'serviceUser'
    }
  },
  {
    path: 'serviceUserAdd',
    name: 'serviceUserAdd',
    component: () => import('@/views/ServiceHall/ServiceManage/editServiceUser.vue'),
    meta: {
      title: '新增服务人员',
      parent: 'serviceUser'
    }
  },
  {
    path: 'serviceUserEdit',
    name: 'serviceUserEdit',
    component: () => import('@/views/ServiceHall/ServiceManage/editServiceUser.vue'),
    meta: {
      title: '新增/编辑服务人员',
      parent: 'serviceUser'
    }
  }
]
