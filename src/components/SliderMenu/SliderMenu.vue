<template>
  <div class="slider-menu">
    <el-menu
      default-active="2"
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
          v-for="(son, si) in item.children"
          :key="si"
          :index="son.name"
        >{{son.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { routerList } from '@/config/config';
export default {
  name: 'sliderMenu',
  data () {
    return {
      routerList
    }
  },
  created () {},
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
.el-submenu {
  width: 200px;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>
