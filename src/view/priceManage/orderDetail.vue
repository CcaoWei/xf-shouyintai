<template>
  <div class="base">
    <div class="order-detail">
      <div class="detail-bt">
        商品信息
      </div>
      <van-card v-for="(item,index) in orderDetail.productInfo" :key="index" class="card-box" :title="item.name" :thumb="item.img">

        <div class="product-info" slot="desc">
          <span class="product-size">{{item.size}}肤色/S </span><span class="product-num"> {{item.buyNum}}件</span>
        </div>
        <div class="product-money" slot="desc">
          <span class="product-price">￥{{item.discountPrice}}.00 </span><span class="ori-price"> ￥{{item.originalPrice}}.00</span>
        </div>
      </van-card>
      <div class="detail-bt border-bottom">
        <!--订单信息：-->
      </div>
      <div class="product-item">
        <span class="text">商品总金额：</span>
        <span class="text">￥{{orderDetail.totalGoods}}</span>
      </div>
      <div class="product-item">
        <span class="text">活动优惠：</span>
        <span class="text">{{orderDetail.eventOffers}}</span>
      </div>
      <div class="product-item">
        <span class="text">订单编号：</span>
        <span class="text">{{orderDetail.orderNumber}}</span>
      </div>
      <div class="product-item">
        <span class="text">支付方式：</span>
        <span class="text">{{orderDetail.uiPaymentMethod}}</span>
      </div>
      <div class="product-item">
        <span class="text">实付金额：</span>
        <span class="number">￥{{orderDetail.amountActuallyPaid}}</span>
      </div>
      <div class="product-item">
        <span class="text">付款时间：</span>
        <span class="text">{{orderDetail.paymentTime}}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.base{
  overflow-y: auto;
  .order-detail {
    background: #fff;
    width: 88%;
    border-radius: .8rem;
    margin:   2rem auto 0;
    padding: 1.5rem 0;
    max-height: 33rem;

    .detail-bt {
      text-align: left;
      width: 91%;
      margin: 0 auto 1rem;

      font-family: PingFangSC-Semibold;
      font-size: 1.2rem;
      color: #222B45;
      letter-spacing: 0;
    }
    .border-bottom {
      border-bottom: 1px dashed #e4e4e4;
    }
    .card-box {
      background-color: #fff;
      /deep/ .van-card__title{
        font-family: PingFangSC-Regular;
        font-size: 1rem;
        color: #222B45;
      }
      .product-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: .4rem;
        .product-size{
          font-family: PingFangSC-Regular;
          font-size: .9rem;
          color: #8F9BB3;
        }
        .product-num{
          font-family: PingFangSC-Regular;
          font-size: .9rem;
          color: #4A4A4A;
          letter-spacing: 0;
          text-align: right;
          padding-right: .3rem;
        }
      }
      .product-money{
        margin-top: 1rem;
        .product-price {
          font-family: PingFangSC-Regular;
          font-size: .9rem;
          color: #222B45;
        }
        .ori-price {
          margin-left: 1rem;
          text-decoration: line-through;
          opacity: 0.5;
          font-family: PingFangSC-Regular;
          font-size: .7rem;
          color: #8F9BB3;
        }
      }
    }
    .product-item {
      width: 91%;
      margin: 1rem auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 1rem;
      }
      .text{
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: .9rem;
        color: #222B45;
      }
      .number{
        font-family: PingFangSC-Semibold;
        font-size: .9rem;
        color: #222B45;
        text-align: right;
      }
    }
  }
}
/deep/ .van-card__content {
  padding-left: 1rem;
  div {
    text-align: left;
  }
}
</style>

<script>
import { orderDetail } from "@/api/priceManage";
export default {
  data() {
    return {
      orderDetail: {
        productInfo: [
          {
            balance: "30000", //余额
            originalPrice: "2300300", //原价
            discountPrice: "2300300", //折扣价
            id: "1", //产品id
            parentId: "1", //父亲id
            parentName: "男装", //父亲名字
            buyNum: "20", //购买了几件
            unit: "件", //单位
            name: "GUCCI 古驰 男 卫衣", //名字
            tags: ["GUCCI", "男", "卫衣"], //商品标签
            content:
              "GUCCI 古驰 男 卫衣 2019当季流行款式 条纹时尚 灰色 47288 xs", //商品详细内容
            size: "肤色/M"
          },
          {
            balance: "30000", //余额
            originalPrice: "2300300", //原价
            discountPrice: "2300300", //折扣价
            id: "1", //产品id
            parentId: "1", //父亲id
            parentName: "男装", //父亲名字
            buyNum: "20", //购买了几件
            unit: "件", //单位
            name: "GUCCI 古驰 男 卫衣", //名字
            tags: ["GUCCI", "男", "卫衣"], //商品标签
            content:
              "GUCCI 古驰 男 卫衣 2019当季流行款式 条纹时尚 灰色 47288 xs", //商品详细内容
            size: "肤色/M"
          }
        ],
        totalGoods: "￥188.00", //商品合计
        eventOffers: "-￥8.00", //活动优惠
        orderNumber: "55452265488", //订单编号
        paymentMethod: "1", //支付方式 1微信支付 2支付宝支付。。。 可以显示数字 并告知代表的支付方式就行
        uiPaymentMethod: "微信", //获取到数据处理一下
        amountActuallyPaid: "125.00", //实付金额
        paymentTime: "2019-03-05 21:25:03" //付款时间}
      }
    };
  },
  created() {
    console.log(this.$route.query.id);
    this.getOrderDetail();
  },
  methods: {
    // 请求订单详情
    getOrderDetail() {
      let data = {
        id: this.$route.query.id
      };
      orderDetail(data).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.orderDetail = res.data.data;
        }
      });
    }
  }
};
</script>

