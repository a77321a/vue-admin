<!--
 * @Descripttion:菜单管理
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-06 21:57:54
 -->
<template>
  <div class="meal-center">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="所属机构">
        <el-select clearable v-model="searchData.status" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="助餐时间">
        <el-date-picker
          v-model="searchData.rangeTime"
          style="width:360px;"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input placeholder="请输入姓名关键字" v-model="searchData.mobile"></el-input>
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
    <el-button style="margin-bottom:15px" size="small" type="primary">新增菜谱</el-button>
    <el-button style="margin-bottom:15px" size="small">复制菜谱</el-button>
    <!-- 列表 -->
    <Table
      @commitSelection="commitSelection"
      :searchRefresh="searchRefresh"
      :spanMethod="cellMerge"
      :searchObj="searchData"
      :selection="false"
      :columns="tableColumns"
      api
      method="get"
    ></Table>
  </div>
</template>
<script>
import MockData from '../../../components/Table/Mock'

export default {
  name: 'mealCenter',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        { label: '时段及日期', prop: 'type', minWidth: 200 },
        { label: '星期一', prop: 'one', minWidth: 150 },
        {
          label: '星期二',
          prop: 'two'
        },
        {
          label: '星期三',
          prop: 'three'
        },
        {
          label: '星期四',
          prop: 'four'
        },
        {
          label: '星期五',
          prop: 'five'
        },
        {
          label: '星期六',
          prop: 'six'
        },
        {
          label: '星期天',
          prop: 'seven'
        }
      ],
      userList: [],
      limit: 10,
      limit2: 10,
      rowList: [],
      spanArr: [],
      position: 0,
      listData: [],
      tempType: '',
      rowNum: 0
    }
  },
  created () {
    this.getSpanArr(MockData)
  },
  methods: {
    cellMerge ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row ? 1 : 0
        console.log({
          rowspan: _row,
          colspan: _col
        })
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getSpanArr (data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].type === data[i - 1].type) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
      console.log(this.spanArr)
    },
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
    }
  }
}
</script>
<style lang="scss" scoped>
.meal-center {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 193px;
  }
  .el-input--small {
    width: 193px;
  }
}
</style>
