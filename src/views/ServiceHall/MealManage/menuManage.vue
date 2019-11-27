<!--
 * @Descripttion:菜单管理
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-27 23:07:57
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
        <el-input placeholder="请输入姓名关键字" v-model="searchData.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          ref="search"
          @click="searchRefresh = !searchRefresh"
          icon="el-icon-search"
        >搜索</el-button>
        <el-button
          @click="
            searchData = { orgId: searchData.orgId };
            searchRefresh = !searchRefresh;
          "
          size="small"
        >重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-button
      @click="$router.push({ name: 'editMenu' })"
      style="margin-bottom:15px"
      size="small"
      type="primary"
      >新增菜谱</el-button
    >-->
    <el-button style="margin-bottom:15px" size="small">复制本周菜谱</el-button>
    <!-- 列表 -->
    <!-- :spanMethod="cellMerge"
    :spanFilter="getSpanArr"-->
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
            <span class="food-name">{{ item.foodName }}</span>
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)">+ 新增菜品</el-button>
      </template>
      <template slot="two" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.two" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            <span class="food-name">{{ item.foodName }}</span>
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)">+ 新增菜品</el-button>
      </template>
      <template slot="three" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.three" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            <span class="food-name">{{ item.foodName }}</span>
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)">+ 新增菜品</el-button>
      </template>
      <template slot="four" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.four" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            <span class="food-name">{{ item.foodName }}</span>
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)">+ 新增菜品</el-button>
      </template>
      <template slot="five" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.five" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            <span class="food-name">{{ item.foodName }}</span>
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)">+ 新增菜品</el-button>
      </template>
      <template slot="six" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.six" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            <span class="food-name">{{ item.foodName }}</span>
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)">+ 新增菜品</el-button>
      </template>
      <template slot="seven" slot-scope="{ row, scope }">
        <div class="food-tag" v-for="(item, index) in row.seven" :key="index">
          <el-tag @close="handleDelete(scope, row)" closable>
            <span class="food-name">{{ item.foodName }}</span>
          </el-tag>
        </div>
        <el-button size="small" @click="handleAddFood(scope)">+ 新增菜品</el-button>
      </template>
    </Table>
    <el-dialog title="添加菜品" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="formInfo" label-width="80px" :model="formInfo">
        <el-form-item label="所属机构" prop="orgIds">
          <el-select clearable multiple v-model="formInfo.orgIds" placeholder="请选择用户状态">
            <el-option
              v-for="(item, index) in orgSelectList"
              :key="index"
              :label="item.orgName"
              :value="item.orgId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品" required>
          <el-tag
            style="margin-right:5px"
            :key="index"
            v-for="(item,index) in formInfo.breakfast"
            @close="formInfo.breakfast.splice(index,1)"
            closable
          >{{ item.foodName }}</el-tag>
          <el-button type="text" @click="dialogFood = true">添加</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog width="60%" lock-scroll destroy-on-close title="选择菜品" :visible.sync="dialogFood">
      <selectFood @selectFood="selectFood"></selectFood>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFood = false;selectFoodList = []">取 消</el-button>
        <el-button type="primary" @click="handleSaveSelectFood">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="60%" lock-scroll destroy-on-close title="复制菜谱" :visible.sync="dialogFormMenu">
      <el-form>
        <el-form-item label="将本周菜谱设置为" required>
          <el-date-picker
            v-model="copyWeek"
            :picker-options="{ firstDayOfWeek: 1 }"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormMenu = false;">取 消</el-button>
        <el-button type="primary" @click="handleSaveCopyMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import selectFood from '../../../components/SelectTable/selectFood.vue'

