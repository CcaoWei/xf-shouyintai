<template>
  <div class="goodsList">
    <div v-for="(item,index) in goodsMsg" :key="index" class="goods-item">
      <img class="returnImg" :src="item.img?item.img:'/static/no-img-cn.png'" alt/>
      <div class="return-body">
        <div class="return-goodsMsg">{{item.goodsName}}</div>
        <van-row class="return-row">
          <van-col span="12">
            <div class="return-left">
              {{item.attributes}}
            </div>
            <div class="return-order">
              单据：{{item.orderCount}}
            </div>
          </van-col>
          <van-col span="12" v-if="reason === '订货入库'||reason === '调拨入库'||reason === '订货单出库'||reason === '调拨出库'">
            <div class="return-right">
              出库：{{item.outCount}}{{item.goodsUnit}}
            </div>
            <div class="return-right">
              入库：{{item.putCount}}{{item.goodsUnit}}
            </div>
          </van-col>
        </van-row>
        <div>
          <van-row class="return-row">
            <van-col>
<!--              <div class="return-cs">{{item.attributes}}</div>-->
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <!-- <div class="footer">
      <span>实付金额：￥ <span class="">.00</span></span>
      <div class="">申请退款</div>
    </div>-->
  </div>
</template>
<script>
  // import { mapGetters } from "vuex";
  export default {
    props: {
      goodsMsg: {
        type: Array
      },
      isStock: {
        type: Boolean
      },
      status: {
        type: Number
      },
      reason: {
        type: String
      },
    },
    data() {
      return {
        goodsid: ""
      };
    },
    computed: {
    },
    methods: {
    }
  };
</script>

<style lang="scss" scoped>
  .goodsList {
    border-radius: 0.5rem;

    .goods-item {
      margin-bottom: 0.5rem;
      background-color: #fff;
      padding: 3% 5%;
      display: flex;
      overflow-y: scroll;

      img {
        padding: 0;
        width: 8rem;
      }

      .goodsMsg {
        width: 100%;
        margin: 0.6rem 0 0.6rem 1rem;

        div {
          display: flex;
          line-height: 2rem;
        }

        div:nth-child(2) {
          justify-content: space-between;

          span:nth-child(2) {
            color: rgb(82, 82, 82);
          }
        }

        div:nth-child(3) {
          span:nth-child(2) {
            color: #ccc;
            margin-left: 1rem;
            text-decoration: line-through;
          }

          i {
            font-size: 1.5rem;
            position: relative;
            color: red;
            right: -3rem;
            bottom: 0rem;
          }
        }
      }
    }
  }

  //-----------------LiuWen-----------------
  .returnImg {
    height: 6rem !important;
    width: 6rem !important;
  }

  .return-body {
    width: calc(100% - 6rem);

    .return-goodsMsg {
      margin: 0.6rem 0 0.3rem 1rem;
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }

    i {
      font-size: 1.5rem;
      position: relative;
      color: red;
      right: -5rem;
      bottom: 2rem;
    }

    .return-row {
      margin: 0 0 0.6rem 1rem;

      .return-cs {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #8f9bb3;
        text-align: left;
      }

      .return-left {
        margin-top: 6px;
        opacity: 0.5;
        font-size: 14px;
        color: #424242;
        line-height: 14px;
        text-align: left;
      }

      .return-order{
        font-size: 15px;
        color: #4A4A4A;
        line-height: 24px;
        text-align: left;
      }

      .return-right {
        margin-top: 6px;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0;
        text-align: right;
        line-height: 14px;
      }

      .return-np {
        font-family: PingFangSC-Regular;
        font-size: 0.9375rem;
        color: #222b45;
        text-align: left;
        margin-right: 0.5rem;
      }

      .return-op {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 0.6875rem;
        color: #8f9bb3;
        text-decoration: line-through;
        text-align: left;
        line-height: 1.6rem;
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 20rem;
  }

  .card-stepper {
    text-align: center;
    width: 5rem;
    // position: absolute;
    // right: 0%;
    // top: 1rem;
  }

  /deep/ .van-stepper {
    background: #fff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    min-width: 6rem;
  }

  /deep/ .van-stepper__minus {
    background: #fff;
    color: #ff8900;
    height: 1.2rem;
    width: 1.2rem;
  }

  /deep/ .van-stepper__minus::before {
    width: 9px;
    height: 1px;
  }

  /deep/ .van-stepper__input {
    background: #fff;
    height: 1.2rem;
    min-width: 2.4rem;
  }

  /deep/ .van-stepper__plus {
    background: #fff;
    color: #ff8900;
    height: 1.2rem;
    width: 1.2rem;
  }

  /deep/ .van-stepper__plus::before {
    width: 9px;
    height: 1px;
  }

  /deep/ .van-stepper__plus::after {
    width: 1px;
    height: 9px;
  }
</style>
