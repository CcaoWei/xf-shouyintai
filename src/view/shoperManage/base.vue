<template>
  <div class="detail-content">
    <div class="detail-content" v-if="$route.path=='/entrance/shoperManage'">
      <van-tabs @click="checkTab" v-model="tabStatus">
        <van-tab v-for="(tab,index) in tabs" :title="tab.title" :key="index" :name="tab.status"></van-tab>
      </van-tabs>
      <div class="shopers-area" :style="{height:cardAreaH}">
        <div v-if="userList.length">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
            <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                      offset="1">
              <van-row class="card-row" v-for="(item,index) in userList" :key="index">
                <van-col class="card-number" span="2">
                  <div class="first" v-if="index == 0">{{index+1}}</div>
                  <div class="two" v-else-if="index == 1">{{index+1}}</div>
                  <div class="three" v-else-if="index == 2">{{index+1}}</div>
                  <div class="other" v-else>{{index+1}}</div>
                </van-col>
                <van-col class="card-img" span="5" @click="shoperDetails(item.id)">
                  <img class="card-img" :src="item.avatar"/>
                </van-col>
                <van-col class="card-left" span="9" @click="shoperDetails(item.id)">
                  <div class="shoper-name">{{item.name}}</div>
                  <div class="order-number" v-if="tabStatus==1">销售订单：{{item.orderNum}}笔</div>
                  <div class="order-number" v-if="tabStatus==1">退款处理：{{item.reNum}}笔</div>
                  <div class="order-number" v-if="tabStatus==2">收款单数：{{item.orderNum}}笔</div>
                </van-col>
                <van-col class="card-right" span="8">
                  <div class="shop-price">¥ {{item.total}}</div>
                  <div class="btn-select" @click="selectType(item.id)">
                    <span class="select-message" v-if="item.status ==10">正常</span>
                    <span class="select-message-red" v-else>停止</span>
                    <van-icon class="select-icon" name="arrow-down"/>
                  </div>
                </van-col>
                <van-action-sheet v-model="showSelect" :actions="selectActions" @select="selectChecked"/>
              </van-row>
            </van-list>
          </van-pull-refresh>

        </div>
        <no-goods v-else style="margin-top: 1rem"></no-goods>
      </div>

      <div class="btn-save" @click="add">新增店员</div>
    </div>
    <div class="detail-content" v-else>
      <keep-alive>
        <router-view v-if="$route.meta.isKeepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.isKeepAlive"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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

  .detail-content {
    height: 100%;
    width: 100%;
  }

  .shopers-area {
    overflow-y: scroll;

    .card-row {
      background: #ffffff;
      box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
      border-radius: 0.375rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 1.5rem;
      padding: 0.6rem 1rem;

      .card-number {
        .first {
          background: #f15245;
          height: 1.125rem;
          width: 1.125rem;
          border-radius: 100%;
          color: #fff;
          line-height: 1.125rem;
          text-align: center;
        }

        .two {
          background: #ff8900;
          height: 1.125rem;
          width: 1.125rem;
          border-radius: 100%;
          color: #fff;
          line-height: 1.125rem;
          text-align: center;
        }

        .three {
          background: #ffc47f;
          height: 1.125rem;
          width: 1.125rem;
          border-radius: 100%;
          color: #fff;
          line-height: 1.125rem;
          text-align: center;
        }

        .other {
          background: #d3d5db;
          height: 1.125rem;
          width: 1.125rem;
          border-radius: 100%;
          color: #fff;
          line-height: 1.125rem;
          text-align: center;
        }
      }

      .card-img {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 100%;
        margin-right: 0.3rem;
      }

      .card-left {
        text-align: left;

        .shoper-name {
          font-family: PingFangSC-Medium;
          font-size: 0.875rem;
          color: #222b45;
        }

        .order-number {
          opacity: 0.5;
          font-family: PingFangSC-Light;
          font-size: 0.75rem;
          color: #222b45;
        }
      }

      .card-right {
        text-align: right;

        .shop-price {
          font-family: PingFangSC-Semibold;
          font-size: 0.875rem;
          color: #222b45;
          text-align: right;
          margin-bottom: .375rem;
        }

        .btn-select {
          border: 1px solid rgba(143, 155, 179, 0.5);
          border-radius: 0.25rem;
          width: 4.25rem;
          height: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          float: right;

          .select-message {
            margin-left: 1rem;
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            letter-spacing: 0;
            text-align: left;
          }

          .select-message-red {
            margin-left: 1rem;
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #fe5845;
            letter-spacing: 0;
            text-align: left;
          }

          .select-icon {
            margin-right: 0.5rem;
            font-size: 0.875rem;
            color: #222b45;
            letter-spacing: 0;
            text-align: right;
          }
        }
      }
    }
  }
</style>

<script>
  import {listUser, updateUser} from "@/api/store";
  import noGoods from "@/components/stock/noDoods";
  import {Toast} from "vant";

  export default {
    data() {
      return {
        tabs: [
          {
            title: "销售店员",
            status: 1
          },
          {
            title: "收银员",
            status: 2
          }
        ],
        tabStatus: 1,
        btnCheck: 1,
        showSelect: false,
        selectActions: [
          {name: "正常", status: 10},
          {name: "停止", status: 20}
        ],
        cardAreaH: "",
        selectId: 0, //保存点击的是第几个元素
        userList: [], //店员列表（销售和收银员）
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
    components: {noGoods},
    created() {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.cardAreaH = h - 60 - 44 + "px";
    },
    activated() {
      this.userList = [];
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.listData = {
        current: 1,
        size: 15,
        total: 0
      }
      this.getListUser(this.tabStatus);
    },

    methods: {
      onRefresh() {
        Toast("刷新成功");
        this.userList = [];
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
        this.getListUser(this.tabStatus);
      },
      getListUser(type) {
        let params = {type:type};
        params.current = this.listData.current;
        params.size = this.listData.size;
        listUser(params).then(res => {
          let newOfRes = JSON.parse(JSON.stringify(res.data.data));
          this.userList = [...this.userList, ...newOfRes.records];
          this.listData.total = newOfRes.total;
          this.loading = false;
          if (this.userList.length == this.listData.total) {
            this.finished = true;
          }
        });
      },
      checkTab(status) {
        this.userList = [];
        this.listData.current = 1;
        this.listData.total = 0;
        this.finished = false;
        this.getListUser(status);
        this.tabStatus = status;
      },
      selectType(idx) {
        // 保存点击的是第几个元素
        this.selectId = idx;
        this.showSelect = true;
      },
      add() {
        this.$router.push("/entrance/shoperManage/add");
      },
      shoperDetails(id) {
        if (this.tabStatus == 1) {
          this.$router.push({
            path: "/entrance/shoperManage/shoperDetails",
            query: {
              id: id
            }
          });
        } else {
          this.$router.push({
            path: "/entrance/shoperManage/cashierDetails",
            query: {
              id: id
            }
          });
        }
      },
      selectChecked(value) {
        let obj = {
          id: this.selectId,
          status: value.status
        };
        this.showSelect = false;
        updateUser(obj).then(res => {
          if (res.status == 200) {
            this.userList = [];
            this.listData.current = 1;
            this.listData.total = 0;
            this.finished = false;
            this.getListUser(this.tabStatus);
          }
        });
      }
    }
  };
</script>