export default {
  name: 'mealCenter',
  components: {
    selectFood
  },
  data() {
    return {
      dialogFormMenu: true,
      api: '',
      week: new Date(),
      copyWeek: '',
      searchRefresh: true,
      dialogFormVisible: false,
      dialogFood: false,
      rules: {
        orgIds: [{ required: true, message: '请选择机构', trigger: 'change' }]
      },
      formInfo: {
        breakfast: [],
        dateTime: '',
        orgIds: [],
        lunch: [],
        supper: []
      },
      searchData: {},
      orgList: [],
      tableColumns: [
        {
          label: '时段及日期',
          prop: 'type',
          fixed: 'left',
          minWidth: 100,
          className: '',
          columnKey: ''
        },
        {
          label: '星期一',
          slot: 'one',
          className: '',
          columnKey: '',
          minWidth: 140
        },
        {
          label: '星期二',
          slot: 'two',
          className: '',
          columnKey: '',
          minWidth: 140
        },
        {
          label: '星期三',
          slot: 'three',
          className: '',
          columnKey: '',
          minWidth: 140
        },
        {
          label: '星期四',
          slot: 'four',
          className: '',
          columnKey: '',
          minWidth: 140
        },
        {
          label: '星期五',
          slot: 'five',
          className: '',
          columnKey: '',
          minWidth: 140
        },
        {
          label: '星期六',
          slot: 'six',
          className: '',
          columnKey: '',
          minWidth: 140
        },
        {
          label: '星期天',
          slot: 'seven',
          className: '',
          columnKey: '',
          minWidth: 140
        }
      ],
      orgSelectList: [],
      limit: 10,
      limit2: 10,
      rowList: [],
      spanArr: [],
      position: 0,
      listData: [],
      tempType: '',
      rowNum: 0,
      selectFoodList: [],
      addType: ''
    }
  },
  created() {
    this.getOrgList()
    this.getOrg()
  },
  methods: {
    handleSaveCopyMenu() {
      if (!this.copyWeek) {
        this.$message.error('请选择时间')
        return false
      }
      this.$http
        .post('/org/foodMenu/check', {
          orgId: this.searchData.orgId,
          week: this.$func.getWeek(new Date(this.copyWeek)) + 1,
          year: new Date(this.copyWeek).getFullYear()
        })
        .then(res => {
          if (res.payload) {
            this.$confirm(
              '设置周期已含有菜谱，如继续，则会在对应的周期时段上增加相应的菜品，是否确认？',
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
              this.$http
                .post('/org/foodMenu/copy', {
                  orgId: this.searchData.orgId ? this.searchData.orgId : '',
                  sourceWeek: this.week
                    ? this.$func.getWeek(this.week) + 1
                    : this.$func.getWeek(new Date()) + 1,
                  sourceYear: this.week
                    ? this.week.getFullYear()
                    : new Date().getFullYear(),
                  targetWeek: this.$func.getWeek(this.copyWeek) + 1,
                  targetYear: this.copyWeek.getFullYear()
                })
                .then(res => {
                  if (res.code === SUCCESS) {
                    this.$message.success('操作成功')
                    this.dialogFormMenu = false
                    this.searchRefresh = !this.searchRefresh
                  }
                })
            })
          } else {
            this.$http
              .post('/org/foodMenu/copy', {
                orgId: this.searchData.orgId ? this.searchData.orgId : '',
                sourceWeek: this.week
                  ? this.$func.getWeek(this.week) + 1
                  : this.$func.getWeek(new Date()) + 1,
                sourceYear: this.week
                  ? this.week.getFullYear()
                  : new Date().getFullYear(),
                targetWeek: this.$func.getWeek(this.copyWeek) + 1,
                targetYear: this.copyWeek.getFullYear()
              })
              .then(res => {
                if (res.code === SUCCESS) {
                  this.$message.success('操作成功')
                  this.dialogFormMenu = false

                  this.searchRefresh = !this.searchRefresh
                }
              })
          }
        })
    },
    // 选择菜品
    selectFood(data) {
      this.selectFoodList = data
    },
    // 确定选择
    handleSaveForm() {
      let arr = []
      this.formInfo.breakfast.forEach(i => {
        arr.push(i.foodId)
      })
      this.$http
        .post('/org/foodMenu/replace', {
          breakfast: this.addType === '早餐' ? arr : [],
          lunch: this.addType === '午餐' ? arr : [],
          supper: this.addType === '晚餐' ? arr : [],
          dateTime: this.formInfo.dateTime,
          orgIds: this.formInfo.orgIds
        })
        .then(res => {
          if (res.code === SUCCESS) {
            this.$message.success('操作成功')
            this.formInfo.orgIds = []
            this.formInfo.breakfast = []
            this.dialogFormVisible = false
            this.searchRefresh = !this.searchRefresh
          }
        })
    },
    handleSaveSelectFood() {
      this.formInfo.breakfast = this.formInfo.breakfast.concat(
        this.selectFoodList
      )

      // let arr = []
      // this.selectFoodList.forEach(i => {
      //   arr.push(i.foodId)
      // })
      this.dialogFood = false
    },
    getOrg() {
      this.$http
        .post('/org/pageSearch', { pageSize: MAXSIZE, level: 2 })
        .then(res => {
          if (res.code === SUCCESS) {
            this.orgSelectList = res.payload.records
          }
        })
    },
    handleDelete(scope, row) {
      console.log(scope)
      let content = '删除后，该菜品将不再该时段显示，是否确认？'
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/org/foodMenu/delete', {
              dateTime: scope.column.className,
              orgId: this.searchData.orgId
            })
            .then(res => {
              if (res.code === SUCCESS) {
                this.$message.success('操作成功')
                this.searchRefresh = !this.searchRefresh
              }
            })
        })
        .catch(() => {})
    },
    handleAddFood(scope) {
      this.formInfo.dateTime = scope.column.className
      this.addType = scope.row.type
      this.dialogFormVisible = true
    },
    rowsForamtter(rows) {
      // if (rows.length < 7) {
      //   let len = 7 - rows.length
      //   for (let i = 0; i < len; i++) {
      //     rows.push({})
      //   }
      // }
      let mmap = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
      let weekMap = [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ]

      let fast = {}
      let lunch = {}
      let dinner = {}

      for (let i in rows) {
        let menuDate = new Date(rows[i].dateTime)
        this.tableColumns[Number(i) + 1].className = rows[i].dateTime
        this.tableColumns[Number(i) + 1].columnKey = rows[i].orgId
        this.tableColumns[Number(i) + 1].label = `${
          weekMap[i]
        } ${menuDate.getMonth() + 1}-${menuDate.getDate()}`
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
      return res
    },
    transferWeek(date) {
      if (date) {
        this.searchData.week = this.$func.getWeek(date) + 1
      } else {
        this.searchData.week = ''
      }
    },
    getOrgList() {
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
          this.api = '/org/foodMenu/week'
          this.searchRefresh = !this.searchRefresh
          // this.$refs.search.click()
        }
      })
    },
    cellMerge({ row, column, rowIndex, columnIndex }) {
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
    getSpanArr(data) {
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
.food-name {
  display: inline-block;
  max-width: 80px;
  white-space: nowrap;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
}
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
