<!--
 * @Descripttion:活动中心
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-11 13:59:07
 -->
<template>
  <div class="user-manage">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="活动状态">
        <el-select clearable v-model="searchData.status" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="searchData.rangeTime"
          style="width:360px;"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input placeholder="请输入活动名称关键字" v-model="searchData.mobile"></el-input>
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
      @click="$router.push({name:'editEvent'})"
      style="margin-bottom:15px"
      size="small"
      type="primary"
    >新增活动</el-button>
    <!-- 列表 -->
    <Table
      @commitSelection="commitSelection"
      :searchRefresh="searchRefresh"
      :rowsForamtter="rowsForamtter"
      :searchObj="searchData"
      :selection="true"
      :columns="tableColumns"
      api="/activity/pageSearch"
      method="post"
    >
      <template slot-scope="{row}" slot="handleColumn">
        <el-button @click="$router.push({name:'eventInfo'})" type="text" size="small">查看</el-button>
        <span>-</span>
        <el-button @click="$router.push({name:'eventInfo'})" type="text" size="small">编辑</el-button>
        <span>-</span>
        <el-button @click="handleCloseActivity(row)" type="text" size="small">结束活动</el-button>
        <span>-</span>
        <el-button @click="$router.push({name:'eventInfo'})" type="text" size="small">总结活动</el-button>
        <span>-</span>
        <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
      </template>
      <template slot="footer-left">
        <el-button @click="handleCloseActivity(null)" type="text">结束活动</el-button>
        <el-button @click="handleDelete(null)" type="text">删除</el-button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        { label: '活动名称', prop: 'activityName', minWidth: 200 },
        { label: '活动时间', prop: 'activityTime', minWidth: 150 },
        {
          label: '参与人员',
          prop: 'orgName',
          minWidth: 100
        },
        {
          label: '活动状态',
          prop: 'activityStatus',
          minWidth: 150
        },
        {
          label: '创建人',
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
    clickInfo (row) {
      console.log(row)
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
.user-manage {
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
