<template>
  <div class="layout">
    <el-container class="main-content">
      <el-header class="l-header">
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside class="slider" width="200px">
          <slider-menu></slider-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import sliderMenu from "./components/SliderMenu/SliderMenu.vue";
import VHeader from "./components/Header/VHeader.vue";
export default {
  name: "layout",
  components: {
    sliderMenu,
    VHeader
  }
};
</script>
<style lang="scss" scoped>
.layout {
  overflow: hidden;
  .main-content {
    min-height: 100vh;
    overflow: hidden;
    .slider {
      min-height: 100%;
      .slider-menu {
        height: 100%;
        .el-menu {
          height: 100%;
        }
      }
    }
    .l-header {
      padding: 0;
    }
  }
}
</style>
