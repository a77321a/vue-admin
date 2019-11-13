<!--
 * @Descripttion:
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-13 16:03:05
 -->
<template>
  <div class="layout">
    <el-container class="main-content">
      <el-header style="height:65px;" class="l-header">
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside v-if="showSideNav" class="slider" width="200px">
          <slider-menu></slider-menu>
        </el-aside>
        <el-main class="content">
          <BreadCrumb></BreadCrumb>
          <div class="padding">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import sliderMenu from './components/SliderMenu/SliderMenu.vue'
import VHeader from './components/Header/VHeader.vue'
import BreadCrumb from './components/BreadCrumb/BreadCrumb.vue'
export default {
  name: 'layout',
  components: {
    sliderMenu,
    VHeader,
    BreadCrumb
  },
  // data(){
  //   return{
  //     showSideNav:false,
  //   }
  // }
  computed: {
    showSideNav () {
      return this.$store.state.navList.length !== 0
    }
  }
}
</script>
<style lang="scss" scoped>
.layout {
  overflow: hidden;
  .el-main {
    padding: 15px;
  }
  /deep/.el-submenu .el-menu {
    border-right: 1px solid #e6e6e6 !important;
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
      padding: 0;
      background-color: #fff;
      height: calc(100vh - 65px);
      overflow-y: auto;
      overflow-x: hidden;
      .padding {
        padding: 15px;
        height: calc(100vh - 125px);
        overflow: auto;
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
