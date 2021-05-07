<template>
  <div class="s-box">
    <div class="s-cellList">
      <p class="o-title">{{orderDetails.type === 1? "入库信息" : "出库信息"}}</p>
      <div class="cell-item">
        <span>{{orderDetails.type === 1? "入库原因" : "出库原因"}}</span>
        <div>
          <span class="desc-r">{{orderDetails.reason}}</span>
        </div>
      </div>
      <div class="cell-item">
        <span>{{orderDetails.type === 1? "入库时间" : "出库时间"}}</span>
        <div>
          <span class="desc-r">{{orderDetails.date}}</span>
        </div>
      </div>
      <div class="remarks">
        <div>{{orderDetails.remarks == '' ? "无备注信息" : this.orderDetails.remarks}}</div>
      </div>
    </div>
    <div class="mid-box" v-if="orderDetails.detailType  === 6||orderDetails.detailType  === 7||orderDetails.detailType  === 8">
      <div class="mid-title" v-if="orderDetails.detailType  === 6">订货单信息</div>
      <div class="mid-title" v-else>调拨单信息</div>
      <van-row class="card-row shadow-row">
        <van-col class="font-title" span="6" v-if="orderDetails.detailType  === 6">订货单号</van-col>
        <van-col class="font-title" span="6" v-else>调拨单号</van-col>
        <van-col class="font-h" span="18">{{orderDetails.shopOrderInfoVO.id}}</van-col>
      </van-row>
      <van-row class="card-row shadow-row">
        <van-col class="font-title" span="6" v-if="orderDetails.detailType  === 6">订货单名称</van-col>
        <van-col class="font-title" span="6" v-else>调拨单名称</van-col>
        <van-col class="font-h" span="18">{{orderDetails.shopOrderInfoVO.orderName}}</van-col>
      </van-row>
      <van-row class="card-row shadow-row">
        <van-col class="font-title" span="6" v-if="orderDetails.detailType  === 6">店铺</van-col>
        <van-col class="font-title" span="6" v-if="orderDetails.detailType  === 7">调拨店铺</van-col>
        <van-col class="font-title" span="6" v-else>调入店铺</van-col>
        <van-col class="font-h" span="18">{{orderDetails.shopOrderInfoVO.shopName}}</van-col>
      </van-row>
      <van-row class="card-row shadow-row">
        <van-col class="font-title" span="6">时间</van-col>
        <van-col class="font-h" span="18">{{orderDetails.shopOrderInfoVO.orderCreateTime}}</van-col>
      </van-row>
      <van-row class="card-row shadow-row">
        <van-col class="font-title" span="6">制单人</van-col>
        <van-col class="font-h" span="18">{{orderDetails.shopOrderInfoVO.creator}}</van-col>
      </van-row>
      <van-row class="card-row shadow-row">
        <van-col class="font-title" span="6">备注</van-col>
        <van-col class="font-h" span="18">{{orderDetails.shopOrderInfoVO.comment}}</van-col>
      </van-row>
    </div>

    <div class="goodsTitle">
      <span>商品名称</span>
      <ridetails-goods :goodsMsg="orderDetails.goods" isStock :reason="orderDetails.reason"></ridetails-goods>
    </div>
  </div>
</template>

<script>
import ridetailsGoods from "@/components/ridetailsGoods";
export default {
  props: {
    orderDetails: {
      type: Object
    }
  },
  data() {
    return {
      reason: "",
      date: "2020-01-09",
      remarks: "",
      sTitle: "入库商品",
      message: ""
    };
  },
  // computed: {
  //   totalPrice() {
  //     let num = 0
  //     for (const i in this.orderDetails.goods) {
  //       num += this.orderDetails.goods[i].price * this.orderDetails.goods[i].orderCount
  //     }
  //     return num
  //   }
  // },
  components: {
    ridetailsGoods
  }
};
</script>

<style lang="scss" scoped>
.s-box {
  height: 100% ;
  margin: 0 1.25rem;
  .s-cellList {
    background: #fff;
    margin-bottom: 1rem;
    box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
    border-radius: .375rem;
    .o-title {
      display: flex;
      padding: 0 6%;
      padding-top: 5%;
    }
    .cell-item {
      margin: 0 1.25rem;
      display: flex;
      padding: 5% 0;
      justify-content: space-between;
      border-bottom: .125rem solid #eee;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #222b45;
      .desc-r {
        margin-right: 0.3rem;
      }
    }
    .remarks {
      min-height: 4.375rem;
      margin: 0 .375rem;
      div {
        margin-top: 10px;
        color: #aaa;
        font-size: .875rem;
      }
    }
  }

  .mid-box{
    margin: 1rem 0;
    box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.06);
    border-radius: 0.375rem;
    background: #fff;
    .mid-title {
      display: flex;
      padding: 5% 6%;
      justify-content: space-between;
    }

    .card-row {
      padding-left: 6%;
      height: 2.75rem;
      display: flex;
      flex-direction: row;
      align-items: center;

      .font-title {
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #222B45;
        text-align: left;
      }

      .font-h {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #222B45;
        text-align: right;
        padding-right: 16px;
      }

      .font-zt {
        font-family: PingFangSC-Semibold;
        font-size: .875rem;
        color: #222B45;
        letter-spacing: 0;
        text-align: left;
        margin-left: .5rem;
      }

      .row-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        opacity: 0.3;
        font-size: 0.875rem;
        color: #222b45;
        text-align: right;
        padding-right: 16px;
      }
    }

    .shadow-row {
      box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
      border-bottom: 1px solid rgba(143, 155, 179, 0.05);
    }
  }

  .goodsTitle {
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
    border-radius: .375rem;
    margin-bottom: 1rem;
    span {
      display: flex;
      padding: 5% 6%;
    }
  }
}
</style>
