<!--
 * @Descripttion:服务人员
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-23 22:43:04
 -->
<template>
  <div class="Participants">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="人员姓名">
        <el-input
          style="width:200px"
          placeholder="请输入人员姓名关键字"
          v-model="searchData.orgServiceProviderName"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          @click="searchRefresh = !searchRefresh"
          icon="el-icon-search"
        >搜索</el-button>
        <el-button
          @click="searchData = {activityId:searchData.activityId};searchRefresh = !searchRefresh"
          size="small"
        >重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <Table
      :searchRefresh="searchRefresh"
      :rowsForamtter="rowsForamtter"
      :searchObj="searchData"
      :columns="tableColumns"
      api="/activity/provider/pageSearch"
      method="post"
    >
      <template slot="orgServiceProviderName" slot-scope="{row}">
        <div class="flex-t-u">
          <el-avatar class="avatar" size="medium" :src="row.indexPic"></el-avatar>
          <span class="f-title">{{row.orgServiceProviderName}}</span>
        </div>
      </template>
      <template slot="orgServiceProductList" slot-scope="{row}">
        <span :key="index" v-for="(item,index) in row.orgServiceProductList">
          {{item.orgServiceProductName}}
          <span v-if="index != row.orgServiceProductList.length - 1">、</span>
        </span>
      </template>
      <template slot-scope="{row}" slot="handleColumn">
        <el-button type="text" size="small">查看</el-button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'ServicePerson',
  data () {
    return {
      searchRefresh: true,
      searchData: { activityId: this.activityId },
      tableColumns: [
        { label: '姓名', slot: 'orgServiceProviderName', minWidth: 150 },
        { label: '联系人电话', prop: 'telephoneNum', minWidth: 100 },
        { label: '服务产品', slot: 'orgServiceProductList', minWidth: 200 },
        { label: '操作', slot: 'handleColumn', fixed: 'right', minWidth: 60 }
      ]
    }
  },
  props: ['activityId'],

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
