<template>
  <!-- <div class="baseBody"> -->
  <div class="baseBody" v-if="$route.path=='/entrance/stockControl'">
    <van-row class="box-header">
      <van-col span="24">
        <van-search placeholder="条形码/关键词查询商品" v-model="code"/>
      </van-col>
    </van-row>
    <van-tabs @click="checkTab">
      <van-tab v-for="(tab,index) in tabs" :title="tab.title" :key="index" :name="tab.status"></van-tab>
    </van-tabs>
    <div class="base-area">
      <div class="goods-area">
        <van-pull-refresh v-if="goods.length" v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                    offset="1">
              <warning-goods :goodsMsg="goods" isStock :status="status"></warning-goods>
          </van-list>
        </van-pull-refresh>
        <no-doods v-else></no-doods>
      </div>
    </div>
  </div>
  <div class="other-box" v-else>
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>
  <!-- </div> -->
</template>

<script>
  import {stockWarningV2, goodsStockList} from "@/api/stock";
  import warningGoods from "@/components/warningGoods";
  import noDoods from "@/components/stock/noDoods";
  import {Toast} from "vant";

  export default {
    components: {warningGoods, noDoods},
    computed: {},
    data() {
      return {
        tabs: [
          {
            title: "库存预警",
            status: 1
          },
          {
            title: "全部商品",
            status: 2
          }
        ],
        status: 1,
        code: "",
        goods: [],
        isLoading: true,
        loading: false,
        finished: false,
        listData: {
          current: 0,
          size: 30,
          total: 0
        }
      };
    },
    beforeMount() {
    },
    methods: {
      onRefresh() {
        Toast("刷新成功");
        this.goods = [];
        this.isLoading = false;
        this.loading = true;
        this.listData = {
          current: 0,
          size: 30,
          total: 0
        };
        this.finished = false;
        this.onLoad();
      },
      onLoad() {
        // 异步更新数据
        this.listData.current = this.listData.current + 1;
        this.getData();
      },
      checkTab(status) {
        this.goods = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        this.status = status;
        this.getData();
      },
      getData() {
        let params = {code: this.code};
        params.current = this.listData.current;
        params.size = this.listData.size;
        if (this.status == 1) {
          stockWarningV2(params).then(res => {
            let newOfRes = JSON.parse(JSON.stringify(res.data.data));
            this.goods = [...this.goods, ...newOfRes.records];
            this.listData.total = newOfRes.total;
            this.loading = false;
            if (this.goods.length == this.listData.total) {
              this.finished = true;
            }
          });
        } else {
          goodsStockList(params).then(res => {
            let newOfRes = JSON.parse(JSON.stringify(res.data.data));
            this.goods = [...this.goods, ...newOfRes.records];
            this.listData.total = newOfRes.total;
            this.loading = false;
            if (this.goods.length == this.listData.total) {
              this.finished = true;
            }
          });
        }
      }
    },
    watch: {
      code() {
        this.goods = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        this.getData();
      }
    },
    created() {
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.goods = [];
      this.listData = {
        current: 0,
        size: 30,
        total: 0
      };
      this.getData();
    }
  };
</script>

<style lang='scss' scoped>
  /deep/ .van-tab__text, .van-tabs {
    position: relative;
    margin-top: 0.5rem;
  }

  .baseBody {
    height: 100%;
    background: url("../../assets/images/top_bg.png") left -3rem no-repeat;
    background-size: 100%;

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

    /deep/ .van-hairline--top-bottom::after {
      border-width: 0 !important;
    }

    .box-header {
      width: 66%;
      border-radius: 0.5rem;
      background: #fff;
      margin: 0 auto;

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

    .base-area {
      height: calc(100% - 4.75rem);
      overflow-y: auto;

      .goods-area {
        width: 92%;
        margin: 1rem auto 0;
        background-color: #fff;

        /deep/ .goods-item {
          box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
          border-bottom: 1px solid rgba(143, 155, 179, 0.05);
        }
      }
    }
  }
</style>
