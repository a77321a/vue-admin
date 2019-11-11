<!--
 * @Descripttion:菜品管理
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-11 16:48:35
 -->
<template>
  <div class="dish-manage">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="菜品类型">
        <el-select clearable v-model="searchData.foodType" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适用季节">
        <el-select clearable v-model="searchData.season" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜品名称">
        <el-input placeholder="请输入菜品名称关键字" v-model="searchData.foodName"></el-input>
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
      @click="$router.push({name:'editDish'})"
      style="margin-bottom:15px"
      size="small"
      type="primary"
    >新增菜品</el-button>
    <!-- 列表 -->
    <Table
      @commitSelection="commitSelection"
      :searchRefresh="searchRefresh"
      :searchObj="searchData"
      :selection="true"
      :columns="tableColumns"
      api="/food/pageSearch"
      method="post"
    >
      <template slot-scope="{row}" slot="action">
        <el-button
          @click="$router.push({name:'editDish',query:{fid:row.foodId}})"
          type="text"
          size="small"
        >编辑</el-button>
        <span>-</span>
        <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
      </template>
    </Table>
  </div>
</template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'mealCenter',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        { label: '菜品名称', prop: 'foodName', minWidth: 200 },
        { label: '菜品类型', prop: 'foodType', minWidth: 150 },
        {
          label: '适用季节',
          prop: 'season',
          minWidth: 100
        },
        {
          label: '创建人',
          prop: '',
          minWidth: 150
        },
        {
          label: '创建时间',
          prop: '',
          minWidth: 150
        },
        {
          label: '操作',
          slot: 'action',
          fixed: 'right',
          minWidth: 200
        }
      ],
      selectFood: []
    }
  },
  created () {},
  methods: {
    commitSelection (data) {
      let arr = []
      data.forEach(i => {
        arr.push(i.activityId)
      })
      this.selectFood = arr
    },
    handleDelete (row) {
      this.$confirm('删除后，该产品将无法投入运营使用，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/food/delete?foodId' + row.foodId).then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.searchRefresh = !this.searchRefresh
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
.dish-manage {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 193px;
  }
  .el-input--small {
    width: 193px;
  }
}
</style>
