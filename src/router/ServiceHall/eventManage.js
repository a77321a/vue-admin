/*
 * @Descripttion:活动管理
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-06 10:46:46
 */
export default [
  {
    path: 'eventCenter',
    name: 'eventCenter',
    component: () => import('@/views/ServiceHall/EventManage/eventCenter.vue'),
    meta: {
      title: '活动中心',
      root: true
    }
  },
  {
    path: 'eventRoom',
    name: 'eventRoom',
    component: () => import('@/views/ServiceHall/EventManage/eventRoom.vue'),
    meta: {
      title: '活动室',
      root: true
    }
  }
]
