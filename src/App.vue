<!--
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-05 16:45:30
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  created () {
    console.log(this.$route)
  },
  methods: {}
}
</script>
<style lang="scss">
@import './common/css/variable.scss';
@import './common/css/reset.scss';
#app {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>
