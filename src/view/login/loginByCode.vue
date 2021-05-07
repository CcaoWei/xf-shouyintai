<template>
  <div class="login">
    <div class="login-top">
      <div class="login-text">
        <span>您好</span>
        <span>欢迎登陆</span>
        <div class="down-block"></div>
      </div>
      <div class="login-icon">
      </div>
    </div>
    <van-cell-group class="login-form">
      <van-field class="login-input phone" placeholder="请输入手机号码" v-model="nameValue" center clearable></van-field>
      <van-field class="login-input pwd" v-model="pwdValue" placeholder="请输入验证码" center clearabl type="password">
        <van-button class="btn-code" slot="button" size="small" type="primary" @click="sendCode" :disabled="!getCode">
          <span v-if="getCode">发送验证码</span>
          <span v-else>{{count}}</span>
        </van-button>
      </van-field>
    </van-cell-group>
    <div class="tips-area">
      <van-icon class="check-icon" name="/static/check.png"/>
      <span class="tips-text">我已认真阅读并同意</span><span class="tips-info">《服务协议》</span>
    </div>
    <van-button class="sub-btn" type="danger" @click="loginEvent">登录</van-button>
    <div class="operation-area">
      <span class="btn-code" @click="goLogin">密码登录</span>
    </div>
  </div>
</template>

<script>
  import {Notify, Toast} from "vant";
  import {getCode, loginByCode} from "@/api/code";
  import {getDayClose} from "@/api/cashier";
  import {mapGetters} from "vuex";

  export default {
    name: "loginByCode",
    data() {
      return {
        nameValue: "",
        pwdValue: "",
        timer: null,
        count: "",
        getCode: true,
        routers: []
      };
    },

    computed: {
      ...mapGetters(["loginType"])
    },
    methods: {
      loginEvent() {
        localStorage.setItem("drawer", 0);
        let data = {
          mobile: this.nameValue,
          code: this.pwdValue,
          type: "mobile-code",
          grant_type:"password",
          scope:"all"

        };
        loginByCode(data).then(res => {
          if (res.data.role_name == '收银员') {//18043173701
            this.$store.commit("LOGIN_TYPE", "1");
            this.$store.commit("SET_USERINFO", res.data);
            getDayClose().then(dayClose => {
              if (dayClose.status == 200) {
                if (dayClose.data.data != "0") {
                  Toast.fail("收银员已日结无法登陆!");
                }else{
                  let routerChildren = [...this.$router.options.routes[1].children];
                  for (let i in routerChildren) {
                    if (this.loginType == routerChildren[i].meta.type) {
                      this.routers.push(routerChildren[i]);
                    }
                  }
                  this.$router.push(`/entrance/${this.routers[0].path}`);
                }
              } else {
                Notify({type: 'danger', message: dayClose.data.error_description});
              }
            });
          } else if (res.data.role_name == '老板') {//123456
            this.$store.commit("LOGIN_TYPE", "2");
            this.$store.commit("SET_USERINFO", res.data);
            let routerChildren = [...this.$router.options.routes[1].children];
            for (let i in routerChildren) {
              if (this.loginType == routerChildren[i].meta.type) {
                this.routers.push(routerChildren[i]);
              }
            }
            this.$router.push(`/entrance/${this.routers[0].path}`);
          } else if (res.data.role_name == '店长') {//13621209216
            this.$store.commit("LOGIN_TYPE", "4");
            this.$store.commit("SET_USERINFO", res.data);
            let routerChildren = [...this.$router.options.routes[1].children];
            for (let i in routerChildren) {
              if (this.loginType == routerChildren[i].meta.type) {
                this.routers.push(routerChildren[i]);
              }
            }
            this.$router.push(`/entrance/${this.routers[0].path}`);
          }  else if (res.data.role_name == '店员') {//15234340201
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
        });
      },
      goLogin() {
        this.$router.push('/');
      },
      sendCode() {
        if (/^1[3456789]\d{9}$/.test(this.nameValue)) {
          let data = {
            tenantId: "936701",
            phone: this.nameValue,
            type: 6
          };
          this.getCode = false;
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.getCode = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);
            getCode(data).then(res => {
              if (res.status == 200) {
                Toast.fail("验证码发送成功，请至手机查看");
              } else {
                Notify({type: 'danger', message: res.data.error_description});
              }
            });
          }
        } else {
          Notify({type: 'danger', message: "手机号格式错误"});
        }
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

    .tips-area {
      float: left;

      .check-icon {
        /deep/ .van-icon__image {
          width: .75rem;
          height: .75rem;
        }
      }

      .tips-text {
        font-family: PingFangSC-Regular;
        font-size: .75rem;
        color: #C6CCD9;
      }

      .tips-info {
        font-family: PingFangSC-Regular;
        font-size: .75rem;
        color: #FF8900;
      }
    }

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
          height: .3125rem;
          background-color: #222B45;
          border-radius: .15625rem;
          margin-top: .6rem;
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
        border-radius: .3rem !important;
        background: #F9FAFB !important;

        /deep/ .van-field__control {
          opacity: 0.5 !important;
          font-family: PingFangSC-Regular !important;
          font-size: 1rem !important;
          color: #000 !important;
          margin-left: 1rem !important;
        }

        .btn-code {
          background: #F9FAFB !important;
          border: 0;
          font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #FF8900;
        }
      }

      .phone {
        background: url("../../assets/images/手机号码.png") 1.5rem no-repeat;
      }

      .pwd {
        background: url("../../assets/images/密码.png") 1.5rem no-repeat;
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
    height: 3.5rem;
    border-radius: .3rem;
    margin-top: 2.125rem;
    background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
    border: 0;
  }

  .operation-area {
    margin-top: 1rem;

    .btn-code {
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #222B45;
    }

    .btn-forget {
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #8F9BB3;
      float: right;
    }
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
    margin-top: 2rem;
    font-size: 0.875rem;

    .desc {
      font-family: PingFangSC-Medium;
      color: #8f9bb3;
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
