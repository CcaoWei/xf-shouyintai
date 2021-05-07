<template>
  <div class="order-detail">
    <div class="detail-bt">
      商品信息：
    </div>
    <van-card v-for="(item,index) in orderDetail.productInfo" :key="index" class="card-box" :title="item.name" :thumb="item.img">

      <div class="product-info" slot="desc">
        <span>{{item.size}} </span><span> {{item.buyNum}}件</span>
      </div>
      <div slot="desc">
        <span>￥{{item.discountPrice}}.00 </span><span class="ori-price"> ￥{{item.originalPrice}}.00</span>
      </div>
    </van-card>
    <div class="detail-bt border-bottom">
      订单信息：
    </div>
    <div class="product-item">
      <span>商品合计：</span>
      <span>{{orderDetail.totalGoods}}</span>
    </div>
    <div class="product-item">
      <span>活动优惠：</span>
      <span>{{orderDetail.eventOffers}}</span>
    </div>
    <div class="product-item">
      <span>退单编号：</span>
      <span>{{orderDetail.orderNumber}}</span>
    </div>
    <div class="product-item">
      <span>订单编号：</span>
      <span class="chargeback-date">{{orderDetail.orderNumber}}</span>
    </div>
    <div class="product-item">
      <span>退单时间：</span>
      <span>{{orderDetail.paymentTime}}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.order-detail {
  background: #fff;
  width: 88%;
  border-radius: 20px;
  margin: -2rem auto 0;
  padding: 2rem 0;
  .detail-bt {
    text-align: left;
    width: 91%;
    margin: 0 auto;
    height: 2rem;
  }
  .border-bottom {
    border-bottom: 1px dashed #e4e4e4;
    height: 3rem;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
  .card-box {
    background-color: #fff;
    .product-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 1rem;
    }
  }
  .product-item {
    width: 91%;
    margin: 0 auto;
    height: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 1rem;
    }
    .chargeback-date {
      color: #ecc339;
    }
  }
}
/deep/ .van-card__content {
  padding-left: 1rem;
  div {
    text-align: left;
  }
}
.ori-price {
  font-size: 0.7rem;
  color: #e4e4e4;
  text-decoration: line-through;
  margin-left: 1rem;
}
</style>

<script>
import { chargebackDetail } from "@/api/priceManage";
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
    // 请求订单详情
    let data = {
      id: this.$route.query.id
    };
    chargebackDetail(data).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.orderDetail = res.data.data;
      }
    });
  },
  methods: {}
};
</script>
