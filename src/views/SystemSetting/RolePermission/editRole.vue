<!--
 * @Descripttion:新增、编辑角色
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-12-15 14:57:25
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
          :autosize="{ minRows: 2, maxRows: 5}"
          v-model="formInfo.roleDesc"
        ></el-input>
      </el-form-item>

      <div class="title">
        设置权限
        <el-checkbox style="float:right" v-model="checkAll">全选</el-checkbox>
      </div>
      <el-tree
        ref="permissionTree"
        style="margin:20px;"
        :default-checked-keys="defaultKey"
        show-checkbox
        :data="data"
        node-key="permissionId"
        default-expand-all
      >
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.permissionName }}</span>
        </div>
      </el-tree>
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
  name: 'editRole',
  data () {
    return {
      checkAll: false,
      formInfo: {
        roleName: '',
        roleDesc: '',
        permissionIds: []
      },
      defaultKey: [],
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请选择角色描述', trigger: 'blur' }
        ]
      },
      data: []
    }
  },
  created () {
    this.getTree()
  },
  watch: {
    checkAll (val) {
      if (val) {
        let arr = []
        this.data.forEach(i => {
          arr.push(i.permissionId)
        })
        this.defaultKey = arr
      } else {
        console.log(val)
        this.defaultKey.length = []
        this.$refs.permissionTree.setCheckedKeys([])
      }
    }
  },
  methods: {
    getTree () {
      this.$http.get('/permission/getTree', {}).then(res => {
        if (res.code === SUCCESS) {
          this.data = res.payload
        }
        if (this.$route.query.id) {
          this.getRoleInfo()
        }
      })
    },
    getRoleInfo () {
      this.$http.get('/role/edit?roleId=' + this.$route.query.id).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo = res.payload
          let checked = (data, key, newArr) => {
            data.forEach(i => {
              if (i.permissionId === key) {
                if (Array.isArray(i.children) && i.children.length == 0) {
                  newArr.push(i.permissionId)
                }
              } else {
                if (i.children.length !== 0) {
                  checked(i.children, key, newArr)
                }
              }
            })
          }
          let arr = []
          this.formInfo.permissionsList.forEach(i => {
            checked(this.data, i.permissionId, arr)
          })

          this.defaultKey = arr
          delete this.formInfo.isVisible
          delete this.formInfo.createTime
          delete this.formInfo.updateTime
          delete this.formInfo.permissionsList
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
      let nodeList = this.$refs['permissionTree'].getCheckedNodes(false, true)
      let nodeKey = []
      nodeList.forEach(i => {
        nodeKey.push(i.permissionId)
      })
      this.formInfo.permissionIds = nodeKey
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
