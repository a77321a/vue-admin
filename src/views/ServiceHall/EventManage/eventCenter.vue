<!--
 * @Descripttion:活动中心
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-18 13:27:05
 -->
<template>
  <div class="event-center">
    <!-- 筛选 -->
    <el-row class="row-span" :gutter="40">
      <OrgTreeList @filterOrg="filterOrg" @toggleChange="toggleChange"></OrgTreeList>
      <el-col class="col-span" :span="toggleWidth">
        <div class="grid-content bg-purple">
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
              <el-input
                style="width:200px"
                placeholder="请输入活动名称关键字"
                v-model="searchData.activityName"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                type="primary"
                @click="searchRefresh = !searchRefresh"
                icon="el-icon-search"
              >搜索</el-button>
              <el-button
                @click="
            searchData = {};
            searchRefresh = !searchRefresh;
          "
                size="small"
              >重置</el-button>
            </el-form-item>
          </el-form>
          <el-button
            @click="$router.push({ name: 'eventCenterAdd' })"
            style="margin-bottom:15px"
            size="small"
            type="primary"
            v-has="'eventCenterAdd'"
          >新增活动</el-button>
          <!-- 列表 -->
          <Table
            @commitSelection="commitSelection"
            :searchRefresh="searchRefresh"
            :rowsForamtter="rowsForamtter"
            :searchObj="searchData"
            :selection="true"
            :columns="tableColumns"
            api="/activity/pageSearch"
            method="post"
          >
            <template slot-scope="{ row }" slot="activityName">
              <div class="flex-t-l">
                <img
                  class="course-avatar"
                  :src="
              $store.state.config.systemConfig[0].dictionaryValue +
                row.activityIndexPic
            "
                  alt
                />
                <div class="flex-column-t">
                  <span class="f-title">{{ row.activityName }}</span>
                </div>
              </div>
            </template>
            <template
              slot="activityStatus"
              slot-scope="{ row }"
            >{{$func.transLabel($store.state.config.activityStatus,row.activityStatus)}}</template>
            <template
              slot="joinUser"
              slot-scope="{ row }"
            >{{ row.actualCustomerNum }}/{{ row.customerNum }}</template>
            <template slot-scope="{ row }" slot="handleColumn">
              <el-button
                @click="
            $router.push({ name: 'eventCenterPreview', query: { aid: row.activityId } })
          "
                v-has="'eventCenterPreview'"
                type="text"
                size="small"
              >查看</el-button>
              <el-button
                @click="
            $router.push({ name: 'eventCenterEdit', query: { aid: row.activityId } })
          "
                v-if="row.activityStatus < 2"
                v-has="'eventCenterEdit'"
                type="text"
                size="small"
              >编辑</el-button>
              <el-button
                v-if="row.activityStatus == 1"
                @click="handleCloseActivity(row)"
                type="text"
                size="small"
                v-has="'eventCenterClose'"
              >结束活动</el-button>
              <el-button
                @click="
            $router.push({
              name: 'eventCenterSummary',
              query: { aid: row.activityId }
            })
          "
                v-has="'eventCenterSummary'"
                v-if="row.activityStatus > 1"
                type="text"
                size="small"
              >总结活动</el-button>
              <el-button
                v-has="'eventCenterDelete'"
                @click="handleDelete(row)"
                type="text"
                size="small"
              >删除</el-button>
            </template>
            <template slot="footer-left">
              <el-button
                :disabled="selectActivity.length == 0"
                v-has="'eventCenterSummary'"
                @click="handleCloseActivity(null)"
                type="text"
              >结束活动</el-button>
              <el-button
                :disabled="selectActivity.length == 0"
                v-has="'eventCenterDelete'"
                @click="handleDelete(null)"
                type="text"
              >删除</el-button>
            </template>
          </Table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import OrgTreeList from '@/components/OrgTreeList/OrgTreeList'
//list
export default {
  name: 'eventCenter',
  components: {
    OrgTreeList
  },
  data () {
    return {
      toggleWidth: 19,
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        {
          label: '活动名称',
          align: 'left',
          slot: 'activityName',
          minWidth: 200
        },
        { label: '活动时间', prop: 'activityTime', minWidth: 260 },
        {
          label: '参与人员',
          slot: 'joinUser',
          minWidth: 100
        },
        {
          label: '活动状态',
          slot: 'activityStatus',
          minWidth: 120
        },
        {
          label: '创建人',
          prop: 'createUserName',
          minWidth: 120
        },
        {
          label: '创建时间',
          prop: 'createTime',
          minWidth: 150
        },
        {
          label: '操作',
          slot: 'handleColumn',
          fixed: 'right',
          minWidth: 220
        }
      ],
      selectActivity: []
    }
  },
  created () {
    // this.$store.dispatch('getDictionaryManagement')
  },
  methods: {
    filterOrg (val) {
      this.searchData.orgId = val
      this.searchRefresh = !this.searchRefresh
    },
    toggleChange (val) {
      this.toggleWidth = val
    },
    rowsForamtter (rows) {
      rows.forEach(row => {
        row.activityTime = row.startTime + '~' + row.endTime
      })
    },
    handlTime (date) {
      if (date) {
        this.searchData.startTime = date[0]
        this.searchData.endTime = date[1]
      } else {
        this.searchData.startTime = ''
        this.searchData.endTime = ''
      }
    },
    commitSelection (data) {
      let arr = []
      data.forEach(i => {
        arr.push(i.activityId)
      })
      this.selectActivity = arr
    },
    handleDelete (row) {
      let id = row ? [row.activityId] : this.selectActivity
      this.$confirm('删除后，该数据将数据将无法恢复，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/activity/delete', { activityIdList: id })
            .then(res => {
              if (res.code === SUCCESS) {
                this.$message.success('操作成功')
                this.searchRefresh = !this.searchRefresh
              }
            })
        })
        .catch(() => {})
    },
    handleCloseActivity (row) {
      let id = row ? [row.activityId] : this.selectActivity
      let content = '是否要提前结束活动？'
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post(`/activity/close`, { activityIdList: id })
            .then(res => {
              if (res.code === SUCCESS) {
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                })
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
