<!--
 * @Descripttion:选择服务人员
 * @Author:
 * @Date: 2019-11-11 10:37:53
 * @LastEditors:
 * @LastEditTime: 2019-11-23 16:12:33
 -->
<template>
  <div id="select-service-object">
    <el-form>
      <el-form inline ref="form" label-width="80px" size="small">
        <el-form-item label="菜品类型">
          <el-select clearable v-model="searchData.foodType" placeholder="请选择">
            <el-option
              v-for="(item, index) in $store.state.config.foodType"
              :key="index"
              :label="item.dictionaryLabel"
              :value="item.dictionaryValue"
            ></el-option>
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
          <el-button
            @click="searchData.orgServiceProviderName = '';searchRefresh = !searchRefresh"
            size="small"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-form>
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
          <img
            class="course-avatar"
            :src="$store.state.config.systemConfig[0].dictionaryValue+row.indexPic"
            alt
          />
          <div class="flex-column-t">
            <span class="f-title">{{row.foodName}}</span>
            <p class="sm-title">￥{{row.price}}</p>
          </div>
        </div>
      </template>
      <template
        slot="foodType"
        slot-scope="{row}"
      >{{$func.transLabel($store.state.config.foodType,row.foodType)}}</template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'selectFood',
  data () {
    return {
      name: '',
      searchRefresh: true,
      selectData: [],
      searchData: {},
      tableColumns: [
        { label: '菜品名称', slot: 'foodName', minWidth: 200 },
        {
          label: '助餐时段',
          slot: 'season',
          minWidth: 100
        },
        { label: '菜品类型', slot: 'foodType', minWidth: 150 }
      ]
    }
  },
  methods: {
    commitSelection (data) {
      this.$emit('selectFood', data)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
