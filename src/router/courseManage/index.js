export default [
  {
    path: 'courseManage',
    component: () => import('@/empty.vue'),
    children: [{
      path: 'index',
      name: 'courseManage',
      component: () => import('@/views/CourseManage/CourseManage.vue')
    },
    {
      path: 'classify',
      name: 'courseClassify',
      component: () => import('@/views/CourseManage/CourseClassify.vue')
    }
    ]
  }
]
