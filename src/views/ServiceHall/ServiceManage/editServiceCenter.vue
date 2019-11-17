<!--
 * @Descripttion:新增、编辑服务人员
 * @Author:
 * @Date: 2019-11-11 16:49:56
 * @LastEditors:
 * @LastEditTime: 2019-11-16 21:33:54
 -->
<template>
  <div id="editServiceCenter">
    <div class="title">基本信息</div>
    <el-form
      style="width:700px"
      ref="formInfo"
      :rules="rules"
      :model="formInfo"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="服务标题" prop="serviceRecordName">
        <el-input
          show-word-limit
          placeholder="请输入服务标题，最多不超过10个字"
          :maxlength="10"
          v-model="formInfo.serviceRecordName"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="serviceRecordPicList">
        <el-upload action="#" list-type="picture-card" :before-upload="uploadImg">
          <i slot="default" class="el-icon-plus"></i>
          <div
            v-for="(item, index) in formInfo.serviceRecordPicList"
            :key="index"
            slot="file"
            slot-scope="{file}"
          >
            <img class="el-upload-list__item-thumbnail" :src="item" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-delete" @click="handleRemove(index)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
          <div slot="tip" class="el-upload__tip">480*480像素或1:1，支持PNG、JPG、GIF格式，小于5M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="服务时间" prop="serviceTime">
        <el-date-picker
          v-model="formInfo.serviceTime"
          type="datetimerange"
          range-separator="至"
          @change="selectTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="服务内容" prop="serviceContent">
        <UEditor v-model="formInfo.serviceContent"></UEditor>
      </el-form-item>
      <div class="title">服务信息</div>
      <el-form-item label="所属机构" prop="orgId">
        <el-cascader
          clearable
          :props="{value:'orgId',label:'orgName'}"
          :options="orgList"
          v-model="formInfo.orgId"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="活动室" prop="activityRoomId">
        <el-select clearable v-model="formInfo.activityRoomId" placeholder="请选择">
          <el-option
            v-for="(item, index) in eventRoomList"
            :key="index"
            :label="item.activityRoomName"
            :value="item.activityRoomId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务对象" prop="serviceCustomerIdList">
        <el-button @click="dialogServiceObject = true" icon="el-icon-plus">选择人员</el-button>
        <el-card style="margin-top:10px;" shadow="never">
          <el-tag
            @close="handleClose(item)"
            v-for="(item, index) in formInfo.serviceCustomerList"
            :key="index"
            closable
          >
            <el-avatar
              :size="22"
              style="vertical-align: middle;margin-right:5px"
              icon="el-icon-user-solid"
            ></el-avatar>
            <span style="vertical-align: middle;">{{item.serviceCustomerName}}</span>
          </el-tag>
        </el-card>
      </el-form-item>
      <el-form-item label="服务总结" prop="serviceSummary">
        <el-input
          type="textarea"
          :maxlength="1000"
          placeholder="请输入服务总结，最多不超过1000个字"
          show-word-limit
          v-model="formInfo.serviceSummary"
        ></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="handleSave" type="primary">立即创建</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      width="60%"
      lock-scroll
      destroy-on-close
      title="选择服务对象"
      :visible.sync="dialogServiceObject"
    >
      <selectServiceObject @selectObject="selectObject"></selectServiceObject>
    </el-dialog>
  </div>
</template>
<script>
import selectServiceObject from '../../../components/SelectTable/selectServiceObject.vue'

export default {
  name: 'editServiceCenter',
  components: { selectServiceObject },
  data () {
    return {
      formInfo: {
        activityRoomId: '',
        endTime: '',
        orgId: [],
        serviceContent: '',
        serviceCustomerIdList: [],
        serviceRecordName: '',
        serviceRecordPicList: [],
        serviceSummary: '',
        startTime: '',
        serviceTime: []
      },
      dialogServiceObject: false,
      rules: {
        serviceRecordName: [
          { required: true, message: '请输入服务名称', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择服务机构', trigger: 'change' }
        ],
        serviceRecordPicList: [
          {
            required: true,
            message: '请上次服务图片',
            trigger: 'change',
            type: 'array'
          }
        ],
        activityRoomId: [
          { required: true, message: '请选择活动室', trigger: 'change' }
        ],
        serviceSummary: [
          { required: true, message: '请输入服务总结', trigger: 'blur' }
        ],
        serviceCustomerIdList: [
          { required: true, message: '请选择服务对象', trigger: 'change' }
        ],
        serviceTime: [
          { required: true, message: '请选择服务时间', trigger: 'change' }
        ]
      },
      orgList: [],
      eventRoomList: [],
      tempObjectList: []
    }
  },
  created () {
    if (this.$route.query.sid) {
      this.getServiceInfo()
    }
    this.getEventRoomList()
    this.getOrgList()
  },
  methods: {
    selectObject (data) {
      this.tempObjectList = data
    },
    selectTime (date) {
      this.formInfo.startTime = date ? date[0] : ''
      this.formInfo.endTime = date ? date[1] : ''
    },
    getOrgList () {
      this.$http.post('/org/tree').then(res => {
        if (res.code === SUCCESS) {
          this.orgList = res.payload
          this.orgList.forEach(i => {
            if (i.children.length > 0) {
              i.children.forEach(j => {
                delete j.children
              })
            }
          })
        }
      })
    },
    getEventRoomList () {
      this.$http
        .post('/activity/room/pageSearch', { pageSize: 99999 })
        .then(res => {
          this.eventRoomList = res.payload.records
        })
    },
    /**
     * @descripttion: 图片自定义上传 同所有单照片表单
     * @param {type}   file
     */
    uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      this.$http.postForm('/file/upload', formdata).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo.serviceRecordPicList.push(res.payload)
        }
      })
      return false
    },
    handleRemove () {},
    /**
     * @descripttion: 获取服务人员信息
     * @return: 信息
     */
    getServiceInfo () {
      this.$http
        .get('/service/record/get?serviceRecordId=' + this.$route.query.sid)
        .then(res => {
          if (res.code === SUCCESS) {
            this.formInfo = res.payload
            this.$set(this.formInfo, 'serviceTime', [
              res.payload.startTime,
              res.payload.endTime
            ])
          }
        })
    },
    // 保存按钮
    handleSave () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        let form = JSON.parse(JSON.stringify(this.formInfo))
        form.orgId = Array.isArray(form.orgId)
          ? this.formInfo.orgId[this.formInfo.orgId.length - 1]
          : form.orgId
        if (this.$route.query.fid) {
          this.$http
            .post('/org/service/provider/update', this.formInfo)
            .then(res => {
              if (res.code === SUCCESS) {
                this.$message.success('操作成功')
                this.$router.go(-1)
              }
            })
        } else {
          this.$http
            .post('/org/service/provider/add', this.formInfo)
            .then(res => {
              if (res.code === SUCCESS) {
                this.$message.success('操作成功')
                this.$router.go(-1)
              }
            })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
