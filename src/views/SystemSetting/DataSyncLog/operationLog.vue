<!--
 * @Descripttion:同步日志
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-22 09:53:23
 -->
<template>
  <div class="event-center">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="活动状态">
        <el-select
          style="width:200px"
          clearable
          v-model="searchData.activityStatus"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in $store.state.config.activityStatus"
            :key="index"
            :label="item.dictionaryLabel"
            :value="item.dictionaryValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="searchData.rangeTime"
          style="width:360px;"
          type="datetimerange"
          range-separator="至"
          @change="handlTime"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-input style="width:200px" placeholder="请输入活动名称关键字" v-model="searchData.activityName"></el-input>
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
      @click="$router.push({name:'editEvent'})"
      style="margin-bottom:15px"
      size="small"
      type="primary"
    >新增活动</el-button>
    <!-- 列表 -->
    <Table
      :searchRefresh="searchRefresh"
      :searchObj="searchData"
      :selection="false"
      :columns="tableColumns"
      api="/opertionLog/pageSearch "
      method="post"
    >
      <template slot-scope="{row}" slot="operUserName">{{row.operUserName}}</template>

      <template slot="footer-left">
        <el-button @click="handleCloseActivity(null)" type="text">结束活动</el-button>
        <el-button @click="handleDelete(null)" type="text">删除</el-button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'operationLog',
  data () {
    return {
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        {
          label: '操作人',
          align: 'left',
          slot: 'operUserName',
          minWidth: 120
        },
        { label: '操作时间', prop: 'createTime', minWidth: 140 },
        {
          label: '操作模块',
          prop: 'operModule',
          minWidth: 100
        },
        {
          label: '操作内容',
          slot: 'operDesc',
          minWidth: 150
        }
      ],
      userList: [],
      limit: 10,
      limit2: 10,
      dialogVisible: false,
      searchCourse: {},
      mobile: '',
      selectActivity: []
    }
  },
  created () {},
  methods: {
    handlTime (date) {
      if (date) {
        this.searchData.startTime = date[0]
        this.searchData.endTime = date[1]
      } else {
        this.searchData.startTime = ''
        this.searchData.endTime = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.event-center {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 193px;
  }
  .el-input--small {
    width: 193px;
  }
  .pages {
    text-align: center;
    margin: 15px 0;
  }
  .warning-row {
    background-color: #f2f2f2;
  }
}
</style>
