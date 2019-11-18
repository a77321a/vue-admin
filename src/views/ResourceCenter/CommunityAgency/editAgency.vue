<!--
 * @Descripttion:新增、编辑机构
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-18 18:11:07
 -->
<template>
  <div id="edit-event">
    <div class="title">基本信息</div>
    <el-form
      style="width:700px"
      ref="formInfo"
      :rules="rules"
      :model="formInfo"
      label-width="110px"
      size="medium"
    >
      <el-form-item label="机构名称" prop="orgName">
        <el-input
          :maxlength="28"
          placeholder="请输入机构名称，最多不超过28个字"
          show-word-limit
          v-model="formInfo.orgName"
        ></el-input>
      </el-form-item>
      <el-form-item label="机构简介" prop="orgDesc">
        <el-input
          :maxlength="68"
          placeholder="请输入机构简介，最多不超过68个字"
          type="textarea"
          show-word-limit
          v-model="formInfo.orgDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="照片" prop="orgPicList">
        <el-upload action="#" list-type="picture-card" :before-upload="uploadImg">
          <i slot="default" class="el-icon-plus"></i>
          <div
            v-for="(item, index) in formInfo.orgPicList"
            :key="index"
            slot="file"
            slot-scope="{ file }"
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
      <el-form-item label="机构类型" prop="orgType">
        <el-select clearable v-model="formInfo.orgType" style="width:220px" placeholder="请选择">
          <el-option
            v-for="(item, index) in orgTypeList"
            :key="index"
            :label="item.dictionaryLabel"
            :value="item.dictionaryValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运营模式" prop="operationMode">
        <el-select clearable v-model="formInfo.operationMode" style="width:220px" placeholder="请选择">
          <el-option
            v-for="(item, index) in operationModeList"
            :key="index"
            :label="item.dictionaryLabel"
            :value="item.dictionaryValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务类型" prop="serviceType">
        <el-select clearable v-model="formInfo.serviceType" style="width:220px" placeholder="请选择">
          <el-option
            v-for="(item, index) in serviceTypeList"
            :key="index"
            :label="item.dictionaryLabel"
            :value="item.dictionaryValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务范围" prop="districtRegionId">
        <el-select
          clearable
          v-model="formInfo.districtRegionId"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <div class="title">其他信息</div>
      <el-form-item label="机构位置" prop="latitude">
        <el-input style="width:240px" readonly v-model="formInfo.latLong"></el-input>
        <el-button style="margin-left:20px" @click="openMap">选择位置</el-button>
      </el-form-item>
      <el-form-item label="详细地址" prop="orgAddress">
        <el-input v-model="formInfo.orgAddress"></el-input>
      </el-form-item>
      <el-form-item label="机构联系人" prop="contact">
        <el-input :maxlength="10" show-word-limit v-model="formInfo.contact"></el-input>
      </el-form-item>
      <el-form-item label="机构联系电话" prop="tel">
        <el-input v-model="formInfo.tel"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="handleSave" type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="选择地点" :visible.sync="mapShow" width="70%">
      <GdMap @selectArea="selectArea"></GdMap>
    </el-dialog>
  </div>
</template>
<script>
import GdMap from '@/components/GDMAP/GdMap'
export default {
  name: 'editAgency',
  components: {
    GdMap
  },
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
        orgDesc: '',
        orgPicList: [],
        latLong: '',
        orgName: '',
        latitude: '',
        longitude: '',
        contact: ''
      },
      rules: {
        orgName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        orgDesc: [
          { required: true, message: '请输入机构简介', trigger: 'blur' }
        ],
        orgPicList: [
          { required: true, message: '请上传机构图片', trigger: 'change' }
        ],
        orgType: [
          { required: true, message: '请选择机构类型', trigger: 'change' }
        ],
        operationMode: [
          { required: true, message: '请选择服务模式', trigger: 'change' }
        ],
        serviceType: [
          { required: true, message: '请选择服务类型', trigger: 'change' }
        ],
        districtRegionId: [
          { required: true, message: '请选择服务范围', trigger: 'change' }
        ],
        latitude: [
          { required: true, message: '请选择服务位置', trigger: 'change' }
        ],
        orgAddress: [
          { required: true, message: '请输入机构详细地址', trigger: 'blur' }
        ],
        tel: [{ required: true, validator: validMobile, trigger: 'blur' }],
        contact: [
          { required: true, message: '请输入机构联系人姓名', trigger: 'blur' }
        ]
      },
      orgTypeList: [],
      serviceTypeList: [],
      operationModeList: [],
      mapShow: false
    }
  },
  created() {
    this.getOrgType()
    this.getServiceType()
    this.getOperationMode()
  },
  methods: {
    openMap() {
      this.mapShow = true
    },
    selectArea(row) {
      this.formInfo.latitude = row.lat
      this.formInfo.longitude = row.lng
      this.formInfo.latLong = `${row.lng}，${row.lat}`
      this.mapShow = false
    },
    getOperationMode() {
      this.$http.get('/org/operationMode').then(res => {
        if (res.code === SUCCESS) {
          this.operationModeList = res.payload
        }
      })
    },
    getServiceType() {
      this.$http.get('/org/serviceType').then(res => {
        if (res.code === SUCCESS) {
          this.serviceTypeList = res.payload
        }
      })
    },
    getOrgType() {
      this.$http.get('/org/orgType').then(res => {
        if (res.code === SUCCESS) {
          this.orgTypeList = res.payload
        }
      })
    },
    handleRemove() {},
    // 保存按钮
    handleSave() {
      this.$refs['formInfo'].validate(valid => {
        console.log(valid)
        if (!valid) return
        if (this.$route.query.aid) {
          this.$http.post('/org/update', this.formInfo).then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
        } else {
          this.$http.post('/ord/add', this.formInfo).then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
        }
      })
    },
    uploadImg(file) {
      let formdata = new FormData()
      formdata.append('file', this.file)
      this.$http.postForm('', formdata).then(res => {
        if (res.code === 200) {
          this.formInfo.cover = res.data.path
        }
      })
      return false
    }
  }
}
</script>
<style lang="scss"></style>
