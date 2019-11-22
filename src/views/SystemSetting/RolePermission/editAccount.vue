<!--
 * @Descripttion:新增、编辑角色
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-22 17:07:10
 -->
<template>
  <div id="edit-role">
    <div class="title">基本信息</div>
    <el-form
      style="width:700px"
      :rules="rules"
      ref="formInfo"
      :model="formInfo"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="人员类型">
        <el-radio-group v-model="formInfo.userType">
          <el-radio-button style="box-shadow: none;" :label="1">内部服务人员</el-radio-button>
          <el-radio-button style="box-shadow: none;" :label="2">外部人员</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
          maxlength="10"
          show-word-limit
          placeholder="请输入用户昵称，最多不超过10个字"
          v-model="formInfo.roleName"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          maxlength="11"
          show-word-limit
          placeholder="请输入手机号，可用于登录管理平台"
          type="text"
          v-model="formInfo.roleDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input placeholder="请输入密码" type="text" v-model="formInfo.roleDesc"></el-input>
      </el-form-item>
      <div class="title">资源设置</div>
      <el-form-item label="管理范围">
        <el-radio-group v-model="formInfo.limit">
          <div class="vert-radio">
            <el-radio :label="1">超级管理员</el-radio>
            <el-input style="visibility:hidden;width:70px;"></el-input>
          </div>
          <div class="vert-radio">
            <el-radio :label="2">社区</el-radio>
            <el-cascader
              style="vertical-align:sub"
              v-if="formInfo.limit == 2"
              clearable
              :props="{value:'regionId',label:'addressName'}"
              :options="spaceTree"
              v-model="formInfo.addressList"
            ></el-cascader>
          </div>
          <div class="vert-radio">
            <el-radio :label="3">机构</el-radio>
            <el-cascader
              v-if="formInfo.limit == 3"
              style="vertical-align:sub"
              clearable
              :props="{value:'orgId',label:'orgName',emitPath:false}"
              :options="orgTree"
              v-model="formInfo.orgId"
            ></el-cascader>
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="handleSave" type="primary">保 存</el-button>
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
        userType: 1,
        limit: 2
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请选择角色描述', trigger: 'blur' }
        ]
      },
      spaceTree: [],
      orgTree: []
    }
  },
  created () {
    if (this.$route.query.uid) {
      // this.getAccountInfo()
    }
    this.getTree()
    this.getOrgList()
  },
  methods: {
    getOrgList () {
      this.$http.post('/org/tree').then(res => {
        if (this.$route.query.aid) {
          this.getActivityInfo()
        }
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
    getAccountInfo () {
      this.$http.get('/user/get?userId=' + this.$route.query.uid).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo = res.payload
          // delete this.formInfo.isVisible
          // delete this.formInfo.createTime
          // delete this.formInfo.updateTime
        }
      })
    },
    handleSave () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        let url = this.$route.query.uid ? '/user/update' : '/user/add'
        this.$http.post(url, this.formInfo).then(res => {
          if (res.code === SUCCESS) {
            this.$message.success('操作成功')
            this.$router.go(-1)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
#edit-role {
  .vert-radio {
    height: 45px;
    line-height: 45px;
  }
}
</style>
