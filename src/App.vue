<template>
  <div id="app">
    <div id="nav"></div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('1').then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
