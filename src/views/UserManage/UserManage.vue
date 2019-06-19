<template>
  <div class="user-manage">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="用户状态">
        <el-select v-model="searchData.status" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户身份">
        <el-select v-model="searchData.user_type" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="老师" value="1"></el-option>
          <el-option label="学生" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="searchData.starttime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="searchData.endtime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input placeholder="请输入手机号" v-model="searchData.mobile"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button>重置</el-button>
        <el-button type="primary" @click="getUserList" icon="el-icon-search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table
      :header-row-style="{background:'#e6e6e6'}"
      size="small"
      :data="userList"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="40"></el-table-column>
      <el-table-column prop="user_nickname" label="昵称"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="110"></el-table-column>
      <el-table-column prop="status" label="状态" width="70" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" size="small">启用</el-tag>
          <el-tag v-else type="warning" size="small">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="user_type" label="用户身份" width="70" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.user_type == 1" type="info" size="small">教师</el-tag>
          <el-tag v-else type="warning" size="small">学生</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建日期" width="110"></el-table-column>
      <el-table-column fixed="right" prop="mobile" label="操作" width="370">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" size="small" type="danger">禁用</el-button>
          <el-button v-else size="small" type="primary">启用</el-button>
          <el-button size="small" type="primary">重置密码</el-button>
          <el-button size="small" type="primary">已购课程</el-button>
          <el-button size="small" type="primary">查看资料</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination page-size="15" background layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      searchData: {},
      userList: [],
      page: 1,
      total: 0,
      limit: 10
    }
  },
  created () {
    this.getUserList(true)
  },
  methods: {
    getUserList (param) {
      if (param) {
        this.page = 1
      }
      this.$http
        .get(
          '/api/user',
          Object.assign(
            {
              page: this.page,
              limit: this.limit
            },
            this.searchData
          )
        )
        .then(res => {
          this.userList = res.data
          this.total = res.total_count
        })
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
}
</style>
