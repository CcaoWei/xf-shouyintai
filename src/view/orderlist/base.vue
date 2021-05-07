<template>
  <div class="base-box" v-if="$route.path == '/entrance/orderlist'">
    <img class="btn-save" src="/static/search.png" style="width: 1.125rem !important;height: 1.125rem !important;"
         @click="search"/>
    <div class="orderList-list">
      <div class="orderlist-top">
        <div class="top-left">时间筛选</div>
        <div class="top-right">
          <div class="start-time" @click="showTimeStart = true">起始时间</div>
          <div class="end-time" @click="showTimeEnd = true">结束时间</div>
        </div>
        <van-popup v-model="showTimeStart" position="bottom">
          <van-datetime-picker v-model="currentDateStart" type="datetime" :min-date="minDate" :max-date="maxDate"
                               @cancel="showTimeStart = false" @confirm="setStartTime"/>
        </van-popup>
        <van-popup v-model="showTimeEnd" position="bottom">
          <van-datetime-picker v-model="currentDateEnd" type="datetime" :min-date="minDate" :max-date="maxDate"
                               @cancel="showTimeEnd = false" @confirm="setEndTime"/>
        </van-popup>
      </div>
      <div class="content" v-if="orderLists.length">
        <div class="title">筛选结果</div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                    offset="1">
            <div class="content-item" @click="navToDetail(item.id)" v-for="(item,index) in orderLists" :key="index">
              <div class="item-left">
                <div class="item-time">{{item.createTime}}</div>
                <div class="number">订单编号：{{item.id}}</div>
              </div>
              <div class="item-right">¥ {{item.amountActuallyPaid}}</div>
            </div>
            <!-- <div class="orderList-item" v-for="(item, index) in orderLists" @click="navToDetail" :key="index">
            <div class="s-means">
              <div class="s-left">
                <div class="s-icon">
                  <img :src="item.avatar" v-if="item.avatar" width="56" alt />
                  <img v-else src="/static/shoper-demo.png" width="56" alt />
                </div>
                <div class="s-msg">
                  <div class="s-name">
                    <img :src="
                    item.sex == '男'
                      ? require('@/assets/images/店员详情/男.png')
                      : require('@/assets/images/店员详情/女.png')
                  " alt />
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="s-tel">
                    <span>联系方式：{{ item.phone }}</span>
                  </div>
                  <div class="s-shop">
                    <span>{{ item.shop }}</span>
                  </div>
                </div>
              </div>
              <div class="s-manage">
                <div class="s-btn">
                  <button>已交接</button>
                </div>
              </div>
            </div>
            </div>-->
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
  <router-view v-else></router-view>
</template>
<script>
  import {orderList} from "@/api/cashier";
  import {Toast} from "vant";

  export default {
    data() {
      return {
        orderLists: [],
        isLoading: true,
        loading: false,
        finished: false,
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDateStart: new Date(),
        currentDateEnd: new Date(),

        showTimeEnd: false,
        showTimeStart: false,
        listData: {
          current: 1,
          size: 10,
          start: " ",
          end: " "
        }
      };
    },
    created() {
      // if (this.$route.path == "/entrance/orderListManage") {
      //   this.getorderListList(this.listData);
      // }
    },
    activated() {
      // this.getListUser(this.tabStatus)
      // console.log("??????");
      if (this.$route.path == "/entrance/orderlist") {
        this.isLoading = false;
        this.orderLists = [];
        this.finished = false;
        this.listData = {
          current: 0,
          size: 10,
          start: "",
          end: ""
        };
        this.onLoad();
      }
    },
    methods: {
      search() {
        this.$router.push("/entrance/orderlist/search");
      },
      setEndTime(value) {
        this.listData.end = value.format("yyyy-MM-dd hh:mm:ss");
        this.orderLists = [];
        this.listData = {
          current: 1,
          size: 10,
          start: this.listData.start,
          end: this.listData.end
        };
        this.finished = false;
        this.isLoading = false;
        this.getorderListList(this.listData);
        this.showTimeEnd = false;
      },
      setStartTime(value) {
        this.listData.start = value.format("yyyy-MM-dd hh:mm:ss");
        this.showTimeStart = false;
      },

      navToDetail(id) {
        // this.$router.push({
        //   path: "/entrance/orderlist/oLDetail",
        //   query: {
        //     id: id
        //   }
        // });
        this.$router.push({
          path: "/entrance/orderManage/details",
          query: {
            id: id
          }
        });
      },
      onRefresh() {
        // setTimeout(() => {
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
        // console.log(1);
        // console.log(this.listData);
        this.onLoad();
      },
      onLoad() {
        // console.log(2);
        // 异步更新数据
        const nextPaging = {
          current: this.listData.current + 1,
          size: 10,
          start: this.listData.start,
          end: this.listData.end
        };
        this.listData = {...nextPaging};
        // console.log(this.listData);
        this.getorderListList(this.listData);
      },

      getorderListList(data) {
        orderList(data).then(res => {
          if (res.status === 200) {
            let newOfRes = JSON.parse(JSON.stringify(res.data.data));
            // this.orderLists = this.orderLists.concat(newOfRes.records);
            this.orderLists = [...this.orderLists,...newOfRes.records];
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

    .orderList-list {
      width: 100%;
      padding-top: 1.25rem;
      padding-bottom: 5rem;
      box-sizing: border-box;

      .orderlist-top {
        width: 89.3%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 3rem;
        box-sizing: border-box;
        padding: 0 1.25rem;
        background: #ffffff;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        margin: 0 auto;

        .top-left {
          font-family: PingFangSC-Semibold;
          font-size: 0.875rem;
          color: #222b45;
          letter-spacing: 0;
          line-height: 0.875rem;
        }

        .top-right {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        .start-time,
        .end-time {
          border: 1px solid rgba(143, 155, 179, 0.5);
          border-radius: 4px;
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #222b45;
          letter-spacing: 0;
          text-align: left;
          line-height: 1.125rem;
          padding: 3px 0.75rem;
          margin-left: 1rem;
        }
      }

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
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.25rem;

          .item-left {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            .item-time {
              font-family: PingFangSC-Regular;
              font-size: 1rem;
              color: #222b45;
              line-height: 1rem;
            }

            .number {
              opacity: 0.5;
              font-family: PingFangSC-Regular;
              font-size: 0.75rem;
              color: #222b45;
              line-height: 1.5rem;
            }
          }

          .item-right {
            font-family: PingFangSC-Regular;
            font-size: 1rem;
            color: #222b45;
            text-align: right;
            line-height: 1rem;
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
