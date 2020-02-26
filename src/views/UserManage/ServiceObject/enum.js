/*
 * @Descripttion:
 * @Author:
 * @Date: 2020-02-25 15:30:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-26 11:01:25
 */
const config = {
  // 经济来源列表
  incomeSourceList: [
    {
      key: 0,
      label: '自身'
    },
    {
      key: 1,
      label: '子女'
    },
    {
      key: 2,
      label: '退休金'
    },
    {
      key: 3,
      label: '政府'
    },
    {
      key: 4,
      label: '社会'
    }
  ],
  professionList: [
    {
      key: 0,
      label: '农、林、牧、渔、水利业生产人员'
    },
    {
      key: 1,
      label: '国家机关、党群组织、企业、事业单位'
    },
    {
      key: 2,
      label: '专业技术员'
    },
    {
      key: 3,
      label: '商业、服务业人员'
    },
    {
      key: 4,
      label: '生产、运输操作人员'
    },
    {
      key: 5,
      label: '军人'
    },
    {
      key: 6,
      label: '其他从业人员'
    }

  ],
  pensionWayList: [
    {
      key: 0,
      label: '居家'
    },
    {
      key: 1,
      label: '社区'
    },
    {
      key: 2,
      label: '机构'
    }
  ],
  fuelTypeList: [
    {
      key: 0,
      label: '液化气'
    },
    {
      key: 1,
      label: '煤'
    },
    {
      key: 2,
      label: '天然气'
    }, {
      key: 3,
      label: '其他'
    }
  ],
  waterTypeList: [
    {
      key: 0,
      label: '自来水'
    },
    {
      key: 1,
      label: '净化过滤水'
    },
    {
      key: 2,
      label: '井水'
    },
    {
      key: 3,
      label: '河水'
    },
    {
      key: 4,
      label: '其他'
    }
  ],
  kitchenTypeList: [
    {
      key: 0,
      label: '无'
    },
    {
      key: 1,
      label: '油烟机'
    },
    {
      key: 2,
      label: '换气扇'
    },
    {
      key: 3,
      label: '烟窗'
    },
    {
      key: 4,
      label: '换气扇+烟窗'
    },
    {
      key: 5,
      label: '油烟机+烟窗'
    },
    {
      key: 6,
      label: '油烟机+换气扇'
    }, {
      key: 7,
      label: '油烟机+换气扇+烟窗'
    }
  ],
  petTypeList: [
    {
      key: 0,
      label: '无'
    },
    {
      key: 1,
      label: '鸟'
    },
    {
      key: 2,
      label: '猫'
    },
    {
      key: 3,
      label: '狗'
    },
    {
      key: 4,
      label: '其他'
    }
  ],
  compensateList: [
    {
      key: 0,
      label: '低偿'
    },
    {
      key: 1,
      label: '无偿'
    },
    {
      key: 2,
      label: '其他'
    }
  ],
  governmentGrantConditionList: [
    {
      key: 0,
      label: '无'
    },
    {
      key: 1,
      label: '三无'
    },
    {
      key: 2,
      label: '90岁以上'
    },
    {
      key: 3,
      label: '低保'
    },
    {
      key: 4,
      label: '革命五老'
    },
    {
      key: 5,
      label: '重点优抚对象'
    },
    {
      key: 6,
      label: '低收入'
    }
  ],
  governmentGrantsList: [
    {
      key: 0,
      label: '无'
    },
    {
      key: 1,
      label: '100-300'
    },
    {
      key: 2,
      label: '300-1000'
    },
    {
      key: 3,
      label: '1000-3000'
    }
  ],
  livingNeedList: [
    {
      key: 0,
      label: '无需求'
    },
    {
      key: 1,
      label: '药品配送'
    },
    {
      key: 2,
      label: '日用品配送'
    },
    {
      key: 3,
      label: '牛羊奶'
    },
    {
      key: 4,
      label: '蛋糕'
    },
    {
      key: 5,
      label: '理发'
    },
    {
      key: 6,
      label: '餐饮配送'
    }
  ],
  housekeepingNeedList: [
    {
      key: 0,
      label: '打扫卫生'
    },
    {
      key: 1,
      label: '搬家'
    },
    {
      key: 2,
      label: '保姆'
    },
    {
      key: 3,
      label: '清洗家具'
    },
    {
      key: 4,
      label: '疏通下水道'
    },
    {
      key: 5,
      label: '无需求'
    }
  ],
  medicalNeedList: [
    {
      key: 0,
      label: '陪诊'
    },
    {
      key: 1,
      label: '体检'
    },
    {
      key: 2,
      label: '上门康复'
    },
    {
      key: 3,
      label: '上门护理'
    },
    {
      key: 4,
      label: '上门理疗'
    },
    {
      key: 5,
      label: '无需求'
    }
  ],
  spiritNeedList: [
    {
      key: 0,
      label: '心理辅导'
    },
    {
      key: 1,
      label: '陪聊'
    },
    {
      key: 2,
      label: '参加社区活动'
    },
    {
      key: 3,
      label: '无服务需求'
    }
  ],
  isAcceptSpiritTelephoneCareList: [
    {
      key: 0,
      label: '否'
    },
    {
      key: 1,
      label: '是'
    }
  ],
  drugAllergyHistoryList: [
    {
      key: 0,
      label: '无'
    },
    {
      key: 1,
      label: '青霉素'
    },
    {
      key: 2,
      label: '磺胺'
    },
    {
      key: 3,
      label: '链霉素'
    },
    {
      key: 4,
      label: '其他'
    }
  ],
  chronicDiseaseList: [
    {
      key: 0,
      label: '无'
    },
    {
      key: 1,
      label: '高血压'
    },
    {
      key: 2,
      label: '糖尿病'
    },
    {
      key: 3,
      label: '中风'
    },
    {
      key: 4,
      label: '冠心病'
    },
    {
      key: 5,
      label: '心肌梗塞'
    },
    {
      key: 6,
      label: '心肌病'
    },
    {
      key: 7,
      label: '骨质疏松'
    },
    {
      key: 8,
      label: '慢性心率衰竭'
    },
    {
      key: 9,
      label: '其他'
    }
  ],
  healthSelfAssessmentList: [
    {
      key: 0,
      label: '满意'
    },
    {
      key: 1,
      label: '基本满意'
    },
    {
      key: 2,
      label: '说不清楚'
    },
    {
      key: 3,
      label: '不太满意'
    },
    {
      key: 4,
      label: '不满意'
    }
  ],
  careSelfAssessmentList: [
    {
      key: 0,
      label: '可自理'
    },
    {
      key: 1,
      label: '轻度依赖'
    },
    {
      key: 2,
      label: '中度依赖'
    },
    {
      key: 3,
      label: '不能自理'
    }
  ],
  physicalConditionList: [
    {
      key: 0,
      label: '自理'
    },
    {
      key: 1,
      label: '半自理'
    },
    {
      key: 2,
      label: '半失能'
    },
    {
      key: 3,
      label: '失能'
    },
    {
      key: 4,
      label: '瘫痪'
    },
    {
      key: 5,
      label: '精神残疾'
    },
    {
      key: 6,
      label: '肢体残疾'
    },
    {
      key: 7,
      label: '智力残疾'
    },
    {
      key: 8,
      label: '视力残疾'
    },
    {
      key: 9,
      label: '听力残疾'
    },
    {
      key: 10,
      label: '语言残疾'
    },
    {
      key: 11,
      label: '多重残疾'
    }
  ],
  psychologicalCharacteristicList: [
    {
      key: 0,
      label: '孤独'
    },
    {
      key: 1,
      label: '依赖'
    },
    {
      key: 2,
      label: '易怒'
    },
    {
      key: 3,
      label: '恐惧'
    },
    {
      key: 4,
      label: '抑郁'
    },
    {
      key: 5,
      label: '焦虑'
    },
    {
      key: 6,
      label: '其他'
    }
  ],
  dementiaPrecursorList: [
    {
      key: 0,
      label: '无'
    },
    {
      key: 1,
      label: '行为异常'
    },
    {
      key: 2,
      label: '思维和判断困难'
    },
    {
      key: 3,
      label: '日常生活能力减退'
    },
    {
      key: 4,
      label: '记忆衰退'
    },
    {
      key: 5,
      label: '呆坐'
    },
    {
      key: 6,
      label: '经常无目的的外出'
    },
    {
      key: 7,
      label: '速路'
    },
    {
      key: 8,
      label: '其他'
    }
  ],
  existingSymptomList: [
    {
      key: 0,
      label: '无症状'
    },
    {
      key: 1,
      label: '头痛'
    },
    {
      key: 2,
      label: '头晕'
    },
    {
      key: 3,
      label: '心悸'
    },
    {
      key: 4,
      label: '胸闷'
    },
    {
      key: 5,
      label: '胸痛'
    },
    {
      key: 6,
      label: '慢性咳嗽'
    },
    {
      key: 7,
      label: '咳痰'
    },
    {
      key: 8,
      label: '呼吸困难'
    },
    {
      key: 9,
      label: '多饮'
    },
    {
      key: 10,
      label: '多尿'
    },
    {
      key: 11,
      label: '体重下降'
    },
    {
      key: 12,
      label: '乏力'
    },
    {
      key: 13,
      label: '关节肿痛'
    },
    {
      key: 14,
      label: '手脚麻木'
    },
    {
      key: 15,
      label: '尿急'
    },
    {
      key: 16,
      label: '视图模糊'
    },
    {
      key: 17,
      label: '尿痛'
    },
    {
      key: 18,
      label: '恶心呕吐'
    },
    {
      key: 19,
      label: '便秘'
    },
    {
      key: 20,
      label: '腹泻'
    },
    {
      key: 21,
      label: '眼花'
    }
  ],
  eatingHabitList: [
    {
      key: 0,
      label: '荤素均衡'
    },
    {
      key: 1,
      label: '荤多'
    },
    {
      key: 2,
      label: '素多'
    }
  ],
  drinkingList: [
    {
      key: 0,
      label: '无'
    },
    {
      key: 1,
      label: '偶尔'
    },
    {
      key: 2,
      label: '经常'
    }
  ],
  smokingList: [
    {
      key: 0,
      label: '无吸烟'
    },
    {
      key: 1,
      label: '2支'
    },
    {
      key: 2,
      label: '5支'
    },
    {
      key: 3,
      label: '10支'
    },
    {
      key: 4,
      label: '1包'
    },
    {
      key: 5,
      label: '2包'
    },
    {
      key: 6,
      label: '2包以上'
    }
  ],
  physicalExerciseList: [
    {
      key: 0,
      label: '无'
    },
    {
      key: 1,
      label: '散步'
    },
    {
      key: 2,
      label: '太极拳'
    },
    {
      key: 3,
      label: '门球'
    },
    {
      key: 4,
      label: '赛跑'
    },
    {
      key: 5,
      label: '游泳'
    },
    {
      key: 6,
      label: '健身'
    },
    {
      key: 7,
      label: '其他'
    }
  ],
  sleepList: [
    {
      key: 0,
      label: '3-5小时'
    },
    {
      key: 1,
      label: '5-7小时'
    },
    {
      key: 2,
      label: '7-9小时'
    },
    {
      key: 3,
      label: '9-12小时'
    }
  ],
  isLongTimeMedicationList: [
    {
      key: 0,
      label: '否'
    },
    {
      key: 1,
      label: '是'
    }
  ],
  dailyTimesList: [
    {
      key: 0,
      label: '一日三次'
    },
    {
      key: 1,
      label: '一日两次'
    },
    {
      key: 2,
      label: '一日一次'
    }
  ],
  eatDrugTimeList: [
    {
      key: 0,
      label: '早'
    },
    {
      key: 1,
      label: '中'
    },
    {
      key: 2,
      label: '晚'
    }
  ],
  eatDrugRegularList: [
    {
      key: 0,
      label: '规律'
    },
    {
      key: 1,
      label: '间断'
    },
    {
      key: 2,
      label: '不服药'
    }
  ],
  isFullRecovery: [
    {
      key: 0,
      label: '未完全恢复'
    },
    {
      key: 1,
      label: '完全恢复'
    }
  ],
  ruleList: {
    sleep: [
      { required: true, message: '请选择睡眠情况', trigger: 'change' }
    ],
    isLongTimeMedication: [
      { required: true, message: '请选择是否长期用药', trigger: 'change' }
    ],
    smoking: [
      { required: true, message: '请选择吸烟情况', trigger: 'change' }
    ],
    physicalExercise: [
      { required: true, message: '请选择体育锻炼情况', trigger: 'change' }
    ],
    drinking: [
      { required: true, message: '请选择饮酒情况', trigger: 'change' }
    ],
    existingSymptom: [
      { required: true, message: '请选择现存症状', trigger: 'change' }
    ],
    eatingHabit: [
      { required: true, message: '请选择饮食习惯', trigger: 'change' }
    ],
    dementiaPrecursor: [
      { required: true, message: '请选择痴呆前兆', trigger: 'change' }
    ],
    psychologicalCharacteristic: [
      { required: true, message: '请选择心理特征', trigger: 'change' }
    ],
    physicalCondition: [
      { required: true, message: '请选择身体状况', trigger: 'change' }
    ],
    careSelfAssessment: [
      { required: true, message: '请选择自理能力自评', trigger: 'change' }
    ],
    healthSelfAssessment: [
      { required: true, message: '请选择健康状况自评', trigger: 'change' }
    ],
    chronicDisease: [
      { required: true, message: '请选择慢性病', trigger: 'change' }
    ],
    incomeSource: [
      { required: true, message: '请选择主要经济来源', trigger: 'change' }
    ],
    profession: [
      { required: true, message: '请选择老人职业', trigger: 'change' }
    ],
    pensionWay: [
      { required: true, message: '请选择养老方式', trigger: 'change' }
    ],
    fuelType: [
      { required: true, message: '请选择燃料类型', trigger: 'change' }
    ],
    waterType: [
      { required: true, message: '请选择饮水类型', trigger: 'change' }
    ],
    kitchenType: [
      { required: true, message: '请选择厨房排风设施类型', trigger: 'change' }
    ],
    petType: [
      { required: true, message: '请选择宠物', trigger: 'change' }
    ],
    compensate: [
      { required: true, message: '请选择补偿类型', trigger: 'change' }
    ],
    governmentGrantCondition: [
      { required: true, message: '请选择政府补助标准', trigger: 'change' }
    ],
    governmentGrants: [
      { required: true, message: '请选择政府补助情况', trigger: 'change' }
    ],
    livingNeed: [
      { required: true, message: '请选择生活需求', trigger: 'change' }
    ],
    housekeepingNeed: [
      { required: true, message: '请选择家政需求', trigger: 'change' }
    ],
    medicalNeed: [
      { required: true, message: '请选择医疗需求', trigger: 'change' }
    ],
    spiritNeed: [
      { required: true, message: '请选择精神需求', trigger: 'change' }
    ],
    isAcceptSpiritTelephoneCare: [
      { required: true, message: '请选择是否接受电话关怀精神慰问', trigger: 'change' }
    ],
    drugAllergyHistory: [
      { required: true, message: '请选择药物过敏史', trigger: 'change' }
    ],
    bloodPressure: [
      { required: true, message: '请输入服务对象血压信息', trigger: 'blur' }
    ],
    bloodSugar: [
      { required: true, message: '请输入服务对象血糖信息', trigger: 'blur' }
    ],
    geneticHistory: [
      { required: true, message: '请输入服务对象遗传病史信息', trigger: 'blur' }
    ],
    medicalHistory: [
      { required: true, message: '请输入服务对象既往病史信息', trigger: 'blur' }
    ],
    summary: [
      { required: true, message: '请输入分析总结', trigger: 'blur' }
    ],
    childrenList: [
      { required: true, message: '请添加子女', trigger: 'blur' }
    ],
    education: [
      { required: true, message: '请输入服务对象文化程度', trigger: 'blur' }
    ],
    isRetire: [
      { required: true, message: '请选择是否退休', trigger: 'change' }
    ],
    height: [
      { required: true, message: '请输入服务对象身高', trigger: 'blur' }
    ],
    weight: [
      { required: true, message: '请输入服务对象体重', trigger: 'blur' }
    ],
    waist: [
      { required: true, message: '请输入服务对象腰围', trigger: 'blur' }
    ],
    childrenNum: [
      { required: true, message: '请输入服务对象子女数', trigger: 'blur' }
    ],
    isOutgoing: [
      { required: true, message: '请选择性格', trigger: 'change' }
    ],
    lastHospitalizationDateTime: [
      { required: true, message: '请选择最近第一次入院时间', trigger: 'change' }
    ],
    lastHospitalizationReason: [
      { required: true, message: '请输入服务对象住院原因', trigger: 'blur' }
    ],
    lastHospitalizationOrg: [
      { required: true, message: '请输入服务对象住院机构', trigger: 'blur' }
    ],
    isFullRecovery: [
      { required: true, message: '请选择健康恢复情况', trigger: 'change' }
    ]

  }
}
export default config
