<!--
 * @Descripttion:新增、编辑机构
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-14 21:05:17
 -->
<template>
  <div id="edit-event">
    <div class="title">基本信息</div>
    <el-form
      style="width:700px"
      ref="formInfo"
      :rules="rules"
      :model="formInfo"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="机构名称">
        <el-input
          :maxlength="28"
          placeholder="请输入机构名称，最多不超过28个字"
          show-word-limit
          v-model="formInfo.orgName"
        ></el-input>
      </el-form-item>
      <el-form-item label="机构简介">
        <el-input
          :maxlength="68"
          placeholder="请输入机构简介，最多不超过68个字"
          type="textarea"
          show-word-limit
          v-model="formInfo.orgDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="照片" prop="orgPicList">
        <el-upload
          action="#"
          list-type="picture-card"
          :before-upload="uploadImg"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div
            v-for="(item, index) in formInfo.orgPicList"
            :key="index"
            slot="file"
            slot-scope="{ file }"
          >
            <img class="el-upload-list__item-thumbnail" :src="item" alt />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="机构类型" prop="orgType">
        <el-select
          clearable
          v-model="formInfo.orgType"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in orgTypeList"
            :key="index"
            :label="item.dictionaryLabel"
            :value="item.dictionaryValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="运营模式">
        <el-select
          clearable
          v-model="formInfo.operationMode"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in operationModeList"
            :key="index"
            :label="item.dictionaryLabel"
            :value="item.dictionaryValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务类型" prop="serviceType">
        <el-select
          clearable
          v-model="formInfo.content"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in serviceTypeList"
            :key="index"
            :label="item.dictionaryLabel"
            :value="item.dictionaryValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务范围">
        <el-select
          clearable
          v-model="formInfo.content"
          style="width:220px"
          placeholder="请选择"
        >
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <div class="title">附加信息</div>
      <el-form-item label="机构监控">
        <el-input v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="handleSave" type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'editEvent',
  data () {
    return {
      formInfo: {
        orgPicList: []
      },
      rules: {},
      orgTypeList: [],
      serviceTypeList: [],
      operationModeList: []
    }
  },
  created () {
    this.getOrgType()
    this.getServiceType()
    this.getOperationMode()
  },
  methods: {
    getOperationMode () {
      this.$http.get('/org/operationMode').then(res => {
        if (res.code === SUCCESS) {
          this.operationModeList = res.payload
        }
      })
    },
    getServiceType () {
      this.$http.get('/org/serviceType').then(res => {
        if (res.code === SUCCESS) {
          this.serviceTypeList = res.payload
        }
      })
    },
    getOrgType () {
      this.$http.get('/org/orgType').then(res => {
        if (res.code === SUCCESS) {
          this.orgTypeList = res.payload
        }
      })
    },
    handleRemove () {},
    // 保存按钮
    handleSave () {
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
    uploadImg (file) {
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
