<!--
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-11 14:52:54
 * @LastEditors:
 * @LastEditTime: 2019-11-11 15:03:34
 -->
<template>
  <div id="edit-dictionary">
    <div class="title">基本信息</div>
    <el-form
      style="width:700px"
      ref="formInfo"
      :rules="rules"
      :model="formInfo"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="字典名称" prop="dictName">
        <el-input
          :maxlength="10"
          show-word-limit
          placeholder="请输入字典名称，最多不超过10个字"
          v-model="formInfo.dictName"
        ></el-input>
      </el-form-item>
      <el-form-item label="key" prop="dictKey">
        <el-input placeholder="请输入字典key" v-model="formInfo.dictKey"></el-input>
      </el-form-item>
      <el-form-item label="字典值" prop="dictValue">
        <el-input placeholder="请输入字典值" v-model="formInfo.dictValue"></el-input>
      </el-form-item>
      <el-form-item label="字典类型" prop="dictType">
        <el-select clearable v-model="formInfo.dictType" style="width:220px" placeholder="请选择用户状态">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="handleSave" type="primary">立即创建</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'editDictionary',
  data () {
    return {
      formInfo: {},
      rules: {
        dictName: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ],
        dictKey: [
          { required: true, message: '请输入字典key', trigger: 'blur' }
        ],
        dictValue: [
          { required: true, message: '请输入字典值', trigger: 'blur' }
        ],
        dictType: [
          { required: true, message: '请输入字典值', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSave () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        this.$http.post('/dictionary/add', this.formInfo).then(res => {
          if (res.code === SUCCESS) {
            this.$message.success('操作成功')
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#edit-dictionary {
}
</style>
