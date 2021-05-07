<template>
  <div class="baseBody">
    <div class="cardArea">
      <div class="card-body">
        <van-card class="card-item">
          <div slot="desc">
            <van-icon class="big-icon" name="/static/order-icon.png"/>
            <div class="big-price">+{{detailInfo.amountActuallyPaid}}</div>
            <div class="big-message">订单金额</div>
            <van-row class="card-row">
              <van-col class="font-title" span="12">订单编号</van-col>
              <van-col class="font-h" span="12">{{detailInfo.id}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">生成日期</van-col>
              <van-col class="font-h" span="12">{{detailInfo.createTime}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">商品总数</van-col>
              <van-col class="font-h" span="12">{{detailInfo.num}}件</van-col>
            </van-row>
            <div class="shadow-row">
              <van-row class="card-row">
                <van-col class="font-left" span="8">商品名称</van-col>
                <van-col class="font-center" span="8">单位</van-col>
                <van-col class="font-right" span="8">金额</van-col>
              </van-row>
              <van-row class="card-row" v-for="(item,index) in detailInfo.cashDetail" :key="index">
                <van-col class="font-name" span="8">{{item.good.name}}</van-col>
                <van-col class="font-unit" span="8">{{item.num}}{{item.good.unit}}</van-col>
                <van-col class="font-price" span="8">¥ {{item.num.mul(item.price)}}</van-col>
              </van-row>
            </div>
            <van-row class="card-row">
              <van-col class="font-title" span="12">支付方式</van-col>
              <van-col class="font-h" span="12">{{detailInfo.paymentName}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">销售店员</van-col>
              <van-col class="font-h" span="12">{{detailInfo.retailerName}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">收银员</van-col>
              <van-col class="font-h" span="12">{{detailInfo.createName}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">总计</van-col>
              <van-col class="font-h" span="12">¥{{detailInfo.totalGoods}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">优惠</van-col>
              <van-col class="font-h" span="12">-¥{{detailInfo.eventOffers}}</van-col>
            </van-row>
            <van-row class="card-row" v-if="detailInfo.paymentModel == 2">
              <van-col class="font-title" span="12">
                <span class="integral-text">使用</span><span class="integral-number">{{detailInfo.integral}}</span><span class="integral-text">积分抵扣</span>
              </van-col>
              <van-col class="font-h" span="12">¥{{detailInfo.deductionMoney}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-big" span="24">¥{{detailInfo.amountActuallyPaid}}</van-col>
            </van-row>
          </div>
        </van-card>
        <van-card class="card-item" v-if="detailInfo.member.memberTypeName">
          <div slot="desc">
<!--            <van-row class="card-row">-->
<!--              <van-col class="font-title" span="12">会员/散客</van-col>-->
<!--              <van-col class="font-h" span="12">{{detailInfo.member.memberTypeName}}</van-col>-->
<!--            </van-row>-->
            <van-row class="card-row">
              <van-col class="font-title" span="12">会员名称</van-col>
              <van-col class="font-h" span="12">{{detailInfo.member.name}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">会员编号</van-col>
              <van-col class="font-h" span="12">{{detailInfo.member.membersCode}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">联系方式</van-col>
              <van-col class="font-h" span="12">{{detailInfo.member.phone}}</van-col>
            </van-row>
          </div>
        </van-card>
      </div>
    </div>
  </div>

</template>

<script>
  // import {Dialog} from "vant";
  import {orderDetail} from "@/api/store";

  export default {
    components: {},
    computed: {},
    data() {
      return {
        detailInfo:{
          member:{}
        }
      };
    },
    created() {
      this.getOrderDetail()
    },

    methods: {
      getOrderDetail(){
        orderDetail(this.$route.query.id).then(res =>{
          if(res.status == 200){
            this.detailInfo = res.data.data;
          }
        })
      }
    },
  };
</script>

<style lang='scss' scoped>

  .baseBody {
    height: 100%;
    overflow-y: auto;
    .cardArea {


      .card-body {
        width: 92%;
        margin: .5rem auto 0;

        /deep/ .van-card {
          background: #fff;
        }

        .card-item {
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
          border-radius: .3rem;
          margin-bottom: 1rem;

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
            color: #222B45;
          }

          .big-message {
            opacity: 0.5;
            font-family: PingFangSC-Light;
            font-size: .875rem;
            color: #222B45;
          }

          .card-row {
            height: 2.75rem;
            display: flex;
            flex-direction: row;
            align-items: center;

            .font-title {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
              letter-spacing: 0;
              text-align: left;
              opacity: 0.5;
              .integral-text{
                font-family: PingFangSC-Regular;
                font-size: .875rem;
                color: #222B45;
              }
              .integral-number{
                font-family: PingFangSC-Regular;
                font-size: .875rem;
                color: red;
              }
            }

            .font-h {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
              text-align: right;
            }

            .font-left {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
              text-align: left;
            }

            .font-center {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
            }

            .font-right {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
              text-align: right;
            }

            .font-name {
              opacity: 0.5;
              font-family: PingFangSC-Light;
              font-size: .875rem;
              color: #222B45;
              text-align: left;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap
            }

            .font-unit {
              opacity: 0.5;
              font-family: PingFangSC-Light;
              font-size: .875rem;
              color: #222B45;
            }

            .font-price {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
              text-align: right;
            }
            .font-big{
              font-family: PingFangSC-Regular;
              font-size: 1.5rem;
              color: #222B45;
              text-align: right;
            }
          }

          .shadow-row {
            border-bottom: 1px solid rgba(143, 155, 179, 0.10);
            border-top: 1px solid rgba(143, 155, 179, 0.10);
          }

          /deep/ .van-card__content {
            min-height: 0;
            padding: .5rem 0;
          }
        }
      }
    }
  }

</style>
