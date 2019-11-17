<!--
 * @Descripttion:选择服务人员
 * @Author:
 * @Date: 2019-11-11 10:37:53
 * @LastEditors:
 * @LastEditTime: 2019-11-16 18:38:32
 -->
<template>
  <div id="select-service-object">
    <el-form>
      <el-form inline ref="form" label-width="80px" size="small">
        <el-form-item label="名称">
          <el-input placeholder="请输入服务人员名称" v-model="searchData.orgServiceProviderName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            @click="searchRefresh = !searchRefresh"
            icon="el-icon-search"
          >搜索</el-button>
          <el-button
            @click="searchData.orgServiceProviderName = '';searchRefresh = !searchRefresh"
            size="small"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-form>
    <Table
      @commitSelection="commitSelection"
      :height="$store.state.dialogHeight-100"
      :searchRefresh="searchRefresh"
      :rowsForamtter="rowsForamtter"
      :searchObj="searchData"
      :selection="true"
      :columns="tableColumns"
      api="/org/service/provider/pageSearch"
      method="post"
    >
      <template slot="userInfo" slot-scope="{row}">
        <el-avatar size="medium" :src="row.indexPic"></el-avatar>
        {{row.orgServiceProviderName}}
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
      searchData: {
        orgId: Array.isArray(this.orgId)
          ? Number(this.orgId[this.orgId.length - 1])
          : this.orgId
      },
      tableColumns: [
        { label: '服务人员', slot: 'userInfo', minWidth: 200 },
        { label: '所属机构', prop: 'orgName', minWidth: 150 }
      ]
    }
  },

  props: ['orgId'],
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
