<!--
 * @Descripttion:养老规模统计
 * @Author:
 * @Date: 2019-11-06 22:31:31
 * @LastEditors:
 * @LastEditTime: 2019-11-28 16:55:56
 -->
<template>
  <div id="pension-scale">
    <div class="title">资源概况</div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="8">
        <el-card class="box-card">
          <H2>
            <countTo :startVal="0" :endVal="pensionScaleInfo.activityRoomNum" :duration="1500"></countTo>
          </H2>
          <div>活动室</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <H2>
            <countTo
              :startVal="0"
              :endVal="pensionScaleInfo.orgServiceProviderNum"
              :duration="1500"
            ></countTo>
          </H2>
          <div>服务人员数</div>
        </el-card>
      </el-col>
    </el-row>
    <div class="title">机构概况</div>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="6">
        <el-card class="box-card">
          <H2>
            <countTo :startVal="0" :endVal="pensionScaleInfo.orgNum" :duration="1500"></countTo>
          </H2>
          <div>养老机构数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <H2>
            <countTo :startVal="0" :endVal="pensionScaleInfo.societyOrgNum" :duration="1500"></countTo>
          </H2>
          <div>社会化运营机构数</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <H2>
            <countTo :startVal="0" :endVal="pensionScaleInfo.relatedOrgNum" :duration="1500"></countTo>
          </H2>
          <div>涉老机构数</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import countTo from 'vue-count-to'
export default {
  name: 'PensionScaleStatistics',
  components: {
    countTo
  },
  data () {
    return {
      pensionScaleInfo: {
        activityRoomNum: 0,
        orgNum: 0,
        orgServiceProviderNum: 0,
        relatedOrgNum: 0,
        societyOrgNum: 0
      }
    }
  },
  created () {
    this.getPensionInfo()
  },
  methods: {
    getPensionInfo () {
      this.$http.get('/stats/pension').then(res => {
        if (res.code === SUCCESS) {
          this.pensionScaleInfo = res.payload
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/common/css/variable.scss';
#pension-scale {
  .row-bg {
    margin-bottom: 10px;
  }
  .box-card {
    text-align: center;
    h2 {
      font-size: 30px;
      font-weight: 700;
      color: $theme-color;
    }
  }
}
</style>
