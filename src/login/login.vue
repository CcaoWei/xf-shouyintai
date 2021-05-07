<template>
  <div class="login"  v-if="$route.path=='/'">
    <loginHeader></loginHeader>
    <div class="login-text">使用账号登录</div>
    <div class="input-all">
      <img class="left-icon"  src="../assets/login/phone_icon.png" alt srcset />
      <van-field
        class="input-box"
        v-model="loginInfo.phone"
        placeholder="电话号码"
        :border="false"
        @input="onPhoneChange"
        type="number"
      />
    </div>
    <div style="width: 100%;height: 5px;"></div>
    <div class="input-all">
      <img class="left-icon" src="../assets/login/password_icon.png" alt srcset />
        <van-field
        class="input-box"
        :class="errorPwd ? 'error-pwd' : ''"
        v-model="loginInfo.password"
        placeholder="密码"
        :border="false"
        @input="onPasswordChange"
        :type="inputType"
      />


      <img class="pwd-is-see" v-if="isCanSeeIcon" @click="isCanSeePwd" src="../assets/login/no_see.png" alt="" srcset="">
      <img class="pwd-is-see" v-else @click="isCanSeePwd" src="../assets/login/can_see.png" alt="" srcset="">

    </div>
    <div class="forget-div">
     <div class="forget-pwd" @click="navToForgetPwd">忘记密码？</div>
    </div>
    <div class="continue" @click="loginEvent">登录</div>
    <div class="forget-div">
    <div class="sign-text">没有账号？<span @click="navToSign" style="font-weight: bold">立即注册</span></div>

    </div>
  </div>
   <div  class="welcome"  v-else>
     <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>

  </div>
</template>

<script>
import loginHeader from "./loginHeader";
import { login, getUser } from "@/api/meeting";
import { mapGetters } from "vuex";
import { Dialog } from "vant";

export default {
  components: {
    loginHeader
  },
  data() {
    return {
      isCanSeeIcon:true,
      inputType:"password",//密码输入框类型
      errorPwd:false,//密码错误
      loginInfo: {
        phone: "", //电话号码
        password: "" //密码
      },

    };
  },
  computed: {
    ...mapGetters(["loginType"])
  },
  methods: {
    onPhoneChange(value) {
      // console.log(value)

    },
    onPasswordChange(value) {
      // console.log(value)

    },
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
    navToForgetPwd(){
       this.$router.push({
          path: "/getCode",
          query:{
            type:1
          }
        });
    },
    navToSign(){
      this.$router.push({
          path: "/getCode",
          query:{
            type:2
          }
        });
    },
    loginEvent() {
      const pUserName = this.loginInfo.phone.trim();
      const pUserPassword = this.loginInfo.password.trim();

      if(
        pUserName==undefined ||pUserName=="" || pUserName.length ==0||
        pUserPassword==undefined ||pUserPassword=="" || pUserPassword.length ==0)
      {
        Dialog.alert({
          title: '提示',
          message: '用户名或密码不能为空'
        }).then(() => {
          // on close
        });
        return;
      }

      let data =
        {
        tenantld: "679973",
        grant_type: "password",
        username: pUserName,
        password:pUserPassword,
        scope: "all",
        type: "mobile-password"
      };
      login(data).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$store.commit("SET_USERINFO", res.data);
          sessionStorage.setItem("Token", res.data.refresh_token);
          getUser().then(userinfo => {
            console.log(userinfo);
            if (res.status == 200) {
              sessionStorage.setItem("userinfo", userinfo.data.data.deptName);
              this.$store.commit("SET_USERDEPT", userinfo.data.data);
              this.$router.push({ path: "entrance/index" }).catch(err => {
                err;
              });
            }
          });
        } else {
          Dialog.alert({
            message: res.data.error_description
          }).then(() => {
            // on close
          });
          this.errorPwd = true;
        }
        // this.$store.commit("LOGIN_TYPE", res.data.data.rold);
        // this.$store.commit("SET_USERINFO", res.data.data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.welcome {
  height: 100%;
  width: 100%;
  background: #fff;
  }
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
  .forget-div{
    width: 97%;
    height: 4.3rem;
  }
  .forget-pwd {
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #fe5845;
    letter-spacing: 0;
    text-align: right;
    margin: 1.5rem 0 0.7rem 0;
    width: 30%;
    float: right;
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
