export default [
  {
    path: 'teacherManage',
    component: () => import('@/empty.vue'),
    children: [{
      path: 'index',
      name: 'teacherManage',
      component: () => import('@/views/TeacherManage/teacherManage.vue')
    },
    {
      path: 'classify',
      name: 'teacherClassify',
      component: () => import('@/views/TeacherManage/teacherClassify.vue')
    }
    ]
  }
]
