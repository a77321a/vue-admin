<!--
 * @Descripttion:监控设备
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-23 23:07:02
 -->
<template>
  <div class="event-center">
    <!-- 筛选 -->
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="活动状态">
        <el-input
          style="width:300px"
          placeholder="请输入活动室名称关键字"
          v-model="searchData.activityRoomName"
          class="input-with-select"
        >
          <el-select style="width:100px" v-model="selectType" slot="prepend" placeholder="请选择">
            <el-option label="机构" :value="1"></el-option>
            <el-option label="活动室" :value="2"></el-option>
          </el-select>
        </el-input>
      </el-form-item>

      <el-form-item label="设备名称">
        <el-input style="width:200px" placeholder="请输入设备名称关键字" v-model="searchData.deviceName"></el-input>
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
    >新增设备</el-button>
    <!-- 列表 -->
    <Table
      @commitSelection="commitSelection"
      :searchRefresh="searchRefresh"
      :rowsForamtter="rowsForamtter"
      :searchObj="searchData"
      :selection="true"
      :columns="tableColumns"
      api="/device/list"
      method="post"
    >
      <template slot-scope="{row}" slot="activityName">
        <div class="flex-t-l">
          <img
            class="course-avatar"
            :src="$store.state.config.systemConfig[0].dictionaryValue+row.activityIndexPic"
            alt
          />
          <div class="flex-column-t">
            <span class="f-title">{{row.activityName}}</span>
          </div>
        </div>
      </template>
      <template slot-scope="{row}" slot="handleColumn">
        <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
      </template>
      <template slot="footer-left">
        <el-button @click="handleCloseActivity(null)" type="text">结束活动</el-button>
        <el-button @click="handleDelete(null)" type="text">删除</el-button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: 'userManage',
  data () {
    return {
      searchRefresh: true,
      selectType: 1,
      searchData: { deviceType: 1 },
      tableColumns: [
        {
          label: '设备名称',
          prop: 'deviceName',
          minWidth: 200
        },
        { label: '设备厂家', prop: 'factory', minWidth: 260 },
        {
          label: '设备型号',
          prop: 'model',
          minWidth: 100
        },
        {
          label: '视频地址',
          slot: 'videoInterfaceAddress',
          minWidth: 150
        },
        {
          label: '所在位置',
          prop: 'videoStreamAddress',
          minWidth: 150
        },
        {
          label: '创建人',
          prop: 'createUserName',
          minWidth: 100
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
          minWidth: 60
        }
      ],
      userList: [],
      limit: 10,
      limit2: 10,
      dialogVisible: false,
      searchCourse: {},
      mobile: '',
      selectDevice: []
    }
  },
  created () {
    // this.$store.dispatch('getDictionaryManagement')
  },
  methods: {
    commitSelection (data) {
      let arr = []
      data.forEach(i => {
        arr.push(i.deviceId)
      })
      this.selectDevice = arr
    },
    handleDelete (row) {
      let id = row ? [row.deviceId] : this.selectDevice
      this.$confirm('删除后，该数据将数据将无法恢复，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/device/delete', { deviceIds: id }).then(res => {
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
