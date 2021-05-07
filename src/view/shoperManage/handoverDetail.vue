<template>
  <div class="baseBody">
    <div class="detail-title">
      <div class="title-bt">
        {{handoverDetail.uiTime}}
        <span class="time">{{handoverDetail.uiStartTime}}～{{handoverDetail.uiEndTime}}</span>
      </div>
      <div class="title-type">{{handoverDetail.uiType}}</div>
    </div>
    <div class="detail-item">
      <div class="item-left">微信收款</div>
      <div class="item-right">{{handoverDetail.payWx}}元</div>
    </div>
    <div class="detail-item">
      <div class="item-left">支付宝收款</div>
      <div class="item-right">{{handoverDetail.payAlipay}}元</div>
    </div>
<!--    <div class="detail-item">-->
<!--      <div class="item-left">Apple pay</div>-->
<!--      <div class="item-right">{{handoverDetail.payApple}}元</div>-->
<!--    </div>-->
<!--    <div class="detail-item">-->
<!--      <div class="item-left">会员卡收款</div>-->
<!--      <div class="item-right">{{handoverDetail.payCard}}元</div>-->
<!--    </div>-->
    <div class="detail-item">
      <div class="item-left">收款单数</div>
      <div class="item-right">{{handoverDetail.orderNum}}笔</div>
    </div>
    <div class="detail-totle">
      <div class="item-left">总计</div>
      <div class="item-right">{{handoverDetail.total}}元</div>
    </div>
  </div>
</template>

<script>
import { listChangeDetail } from "@/api/store";

export default {
  data() {
    return {
      handoverDetail: {
        id: "1235497543404621825",
        startTime: "2020-03-05 17:29:03",
        endTime: "",
        orderNum: -1,
        name: "曹景涛",
        payHand: -1,
        payCard: -1,
        payAlipay: -1,
        payApple: -1,
        payWx: -1,
        total: -1,
        isChange: 1
      }
    };
  },
  created() {
    listChangeDetail(this.$route.query.id).then(res => {
      console.log(res);
      if (res.status == 200) {
        this.handoverDetail = JSON.parse(JSON.stringify(res.data.data));
        if (this.handoverDetail.startTime) {
          let dateArr = this.handoverDetail.startTime.split(" ");
          let dateMo = dateArr[0].split("-");
          this.handoverDetail.uiTime = `${dateMo[1]}月${dateMo[2]}日`;
          this.handoverDetail.uiStartTime = dateArr[1].substr(0, 5);
        }
        if (this.handoverDetail.endTime) {
          let dateArr = this.handoverDetail.endTime.split(" ");
          this.handoverDetail.uiEndTime = dateArr[1].substr(0, 5);
        } else {
          this.handoverDetail.uiEndTime = "暂无";
        }
        if(this.handoverDetail.isChange && this.handoverDetail.isChange ==2){
            this.handoverDetail.uiType = "已交班"

        }else{
             this.handoverDetail.uiType = "未交班"
        }
        console.log(this.handoverDetail);
      }
    });
  },
  methods: {}
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
}
</style>
