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
        <el-date-picker v-model="searchData.starttime" type="datetime" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="searchData.endtime" type="datetime" placeholder="选择日期"></el-date-picker>
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
      :header-cell-style="{background:'#f2f2f2'}"
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
      <el-table-column fixed="right" prop="mobile" label="操作" width="350">
        <template slot-scope="scope">
          <el-button
            @click="handleStatus(scope.row)"
            v-if="scope.row.status == 1"
            size="mini"
            type="danger"
          >禁用</el-button>
          <el-button @click="handleStatus(scope.row)" v-else size="mini" type="primary">启用</el-button>
          <el-button @click="resetPassword(scope.row.id)" size="mini" type="primary">重置密码</el-button>
          <el-button @click="purchasedCourse(scope.row)" size="mini" type="primary">已购课程</el-button>
          <el-button @click="handleUserInfo(scope.row.id)" size="mini" type="primary">查看资料</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        @current-change="handlePage"
        :page-size="15"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 已购课程 -->
    <el-dialog :close-on-click-modal="false" width="70%" title="已购课程" :visible.sync="dialogVisible">
      <el-form inline ref="form1" label-width="80px" size="small">
        <el-form-item label="用户状态">
          <el-select v-model="searchCourse.pay_states" placeholder="请选择用户状态">
            <el-option label="待支付" value="1"></el-option>
            <el-option label="已取消" value="3"></el-option>
            <el-option label="已完成" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="searchCourse.start_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="searchCourse.end_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input placeholder="请输入订单编号" v-model="searchData.mobile"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="searchCourse = {}">重置</el-button>
          <el-button type="primary" @click="getCouseList" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table
        border
        size="small"
        :span-method="arraySpanMethod"
        :header-cell-style="{background:'#f2f2f2'}"
        :data="courseList"
        style="width: 100%"
        :cell-style="tabRowClassName"
      >
        <el-table-column prop="user_name" label="下单用户"></el-table-column>
        <el-table-column prop="mobile" label="用户手机号"></el-table-column>
        <el-table-column prop="shop_name" label="商品名称"></el-table-column>
        <el-table-column prop="course_type" label="商品类型"></el-table-column>
        <el-table-column prop="pay_states" label="订单状态"></el-table-column>
        <el-table-column prop="ship_status" label="发货状态"></el-table-column>
        <el-table-column prop="price" label="订单金额"></el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination
          @current-change="handlePage2"
          :page-size="15"
          background
          layout="prev, pager, next"
          :total="total2"
        ></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      page2: 1,
      total: 0,
      total2: 0,
      limit: 10,
      limit2: 10,
      dialogVisible: false,
      searchCourse: {},
      mobile: '',
      courseList: []
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
    },
    handlePage (val) {
      this.page = val
      this.getUserList()
    },
    handlePage2 (val) {
      this.page2 = val
      this.getCouseList()
    },
    handleStatus (row) {
      let content =
        row.status === 1 ? '您确定禁用此学员？' : '您确定启用此学员？';
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
              this.getUserList()
            }
          })
        })
        .catch(() => {})
    },
    resetPassword (id) {
      let content = '您确定给该用户重置密码？默认密码为123456';
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
    },
    getCouseList (param) {
      if (param) {
        this.page2 = 1
      }
      this.$http
        .post(
          '/api/order/index',
          Object.assign(this.searchCourse, {
            mobile: this.mobile
          })
        )
        .then(res => {
          this.courseList = res.data
          for (let i = 0; i < this.courseList.length; i++) {
            if (i % 2 === 0) {
              this.courseList.splice(i, 0, {
                user_name: '订单编号：' + this.courseList[i].order_number
              })
            }
          }
          this.total2 = this.total_count
        })
    },
    handleUserInfo (id) {},
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 8]
        } else if (columnIndex === 7) {
          return [0, 0]
        }
      }
    },
    tabRowClassName ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        // eslint-disable-next-line semi
        return { 'background-color': '#f2f2f2' };
      }
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
