<template>
  <div class="baseBody">
    <div class="cardArea">
      <div class="card-body">
        <div class="top-box">
          <div class="top-status">
            <span>订单状态：</span>
            <span class="text-red" v-if="detailInfo.isDeleted == 0&&detailInfo.status == 10">未支付</span>
            <span class="text-green" v-if="detailInfo.isDeleted == 0&&detailInfo.status == 20">已支付</span>
            <span class="text-gray" v-if="detailInfo.isDeleted == 0&&detailInfo.status == 30">已退款</span>
            <span class="text-gray" v-if="detailInfo.isDeleted == 1">已过期</span>
          </div>
          <div class="top-btn" v-if="detailInfo.status != 20&&detailInfo.status != 30" @click="getHistoryStatus">
            <div class="btn-text">更新订单状态</div>
          </div>
        </div>
        <van-card class="card-item">
          <div slot="desc">
            <div class="title">订单信息</div>
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
                <van-col class="font-unit" span="8">{{item.num}}件</van-col>
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
                <span class="integral-text">使用</span><span class="integral-number">{{detailInfo.integral}}</span><span
                class="integral-text">积分抵扣</span>
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
  import {orderDetail} from "@/api/store";
  import {getHistoryStatus} from "@/api/cashier";

  export default {
    components: {},
    computed: {},
    data() {
      return {
        detailInfo: {
          member: {}
        }
      };
    },
    created() {
      this.getOrderDetail()
    },

    methods: {
      getOrderDetail() {
        orderDetail(this.$route.query.id).then(res => {
          if (res.status == 200) {
            this.detailInfo = res.data.data;
          }
        })
      },
      getHistoryStatus() {
        getHistoryStatus(this.$route.query.id).then(res => {
          if (res.data.data == "true") {
            this.getOrderDetail();
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

        .top-box {
          background: #FFFFFF;
          padding: .875rem 1.25rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          .top-status {
            font-family: PingFangSC-Regular;
            font-size: .875rem;
            color: #222B45;
            letter-spacing: 0;
            line-height: .875rem;

            .text-red {
              color: #FE5845;
            }

            .text-green {
              color: #09BB07;
            }

            .text-gray {
              color: #8F9BB3;
            }
          }

          .top-btn {
            border: .0625rem solid rgba(143, 155, 179, 0.50);
            border-radius: .25rem;
            padding: .1875rem .75rem;

            .btn-text {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
              letter-spacing: 0;
              text-align: right;
              line-height: 1.125rem;
            }
          }
        }

        .card-item {
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
          border-radius: .3rem;
          margin-bottom: 1rem;

          /deep/ .van-card {
            background: #fff;
            padding: 0;
          }

          .title {
            font-family: PingFangSC-Semibold;
            font-size: 1.125rem;
            color: #222B45;
            letter-spacing: 0;
            text-align: left;
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

              .integral-text {
                font-family: PingFangSC-Regular;
                font-size: .875rem;
                color: #222B45;
              }

              .integral-number {
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
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap
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

            .font-big {
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
