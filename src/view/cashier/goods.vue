<template>
  <div class="page" v-if="$route.path=='/entrance/goods'">
    <div class="cardBody">
      <van-field class="vinput" placeholder="条形码查询商品" v-model="goodCode"/>
      <div class="goods-area">
        <div class="labelText">搜索结果</div>
        <div class="goodsList" v-if="goods.length">
          <div v-for="(item,index) in goods" :key="index" class="goods-item" @click="detail(item)">
            <img class="returnImg" :src="item.img?item.img:'/static/no-img-cn.png'" alt="">
            <div class="return-body">
              <div class="return-goodsMsg">{{item.name}}</div>
              <van-row class="return-row">
                <van-col :span="12">
                  <div class="return-cs">{{item.code}}</div>
                </van-col>
                <van-col :span="12">
                  <div class="return-qu">
                    {{item.stock}}{{item.unit}}
                  </div>
                </van-col>
              </van-row>
              <div>
                <van-row class="return-row">
                  <van-col>
                    <div class="return-np">￥ {{item.newPrice}}</div>
                  </van-col>
                  <van-col>
                    <div class="return-op">￥ {{item.oldPrice}}</div>
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
        </div>
        <no-goods v-else></no-goods>
      </div>
    </div>
  </div>
  <div class="page" v-else>
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>

</template>

<script>
  import {getGoodByCode} from "@/api/cashier";
  import noGoods from "@/components/stock/noDoods";

  export default {
    components: {noGoods},
    data() {
      return {
        goodCode: "",
        sumbitBtnTitle: "待收银",
        goods: []
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      submit() {
      },
      detail(item) {
        this.$router.push({
          path: "/entrance/goods/goodDetail",
          query: {
            good: item,
            hideFooter: true
          }
        });
      },
      search() {
        this.goods = [];
        getGoodByCode(this.goodCode).then(res => {
          if (res.status == 200) {
            this.goods = res.data.data;
          }
        });
      }
    },
    watch: {
      goodCode() {
        this.search();
      }
    }
  };
</script>

<style lang='scss' scoped>
  .page {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }

  .vinput {
    background: #FFFFFF;
    border-radius: .375rem;
    box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
  }

  .labelText {
    padding: 1rem;
    font-family: PingFangSC-Semibold;
    font-size: 1.125rem;
    color: #222B45;
    letter-spacing: 0;
    text-align: left;
  }

  .cardBody {
    width: 86%;
    margin: 0 auto;
    padding-top: 1rem;

    .goods-area {
      margin-top: 1rem;
      background: #FFFFFF;
      box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
      border-radius: .375rem;

      /deep/ .van-card {
        background: #ffffff;
      }

      .card-item {
        box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
        border-radius: 1rem;
        margin-bottom: 1rem;

        /deep/ .van-card__content {
          margin-top: 0.5rem;
        }

        .goods-row {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .goods-bt {
          font-size: 1rem;
          font-family: PingFangSC-Regular;
          color: #222b45;
          text-align: left;
          margin-top: 0.5rem;
        }

        .goods-quantity {
          font-family: PingFangSC-Regular;
          font-size: .75rem;
          color: #222B45;
          text-align: right;
          margin-top: 0.5rem;
        }

        .goods-cs {
          font-size: 0.9rem;
          font-family: PingFangSC-Regular;
          color: #ffc47f;
          text-align: left;
          margin-top: 0.5rem;
        }

        .goods-text {
          text-align: right;

          .old-price {
            color: #999;
            text-decoration: line-through;
            font-size: 0.8rem;
            margin-right: .0625rem;
          }
        }

        .arrow {
          position: absolute;
          right: 0;
          top: 10%;
          font-size: 1.3rem;
          color: #ff8900;
        }
      }

      .goodsList {
        margin-bottom: 5rem;
        border-radius: 0.5rem;

        .goods-item {
          margin-bottom: 0.5rem;
          background-color: #fff;
          padding: 3% 5%;
          display: flex;
          overflow-y: scroll;
          align-items: center;

          .returnImg {
            height: 5.25rem;
            width: 5.25rem;
          }

          .return-body {
            width: calc(100% - 6rem);
            margin-left: .5rem;

            .return-goodsMsg {
              font-family: PingFangSC-Regular;
              font-size: 1rem;
              color: #222B45;
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
              margin-top: .5rem;

              .return-cs {
                font-family: PingFangSC-Regular;
                font-size: .875rem;
                color: #F15245;
                text-align: left;
              }

              .return-qu {
                font-family: PingFangSC-Regular;
                font-size: 0.875rem;
                color: #4a4a4a;
                letter-spacing: 0;
                text-align: right;
              }

              .return-np {
                font-family: PingFangSC-Regular;
                font-size: .9375rem;
                color: #222b45;
                text-align: left;
                margin-right: .5rem;
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
        }

      }
    }

  }
</style>
