<!--
 * @Descripttion:养老产品
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-09 11:25:13
 -->
<template>
  <div class="user-manage">
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
            <el-form-item label="产品名称">
              <el-input placeholder="请输入产品名称关键字" v-model="searchData.mobile"></el-input>
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
            @click="$router.push({name:'editPensionProduct'})"
            style="margin-bottom:15px"
            size="small"
            type="primary"
          >新增产品</el-button>
          <!-- 列表 -->
          <Table
            @commitSelection="commitSelection"
            :searchRefresh="searchRefresh"
            :searchObj="searchData"
            :selection="true"
            :columns="tableColumns"
            api
            method="get"
          ></Table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        { label: '活动室名称', prop: '', minWidth: 200 },
        { label: '所属机构', prop: '', minWidth: 150 },
        {
          label: '更新时间',
          prop: '',
          minWidth: 100
        },
        {
          label: '操作',
          slot: 'action',
          fixed: 'right',
          minWidth: 100
        }
      ],
      userList: [],
      limit: 10,
      limit2: 10,
      dialogVisible: false,
      searchCourse: {},
      mobile: '',
      courseList: [],
      activeNames: ''
    }
  },
  created () {},
  methods: {
    commitSelection (data) {
      console.log(data)
    },
    handleStatus (row) {
      let content =
        row.status === 1 ? '您确定禁用此学员？' : '您确定启用此学员？'
      this.$confirm(content, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/api/user/status', { id: row.id }).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            }
          })
        })
        .catch(() => {})
    },
    resetPassword (id) {
      let content = '您确定给该用户重置密码？默认密码为123456'
      this.$confirm(content, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/api/user/repwd', { id: id }).then(res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            }
          })
        })
        .catch(() => {})
    },
    purchasedCourse (row) {
      this.dialogVisible = true
      this.mobile = row.mobile
      this.getCouseList(true)
    }
  }
}
</script>
<style lang="scss" scoped>
.user-manage {
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
