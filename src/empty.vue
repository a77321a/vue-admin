<!--
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-01 13:05:44
 -->
<template>
  <div class="empty">
    <keep-alive :include="keepAlive">
      <router-view></router-view>
    </keep-alive>
    <!-- <router-view v-else></router-view> -->
  </div>
</template>
<script>
export default {
  watch: {
    $route () {
      console.log(this.$store.state.toEdit)
    }
  },
  computed: {
    keepAlive () {
      return this.$store.state.toEdit ? [this.$store.state.toEdit] : ''
    }
  }
}
</script>
<style scoped>
</style>
