<!--
 * @Descripttion:服务类型
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-15 22:48:10
 -->
<template>
  <div class="service-product">
    <el-row :gutter="20">
      <el-col style="background:#f9f9f9;height:calc(100vh - 140px)" :span="6">
        <div class="checked">和康养老机构1部</div>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="禾康养老机构总部" name="1">
            <div>和康养老机构1部</div>
            <div>和康养老机构2部</div>
          </el-collapse-item>
          <el-collapse-item title="禾康养老机构总部1" name="2">
            <div>和康养老机构1部</div>
            <div>和康养老机构2部</div>
          </el-collapse-item>
          <el-collapse-item title="禾康养老机构总部2" name="3">
            <div>和康养老机构1部</div>
            <div>和康养老机构2部</div>
          </el-collapse-item>
          <el-collapse-item title="禾康养老机构总部3" name="4">
            <div>和康养老机构1部</div>
            <div>和康养老机构2部</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <!-- 筛选 -->
      <el-col :span="18">
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
          :columns="tableColumns"
          api="/org/service/type/pageSearch "
          method="post"
        >
          <template slot-scope="{row}" slot="action">
            <el-button @click="diglogVisiable = true" type="text" size="small">编辑</el-button>
            <span>-</span>
            <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
          </template>
        </Table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'serviceCenter',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      diglogVisiable: false,
      tableColumns: [
        { label: '类型名称', prop: 'orgServiceTypeName', minWidth: 200 },
        { label: '服务产品数量', prop: 'productNum', minWidth: 150 },
        {
          label: '操作',
          slot: 'action',
          fixed: 'right',
          width: 100
        }
      ]
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
    }
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
  /deep/ .el-collapse-item__header {
    padding-left: 10px;
  }
  .checked {
    width: calc(100% - 30px);
    padding-left: 20px;
    height: 34px;
    line-height: 34px;
    margin: 10px 0;
    border-left: 5px solid #409eff;
    background-color: #fff;
    position: relative;
    &::after {
      position: absolute;
      top: -1px;
      right: -8px;
      display: block;
      width: 0;
      height: 0;
      content: ' ';
      border-color: transparent transparent transparent #fff;
      border-style: solid;
      border-width: 18px 0 18px 8px;
    }
  }
}
</style>
