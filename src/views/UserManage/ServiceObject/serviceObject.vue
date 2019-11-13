<!--
 * @Descripttion:服务对象
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-13 18:28:07
 -->
<template>
  <div class="serviceObject">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="所在区域">
        <el-select clearable v-model="searchData.status" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input placeholder="请输入姓名关键字" v-model="searchData.serviceCustomerName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
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
      @click="$router.push({name:'editObject'})"
      style="margin-bottom:15px"
      size="small"
      type="primary"
    >新增对象</el-button>
    <el-button size="small">导出数据</el-button>
    <!-- 列表 -->
    <Table
      @commitSelection="commitSelection"
      :searchRefresh="searchRefresh"
      :searchObj="searchData"
      :selection="true"
      :columns="tableColumns"
      api="/service/customer/pageSearch"
      method="get"
    >
      <template slot-scope="{row}" slot="handleColumn">
        <el-button type="text" size="small">详情</el-button>
        <span>-</span>
        <el-button type="text" size="small">健康管理</el-button>
        <span>-</span>
        <el-button
          @click="$router.push({name:'editObject',query:{sid:row.serviceCustomerId}})"
          type="text"
          size="small"
        >编辑</el-button>
        <span>-</span>
        <el-button type="text" size="small">删除</el-button>
      </template>
      <template slot="footer-left">
        <el-button type="text">删除</el-button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'serviceObject',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        { label: '姓名', prop: '', minWidth: 200 },
        { label: '性别', prop: '', minWidth: 150 },
        {
          label: '手机号',
          prop: '',
          minWidth: 100
        },
        {
          label: '紧急联系电话',
          prop: '',
          minWidth: 150
        },
        {
          label: '所在区域',
          prop: '',
          minWidth: 150
        },
        {
          label: '操作',
          slot: 'handleColumn',
          fixed: 'right',
          minWidth: 200
        }
      ],

      selectServiceObject: []
    }
  },
  created () {},
  methods: {
    commitSelection (data) {
      let arr = []
      data.forEach(i => {
        arr.push(i.serviceCustomerId)
      })
      this.selectServiceObject = arr
    },
    handleDelete (row) {
      let id = row ? [row.serviceCustomerId] : this.selectServiceObject
      this.$confirm('删除后，该服务对象将被移除，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/service/customer/delete', id).then(res => {
            if (res.code === 200) {
              this.$message.success('操作成功')
              this.searchRefresh = !this.searchRefresh
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.serviceObject {
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
