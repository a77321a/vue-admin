<!--
 * @Descripttion:机构管理
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-14 09:43:16
 -->
<template>
  <div class="angecy-manage">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="机构状态">
        <el-select clearable v-model="searchData.status" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机构类型">
        <el-select clearable v-model="searchData.status" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务类型">
        <el-select clearable v-model="searchData.status" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="机构名称">
        <el-input placeholder="请输入机构名称关键字" v-model="searchData.mobile"></el-input>
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
      @click="$router.push({name:'editAgency'})"
      style="margin-bottom:15px"
      size="small"
      type="primary"
    >新增机构</el-button>
    <el-button style="margin-bottom:15px" size="small">导出数据</el-button>
    <!-- 列表 -->
    <Table
      :searchRefresh="searchRefresh"
      :searchObj="searchData"
      :selection="false"
      :columns="tableColumns"
      api="/org/pageSearch"
      method="post"
    ></Table>
  </div>
</template>
<script>
export default {
  name: 'agencyManage',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        { label: '机构名称', prop: '', minWidth: 200 },
        { label: '服务范围', prop: '', minWidth: 150 },
        {
          label: '机构类型',
          prop: '',
          minWidth: 100
        },
        {
          label: '服务类型',
          prop: '',
          minWidth: 150
        },
        {
          label: '机构状态',
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
    clickInfo (row) {
      console.log(row)
    },
    commitSelection (data) {
      console.log(data)
    },
    // getAgencyInfo(){

    // },
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
    }
  }
}
</script>
<style lang="scss" scoped>
.angecy-manage {
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
