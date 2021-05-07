<template>
  <div class="login">
    <div class="login-top">
      <div class="login-text">
        <span>您好</span>
        <img src="ftp://124.127.40.85/upload/zwqrCode.png" alt="">
        <span>欢迎登陆</span>
        <div class="down-block"></div>
      </div>
      <div class="login-icon">
      </div>
    </div>
    <van-cell-group class="login-form">
      <van-field class="login-input phone" placeholder="请输入手机号码/邮箱" v-model="nameValue" center clearable></van-field>
      <van-field class="login-input pwd" v-model="pwdValue" placeholder="请输入密码" center clearabl
                 type="password"></van-field>
    </van-cell-group>
    <van-button class="sub-btn" type="danger" @click="loginEvent">登录</van-button>
    <div class="operation-area">
      <span class="btn-code" @click="loginByCode">验证码登录</span>
      <span class="btn-forget" @click="forget">忘记密码？</span>
    </div>
    <div class="footer" v-if="showFooter">
      <div class="footer-msg">我是老板，我要</div>
      <div class="footer-btn" @click="register">注册账号</div>
    </div>
    <!--<div class="wechat">-->
    <!--<span>更多登录方式</span>-->
    <!--<img class="we-img" src="../assets/images/微信.png" alt="">-->
    <!--</div>-->
    <!--<div class="agreement">-->
    <!--<span class="desc">登录即您已阅读同意</span>-->
    <!--<span class="content">用户协议及隐私政策</span>-->
    <!--</div>-->
  </div>
</template>

