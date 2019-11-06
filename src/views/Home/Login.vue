<!--
 * @Descripttion: 登陆界面
 * @Date: 2019-08-13 17:09:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-06 10:33:45
 -->
<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
    class="login"
    @keydown.enter.native="submitLogin"
  >
    <el-col v-if="$store.state.userType =='DING'" :xs="{span:22}" style="width: 368px;">
      <el-row class="header">
        <img src="../../assets/login-logo.png" width="220px" />
        <!-- <div class="description">企培标品</div> -->
      </el-row>
      <div class="major">欢迎使用后台管理系统</div>
      <el-row class="login-form">
        <el-form ref="usernameLoginForm" :model="form" :rules="rules" class="form">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              prefix="ios-contact"
              size="large"
              clearable
              placeholder="请输入手机号"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              prefix="ios-lock"
              size="large"
              clearable
              placeholder="请输入密码"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <el-row>
          <el-button class="login-btn" type="primary" size="large" @click="submitLogin" long>
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </el-button>
        </el-row>
      </el-row>
    </el-col>
    <el-col v-else :xs="{span:22}" style="width: 368px;">
      <el-row class="header">
        <img src="../../assets/login-logo.png" width="220px" />
        <!-- <div class="description">企业主后台</div> -->
      </el-row>
      <div class="major">登录你的企业大学</div>
      <el-row class="login-form">
        <el-form ref="usernameLoginForm" :model="form" :rules="rules" class="form">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              prefix="ios-contact"
              size="large"
              clearable
              placeholder="请输入手机号"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item style="margin-bottom:10px" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              prefix="ios-lock"
              size="large"
              clearable
              placeholder="请输入密码"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <el-button class="lost-password" :to="{name:'lostPassword'}" type="text">忘记密码</el-button>

        <el-row>
          <el-button class="login-btn" type="primary" size="large" @click="submitLogin" long>
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </el-button>
        </el-row>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
// import encryption from '../../tools/encryption.js'
export default {
  data () {
    return {
      loginBg: require('@/assets/login_bg.png'),
      loading: false,
      sending: false,
      sended: false,
      maxLength: 6,
      errorCode: '',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '账号不能为空'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空'
          }
        ]
      }
    }
  },
  created () {},
  methods: {
    submitLogin () {
      this.$http
        .post('/api/adminUser/login', {
          username: this.form.username,
          password: this.form.password
        })
        .then(res => {
          if (res.code === 200) {
          }
        })
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background: url('../../assets/login_bg.png');
  background-size: 100% 100%;
  .header {
    margin-bottom: 3vh;
    text-align: center;
    .description {
      font-size: 14px;
      el-color: rgba(0, 0, 0, 0.45);
      margin-top: 1vh;
    }
  }
  .major {
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
    el-color: #2d8cf0;
  }
  .login-form {
    margin-bottom: 16vh;
  }
  .ivu-tabs-nav-container {
    line-height: 2;
    font-size: 17px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    zoom: 1;
  }
  .form {
    padding-top: 1vh;
    .el-input-verify {
      width: 70%;
    }
    .count-verify,
    .send-verify {
      width: 100px;
    }
  }
  .forget-pass,
  .other-way {
    font-size: 14px;
  }
  .login-btn,
  .other-login {
    margin-top: 1vh;
  }
  .icons {
    display: flex;
    align-items: center;
  }
  .other-icon {
    cursor: pointer;
    margin-left: 10px;
    display: flex;
    align-items: center;
    el-color: rgba(0, 0, 0, 0.2);
    :hover {
      el-color: #2d8cf0;
    }
  }
  .foot {
    margin-bottom: 2vh;
    el-color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    .help {
      margin: 0 auto 1vh;
      width: 60%;
      .item {
        el-color: rgba(0, 0, 0, 0.45);
      }
      :hover {
        el-color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}

.ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
  width: 14px;
  height: 14px;
  margin-right: 8px;
  margin-bottom: 5px;
}
.lost-password {
  el-color: #2d8cf0;
  padding-left: 0;
}
</style>
