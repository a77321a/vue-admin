<!--
 * @Descripttion:选择服务对象
 * @Author:
 * @Date: 2019-11-11 10:37:53
 * @LastEditors:
 * @LastEditTime: 2019-11-11 11:07:05
 -->
<template>
  <div id="select-service-object">
    <el-form>
      <el-form inline ref="form" label-width="80px" size="small">
        <el-form-item label="名称">
          <el-select clearable v-model="searchData.status" placeholder="请选择用户状态">
            <el-option label="全部" value="-1"></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
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
      :height="dialogHeight"
      :searchRefresh="searchRefresh"
      :rowsForamtter="rowsForamtter"
      :searchObj="searchData"
      :selection="true"
      :columns="tableColumns"
      api="/activity/pageSearch"
      method="post"
    >
      <template slot="userInfo" slot-scope="{row}"></template>
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
        { label: '服务对象', slot: 'userInfo', minWidth: 200 },
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
