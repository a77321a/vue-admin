<!--
 * @Descripttion:服务人员
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-13 14:51:53
 -->
<template>
  <div class="Participants">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="人员姓名">
        <el-input style="width:200px" placeholder="请输入人员姓名关键字" v-model="searchData.activityName"></el-input>
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
        <el-button type="text" size="small">查看</el-button>
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
        { label: '老人类别', prop: 'orgName', minWidth: 100 },
        { label: '操作', slot: 'handleColumn', fixed: 'right', minWidth: 240 }
      ]
    }
  },
  created () {},
  methods: {
    rowsForamtter (rows) {
      rows.forEach(row => {
        row.activityTime = row.startTime + '~' + row.endTime
      })
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
