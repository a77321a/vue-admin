<!--
 * @Descripttion:新增、编辑养老产品
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-13 18:27:19
 -->
<template>
  <div id="edit-event">
    <div class="title">基本信息</div>
    <el-form
      label-suffix="："
      style="width:700px"
      ref="form"
      :model="formInfo"
      label-width="110px"
      size="medium"
    >
      <el-form-item label="姓名">
        <el-input v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input type="textarea" v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
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
      <el-form-item label="照片">
        <el-upload action="#" list-type="picture-card" :before-upload="uploadImg">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="性别">
        <el-select clearable v-model="formInfo.gender" style="width:220px" placeholder="请选择">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="婚姻状态">
        <el-select clearable v-model="formInfo.maritalStatus" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="老人居住状况">
        <el-select clearable v-model="formInfo.liveStatus" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="民族">
        <el-select clearable v-model="formInfo.ethnic" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件信息">
        <div style="margin-bottom:10px">
          身份证：
          <el-input v-model="formInfo.idCard" style="width:300px"></el-input>
        </div>市民卡：
        <el-input v-model="formInfo.citizenCard" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="所在区域">
        <el-cascader v-model="formInfo.cityId"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="formInfo.address"></el-input>
      </el-form-item>
      <div class="title">紧急联系人</div>
      <el-form-item label="紧急联系人">
        <el-button>选择人员</el-button>
        <el-button>手动添加</el-button>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary">立即创建</el-button>
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
        content: ''
      }
    }
  },
  created () {
    if (this.$route.query.sid) {
      this.getServiceUserInfo()
    }
  },
  methods: {
    uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', this.file)
      this.$http.postForm('', formdata).then(res => {
        if (res.code === 200) {
          this.formInfo.cover = res.data.path
        }
      })
      return false
    },
    handleRemove () {},
    /**
     * @descripttion: 获取服务对象信息
     * @return: 信息
     */
    getServiceUserInfo () {
      this.$http
        .get('/service/customer/get?serviceCustomerId=' + this.$route.query.sid)
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
