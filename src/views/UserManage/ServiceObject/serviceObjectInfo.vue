<!--
 * @Descripttion: 活动详情
 * @Author:
 * @Date: 2019-11-07 19:28:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-03 15:16:23
 -->
<template>
  <div id="service-object-info">
    <el-card shadow="never" class="box-card">
      <el-row style="postion:relative" :gutter="10">
        <el-col style="text-align:center" :span="4">
          <el-avatar :size="60" :src="serviceObjectInfo.avatar"></el-avatar>
          <el-button
            @click="dialogVisible = true"
            :disabled="serviceObjectInfo.serviceCustomerPicList.length==0"
            style="width:100%;display:block"
            type="text"
          >查看生活照片</el-button>
        </el-col>
        <el-col class="content-span" :span="20">
          <el-row :gutter="10" style="margin-bottom:20px">
            <el-col :span="6">姓名：{{serviceObjectInfo.serviceCustomerName}}</el-col>
            <el-col :span="6">手机号：{{serviceObjectInfo.mobile}}</el-col>
            <el-col :span="3">性别：{{serviceObjectInfo.gender == 0 ?'女':'男'}}</el-col>
            <el-col :span="3">年龄：{{serviceObjectInfo.age }}</el-col>
            <el-col :span="3">民族：{{serviceObjectInfo.ethnic }}</el-col>
          </el-row>
          <el-row style="margin-bottom:20px" :gutter="10">
            <el-col :span="6">婚姻状态：{{maritalStatus[serviceObjectInfo.maritalStatus]}}</el-col>
            <el-col :span="6">老人居住状态：{{liveStatus[serviceObjectInfo.liveStatus]}}</el-col>
            <el-col :span="6">身份证：{{serviceObjectInfo.idCard}}</el-col>
          </el-row>
          <el-row style="margin-bottom:20px" :gutter="10">
            <el-col :span="12">
              紧急联系人：
              <span
                v-for="(item, index) in (serviceObjectInfo.emergencySelectList.concat(serviceObjectInfo.emergencyManualList))"
                :key="index"
              >
                {{item.name}}/{{item.mobile}}
                <el-divider
                  v-if="index !=serviceObjectInfo.emergencySelectList.length - 1"
                  direction="vertical"
                ></el-divider>
              </span>
            </el-col>
            <el-col :span="6">所属机构：{{serviceObjectInfo.orgName}}</el-col>
            <el-col
              :span="6"
            >所在地域：{{serviceObjectInfo.cityName}}{{serviceObjectInfo.districtName}}{{serviceObjectInfo.communityName}}{{serviceObjectInfo.streetName}}</el-col>
            <el-col :span="6">地址详情：{{serviceObjectInfo.address}}</el-col>
          </el-row>
        </el-col>
        <el-button
          @click="dialogFormVisible = true"
          style="position:absolute;right:0;bottom:-15px;"
          type="text"
        >查看更多</el-button>
      </el-row>
    </el-card>
    <!-- <el-card style="margin-top:20px" shadow="never" class="box-card">
      <el-row style="margin-bottom:20px">
        <el-col :span="8">
          期望养老模式：
          <el-tag
            style="margin-right:5px"
            size="mini"
            v-for="(item, index) in serviceObjectInfo.pensionModeList"
            :key="index"
            type="info"
          >{{$func.transLabel($store.state.config.pensionModeList,item)}}</el-tag>
        </el-col>
        <el-col :span="8">
          期望养老服务：
          <el-tag
            style="margin-right:5px"
            size="mini"
            v-for="(item, index) in serviceObjectInfo.pensionServiceList"
            :key="index"
            type="info"
          >{{$func.transLabel($store.state.config.pensionServiceList,item)}}</el-tag>
        </el-col>
        <el-col :span="8">
          政府购买类型：
          <el-tag
            style="margin-right:5px"
            size="mini"
            v-for="(item, index) in serviceObjectInfo.purchaseTypeList"
            :key="index"
            type="info"
          >{{$func.transLabel($store.state.config.govBuyTypeList,item)}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          老人类别：
          <el-tag
            style="margin-right:5px"
            size="mini"
            v-for="(item, index) in serviceObjectInfo.customerCategoryList"
            :key="index"
            type="info"
          >{{$func.transLabel($store.state.config.pensionTypeList,item)}}</el-tag>
        </el-col>
        <el-col :span="8">
          老人喜好：
          <el-tag
            style="margin-right:5px"
            size="mini"
            v-for="(item, index) in serviceObjectInfo.customerHobbyList"
            :key="index"
            type="info"
          >{{$func.transLabel($store.state.config.hobbyList,item)}}</el-tag>
        </el-col>
      </el-row>
    </el-card>-->
    <el-tabs value="first" style="margin-top:20px;">
      <el-tab-pane label="活动记录" name="first">
        <activityRecords :serviceCustomerId="$route.query.sid"></activityRecords>
      </el-tab-pane>
      <el-tab-pane label="助餐记录" name="second">
        <mealRecords :serviceCustomerId="$route.query.sid"></mealRecords>
      </el-tab-pane>
      <el-tab-pane label="服务记录" name="third">
        <serviceRecords :serviceCustomerId="$route.query.sid"></serviceRecords>
      </el-tab-pane>
      <el-tab-pane label="健康记录" name="four">
        <healthRecords :customer="serviceObjectInfo" :serviceCustomerId="$route.query.sid"></healthRecords>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="照片" :visible.sync="dialogVisible" width="50%">
      <el-carousel
        arrow="always"
        indicator-position="outside"
        :autoplay="false"
        trigger="click"
        height="450px"
      >
        <el-carousel-item v-for="item in serviceObjectInfo.serviceCustomerPicList" :key="item">
          <img
            style="width:100%;height:100%;"
            :src="$store.state.config.systemConfig[0].dictionaryValue+item"
            alt
          />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <el-dialog title="服务对象" :visible.sync="dialogFormVisible" width="50%">
      <objectInfo :child="true"></objectInfo>
    </el-dialog>
  </div>
</template>
<script>
import enumList from './enum.js'

import activityRecords from './ServiceObjectInfoTabs/activityRecords'
import mealRecords from './ServiceObjectInfoTabs/mealRecords'
import serviceRecords from './ServiceObjectInfoTabs/serviceRecords'
import healthRecords from './ServiceObjectInfoTabs/healthRecords'
import objectInfo from './editObject'
export default {
  name: 'serviceObjectDetail',
  components: {
    healthRecords,
    serviceRecords,
    mealRecords,
    activityRecords,
    objectInfo
  },
  data () {
    return {
      dialogVisible: false,
      maritalStatus: ['未婚', '已婚', '离异', '再婚', '丧偶'],
      liveStatus: ['与子女同住', '独自居住', '配偶居住', '其他'],
      serviceObjectInfo: {
        emergencyList: [],
        emergencySelectList: [],
        emergencyManualList: [],
        serviceCustomerPicList: [],
        avatar: ''
      },
      dialogFormVisible: true,
      enumList: enumList,
      formInfo: {}
    }
  },
  created () {
    this.getObjectInfo()
  },
  methods: {
    getObjectInfo () {
      this.$http
        .get('/service/customer/get?serviceCustomerId=' + this.$route.query.sid)
        .then(res => {
          if (res.code === SUCCESS) {
            this.serviceObjectInfo = res.payload
            this.serviceObjectInfo.avatar =
              this.$store.state.config.systemConfig[0].dictionaryValue +
              this.serviceObjectInfo.avatar
            this.formInfo = res.payload
            this.$set(
              this.formInfo,
              'emergencyManualList',
              this.formInfo.emergencyManualList
                ? this.formInfo.emergencyManualList
                : []
            )
            this.$set(this.formInfo, 'addressList', [
              res.payload.cityId,
              res.payload.districtId,
              res.payload.communityId,
              res.payload.streetId
            ])
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.content-span {
  font-size: 13px;
  overflow: hidden;
}
/deep/ .el-form-item__label {
  color: #666;
}
.el-form-item {
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
