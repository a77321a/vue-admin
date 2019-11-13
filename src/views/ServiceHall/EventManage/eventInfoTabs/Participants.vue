<!--
 * @Descripttion:参与人员
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-13 14:49:57
 -->
<template>
  <div class="Participants">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="老人类型">
        <el-select
          style="width:200px"
          clearable
          v-model="searchData.activityStatus"
          placeholder="请选择"
        >
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="老人名称">
        <el-input style="width:200px" placeholder="请输入老人名称关键字" v-model="searchData.activityName"></el-input>
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
    <!-- 列表 -->
    <Table
      :searchRefresh="searchRefresh"
      :rowsForamtter="rowsForamtter"
      :searchObj="searchData"
      :columns="tableColumns"
      api
      method="post"
    >
      <template slot-scope="{row}" slot="handleColumn">
        <el-button
          @click="$router.push({name:'eventInfo',query:{aid:row.activityId}})"
          type="text"
          size="small"
        >查看</el-button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'Participants',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        { label: '姓名', slot: 'activityName', minWidth: 150 },
        { label: '紧急联系人电话', prop: 'activityTime', minWidth: 260 },
        {
          label: '老人类别',
          prop: 'orgName',
          minWidth: 100
        },
        {
          label: '操作',
          slot: 'handleColumn',
          fixed: 'right',
          minWidth: 240
        }
      ],
      userList: [],
      limit: 10,
      limit2: 10,
      dialogVisible: false,
      searchCourse: {},
      mobile: '',
      selectActivity: []
    }
  },
  created () {},
  methods: {
    rowsForamtter (rows) {
      rows.forEach(row => {
        row.activityTime = row.startTime + '~' + row.endTime
      })
    },
    handlTime (date) {
      if (date) {
        this.searchData.startTime = date[0]
        this.searchData.endTime = date[1]
      } else {
        this.searchData.startTime = ''
        this.searchData.endTime = ''
      }
    },
    commitSelection (data) {
      let arr = []
      data.forEach(i => {
        arr.push(i.activityId)
      })
      this.selectActivity = arr
    },
    handleDelete (row) {
      let id = row ? [row.activityId] : this.selectActivity
      this.$confirm('删除后，该数据将数据将无法恢复，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/activity/delete', id).then(res => {
            if (res.code === 200) {
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
.Participants {
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
