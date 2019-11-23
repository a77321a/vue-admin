<!--
 * @Descripttion:选择养老产品
 * @Author:
 * @Date: 2019-11-11 10:37:53
 * @LastEditors:
 * @LastEditTime: 2019-11-23 19:20:24
 -->
<template>
  <div id="select-service-object">
    <el-form>
      <el-form inline ref="form" label-width="80px" size="small">
        <el-form-item label="名称">
          <el-input placeholder="请输入服务对象名字" v-model="name"></el-input>
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
    </el-form>
    <Table
      :selectable="selectable"
      :highlightCurrentRow="single"
      @commitSelection="commitSelection"
      :height="$store.state.dialogHeight -100"
      :searchRefresh="searchRefresh"
      :rowsForamtter="rowsForamtter"
      :searchObj="searchData"
      :selection="single ? false : true"
      :columns="tableColumns"
      :currentChange="singleSelect"
      api="/pension/service/product/pageSearch "
      method="post"
    >
      <template slot="pensionServiceProductName" slot-scope="{row}">
        <div class="flex-t-l">
          <img class="course-avatar" :src="row.indexPic" alt />
          <div class="flex-column-t">
            <span class="f-title">{{row.pensionServiceProductName}}</span>
            <p class="sm-title">￥{{row.pensionPrice}}</p>
          </div>
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'selectServiceObject',
  data () {
    return {
      name: '',
      searchRefresh: true,
      selectData: [],
      searchData: { pageSize: MAXSIZE },
      tableColumns: [
        { label: '产品名称', slot: 'pensionServiceProductName', minWidth: 200 },
        { label: '服务类型', prop: 'pensionServiceTypeName', minWidth: 100 }
      ]
    }
  },
  props: {
    orgId: {},
    single: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    isSelected: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    selectable (row, index) {
      if (this.isSelected.length === 0) {
        return 1
      }
      for (let i in this.isSelected) {
        console.log(row)
        if (this.isSelected[i].serviceCustomerId === row.serviceCustomerId) {
          return 0
        } else {
          return 1
        }
      }
    },
    commitSelection (data) {
      this.$emit('selectObject', data)
    },
    singleSelect (row, orow) {
      this.$emit('selectObject', row)
    },
    rowsForamtter (row) {}
  }
}
</script>
<style lang="scss" scoped>
</style>
