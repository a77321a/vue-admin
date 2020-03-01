<!--
 * @Descripttion:面包屑
 * @Author:
 * @Date: 2019-11-12 16:10:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-01 14:35:17
 -->
<template>
  <div id="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in breadList"
        :key="item.url"
        :to="item.query ? {name:item.url,query:item.query} : {name:item.url}"
      >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {}
  },
  created () {},
  computed: {
    breadList: {
      set () {
        return this.$store.state.breadList
      },
      get () {
        return this.$store.state.breadList
      }
    }
  },
  watch: {
    $route () {
      this.breadList = this.$store.state.breadList
      let arr = []
      for (let i = 0; i < this.breadList.length; i++) {
        arr.push(this.breadList[i])
        if (this.breadList[i].url === this.$route.name) {
          this.$store.commit('setBreadList', arr)
          this.breadList = arr
          break
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#bread-crumb {
  padding: 15px 10px;
  border-bottom: 1px solid #e6e6e6;
}
</style>
