<!--
 * @Descripttion:新增、编辑养老产品
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-18 22:12:38
 -->
<template>
  <div id="edit-event">
    <div class="title">基本信息</div>
    <el-form style="width:700px" ref="form" :model="formInfo" label-width="80px" size="medium">
      <el-form-item label="产品名称">
        <el-input v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="产品简介">
        <el-input type="textarea" v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="产品封面">
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
      <el-form-item label="产品详情">
        <UEditor v-model="formInfo.content"></UEditor>
      </el-form-item>
      <div class="title">价格/类型</div>
      <el-form-item label="服务类型">
        <el-select clearable v-model="formInfo.content" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价目表">
        <el-button>新增价目规则</el-button>
      </el-form-item>
      <el-form-item label="服务人员">
        <el-input-number :precision="0" v-model="formInfo.num" controls-position="right" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="服务对象">
        <el-input-number :precision="0" v-model="formInfo.num" controls-position="right" :min="1"></el-input-number>
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
