<template>
  <div class="header">
    <div class="logo">
      <!-- <img src="../../common/image/logo@2x.png" alt> -->
    </div>
    <div class="tool-bar">
      <ul style="float:right" class="bar-list">
        <li v-click-outside="closeDialog">
          <el-button
            style="cursor:pointer"
            @click.native="infoBlock = !infoBlock"
            type="info"
            icon="el-icon-s-custom"
            circle
          ></el-button>
          <i
            color="#fff"
            @click.native="infoBlock = !infoBlock"
            size="30"
            class="el-icon-caret-bottom"
          />
          <transition name="name">
            <div v-show="infoBlock" class="tdui-user-body" id="userinfo">
              <div class="tdui-user-body-list tdui-user-body-list-first">
                <div class="tdui-user-body-list-start">
                  <el-button type="info" icon="el-icon-s-custom" circle></el-button>
                </div>
                <div name="user-login-email" class="tdui-user-body-list-first-end">admin</div>
              </div>
              <div class="tdui-user-body-list">
                <div class="tdui-user-body-list-start">
                  <i color="#aaa" size="20" class="el-icon-setting"/>
                </div>
                <div class="tdui-user-body-list-end" name="account-setting">账号设置</div>
              </div>
              <div class="tdui-user-body-list">
                <div class="tdui-user-body-list-start">
                  <i color="#aaa" size="20" class="el-icon-s-promotion"/>
                </div>
                <div class="tdui-user-body-list-end" name="account-exit">退出登录</div>
              </div>
            </div>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'vheader',
  data () {
    return {
      infoBlock: false
    }
  },
  methods: {
    closeDialog (event) {
      this.infoBlock = false
    }
  },
  directives: {
    clickOutside: {
      bind (el, binding, vnode) {
        function clickHandler (e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e)
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler
        document.addEventListener('click', clickHandler)
      },
      update () {},
      unbind (el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  background-color: #fff;
  height: 60px;
  .logo {
    float: left;
    height: 60px;
    line-height: 60px;
    width: 200px;
    text-align: center;
    background-color: rgb(84, 92, 100);
    img {
      display: inline-block;
      height: 40px;
      vertical-align: middle;
    }
  }
  .tool-bar {
    width: 280px;
    // padding-right: 10px;
    float: right;
    .bar-list {
      line-height: 64px;
      display: inline-block;
      li {
        display: inline-block;
        float: left;
        list-style-type: none;
        padding: 0px 13px;
        position: relative;
        & > i {
          cursor: pointer;
          margin-left: 5px;
          transition: all 0.3s ease-in;
          &:hover {
            // transform: scale(1.2);
            transition: all 0.3s ease-out;
          }
        }
        .tdui-user-body {
          position: absolute;
          width: 240px;
          top: 70px;
          right: 5px;
          background: #ffffff;
          box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.25);
          border-radius: 4px;
          z-index: 99999999;
          .tdui-user-body-list {
            height: 48px;
            display: flex;
            line-height: 48px;
            cursor: pointer;
            &:hover {
              background-color: #f1f1f1;
            }
            .tdui-user-body-list-start {
              width: 68px;
              text-align: center;
            }
            .tdui-user-body-list-first-end {
              flex: 1;
              font-size: 14px;
              color: #2185f0;
              white-space: nowrap;
              overflow: hidden;
            }
          }
          .tdui-user-body-list-first {
            cursor: default;
            display: flex;
            height: 64px;
            line-height: 64px;
            border-bottom: solid 1px rgba(23, 35, 61, 0.1);
            &:hover {
              background-color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
