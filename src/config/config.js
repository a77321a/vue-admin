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
    }]
  },
  {
    name: '课程管理',
    url: 'courseManage',
    icon: 'el-icon-s-grid',
    children: [{
      name: '课程管理',
      url: ''
    }, {
      name: '课程分类',
      url: ''
    }]
  },
  {
    name: '图书管理',
    url: 'bookManage',
    icon: 'el-icon-s-grid',
    children: []
  },
  {
    name: '评论管理',
    url: 'commentManage',
    icon: '',
    children: []
  },
  {
    name: '财务管理',
    url: 'financeManage',
    icon: '',
    children: []
  },
  {
    name: '运营管理',
    url: 'operateManage',
    icon: '',
    children: []
  },
  {
    name: '营销管理',
    url: 'marketManage',
    icon: '',
    children: []
  },
  {
    name: '系统设置',
    url: 'settingManage',
    icon: '',
    children: []
  }
]

export { routerList }
