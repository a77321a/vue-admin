/*
 * @Descripttion:角色权限
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-11 18:26:03
 */
export default [
  {
    path: 'roleManage',
    name: 'roleManage',
    component: () => import('@/views/SystemSetting/RolePermission/roleManage.vue'),
    meta: {
      title: '角色管理',
      root: true
    }
  },
  {
    path: 'accountSetting',
    name: 'accountSetting',
    component: () => import('@/views/SystemSetting/RolePermission/accountSetting.vue'),
    meta: {
      title: '账号设置',
      root: true
    }
  },
  {
    path: 'accountSetting',
    name: 'accountSetting',
    component: () => import('@/views/SystemSetting/RolePermission/accountSetting.vue'),
    meta: {
      title: '账号设置',
      root: true
    }
  },
  {
    path: 'editRole',
    name: 'editRole',
    component: () => import('@/views/SystemSetting/RolePermission/editRole.vue'),
    meta: {
      title: '新增/编辑角色',
      parent: 'roleManage'
    }
  }
]
