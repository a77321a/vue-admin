<!--
 * @Descripttion:新增、编辑服务人员
 * @Author:
 * @Date: 2019-11-11 16:49:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-04 09:55:53
 -->
<template>
  <div id="edit-service-user">
    <div class="title">基本信息</div>
    <el-form
      style="width:700px"
      ref="formInfo"
      :rules="rules"
      :model="formInfo"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="姓名" prop="orgServiceProviderName">
        <el-input
          show-word-limit
          placeholder="请输入服务人员姓名，最多不超过10个字"
          :maxlength="10"
          v-model="formInfo.orgServiceProviderName"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telephoneNum">
        <el-input
          show-word-limit
          placeholder="请输入服务人员手机号"
          :maxlength="11"
          v-model="formInfo.telephoneNum"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="indexPic">
        <div style="display:flex;align-items:center;">
          <div v-show="formInfo.indexPic" class="avatars">
            <img :src="$store.state.config.systemConfig[0].dictionaryValue+formInfo.indexPic" alt />
          </div>
          <el-upload
            action="apii/public/img"
            :show-file-list="false"
            :before-upload="uploadImg"
            accept="image/png, image/jpeg, image/jpg, image/bmp"
          >
            <el-button type="primary" icon="ios-cloud-upload-outline">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="身份证" prop="identityCard">
        <el-input
          show-word-limit
          placeholder="请输入正确的身份证号"
          :maxlength="18"
          v-model="formInfo.identityCard"
        ></el-input>
      </el-form-item>
      <el-form-item label="员工编号" prop="employeeNum">
        <el-input placeholder="请输入请输入员工编号" v-model="formInfo.employeeNum"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-select clearable v-model="formInfo.position" placeholder="请选择">
          <el-option
            v-for="(item, index) in $store.state.config.position"
            :key="index"
            :label="item.dictionaryLabel"
            :value="item.dictionaryValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select clearable v-model="formInfo.sex" placeholder="请选择">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          v-model="formInfo.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <div class="title">服务范围</div>
      <el-form-item label="服务范围" prop="serviceScope">
        <el-cascader
          clearable
          :props="{value:'regionId',label:'addressName',}"
          :options="spaceTree"
          v-model="formInfo.serviceScope"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="所属机构" prop="orgId">
        <el-cascader
          clearable
          @change="changeOrg"
          :props="{value:'orgId',label:'orgName',emitPath:false}"
          :options="orgTree"
          v-model="formInfo.orgId"
        ></el-cascader>
      </el-form-item>
      <!-- <el-form-item label="服务类型" prop="orgServiceTypeIds"> -->

      <el-form-item label="服务类型">
        <el-cascader
          clearable
          @change="changeType"
          :disabled="!formInfo.orgId"
          :props="{value:'pensionServiceTypeId',label:'pensionServiceTypeName',emitPath:false}"
          :options="serviceTypeList"
          v-model="formInfo.pensionServiceTypeId"
        ></el-cascader>
        <!-- <el-select
          :disabled="!formInfo.orgId"
          @change="changeType"
          multiple
          clearable
          v-model="formInfo.orgServiceTypeIds"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in serviceTypeList"
            :key="index"
            :label="item.pensionServiceTypeName"
            :value="item.pensionServiceTypeId"
          ></el-option>
        </el-select>-->
      </el-form-item>
      <!-- <el-form-item label="服务产品" prop="orgServiceProductIds"> -->

      <el-form-item label="服务产品">
        <el-select
          :disabled="formInfo.orgServiceTypeIds=='' || formInfo.orgId==''"
          multiple
          clearable
          v-model="formInfo.orgServiceProductIds"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in serviceProductList"
            :key="index"
            :label="item.orgServiceProductName"
            :value="item.orgServiceProductId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item size="large">
        <el-button @click="handleSave" type="primary">立即创建</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'editServiceUser',
  data () {
    const validMobile = (rule, value, callback) => {
      let reg = /^1[123456789]\d{9}$/
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('手机格式不正确'))
      } else {
        callback()
      }
    }
    return {
      formInfo: {
        employeeNum: '',
        identityCard: '',
        indexPic: '',
        orgId: '',
        position: '',
        orgServiceProviderName: '',
        serviceScope: [],
        orgServiceTypeIds: '',
        orgServiceProductIds: [],
        sex: '',
        telephoneNum: ''
      },
      rules: {
        orgServiceProviderName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        telephoneNum: [{ required: true, validator: validMobile }],
        indexPic: [
          { required: true, message: '请输入头像', trigger: 'change' }
        ],
        identityCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        employeeNum: [
          { required: true, message: '请输入员工编号', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请选择职位', trigger: 'change' }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        birthday: [
          { required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        serviceScope: [
          {
            required: true,
            message: '请选择服务范围',
            trigger: 'change'
          }
        ],
        orgId: [
          { required: true, message: '请选择所属机构', trigger: 'change' }
        ],
        orgServiceTypeIds: [
          {
            required: true,
            message: '请选择服务类型',
            trigger: 'change'
          }
        ],
        orgServiceProductIds: [
          {
            required: true,
            message: '请选择服务产品',
            trigger: 'change',
            type: 'array'
          }
        ]
      },
      serviceTypeList: [],
      orgTree: [],
      spaceTree: [],
      serviceProductList: []
    }
  },
  created () {
    let userInfo = this.$store.state.userInfo
    if (Array.isArray(userInfo.orgIds) && userInfo.orgIds.length > 0) {
      this.formInfo.orgId = userInfo.orgIds[1]
    }
    if (this.$route.query.uid) {
      this.getServiceUserInfo()
    }
    this.getServiceTypeList(this.formInfo.orgId)
    this.getOrgList()
    this.getTree()
  },
  methods: {
    changeOrg (val) {
      this.formInfo.orgServiceTypeIds = ''
      this.formInfo.orgServiceProductIds = []
      this.getServiceTypeList(val)
    },
    changeType (val) {
      this.formInfo.orgServiceTypeIds = val
      this.formInfo.orgServiceProductIds = []
      this.getServiceProductList()
    },
    getServiceProductList () {
      this.$http
        .post('/org/service/product/pageSearch', {
          pageSize: MAXSIZE,
          orgServiceTypeIds: [this.formInfo.pensionServiceTypeId]
        })
        .then(res => {
          if (res.code === SUCCESS) {
            this.serviceProductList = res.payload.records
          }
        })
    },
    getTree () {
      this.$http.post('/address/tree').then(res => {
        if (res.code === SUCCESS) {
          this.spaceTree = res.payload
          for (let i in this.spaceTree) {
            if (this.spaceTree[i].depth == 0) {
              this.spaceTree.splice(i, 1)
            }
          }
        }
      })
    },
    getOrgList () {
      this.$http.post('/org/tree').then(res => {
        if (res.code === SUCCESS) {
          this.orgTree = res.payload
          this.orgTree.forEach(i => {
            if (i.children.length > 0) {
              i.children.forEach(j => {
                delete j.children
              })
            }
          })
        }
      })
    },
    getServiceTypeList (id) {
      this.$http
        .post(`/pension/service/type/treeByOrgId?orgId=${id || ''}`, {
          orgId: id
        })
        .then(res => {
          if (res.code === SUCCESS) {
            this.serviceTypeList = res.payload
            for (let i = 0; i < this.serviceTypeList.length; i++) {
              if (
                this.serviceTypeList[i].children &&
                this.serviceTypeList[i].children.length > 0
              ) {
                for (
                  let j = 0;
                  j < this.serviceTypeList[i].children.length;
                  j++
                ) {
                  if (
                    this.serviceTypeList[i].children[j].children &&
                    this.serviceTypeList[i].children[j].children.length > 0
                  ) {
                    for (
                      let n = 0;
                      n < this.serviceTypeList[i].children[j].children.length;
                      n++
                    ) {
                      delete this.serviceTypeList[i].children[j].children[n]
                        .children
                    }
                  }
                }
              }
            }
          }
        })
    },
    /**
     * @descripttion: 图片自定义上传 同所有单照片表单
     * @param {type}   file
     */
    uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      this.$http.postForm('/file/upload', formdata).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo.indexPic = res.payload
        }
      })
      return false
    },
    handleRemove () {},
    /**
     * @descripttion: 获取服务人员信息
     * @return: 信息
     */
    getServiceUserInfo () {
      this.$http
        .get(
          '/org/service/provider/detail?serviceProviderId=' +
            this.$route.query.uid
        )
        .then(res => {
          if (res.code === SUCCESS) {
            this.formInfo = res.payload
            this.$set(this.formInfo, 'orgId', res.payload.orgDetail.orgId)
            // this.$set(this.formInfo,'orgServiceTypeIds',[])
            let arr = []
            let arr1 = []
            if (res.payload.orgServiceTypes) {
              res.payload.orgServiceTypes.forEach(i => {
                arr.push(i.pensionServiceTypeId)
              })
            }
            if (res.payload.orgServiceProducts) {
              res.payload.orgServiceProducts.forEach(i => {
                arr1.push(i.orgServiceProductId)
              })
            }
            this.$set(this.formInfo, 'orgServiceProductIds', arr1)
            this.$set(this.formInfo, 'serviceScope', [
              res.payload.cityId ? res.payload.cityId : '',
              res.payload.districtId ? res.payload.districtId : '',
              res.payload.communityId ? res.payload.communityId : '',
              res.payload.streetId ? res.payload.streetId : ''
            ])
            this.$set(
              this.formInfo,
              'pensionServiceTypeId',
              res.payload.orgServiceTypes &&
                res.payload.orgServiceTypes.length > 0
                ? res.payload.orgServiceTypes[0].pensionServiceTypeId
                : ''
            )

            this.getServiceTypeList(this.formInfo.orgId)
            this.getServiceProductList()
          }
        })
    },
    // 保存按钮
    handleSave () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        let url = this.$route.query.uid
          ? '/org/service/provider/update'
          : '/org/service/provider/add'
        this.$http
          .post(url, {
            orgServiceProviderId: this.$route.query.uid,
            cityId: this.formInfo.serviceScope[0],
            districtId: this.formInfo.serviceScope[1],
            communityId: this.formInfo.serviceScope[2],
            streetId: this.formInfo.serviceScope[3],
            birthday: this.formInfo.birthday,
            employeeNum: this.formInfo.employeeNum,
            identityCard: this.formInfo.identityCard,
            indexPic: this.formInfo.indexPic,
            orgId: this.formInfo.orgId,
            orgServiceProductIds: this.formInfo.orgServiceProductIds,
            orgServiceProviderName: this.formInfo.orgServiceProviderName,
            orgServiceTypeIds: this.formInfo.orgServiceTypeIds
              ? [this.formInfo.orgServiceTypeIds]
              : [],
            position: this.formInfo.position,
            sex: this.formInfo.sex,
            telephoneNum: this.formInfo.telephoneNum
          })
          .then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
        // if (this.$route.query.uid) {
        //   ;(this.formInfo.cityId = this.formInfo.serviceScope[0]),
        //     (this.formInfo.districtId = this.formInfo.serviceScope[1]),
        //     (this.formInfo.communityId = this.formInfo.serviceScope[2]),
        //     (this.formInfo.streetId = this.formInfo.serviceScope[3]),

        // } else {
        //   this.$http
        //     .post('/org/service/provider/add', this.formInfo)
        //     .then(res => {
        //       if (res.code === SUCCESS) {
        //         this.$message.success('操作成功')
        //         this.$router.go(-1)
        //       }
        //     })
        // }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
