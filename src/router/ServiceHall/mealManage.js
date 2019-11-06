/*
 * @Descripttion:助餐管理
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-06 16:43:35
 */
export default [
  {
    path: 'dishManage',
    name: 'dishManage',
    component: () => import('@/views/ServiceHall/MealManage/dishManage.vue'),
    meta: {
      title: '菜品管理',
      root: true
    }
  },
  {
    path: 'mealCenter',
    name: 'mealCenter',
    component: () => import('@/views/ServiceHall/MealManage/mealCenter.vue'),
    meta: {
      title: '助餐中心',
      root: true
    }
  },
  {
    path: 'menuManage',
    name: 'menuManage',
    component: () => import('@/views/ServiceHall/MealManage/menuManage.vue'),
    meta: {
      title: '菜单管理',
      root: true
    }
  }
]
