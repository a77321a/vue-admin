<!--
 * @Descripttion:新增、编辑活动室
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-07 21:13:14
 -->
<template>
  <div id="edit-event">
    <div class="title">基本信息</div>
    <el-form style="width:700px" ref="form" :model="formInfo" label-width="100px" size="medium">
      <el-form-item label="助餐人员">
        <el-button>选择人员</el-button>
      </el-form-item>
      <el-form-item label="助餐时间">
        <el-date-picker
          v-model="formInfo.eventTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="助餐详情">
        <el-botton type="primary">新增助餐</el-botton>
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
  data() {
    return {
      formInfo: {
        content: ''
      }
    }
  },
  methods: {
    uploadImg(file) {
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
