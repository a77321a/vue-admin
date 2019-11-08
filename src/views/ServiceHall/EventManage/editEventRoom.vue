<!--
 * @Descripttion:新增、编辑活动室
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-07 21:09:18
 -->
<template>
  <div id="edit-event">
    <div class="title">基本信息</div>
    <el-form style="width:700px" ref="form" :model="formInfo" label-width="100px" size="medium">
      <el-form-item label="活动室名称">
        <el-input placeholder="请输入活动室名称，最多不超过28个字" v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="活动室编号">
        <el-input placeholder="请输入活动室编号，最多不超过16个字" v-model="formInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="活动室介绍">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入活动室介绍，最多不超过68个字"
          v-model="formInfo.content"
        >
          <span>{{formInfo.content.length}}</span>
        </el-input>
      </el-form-item>
      <el-form-item label="所属机构">
        <el-select clearable v-model="formInfo.content" style="width:220px" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <div class="title">附件信息</div>
      <el-form-item label="活动室编号">
        <el-input placeholder="请输入活动室监控海康威视流地址" v-model="formInfo.name"></el-input>
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
