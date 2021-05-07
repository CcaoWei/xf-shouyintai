<template>
  <div class="base" v-if="$route.path=='/entrance/returnManage'">
    <div class="r-box">
      <van-row class="box-header">
        <van-col span="24">
          <van-search placeholder="订单编号" v-model="value" maxlength="19" type="number"/>
        </van-col>
      </van-row>
      <div class="r-box">
        <van-tabs @click="checkTab" v-model="tabStatus">
          <van-tab v-for="(tab,index) in tabs" :title="tab.title" :key="index" :name="tab.status">
            <div v-if="orders.length">
              <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
                <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了"
                          @load="onLoad"
                          offset="1">
                  <div class="orders" v-for="(order,i) in orders" :key="i">
                    <div class="o-title">订单信息</div>
                    <goods-list :goodsMsg="order.goods"></goods-list>
                    <van-row class="footer">
                      <van-col span="14" class="textAera">
                        <span class="text">实付：</span>
                        <span class="num">￥{{order.amountActuallyPaid}}</span>
                      </van-col>
                      <van-col span="9" class="buttonAera">
                        <van-button
                          v-if="tabStatus == 1"
                          class="button"
                          type="primary"
                          @click="skipDetail(order)"
                        >
                          <span>申请退款</span>
                        </van-button>
                        <van-button
                          v-if="tabStatus == 2"
                          class="button"
                          type="primary"
                          @click="returnDetail(order)"
                        >
                          <span>查看详情</span>
                        </van-button>
                      </van-col>
                      <van-col span="1"></van-col>
                    </van-row>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
            <no-goods v-else style="margin-top: 1rem"></no-goods>
          </van-tab>
        </van-tabs>
        <!-- <no-goods v-else></no-goods> -->
      </div>
    </div>
  </div>
  <router-view v-else></router-view>
</template>
<script>
  import noGoods from "@/components/stock/noDoods";
  import goodsList from "@/components/stock/goodsList";
  import {returnList, returnedList} from "@/api/stock";
  import {mapGetters} from "vuex";
  import {Toast} from "vant";

  export default {
    data() {
      return {
        value: "",
        showCode: true,
        tabs: [
          {
            title: "全部",
            status: 1
          },
          {
            title: "已退款",
            status: 2
          }
        ],
        tabStatus: 1,
        orders: [],
        isLoading: true,
        loading: false,
        finished: false,
        listData: {
          current: 0,
          size: 15,
          total: 0
        }
      };
    },
    computed: {
      ...mapGetters(["reloadPage"])
    },
    methods: {
      onRefresh() {
        Toast("刷新成功");
        this.orders = [];
        this.isLoading = false;
        this.loading = true;
        this.listData = {
          current: 0,
          size: 15,
          total: 0
        };
        this.finished = false;
        this.onLoad();
      },
      onLoad() {
        // 异步更新数据
        this.listData.current = this.listData.current + 1;
        if (this.tabStatus == 1) {
          this.returnList();
        } else {
          this.returnedList();
        }
      },
      skipDetail(order) {
        this.$router.push({
          path: "/entrance/returnManage/orderDetails",
          query: {
            order: order
          }
        });
      },
      returnDetail(order) {
        this.$router.push({
          path: "/entrance/returnManage/returnDetails",
          query: {
            order: order
          }
        });
      },
      checkTab(status) {
        this.orders = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        if (status == 1) {
          this.returnList();
        } else {
          this.returnedList();
        }
      },
      returnList() {
        let params = {id: this.value};
        params.current = this.listData.current;
        params.size = this.listData.size;
        returnList(params).then(res => {
          let result = res.data.data.records;
          let newList = [];
          for (let i in result) {
            let order = {
              id: result[i].id,
              amountActuallyPaid: result[i].amountActuallyPaid,
              goods: []
            };
            if (result[i].cashDetail && result[i].cashDetail.length) {
              let goods = [];
              for (let j in result[i].cashDetail) {
                let good = {
                  attributes: result[i].cashDetail[j].good.attributes,
                  title: result[i].cashDetail[j].good.title,
                  name: result[i].cashDetail[j].good.name,
                  img: result[i].cashDetail[j].good.img,
                  color: result[i].cashDetail[j].good.color,
                  size: result[i].cashDetail[j].good.size,
                  quantity: result[i].cashDetail[j].num,
                  unit: result[i].cashDetail[j].good.unit,
                  newPrice: result[i].cashDetail[j].good.newPrice,
                  oldPrice: result[i].cashDetail[j].good.oldPrice,
                  id: result[i].cashDetail[j].good.id
                };
                goods.push(good);
              }
              order.goods = goods;
            }
            newList.push(order);
          }
          this.orders = [...this.orders, ...newList];
          this.listData.total = res.data.data.total;
          this.loading = false;
          if (this.orders.length == this.listData.total) {
            this.finished = true;
          }
        });
      },
      returnedList() {
        let params = {id: this.value};
        params.current = this.listData.current;
        params.size = this.listData.size;
        returnedList(params).then(res => {
          let result = res.data.data.records;
          let newList = [];
          for (let i in result) {
            let order = {
              id: result[i].id,
              amountActuallyPaid: result[i].amountActuallyPaid,
              cashId: result[i].cashId,
              goods: []
            };
            if (result[i].refundDetail && result[i].refundDetail.length) {
              let goods = [];
              for (let j in result[i].refundDetail) {
                let good = {
                  attributes: result[i].refundDetail[j].goood.attributes,
                  title: result[i].refundDetail[j].goood.title,
                  name: result[i].refundDetail[j].goood.name,
                  img: result[i].refundDetail[j].goood.img,
                  color: result[i].refundDetail[j].goood.color,
                  size: result[i].refundDetail[j].goood.size,
                  quantity: result[i].refundDetail[j].num,
                  unit: result[i].refundDetail[j].goood.unit,
                  newPrice: result[i].refundDetail[j].goood.newPrice,
                  oldPrice: result[i].refundDetail[j].goood.oldPrice,
                  id: result[i].refundDetail[j].goood.id
                };
                goods.push(good);
              }
              order.goods = goods;
            }
            newList.push(order);
          }
          this.orders = [...this.orders, ...newList];
          this.listData.total = res.data.data.total;
          this.loading = false;
          if (this.orders.length == this.listData.total) {
            this.finished = true;
          }
        });
      }
    },
    watch: {
      value() {
        this.orders = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        if (this.tabStatus == 1) {
          this.returnList();
        } else {
          this.returnedList();
        }
      },
      // $route: {
      //   handler(to, from) {
      //     if (from && to.path == "/entrance/returnManage") {
      //       if (this.tabStatus == 1) {
      //         this.returnList();
      //       } else {
      //         this.returnedList();
      //       }
      //     }
      //   }
      // }
    },
    activated() {
      if (this.$route.path == '/entrance/returnManage') {
        if (this.reloadPage) {
          this.tabStatus = 1;
          this.value = "";
          this.$store.commit("SET_RELOADPAGE", false);
        }
        this.isLoading = true;
        this.loading = false;
        this.finished = false;
        this.orders = [];
        this.listData = {
          current: 1,
          size: 15,
          total: 0
        };
        if (this.tabStatus == 1) {
          this.returnList();
        } else {
          this.returnedList();
        }
      }
    },
    components: {
      noGoods,
      goodsList
    }
  };
