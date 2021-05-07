<template>
  <div style="padding-top: 1rem;">
    <!--    <van-field class="radius-5" placeholder="付款码" v-model="payCode"/>-->
    <!--    <div class="top-area">-->
    <!--      <div class="top-body">-->
    <!--        <span class="top-title">订单编号</span>-->
    <!--        <span class="top-info">7384 0283 8754 2275</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="cardAera" :style="{height:cardAreaH}">
      <div class="cardBody">
        <van-card v-for="(item,index) in cashierData.goods" :key="index" class="card-item">
          <div slot="desc">
            <van-row>
              <van-col class="goods-bt" span="21">{{item.name}}</van-col>
              <van-col class="goods-bt goods-text" span="3">{{item.num}}{{item.unit}}</van-col>
            </van-row>
            <van-row>
              <van-col class="goods-bt" span="12">{{item.attributes}}</van-col>
              <van-col class="goods-bt goods-text" span="12">
                <div>￥{{item.newPrice}}</div>
                <div class="old-price">￥{{item.oldPrice}}</div>
              </van-col>
            </van-row>
          </div>

          <div class="footer">
            <van-icon class="arrow" name="arrow"/>
          </div>
        </van-card>
        <div class="card-box">
          <div class="card-row">
            <div class="card-title">商品数量</div>
            <div class="card-number">x{{cashierData.numCount}}</div>
          </div>
          <div class="card-row">
            <div class="card-title">已优惠</div>
            <div class="card-price">-￥{{cashierData.eventOffersCount}}</div>
          </div>
        </div>
        <div class="card-gray" v-if="cashierData.integral&&cashierData.totalGoodsVip>0">
          <div class="card-message">
            <div>现有积分{{cashierData.integral}}分</div>
            <div>可抵扣金额 ¥{{cashierData.deduction}}</div>
          </div>
          <div class="card-check">
            <van-checkbox v-model="useIntegral" shape="square" checked-color="#ff5a00"></van-checkbox>
          </div>
        </div>
        <!--        <van-card class="card-tips" v-if="cashierData.goods&&cashierData.goods.length">-->
        <!--          <div slot="desc">-->
        <!--            <van-row>-->
        <!--              <van-col class="goods-bt" span="21">商品数量</van-col>-->
        <!--              <van-col class="goods-bt goods-text" span="3">{{total}}件</van-col>-->
        <!--            </van-row>-->
        <!--            &lt;!&ndash;<van-row>&ndash;&gt;-->
        <!--            &lt;!&ndash;<van-col class="goods-bt" span="12">已优惠</van-col>&ndash;&gt;-->
        <!--            &lt;!&ndash;<van-col class="goods-bt goods-reduce" span="12">-{{discount}}</van-col>&ndash;&gt;-->
        <!--            &lt;!&ndash;</van-row>&ndash;&gt;-->
        <!--          </div>-->
        <!--        </van-card>-->
      </div>
    </div>

    <van-dialog class="dialog" v-model="dialogShow" :show-confirm-button="false" closeOnClickOverlay @close="gohome">
      <van-icon name="passed"/>
      <div class="dialogText">收银成功</div>
    </van-dialog>
    <van-dialog v-model="wxShow" class="pay-dialog" :show-confirm-button="false">
      <div class="pay-title">
        <van-icon name="arrow-left" class="title-icon" @click="payClose"/>
        <span class="title-text">微信支付</span>
      </div>
      <img :src="img">
      <div class="pay-msg">等待支付完成</div>
    </van-dialog>
    <van-dialog v-model="aliShow" class="pay-dialog" :show-confirm-button="false">
      <div class="pay-title">
        <van-icon name="arrow-left" class="title-icon" @click="payClose"/>
        <span class="title-text">支付宝支付</span>
      </div>
      <img :src="img">
      <div class="pay-msg">等待支付完成</div>
    </van-dialog>
    <businessFooter :btnTitle="'结算('+cashierData.numCount+')'"
                    :eventOffers="useIntegral?cashierData.eventOffers:cashierData.eventOffersCount"
                    :totalGoods="useIntegral?cashierData.totalGoodsVip:cashierData.totalGoods"
                    @on-confirm-click="submit"></businessFooter>
    <van-action-sheet v-model="show">
      <button type="button" class="pay-btn van-action-sheet__item van-hairline--top" :disabled="cantClick"
              @click="checkPay(1)">
        <van-icon name="/static/wechart-pay.png" size="1.5rem" class="pay-icon"></van-icon>
        <span class="pay-text van-action-sheet__name">微信支付</span>
      </button>
      <button type="button" class="pay-btn van-action-sheet__item van-hairline--top" :disabled="cantClick"
              @click="checkPay(2)">
        <van-icon name="/static/ali-pay.png" size="1.5rem" class="pay-icon"></van-icon>
        <span class="pay-text van-action-sheet__name">支付宝支付</span>
      </button>
      <!-- <button type="button" class="pay-btn van-action-sheet__item van-hairline--top" @click="checkPay(3)">
        <van-icon name="/static/apple-pay.png" size="1.5rem" class="pay-icon"></van-icon>
        <span class="pay-text van-action-sheet__name">Apple Pay支付</span>
      </button> -->
    </van-action-sheet>
    <van-action-sheet v-model="showCancel" :actions="cancelAction" @select="selectCancel"/>
  </div>
