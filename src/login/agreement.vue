<template>
  <div class="login">
    <loginHeader></loginHeader>
    <div class="content" :style="{height:cardAreaH}">
      <img class="agreement-icon" src="../assets/login/agreement_icon.png" alt srcset />
      <div class="agreement-title">欢迎您的使用！</div>
      <div class="agreement-first">这里真清会华名片命克存命济过应号存导真种步少来际值之电新现住整教精人派天把说观再段亲较与型见基平北改知增分因好。</div>
      <div class="agreement-bt">注册成为新用户，即表示您：</div>
      <ul class="agreement-list">
        <li class="agreement-item">接收服务条款和隐私政策。</li>
        <li class="agreement-item">同意我们收集并处理您的个人数据。</li>
        <li class="agreement-item">接收服务条款和隐私政策。</li>
        <li class="agreement-item">同意我们收集并处理您的个人数据。</li>
      </ul>
      <div class="sure-bt">您还确认</div>
      <ul class="agreement-list">
        <li class="agreement-item">接收服务条款和隐私政策。</li>
        <li class="agreement-item">同意我们收集并处理您的个人数据。</li>
        <li class="agreement-item">接收服务条款和隐私政策。</li>
        <li class="agreement-item">一切移动客户端用户在下载并浏览APP手机APP软件时均被视为已经仔细阅读本条款并完全同意。凡以任何方式登陆本APP，或直接间接使用本APP资料者，均被视为自愿接受本网站相关声明和用户服务协议的约束。</li>
      </ul>
    </div>
    <div class="agree-btn">
      <div class="continue" @click="navToSign">我同意</div>
    </div>

  </div>
</template>

<script>
import loginHeader from "./loginHeader";
export default {
  components: {
    loginHeader
  },
  data() {
    return {
      cardAreaH: ""
    };
  },
  created() {
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    // let top = h * 0.14;
    this.cardAreaH = h - 44 - 55 + "px";
  },

  methods: {
    navToSign() {
      this.$store.commit("SET_AGREEMENT", true);
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  background: #fff;
  .content {
    height: 100%;
    padding-top: 3.8rem;
    box-sizing: border-box;
    overflow-y: scroll;
    .agreement-icon {
      display: block;
      height: 5rem;
      width: 5rem;
      margin: 0 auto 3.2rem;
    }
    .agreement-title {
      font-family: PingFangSC-Semibold;
      font-size: 1.8rem;
      color: #141414;
      letter-spacing: 0;
      text-align: center;
      line-height: 1.8rem;
      width: 100%;
      text-align: center;
      margin-bottom: 3.3rem;
    }
    .agreement-first {
      font-family: PingFangSC-Regular;
      font-size: 1.4rem;
      color: #141414;
      letter-spacing: 0;
      text-align: justify;
      line-height: 2rem;
      width: 86.9%;
      margin: 0 auto 3.3rem;
    }
    .agreement-bt {
      font-family: PingFangSC-Medium;
      font-size: 1.5rem;
      color: #141414;
      letter-spacing: 0;
      text-align: justify;
      line-height: 2rem;
      width: 86.9%;
      margin: 0 auto;
    }
    .agreement-list {
      width: 65%;
      margin: 0.7rem auto 0;
      .agreement-item {
        font-family: PingFangSC-Regular;
        font-size: 1.4rem;
        color: #141414;
        letter-spacing: 0;
        text-align: justify;
        line-height: 2.5rem;
        list-style: disc;
      }
    }
    .sure-bt {
      font-family: PingFangSC-Medium;
      font-size: 1.5rem;
      color: #141414;
      letter-spacing: 0;
      text-align: justify;
      line-height: 2rem;
      width: 86.9%;
      margin: 3.1rem auto 0;
    }
  }
  .agree-btn {
    position: fixed;
    bottom: 0.5rem;
    width: 100%;

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
      margin: 0 auto;
    }
  }
}
</style>
