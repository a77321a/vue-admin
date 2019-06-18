<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style lang="scss">
@import url("./common/css/variable.scss");
@import url("./common/css/variable.scss");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}
</style>
