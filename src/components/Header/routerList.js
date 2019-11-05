/*
 * @Descripttion:顶部路由模拟
 * @Author:
 * @Date: 2019-11-05 16:05:09
 * @LastEditors:
 * @LastEditTime: 2019-11-05 16:44:17
 */
export default [
  {
    name: '首页',
    url: 'home',
    active: 'home',
    icon: 'fa-bars'
  },
  {
    name: '服务大厅',
    url: 'ServiceHall',
    active: 'active',
    icon: 'el-icon-platform-eleme',
    child: [
    ]
  },
  {
    name: '资源中心',
    url: 'courseCenter',
    active: 'course',
    icon: 'fa-users',
    child: [
    ]
  },
  {
    name: '人员管理',
    url: 'courseCenter',
    active: 'course',
    icon: 'fa-users',
    child: [
    ]
  },
  {
    name: '统计分析',
    url: 'courseCenter',
    active: 'course',
    icon: 'fa-users',
    child: [
    ]
  },
  {
    name: '系统设置',
    url: 'courseCenter',
    active: 'course',
    icon: 'fa-users',
    child: [
    ]
  }
]
