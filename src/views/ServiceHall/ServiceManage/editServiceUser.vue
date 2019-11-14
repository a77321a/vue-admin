<!--
 * @Descripttion:新增、编辑服务人员
 * @Author:
 * @Date: 2019-11-11 16:49:56
 * @LastEditors:
 * @LastEditTime: 2019-11-12 12:46:13
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
      <el-form-item label="姓名" prop="serviceProviderName">
        <el-input
          show-word-limit
          placeholder="请输入服务人员姓名，最多不超过10个字"
          :maxlength="10"
          v-model="formInfo.serviceProviderName"
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
        <el-upload action="#" list-type="picture-card" :before-upload="uploadImg">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="formInfo.indexPic" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
          <div slot="tip" class="el-upload__tip">480*480像素或1:1，支持PNG、JPG、GIF格式，小于5M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="身份证" prop="identityCard">
        <el-input
          show-word-limit
          placeholder="请输入服务人员姓名，最多不超过10个字"
          :maxlength="10"
          v-model="formInfo.identityCard"
        ></el-input>
      </el-form-item>
      <el-form-item label="员工编号" prop="employeeNum">
        <el-input
          show-word-limit
          placeholder="请输入服务人员姓名，最多不超过10个字"
          :maxlength="10"
          v-model="formInfo.employeeNum"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-select clearable v-model="formInfo.position" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select clearable v-model="formInfo.sex" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <div class="title">服务范围</div>
      <el-form-item label="服务范围" prop="serviceScope">
        <el-select clearable v-model="formInfo.serviceScope" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属机构" prop="orgId">
        <el-select clearable v-model="formInfo.orgId" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务类型" prop="serviceTypeIds">
        <el-select
          multiple
          clearable
          collapse-tags
          v-model="formInfo.serviceTypeIds"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务产品" prop="serviceProductIds">
        <el-select
          multiple
          clearable
          collapse-tags
          v-model="formInfo.serviceProductIds"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
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
        serviceProductIds: [],
        serviceProviderName: '',
        serviceScope: '',
        serviceTypeIds: [],
        sex: '',
        telephoneNum: ''
      },
      rules: {
        serviceProviderName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        telephoneNum: [
          { required: true, message: '请输入手机号', validator: validMobile }
        ],
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
        serviceTypeIds: [
          {
            required: true,
            message: '请选择服务类型',
            trigger: 'change',
            type: 'array'
          }
        ],
        serviceProductIds: [
          {
            required: true,
            message: '请选择服务产品',
            trigger: 'change',
            type: 'array'
          }
        ]
      }
    }
  },
  created () {
    if (this.$route.query.sid) {
      this.getServiceUserInfo()
    }
  },
  methods: {
    /**
     * @descripttion: 图片自定义上传 同所有单照片表单
     * @param {type}   file
     */
    uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      this.$http.postForm('/file/upload', formdata).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo.indexPic = `http://118.24.54.72:8061/${res.payload}`
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
          '/serviceProvider/detail?serviceProviderId=' + this.$route.query.sid
        )
        .then(res => {
          if (res.code === SUCCESS) {
            this.formInfo = res.payload
          }
        })
    },
    // 保存按钮
    handleSave () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        if (this.$route.query.fid) {
          this.$http
            .post('/serviceProvider/update', this.formInfo)
            .then(res => {
              if (res.code === SUCCESS) {
                this.$message.success('操作成功')
                this.$router.go(-1)
              }
            })
        } else {
          this.$http.post('/serviceProvider/add', this.formInfo).then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