</script>
<style lang="scss" scoped>
  .base {
    height: 77vh;
    overflow-y: auto;

    .r-box {
      height: 100%;
      .box-header {
        width: 90%;
        margin: 1rem auto 0;
        border-radius: 0.5rem;

        /deep/ .van-search {
          padding: 0;
          border-radius: 0.5rem;
        }

        /deep/ .van-search__content {
          background-color: rgba(0, 0, 0, 0);
        }

        /deep/ .van-cell {
          padding: 0;
        }
      }

      .r-box {
        margin-top: 1rem;
        height: 100%;
        overflow-y: scroll;

        /deep/ .van-tabs__nav {
          background-color: #f7f9fc;
        }

        /deep/ .van-tabs__line {
          background-color: #ff8900;
        }

        /deep/ .van-tab {
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #222b45;
          text-align: center;
        }

        /deep/ .van-tab--active {
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #ff8900;
          text-align: center;
          color: #ff8900;
        }

        .orders {
          width: 90%;
          margin: 1rem auto 0;
          background: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
          overflow: hidden;

          .o-title {
            margin: 1rem 0 1rem 1rem;
            text-align: left;
            font-family: PingFangSC-Semibold;
            font-size: 1.125rem;
            color: #222b45;
            letter-spacing: 0;
          }

          .footer {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0 0 1rem 1rem;
            height: 3rem;

            .textAera {
              text-align: left;

              .text {
                font-family: PingFangSC-Regular;
                font-size: 0.8rem;
                color: #8f9bb3;
              }

              .num {
                font-family: PingFangSC-Semibold;
                font-size: 1rem;
                color: #ff8900;
              }
            }

            .buttonAera {
              margin: 0 auto;

              /deep/ .van-button {
                line-height: 0.7rem;
                font-family: PingFangSC-Semibold;
                font-size: 0.9rem;
                color: #ffffff;
              }

              /deep/ .van-button--normal {
                padding: 0 1.2rem;
              }

              .button {
                background: #ff8900;
                border-radius: 3rem;
                border-color: #ff8900;
                height: 2rem;
                width: 100%;
              }
            }
          }
        }

        .bottom-btn {
          height: 4rem;
          width: 100%;
          background: #fff;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: 99;
          bottom: 0;
          justify-content: space-around;

          .paid {
            color: red;
          }

          span {
            line-height: 4rem;
            margin-right: 2rem;
          }

          .btn {
            height: 3rem;
            width: 30%;
            line-height: 3rem;
            border-radius: 0.25rem;
            background: #eb9046;
          }
        }
      }
    }
  }
</style>
