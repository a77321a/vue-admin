<!--
 * @Descripttion:菜单管理
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-25 18:00:12
 -->
<template>
  <div class="meal-center">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="所属机构">
        <el-cascader
          clearable
          :props="{ value: 'orgId', label: 'orgName', emitPath: false }"
          :options="orgList"
          v-model="searchData.orgId"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="助餐时间">
        <el-date-picker
          v-model="week"
          @change="transferWeek"
          :picker-options="{ firstDayOfWeek: 1 }"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input
          placeholder="请输入姓名关键字"
          v-model="searchData.mobile"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          ref="search"
          @click="searchRefresh = !searchRefresh"
          icon="el-icon-search"
          >搜索</el-button
        >
        <el-button
          @click="
            searchData = {};
            searchRefresh = !searchRefresh;
          "
          size="small"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <!-- <el-button
      @click="$router.push({ name: 'editMenu' })"
      style="margin-bottom:15px"
      size="small"
      type="primary"
      >新增菜谱</el-button
    >
    <el-button style="margin-bottom:15px" size="small">复制菜谱</el-button> -->
    <!-- 列表 -->
    <!-- :spanMethod="cellMerge"
      :spanFilter="getSpanArr" -->
    <Table
      :menuFor="rowsForamtter"
      :searchRefresh="searchRefresh"
      :searchObj="searchData"
      :selection="false"
      :columns="tableColumns"
      :api="api"
      method="post"
    >
      <template slot="one" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.one" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            {{ item.foodName }}
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)"
          >+ 新增菜品</el-button
        >
      </template>
      <template slot="two" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.two" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            {{ item.foodName }}
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)"
          >+ 新增菜品</el-button
        > </template
      ><template slot="three" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.three" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            {{ item.foodName }}
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)"
          >+ 新增菜品</el-button
        > </template
      ><template slot="four" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.four" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            {{ item.foodName }}
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)"
          >+ 新增菜品</el-button
        > </template
      ><template slot="five" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.five" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            {{ item.foodName }}
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)"
          >+ 新增菜品</el-button
        > </template
      ><template slot="six" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.six" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            {{ item.foodName }}
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)"
          >+ 新增菜品</el-button
        > </template
      ><template slot="seven" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.seven" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            {{ item.foodName }}
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)"
          >+ 新增菜品</el-button
        >
      </template>
    </Table>
  </div>
</template>
<script>
// import MockData from '../../../components/Table/Mock'

export default {
  name: 'mealCenter',
  data () {
    return {
      api: '',
      week: new Date(),
      searchRefresh: true,
      searchData: {},
      orgList: [],
      tableColumns: [
        { label: '时段及日期', prop: 'type', minWidth: 200 },
        { label: '星期一', slot: 'one', minWidth: 100 },
        {
          label: '星期二',
          slot: 'two',
          minWidth: 100
        },
        {
          label: '星期三',
          slot: 'three',
          minWidth: 100
        },
        {
          label: '星期四',
          slot: 'four',
          minWidth: 100
        },
        {
          label: '星期五',
          slot: 'five',
          minWidth: 100
        },
        {
          label: '星期六',
          slot: 'six',
          minWidth: 100
        },
        {
          label: '星期天',
          slot: 'seven',
          minWidth: 100
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
    this.getOrgList()
  },
  methods: {
    handleDelete (row) {
      console.log(row)
    },
    handleAddFood (row) {
      console.log(row)
    },
    rowsForamtter (rows) {
      if (rows.length < 7) {
        let len = 7 - rows.length
        for (let i = 0; i < len; i++) {
          rows.push({})
        }
      }
      let mmap = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
      let fast = {}
      let lunch = {}
      let dinner = {}
      for (let i in rows) {
        if (rows[i].breakfast && rows[i].breakfast.length > 0) {
          fast[mmap[i]] = rows[i].breakfast
        } else {
          fast[mmap[i]] = []
        }
        if (rows[i].lunch && rows[i].lunch.length > 0) {
          lunch[mmap[i]] = rows[i].lunch
        } else {
          lunch[mmap[i]] = []
        }
        if (rows[i].dinner && rows[i].dinner.length > 0) {
          dinner[mmap[i]] = rows[i].dinner
        } else {
          dinner[mmap[i]] = []
        }
      }
      let res = [
        {
          type: '早餐',
          ...fast
        },
        {
          type: '午餐',
          ...lunch
        },
        {
          type: '晚餐',
          ...dinner
        }
      ]
      console.log(res)
      return res
    },
    transferWeek (date) {
      if (date) {
        this.searchData.week = this.$func.getWeek(date) + 1
      } else {
        this.searchData.week = '';
      }
    },
    getOrgList () {
      this.$http.post('/org/tree').then(res => {
        if (res.code === SUCCESS) {
          this.orgList = res.payload
          if (this.orgList.length > 0) {
            if (this.orgList[0].children.length > 0) {
              this.searchData.orgId = this.orgList[0].children[0].orgId
            }
          }
          this.orgList.forEach(i => {
            if (i.children.length > 0) {
              i.children.forEach(j => {
                delete j.children
              })
            }
          })
          this.api = '/org/foodMenu/week';
          this.$refs.search.click()
        }
      })
    },
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
  .food-tag {
    margin-bottom: 10px;
  }
}
</style>
