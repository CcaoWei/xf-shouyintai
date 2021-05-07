<template>
  <div class="login">
    <div class="login-top">
      <div class="login-text">
        <span>登录</span>
        <span>企业中心</span>
        <div class="line"></div>
      </div>
      <div class="login-icon"></div>
    </div>

    <van-cell-group class="login-form">
      <van-field class="login-input phone" placeholder="手机号码" v-model="nameValue" center clearable></van-field>
      <van-field
        class="login-input pwd"
        v-model="pwdValue"
        placeholder="密码"
        center
        clearabl
        type="password"
      ></van-field>
    </van-cell-group>
    <van-button class="sub-btn" type="danger" @click="loginEvent">登录</van-button>
    <div class="sign-text" @click="navToSign">没有账号？注册</div>
    <!-- <div class="wechat">
      <span>更多登录方式</span>
      <img class="we-img" src="../assets/images/微信.png" alt="">
    </div>-->

    <!--<div class="agreement">-->
    <!--<span class="desc">登录即您已阅读同意</span>-->
    <!--<span class="content">用户协议及隐私政策</span>-->
    <!--</div>-->

    <div class="versionDescription" >
      <span >Ver 2.0.3 @2020-03-03日</span>
    </div>

    <div style="width: 100%;height: 400px;background-color: transparent">
    </div>


  </div>
</template>

<script>
import { login, getUser } from "@/api/meeting";
import { mapGetters } from "vuex";
import { Dialog } from "vant";
export default {
  name: "login",
  data() {
    return {
      nameValue: "",
      pwdValue: "",
      routers: []
    };
  },
  computed: {
    ...mapGetters(["loginType"])
  },
  methods: {
    loginEvent() {
      const pUserName = this.nameValue.trim();
      const pUserPassword = this.pwdValue.trim();
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
        }
        // this.$store.commit("LOGIN_TYPE", res.data.data.rold);
        // this.$store.commit("SET_USERINFO", res.data.data);
      });
    },
    navToSign(){
        // this.$router.push({ path: "entrance/index" }).catch(err => {
        //   err;
        // });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .versionDescription
  {
    width: 100%;
    margin-top: 150px;
    text-align: center;
    height: 20px;
  }

.login {
  height: 100%;
  width: 100%;
  padding: 7.4rem 5% 0 5%;
  background: #fff;
  box-sizing: border-box;
  overflow: scroll;
  .login-top {
    display: flex;
    justify-content: space-between;
    .login-text {
      font-size: 1.75rem;
      font-weight: bold;
      display: flex;
      text-align: left;
      flex-direction: column;
      span{
        font-family: PingFangSC-Medium;
        font-size: 2.8rem;
        color: #222B45;
        line-height: 4rem;
      }
    }
    .login-icon {
      width: 6.8rem;
      height: 6.8rem;
      background: url("../assets/images/logo位置.png") center center no-repeat;
      background-color: #8f9bb3;
      // border: 0.875rem solid #8f9bb3;
      border-radius: 50%;
      opacity: 0.5;
      box-sizing: border-box;
    }
  }
  .login-form {
    background-color: transparent;
    margin-top: 5rem;
    .login-input {
      width: 33.5rem;
      height: 4.7rem;
      margin-bottom: 2.4rem;
      background: #8F9BB3;
      border-radius: 23.5px;
    }
    .phone {
      background: #faf9f9 url("../assets/images/手机号码.png") 1.5rem no-repeat;
    }
    .pwd {
      background: #faf9f9 url("../assets/images/密码.png") 1.5rem no-repeat;
    }
    .van-field
    {
      width: 100%;
    }
  }
}
.get-code {
  color: #ff891c;
  border-radius: 1rem;
}
.sub-btn {
  width: 100%;
  margin: 0 auto;
  margin-top: 2.125rem;
  font-family: PingFangSC-Semibold;
font-size: 1.6rem;
color: #FFFFFF;
line-height: 1.6rem;
  border: 0;
   background-image: linear-gradient(90deg, #FF7901 3%, #FE5845 100%);
    border-radius: 28px;
    width: 33.5rem;
    height: 5.6rem;
}
.wechat {
  display: flex;
  margin-top: 2.125rem;
  flex-direction: column;
  align-items: center;
  .we-img {
    margin-top: 1.5rem;
    width: 2.625rem;
    height: 2.625rem;
  }
}
.agreement {
  margin-top: 27rem;
  .desc {
    font-family: PingFangSC-Medium;
font-size: 1.4rem;
color: #8F9BB3;
line-height: 1.4rem;
  }
  .content {
    font-family: PingFangSC-Medium;
    color: #f39946;
  }
}
/deep/ .van-cell-group,
.van-cell {
  background: rgba(0, 0, 0, 0);
  width: 95%;
  margin: 0 auto;
  border: 0;
}
/deep/ .van-cell-group::after {
  border-width: 0;
}
/deep/ .van-cell:not(:last-child)::after {
  border: 0;
}
/deep/.van-cell:last-child ::after {
  border-bottom: 1px solid #fff;
}
/deep/ .van-cell {
  border-bottom: 1px solid #fff;
}
/deep/ .van-cell__title span {
  color: #8f9bb3;
}
/deep/ .van-field__label {
  width: 72px;
}
/deep/ .van-field__control,
.van-field__control::-webkit-input-placeholder {
  margin-left: 3.4375rem;
  color: #8f9bb3;
}
/*/deep/ .van-field__control,*/
/*.van-field__control::-moz-input-placeholder {*/
/*margin-left: 3.4375rem;*/
/*color: #8f9bb3;*/
/*}*/
/deep/ .van-field__control,
.van-field__control::-ms-input-placeholder {
  margin-left: 3.4375rem;
  color: #8f9bb3;
}
.line{
  background: #222B45;
border-radius: 2.5px;
width: 3.1rem;
height: 0.5rem;
margin-top: 1.2rem;
}
.sign-text{
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}
</style>
