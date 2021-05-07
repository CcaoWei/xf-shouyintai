<template>
  <div class="baseBody">
    <div class="detail-title">
      <div class="title-bt">
        本班收入详情
        <!-- <span class="time">{{handoverDetail.uiStartTime}}～{{handoverDetail.uiEndTime}}</span> -->
      </div>
      <!-- <div class="title-type">{{handoverDetail.uiType}}</div> -->
    </div>
    <div class="detail-item">
      <div class="item-left">收银员</div>
      <div class="item-right">{{handoverDetail.name}}</div>
    </div>
    <div class="detail-item">
      <div class="item-left">接班时间</div>
      <div class="item-right">{{handoverDetail.startTime}}</div>
    </div>
    <div class="detail-item">
      <div class="item-left">交班时间</div>
      <div class="item-right">{{handoverDetail.endTime}}</div>
    </div>
    <div class="detail-item">
      <div class="item-left">收款单数</div>
      <div class="item-right">{{handoverDetail.orderNum}}笔</div>
    </div>
    <div class="detail-item">
      <div class="item-left">微信扫码</div>
      <div class="item-right">{{handoverDetail.payWx}}元</div>
    </div>
    <div class="detail-item">
      <div class="item-left">支付宝扫码</div>
      <div class="item-right">{{handoverDetail.payAlipay}}元</div>
    </div>
<!--    <div class="detail-item">-->
<!--      <div class="item-left">Apple Pay</div>-->
<!--      <div class="item-right">{{handoverDetail.payApple}}元</div>-->
<!--    </div>-->
<!--    <div class="detail-item">-->
<!--      <div class="item-left">会员卡</div>-->
<!--      <div class="item-right">{{handoverDetail.payCard}}元</div>-->
<!--    </div>-->

    <!-- <div class="detail-item">
      <div class="item-left">POS机收款</div>
      <div class="item-right">{{handoverDetail.payApple}}元</div>
    </div>
    <div class="detail-item">
      <div class="item-left">现金收款</div>
      <div class="item-right">{{handoverDetail.payHand}}元</div>
    </div>-->
<!--    <div class="detail-item">-->
<!--      <div class="item-left">会员卡收款</div>-->
<!--      <div class="item-right">{{handoverDetail.payCard}}元</div>-->
<!--    </div>-->


    <div class="detail-totle">
      <div class="item-left">总计</div>
      <div class="item-right">{{handoverDetail.total}}元</div>
    </div>
    <div class="add" v-if="handoverDetail.isChange == 1">
      <button @click="Add">确定交班</button>
    </div>
  </div>
</template>

<script>
import { dutyDetail, dutySure } from "@/api/cashier";
import { Dialog } from "vant";

export default {
  data() {
    return {
      id: "",
      handoverDetail: {}
    };
  },
  created() {},
  mounted() {
    // console.log(this.$route.query.id)
    this.id = this.$route.query.id;
    let data = {
      id: this.id
    };
    console.log(data);

    dutyDetail(data).then(res => {
      console.log(res);
      if (res.data.code == 200) {
        this.handoverDetail = res.data.data;
      }
    });
  },
  methods: {
    Add() {
      let data = {
        id: this.id
      };
      Dialog.confirm({
        title: "交班",
        message: "确认交班？"
      })
        .then(() => {
          // on confirm
          dutySure(data).then(res => {
            console.log(res);
            if (res.status == 200) {
              this.$router.go(-1);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.baseBody {
  min-height: 23.5rem;
  width: 89.3%;
  background: #fff;
  margin: 1.25rem auto 0;
  padding: 0 1.1875rem 0 1.3125rem;
  box-sizing: border-box;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  .detail-title {
    height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .title-bt {
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #222b45;
      letter-spacing: 0;
      line-height: 1.125rem;
      .time {
        font-family: PingFangSC-Regular;
        font-size: 1.125rem;
        color: #100000;
        letter-spacing: 0;
        line-height: 1.125rem;
      }
    }
    .title-type {
      background: #ff8900;
      border-radius: 4px;
      height: 1.5rem;
      width: 3.75rem;
      font-family: PingFangSC-Regular;
      font-size: 0.75rem;
      color: #ffffff;
      letter-spacing: 0;
      text-align: left;
      line-height: 1.5rem;
      text-align: center;
    }
  }
  .detail-item {
    height: 2.625rem;
    margin-bottom: 1px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .item-left {
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 0.875rem;
      color: #222b45;
      line-height: 0.875rem;
    }
    .item-right {
      font-family: PingFangSC-Regular;
      font-size: 0.875rem;
      color: #222b45;
      text-align: right;
      line-height: 0.875rem;
    }
  }
  .detail-totle {
    height: 54px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .item-left {
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 0.875rem;
      color: #222b45;
      line-height: 0.875rem;
    }
    .item-right {
      font-family: PingFangSC-Regular;
      font-size: 1.5rem;
      color: #222b45;
      text-align: right;
      line-height: 1.5rem;
    }
  }
  .add {
    width: 100%;
    text-align: center;
    /* margin-bottom: 1rem; */
    position: fixed;
    bottom: 0;
    height: 4rem;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    left: 50%;
    margin-left: -50%;

    button {
      width: 20.937rem;
      height: 2.75rem;
      background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
      border-radius: 22px;
      border: none;
      color: #fff;
    }
  }
}
</style>
