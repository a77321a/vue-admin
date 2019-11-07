/*
 * @Descripttion:活动管理
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-07 21:09:33
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
  },
  {
    path: 'editEvent',
    name: 'editEvent',
    component: () => import('@/views/ServiceHall/EventManage/editEvent.vue'),
    meta: {
      title: '新增/编辑活动',
      parent: 'eventCenter'
    }
  },
  {
    path: 'eventInfo',
    name: 'eventInfo',
    component: () => import('@/views/ServiceHall/EventManage/eventInfo.vue'),
    meta: {
      title: '活动详情',
      parent: 'eventCenter'
    }
  },
  {
    path: 'editEventRoom',
    name: 'editEventRoom',
    component: () => import('@/views/ServiceHall/EventManage/editEventRoom.vue'),
    meta: {
      title: '新增/编辑活动室',
      parent: 'eventRoom'
    }
  }
]
