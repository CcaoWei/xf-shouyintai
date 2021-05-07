<template>
  <div class="base">
    <!-- 店员信息 -->
    <div class="accountMsg">
      <div class="a-icon">
        <img :src="userInfo.avatar" alt="">
      </div>
      <div class="a-role">收银员</div>
      <div class="a-name">{{userInfo.real_name}}</div>
    </div>
    <div class="cardAera">
      <van-card class="ortherMoney card-style">
        <div slot="desc" class="cardItem">
          <div class="cardTitle">今日总收入</div>
          <div class="ortherCardBody">
            <span class="ortherCardNum">{{data.grossNum}}</span>
            <span class="ortherCardUnit">元</span>
            <!--            <span class="cardArrow bg-red" v-if="data.grossNumPercent.indexOf('+')!=-1">{{data.grossNumPercent}}</span>-->
            <!--            <span class="cardArrow bg-green" v-else>{{data.grossNumPercent}}</span>-->
            <img class="arrow-img" src="/static/arrow-flat.png"
                 v-if="data.grossNumPercent.indexOf('+')!=-1 && data.grossNumPercent == '+0%'">
            <img class="arrow-img" src="/static/arrow-up.png"
                 v-if="data.grossNumPercent.indexOf('+')!=-1 && data.grossNumPercent != '+0%'">
            <img class="arrow-img" src="/static/arrow-down.png" v-if="data.grossNumPercent.indexOf('-')!=-1">
            <!-- <span v-if="grossNumPercent.indexOf('↓')!=-1" class="cardArrowDown">{{grossNumPercent}}</span> -->
          </div>
        </div>
      </van-card>
      <van-card class="ortherMoney card-style">
        <div slot="desc" class="cardItem">
          <div class="cardTitle">今日订单总数</div>
          <div class="ortherCardBody">
            <span class="ortherCardNum">{{data.orderNum}}</span>
            <span class="ortherCardUnit">个</span>
            <img class="arrow-img" src="/static/arrow-flat.png"
                 v-if="data.orderNumPercent.indexOf('+')!=-1 && data.orderNumPercent == '+0%'">
            <img class="arrow-img" src="/static/arrow-up.png"
                 v-if="data.orderNumPercent.indexOf('+')!=-1 && data.orderNumPercent != '+0%'">
            <img class="arrow-img" src="/static/arrow-down.png" v-if="data.orderNumPercent.indexOf('-')!=-1">
            <!-- <span v-if="orderNumPercent.indexOf('↓')!=-1" class="cardArrowDown">{{orderNumPercent}}</span> -->
          </div>
        </div>
      </van-card>
      <van-card class="ortherMoney card-style">
        <div slot="desc" class="cardItem">
          <div class="cardTitle">今日退单量</div>
          <div class="ortherCardBody"><span class="ortherCardNum">{{data.returnNum}}</span>
            <span class="ortherCardUnit">件</span>
            <img class="arrow-img" src="/static/arrow-flat.png"
                 v-if="data.returnNumPercent.indexOf('+')!=-1 && data.returnNumPercent == '+0%'">
            <img class="arrow-img" src="/static/arrow-up.png"
                 v-if="data.returnNumPercent.indexOf('+')!=-1 && data.returnNumPercent != '+0%'">
            <img class="arrow-img" src="/static/arrow-down.png" v-if="data.returnNumPercent.indexOf('-')!=-1">
            <!-- <span v-if="returnNumPercent.indexOf('↓')!=-1" class="cardArrowDown">{{returnNumPercent}}</span> -->
          </div>
        </div>
      </van-card>
      <van-card class="ortherMoney card-style">
        <div slot="desc" class="cardItem">
          <div class="cardTitle">今日总库存数</div>
          <div class="ortherCardBody">
            <span class="ortherCardNum">{{data.stock}}</span>
            <span class="ortherCardUnit">件</span>
            <img class="arrow-img" src="/static/arrow-flat.png"
                 v-if="data.stockPercent.indexOf('+')!=-1 && data.stockPercent == '+0%'">
            <img class="arrow-img" src="/static/arrow-up.png"
                 v-if="data.stockPercent.indexOf('+')!=-1 && data.stockPercent != '+0%'">
            <img class="arrow-img" src="/static/arrow-down.png" v-if="data.stockPercent.indexOf('-')!=-1">
            <!-- <span  class="cardArrowDown">{{stockPercent}}</span> -->
          </div>
        </div>
      </van-card>
      <van-card class="ortherMoney card-style">
        <div slot="desc" class="cardItem">
          <div class="cardTitle">今日退单金额</div>
          <div class="ortherCardBody">
            <span class="ortherCardNum">{{data.refundPrice}}</span>
            <span class="ortherCardUnit">元</span>
            <img class="arrow-img" src="/static/arrow-flat.png"
                 v-if="data.refundPricePercent.indexOf('+')!=-1 && data.refundPricePercent == '+0%'">
            <img class="arrow-img" src="/static/arrow-up.png"
                 v-if="data.refundPricePercent.indexOf('+')!=-1 && data.refundPricePercent != '+0%'">
            <img class="arrow-img" src="/static/arrow-down.png" v-if="data.refundPricePercent.indexOf('-')!=-1">
            <!-- <span  class="cardArrowDown">{{stockPercent}}</span> -->
          </div>
        </div>
      </van-card>
      <van-button class="btn" type="default" @click="report">立即日结并退出账号</van-button>
    </div>
    <van-dialog class="dialog" v-model="dialogShow" :show-confirm-button=false closeOnClickOverlay @close="gohome">
      <van-icon name="passed"/>
      <div class="dialogText">日结成功</div>
    </van-dialog>
  </div>

