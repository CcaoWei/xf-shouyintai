<template>
  <div class="base-box">
    <div class="box-header">
      <van-search class="search" @input="inputChange" placeholder="输入商家订单号查询" v-model="orderCode"/>
    </div>
    <div class="orderList-list">
      <div class="content" v-if="orderLists.length">
        <div class="title">搜索结果</div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                    offset="1">
            <div class="content-item" @click="navToDetail(item.id)" v-for="(item,index) in orderLists" :key="index">
              <div class="item-top">
                <div class="item-time">{{item.createTime}}</div>
                <div class="item-btn">
                  <div class="btn-text" v-if="item.isDeleted == 0&&item.status == 10">未支付</div>
                  <div class="btn-text" v-if="item.isDeleted == 0&&item.status == 20">已支付</div>
                  <div class="btn-text" v-if="item.isDeleted == 0&&item.status == 30">已退款</div>
                  <div class="btn-text" v-if="item.isDeleted == 1">已过期</div>
                </div>
              </div>
              <div class="item-down">
                <div class="item-number">订单编号：{{item.id}}</div>
                <div class="item-price">¥{{item.amountActuallyPaid}}</div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
      <div class="no-data" v-else>
        <div class="title">筛选结果</div>

        <img src="../../assets/store/no_data.png" alt/>
        <div class="no-data-text">暂时没有订单记录</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {historyOrder} from "@/api/cashier";
  import {Toast} from "vant";

  export default {
    data() {
      return {
        isLoading: true,
        loading: false,
        finished: false,
        listData: {
          current: 0,
          size: 15,
          total: 0
        },
        orderLists: [],
        orderCode:""
      };
    },
    created() {
    },
    mounted() {
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.listData = {
        current: 1,
        size: 15,
        total: 0
      }
      this.orderLists = [];
      this.historyOrder();
    },
    methods: {
      inputChange(value) {//搜索框实现
        this.orderCode = value
        this.orderLists = [];
        this.listData.current = 1;
        this.listData.total = 0;
        this.finished = false;
        this.historyOrder();
      },
      search() {
        this.$router.push("/entrance/orderlist/search");
      },

      navToDetail(id) {
        this.$router.push({
          path: "/entrance/orderlist/hsDetail",
          query: {
            id: id
          }
        });
      },
      onRefresh() {
        Toast("刷新成功");
        this.isLoading = false;
        this.orderLists = [];
        this.loading = true;
        this.listData = {
          current: 0,
          size: 10,
          start: this.listData.start,
          end: this.listData.end
        };
        this.finished = false;
        this.onLoad();
      },
      onLoad() {
        this.listData.current = this.listData.current + 1;
        this.historyOrder();
      },
      historyOrder() {
        let params = {
          cashId: this.orderCode,
          current: this.listData.current,
          size: this.listData.size,
        };
        historyOrder(params).then(res => {
          if (res.status === 200) {
            let newOfRes = JSON.parse(JSON.stringify(res.data.data));
            this.orderLists = [...this.orderLists, ...newOfRes.records];
            this.loading = false;
            // // 数据全部加载完成
            if (this.orderLists.length == newOfRes.total) {
              this.finished = true;
            }
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .base-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    /deep/ .van-search__content {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      padding-left: 8px;
      background-color: #fff;
      border-radius: 2px;

      /deep/ .van-field__left-icon {
        margin: 0 0.5rem;
        font-size: 2rem;
        color: #c5cee0;
      }
    }
    .box-header {
      border-radius: 0.3rem !important;
      background: #fff !important;
      margin: 1rem auto 0 !important;
      width: 88% !important;
      justify-content: space-around !important;
      height: 3rem !important;
      align-items: center !important;

      .search {
        padding: 0 !important;
        height: 3rem !important;
        border-radius: 0.375rem !important;
        background: #fff !important;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06) !important;
      }
    }

    .orderList-list {
      width: 100%;
      padding-top: 1.25rem;
      padding-bottom: 5rem;
      box-sizing: border-box;

      .content {
        background: #ffffff;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        width: 89.3%;
        padding-bottom: 3rem;
        padding-top: 1.25rem;
        margin: 0.75rem auto 0;

        .title {
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #222b45;
          letter-spacing: 0;
          line-height: 1.125rem;
          text-align: left;
          padding-left: 1.25rem;
        }

        .content-item {
          background: #ffffff;
          box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
          height: 68px;
          margin-top: 0.75rem;
          padding: 0 1.25rem;

          .item-top{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-bottom: .5rem;
            .item-time {
              font-family: PingFangSC-Regular;
              font-size: 1rem;
              color: #222b45;
              line-height: 1rem;
            }
            .item-btn{
              opacity: 0.5;
              background: #8F9BB3;
              border-radius: .25rem;
              .btn-text{
                line-height: .75rem;
                padding: .375rem .75rem;
                font-family: PingFangSC-Regular;
                font-size: .75rem;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
              }
            }
          }

          .item-down{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            .item-number {
              opacity: 0.5;
              font-family: PingFangSC-Regular;
              font-size: 0.75rem;
              color: #222b45;
              line-height: 1.5rem;
            }
            .item-price{
              font-family: PingFangSC-Regular;
              font-size: 1rem;
              color: #222b45;
              text-align: right;
              line-height: 1rem;
            }
          }
        }
      }

      .no-data {
        padding-bottom: 3rem;
        padding-top: 1.25rem;
        margin: 0.75rem auto 0;
        background: #fff;
        width: 89.3%;
        height: 100%;

        .title {
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #222b45;
          letter-spacing: 0;
          line-height: 1.125rem;
          text-align: left;
          padding-left: 1.25rem;
        }

        img {
          width: 12.5rem;
          height: 11.5rem;
          margin: 4.4375rem auto 0;
        }

        .no-data-text {
          opacity: 0.5;
          font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #000000;
          text-align: center;
          line-height: 1.375rem;
          margin-top: 2.3125rem;
        }
      }

      // .orderList-item {
      //   height: 4.562rem;
      //   margin-bottom: 0.5rem;
      //   box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
      //   background-color: #fff;
      //   border-radius: 0.375rem;

      //   .s-means {
      //     padding: 0.625rem 1rem 0.625rem 1.25rem;
      //     display: flex;
      //     flex-direction: row;
      //     align-items: center;
      //     justify-content: space-between;

      //     .s-left {
      //       display: flex;
      //       flex-direction: row;
      //       align-items: center;

      //       .s-icon {
      //         width: 3.5rem;
      //         height: 3.5rem;
      //         border-radius: 50%;
      //         background: #ccc;
      //         img {
      //           width: 3.5rem;
      //           height: 3.5rem;
      //           border-radius: 50%;
      //         }
      //       }

      //       .s-msg {
      //         text-align: left;
      //         margin-left: 0.5rem;

      //         .s-name {
      //           span {
      //             font-size: 0.875rem;
      //             font-family: PingFangSC-Medium;
      //             color: #222b45;
      //             line-height: 0.875rem;
      //           }
      //         }

      //         .s-tel {
      //           span {
      //             font-size: 0.75rem;
      //             font-family: PingFangSC-Light;
      //             color: #222b45;
      //           }
      //         }

      //         .s-shop {
      //           span {
      //             font-size: 0.75rem;
      //             font-family: PingFangSC-Light;
      //             opacity: 0.5;
      //             color: #222b45;
      //           }
      //         }
      //       }
      //     }

      //     .s-manage {
      //       height: 3.5rem;
      //       text-align: right;
      //       display: flex;
      //       flex-direction: column;
      //       justify-content: center;

      //       .s-btn {
      //         button {
      //           // width: 3rem;
      //           height: 1.5rem;
      //           background: #fff;
      //           border-radius: 0.25rem;
      //           border: 1px solid #eee;
      //           font-size: 0.75rem;
      //           color: #222b45;
      //         }
      //       }
      //     }
      //   }
      // }
    }
  }

  /deep/ .van-picker-column:nth-child(1) {
    display: none;
  }

  /deep/ .van-picker-column:nth-child(2) {
    display: none;
  }

  /deep/ .van-picker-column:nth-child(3) {
    display: none;
  }
</style>
