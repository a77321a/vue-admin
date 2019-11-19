<!--
 * @Descripttion:新增、编辑活动
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-19 11:42:02
 -->
<template>
  <div id="edit-event">
    <div class="title">基本信息</div>
    <el-form
      style="width:700px"
      ref="formInfo"
      :rules="rules"
      :model="formInfo"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="活动名称" prop="activityName">
        <el-input
          placeholder="请输入活动名称，最多不超过50个字"
          show-word-limit
          :maxlength="50"
          v-model="formInfo.activityName"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动封面" prop="activityIndexPic">
        <div style="display:flex;align-items:center;">
          <div v-show="formInfo.activityIndexPic" class="avatar">
            <img
              :src="$store.state.config.systemConfig[0].dictionaryValue+formInfo.activityIndexPic"
              alt
            />
            <Input
              v-model="$store.state.config.systemConfig[0].dictionaryValue+formInfo.activityIndexPic"
              style="display:none"
            />
          </div>
          <el-upload
            action="apii/public/img"
            :show-file-list="false"
            :before-upload="uploadImg"
            accept="image/*"
          >
            <el-button type="primary" icon="ios-cloud-upload-outline">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="活动时间" prop="eventTime">
        <el-date-picker
          v-model="formInfo.eventTime"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动地点" prop="activityAddress">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入活动地点，最多不超过68个字"
          v-model="formInfo.activityAddress"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动详情">
        <UEditor v-model="formInfo.activityDesc"></UEditor>
      </el-form-item>
      <div class="title">活动信息</div>
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
      <el-form-item label="服务产品" prop="serviceProductId">
        <el-select clearable v-model="formInfo.serviceProductId" placeholder="请选择"></el-select>
      </el-form-item>
      <el-form-item label="服务人员" prop="serviceProvider">
        <el-button
          :disabled="formInfo.orgId ? formInfo.orgId.length == 0 : true"
          @click="dialogServiceUser = true"
          icon="el-icon-plus"
        >选择人员</el-button>
        <el-card style="margin-top:10px;" shadow="never">
          <el-tag closable>
            <el-avatar
              :size="22"
              style="vertical-align: middle;margin-right:5px"
              icon="el-icon-user-solid"
            ></el-avatar>
            <span style="vertical-align: middle;">张三</span>
          </el-tag>
        </el-card>
      </el-form-item>
      <el-form-item label="参加对象" prop="Object">
        <el-button @click="dialogServiceObject = true" icon="el-icon-plus">选择人员</el-button>
        <el-card style="margin-top:10px;" shadow="never">
          <el-tag closable>
            <el-avatar
              :size="22"
              style="vertical-align: middle;margin-right:5px"
              icon="el-icon-user-solid"
            ></el-avatar>
            <span style="vertical-align: middle;">张三</span>
          </el-tag>
        </el-card>
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
      <selectServiceObject></selectServiceObject>
    </el-dialog>
    <el-dialog
      width="60%"
      destroy-on-close
      lock-scroll
      title="选择服务人员"
      :visible.sync="dialogServiceUser"
    >
      <selectServiceUser :orgId="formInfo.orgId"></selectServiceUser>
    </el-dialog>
  </div>
</template>
<script>
import selectServiceObject from '../../../components/SelectTable/selectServiceObject.vue'
import selectServiceUser from '../../../components/SelectTable/selectServiceUser.vue'

export default {
  name: 'editEvent',
  components: {
    selectServiceObject,
    selectServiceUser
  },
  data () {
    return {
      formInfo: {
        orgId: [],
        eventTime: [],
        activityRoomId: '',
        activityIndexPic: '',
        activityName: '',
        activityAddress: '',
        serviceProductId: '',
        serviceProvider: []
      },
      rules: {
        activityName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        eventTime: [
          { required: true, message: '请选择活动时间', trigger: 'change' }
        ],
        activityAddress: [
          { required: true, message: '请输入活动地点', trigger: 'change' }
        ],
        activityIndexPic: [
          { required: true, message: '请上传活动封面', trigger: 'change' }
        ],
        orgId: [
          { required: true, message: '请选择所属机构', trigger: 'change' }
        ],
        activityRoomId: [
          { required: true, message: '请选择活动室', trigger: 'change' }
        ],
        serviceProductId: [
          { required: true, message: '请选择服务产品', trigger: 'change' }
        ],
        serviceProvider: [
          {
            required: true,
            message: '请选择服务人员',
            trigger: 'change'
          }
        ]
      },
      dialogServiceObject: false,
      dialogServiceUser: false,
      eventRoomList: [],
      orgList: []
    }
  },
  created () {
    if (this.$route.query.aid) {
      this.getActivityInfo()
    }
    this.getEventRoomList()
    this.getOrgList()
  },
  methods: {
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
    getActivityInfo () {
      this.$http
        .get('/activity/get?activityId=' + this.$route.query.aid)
        .then(res => {
          if (res.code === SUCCESS) {
            this.formInfo = res.payload
            this.$set(this.formInfo, 'eventTime', [
              res.payload.startTime,
              res.payload.endTime
            ])
            console.log(this.formInfo)
          }
        })
    },
    // 保存按钮
    handleSave () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        if (this.$route.query.aid) {
          this.$http.post('/activity/update', this.formInfo).then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
        } else {
          this.$http.post('/activity/add', this.formInfo).then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
        }
      })
    },
    uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      this.$http.postForm('/file/upload', formdata).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo.activityIndexPic = res.payload

          console.log(
            this.$store.state.config.systemConfig[0].dictionaryValue +
              this.formInfo.activityIndexPic
          )
        }
      })
      return false
    }
  }
}
</script>
<style lang="scss">
/deep/ .el-cascader-node__prefix {
  top: 10px !important;
}
</style>
