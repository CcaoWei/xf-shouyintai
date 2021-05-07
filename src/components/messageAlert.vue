<template>
  <!--
         message:{
             title:"",
             content:"",
             isCancel:""
         }


   -->
  <div class="message-alert-all">
    <div class="alert-box">
      <div class="alert-title">{{message.title}}</div>
      <div class="alert-content">{{message.content}}</div>


      <div class="confirm-cancel" v-if="message.isCancel">
        <div class="cancel" @click="cancle">取消</div>
        <div class="confirm"  @click="confirm">确定</div>
      </div>

      <div class="confirm-only" @click="confirm" v-if="!message.isCancel">确定</div>
    </div>
  </div>
</template>

<script>
  export default {


    name: "messageAlert",
    props: ["message"],
    data() {
      return {};
    },
    created() {},
    methods: {
      cancle(){
        console.log("alertview -> cancel");
        this.$emit("cancle",true);
      },
      confirm(){
        console.log("alertview -> confirm");
        this.$emit("confirm",true);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .message-alert-all {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    .alert-box {
      background: #ffffff;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
      border-radius: 10px;
      width: 30rem;
      height: 17rem;
      position: fixed;
      left: 50%;
      top: 50%;
      box-sizing: border-box;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      z-index: 1000;
      padding: 4rem 2.4rem 2.4rem;
      .alert-title {
        font-family: PingFangSC-Semibold;
        font-size: 2rem;
        color: #222b45;
        text-align: center;
        line-height: 2rem;
      }
      .alert-content {
        font-family: PingFangSC-Regular;
        font-size: 1.4rem;
        color: #8f9bb3;
        text-align: center;
        line-height: 1.4rem;
        margin-top: 0.6rem;
      }
      .confirm-cancel {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 3.6rem;
        margin-top: 3rem;
        .cancel {
          opacity: 0.5;
          background: #ffffff;
          border: 1px solid #8f9bb3;
          border-radius: 18px;
          font-family: PingFangSC-Regular;
          font-size: 1.4rem;
          color: #8f9bb3;
          line-height: 3.6rem;
          text-align: center;
          width: 12rem;
          height: 3.6rem;

        }
        .confirm {
          background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
          border-radius: 18px;
          border-radius: 18px;
          font-family: PingFangSC-Regular;
          font-size: 1.4rem;
          color: #fff;
          line-height: 3.6rem;
          text-align: center;
          width: 12rem;
          height: 3.6rem;
        }
      }
      .confirm-only {
        background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
        border-radius: 18px;
        font-family: PingFangSC-Semibold;
        font-size: 1.4rem;
        color: #ffffff;
        line-height: 1.4rem;
        line-height: 3.6rem;
        text-align: center;
        width: 15.8rem;
        height: 3.6rem;
        margin: 3rem auto 0;
      }
    }
  }
</style>
