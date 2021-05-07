<template>
  <!-- <van-submit-bar text-align="left"  button-type="warning" :price="3050" button-text="提交订单" @submit="onSubmit" /> -->
  <van-row class="footer-box">
    <van-col span="1"></van-col>
    <van-col class="price" span="7">
      <div class="originalPrice">已优惠<span class="originalPriceNumber">￥{{eventOffers||originalSumNumber}}</span></div>
    </van-col>
    <van-col class="price" span="8">
      <div class="sumText">合计：<span class="discountPrice">￥{{totalGoods||sumNumber}}</span></div>
    </van-col>
    <van-col class="sub-btn" span="9">
      <van-button class="realBtn" @click="$emit('on-confirm-click',originalSumNumber,sumNumber)">{{btnTitle}}</van-button>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: "businessFooter",
  props: {
    btnTitle: {
      type: String
    },
    goods: {
      type: Array
    },
    totalGoods: {
      type: Number
    },
    eventOffers: {
      type: Number
    },
  },
  data() {
    return {
      sumNumber: 0,
      originalSumNumber: 0
    };
  },
  methods: {},
  watch: {
    goods: {
      handler() {
        this.sumNumber = 0;
        this.originalSumNumber = 0;
        let sum = Number(this.sumNumber);
        let originalSum =  Number(this.originalSumNumber);
        for (let i in this.goods) {
          sum = Number(sum.add(this.goods[i].newPrice.mul(this.goods[i].num)));
          originalSum = Number(originalSum.add(this.goods[i].num.mul(this.goods[i].oldPrice.sub(this.goods[i].newPrice))));
        }
        this.sumNumber = sum;
        this.originalSumNumber = originalSum;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.footer-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  bottom: 1rem;
  width: 86%;
  height: 44px;
  left: 50%;
  margin-left: -43%;
  border-radius: 3rem;
  background: #ffffff;
  border: 1px solid rgba(34, 43, 69, 0.1);
  .price {
    .originalPrice {
      font-family: PingFangSC-Regular;
      font-size: 0.75rem;
      color: #8f9bb3;
      text-align: center;
    }
    .originalPriceNumber {
      font-family: PingFangSC-Regular;
      font-size: 0.75rem;
      color: #ff8a04;
      text-align: center;
    }
    .sumText {
      font-family: PingFangSC-Regular;
      font-size: 0.75rem;
      color: #8f9bb3;
      text-align: center;
    }
    .discountPrice {
      font-family: PingFangSC-Semibold;
      font-size: 1rem;
      color: #100000;
      text-align: center;
    }
  }
  .sub-btn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .realBtn {
    border-radius: 0 3rem 3rem 0;
    font-family: PingFangSC-Semibold;
    font-size: 0.875rem;
    color: #ffffff;
    margin-right: -1px;
    background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
  }
}
</style>
