<!--
 * @Descripttion:菜品管理
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-14 09:19:19
 -->
<template>
  <div class="dish-manage">
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
          <template slot-scope="{row}" slot="foodName">
            <div class="flex-t-l">
              <img class="course-avatar" :src="row.indexPic" alt />
              <div class="flex-column-t">
                <span class="f-title">{{row.foodName}}</span>
                <p class="sm-title">￥{{row.price}}</p>
              </div>
            </div>
          </template>
          <template slot-scope="{row}" slot="action">
            <el-button
              @click="$router.push({name:'editDish',query:{fid:row.foodId}})"
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
      </el-col>
    </el-row>
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
        { label: '菜品名称', slot: 'foodName', minWidth: 200 },
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
        arr.push(i.foodId)
      })
      this.selectFood = arr
    },
    handleDelete (row) {
      let id = row ? [row.foodId] : this.selectFood
      this.$confirm('删除后，该产品将无法投入运营使用，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/food/delete', { foodIds: id }).then(res => {
            if (res.code === SUCCESS) {
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
.dish-manage {
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
