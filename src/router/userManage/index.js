export default [
  {
    path: 'userManage',
    component: () => import('@/empty.vue'),
    children: [{
      path: 'index',
      name: 'userManage',
      component: () => import('@/views/UserManage/UserManage.vue')
    }]
  }
]
