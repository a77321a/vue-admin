<!--
 * @Descripttion:表格组件
 * @Author:
 * @Date: 2019-11-05 10:42:51
 * @LastEditors:
 * @LastEditTime: 2019-11-06 22:21:29
 -->
<template>
  <div>
    <el-table
      v-loading="loading"
      :span-method="spanMethod"
      :data="dataSource"
      row-key="uid"
      :size="size"
      :border="border"
      stripe
      :header-cell-style="headerCellStyle"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!--选择-->
      <el-table-column
        :reserve-selection="true"
        align="center"
        v-if="selection"
        type="selection"
        width="55"
      ></el-table-column>
      <!--序号-->
      <!-- <el-table-column v-if="hasIndex" type="index" width="55"></el-table-column> -->
      <!--数据源-->
      <el-table-column
        v-for="(column,index) in columns"
        :sortable="column.sortable"
        :key="column.index"
        :prop="column.prop"
        :label="column.label"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :render-header="column.renderHeader"
        :show-overflow-tooltip="columns.showOverflowTooltip"
        :align="column.align || 'center'"
        :resizable="resizable"
      ></el-table-column>
      <!--操作-->
      <slot name="handleColumn"></slot>
    </el-table>
    <div class="pagination-wrap">
      <el-pagination
        hide-on-single-page
        @current-change="handlePage"
        @size-change="handleSizeChange"
        :total="total"
        :page-size="15"
        background
        layout="total,prev, pager, next,sizes,jumper"
        :page-sizes="[10, 20, 30, 40, 50]"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import MockData from './Mock'
export default {
  name: 'Table',
  data () {
    return {
      loading: false,
      resizable: false,
      dataSource: MockData,
      selectionArr: [],
      headerCellStyle: {
        background: '#f8f8f9'
      },
      page: 1,
      total: 0,
      limit: 10,
      rowList: [],
      spanArr: [],
      position: 0,
      listData: []
    }
  },
  props: {
    spanMethod: {
      type: Function
    },
    searchRefresh: {
      type: Boolean,
      required: true
    },
    // 请求api
    api: {
      type: String,
      default: function () {
        return ''
      },
      required: true
    },
    // 表格尺寸
    size: {
      type: String,
      default: function () {
        return 'small'
      }
    },
    // 是否可以选择
    selection: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    // 是否有序列项
    hasIndex: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    // 纵向边框
    border: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    // 请求方式
    method: {
      type: String,
      default: function () {
        return 'get'
      }
    },
    // 请求参数
    searchObj: {
      type: Object,
      default: function () {
        return {}
      }
    },
    selectRefresh: {
      type: Boolean
    }
  },
  created () {
    this.getList()
  },
  methods: {
    /**
     * @descripttion: 获取数据
     * @param {param} 是否重置分页
     * @return: list
     */
    getList (param) {
      this.loading = true
      if (param) {
        this.page = 1
      }
      this.$http[this.method](
        this.api,
        Object.assign(
          {
            page: this.page,
            limit: this.limit
          },
          this.searchObj
        )
      )
        .then(res => {
          this.loading = false
          this.dataSource = res.data.list
          this.total = res.data.total
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    // 将选中的行发送到父组件
    handleSelectionChange (val) {
      this.selectionArr = []
      val.forEach(el => {
        this.selectionArr.push(el)
      })
      this.$emit('commitSelection', this.selectionArr)
    },
    // 分页
    handlePage (val) {
      this.page = val
      this.getList()
    },
    handleSizeChange (val) {
      this.limit = val
      this.getList(true)
    }
  },
  watch: {
    searchRefresh () {
      // this.selectionArr = []
      this.getList(true)
    },
    selectRefresh () {
      this.selectionArr = []
      this.getList(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-wrap {
  text-align: right;
  margin-top: 15px;
}
</style>
