<!--
 * @Descripttion:活动记录
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-14 17:15:37
 -->
<template>
  <div class="activity-records">
    <!-- 列表 -->
    <Table
      :searchRefresh="searchRefresh"
      :rowsForamtter="rowsForamtter"
      :searchObj="searchData"
      :selection="false"
      :columns="tableColumns"
      api="/service/customer/activity/pageSearch"
      method="post"
    >
      <template slot-scope="{row}" slot="activityName">
        <div class="flex-t-l">
          <img class="course-avatar" :src="row.activityIndexPic" alt />
          <div class="flex-column-t">
            <span class="f-title">{{row.activityName}}</span>
          </div>
        </div>
      </template>
      <template slot-scope="{row}" slot="handleColumn">
        <el-button
          @click="$router.push({name:'eventInfo',query:{aid:row.activityId}})"
          type="text"
          size="small"
        >查看</el-button>
        <span>-</span>
        <el-button
          @click="$router.push({name:'editEventInfo',query:{aid:row.activityId}})"
          type="text"
          size="small"
        >编辑</el-button>
        <span>-</span>
        <el-button @click="handleCloseActivity(row)" type="text" size="small">结束活动</el-button>
        <span>-</span>
        <el-button @click="$router.push({name:'eventInfo'})" type="text" size="small">总结活动</el-button>
        <span>-</span>
        <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
      </template>
      <template slot="footer-left">
        <el-button @click="handleDelete(null)" type="text">删除</el-button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'eventRecords',
  data () {
    return {
      searchRefresh: true,
      searchData: {
        serviceCustomerId: this.serviceCustomerId
      },
      tableColumns: [
        { label: '活动名称', slot: 'activityName', minWidth: 150 },
        { label: '活动时间', prop: 'activityTime', minWidth: 260 },
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
  props: ['serviceCustomerId'],
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
.activity-records {
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