</template>

<script>
  import businessFooter from "@/components/businessFooter";
  import {mapGetters} from "vuex";
  import {
    getDayCashNew,
    dayCloseNew
  } from "@/api/cashier";
  import {Dialog} from "vant";

  export default {
    components: {
      businessFooter
    },
    computed: {
      ...mapGetters(["userInfo"])
    },
    data() {
      return {
        sumbitBtnTitle: "待收银",

        data: {
          grossNum: "0",
          grossNumPercent: "+0%",
          orderNum: "0",
          orderNumPercent: "+0%",
          returnNum: "0",
          returnNumPercent: "+0%",
          stock: "0",
          stockPercent: "+0%",
          refundPrice: "0",
          refundPricePercent: "+0%",
        },
        dialogShow: false
      };
    },
    created() {
      this.onload();
    },
    methods: {
      report() {
        Dialog.confirm({
          title: "提示",
          message: "确定日结吗？"
        })
          .then(() => {
            dayCloseNew().then(res => {
              if (res.data) {
                this.dialogShow = true;
                // this.$store.commit("SET_UNLOCK", 2);
                // this.$router.push("/");
              }
            });
          })
          .catch(() => {
            // on cancel
          });

      },
      onload() {
        getDayCashNew().then(res => {
          if (res.status == 200) {
            this.data = res.data.data;
          }
        });
      },
      gohome() {
        this.$router.push("/");
      }
    }
  };
</script>

<style lang='scss' scoped>
  .base {
    padding-bottom: 1rem;

    .accountMsg {
      background: url("../../assets/images/top_bg.png") left center no-repeat;
      background-size: 100% 12rem;
      width: 100%;
      height: 12rem;
      position: relative;

      .a-icon {
        margin: 0 auto;
        width: 7.5rem;
        height: 7.5rem;

        img {
          border-radius: 100%;
          width: 7.5rem;
          height: 7.5rem;
        }
      }

      .a-role {
        width: 3.75rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 0.8125rem;
        margin: 0 auto;
        position: relative;
        top: -1.3rem;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
      }

      .a-name {
        font-size: 1.2rem;
        color: #fff;
        margin-top: -0.7rem;
      }
    }

    .cardAera {
      width: 89.3%;
      margin: 0 auto;
      // .todayMoney {
      //   background-color: #fff;
      //   .todayCardBody {
      //     display: flex;
      //     align-items: center;
      //     color: #fafafa;
      //     .todayCardNum {
      //       font-size: 1.125rem;
      //       color: #000;
      //       display: inline-block;
      //     }
      //   }
      // }
      .ortherMoney {
        background-color: #ffffff;

        .ortherCardBody {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: #192038;
          text-align: left;
          font-size: 2rem;

          .ortherCardNum {
            margin-right: 0.3rem;
            font-size: 1.125rem;
            display: inline-block;
          }

          .ortherCardUnit {
            display: inline-block;
            font-size: 0.875rem;
            color: #aaa;
          }
        }
      }

      .last {
        margin-bottom: 2rem;
      }

      .card-style {
        margin: 1rem 0 1rem;
        border-radius: 0.375rem;
        box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.06);
        height: 3.625rem;

        .cardItem {
          margin-top: 0.6rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      }

      .cardTitle {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        display: flex;
        color: #8f9bb3;
        align-items: center;
      }

      .cardArrow {
        color: #fff;
        display: inline-block;
        width: auto;
        height: 1.5rem;
        padding: 0 .5rem;
        /*opacity: 0.5;*/
        text-align: center;
        line-height: 1.5rem;
        /*background-image: linear-gradient(90deg, #8f9bb3 0%, #222b45 100%);*/
        border-radius: 1.75rem;
        margin-left: 1.25rem;
        font-size: 0.75rem;
      }

      .bg-red {
        background-color: #FE5845;
      }

      .bg-green {
        background-color: #09BB07;
      }

      .arrow-img {
        width: 1rem;
        height: 1rem;
        margin-left: .375rem;
      }

      .cardArrowDown {
        color: #fff;
        display: inline-block;
        width: 3rem;
        height: 1.5rem;
        opacity: 0.5;
        text-align: center;
        line-height: 1.5rem;
        background-image: linear-gradient(90deg, #8f9bb3 0%, #222b45 100%);
        border-radius: 28px;
        border-radius: 28px;
        margin-left: 1.25rem;
        font-size: 0.75rem;
      }

      .btn {
        width: 100%;
        border-radius: 1.375rem;
        background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
        color: #fff;
        font-size: 1.2rem;
        position: relative;
        top: 1.5rem;
        bottom: 1.5rem;
      }
    }

    .dialog {
      width: 14rem;
      height: 16rem;

      .dialogText {
        margin-top: 2rem;
        font-size: 1.4rem;
      }
    }

    /deep/ .van-icon-passed {
      font-size: 6rem;
      color: #ff891c;
      margin-top: 3rem;
    }
  }
</style>
