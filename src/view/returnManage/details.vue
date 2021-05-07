<template>
  <div class="baseBody">
    <div class="cardArea">
      <div class="card-body">
        <van-card class="card-item">
          <div slot="desc">
            <van-icon class="big-icon" name="/static/return-icon.png"/>
            <div class="big-price">-{{returnDetails.amountActuallyPaid}}</div>
            <div class="big-message">退单金额</div>
            <van-row class="link-row" @click="orderDetails(returnDetails.cashId)">
              <van-col span="12">
                <div class="link-text">关联订单</div>
              </van-col>
              <van-col span="12">
                <van-icon class="link-icon" name="arrow"/>
              </van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">退单编号</van-col>
              <van-col class="font-h" span="12">{{returnDetails.id}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">生成日期</van-col>
              <van-col class="font-h" span="12">{{returnDetails.createTime}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">退回商品</van-col>
              <van-col class="font-h" span="12">{{this.returnGoodsNum}}件</van-col>
            </van-row>
            <div class="shadow-row">
              <van-row class="card-row">
                <van-col class="font-left" span="8">商品名称</van-col>
                <van-col class="font-center" span="8">单位</van-col>
                <van-col class="font-right" span="8">金额</van-col>
              </van-row>
              <van-row class="card-row specile-item" v-for="(item,index) in returnDetails.goods" :key="index">
                <van-col class="font-name" span="8">{{item.name}}</van-col>
                <van-col class="font-unit" span="8">{{item.quantity}}{{item.unit}}</van-col>
                <van-col class="font-price" span="8">¥ {{item.newPrice}}</van-col>
              </van-row>
              <!-- <van-row class="card-row">
                <van-col class="font-name" span="8">Gucii男卫衣</van-col>
                <van-col class="font-unit" span="8">1件</van-col>
                <van-col class="font-price" span="8">¥ 342.00</van-col>
              </van-row>
              <van-row class="card-row">
                <van-col class="font-name" span="8">Gucii男卫衣</van-col>
                <van-col class="font-unit" span="8">1件</van-col>
                <van-col class="font-price" span="8">¥ 342.00</van-col>
              </van-row> -->
            </div>
            <van-row class="card-row">
              <van-col class="font-title" span="12">退回方式</van-col>
              <van-col class="font-h" span="12">{{returnDetails.uiPaymentMethod}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">处理店员</van-col>
<!--              <van-col class="font-h" span="12">{{returnDetails.retailerName}}</van-col>-->
              <van-col class="font-h" span="12">{{returnDetails.handlerName}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">退款店员</van-col>
              <van-col class="font-h" span="12">{{returnDetails.createName}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">总计</van-col>
              <van-col class="font-h" span="12">¥{{returnDetails.totalGoods}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">曾优惠</van-col>
              <van-col class="font-h" span="12">¥{{returnDetails.eventOffers}}</van-col>
            </van-row>
            <van-row class="card-row" v-if="returnDetails.paymentModel == 2">
              <van-col class="font-title" span="12">
                <span class="integral-text">使用</span><span class="integral-number">{{returnDetails.integral}}</span><span class="integral-text">积分抵扣</span>
              </van-col>
              <van-col class="font-h" span="12">¥{{returnDetails.deductionMoney}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">均减</van-col>
              <van-col class="font-h" span="12">-¥{{returnDetails.averagePrice}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-big" span="24">¥{{returnDetails.amountActuallyPaid}}</van-col>
            </van-row>
            <div class=" shadow-top"></div>
            <van-row class="card-row" v-if="returnDetails.memberId != '0'">
              <van-col class="font-title" span="12">扣除积分</van-col>
              <van-col class="font-h" span="12">-{{returnDetails.integralRecoil}}分</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">备注</van-col>
            </van-row>
            <div class="remark-text"># {{returnDetails.remark}}</div>
          </div>
        </van-card>
      </div>
    </div>
  </div>

</template>

<script>
  // import {Dialog} from "vant";
  // import {getInventoryDetail, fixInventory} from "@/api/inventory";
  import {refundDetails} from '../../api/priceManage'
  export default {
    components: {},
    computed: {
      // 退回商品数
      returnGoodsNum(){
        let num = 0
        this.returnDetails.goods && this.returnDetails.goods.forEach(item=>{
          num += Number(item.quantity);
        })
        return num;
      }
    },
    data() {
      return {
        returnDetails:{}
      };
    },
    beforeMount() {
    },
    methods: {
      orderDetails(id){
        this.$router.push({
          path: "/entrance/orderManage/details",
          query: {
            id: id
          }
        });
      }
    },
    watch: {},
    created() {
      refundDetails({id:this.$route.query.id}).then(res=>{
        console.log(res);
        this.returnDetails = res.data.data;
        switch (this.returnDetails.paymentMethod) {
          case 1:
            this.returnDetails.uiPaymentMethod = "微信"
            break;
          case 2:
            this.returnDetails.uiPaymentMethod = "支付宝"

            break;
          default:
            this.returnDetails.uiPaymentMethod = "苹果"

            break;
        }
      })
    },
  };
</script>

<style lang='scss' scoped>

  .baseBody {
    height: 100%;
    overflow-y: scroll;
    .cardArea {
      // overflow-y: auto;
      // height: 77vh;

      .card-body {
        width: 92%;
        margin: .5rem auto 0;

        /deep/ .van-card {
          background: #fff;
          padding: 8px 0;
        }

        .card-item {
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
          border-radius: .3rem;
          margin-bottom: 1rem;

          /deep/ .van-card {
            background: #fff;
            padding: 0;
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

          .big-icon {
            font-size: 1.5rem;
          }

          .link-row {
            background: #FFC47F;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            margin: 2rem auto;

            .link-text {
              font-family: PingFangSC-Semibold;
              font-size: .875rem;
              color: #FFFFFF;
              text-align: left;
            }

            .link-icon {
              font-size: .875rem;
              color: #FFFFFF;
              text-align: right;
              float: right;
            }
          }

          .card-row {
            height: 2.75rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0 1rem 0.5rem;

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
          .specile-item{
            height: auto;
          }

          .shadow-row {
            border-bottom: 1px solid rgba(143, 155, 179, 0.10);
            border-top: 1px solid rgba(143, 155, 179, 0.10);
          }

          .shadow-top {
            border-top: 1px solid rgba(143, 155, 179, 0.10);
          }

          .remark-text {
            font-family: PingFangSC-Regular;
            font-size: .875rem;
            color: #222B45;
            text-align: left;
            padding-left: 1rem;
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
