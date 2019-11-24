<!--
 * @Descripttion:个人信息
 * @Author: 辛顺宁
 * @Date: 2019-08-13 17:09:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-24 19:20:45
 -->
<template>
  <div id="account-info">
    <el-card header="账号信息" class="box-card">
      <el-form label-width="90px">
        <el-form-item label="头像">
          <el-avatar></el-avatar>
          <el-button type="text" style="float:right;margin-right:20px">修改</el-button>
        </el-form-item>
        <el-form-item label="昵称">{{userDetail.nickName}}</el-form-item>

        <el-form-item label="手机号">{{userDetail.mobile}}</el-form-item>
        <el-form-item label="密码">
          *************
          <el-button
            @click="dialogFormVisible = true"
            type="text"
            style="float:right;margin-right:20px"
          >修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="formInfo" label-width="100px" size="small" :model="formInfo">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            type="password"
            show-password
            placeholder="请输入旧密码"
            v-model="formInfo.oldPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="recordTime">
          <el-input placeholder="请输入新密码" show-password v-model="formInfo.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmNewPassword">
          <el-input placeholder="确认新密码" show-password v-model="formInfo.confirmNewPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'accountInfo',
  data () {
    const validPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认新密码'))
      } else if (
        this.formInfo.confirmNewPassword !== this.formInfo.newPassword
      ) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      userDetail: {},
      dialogFormVisible: false,
      formInfo: {},
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, validator: validPass, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserDetail()
  },
  computed: {
    userInfo () {
      return JSON.parse(JSON.parse(localStorage.userInfo))
    }
  },
  methods: {
    handleSaveForm () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        this.$http
          .post('/user/changePwd', {
            oldPassword: this.formInfo.oldPassword,
            newPassword: this.formInfo.newPassword
          })
          .then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.dialogFormVisible = false
            }
          })
      })
    },
    getUserDetail () {
      this.$http.get('/user/get?userId=' + this.userInfo.userId).then(res => {
        if (res.code === SUCCESS) {
          this.userDetail = res.payload
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#account-info {
  /deep/ .el-card__header {
    background-color: #f5f5f5;
    padding: 12px 20px;
  }
  /deep/ .el-card__body {
    padding: 0;
    padding-top: 10px;
  }
  .box-card /deep/ .el-form-item {
    height: 50px;
    line-height: 50px;
    margin-bottom: 0;
    &:not(:last-child) {
      border-bottom: 1px solid #f5f5f5;
    }
  }
}
</style>
