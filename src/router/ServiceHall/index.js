/*
 * @Descripttion:服务大厅
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-06 21:44:51
 */
import eventManageRoute from './eventManage'
import mealManageRoute from './mealManage'
import serviceManageRoute from './serviceManage'
import serviceProductRoute from './serviceProduct'

export default [
  {
    path: 'serviceHall',
    component: () => import('@/empty.vue'),
    children: [
      ...eventManageRoute,
      ...mealManageRoute,
      ...serviceManageRoute,
      ...serviceProductRoute
    ]
  }
]