</template>

<script>
  // import {Toast} from "vant";
  import businessFooter from "@/components/businessFooter";
  import {
    cashIpad,
    getWxPayCode,
    getWxPayStatus,
    getAliPayCode,
    getAliPayStatus
  } from "@/api/cashier";
  import {mapGetters} from "vuex";

  export default {
    components: {
      businessFooter
    },
    computed: {
      ...mapGetters(["cashierData"])
    },
    data() {
      return {
        submitBtnTitle: "待收银",
        dialogShow: false,
        wxShow: false,
        aliShow: false,
        payCode: "",
        cardAreaH: "",
        total: 0,
        discount: 0,
        show: false,
        infoSuccess: "",
        cashVo: {
          amountActuallyPaid: null, //实付价格
          eventOffers: null, //优惠价格
          goods: [],
          member: null,
          num: null,
          paymentMethod: null,
          paymentModel: 1,
          retailer: null,
          status: 1,
          totalGoods: null //总价
        },
        img: null,
        wxInterval: null,
        aliInterval: null,
        cantClick: false,
        useIntegral: false,
        showCancel: false,
        cancelAction: [{name: '更换支付方式', key: 1}, {name: '取消支付', color: '#FE5845', key: 2}]
      };
    },
    created() {
      for (let i in this.cashierData.goods) {
        this.total += this.cashierData.goods[i].num;
        this.discount +=
          this.cashierData.goods[i].oldPrice - this.cashierData.goods[i].newPrice;
      }
    },
    beforeMount() {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      let top = h * 0.14;
      this.cardAreaH = h - 73 - top + "px";
    },
    methods: {
      selectCancel(item) {
        this.wxShow = false;
        this.aliShow = false;
        clearInterval(this.wxInterval);
        this.wxInterval = null;
        clearInterval(this.aliInterval);
        this.aliInterval = null;
        this.cantClick = false;
        this.showCancel = false;
        if (item.key == 1) {
          this.show = true
        }
      },
      payClose() {
        this.showCancel = true;
      },
      paySuccess() {
        this.showCancel = false;
        this.wxShow = false;
        this.aliShow = false;
        clearInterval(this.wxInterval);
        this.wxInterval = null;
        clearInterval(this.aliInterval);
        this.aliInterval = null;
        this.cantClick = false;
        this.dialogShow = true;
      },
      checkPay(type) {
        this.show = false;
        this.cantClick = true;
        let num = 0;
        for (let i in this.cashierData.goods) {
          this.cashVo.goods[i] = {
            id: this.cashierData.goods[i].id,
            num: this.cashierData.goods[i].num,
            name: this.cashierData.goods[i].name,
            price: this.cashierData.goods[i].newPrice
          };
          num = num + this.cashierData.goods[i].num;
          // console.log(num)
          this.cashVo.num = num;
        }
        this.cashVo.paymentMethod = type;
        this.cashVo.retailer = this.cashierData.retailer;
        this.cashVo.member = this.cashierData.member;

        // console.log(JSON.stringify(this.cashVo))
        cashIpad(this.cashVo).then(cashResult => {
          this.infoSuccess = cashResult.data.data;
          if (type == 1) {
            getWxPayCode({
              orderNum: this.infoSuccess.id,
              orderPrice: this.infoSuccess.amountActuallyPaid
            }).then(res => {
              this.img =
                "data:image/png;base64," +
                btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
              this.wxShow = true;
              this.wxInterval = setInterval(() => {
                getWxPayStatus(this.infoSuccess.id).then(res => {
                  if (res.data.data == "true") {
                    this.paySuccess();

                  }
                });
              }, 1000);
            });
          } else if (type == 2) {
            getAliPayCode({
              orderNum: this.infoSuccess.id,
              orderPrice: this.infoSuccess.amountActuallyPaid
            }).then(res => {
              this.img =
                "data:image/png;base64," +
                btoa(
                  new Uint8Array(res.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
              this.aliShow = true;
              this.aliInterval = setInterval(() => {
                getAliPayStatus(this.infoSuccess.id).then(res => {
                  if (res.data.data == "true") {
                    this.paySuccess();
                  }
                });
              }, 1000);
            });
          }
        });
      },
      submit(sumNumber, originalSumNumber) {
        // if (!this.payCode) {
        //   Toast.fail("请输入付款码!");
        //   return;
        // }
        this.cashVo.amountActuallyPaid = originalSumNumber;
        this.cashVo.eventOffers = sumNumber;
        this.cashVo.totalGoods = sumNumber + originalSumNumber;
        if (this.useIntegral) {
          this.cashVo.paymentModel = 2
        } else {
          this.cashVo.paymentModel = 1
        }
        this.show = true;
      },
      gohome() {
        // this.$store.commit("SET_RELOADCASHIER", true);
        // this.$router.push("/entrance/cashierBase");
        this.infoSuccess.integral = this.cashierData.integral;
        this.infoSuccess.deductionMoney = this.cashierData.deduction;

        this.$router.push({
          path: "/entrance/cashierBase/orderResult",
          query: {
            info: JSON.stringify(this.infoSuccess)
          }
        });
      }
    }
  };
</script>

<style lang='scss' scoped>
  .radius-5 {
    width: 86%;
    padding-left: 2rem;
    margin: 0 auto;
    border-radius: 0.5rem;
  }

  .cardAera {
    overflow-y: auto;
    margin-top: 1.5rem;
    // padding-top: 3rem;
    .cardBody {
      height: 30rem;
      margin: 0 auto;
      width: 86%;

      /deep/ .van-card {
        background: #fff;
      }
    }

    .card-item {
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
      border-radius: 0.375rem;
      margin-bottom: 1rem;

      .goods-bt {
        font-size: 1rem;
        font-family: PingFangSC-Regular;
        color: #222b45;
        text-align: left;
        margin-top: 0.5rem;
      }

      .goods-text {
        text-align: right;

        .old-price {
          color: #999;
          text-decoration: line-through;
          font-size: 0.8rem;
          margin-right: 1px;
        }
      }

    }

    .card-box {
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
      border-radius: 0.375rem;
      margin-bottom: 1rem;
      padding: 1.125rem 1.875rem;
      background: #FFF;

      .card-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .card-title {
          font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #8F9BB3;
        }

        .card-number {
          font-family: PingFangSC-Medium;
          font-size: 1rem;
          color: #222B45;
          letter-spacing: 0;
        }

        .card-price {
          font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #FE5845;
        }
      }
    }

    .card-gray {
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
      border-radius: 0.375rem;
      margin-bottom: 1rem;
      padding: 1.125rem 1.875rem;
      background: #8F9BB3;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .card-message {
        font-family: PingFangSC-Regular;
        font-size: 1rem;
        color: #FFFFFF;
        text-align: left;
      }

      .card-check {
        background: #FFF;
      }
    }

    .card-tips {
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
      border-radius: 1rem;
      margin-bottom: 1rem;
      padding-bottom: 1rem;

      /deep/ .van-card__content {
        min-height: 0;
      }

      .goods-bt {
        font-size: 1rem;
        font-family: PingFangSC-Regular;
        color: #222b45;
        text-align: left;
        margin-top: 0.5rem;
      }

      .goods-text {
        text-align: right;
      }

      .goods-reduce {
        text-align: right;
        color: #ff8900;
      }
    }
  }

  .arrow {
    position: absolute;
    right: 0.1rem;
    top: 50%;
  }

  .dialog {
    width: 14rem;
    height: 16rem;

    .dialogText {
      margin-top: 2rem;
      font-size: 1.4rem;
    }

    /deep/ .van-icon-passed {
      font-size: 6rem;
      color: #ff891c;
      margin-top: 3rem;
    }
  }

  .pay-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    .pay-icon {
    }

    .pay-text {
      font-family: PingFangSC-Regular;
      font-size: 0.875rem;
      color: #222b45;
      margin-left: 1rem;
    }
  }

  .top-area {
    background: #ffffff;
    border-radius: 0.375rem;
    width: 86%;
    margin: 0 auto;

    .top-body {
      padding: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .top-title {
        font-family: PingFangSC-Semibold;
        font-size: 1rem;
        color: #222b45;
      }

      .top-info {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
      }
    }
  }

  .pay-dialog {
    width: 17.5rem;

    .pay-title {
      height: 3.125rem;
      border-bottom: .0625rem solid rgba(143, 155, 179, 0.20);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      .title-icon {
        margin-left: .75rem;
      }

      .title-text {
        font-family: PingFangSC-Semibold;
        font-size: 1rem;
        color: #222B45;
        letter-spacing: .08125rem;
        flex: 1;
        margin-left: -.75rem;
      }
    }

    .pay-msg {
      height: 3.125rem;
      background: #F6F7F9;
      font-family: PingFangSC-Semibold;
      font-size: 1rem;
      color: #CBCED5;
      letter-spacing: .08125rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }
</style>
