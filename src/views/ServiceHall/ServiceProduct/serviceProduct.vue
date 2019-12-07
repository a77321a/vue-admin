<!--
 * @Descripttion:服务产品
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-12-07 20:33:21
 -->
<template>
  <div class="event-room">
    <!-- 筛选 -->
    <el-row class="row-span" :gutter="40">
      <OrgTreeList @filterOrg="filterOrg" @toggleChange="toggleChange"></OrgTreeList>
      <el-col class="col-span" :span="toggleWidth">
        <div class="grid-content bg-purple">
          <el-form inline ref="form" label-width="90px" size="small">
            <el-form-item label="服务类型">
              <el-input placeholder="请输入活动室名称关键字" v-model="searchData.orgServiceTypeId"></el-input>
            </el-form-item>
            <el-form-item label="产品名称">
              <el-input placeholder="请输入产品名称关键字" v-model="searchData.orgServiceProductName"></el-input>
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
            @click="$router.push({name:'editServiceProduct'})"
            style="margin-bottom:15px"
            size="small"
            type="primary"
          >新增产品</el-button>
          <!-- 列表 -->
          <Table
            :searchRefresh="searchRefresh"
            :searchObj="searchData"
            :columns="tableColumns"
            api="/org/service/product/pageSearch"
            method="post"
          >
            <template slot-scope="{row}" slot="orgServiceProductName">
              <div class="flex-t-l">
                <img
                  class="course-avatar"
                  :src="$store.state.config.systemConfig[0].dictionaryValue+row.indexPic"
                  alt
                />
                <div class="flex-column-t">
                  <span class="f-title">{{row.orgServiceProductName}}</span>
                  <p class="sm-title">￥{{row.orgPrice}}</p>
                </div>
              </div>
            </template>
            <template slot-scope="{row}" slot="action">
              <el-button
                @click="$router.push({name:'editServiceProduct',query:{pid:row.orgServiceProductId}})"
                type="text"
                size="small"
              >编辑</el-button>

              <el-button @click="handleDelete(row)" type="text" size="small">删除</el-button>
            </template>
          </Table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import OrgTreeList from '@/components/OrgTreeList/OrgTreeList'
export default {
  name: 'serviceProduct',
  components: {
    OrgTreeList
  },
  data () {
    return {
      toggleWidth: 19,
      searchRefresh: true,
      searchData: {},
      tableColumns: [
        { label: '产品名称', slot: 'orgServiceProductName', minWidth: 200 },
        { label: '服务类型', prop: 'orgServiceTypeName', minWidth: 100 },
        {
          label: '创建人',
          prop: 'createUser',
          minWidth: 100
        },
        {
          label: '创建时间',
          prop: 'createTime',
          minWidth: 140
        },
        {
          label: '操作',
          slot: 'action',
          fixed: 'right',
          minWidth: 100
        }
      ],
      activeNames: '',
      selectActivity: []
    }
  },
  created () {},
  methods: {
    filterOrg (val) {
      this.searchData.orgId = val
      this.searchRefresh = !this.searchRefresh
    },
    toggleChange (val) {
      this.toggleWidth = val
    },
    handleDelete (row) {
      let id = row ? [row.orgServiceProductId] : []
      this.$confirm('删除后，该产品将无法投入运营使用，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/org/service/product/delete', { orgServiceProductIds: id })
            .then(res => {
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
.event-room {
  .row-span {
    margin: 0 !important;
  }
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
