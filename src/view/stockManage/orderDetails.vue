<template>
  <div class="o-box">
    <div class="o-details">
      <!-- 商品信息 -->
      <div class="goodsMsg">
        <span class="o-title">商品信息：</span>
        <div class="o-goods" v-for="(item,index) in goodsMsgsList" :key="index">
<!--          <van-checkbox class="checkbox" @click="setCheck(item)" v-model="item.checked"-->
<!--                        checked-color="#f59b60">-->
<!--          </van-checkbox>-->
          <div class="goods-item">
<!--            <img :src="item.goodsItem.good.img?item.goodsItem.good.img:'/static/no-img-cn.png'" alt="">-->
<!--            <div class="g-Msg">-->
<!--              <div class="g-title">{{item.goodsItem.good.name}}</div>-->
<!--              <div class="line-2">-->
<!--                <span>{{item.goodsItem.good.attributes}}</span>-->
<!--              </div>-->
<!--              <div class="good-row">-->
<!--                <div class="price-text">-->
<!--                  <div class="new-price">￥{{item.goodsItem.price}}</div>-->
<!--                  <div class="old-price">￥{{item.goodsItem.good.oldPrice}}</div>-->
<!--                </div>-->
<!--&lt;!&ndash;                <van-stepper min=1 :max="item.goodsItem.num" class="stepper" v-model="item.goodsItem.returnNum"&ndash;&gt;-->
<!--&lt;!&ndash;                             @change="stepperChange" disable-input/>&ndash;&gt;-->
<!--              </div>-->
<!--            </div>-->

            <img :src="item.goodsItem.good.img?item.goodsItem.good.img:'/static/no-img-cn.png'" alt="">
            <div class="g-Msg">
              <span class="g-title">{{item.goodsItem.good.name}}</span>
              <div class="line-2">
                <span>{{item.goodsItem.good.attributes}}</span>
                <span class="return-qu">{{item.goodsItem.num}}{{item.goodsItem.good.unit}}</span>
              </div>
              <div class="price-text">
                <span class="new-price">￥ {{item.goodsItem.price}}</span>
                <span class="old-price">￥ {{item.goodsItem.good.oldPrice}}</span>
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
            <div class="shadow-row">
              <span>商品合计：</span>
              <span>￥{{details.totalGoods}}</span>
            </div>
            <div class="shadow-row">
              <span>活动优惠：</span>
              <span>-￥{{details.eventOffers}}</span>
            </div>
            <div class="shadow-row">
              <span>订单编号：</span>
              <span>{{details.id}}</span>
            </div>
            <div class="shadow-row">
              <span>支付方式：</span>
              <span>{{details.paymentName}}</span>
            </div>
            <div class="shadow-row">
              <span>实付金额：</span>
              <span class="pay">￥{{details.amountActuallyPaid}}</span>
            </div>
            <div class="shadow-row" v-if="details.paymentModel == 2">
              <span>使用<span style="color: #FE5845;opacity:1">{{details.integral}}</span>积分抵扣</span>
              <span class="pay">￥{{details.deductionMoney}}</span>
            </div>
            <div>
              <span>付款时间：</span>
              <span>{{details.payTime}}</span>
            </div>
            <div>
              <span>零售员：</span>
              <span>{{details.retailerName}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 退款按钮 -->
      <div class="submit">
        <div class="total-g">
          <span>共计</span>
          <span style="color:#FF8900">{{this.totalGoods}}件</span>
        </div>
        <div class="total-pay">
          <span>合计：</span>
          <span style="color:#FF8900;font-size:1rem">￥{{details.amountActuallyPaid}}</span>
          <van-button class="v-btn" @click="report" type="warning" :disabled="cantClick">确认退款</van-button>
        </div>
      </div>
      <van-dialog class="dialog" v-model="dialogShow" :show-confirm-button=false closeOnClickOverlay @close="gohome">
        <van-icon name="passed"/>
        <div class="dialogText">{{message}}</div>
      </van-dialog>
    </div>
  </div>
</template>
<script>
  import goodsList from "@/components/stock/goodsList";
  import {Toast} from "vant";
  import {refund} from '@/api/stock';
  import {orderDetail} from '@/api/store';
  import {mapGetters} from "vuex";

  export default {
    components: {
      goodsList
    },
    mounted() {
      this.init();
    },
    data() {
      return {
        qwe: 33,
        checked: "",
        dialogShow: false,
        goodsMsgsList: [],
        details: {},
        submitMsg: {},
        message:"退款成功",
        cantClick:false
      };
    },
    methods: {
      setCheck(item) {
        item.checked = !item.checked;
        this.makeSubMsg()
      },
      // 确认退款
      report() {
        if (this.submitMsg.goods[0]) {
          this.cantClick = true;
          this.submitMsg.goods.forEach(element => {
            element.stock = element.quantity;
          });
          this.submitMsg.amountActuallyPaid = this.details.amountActuallyPaid;
          refund(this.submitMsg)
            .then(res => {
              // this.$store.commit("RETURN_DETAILS", {});
              if(res.data.data=='true'){
                this.message = "退款成功"
              }else{
                this.message = "退款失败"
              }
              this.dialogShow = true;
            })
        } else {
          Toast.fail("请选择退款商品!");
        }
      },
      // 回到订单管理页面
      gohome() {
        this.$router.replace("/entrance/returnManage");
      },
      init() {
        orderDetail(this.$route.query.order.id).then(res => {
          console.log(res)
          this.details = res.data.data;
          this.details.cashDetail.forEach(item => {
            let obj = {
              goodsItem: item,
              checked: true
            };
            obj.goodsItem.returnNum = obj.goodsItem.num;
            this.goodsMsgsList.push(obj);
          });
          this.makeSubMsg();
        });

      },
      stepperChange() {
        this.makeSubMsg();
      },
      makeSubMsg() {
        this.submitMsg = {};
        if (this.goodsMsgsList && this.goodsMsgsList.length) {
          let arr = [];
          this.goodsMsgsList.forEach(item => {
            if (item.checked == true) {
              arr.push({
                quantity: item.goodsItem.returnNum,
                stock: item.goodsItem.num,
                id: item.goodsItem.good.id,
                newPrice: item.goodsItem.price,
                realPrice: item.goodsItem.good.newPrice
              });
            }
          });
          this.submitMsg = {
            cashId: this.details.id,
            amountActuallyPaid: this.details.amountActuallyPaid,
            paymentMethod: this.details.paymentMethod,
            // memberId: this.userInfo.user_id,
            // memberName: this.userInfo.nick_name,
            totalGoods: this.totalGoods,
            goods: arr
          };
        }
      }
    },
    computed: {
      ...mapGetters(["userInfo"]),
      // 提交商品件数
      totalGoods() {
        if (this.submitMsg && this.submitMsg.goods && this.submitMsg.goods.length) {
          let totalGoods = 0;
          this.submitMsg.goods.forEach(item => {
            totalGoods += Number(item.quantity)
          });
          return totalGoods;
        } else {
          return 0;
        }

      },
      // 退款金额
      totalPay() {
        if (this.submitMsg && this.submitMsg.goods && this.submitMsg.goods.length) {
          let totalPay = 0;
          this.submitMsg.goods.forEach(item => {
            totalPay = Number(totalPay.add(item.newPrice.mul(item.quantity)));
          });
          return totalPay;
        } else {
          return 0;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .o-box {
    height: 100%;
    overflow-y: scroll;

    .shadow-row {
      box-shadow: 0 .0625rem 0 0 rgba(143, 155, 179, 0.05);
    }

    .o-details {
      margin: 0 1.25rem;

      .goodsMsg {
        margin: 1rem 0;
        background: #fff;
        box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
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
            height: 2rem;
          }

          /*.goods-item {*/
          /*  flex: 16;*/
          /*  margin-bottom: 0.2rem;*/
          /*  padding: 3% 3%;*/
          /*  margin-left: 0.2rem;*/
          /*  display: flex;*/
          /*  flex-direction: row;*/
          /*  align-items: center;*/

          /*  img {*/
          /*    padding: 0;*/
          /*    width: 6rem;*/
          /*    height: 6rem;*/
          /*  }*/

          /*  .g-Msg {*/
          /*    width: 100%;*/
          /*    margin: 0.6rem 0 0.6rem 1rem;*/

          /*    div {*/
          /*      display: flex;*/
          /*    }*/

          /*    .g-title {*/
          /*      text-overflow: ellipsis;*/
          /*      text-align: left;*/
          /*      overflow: hidden;*/
          /*      font-family: PingFangSC-Regular;*/
          /*      font-size: 1rem;*/
          /*      color: #222B45;*/
          /*    }*/

          /*    .line-2 {*/
          /*      display: flex;*/
          /*      flex-direction: row;*/
          /*      justify-content: space-between;*/
          /*      align-items: center;*/

          /*      span {*/
          /*        font-size: 0.875rem;*/
          /*        margin-right: 1.5rem;*/
          /*        color: #8f9bb3;*/
          /*        font-family: PingFangSC-Regular;*/
          /*      }*/

          /*      .return-qu {*/
          /*        font-family: PingFangSC-Regular;*/
          /*        font-size: 0.875rem;*/
          /*        color: #4a4a4a;*/
          /*        letter-spacing: 0;*/
          /*      }*/
          /*    }*/

          /*    .good-row {*/
          /*      display: flex;*/
          /*      flex-direction: row;*/
          /*      align-items: center;*/
          /*      justify-content: space-between;*/
          /*    }*/

          /*    .price-text {*/
          /*      display: block;*/

          /*      .new-price {*/
          /*        font-family: PingFangSC-Regular;*/
          /*        font-size: .9375rem;*/
          /*        color: #222B45;*/
          /*      }*/

          /*      .old-price {*/
          /*        opacity: 0.5;*/
          /*        font-family: PingFangSC-Regular;*/
          /*        font-size: .6875rem;*/
          /*        color: #8F9BB3;*/
          /*        text-decoration: line-through*/
          /*      }*/
          /*    }*/

          /*    div:nth-child(3) {*/
          /*      span:nth-child(2) {*/
          /*        color: #ccc;*/
          /*        margin-left: 1rem;*/
          /*        text-decoration: line-through;*/
          /*      }*/
          /*    }*/
          /*  }*/
          /*}*/
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
        box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
        border-radius: 1rem;
        background: #fff;

        .o-title {
          display: flex;
          padding: 1rem 1.25rem;
        }

        .o-message {
          padding: 0 3%;

          .msg-bottom {
            border-bottom: .125rem solid #eee;

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
        box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
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

  /deep/ .van-checkbox__icon {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    height: 1.25rem;
    width: 1.25rem;
    font-size: 1.25rem;
    margin: 0 auto;
    /* line-height: 1em; */
  }
</style>
