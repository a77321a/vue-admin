<!--
 * @Descripttion:活动总结
 * @Author:
 * @Date: 2019-11-13 14:43:57
 * @LastEditors:
 * @LastEditTime: 2019-12-04 22:27:04
 -->
<template>
  <div id="active-summary">
    <div class="header">
      <el-button class="btn" type="text">重新编辑</el-button>
    </div>
    <div class="content">
      <div v-if="htmlStr" v-html="htmlStr"></div>
      <div style="width:200px;margin:0 auto">活动尚未开始</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ActivitySummary',
  data () {
    return {}
  },
  props: ['htmlStr']
}
</script>
<style lang="scss" scoped>
.header {
  overflow: auto;
  .btn {
    float: right;
    margin-right: 15px;
  }
}
</style>
