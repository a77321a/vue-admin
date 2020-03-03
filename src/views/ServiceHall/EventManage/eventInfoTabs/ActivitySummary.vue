
<template>
  <div id="active-summary">
    <div class="header">
      <el-button
        @click="$router.push({name:'eventCenterSummary',query:{aid:$route.query.aid}})"
        class="btn"
        type="text"
      >重新编辑</el-button>
    </div>
    <div class="title">活动照片</div>
    <el-row :gutter="20">
      <el-col class="img-grid" v-for="(item, index) in picList" :key="index" :span="8">
        <img :src="$store.state.config.systemConfig[0].dictionaryValue+item" alt />
      </el-col>
    </el-row>
    <div class="title">活动总结</div>
    <div class="content">
      <div v-if="htmlStr" v-html="htmlStr"></div>
      <div v-else style="width:200px;margin:0 auto">活动尚未总结</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ActivitySummary',
  data () {
    return {}
  },
  props: {
    htmlStr: {},
    status: {},
    picList: {
      type: Array
    }
  }
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
.img-grid {
  height: 200px;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
