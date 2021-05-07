<template>
  <div class="login">
    <loginHeader></loginHeader>
    <div class="login-text">设置新密码</div>
    <div class="input-all">
      <img class="left-icon" src="../assets/login/password_icon.png" alt srcset />
        <van-field
        class="input-box"
        v-model="loginInfo.password"
        placeholder="密码"
        :border="false"
        @input="onPasswordChange"
        :type="inputType"
      />
      

      <img class="pwd-is-see" v-if="isCanSeeIcon" @click="isCanSeePwd" src="../assets/login/no_see.png" alt="" srcset="">
      <img class="pwd-is-see" v-else @click="isCanSeePwd" src="../assets/login/can_see.png" alt="" srcset="">

    </div>
    <div class="input-all">
      <img class="left-icon" src="../assets/login/sure_pwd.png" alt srcset />
      <van-field
        class="input-box"
        v-model="loginInfo.surePassword"
        placeholder="确认密码"
        :border="false"
        @input="onCodeChange"
        type="password"
      />
    </div>
    <div class="continue" @click="login">立即登录</div>
  </div>
</template>

<script>
import loginHeader from "./loginHeader";
import { Dialog } from "vant";
import { changePassword } from "@/api/meeting";
export default {
  components: {
    loginHeader
  },
  data() {
    return {
      getCode: true,
      noContinue: true,
      isCanSeeIcon:true,
      phone:'',
      inputType:"password",//密码输入框类型
      loginInfo: {
        password:"",
        surePassword: "" //验证码
      }
    };
  },
  created() {
    this.phone = this.$route.query.phone
  },
  methods: {
    onCodeChange(){},
    onPasswordChange(){},
    isCanSeePwd(){//密码是否可见
    console.log(this.loginInfo)
      if(this.inputType == "password"){
        this.inputType = "text";
        this.isCanSeeIcon= false;
      }else{
         this.inputType = "password"
         this.isCanSeeIcon= true;
      }
    },
    login() {
      const pUserPassword = this.loginInfo.password.trim();
      const pUserSurePassword = this.loginInfo.surePassword.trim();
      if( pUserPassword==undefined ||pUserPassword=="" || pUserPassword.length ==0||
        pUserSurePassword==undefined ||pUserSurePassword=="" || pUserSurePassword.length ==0) {
          Dialog.alert({
            title: '提示',
            message: '密码或确认密码不能为空'
          }).then(() => {
            // on close
          });
      } else {
        let data = {
          account: this.phone,
          newPwd: pUserPassword,
          surePwd: pUserSurePassword,
          tenantId: '679973'
        }
        changePassword(data).then(res => {
          console.log(res);
          if(res.status == 200) {
            this.$router.push({ path: "/" }).catch(err => {
                err;
              });
          }
        })
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
    margin-top: 2.3rem;
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
    .error-pwd{
      border-bottom: 1px solid #FE5845;
      
      /deep/ .van-field__control{
        color: #FE5845;
      }
    }

    .left-icon {
      height: 2.4rem;
      width: 2.4rem;
      margin-top: 1rem;
    }
    .pwd-is-see{
      height: 1.6rem;
      width: 1.6rem;
      position: absolute;
      right: 3rem;
    }
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
  .sign-text{
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
}
</style>
