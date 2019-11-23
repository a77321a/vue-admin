<!--
 * @Descripttion:空间资源
 * @Author:
 * @Date: 2019-11-06 22:19:24
 * @LastEditors:
 * @LastEditTime: 2019-11-23 22:49:00
 -->
<template>
  <div id="space-resource">
    <div class="tree-title">
      <span class="left">名称</span>
      <span class="right">操作</span>
    </div>
    <el-tree :expand-on-click-node="false" :data="data" node-key="regionId" default-expand-all>
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.addressName }}</span>
        <span style="float:right">
          <el-button
            type="text"
            size="mini"
            @click="() => handleAppend(node,data)"
          >{{data.depth == 1 ? '新增区（县）' : data.depth == 2 ? '新增街道（乡）' : data.depth ==3 ?'新增社区（村）':''}}</el-button>
          <el-button type="text" size="mini" @click="() => handleDelete(node, data)">删除</el-button>
        </span>
      </div>
    </el-tree>
    <el-dialog title="选择地点" :visible.sync="dialogVisible" width="70%">
      <GdMap @selectArea="selectArea"></GdMap>
    </el-dialog>
  </div>
</template>
<script>
import GdMap from '@/components/GDMAP/GdMap'
export default {
  name: 'spaceResource',
  components: {
    GdMap
  },
  data () {
    return {
      data: [],
      tempObj: {},
      formInfo: {},
      dialogVisible: false
    }
  },
  created () {
    this.getTree()
  },
  methods: {
    selectArea (row) {
      this.formInfo.latitude = row.lat
      this.formInfo.longitude = row.lng
      let addressName = ''
      if (this.tempObj.depth === 1) {
        this.addressName = row.component.district
      } else if (this.tempObj.depth === 2) {
        this.addressName = row.component.township
      } else if (this.tempObj.depth === 3) {
        this.addressName = row.address.split(row.component.township)[1]
      }
      console.log(row)

      this.mapShow = false
    },
    getTree () {
      this.$http.post('/address/tree').then(res => {
        if (res.code === SUCCESS) {
          this.data = res.payload
        }
      })
    },
    handleDelete (row) {
      let id = row ? [row.activityId] : this.selectActivity
      this.$confirm('删除后，该数据将数据将无法恢复，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/address/delete', id).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功')
              this.searchRefresh = !this.searchRefresh
            }
          })
        })
        .catch(() => {})
    },

    handleAppend (node, data) {
      this.tempObj = data
      this.dialogVisible = true
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
