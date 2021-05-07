<template>
  <div class="login">
    <loginHeader></loginHeader>
    <div class="login-text">验证账号</div>
    <div class="input-all">
      <img class="left-icon" src="../assets/login/phone_icon.png" alt srcset />
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
      <img class="left-icon" src="../assets/login/code.png" alt srcset />
      <van-field
        class="input-box"
        v-model="loginInfo.code"
        placeholder="验证码"
        :border="false"
        @input="onCodeChange"
      />
      <div class="get-code" @click="getCodeEv" v-if="getCode">获取验证码</div>
      <div class="has-get-code" v-else>{{count}}秒后重发</div>
    </div>
    <!-- <div v-if="noContinue" class="no-continue">输入验证码</div> -->
    <div class="continue" @click="navToPage">下一步</div>
  </div>
</template>

<script>
import loginHeader from "./loginHeader";
import { getCode, idenCode } from "@/api/meeting";
import { Dialog } from "vant";
export default {
  components: {
    loginHeader
  },
  data() {
    return {
      getCode: true,
      count: "",
      timer: null,
      //   noContinue: true,
      loginInfo: {
        phone: "",
        code: "" //验证码
      }
    };
  },

  methods: {
    getCodeEv() {
      let codeType = this.$route.query.type;

      if (/^1[3456789]\d{9}$/.test(this.loginInfo.phone)) {
        let data = {
          tenantId: "679973",
          phone: this.loginInfo.phone,
          type: ""
        };
        if (codeType == 1) {
          //重置
          data.type = 3;
        } else {
          //注册
          data.type = 1;
        }
        console.log(data);

        getCode(data).then(res => {
          console.log(res);
          if (res.status == 200) {
            this.getCode = false;
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.getCode = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
          } else {
            Dialog.alert({
              message: res.data.error_description
            }).then(() => {
              // on close
            });
          }
        });
      } else {
        Dialog.alert({
          title: "提示",
          message: "手机号格式错误"
        }).then(() => {
          // on close
        });
      }
    },
    onPhoneChange(value) {
      //console.log(value);
    },
    navToPage() {
      let data = {};
      if (this.$route.query.type == 1) {
        data = {
          phone: this.loginInfo.phone,
          code: this.loginInfo.code,
          type: 3
        };
      } else {
        data = {
          phone: this.loginInfo.phone,
          code: this.loginInfo.code,
          type: 1
        };
      }
      console.log(data);
      if (data.phone == "" || data.code == "") {
        Dialog.alert({
          title: "提示",
          message: "数据为空"
        }).then(() => {
          // on close
        });
        return;
      }

      idenCode(data).then(res => {
        console.log(res);
        if (res.status == 200)
        {
          //type = 1找回密码 2 = 注册
          if (this.$route.query.type == 1) {
            this.$router.push({
              path: "/setPwd",
              query: {
                phone: this.loginInfo.phone
              }
            });
          }
          else
          {
            this.$router.push({
              path: "/sign",
              query: {
                phone: this.loginInfo.phone
              }
            });
          }


        }
      });
    },
    onCodeChange(value) {
      // console.log(value);
      if (value != "") {
        this.noContinue = false;
      } else {
        this.noContinue = true;
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

    .left-icon {
      height: 2.4rem;
      width: 2.4rem;
      margin-top: 1rem;
    }
    .get-code {
      border: 0.5px solid #141414;
      border-radius: 4px;
      height: 3.0rem;
      line-height: 2.9rem;
      text-align: center;
      width: 7.2rem;
      position: absolute;
      right: 2rem;
      font-family: PingFangSC-Regular;
      font-size: 1.2rem;
      color: #141414;
      letter-spacing: 0;
    }
    .has-get-code {
      opacity: 0.2;
      background: rgba(44, 44, 57, 0.2);
      border: 0 solid rgba(20, 20, 20, 0.4);
      border-radius: 4px;
      font-family: PingFangSC-Regular;
      font-size: 1.2rem;
      color: #141414;
      letter-spacing: 0;
      /*height: 2.1rem;*/
      /*line-height: 2.1rem;*/

      height: 3.0rem;
      line-height: 2.9rem;

      text-align: center;
      width: 7.2rem;
      position: absolute;
      right: 2rem;
    }
  }
  .no-continue {
    opacity: 0.3;
    background: rgba(44, 44, 57, 0.2);
    border-radius: 6px;
    font-family: PingFangSC-Semibold;
    font-size: 1.6rem;
    color: #141414;
    letter-spacing: 0;
    text-align: center;
    width: 91.5%;
    height: 4.8rem;
    line-height: 4.8rem;
    margin: 2.2rem auto 0;
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
    margin-top: 40px;
  }
}
</style>
