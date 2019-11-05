/*
 * @Descripttion:侧边路由模拟
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-05 16:44:06
 */
const routerList = [
  {
    name: '用户管理',
    url: 'userManage',
    icon: 'el-icon-s-grid',
    children: [{
      name: '用户管理',
      url: 'userManage'
    }]
  },
  {
    name: '讲师管理',
    url: 'teacherManage',
    icon: 'el-icon-s-grid',
    children: [{
      name: '讲师管理',
      url: 'teacherManage'
    }, {
      name: '讲师分类',
      url: 'teacherClassify'
    }
    ]
  }

]

export { routerList }
