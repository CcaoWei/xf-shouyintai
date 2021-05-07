<template>
  <div v-if="$route.path=='/register'" class="login">
    <div class="login-top">
      <div class="login-text">
        <span>注册账号</span>
        <div class="down-block"></div>
      </div>
    </div>
    <van-cell-group class="login-form">
      <van-field class="login-input phone" placeholder="请输入手机号码" v-model="nameValue" center clearable type="number"></van-field>
      <van-field class="login-input pwd" v-model="pwdValue" placeholder="请输入验证码" center clearabl type="number">
        <van-button class="btn-code" slot="button" size="small" type="primary" @click="sendCode" :disabled="!getCode">
          <span v-if="getCode">发送验证码</span>
          <span v-else>{{count}}</span>
        </van-button>
      </van-field>
      <van-field class="login-input pwd" placeholder="请输入密码" v-model="newPassWord" center clearable
                 :type="shoNewPassWord?'text':'password'">
        <van-icon class="btn-eye" name="eye-o" slot="button" @click="shoNPW"/>
      </van-field>
      <van-field class="login-input pwd" placeholder="确认密码" v-model="newPassWordAgain" center clearabl
                 :type="shoNewPassWordAgain?'text':'password'">
        <van-icon class="btn-eye" name="eye-o" slot="button" @click="shoNPWA"/>
      </van-field>
    </van-cell-group>
    <div class="tips-area">
      <!--      <van-icon class="check-icon" name="/static/check.png"/>-->
      <van-checkbox class="check-btn" v-model="agree" icon-size=".75rem" checked-color="#ff8900"></van-checkbox>
      <span class="agree-row">
        <span class="tips-text">我已认真阅读并同意</span>
        <span class="tips-info" @click="goAgreement">《服务协议》</span>
      </span>
    </div>
    <van-button class="sub-btn" type="danger" v-if="nameValue&&pwdValue&&newPassWord&&newPassWordAgain" @click="goRegister">注册完成</van-button>
    <van-button class="sub-btn" type="danger" v-else @click="$router.push('/')">上一步</van-button>
  </div>
  <div class="other-box" v-else>
    <registerHeader></registerHeader>
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive" />
  </div>
</template>

<script>
  import registerHeader from "@/components/registerHeader";
  import {Notify, Toast} from "vant";
  import {getCode} from "@/api/code";
  import {registerBoss} from "@/api/register";
  import {mapGetters} from "vuex";

  export default {
    components: {
      registerHeader
    },
    data() {
      return {
        nameValue: "",
        pwdValue: "",
        timer: null,
        count: "",
        getCode: true,
        routers: [],
        newPassWord: "",
        shoNewPassWord: false,
        newPassWordAgain: "",
        shoNewPassWordAgain: false,
        agree: false
      };
    },
    computed: {
      ...mapGetters(["loginType"])
    },
    watch:{
      $route: {
        handler(to, from) {
          if (from.path == "/register/agreement") {
            this.agree = this.$route.query.agree;
            this.nameValue =  this.$route.query.nameValue;
            this.pwdValue =  this.$route.query.pwdValue;
            this.newPassWord =  this.$route.query.newPassWord;
            this.newPassWordAgain =  this.$route.query.newPassWordAgain;
          }
        }
      }
    },
    methods: {
      goAgreement() {
        this.$router.push({
          path: "/register/agreement",
          query: {
            nameValue:this.nameValue,
            pwdValue:this.pwdValue,
            newPassWord:this.newPassWord,
            newPassWordAgain:this.newPassWordAgain
          }
        });
      },
      shoNPW() {
        if (this.shoNewPassWord) {
          this.shoNewPassWord = false;
        } else {
          this.shoNewPassWord = true;
        }
      },
      shoNPWA() {
        if (this.shoNewPassWordAgain) {
          this.shoNewPassWordAgain = false;
        } else {
          this.shoNewPassWordAgain = true;
        }
      },
      goRegister() {
        if(!this.agree){
          Toast.fail("请先阅读并同意《服务协议》!");
          return;
        }
        if(!/^1[3456789]\d{9}$/.test(this.nameValue)){
          Toast.fail("手机号格式错误!");
        }else if(!this.pwdValue){
          Toast.fail("请输入验证码!");
        }else if (this.newPassWord != this.newPassWordAgain) {
          Toast.fail("两次密码不一致!");
        } else if (!this.newPassWord) {
          Toast.fail("密码不能为空!");
        } else if (this.newPassWord.length < 8) {
          Toast.fail("密码最少8位!");
        } else {
          let data = {
            phone: this.nameValue,
            code: this.pwdValue,
            password: this.newPassWord
          };
          registerBoss(data).then(res => {
            this.$router.push({
              path: "/register/addShop",
              query: {
                id: res.data.data,
                phone:this.nameValue,
                password: this.newPassWord
              }
            });
          });
        }
      },
      sendCode(){
        if (/^1[3456789]\d{9}$/.test(this.nameValue)) {
          let data = {
            tenantId: "936701",
            phone: this.nameValue,
            type: 1
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
    overflow-y: auto;
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
        .btn-code{
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
    .tips-area {
      float: left;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .check-icon {
        /deep/ .van-icon__image {
          width: 0.75rem;
          height: 0.75rem;
        }
      }
      .agree-row{
        margin-left: .375rem;
        .tips-text {
          font-family: PingFangSC-Regular;
          font-size: 0.75rem;
          color: #c6ccd9;
        }

        .tips-info {
          font-family: PingFangSC-Regular;
          font-size: 0.75rem;
          color: #ff8900;
        }
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

  .other-box{
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
