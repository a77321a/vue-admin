<template>
  <div class="user-manage">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="所属分类">
        <el-cascader
          :props="{value:'id',label:'title',checkStrictly : true}"
          :options="courseClassify"
          v-model="searchData.course_classify_id"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-select v-model="searchData.states" placeholder="请选择课程状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="正常" value="1"></el-option>
          <el-option label="已禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程类型">
        <el-select v-model="searchData.course_type" placeholder="请选择课程类型"></el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="searchData.start_created_at" type="datetime" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="searchData.finish_created_at" type="datetime" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input placeholder="请输入课程名称" v-model="searchData.title"></el-input>
      </el-form-item>
      <el-form-item label="课程ID">
        <el-input placeholder="请输入课程ID" v-model="searchData.keyword"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button>重置</el-button>
        <el-button type="primary" @click="getCourseList" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <div class="add-course">
        <el-button size="small" type="primary">添加课程</el-button>
      </div>
    </el-form>
    <!-- 列表 -->
    <el-table
      :header-cell-style="{background:'#f2f2f2'}"
      size="small"
      :data="courseList"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="70"></el-table-column>
      <el-table-column prop="title" label="课程名称"></el-table-column>
      <el-table-column prop="chapter_count" label="总课时" width="70"></el-table-column>
      <el-table-column prop="price" label="价格(元)" width="70"></el-table-column>
      <el-table-column prop="course_type" label="课程类型" width="70" align="center">
        <template slot-scope="scope"></template>
      </el-table-column>
      <el-table-column prop="classify_title" label="所属分类" width="90"></el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="90"></el-table-column>
      <el-table-column prop="states" label="课程状态" width="70" align="center">
        <template slot-scope="scope"></template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
          >{{ scope.row.states == 3 ? '下架' :scope.row.states == 1 ? '上架' :'重新上架' }}</el-button>
          <el-button :disabled="scope.row.states == 3" size="mini" type="danger">删除</el-button>
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
  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      searchData: {},
      courseList: [],
      courseClassify: [],
      page: 1,
      total: 0,
      limit: 10,
      dialogVisible: false,
      searchCourse: {},
      mobile: ''
    }
  },
  created () {
    this.getCourseList(true)
    this.getCourseClassify()
  },
  methods: {
    getCourseList (param) {
      if (param) {
        this.page = 1
      }
      this.$http
        .post(
          '/api/course/basis/index/',
          Object.assign(
            {
              page: this.page,
              limit: this.limit
            },
            this.searchData
          )
        )
        .then(res => {
          this.courseList = res.data
          this.total = res.total_count
        })
    },
    getCourseClassify () {
      this.$http.get('/api/course/classify').then(res => {
        let parent = []
        let children = []
        if (res.rows && res.rows.length > 0) {
          res.rows.forEach(i => {
            if (i.packageDuration === 0) {
              i.children = []
              parent.push(i)
            } else {
              children.push(i)
            }
          })
          parent.forEach(i => {
            children.forEach(j => {
              if (j.packageDuration === i.id) {
                i.children.push(j)
              }
            })
          })
        }
        for (let i = 0; i < res.rows.length; i++) {
          if (res.rows[i].packageDuration === 0) {
            this.courseClassify.push(res.rows[i])
          }
        }
      })
    },
    handlePage (val) {
      this.page = val
      this.getCourseList()
    },
    handlePage2 (val) {
      this.page2 = val
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
              this.getCourseList()
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
  .add-course {
    float: right;
  }
}
</style>
