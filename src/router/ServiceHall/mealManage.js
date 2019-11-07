/*
 * @Descripttion:助餐管理
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-07 21:11:13
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
    path: 'editMealRecord',
    name: 'editMealRecord',
    component: () => import('@/views/ServiceHall/MealManage/editMealRecord.vue'),
    meta: {
      title: '新增/编辑助餐记录'
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