<script>
  import registerHeader from "@/components/registerHeader";
  import {login} from "@/api/priceManage";
  import {getDayClose} from "@/api/cashier";
  import {mapGetters} from "vuex";
  import {Notify, Toast} from "vant";

  export default {
    name: "login",
    components: {
      registerHeader
    },
    data() {
      return {
        nameValue: "",
        pwdValue: "",
        routers: [],
        showFooter: true,
        screenHNew: 0,
        screenHOld: 0
      };
    },
    computed: {
      ...mapGetters(["loginType"])
    },
    created() {
      this.screenHNew = document.body.clientHeight;
      this.screenHOld = document.body.clientHeight;
      window.onresize = () => {
        return (() => {
          this.screenHNew = document.body.clientHeight;
          if (this.screenHOld > this.screenHNew) {
            this.showFooter = false;
          } else {
            this.showFooter = true;
          }
        })();
      };
    },
    methods: {
      loginEvent() {
        let data = {
          username: this.nameValue,
          password: this.pwdValue,
          grant_type: "password"
        };
        login(data).then(res => {
          if (res.status == 200) {
            localStorage.setItem("drawer", 0);
            // console.log(res);
            // console.log(res.data.data.rold)
            // console.log(res.data.data)
            // console.log(res.data.role_name)
            if (res.data.role_name == "收银员") {
              //15100000005
              this.$store.commit("LOGIN_TYPE", "1");
              this.$store.commit("SET_USERINFO", res.data);
              getDayClose().then(dayClose => {
                if (dayClose.status == 200) {
                  if (dayClose.data.data != "0") {
                    Toast.fail("收银员已日结无法登陆!");
                  } else {
                    let routerChildren = [
                      ...this.$router.options.routes[1].children
                    ];
                    for (let i in routerChildren) {
                      if (this.loginType == routerChildren[i].meta.type) {
                        this.routers.push(routerChildren[i]);
                      }
                    }
                    this.$router.push(`/entrance/${this.routers[0].path}`);
                  }
                } else {
                  Notify({
                    type: "danger",
                    message: dayClose.data.error_description
                  });
                }
              });
            } else if (res.data.role_name == "老板") {
              //15100000001
              this.$store.commit("LOGIN_TYPE", "2");
              this.$store.commit("SET_USERINFO", res.data);
              let routerChildren = [...this.$router.options.routes[1].children];
              for (let i in routerChildren) {
                if (this.loginType == routerChildren[i].meta.type) {
                  this.routers.push(routerChildren[i]);
                }
              }
              this.$router.push(`/entrance/${this.routers[0].path}`);
            } else if (res.data.role_name == "店长") {
              //15100000002
              this.$store.commit("LOGIN_TYPE", "4");
              this.$store.commit("SET_USERINFO", res.data);
              let routerChildren = [...this.$router.options.routes[1].children];
              for (let i in routerChildren) {
                if (this.loginType == routerChildren[i].meta.type) {
                  this.routers.push(routerChildren[i]);
                }
              }
              this.$router.push(`/entrance/${this.routers[0].path}`);
            } else if (res.data.role_name == "店员") {
              //15100000004
              this.$store.commit("LOGIN_TYPE", "3");
              this.$store.commit("SET_USERINFO", res.data);
              let routerChildren = [...this.$router.options.routes[1].children];
              for (let i in routerChildren) {
                if (this.loginType == routerChildren[i].meta.type) {
                  this.routers.push(routerChildren[i]);
                }
              }
              this.$router.push(`/entrance/${this.routers[0].path}`);
            }
          } else {
            if (res.data.error_description) {
              Notify({type: "danger", message: res.data.error_description});
            }
          }
        });
      },
      loginByCode() {
        this.$router.push("/loginByCode");
      },
      forget() {
        this.$router.push("/forget");
      },
      register() {
        this.$router.push("/register");
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login {
    height: 100%;
    width: 100%;
    padding: 30% 5% 0 5%;
    background: #fff;
    box-sizing: border-box;



    .login-top {
      display: flex;
      justify-content: space-between;

      .login-text {
        font-size: 1.75rem;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        text-align: left;

        .down-block {
          width: 1.9375rem;
          height: 0.3125rem;
          background-color: #222b45;
          border-radius: 0.15625rem;
          margin-top: 0.6rem;
        }
      }

      .login-icon {
        width: 2.7rem;
        height: 2.7rem;
        background: url("../../assets/images/logo位置.png") no-repeat;
        background-color: #8f9bb3;
        border: 0.875rem solid #8f9bb3;
        border-radius: 50%;
        opacity: 0.5;
      }
    }

    /deep/ .van-cell-group {
      width: 100% !important;
    }

    .login-form {
      margin-top: 4rem;

      .login-input {
        width: 100% !important;
        margin-bottom: 1.5rem !important;
        border-radius: 0.3rem !important;
        background: #f9fafb !important;

        /deep/ .van-field__control {
          opacity: 0.5 !important;
          font-family: PingFangSC-Regular !important;
          font-size: 1rem !important;
          color: #000 !important;
          margin-left: 1rem !important;
        }
      }

      .phone {
        background: url("../../assets/images/手机号码.png") 1.5rem no-repeat;
      }

      .pwd {
        background: url("../../assets/images/密码.png") 1.5rem no-repeat;
      }
    }

    .sub-btn {
      width: 100%;
      margin: 0 auto;
      height: 3.5rem;
      border-radius: 0.3rem;
      margin-top: 2.125rem;
      background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
      border: 0;
    }

    .operation-area {
      margin-top: 1rem;

      .btn-code {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        float: left;
      }

      .btn-forget {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #8f9bb3;
        float: right;
      }
    }

    .footer {
      position: fixed;
      bottom: 1.125rem;
      left: 0;
      right: 0;
      margin: 0 auto;

      .footer-msg {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
      }

      .footer-btn {
        font-family: PingFangSC-Regular;
        font-size: 0.75rem;
        color: #ff8900;
      }
    }

    /*.wechat {*/
    /*  display: flex;*/
    /*  margin-top: 2.125rem;*/
    /*  flex-direction: column;*/
    /*  align-items: center;*/

    /*  .we-img {*/
    /*    margin-top: 1.5rem;*/
    /*    width: 2.625rem;*/
    /*    height: 2.625rem;*/
    /*  }*/
    /*}*/
    /*.agreement {*/
    /*  margin-top: 2rem;*/
    /*  font-size: 0.875rem;*/

    /*  .desc {*/
    /*    font-family: PingFangSC-Medium;*/
    /*    color: #8f9bb3;*/
    /*  }*/

    /*  .content {*/
    /*    font-family: PingFangSC-Medium;*/
    /*    color: #f39946;*/
    /*  }*/
    /*}*/
  }

  .other-box {
    height: calc(100% - 3.75rem);
    margin-top: 3.7rem;
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

  /deep/ .van-cell:last-child ::after {
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

  /deep/ .van-field__control,
  .van-field__control::-moz-input-placeholder {
    margin-left: 3.4375rem;
    color: #8f9bb3;
  }

  /deep/ .van-field__control,
  .van-field__control::-ms-input-placeholder {
    margin-left: 3.4375rem;
    color: #8f9bb3;
  }
</style>
