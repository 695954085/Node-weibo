<template>
  <el-form :model="ruleForm2" :rules="rules" ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item class='item__button'>
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
    </el-form-item>
    <div class="to-register">
      <span class="register__content" @click="toRegister">register</span>
    </div>
  </el-form>
</template>

<script>
import { requestLogin, axiosSetAuth } from "@/api";
import { mapMutations } from "vuex";
import { STORETOKEN, INITUSER } from "../store/mutation-types";

export default {
  name: "login",
  data() {
    return {
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      logining: false,
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  methods: {
    ...mapMutations([STORETOKEN]),
    handleSubmit() {
      let _this = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.logining = true;
          let loginParams = {
            userName: this.ruleForm2.account,
            password: this.ruleForm2.checkPass,
            avatar: "http://localhost:3000/img/1.jpg"
          };
          requestLogin(loginParams).then(response => {
            this.logining = false;
            let { data, status, statusText } = response;
            if (status !== 200) {
              this.$message({
                message: statusText,
                type: "error"
              });
            } else if (data.code == 200) {
              // 浏览器被关闭的时候，sessionStorage会被清理
              this.$store.commit(INITUSER, data.user);
              axiosSetAuth(data.user.token);
              // 执行某个Mutation，把axios的header设置token
              this.$router.push("/");
            } else {
              this.$message({
                message: data.msg,
                type: "error"
              });
            }
          });
        }
      });
    },
    toRegister() {
      this.$router.push("/register");
    }
  }
};
</script>
<style scoped lang="scss">
@import "~element-ui/packages/theme-chalk/src/common/var";
.login-container {
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px 10px #cac6c6;
}

.login-container .title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

.login-container .remember {
  margin: 0 0 35px 0;
  display: block;
  text-align: left;
}

.to-register {
  padding-top: 5px;
  text-align: right;

  .register__content {
    color: $--color-primary;
    cursor: pointer;
    &:hover {
      color: $--color-warning;
    }
    &.is-active {
      text-decoration-line: underline;
    }
  }
}

.item__button {
  margin-bottom: 10px;
}
</style>

