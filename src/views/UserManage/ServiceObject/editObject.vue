<!--
 * @Descripttion:新增、编辑养老产品
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-14 18:22:04
 -->
<template>
  <div id="edit-event">
    <!-- label-suffix="：" -->
    <div class="title">基本信息</div>
    <el-form
      style="width:700px"
      ref="formInfo"
      :rules="rules"
      :model="formInfo"
      label-width="110px"
      size="medium"
    >
      <el-form-item label="姓名" prop="serviceCustomerName">
        <el-input v-model="formInfo.serviceCustomerName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input type="textarea" v-model="formInfo.mobile"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload action="#" list-type="picture-card" :before-upload="uploadImg">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="formInfo.avatar" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="照片" prop="serviceCustomerPicList">
        <el-upload action="#" list-type="picture-card" :before-upload="uploadImg">
          <i slot="default" class="el-icon-plus"></i>
          <div
            v-for="(item, index) in formInfo.serviceCustomerPicList"
            :key="index"
            slot="file"
            slot-scope="{file}"
          >
            <img class="el-upload-list__item-thumbnail" :src="item" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select clearable v-model="formInfo.gender" style="width:220px" placeholder="请选择">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="婚姻状态" prop="maritalStatus">
        <el-select clearable v-model="formInfo.maritalStatus" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="老人居住状况" prop="liveStatus">
        <el-select clearable v-model="formInfo.liveStatus" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民族" prop="ethnic">
        <el-select clearable v-model="formInfo.ethnic" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件信息" prop="idCard">
        <div style="margin-bottom:10px">
          身份证：
          <el-input v-model="formInfo.idCard" style="width:300px"></el-input>
        </div>市民卡：
        <el-input v-model="formInfo.citizenCard" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="所在区域" prop="communityId">
        <el-cascader v-model="formInfo.communityId"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="formInfo.address"></el-input>
      </el-form-item>
      <div class="title">紧急联系人</div>
      <el-form-item label="紧急联系人" prop="emergencyList">
        <el-button>选择人员</el-button>
        <el-button>手动添加</el-button>
      </el-form-item>
      <div class="title">扩展信息</div>
      <el-form-item label="期望养老方式" prop="pensionModeList">
        <el-select
          multiple
          clearable
          v-model="formInfo.pensionModeList"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期望养老服务" prop="pensionServiceList">
        <el-select
          multiple
          clearable
          v-model="formInfo.pensionServiceList"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="政府购买类型" prop="purchaseTypeList">
        <el-select
          multiple
          clearable
          v-model="formInfo.purchaseTypeList"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="老人类别" prop="customerCategoryList">
        <el-select
          multiple
          clearable
          v-model="formInfo.customerCategoryList"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="老人喜好" prop="customerHobbyList">
        <el-select
          multiple
          clearable
          v-model="formInfo.customerHobbyList"
          style="width:220px"
          placeholder="请选择"
        >
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
  name: 'editObject',
  data() {
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
        serviceCustomerName: '1',
        mobile: '13333333333',
        avatar: '131',
        serviceCustomerPicList: ['1'],
        emergencyList: [{ mobile: '13', name: '1' }],
        gender: 1,
        maritalStatus: 1,
        liveStatus: 1,
        ethnic: 1,
        idCard: '1',
        citizenCard: '1',
        communityId: 1,
        cityId: 1,
        districtId: 1,
        streetId: 1,
        address: '1',
        customerCategoryList: ['1'],
        customerHobbyList: ['1'],
        purchaseTypeList: ['1'],
        pensionServiceList: ['1'],
        pensionModeList: ['1']
      },
      rules: {
        serviceCustomerName: [
          { required: true, message: '请输入服务对象名称', trigger: 'blur' }
        ],
        mobile: [
          {
            required: true,
            message: '请输入服务对象手机号',
            validator: validMobile
          }
        ],
        avatar: [
          { required: true, message: '请上传服务对象头像', trigger: 'change' }
        ],
        serviceCustomerPicList: [
          {
            required: true,
            message: '请上传服务对象照片',
            trigger: 'change',
            type: 'array'
          }
        ],
        gender: [
          { required: true, message: '请输入服务对象名称', trigger: 'blur' }
        ],
        maritalStatus: [
          { required: true, message: '请选择婚姻状态', trigger: 'change' }
        ],
        liveStatus: [
          { required: true, message: '请选择老人居住状况', trigger: 'blur' }
        ],
        ethnic: [{ required: true, message: '请选择民族', trigger: 'change' }],
        idCard: [
          { required: true, message: '请输入证件信息', trigger: 'change' }
        ],
        communityId: [
          { required: true, message: '请选择服务对象区域', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择服务对象区域', trigger: 'blur' }
        ],
        emergencyList: [
          {
            required: true,
            message: '请添加紧急联系人',
            trigger: 'change',
            type: 'array'
          }
        ],
        customerCategoryList: [
          {
            required: true,
            message: '请选择老人类别',
            trigger: 'change',
            type: 'array'
          }
        ],
        customerHobbyList: [
          {
            required: true,
            message: '请选择老人喜好',
            trigger: 'change',
            type: 'array'
          }
        ],
        purchaseTypeList: [
          {
            required: true,
            message: '请选择政府购买类型',
            trigger: 'change',
            type: 'array'
          }
        ],
        pensionServiceList: [
          {
            required: true,
            message: '请选择期望养老服务',
            trigger: 'change',
            type: 'array'
          }
        ],
        pensionModeList: [
          {
            required: true,
            message: '请输入期望养老方式',
            trigger: 'change',
            type: 'array'
          }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.sid) {
      this.getServiceUserInfo()
    }
  },
  methods: {
    uploadImg(file) {
      let formdata = new FormData()
      formdata.append('file', this.file)
      this.$http.postForm('', formdata).then(res => {
        if (res.code === 200) {
          this.formInfo.cover = res.data.path
        }
      })
      return false
    },
    handleRemove() {},
    /**
     * @descripttion: 获取服务对象信息
     * @return: 信息
     */
    getServiceUserInfo() {
      this.$http
        .get('/service/customer/get?serviceCustomerId=' + this.$route.query.sid)
        .then(res => {
          if (res.code === SUCCESS) {
            this.formInfo = res.payload
          }
        })
    },
    // 保存按钮
    handleSave() {
      this.$refs['formInfo'].validate(valid => {
        // if (!valid) return
        if (this.$route.query.sid) {
          this.$http
            .post('/service/customer/update', this.formInfo)
            .then(res => {
              if (res.code === SUCCESS) {
                this.$message.success('操作成功')
                this.$router.go(-1)
              }
            })
        } else {
          this.$http.post('/service/customer/add', this.formInfo).then(res => {
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
<style lang="scss">
</style>
