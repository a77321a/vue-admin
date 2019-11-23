<!--
 * @Descripttion:选择服务对象
 * @Author:
 * @Date: 2019-11-11 10:37:53
 * @LastEditors:
 * @LastEditTime: 2019-11-23 13:29:35
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
      api="/service/customer/pageSearch "
      method="post"
    >
      <template slot="userInfo" slot-scope="{row}">
        <div class="flex-t-u">
          <el-avatar
            class="avatar"
            size="medium"
            :src="$store.state.config.systemConfig[0].dictionaryValue+row.avatar"
          ></el-avatar>
          <span class="f-title">{{row.serviceCustomerName}}</span>
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
      searchData: { orgId: this.orgId },
      tableColumns: [
        { label: '服务人员', slot: 'userInfo', align: 'left', minWidth: 100 },
        { label: '所在区域', prop: 'streetName', minWidth: 150 }
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
