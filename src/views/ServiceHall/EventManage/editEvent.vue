<!--
 * @Descripttion:新增、编辑活动
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-11 23:49:13
 -->
<template>
  <div id="edit-event">
    <div class="title">基本信息</div>
    <el-form style="width:700px" ref="form" :model="formInfo" label-width="80px" size="medium">
      <el-form-item label="活动名称" prop="activityName">
        <el-input placeholder="请输入活动名称，最多不超过50个字" show-word-limit :maxlength="50" v-model="formInfo.activityName"></el-input>
      </el-form-item>
      <el-form-item label="活动封面" prop="activityIndexPic">
        <el-upload
          list-type="picture-card"
          :show-file-list="false"
          class="upload-demo"
          action="api/dw"
          :before-upload="uploadImg"
        >
          <img v-if="formInfo.activityIndexPic" :src="formInfo.activityIndexPic" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动时间" prop="eventTime">
        <el-date-picker
          v-model="formInfo.eventTime"
          type="daterange"
          range-separator="至"
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
        <el-select clearable v-model="formInfo.orgId" style="width:220px" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动室" prop="activityRoomId">
        <el-select clearable v-model="formInfo.activityRoomId" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务产品" prop="serviceProductId">
        <el-select clearable v-model="formInfo.serviceProductId" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务人员">
        <el-button icon="el-icon-plus">选择人员</el-button>
      </el-form-item>
      <el-form-item label="服务对象">
        <el-button @click="dialogServiceObject = true" icon="el-icon-plus">选择人员</el-button>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog width="60%" destroy-on-close title="选择服务对象" :visible.sync="dialogServiceObject">
      <selectServiceObject></selectServiceObject>
    </el-dialog>
  </div>
</template>
<script>
import selectServiceObject from '../../../components/SelectTable/selectServiceObject.vue'
export default {
  name: 'editEvent',
  components: {
    selectServiceObject
  },
  data () {
    return {
      formInfo: {
        content: ''
      },
      dialogServiceObject: false,
      dialogServiceUser: false
    }
  },
  created(){
    if(this.$route.query.aid){
      this.getActivityInfo()
    }
  },
  methods: {
    getActivityInfo(){
      this.$http.get('/activity/get?activityId='this.$route.query.aid).then((res)=>{
        if(res.code === SUCCESS){
          this.formInfo = res.payload
        }
      })
    },
    uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      this.$http.postForm('/file/upload', formdata).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo.imageUrl = `http://118.24.54.72:8061/${res.payload}`
        }
      })
      return false
    }
  }
}
</script>
<style lang="scss">
</style>
