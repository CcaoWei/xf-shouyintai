<template>
  <div class="login">
    <div class="login-top">
      <div class="login-text">
        <span>修改密码</span>
        <div class="down-block"></div>
      </div>
    </div>
    <van-cell-group class="login-form">
      <van-field class="login-input pwd" placeholder="请输新密码" v-model="newPassWord" center clearable
                 :type="shoNewPassWord?'text':'password'">
        <van-icon class="btn-eye" name="eye-o" slot="button" @click="shoNPW"/>
      </van-field>
      <van-field class="login-input pwd" placeholder="确认新密码" v-model="newPassWordAgain" center clearabl
                 :type="shoNewPassWordAgain?'text':'password'">
        <van-icon class="btn-eye" name="eye-o" slot="button" @click="shoNPWA"/>
      </van-field>
    </van-cell-group>
    <van-button class="sub-btn" type="danger" @click="login">确认</van-button>
  </div>
</template>

<script>
  // import {Toast} from "vant";
  import {updateShopownerPwd} from "@/api/shopowner";
  import {Toast} from "vant";
  import {mapGetters} from "vuex";

  export default {
    name: "resetPassWord",
    data() {
      return {
        newPassWord: "",
        shoNewPassWord: false,
        newPassWordAgain: "",
        shoNewPassWordAgain: false,
        phone: null
      };
    },
    computed: {
      ...mapGetters(["userInfo"])
    },
    mounted() {
      this.phone = this.$route.query.phone;
    },
    methods: {
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
      login() {
        if (this.newPassWord != this.newPassWordAgain) {
          Toast.fail("两次密码不一致!");
        } else if (!this.newPassWord) {
          Toast.fail("密码不能为空!");
        }else if (this.newPassWord.length < 8) {
          Toast.fail("密码最少8位!");
        } else {
          if (this.newPassWord == this.newPassWordAgain) {
            let data = {
              id: this.userInfo.user_id,
              password: this.newPassWord
            };
            updateShopownerPwd(data).then(res => {
              if (res.status == 200) {
                Toast.success("修改密码成功!");
                this.$router.push("/entrance/verifi");
              }
            });
          } else {
            Toast.fail("两次密码不一致!");
          }
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

        .btn-eye {
          color: #8F9BB3;
          font-size: 1rem;
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
