<!--
 * @Descripttion:表格组件
 * @Author:
 * @Date: 2019-11-05 10:42:51
 * @LastEditors:
 * @LastEditTime: 2019-11-15 22:42:15
 -->
<template>
  <div>
    <el-table
      :row-key="rowKey"
      v-loading="loading"
      :height="height"
      :span-method="spanMethod"
      :data="dataSource"
      :size="size"
      :border="border"
      stripe
      :header-cell-style="headerCellStyle"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <slot name="empty"></slot>
      <!--选择-->
      <el-table-column
        :reserve-selection="false"
        align="center"
        v-if="selection"
        type="selection"
        width="55"
      ></el-table-column>
      <!--序号-->
      <!-- <el-table-column v-if="hasIndex" type="index" width="55"></el-table-column> -->
      <!--数据源-->
      <el-table-column
        v-for="column in columns"
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
      >
        <template slot-scope="scope">
          <slot
            v-if="column.slot"
            :row="scope.row"
            :index="scope.$index"
            :name="column.slot"
          >{{ column.slot }}</slot>
          <span>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
      <!--操作-->
    </el-table>
    <div class="pagination-wrap">
      <div style="float:left;margin-top:-5px">
        <slot name="footer-left"></slot>
      </div>
      <el-pagination
        style="margin-top:5px;"
        hide-on-single-page
        @current-change="handlePage"
        @size-change="handleSizeChange"
        :total="total"
        :page-size="pageSize"
        background
        layout="total,prev, pager, next,sizes,jumper"
        :page-sizes="[10, 20, 30, 40, 50]"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import MockData from './Mock'
export default {
  name: 'Table',
  data () {
    return {
      loading: false,
      resizable: false,
      dataSource: [],
      selectionArr: [],
      headerCellStyle: {
        background: '#f8f8f9'
      },
      page: 1,
      total: 0,
      pageSize: 10,
      rowList: [],
      spanArr: [],
      position: 0,
      listData: []
    }
  },
  props: {
    getSpanArr: {
      type: Function
    },
    height: {
      type: Number
    },
    rowKey: {
      type: String
    },
    rowsForamtter: {
      type: Function
    },
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
            pageNum: this.page,
            pageSize: this.pageSize
          },
          this.searchObj
        )
      )
        .then(res => {
          this.loading = false
          if (res.code === SUCCESS) {
            this.dataSource = res.payload.records
            if (this.rowsForamtter) {
              this.rowsForamtter(this.dataSource)
            }
            if (this.getSpanArr) {
              this.getSpanArr(res.payload)
            }
            this.total = Number(res.payload.total)
          }
        })
        .catch(err => {
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
      this.pageSize = val
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
