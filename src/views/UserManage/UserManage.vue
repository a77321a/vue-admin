<template>
  <div class="user-manage">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="用户状态">
        <el-select clearable v-model="searchData.status" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户身份">
        <el-select clearable v-model="searchData.user_type" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="老师" value="1"></el-option>
          <el-option label="学生" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="searchData.rangeTime"
          style="width:360px;"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input placeholder="请输入手机号" v-model="searchData.mobile"></el-input>
      </el-form-item>
      <el-button
        size="small"
        type="primary"
        @click="searchRefresh = !searchRefresh"
        icon="el-icon-search"
      >搜索</el-button>
      <el-button @click="searchData = {};searchRefresh = !searchRefresh" size="small">重置</el-button>
    </el-form>
    <!-- 列表 -->
    <Table
      @commitSelection="commitSelection"
      :searchRefresh="searchRefresh"
      :searchObj="searchData"
      :selection="true"
      :columns="tableColumns"
      api="/api/user"
      method="get"
    ></Table>
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
        { label: '学生名称', prop: 'nickname', minWidth: 200 },
        { label: '手机号', prop: 'mobile', align: 'center', minWidth: 150 },
        { label: '状态', prop: 'statusName', align: 'center', minWidth: 100 },
        {
          label: '创建时间',
          prop: 'created_at',
          align: 'center',
          minWidth: 150
        },
        {
          label: '操作',
          slot: 'action',
          align: 'center',
          fixed: 'right',
          minWidth: 200
        }
      ],
      userList: [],
      limit: 10,
      limit2: 10,
      dialogVisible: false,
      searchCourse: {},
      mobile: '',
      courseList: []
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
