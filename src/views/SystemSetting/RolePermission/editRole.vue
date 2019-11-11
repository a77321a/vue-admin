<!--
 * @Descripttion:新增、编辑角色
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-11 15:12:49
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
      <el-form-item label="名称" prop="roleName">
        <el-input
          maxlength="10"
          show-word-limit
          placeholder="请输入角色名称，最多不超过10个字"
          v-model="formInfo.roleName"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          maxlength="50"
          show-word-limit
          placeholder="请输入角色描述，最多不超过50个字"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="formInfo.roleDesc"
        ></el-input>
      </el-form-item>
      <div class="title">活动信息</div>
      <el-tree style="margin:20px;" show-checkbox :data="data" node-key="id" default-expand-all>
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
        </div>
      </el-tree>
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
        roleName: '',
        roleDesc: '',
        permissionIds: []
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请选择角色描述', trigger: 'blur' }
        ]
      },
      data: [
        {
          id: 1,
          label: '一级 1',
          type: 1,
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          type: 1,
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          type: 1,
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ]
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getRoleInfo()
    }
  },
  methods: {
    getRoleInfo () {
      this.$http.get('/role/get?roleId=' + this.$route.query.id).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo = res.payload
          delete this.formInfo.isVisible
          delete this.formInfo.createTime
          delete this.formInfo.updateTime
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
    },
    handleSave () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        if (this.$route.query.id) {
          this.$http.post('/role/update', this.formInfo).then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
        } else {
          this.$http.post('/role/add', this.formInfo).then(res => {
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
#edit-role {
  .tree-title {
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    font-weight: 700;
    background-color: rgb(241, 241, 241);
    padding: 0px 20px;
    text-align: center;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
  .custom-tree-node {
    padding-right: 20px;
    width: 100%;
  }
  /deep/ .el-tree-node__content {
    height: 40px;
    line-height: 40px;
  }
}
</style>
