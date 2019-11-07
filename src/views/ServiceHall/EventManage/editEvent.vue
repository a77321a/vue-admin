<!--
 * @Descripttion:新增、编辑活动
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-07 19:25:49
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
          :show-file-list="false"
          class="upload-demo"
          action="api/dw"
          :before-upload="uploadImg"
        >
          <el-button size="small" type="primary">点击上传</el-button>
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
        >
          <span>{{formInfo.content.length}}</span>
        </el-input>
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
        <el-button icon="el-icon-plus">选择人员</el-button>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'editEvent',
  data () {
    return {
      formInfo: {
        content: ''
      }
    }
  },
  methods: {
    uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', this.file)
      this.$http.postForm('', formdata).then(res => {
        if (res.code === 200) {
          this.formInfo.cover = res.data.path
        }
      })
      return false
    }
  }
}
</script>
<style lang="scss">
</style>
