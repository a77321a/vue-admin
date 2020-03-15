<!--
 * @Descripttion:
 * @Author:
 * @Date: 2019-12-09 15:07:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-15 19:51:37
 -->

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
        <img
          @click="showThisPic(index)"
          :src="$store.state.config.systemConfig[0].dictionaryValue+item"
          alt
        />
      </el-col>
    </el-row>
    <div class="title">活动总结</div>
    <div class="content">
      <div v-if="htmlStr" v-html="htmlStr"></div>
      <div v-else style="width:200px;margin:0 auto">活动尚未总结</div>
    </div>
    <el-dialog title="照片" :visible.sync="dialogVisible" width="50%">
      <el-carousel
        :initial-index="initIndex"
        arrow="always"
        indicator-position="outside"
        :autoplay="false"
        trigger="click"
        height="450px"
      >
        <el-carousel-item v-for="item in picList" :key="item">
          <img
            style="width:100%;height:100%;"
            :src="$store.state.config.systemConfig[0].dictionaryValue+item"
            alt
          />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ActivitySummary',
  data () {
    return {
      dialogVisible: false,
      initIndex: 0
    }
  },
  props: {
    htmlStr: {},
    status: {},
    picList: {
      type: Array
    }
  },
  methods: {
    showThisPic (index) {
      this.initIndex = index
      this.dialogVisible = true
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
