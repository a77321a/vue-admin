<!--
 * @Descripttion:新增、编辑活动
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-11 15:34:03
 -->
<template>
  <div id="edit-event">
    <div class="title">基本信息</div>
    <el-form style="width:700px" ref="form" :model="formInfo" label-width="80px" size="medium">
      <el-form-item label="活动名称">
        <el-input v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-upload
          list-type="picture-card"
          :show-file-list="false"
          class="upload-demo"
          action="api/dw"
          :before-upload="uploadImg"
        >
          <img v-if="formInfo.imageUrl" :src="formInfo.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="formInfo.eventTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动地点">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入活动地点，最多不超过68个字"
          v-model="formInfo.content"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动详情">
        <UEditor v-model="formInfo.content"></UEditor>
      </el-form-item>
      <div class="title">活动信息</div>
      <el-form-item label="所属机构">
        <el-select clearable v-model="formInfo.content" style="width:220px" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动室">
        <el-select clearable v-model="formInfo.content" style="width:220px" placeholder="请选择用户状态">
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
  methods: {
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
