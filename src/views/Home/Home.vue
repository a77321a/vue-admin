<!--
 * @Descripttion:主页
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-24 17:05:05
 -->
<template>
  <div class="Home">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日接待人数</span>
          </div>
          <el-col :span="16">
            <H4
              style="text-align:center;display:inline-block;width:90%"
            >{{data.serviceRecordNumInfo.todayNum}}</H4>
            <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col style="line-height:30px;font-size:12px;" :span="8">
            <div>
              比昨天
              <span
                :class="data.serviceRecordNumInfo.yesterdayNum - data.serviceRecordNumInfo.todayNum > 0? 'down':'rise'"
              >
                <i
                  :class="data.serviceRecordNumInfo.yesterdayNum - data.serviceRecordNumInfo.todayNum > 0?'el-icon-caret-bottom':'el-icon-caret-top'"
                ></i>
                {{ data.serviceRecordNumInfo.todayNum - data.serviceRecordNumInfo.yesterdayNum}}
              </span>
            </div>
            <div>
              比七日
              <span
                :class="data.serviceRecordNumInfo.sevenDaysNum - data.serviceRecordNumInfo.todayNum > 0? 'down':'rise'"
              >
                <i
                  :class="data.serviceRecordNumInfo.sevenDaysNum - data.serviceRecordNumInfo.todayNum > 0?'el-icon-caret-bottom':'el-icon-caret-top'"
                ></i>
                {{Math.abs(data.serviceRecordNumInfo.todayNum - data.serviceRecordNumInfo.sevenDaysNum)}}
              </span>
            </div>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日参与活动人数</span>
          </div>
          <el-col :span="16">
            <H4
              style="text-align:center;display:inline-block;width:90%"
            >{{data.activityPartNumInfo.todayNum}}</H4>
            <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col style="line-height:30px;font-size:12px;" :span="8">
            <div>
              比昨天
              <span
                :class="data.activityPartNumInfo.yesterdayNum - data.activityPartNumInfo.todayNum > 0? 'down':'rise'"
              >
                <i
                  :class="data.activityPartNumInfo.yesterdayNum - data.activityPartNumInfo.todayNum > 0?'el-icon-caret-bottom':'el-icon-caret-top'"
                ></i>
                {{ data.activityPartNumInfo.todayNum - data.activityPartNumInfo.yesterdayNum}}
              </span>
            </div>
            <div>
              比七日
              <span
                :class="data.activityPartNumInfo.sevenDaysNum - data.activityPartNumInfo.todayNum > 0? 'down':'rise'"
              >
                <i
                  :class="data.activityPartNumInfo.sevenDaysNum - data.activityPartNumInfo.todayNum > 0?'el-icon-caret-bottom':'el-icon-caret-top'"
                ></i>
                {{Math.abs(data.activityPartNumInfo.todayNum - data.activityPartNumInfo.sevenDaysNum)}}
              </span>
            </div>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日助餐人次</span>
          </div>
          <el-col :span="16">
            <H4
              style="text-align:center;display:inline-block;width:90%"
            >{{data.customerDinnerNumInfo ? data.customerDinnerNumInfo.todayNum : 0}}</H4>
            <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col
            v-if="data.customerDinnerNumInfo"
            style="line-height:30px;font-size:12px;"
            :span="8"
          >
            <div>
              比昨天
              <span
                :class="data.customerDinnerNumInfo.yesterdayNum - data.customerDinnerNumInfo.todayNum > 0? 'down':'rise'"
              >
                <i
                  :class="data.customerDinnerNumInfo.yesterdayNum - data.customerDinnerNumInfo.todayNum > 0?'el-icon-caret-bottom':'el-icon-caret-top'"
                ></i>
                {{ data.customerDinnerNumInfo.todayNum - data.customerDinnerNumInfo.yesterdayNum}}
              </span>
            </div>
            <div>
              比七日
              <span
                :class="data.customerDinnerNumInfo.sevenDaysNum - data.customerDinnerNumInfo.todayNum > 0? 'down':'rise'"
              >
                <i
                  :class="data.customerDinnerNumInfo.sevenDaysNum - data.customerDinnerNumInfo.todayNum > 0?'el-icon-caret-bottom':'el-icon-caret-top'"
                ></i>
                {{Math.abs(data.customerDinnerNumInfo.todayNum - data.customerDinnerNumInfo.sevenDaysNum)}}
              </span>
            </div>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>本周活动开展次数</span>
          </div>
          <el-col :span="11">
            <H4
              style="text-align:center;display:inline-block;width:90%"
            >已开展{{data.activityNumCarriedOutWeek}}</H4>
          </el-col>
          <el-col :span="2">
            <el-divider style="float:left" direction="vertical"></el-divider>
          </el-col>
          <el-col :span="11">
            <H4
              style="text-align:center;display:inline-block;width:90%"
            >待开展{{data.activityNumToBeCarriedOutWeek }}</H4>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      data: {
        serviceRecordNumInfo: {},
        customerDinnerNumInfo: {},
        activityPartNumInfo: {},
        activityNumCarriedOutWeek: 0,
        activityNumToBeCarriedOutWeek: 0
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.get('/stats/home').then(res => {
        if (res.code === SUCCESS) {
          this.data = res.payload
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.clearfix {
  text-align: center;
}
.rise {
  color: #67c23a;
}
.down {
  color: #f56c6c;
}

/deep/ .el-card__header {
  padding: 10px;
}
/deep/ .el-card__body {
  overflow: hidden;
  padding: 0;
  height: 60px;
  line-height: 60px;
}
/deep/.el-divider--vertical {
  height: 60px !important;
}
</style>
