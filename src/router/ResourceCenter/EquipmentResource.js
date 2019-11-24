/*
 * @Descripttion:设备资源
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-24 13:00:26
 */
export default [
  {
    path: 'countingEquipment',
    name: 'countingEquipment',
    component: () => import('@/views/ResourceCenter/EquipmentResource/countingEquipment.vue'),
    meta: {
      title: '计数设备',
      root: true
    }
  },
  {
    path: 'mealEquipment',
    name: 'mealEquipment',
    component: () => import('@/views/ResourceCenter/EquipmentResource/mealEquipment.vue'),
    meta: {
      title: '助餐设备',
      root: true
    }
  },
  {
    path: 'monitoringEquipment',
    name: 'monitoringEquipment',
    component: () => import('@/views/ResourceCenter/EquipmentResource/monitoringEquipment.vue'),
    meta: {
      title: '监控设备',
      root: true
    }
  },
  {
    path: 'editMonitorEquipment',
    name: 'editMonitorEquipment',
    component: () => import('@/views/ResourceCenter/EquipmentResource/editMonitorEquipment.vue'),
    meta: {
      title: '新增/编辑监控设备',
      parent: 'monitoringEquipment'
    }
  },
  {
    path: 'editCountEquipment',
    name: 'editCountEquipment',
    component: () => import('@/views/ResourceCenter/EquipmentResource/editMonitorEquipment.vue'),
    meta: {
      title: '新增/编辑计数设备',
      parent: 'countingEquipment'
    }
  },
  {
    path: 'editMealEquipment',
    name: 'editMealEquipment',
    component: () => import('@/views/ResourceCenter/EquipmentResource/editMonitorEquipment.vue'),
    meta: {
      title: '新增/编辑助餐设备',
      parent: 'mealEquipment'
    }
  }
]
