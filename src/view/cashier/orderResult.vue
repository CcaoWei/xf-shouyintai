<template>
  <div class="baseArea">
    <div class="cardArea">
      <div class="card-body">
        <van-card class="card-item">
          <div slot="desc">
            <van-icon class="big-icon" name="/static/success.png"/>
            <div class="big-price">+{{detailInfo.amountActuallyPaid}}</div>
            <div class="big-message">结算成功</div>
            <div class="title">订单信息</div>
            <van-row class="card-row">
              <van-col class="font-title" span="12">订单编号</van-col>
              <van-col class="font-h" span="12">{{detailInfo.id}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">下单时间</van-col>
              <van-col class="font-h" span="12">{{detailInfo.createTime}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">支付方式</van-col>
              <van-col class="font-h" span="12">{{detailInfo.paymentName}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">支付时间</van-col>
              <van-col class="font-h" span="12">{{detailInfo.createTime}}</van-col>
            </van-row>
          </div>
        </van-card>
        <van-card class="card-item">
          <div slot="desc">
            <div class="title">销售信息</div>
            <van-row class="card-row">
              <van-col class="font-title" span="12">总计金额</van-col>
              <van-col class="font-h" span="12">{{detailInfo.totalGoods}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">优惠金额</van-col>
              <van-col class="font-h" span="12">{{detailInfo.eventOffers}}</van-col>
            </van-row>
            <van-row class="card-row" v-if="detailInfo.paymentModel == 2">
              <van-col class="font-title" span="12">
                <span class="msg-text">使用</span><span class="msg-number">{{detailInfo.integral}}</span><span class="msg-text">积分抵扣</span>
              </van-col>
              <van-col class="font-h" span="12">{{detailInfo.deductionMoney}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">实收金额</van-col>
              <van-col class="font-h" span="12">{{detailInfo.amountActuallyPaid}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">商品数量</van-col>
              <van-col class="font-h" span="12">{{detailInfo.num}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">操作人员</van-col>
              <van-col class="font-h" span="12">{{detailInfo.createName}}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="12">零售人员</van-col>
              <van-col class="font-h" span="12">{{detailInfo.retailerName}}</van-col>
            </van-row>
          </div>
        </van-card>
        <van-card class="card-item">
          <div slot="desc">
            <div class="title">销售信息</div>
            <div class="shadow-row">
              <van-row class="card-row">
                <van-col class="font-left" span="8">商品名称</van-col>
                <van-col class="font-center" span="8">单位</van-col>
                <van-col class="font-right" span="8">金额</van-col>
              </van-row>
              <van-row class="card-row" v-for="(item,index) in detailInfo.cashDetail" :key="index">
                <van-col class="font-name" span="8">{{item.name}}</van-col>
                <van-col class="font-unit" span="8">{{item.num}}{{item.attributes}}</van-col>
                <van-col class="font-price" span="8">¥ {{item.num.mul(item.price)}}</van-col>
              </van-row>
            </div>
          </div>
        </van-card>
      </div>
    </div>
  </div>

</template>

<script>
  // import {Dialog} from "vant";
  // import {orderDetail} from "@/api/store";

  export default {
    components: {},
    computed: {},
    data() {
      return {
        detailInfo:{
        //   id: "1215160310127882241",
        //   createTime: "2020-02-25 14:36:09",
        //   retailer: "1",
        //   retailerName: "",
        //   createName: "史凯鹏",
        //   goods: [],
        //   totalGoods: 1800,
        //   eventOffers: 800,
        //   paymentMethod: 1,
        //   paymentName: "微信支付",
        //   amountActuallyPaid: 1000,
        //   num: 2,
        //   shopId: "1001",
        //   cashDetail: [{
        //     id: "1215160310358568961",
        //     goodsId: "1",
        //     num: 2,
        //     cashId: 1215160310127882200,
        //     shopId: "1001",
        //     goods: [],
        //     good: {},
        //     retailer: "",
        //     price: -1,
        //     name: "篮球",
        //   }],
        //   payTime: "",
        //   dateTime: "",
        //   memberId: "1",
        //   memberType: "",
        //   paymentModel: 1,
        //   member:{
        //     name:"",
        //   membersCode:"",
        //   phone:"",
        //   pic:"",
        //   memberType:"",
        //   memberTypeName:"",
        //   }
        }
      };
    },
    created() {
      // this.getOrderDetail()
      this.detailInfo = JSON.parse(this.$route.query.info)
    },

    methods: {
      // getOrderDetail(){
        // orderDetail(this.$route.query.id).then(res =>{
        //   console.log(res)
        //   if(res.status == 200){
        //     this.detailInfo = res.data.data;
        //   }
        // })
      // }
    },
  };
</script>

<style lang='scss' scoped>

  .baseArea {
    height: 100%;
    overflow-y: scroll;

    .cardArea {
      overflow-y: auto;
      // height: 77vh;

      .card-body {
        width: 92%;
        margin: .5rem auto 0;

        /deep/ .van-card {
          background: #fff;
        }

        .card-item {
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
          border-radius: .3rem;
          margin-bottom: 1rem;
          .title{
            font-family: PingFangSC-Semibold;
            font-size: 1.125rem;
            color: #222B45;
            letter-spacing: 0;
            text-align: left;
            margin-bottom: .5rem;
          }
          /deep/ .van-card {
            background: #fff;
            padding: 0;
          }

          .big-icon {
            font-size: 4.1875rem;
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
              .msg-text{
                font-family: PingFangSC-Regular;
                font-size: .875rem;
                color: #222B45;
              }
              .msg-number{
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
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap
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
