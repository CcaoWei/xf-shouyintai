<template>
  <div class="baseArea">
    <div class="form">
      <div class="form-body">
        <div class="form-title">详情信息</div>
        <van-row class="card-row shadow-row">
          <van-col class="font-title-gray" span="12">名称</van-col>
          <van-col class="font-h" span="12">{{good.name}}</van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title-gray" span="12">条形码</van-col>
          <van-col class="font-h" span="12">{{good.code}}</van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title-gray" span="12">价格</van-col>
          <van-col class="font-h" span="12">{{good.newPrice}}</van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title-gray" span="12">总库存</van-col>
          <van-col class="font-orange" span="12">{{good.stock}}{{good.unit}}</van-col>
        </van-row>
        <!--        <van-row class="card-row shadow-row">-->
        <!--          <van-col class="font-title-gray" span="12">规格</van-col>-->
        <!--          <van-col class="font-h" span="12">{{sizeMsg}}</van-col>-->
        <!--        </van-row>-->
      </div>
    </div>
    <!--    <div class="form">-->
    <!--      <div class="form-body">-->
    <!--        <div class="form-title">规格</div>-->
    <!--        <van-row class="card-row shadow-row" v-for="(item,index) in good.specifications" :key="index">-->
    <!--          <van-col class="font-title-gray" span="12">{{item.size}}</van-col>-->
    <!--          <van-col class="font-h" span="12" v-if="item.stock>0">{{item.stock}}{{good.unit}}</van-col>-->
    <!--          <van-col class="font-red" span="12" v-else>{{item.stock}}{{good.unit}}</van-col>-->
    <!--        </van-row>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
// import {getGoodsByCode} from "@/api/cashier";

export default {
  components: {},
  data() {
    return {
      good: {},
      sizeMsg: ""
    };
  },
  created() {},
  mounted() {
    this.good = this.$route.query.good;
    if (this.good.specifications.length) {
      for (let i in this.good.specifications) {
        this.sizeMsg += this.good.specifications[i].size;
        this.sizeMsg += "；";
      }
    }
  },
  methods: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.baseArea {
  .form {
    margin: 0.5rem auto 0;

    .form-body {
      border-radius: 0.375rem;
      background: #fff;
      margin: 1rem;
      padding: 1rem;

      /deep/ .van-cell {
        padding: 0;
      }

      .form-title {
        font-family: PingFangSC-Semibold;
        font-size: 1.125rem;
        color: #222b45;
        letter-spacing: 0;
        text-align: left;
        margin-bottom: 0.5rem;
      }

      .shadow-row {
        border-bottom: 1px solid rgba(143, 155, 179, 0.05);
      }

      .card-row {
        min-height: 2.75rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        .font-title-gray {
          opacity: 0.5;
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #222b45;
          text-align: left;
        }
        .font-orange {
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #ff8900;
          text-align: right;
        }
        .font-red {
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: red;
          text-align: right;
        }
        .font-h {
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #222b45;
          text-align: right;
        }
      }
    }
  }
}
</style>
