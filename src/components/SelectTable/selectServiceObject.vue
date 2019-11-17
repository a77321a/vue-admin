<!--
 * @Descripttion:选择服务对象
 * @Author:
 * @Date: 2019-11-11 10:37:53
 * @LastEditors:
 * @LastEditTime: 2019-11-16 20:12:13
 -->
<template>
  <div id="select-service-object">
    <el-form>
      <el-form inline ref="form" label-width="80px" size="small">
        <el-form-item label="名称">
          <el-input placeholder="请输入服务对象名字" v-model="name"></el-input>
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
    </el-form>
    <Table
      @commitSelection="commitSelection"
      :height="$store.state.dialogHeight -100"
      :searchRefresh="searchRefresh"
      :rowsForamtter="rowsForamtter"
      :searchObj="searchData"
      :selection="true"
      :columns="tableColumns"
      api="/service/customer/pageSearch "
      method="post"
    >
      <template slot="userInfo" slot-scope="{row}">
        <el-avatar size="medium" :src="row.avatar"></el-avatar>
        {{row.serviceCustomerName}}
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'selectServiceObject',
  data () {
    return {
      name: '',
      searchRefresh: true,
      selectData: [],
      searchData: {},
      tableColumns: [
        { label: '服务人员', slot: 'userInfo', align: 'left', minWidth: 100 },
        { label: '所在区域', prop: 'activityTime', minWidth: 150 }
      ]
    }
  },

  methods: {
    commitSelection (data) {
      this.selectData = data
    },
    rowsForamtter (row) {}
  }
}
</script>
<style lang="scss" scoped>
</style>
