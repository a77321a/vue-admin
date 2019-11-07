<!--
 * @Descripttion:左侧菜单
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-07 18:05:43
 -->
<template>
  <div class="slider-menu">
    <el-menu
      :default-active="active"
      :default-openeds="opens"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu v-for="(item, index) in routerList" :key="index" :index="item.name">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item
          @click="handleClick(son)"
          v-for="(son) in item.children"
          :key="son.url"
          :index="son.url"
        >{{son.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
// import { routerList } from '@/config/config'
export default {
  name: 'sliderMenu',
  data () {
    return {
      active: '',
      opens: []
    }
  },
  created () {},
  computed: {
    routerList () {
      return this.$store.state.navList
    }
  },
  watch: {
    $route (val) {
      this.active = val.meta.parent ? val.meta.parent : val.name
      this.opens = this.$store.state.opens
    }
  },
  methods: {
    handleOpen (key, keyPath) {},
    handleClose (key, keyPath) {},
    handleClick (son) {
      this.$router.push({
        name: son.url
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 2px;
}
.el-menu {
  border-right: 0;
}
.el-submenu {
  width: 200px;
}
.el-menu-vertical-demo {
  height: 100%;
}
.el-menu-item.is-active {
  background-color: rgba(64, 158, 255, 0.1) !important;
}
</style>
