<template>
  <div class="base-box">
    <van-card class="card-item">
      <div slot="desc">
        <div class="card-item-title">订单信息</div>
        <van-row class="card-row">
          <van-col class="font-title" span="12">订单编号</van-col>
          <van-col class="font-h" span="12">{{detailInfo.id}}</van-col>
        </van-row>
        <van-row class="card-row">
          <van-col class="font-title" span="12">下单时间</van-col>
          <van-col class="font-h" span="12">{{detailInfo.createTime}}</van-col>
        </van-row>
        <van-row class="card-row">
          <van-col class="font-title" span="12">支付方式</van-col>
          <van-col class="font-h" span="12">{{detailInfo.uiPayMethod}}</van-col>
        </van-row>
        <van-row class="card-row">
          <van-col class="font-title" span="12">支付时间</van-col>
          <van-col class="font-h" span="12">{{detailInfo.payTime}}</van-col>
        </van-row>
        <van-row class="card-row">
          <van-col class="font-title" span="12">操作人员</van-col>
          <van-col class="font-h" span="12">{{detailInfo.createName}}</van-col>
        </van-row>
        <van-row class="card-row">
          <van-col class="font-title" span="12">零售人员</van-col>
          <van-col class="font-h" span="12">{{detailInfo.retailerName}}</van-col>
        </van-row>
      </div>
    </van-card>
    <van-card class="card-item">
      <div slot="desc">
        <div class="card-item-title">购买商品</div>
        <van-row class="card-row card-row-noShadow">
          <van-col class="name-title" span="8">商品名称</van-col>
          <van-col class="name-title" span="8">单位</van-col>
          <van-col class="name-title" span="8">金额</van-col>
        </van-row>
        <van-row class="card-row-shop card-row" v-for="(item,index) in detailInfo.cashDetail" :key="index">
          <van-col class="font-title text-center" span="8">{{item.good.name}}</van-col>
          <van-col class="font-title text-center" span="8">{{item.num}}{{item.good.unit}}</van-col>
          <van-col class="font-h text-center" span="8">¥ {{item.good.newPrice}}</van-col>
        </van-row>
      </div>
    </van-card>
  </div>
</template>

<script>
// import {Dialog} from "vant";
import { orderDetail } from "@/api/store";

export default {
  components: {},
  computed: {},
  data() {
    return {
      detailInfo: {
        id: "1215160310127882241",
        createTime: "2020-02-25 14:36:09",
        retailer: "1",
        retailerName: "",
        createName: "史凯鹏",
        goods: [],
        totalGoods: 1800,
        eventOffers: 800,
        paymentMethod: 1,
        paymentName: "微信支付",
        amountActuallyPaid: 1000,
        num: 2,
        shopId: "1001",
        cashDetail: [
          {
            id: "1215160310358568961",
            goodsId: "1",
            num: 2,
            cashId: 1215160310127882200,
            shopId: "1001",
            goods: [],
            good: {},
            retailer: "",
            price: -1,
            name: ""
          }
        ],
        payTime: "",
        dateTime: "",
        memberId: "1",
        memberType: "",
        paymentModel: 1,
        uiPayMethod:'',
        member: {
          name: "",
          membersCode: "",
          phone: "",
          pic: "",
          memberType: "",
          memberTypeName: ""
        }
      }
    };
  },
  created() {
    this.getOrderDetail();
  },

  methods: {
    getOrderDetail() {
      orderDetail(this.$route.query.id).then(res => {
        if (res.status == 200) {
          this.detailInfo = res.data.data;
          if(res.data.data.paymentMethod == 1) {
            this.detailInfo.uiPayMethod = '微信支付'
          } else if(res.data.data.paymentMethod == 2) {
            this.detailInfo.uiPayMethod = '支付宝支付'
          } else {
            this.detailInfo.uiPayMethod = '苹果支付'
          }
        }

      });
    }
  }
};
</script>

<style lang='scss' scoped>
.base-box {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .card-item {
    width: 89.3%;
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    margin: 1rem auto 1rem;
    .card-item-title {
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #222b45;
      letter-spacing: 0;
      line-height: 1.125rem;
      text-align: left;
      margin-bottom: 0.75rem;
    }

    /deep/ .van-card {
      background: #fff;
      padding: 0;
    }

    .big-icon {
      font-size: 1.5rem;
    }

    .big-price {
      font-family: PingFangSC-Semibold;
      font-size: 1.875rem;
      color: #222b45;
    }

    .big-message {
      opacity: 0.5;
      font-family: PingFangSC-Light;
      font-size: 0.875rem;
      color: #222b45;
    }

    .card-row {
      height: 2.75rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      box-shadow: 0 1px 0 0 rgba(143,155,179,0.05);
      .name-title {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        line-height: 0.875rem;
        text-align: center;
      }

      .font-title {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        letter-spacing: 0;
        text-align: left;
        opacity: 0.5;
      }

      .font-h {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        text-align: right;
      }
      .text-center{
        text-align: center;

      }

      .font-left {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        text-align: left;
      }

      .font-center {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
      }

      .font-right {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        text-align: right;
      }

      .font-name {
        opacity: 0.5;
        font-family: PingFangSC-Light;
        font-size: 0.875rem;
        color: #222b45;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .font-unit {
        opacity: 0.5;
        font-family: PingFangSC-Light;
        font-size: 0.875rem;
        color: #222b45;
      }

      .font-price {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        text-align: right;
      }
    }
    .card-row-shop{
      min-height: 2.75rem;
      height: auto;
      padding: .5rem 0;
    }
    .card-row-shop:last-child,.card-row-noShadow {
      box-shadow: 0 0px 0 0 rgba(143,155,179,0.05);
    }
    .shadow-row {
      border-bottom: 1px solid rgba(143, 155, 179, 0.1);
      border-top: 1px solid rgba(143, 155, 179, 0.1);
    }

    /deep/ .van-card__content {
      min-height: 0;
      padding: 0.5rem 0;
    }
  }
}
</style>
