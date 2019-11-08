<!--
 * @Descripttion:个人信息
 * @Author: 辛顺宁
 * @Date: 2019-08-13 17:09:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-08 10:36:14
 -->
<template>
  <div id="account-info">
    <el-card header="账号信息" class="box-card">
      <el-form label-width="90px">
        <el-form-item label="头像"></el-form-item>
        <el-form-item label="手机号"></el-form-item>
        <el-form-item label="密码"></el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
#account-info {
  /deep/ .el-card__header {
    background-color: #f5f5f5;
    padding: 12px 20px;
  }
  /deep/ .el-card__body {
    padding: 0;
    padding-top: 10px;
  }
  /deep/ .el-form-item {
    height: 50px;
    line-height: 50px;
    margin-bottom: 0;
    &:not(:last-child) {
      border-bottom: 1px solid #f5f5f5;
    }
  }
}
</style>
