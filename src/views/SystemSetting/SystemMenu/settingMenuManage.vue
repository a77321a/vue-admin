<!--
 * @Descripttion:空间资源
 * @Author:
 * @Date: 2019-11-06 22:19:24
 * @LastEditors:
 * @LastEditTime: 2019-12-01 18:47:18
 -->
<template>
  <div id="space-resource">
    <div class="tree-title">
      <span class="left">菜单名称</span>
      <span class="right">操作</span>
    </div>
    <el-tree
      draggable
      :allow-drop="allowDrop"
      :expand-on-click-node="false"
      :data="data"
      node-key="id"
      @node-drop="sort"
      default-expand-all
    >
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span style="float:right">
          <el-button type="text" size="mini">查看</el-button>
          <el-button
            type="text"
            size="mini"
            @click="formInfo = JSON.parse(JSON.stringify(data));dialogFormVisible = true"
          >编辑</el-button>
        </span>
      </div>
    </el-tree>
    <el-dialog title="编辑菜单" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="formInfo" label-width="80px" :model="formInfo">
        <el-form-item label="目录名称" prop="name">
          <el-input v-model="formInfo.name" autocomplete="off"></el-input>
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
  name: 'spaceResource',
  data () {
    return {
      dialogFormVisible: false,
      data: [],
      formInfo: {},
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getMenuTree()
  },
  methods: {
    handleSaveForm () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        this.$http
          .post('/menu/update', {
            menuId: this.formInfo.menuId,
            name: this.formInfo.name
          })
          .then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.dialogFormVisible = false
              this.getMenuTree()
            }
          })
      })
    },
    getMenuTree () {
      this.$http.post('/menu/tree').then(res => {
        if (res.code === SUCCESS) {
          this.data = res.payload
        }
      })
    },
    allowDrop (draggingNode, dropNode, type) {
      if (
        draggingNode.level === dropNode.level &&
        draggingNode.data.parentId === dropNode.data.parentId
      ) {
        if (draggingNode.data.aboveId === dropNode.data.aboveId) {
          console.log(draggingNode.data.name, dropNode.data.name)
          return type === 'prev' || type === 'next'
        }
      } else {
        // 不同级进行处理
        return false
      }
    },
    sort (draggingNode, dropNode, type, event) {
      let menuIds = [draggingNode.data.menuId, dropNode.data.menuId]
      let orderValueList = [dropNode.data.orderId, draggingNode.data.orderId]
      this.$http
        .post('/menu/order', {
          menuIdList: menuIds,
          orderValueList: orderValueList
        })
        .then(res => {
          if (res.code === SUCCESS) {
            this.$message.success('操作成功')
          }
        })
    },
    append (node, data) {
      console.log(data, node)
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
#space-resource {
  /deep/ .el-dialog__body {
    padding: 15px;
    padding-top: 0;
  }
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
