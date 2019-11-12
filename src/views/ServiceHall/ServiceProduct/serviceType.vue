<!--
 * @Descripttion:服务类型
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-12 22:40:39
 -->
<template>
  <div class="service-product">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="类目名称">
        <el-input placeholder="请输入类目名称关键字" v-model="searchData.mobile"></el-input>
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
    <el-button style="margin-bottom:15px" size="small" type="primary">新增类型</el-button>

    <!-- 列表 -->
    <Table
      @commitSelection="commitSelection"
      :searchRefresh="searchRefresh"
      :searchObj="searchData"
      :selection="true"
      :columns="tableColumns"
      api="/serviceType/pageSearch"
      method="get"
    >
    <template slot-scope="{row}" slot="handleColumn">
        <el-button @click="$router.push({name:'editServiceType'})" type="text" size="small">编辑</el-button>
        <span>-</span>
        <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'serviceCenter',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        { label: '类型名称', prop: '', minWidth: 200 },
        { label: '服务产品数量', prop: '', minWidth: 150 },
        {
          label: '操作',
          slot: 'action',
          fixed: 'right',
          minWidth: 200
        }
      ],

    }
  },
  created () {},
  methods: {
    handleDelete (row) {
      let id = row ? [row.serviceTypeId] : ''
      this.$confirm('确定要删除该分类吗？', '提示', {
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
  }
}
</script>
<style lang="scss" scoped>
.service-product {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 193px;
  }
  .el-input--small {
    width: 193px;
  }
}
</style>
