<!--
 * @Descripttion:面包屑
 * @Author:
 * @Date: 2019-11-12 16:10:39
 * @LastEditors:
 * @LastEditTime: 2019-11-12 16:40:49
 -->
<template>
  <div id="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in breadList"
        :key="item.url"
        :to="{ name: item.url }"
      >{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {
      breadList: []
    }
  },
  created () {
    this.breadList = this.$store.state.breadList
  },
  watch: {
    $route () {
      this.breadList = this.$store.state.breadList
      console.log(this.breadList)

      let arr = []
      for (let i = 0; i < this.breadList.length; i++) {
        arr.push(this.breadList[i])
        if (this.breadList[i].menu_url === this.$route.name) {
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
  border-bottom: 1px solid #ccc;
}
</style>
