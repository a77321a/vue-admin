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
        <el-main class="content">
          <div class="padding">
            <router-view></router-view>
          </div>
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
  .el-main {
    padding: 15px;
  }
  .main-content {
    min-height: 100vh;
    overflow: hidden;
    .slider {
      height: calc(100vh - 60px);
      background-color: #fff;
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
    .content {
      height: calc(100vh - 60px);
      overflow-y: auto;
      overflow-x: hidden;
      .padding {
        padding: 15px;
        background-color: #fff;
      }
    }
  }
}
::-webkit-scrollbar {
  width: 2px;
  height: 0;
  background-color: #eee;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  background: #fff;
}
</style>
