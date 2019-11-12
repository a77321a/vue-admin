<!--
 * @Descripttion:活动中心
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-12 12:32:16
 -->
<template>
  <div class="dictionare-config">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="字典名称">
        <el-input placeholder="请输入字典名称关键字" v-model="searchData.dictName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          @click="searchRefresh = !searchRefresh"
          icon="el-icon-search"
        >搜索</el-button>
        <el-button @click="searchData = {};searchRefresh = !searchRefresh" size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button
      @click="formInfo = {};dialogFormVisible = true"
      style="margin-bottom:15px"
      size="small"
      type="primary"
    >新增目录</el-button>
    <!-- 列表 -->
    <Table
      :searchRefresh="searchRefresh"
      :searchObj="searchData"
      :columns="tableColumns"
      api="/dictionary/pageSearch"
      method="post"
    >
      <template slot-scope="{row}" slot="handleColumn">
        <el-button type="text" size="small">新增字典</el-button>
        <span>-</span>
        <el-button type="text" size="small">编辑</el-button>
        <span>-</span>
        <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
      </template>
    </Table>
    <el-dialog :title="formInfo.name ? '编辑目录' :'新增目录'" :visible.sync="dialogFormVisible">
      <el-form ref="formInfo" :model="formInfo">
        <el-form-item label="目录名称" label-width="80" prop>
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
  name: 'userManage',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      formInfo: { name: '' },
      tableColumns: [
        { label: '字典目录', prop: 'dictionaryLabel', minWidth: 200 },
        { label: '字典key', prop: 'dictionaryKey', minWidth: 150 },
        {
          label: '字典值',
          prop: 'dictionaryValue',
          minWidth: 100
        },
        {
          label: '模块类型',
          prop: 'dictCatalogKey',
          minWidth: 150
        },
        {
          label: '更新时间',
          prop: 'userName',
          minWidth: 150
        },
        {
          label: '操作',
          slot: 'handleColumn',
          fixed: 'right',
          minWidth: 240
        }
      ],
      dialogFormVisible: false
    }
  },
  created () {},
  methods: {
    rowsForamtter (rows) {
      rows.forEach(row => {
        row.activityTime = row.startTime + '~' + row.endTime
      })
    },
    handleSaveForm () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        this.$http.post('', {}).then(res => {
          if (res.code === SUCCESS) {
            this.$message.success('操作成功')
          }
        })
      })
    },
    handleDelete (row) {
      this.$confirm(
        '删除后，与该字典关联的数据值都将被清空，是否确认？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$http
            .todelete('/dictionary/delete?dictionaryIds' + row.dictionaryId)
            .then(res => {
              if (res.code === SUCCESS) {
                this.$message.success('操作成功')
                this.searchRefresh = !this.searchRefresh
              }
            })
        })
        .catch(() => {})
    },
    handleCloseActivity (row) {
      let id = row ? row.activityId : this.selectActivity.join(',')
      let content = '是否要提前结束活动？'
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post(`/activity/close?activityIdList=${id}`, {
              activityIdList: id
            })
            .then(res => {
              if (res.code === SUCCESS) {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
              }
            })
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.dictionare-config {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 193px;
  }
  .el-input--small {
    width: 193px;
  }
  .pages {
    text-align: center;
    margin: 15px 0;
  }
  .warning-row {
    background-color: #f2f2f2;
  }
}
</style>
