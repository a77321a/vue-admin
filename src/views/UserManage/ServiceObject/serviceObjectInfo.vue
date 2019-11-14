<!--
 * @Descripttion: 活动详情
 * @Author:
 * @Date: 2019-11-07 19:28:01
 * @LastEditors:
 * @LastEditTime: 2019-11-14 17:15:51
 -->
<template>
  <div id="service-object-info">
    <el-card shadow="never" class="box-card">
      <div class="flex-t-l">
        <img :src="eventInfo.activityIndexPic" alt />
        <div class="flex-column-t">
          <h4>{{eventInfo.activityName}}</h4>
          <el-form label-position="left" ref="form" :model="eventInfo" label-width="100px">
            <el-form-item>
              <template slot="label">
                <i class="el-icon-alarm-clock"></i>活动时间：
              </template>
              {{eventInfo.startTime}}~{{eventInfo.endTime}}
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>活动地点：
              </template>
              {{eventInfo.activityName}}
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>所在机构：
              </template>
              {{eventInfo.orgName}}
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <i class="el-icon-house"></i>活动室：
              </template>
              {{eventInfo.activityRoomName}}
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-tabs value="first" style="margin-top:20px;">
      <el-tab-pane label="活动记录" name="first">
        <activityRecords :serviceCustomerId="$route.query.sid"></activityRecords>
      </el-tab-pane>
      <el-tab-pane label="助餐记录" name="second">
        <mealRecords></mealRecords>
      </el-tab-pane>
      <el-tab-pane label="服务记录" name="third">
        <serviceRecords></serviceRecords>
      </el-tab-pane>
      <el-tab-pane label="健康记录" name="four">
        <healthRecords></healthRecords>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import activityRecords from './ServiceObjectInfoTabs/activityRecords'
import mealRecords from './ServiceObjectInfoTabs/mealRecords'
import serviceRecords from './ServiceObjectInfoTabs/serviceRecords'
import healthRecords from './ServiceObjectInfoTabs/healthRecords'
export default {
  name: 'eventInfo',
  components: {
    healthRecords,
    serviceRecords,
    mealRecords,
    activityRecords
  },
  data () {
    return {
      eventInfo: {
        cover: ''
      }
    }
  },
  created () {
    this.getActivityInfo()
  },
  methods: {
    getActivityInfo () {
      this.$http
        .get('/activity/get?activityId=' + this.$route.query.aid)
        .then(res => {
          if (res.code === SUCCESS) {
            this.eventInfo = res.payload
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
  /deep/.el-form-item__label,
  /deep/.el-form-item__content {
    height: 30px !important;
    line-height: 30px !important;
  }
}
/deep/ .box-card .flex-t-l {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  img {
    float: left;
    width: 210px;
    height: 160px;
    margin-right: 15px;
    vertical-align: middle;
    flex-shrink: 0;
    object-fit: cover;
  }
  .flex-column-t {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
