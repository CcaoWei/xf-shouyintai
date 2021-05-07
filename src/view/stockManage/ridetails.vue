<template>
  <div class="ri-box" v-if="$route.path=='/entrance/stock'">
    <van-tabs @click="checkTab">
      <van-tab v-for="(tab,index) in tabs" :title="tab.title" :key="index" :name="tab.status"></van-tab>
    </van-tabs>
    <div v-if="ordersList.length" class="list-box">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                  offset="1">
          <div class="ri-list" v-for="(item,index) in ordersList" @click="pushDetail(item.code,item.detailType)" :key="index">
            <div class="ri-list-box">
              <div class="list1">
                <div>
                  <span class="ri-type" v-if="item.type === '1'">入库</span>
                  <span class="ri-type" v-else>出库</span>
                  <span v-if="item.type=== '1'">{{ item.detail }}</span>
                  <span v-else>{{ item.detail }}</span>
                </div>
                <div class="goodsnum">
                  <img src="@/assets/images/商品数量 2.png" alt="">
                  <span>{{ item.num }}</span>
                </div>
              </div>
              <div class="list1">
                <span>时间：{{ item.date }}</span>
              </div>
              <div class="list1">
                <span>订单号：{{ item.code }}</span>
              </div>
              <!--        <div class="list1">-->
              <!--          <span>{{item.detail}}</span>-->

              <!--        </div>-->

            </div>
            <van-icon class="arrow" name="arrow"/>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <no-goods v-else></no-goods>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import {riDetailsV2,orderDetailsV2} from "@/api/stock";
import noGoods from "@/components/stock/noDoods";
import {Toast} from "vant";

export default {
  data() {
    return {
      ordersList: [],
      orderDetails: {},
      isLoading: true,
      loading: false,
      finished: false,
      listData: {
        code: '',
        type: 1,
        current: 0,
        size: 30,
        total: 0
      },
      tabs: [
        {
          title: "入库单",
          status: 1
        },
        {
          title: "出库单",
          status: 2
        }
      ],
    };
  },
  components: {noGoods},
  methods: {
    checkTab(status) {
      this.ordersList = [];
      this.finished = false;
      this.listData.current = 1;
      this.listData.total = 0;
      this.listData.type = status;
      this.getOrderList();
    },
    onRefresh() {
      Toast("刷新成功");
      this.ordersList = [];
      this.isLoading = false;
      this.loading = true;
      this.listData.current = 0
      this.listData.size = 30
      this.listData.current = 0
      this.finished = false;
      this.onLoad();
    },
    onLoad() {
      // 异步更新数据
      this.listData.current = this.listData.current + 1;
      this.getOrderList();
    },
    pushDetail(code, detailType) {

      // this.$store.dispatch("orderDetails", code);
      orderDetailsV2(code, detailType)
        .then(res => {
          this.orderDetails = res.data.data;
          this.orderDetails.detailType = detailType;
          if (this.orderDetails.goods) {
            if (this.orderDetails.type === 1) {
              this.$router.push({
                path: "/entrance/stock/receipt",
                query: {orderDetails: this.orderDetails}
              });
            } else {
              this.$router.push({
                path: "/entrance/stock/issue",
                query: {orderDetails: this.orderDetails}
              });
            }
          }
        })
    },
    getOrderList() {
      console.log(this.listData)
      let params = {
        code: this.listData.code,
        type: this.listData.type,
        current: this.listData.current,
        size: this.listData.size,
      };
      console.log(params)
      riDetailsV2(params)
        .then(res => {
          let newOfRes = JSON.parse(JSON.stringify(res.data.data));
          this.ordersList = [...this.ordersList, ...newOfRes.records];
          this.listData.total = newOfRes.total;
          this.loading = false;
          if (this.ordersList.length == this.listData.total) {
            this.finished = true;
          }
        })
    }
  },
  mounted() {
    this.isLoading = true;
    this.loading = false;
    this.finished = false;
    this.ordersList = [];
    this.finished = false;
    this.listData.current = 0
    this.listData.size = 30
    this.listData.current = 0
    this.getOrderList();
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-tab__text, .van-tabs {
  position: relative;
  margin-top: 0.5rem;
}

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

.ri-box {
  height: 100%;

  .list-box {
    height: calc(100% - 4rem);
    overflow-y: scroll;
  }

  .ri-list {
    width: 90%;
    padding: 5% 0;
    margin: 0.6rem auto;
    border-radius: 1rem;
    height: 5rem;
    background: #fff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);

    .ri-list-box {
      height: 100%;
      width: 90%;
      padding-left: 5%;
      margin: 0.6rem 0;
      margin-top: -0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .list1 {
        display: flex;
        line-height: 0.5rem;
        line-height: 1.5rem;
        justify-content: space-between;
        // margin-bottom: 0.3rem;
        .ri-type {
          display: inline-block;
          width: 3rem;
          height: 1.5rem;
          color: #ff8900;
          border: 1px solid #ff8900;
          border-radius: 0.25rem;
          margin-right: 0.625rem;
        }

        .goodsnum {
          color: #8f9bb3;

          img {
            position: relative;
            top: 0.15rem;
          }
        }
      }
    }

    .arrow {
      padding-right: 5%;
      font-size: 1rem;
      display: flex;
      justify-content: flex-end;
      position: relative;
      top: -60%;
    }
  }
}
</style>
