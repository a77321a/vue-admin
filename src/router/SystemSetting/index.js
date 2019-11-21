/*
 * @Descripttion:系统设置
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-21 17:57:51
 */
import DictionaryManagementRoute from './DictionaryManagement'
import RolePermissionRoute from './RolePermission'
import SystemMenu from './SystemMenu'
import DataSyncLog from './DataSyncLog'

export default [
  {
    path: 'SystemSetting',
    component: () => import('@/empty.vue'),
    children: [
      ...DictionaryManagementRoute,
      ...RolePermissionRoute,
      ...SystemMenu,
      ...DataSyncLog
    ]
  }
]
