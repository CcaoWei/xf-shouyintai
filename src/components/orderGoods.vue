<template>
  <div class="goodsList">
    <div v-for="(item,index) in goodsMsg" :key="index" class="goods-item">
      <img class="returnImg" :src="item.img?item.img:'/static/no-img-cn.png'" alt/>
      <div class="return-body">
        <van-row class="return-row" style="margin-top: 1rem">
          <van-col span="24">
            <div class="return-goodsMsg">{{item.goodsName}}</div>
          </van-col>
        </van-row>
        <van-row class="return-row">
          <van-col span="12">
            <div class="return-np">
              {{item.attributes}}
            </div>
          </van-col>
          <van-col span="12">
          </van-col>
        </van-row>
        <van-row class="return-row">
          <van-col span="12">
            <div class="return-goodsMsg">
              单据：{{item.orderCount}}
            </div>
          </van-col>
          <van-col span="12" v-if="orderStatus === 102">
            <div class="return-qu">
              调拨：{{item.outCount}}{{item.goodsUnit}}
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      goodsMsg: {
        type: Array
      },
      other: {
        type: Boolean
      },
      status: {
        type: Number
      },
      orderStatus: {
        type: Number
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
      deleteGoods(id, index) {
        this.goodsid = id;
        this.goodsMsg.splice(index, 1);
        this.$emit("clearSearch", false);
      }
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
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 0 0.6rem 1rem;

      .return-cs {
        font-size: 0.875rem;
        color: #FE5845;
        letter-spacing: 0;
        text-align: right;
        line-height: 14px;
      }

      .return-qu {
        font-size: 0.875rem;
        color: #4A4A4A;
        letter-spacing: 0;
        text-align: right;
        line-height: 14px;
      }

      .return-np {
        opacity: 0.5;
        font-size: .875rem;
        color: #424242;
        line-height: 14px;
        text-align: left;
      }

      .return-op {
        opacity: 0.5;
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
