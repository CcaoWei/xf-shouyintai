<template>
  <div class="login">
    <loginHeader></loginHeader>
    <div class="login-text">注册账号</div>
    <div class="input-all">
      <img class="left-icon" src="../assets/login/name.png" alt srcset />
      <van-field class="input-box" v-model="loginInfo.name" placeholder="姓名" :border="false" @input="onPasswordChange" />
    </div>
    <div class="input-all">
      <img class="left-icon" src="../assets/login/password_icon.png" alt srcset />
      <van-field class="input-box" v-model="loginInfo.password" placeholder="密码" :border="false" @input="onPasswordChange" :type="inputType" />

      <!-- <img class="pwd-is-see" v-if="isCanSeeIcon" @click="isCanSeePwd" src="../assets/login/no_see.png" alt="" srcset="">
      <img class="pwd-is-see" v-else @click="isCanSeePwd" src="../assets/login/can_see.png" alt="" srcset="">-->
    </div>
    <div class="pwd-tip">输入至少八个数字、字母的组合。</div>
    <div class="input-all">
      <img class="left-icon" src="../assets/login/sure_pwd.png" alt srcset />
      <van-field class="input-box" v-model="loginInfo.surePassword" placeholder="确认密码" :border="false" @input="onCodeChange" type="password" />
    </div>
    <div class="input-all">
      <img class="left-icon" src="../assets/login/Invitation code.png" alt srcset />
      <van-field class="input-box" v-model="loginInfo.deptId" placeholder="团队邀请码" :border="false" @input="onPasswordChange" type="number" />
    </div>
    <div class="continue" @click="registerEvent">注册</div>
    <div class="agreement">
      <img v-if="agree" @click="agreement" src="../assets/login/select.png" alt />
      <img v-else @click="agreement" src="../assets/login/no_select.png" alt />
      <div class="agree-text" @click="agreement">我已认真阅读并同意</div>
      <div class="agreement-text" @click="navToAgreement">《服务协议》</div>
    </div>
  </div>
</template>

<script>
import loginHeader from "./loginHeader";
import { Dialog } from "vant";
import { register } from "@/api/meeting";
export default {
  components: {
    loginHeader
  },
  data() {
    return {
      agree: this.$store.state.base.agreement,
      getCode: true,
      noContinue: true,
      isCanSeeIcon: true,
      inputType: "password", //密码输入框类型
      loginInfo: {
        name: "",
        password: "",
        surePassword: "",
        deptId: ""
      }
    };
  },
  created() {
    this.loginInfo.phone = this.$route.query.phone;
  },
  activated(){
 this.agree = this.$store.state.base.agreement;
 console.log(this.agree)
  },
  methods: {
    onCodeChange() {},
    onPasswordChange() {},
    agreement() {
      this.agree = !this.agree;
      this.$store.commit("SET_AGREEMENT", this.agree);
    },
    navToAgreement() {
      this.$router.push({
        path: "/agreement"
      });
    },
    isCanSeePwd() {
      //密码是否可见
      console.log(this.loginInfo);
      if (this.inputType == "password") {
        this.inputType = "text";
        this.isCanSeeIcon = false;
      } else {
        this.inputType = "password";
        this.isCanSeeIcon = true;
      }
    },
    registerEvent() {
      const userName = this.loginInfo.name;
      const userPassword = this.loginInfo.password;
      const userSurePassword = this.loginInfo.surePassword;
      const userDeptId = this.loginInfo.deptId;
      if (
        userName == "" ||
        userName.length == 0 ||
        userPassword == "" ||
        userPassword.length == 0 ||
        userSurePassword == "" ||
        userSurePassword.length == 0 ||
        userDeptId == "" ||
        userDeptId.length == 0
      ) {
        Dialog.alert({
          title: "提示",
          message: "请填写全部信息"
        }).then(() => {
          // on close
        });
      } else if (/^[0-9A-Za-z]{8,20}$/.test(this.loginInfo.password)) {
        if (userPassword == userSurePassword) {
          if (this.agree) {
            let data = {
              deptId: this.loginInfo.deptId,
              name: this.loginInfo.name,
              password: this.loginInfo.password,
              phone: this.loginInfo.phone,
              surePwd: this.loginInfo.surePassword,
              tenantId: "679973"
            };
            register(data).then(res => {
              console.log(res);
              if (res.status == 200) {
                Dialog.alert({
                  title: "提示",
                  message: "恭喜！注册成功"
                }).then(() => {
                  // on close
                  this.$router.go(-2);
                });
              }
            });
          } else {
            Dialog.alert({
              title: "提示",
              message: "请阅读并同意《服务协议》"
            }).then(() => {
              // on close
            });
          }
        } else {
          Dialog.alert({
            title: "提示",
            message: "密码和确认密码不一致"
          }).then(() => {
            // on close
          });
        }
      } else {
        Dialog.alert({
          title: "提示",
          message: "密码格式不正确"
        }).then(() => {
          // on close
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  background: #fff;
  .login-text {
    font-family: PingFangSC-Semibold;
    font-size: 1.6rem;
    color: #141414;
    letter-spacing: 0;
    text-align: center;
    line-height: 1.6rem;
    /*margin-top: 2.3rem;*/
    margin-top: 3.0rem;
    margin-bottom: 1.6rem;
    width: 100%;
  }
  .input-all {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 89.3%;
    height: 4.3rem;
    margin: 0 auto;
    .input-box {
      background: #fefffe;
      // box-shadow: 0 1px 0 0 #7c7c7c;
      border-bottom: 1px solid #7c7c7c;
      margin-left: 1.2rem;
      padding-left: 0;
      height: 4.3rem;
      line-height: 5rem;
      padding: 0;
    }
    .error-pwd {
      border-bottom: 1px solid #fe5845;

      /deep/ .van-field__control {
        color: #fe5845;
      }
    }

    .left-icon {
      height: 2.4rem;
      width: 2.4rem;
      margin-top: 1rem;
    }
    .pwd-is-see {
      height: 1.6rem;
      width: 1.6rem;
      position: absolute;
      right: 3rem;
    }
  }
  .pwd-tip {
    opacity: 0.5;
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #9b9b9b;
    letter-spacing: 0;
    line-height: 1.6rem;
    width: 89%;
    margin: 0.4rem auto 0;
    text-align: left;
  }
  .forget-pwd {
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #fe5845;
    letter-spacing: 0;
    text-align: right;
    margin: 1.5rem 0 0.7rem 0;
    width: 97%;
  }
  .continue {
    background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
    border-radius: 6px;
    width: 91.5%;
    height: 4.8rem;
    font-family: PingFangSC-Semibold;
    font-size: 1.6rem;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    line-height: 4.8rem;
    margin: 2.2rem auto 0;
  }
  .sign-text {
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #141414;
    letter-spacing: 0;
    text-align: center;
    line-height: 1.6rem;
    margin: 2.4rem 0 0;
    width: 100%;
    text-align: center;
  }
  .agreement {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    height: 1.5rem;
    img {
      height: 1.4rem;
      width: 1.4rem;
      margin-right: 0.65rem;
    }
    .agree-text {
      font-family: PingFangSC-Regular;
      font-size: 1.4rem;
      color: rgba(-2147483648, -2147483648, -2147483648, 0.5);
      line-height: 1.4rem;
    }
    .agreement-text {
      font-family: PingFangSC-Regular;
      font-size: 1.4rem;
      color: #ff7901;
      line-height: 1.4rem;
    }
  }
}
</style>
