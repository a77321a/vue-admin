<!--
 * @Descripttion:服务人员
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-12 12:46:55
 -->
<template>
  <div class="service-user">
    <!-- 筛选 -->
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
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-form inline ref="form" label-width="80px" size="small">
            <el-form-item label="姓名">
              <el-input placeholder="请输入姓名关键字" v-model="searchData.serviceProviderName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input placeholder="请输入手机号" v-model="searchData.telephoneNum"></el-input>
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
            @click="$router.push({name:'editServiceUser'})"
            style="margin-bottom:15px"
            size="small"
            type="primary"
          >新增人员</el-button>
          <!-- 列表 -->
          <Table
            @commitSelection="commitSelection"
            :searchRefresh="searchRefresh"
            :searchObj="searchData"
            :selection="true"
            :columns="tableColumns"
            api="/serviceProvider/pageSearch"
            method="get"
          >
            <template slot-scope="{row}" slot="action">
              <el-button @click="$router.push({name:'serviceUserInfo'})" type="text" size="small">详情</el-button>
              <span>-</span>
              <el-button
                @click="$router.push({name:'editServiceUser',query:{sid:row.serviceProviderId}})"
                type="text"
                size="small"
              >编辑</el-button>
              <span>-</span>
              <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
            </template>
            <template slot="footer-left">
              <el-button @click="handleDelete(null)" type="text">删除</el-button>
            </template>
          </Table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'serviceUser',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        { label: '姓名', prop: '', minWidth: 100 },
        { label: '性别', prop: '', minWidth: 100 },
        { label: '手机号', prop: '', minWidth: 100 },
        { label: '所属机构', prop: '', minWidth: 100 },
        { label: '创建人', prop: '', minWidth: 100 },
        { label: '创建时间', prop: '', minWidth: 100 },
        {
          label: '操作',
          slot: 'action',
          fixed: 'right',
          minWidth: 100
        }
      ],
      activeNames: '',
      selectServiceUser: []
    }
  },
  created () {},
  methods: {
    // 多选  同所有表格
    commitSelection (data) {
      let arr = []
      data.forEach(i => {
        arr.push(i.serviceProviderId)
      })
      this.selectServiceUser = arr
    },
    // 删除
    handleDelete (row) {
      let id = row ? [row.serviceProviderId] : this.selectServiceUser
      this.$confirm('删除后，该数据将数据将无法恢复，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/serviceProvider/delete', id).then(res => {
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
.service-user {
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
