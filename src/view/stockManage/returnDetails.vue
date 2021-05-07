<template>
  <div class="o-box">
    <div class="o-details">
      <!-- 商品信息 -->
      <div class="goodsMsg">
        <span class="o-title">商品信息：</span>
        <div class="o-goods" v-for="(item,index) in goodsMsgsList" :key="index">
          <div class="goods-item">
            <img :src="item.goodsItem.img?item.goodsItem.img:'/static/no-img-cn.png'" alt="">
            <div class="g-Msg">
              <span class="g-title">{{item.goodsItem.name}}</span>
              <div class="line-2">
                <span>{{item.goodsItem.attributes}}</span>
                <span class="return-qu">{{item.goodsItem.quantity}}{{item.goodsItem.unit}}</span>
              </div>
              <div class="price-text">
                <span class="new-price">￥ {{item.goodsItem.newPrice}}</span>
                <span class="old-price">￥ {{item.goodsItem.oldPrice}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="orderMsg">
        <span class="o-title shadow-row">订单信息：</span>
        <div class="o-message">
          <div class="msg-bottom">


            <div class="shadow-row" v-if="details.paymentModel == 2">
              <span>使用<span style="color: #FE5845;opacity:1">{{details.integral}}</span>积分抵扣</span>
              <span class="pay">￥{{details.deductionMoney}}</span>
            </div>
            <div class="shadow-row" v-if="details.paymentModel == 2">
              <span>实付金额：</span>
              <span class="pay">￥{{details.amountActuallyPaid}}</span>
            </div>
            <div class="shadow-row">
              <span>退单编号：</span>
              <span>{{details.id}}</span>
            </div>
            <div class="shadow-row">
              <span>支付方式：</span>
              <span>{{details.paymentName}}</span>
            </div>

            <div class="shadow-row">
              <span>付款时间：</span>
              <span>{{details.payTime}}</span>
            </div>
            <div class="shadow-row">
              <span>商品合计：</span>
              <span>￥{{this.totalPrice}}</span>
            </div>
            <div class="shadow-row">
              <span>活动优惠：</span>
              <span>￥{{this.discount}}</span>
            </div>
            <div class="shadow-row">
              <span>零售员：</span>
              <span>{{details.createName}}</span>
            </div>
            <div class="shadow-row">
              <span>收银员：</span>
              <span>{{details.retailerName}}</span>
            </div>
            <div class="shadow-row">
              <span>退款员：</span>
              <span>{{details.createName}}</span>
            </div>
            <div>
              <span>备注：</span>
              <span>{{details.remark}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import goodsList from "@/components/stock/goodsList";
  import {returnedDetails} from '@/api/stock';

  export default {
    components: {
      goodsList
    },
    mounted() {
      this.init();
    },
    data() {
      return {
        checked: "",
        dialogShow: false,
        goodsMsgsList: [],
        details: {}
      };
    },
    methods: {
      // 回到订单管理页面
      gohome() {
        this.$router.replace("/entrance/returnManage");
      },
      init() {
        returnedDetails(this.$route.query.order.id).then(res => {
          this.details = res.data.data;
          console.log(res);
          this.details.goods.forEach(item => {

            let obj = {
              goodsItem: item,
              checked: true
            };
            this.goodsMsgsList.push(obj);
          });
        });
      },
    },
    computed: {
      // 商品合计
      totalPrice() {
        let totalPrice = 0;
        if (this.details && this.details.goods && this.details.goods.length) {
          this.details.goods.forEach(item => {
            totalPrice = Number(totalPrice.add(item.oldPrice.mul(item.quantity)));
          });
          return totalPrice;
        } else {
          return 0
        }

      },
      // 商品优惠
      discount() {
        let discount = 0;
        if (this.details && this.details.goods && this.details.goods.length) {
          this.details.goods.forEach(item => {
            discount = Number(discount.add(Number(item.oldPrice.sub(item.newPrice)).mul(item.quantity)));
          });
          return discount;
        } else {
          return 0;
        }
      },
    }
  };
</script>
<style lang="scss" scoped>
  .o-box {
    height: 100%;
    overflow-y: scroll;

    .shadow-row {
      box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
    }

    .o-details {
      width: 90%;
      margin: 0 auto;

      .goodsMsg {
        margin: 1rem 0;
        background: #fff;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
        border-radius: 1rem;

        .o-title {
          line-height: 2rem;
          padding: 1rem 1.25rem;
          display: flex;
        }

        .o-goods {
          padding-left: 3%;
          display: flex;
          align-items: center;

          .checkbox {
            flex: 2;
          }

          .goods-item {
            flex: 16;
            margin-bottom: 0.2rem;
            padding: 3% 3%;
            margin-left: 0.2rem;
            display: flex;

            img {
              padding: 0;
              width: 6rem;
              height: 6rem;
            }

            .g-Msg {
              width: 100%;
              text-align: left;
              margin-left: .5rem;

              div {
                display: flex;
              }

              .g-title {
                text-overflow: ellipsis;
                display: inline-block;
                text-align: left;
                overflow: hidden;
                font-family: PingFangSC-Regular;
                font-size: 1rem;
                color: #222B45;
              }

              .line-2 {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                span {
                  font-size: 0.875rem;
                  margin-right: 1.5rem;
                  color: #8f9bb3;
                  font-family: PingFangSC-Regular;
                }

                .return-qu {
                  font-family: PingFangSC-Regular;
                  font-size: 0.875rem;
                  color: #4a4a4a;
                  letter-spacing: 0;
                }
              }
              .price-text{
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 1rem;
                .new-price {
                  font-family: PingFangSC-Regular;
                  font-size: .9375rem;
                  color: #222B45;
                }
                .old-price {
                  opacity: 0.5;
                  font-family: PingFangSC-Regular;
                  font-size: .6875rem;
                  color: #8F9BB3;
                }
              }

              div:nth-child(3) {
                span:nth-child(2) {
                  color: #ccc;
                  margin-left: 1rem;
                  text-decoration: line-through;
                }
              }
            }
          }
        }
      }

      .orderMsg {
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
        border-radius: 1rem;
        background: #fff;

        .o-title {
          display: flex;
          line-height: 2rem;
          padding: 1rem 1.25rem;
        }

        .o-message {
          padding: 0 3%;

          .msg-bottom {
            border-bottom: 2px solid #eee;

            div {
              padding: 0 3%;
              display: flex;
              justify-content: space-between;
              line-height: 3rem;

              span {
                color: #222b45;
                opacity: 0.5;
                font-family: PingFangSC-Regular;
                font-size: .875rem;
              }

              .pay {
                font-family: PingFangSC-Semibold;
                font-size: .875rem;
                color: #222B45;
                text-align: right;
                opacity: 1;
              }
            }
          }
        }
      }

      .submit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        height: 2.75rem;
        border-radius: 1.325rem;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
        position: relative;
        top: 1rem;
        margin-bottom: 1rem;

        .total-g {
          font-size: 0.875rem;
          margin-left: 5%;
          color: #8f9bb3;
        }

        .total-pay {
          font-size: 0.875rem;
          margin-left: 5%;
          color: #8f9bb3;

          .v-btn {
            background: #FF8900;
            border-radius: 0 1.325rem 1.325rem 0;
          }
        }
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
