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
  },
  {
    name: '会员管理',
    url: 'vipManage',
    icon: 'el-icon-s-grid',
    children: [{
      name: '会员列表',
      url: 'vipManage'
    }, {
      name: '会员类型',
      url: 'vipClassify'
    }
    ]
  },
  {
    name: '课程管理',
    url: 'courseManage',
    icon: 'el-icon-s-grid',
    children: [{
      name: '课程列表',
      url: 'courseManage'
    }, {
      name: '课程分类',
      url: 'courseClassify'
    }, {
      name: '直播列表',
      url: 'liveList'
    },
    {
      name: '直播列表',
      url: 'giftList'
    }
    ]
  },
  {
    name: '图书管理',
    url: 'bookManage',
    icon: 'el-icon-s-grid',
    children: [
      {
        name: '图书管理',
        url: 'bookManage'
      }, {
        name: '课程分类',
        url: 'bookClassify'
      }
    ]
  },
  {
    name: '文库管理',
    url: 'libraryManage',
    icon: 'el-icon-s-grid',
    children: [
      {
        name: '文库列表',
        url: 'libraryManage'
      },
      {
        name: '文库分类',
        url: 'libraryClassify'
      },
      {
        name: '赠送文库',
        url: 'giftLibrary'
      }
    ]
  },
  {
    name: '资讯管理',
    url: 'newsManage',
    icon: 'el-icon-s-grid',
    children: [
      {
        name: '资讯管理',
        url: 'newsManage'
      },
      {
        name: '资讯分类',
        url: 'newsClassify'
      }
    ]
  },
  {
    name: '社区管理',
    url: 'community',
    icon: 'el-icon-s-grid',
    children: [
      {
        name: '小组管理',
        url: 'groupManage'
      },
      {
        name: '帖子管理',
        url: 'postClassify'
      }
    ]
  },

  {
    name: '财务管理',
    url: 'financeManage',
    icon: 'el-icon-s-grid',
    children: [{
      name: '订单管理',
      url: 'orderManage'
    },
    {
      name: '付款单',
      url: 'paymentSlip'
    }]
  },
  {
    name: '营销管理',
    url: 'marketManage',
    icon: 'el-icon-s-grid',
    children: [{
      name: '学习卡管理',
      url: '',
      children: [
        { name: '发放记录', url: 'cardReleaseRecord' },
        { name: '使用记录', url: 'cardUseRecord' }
      ]
    },
    {
      name: '优惠券管理',
      url: '',
      children: [
        { name: '发放记录', url: 'couponConfig' },
        { name: '使用记录', url: 'couponUseRecord' }
      ]
    },
    {
      name: '会员卡管理',
      url: '',
      children: [
        { name: '发放记录', url: 'vipshipReleaseRecord' },
        { name: '使用记录', url: 'vipshipUseRecord' }
      ]
    }]
  },
  {
    name: '运营管理',
    url: 'operateManage',
    icon: 'el-icon-s-grid',
    children: [{
      name: '消息管理',
      url: 'messageManage'
    },
    {
      name: '评论管理',
      url: '',
      children: [
        { name: '图书评论', url: 'bookComment' },
        { name: '课程评论', url: 'courseComment' },
        { name: '文库评论', url: 'libraryComment' }
      ]
    },
    {
      name: '首页设置',
      url: '',
      children: [
        { name: 'Banner图设置', url: 'bannerSetting' },
        { name: '首页专题推荐', url: 'indexSubjectSetting' },
        { name: '首页今日爆点', url: 'indexDetonationSetting' },
        { name: '首页面授课推荐', url: 'indexFaceRecommend' },
        { name: '首页课程推荐', url: 'indexCourseRecommend' },
        { name: '首页老师推荐', url: 'indexTeacherRecommend' },
        { name: '首页资讯推荐', url: 'indexNewsRecommend' },
        { name: '首页图书推荐', url: 'indexBookRecommend' }
      ]
    }]
  },
  {
    name: '促销管理',
    url: 'promotionManage',
    icon: 'el-icon-s-grid',
    children: [
      { name: '拼团', url: 'spellGroup' }
    ]
  },
  {
    name: '系统设置',
    url: 'settingManage',
    icon: 'el-icon-s-grid',
    children: [
      {
        name: '网站内容设置',
        url: 'webConfig',
        children: [
          { name: '帮助中心', url: 'helpCenter' },
          { name: '网站设置', url: 'siteSetting' },
          { name: '关于我们', url: 'aboutUs' },
          { name: '联系我们', url: 'contactUs' }
        ]
      }
    ]
  }
]

export { routerList }
