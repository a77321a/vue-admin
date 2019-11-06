/*
 * @Descripttion:系统设置
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-06 22:44:04
 */
import DictionaryManagementRoute from './DictionaryManagement'
import RolePermissionRoute from './RolePermission'
import SystemMenu from './SystemMenu'

export default [
  {
    path: 'SystemSetting',
    component: () => import('@/empty.vue'),
    children: [
      ...DictionaryManagementRoute,
      ...RolePermissionRoute,
      ...SystemMenu
    ]
  }
]
