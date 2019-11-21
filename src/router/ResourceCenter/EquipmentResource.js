/*
 * @Descripttion:设备资源
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-21 17:45:51
 */
export default [
  {
    path: 'countingEquipment',
    name: 'countingEquipment',
    component: () => import('@/views/ResourceCenter/EquipmentResource/countingEquipment.vue'),
    meta: {
      title: '技术设备',
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
  }
]
