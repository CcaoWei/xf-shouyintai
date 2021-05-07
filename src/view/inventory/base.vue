<template>
  <div class="baseBody" v-if="$route.path=='/entrance/inventory'">
    <van-tabs @click="checkTab" v-model="status">
      <van-tab v-for="(tab,index) in tabs" :title="tab.title" :key="index" :name="tab.status"></van-tab>
    </van-tabs>
    <div class="cardArea">
      <div class="card-body">
        <div v-if="inventoryList.length">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
            <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                      offset="1">
              <van-card v-for="(item,index) in inventoryList" :key="index" class="card-item">
                <div slot="desc">
                  <van-row class="card-row">
                    <van-col class="font-zt" span="12">盘点状态</van-col>
                    <van-col class="font-zt-value" span="12">
                      <div v-if="item.status == 1" class="font-red">盘点中</div>
                      <div v-if="item.status == 2" class="font-red">异常单</div>
                      <div v-if="item.status == 3">已完成</div>
                      <div v-if="item.status == 4">已作废</div>
                    </van-col>
                  </van-row>
                  <van-row class="card-row shadow-row">
                    <van-col class="font-title" span="12">时间</van-col>
                    <van-col class="font-h" span="12">{{item.date}}</van-col>
                  </van-row>
                  <van-row class="card-row shadow-row">
                    <van-col class="font-title" span="12">制单人</van-col>
                    <van-col class="font-h" span="12">{{item.editor}}</van-col>
                  </van-row>
                  <van-row class="card-row">
                    <van-col class="font-title" span="12">{{item.message}}</van-col>
                    <van-col class span="12">
                      <div class="font-o-btn">
                        <van-button class="v-btn" @click="detail(item)">
                          <span v-if="item.status == 1">继续</span>
                          <span v-else>查看</span>
                        </van-button>
                      </div>
                      <div v-if="item.status != 4 &&item.status != 3" class="font-h-btn">
                        <van-button class="v-btn" @click="remove(item.takeId)">作废</van-button>
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </van-card>
            </van-list>
          </van-pull-refresh>
        </div>
        <no-goods v-else></no-goods>
      </div>
    </div>
    <div class="add-box">
      <van-button class="btn" type="default" @click="add()">+ 新建盘点单</van-button>
    </div>
  </div>
  <div class="other-box" v-else>
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>
</template>

<script>
  import {Dialog, Toast} from "vant";
  import {getInventoryList, deleteInventory, getInventoryDetail} from "@/api/inventory";
  import noGoods from "../../components/stock/noDoods";

  export default {
    components: {noGoods},
    computed: {},
    data() {
      return {
        tabs: [
          {
            title: "全部",
            status: 1
          },
          {
            title: "盘点中",
            status: 2
          },
          {
            title: "已完成",
            status: 3
          }
        ],
        inventoryList: [],
        status: 1,
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
    beforeMount() {
    },
    methods: {
      onRefresh() {
        Toast("刷新成功");
        this.inventoryList = [];
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
        this.getInventoryList();
      },
      checkTab(status) {
        this.inventoryList = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        this.status = status;
        this.getInventoryList();
      },
      getInventoryList() {
        let params = {
          status:this.status,
          current:this.listData.current,
          size:this.listData.size
        };
        getInventoryList(params).then(res => {
          let newOfRes = JSON.parse(JSON.stringify(res.data.data));
          this.inventoryList = [...this.inventoryList, ...newOfRes.records];
          this.listData.total = newOfRes.total;
          this.loading = false;
          if (this.inventoryList.length == this.listData.total) {
            this.finished = true;
          }
        });
      },
      detail(item) {
        if (item.status == 2) {
          this.inventoryList = [];
          this.finished = false;
          this.listData.current = 1;
          this.listData.total = 0;
          getInventoryDetail(item.takeId).then(res => {
            if (res.data) {
              this.$router.push({
                path: "/entrance/inventory/errorDetail",
                query: {
                  takeId: item.takeId,
                  pxGoods: res.data.data.pxGoods,
                }
              });
            }
          });
        }else if(item.status == 1){
          this.$router.push({
            path: "/entrance/inventory/edit",
            query: {
              takeId: item.takeId
            }
          });
        } else {
          this.$router.push({
            path: "/entrance/inventory/details",
            query: {
              takeId: item.takeId
            }
          });
        }
      },
      add() {
        this.$router.push("/entrance/inventory/add");
      },
      remove(takeId) {
        Dialog.confirm({
          message: "确定作废该盘点任务单？"
        })
          .then(() => {
            deleteInventory(takeId).then(() => {
              this.inventoryList = [];
              this.finished = false;
              this.listData.current = 1;
              this.listData.total = 0;
              this.getInventoryList();
            });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    watch: {},
    activated() {
      if (this.$route.path == '/entrance/inventory') {
        this.isLoading = true;
        this.loading = false;
        this.finished = false;
        this.inventoryList = [];
        this.listData = {
          current: 1,
          size: 15,
          total: 0
        };
        this.getInventoryList();
      }
    }
  };
</script>

<style lang='scss' scoped>
  .baseBody {
    height: 100%;

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

    .cardArea {
      overflow-y: auto;
      height: calc(100% - 4.5rem);
      // height: 100%;
      box-sizing: border-box;
      padding-bottom: 3rem;

      .card-body {
        width: 92%;
        margin: 0.5rem auto 0;

        /deep/ .van-card {
          background: #fff;
        }

        .card-item {
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
          border-radius: 0.3rem;
          margin-bottom: 1rem;

          .card-row {
            height: 2.75rem;
            display: flex;
            flex-direction: row;
            align-items: center;

            .font-red {
              color: #f15245;
            }

            .font-zt {
              font-family: PingFangSC-Regular;
              font-size: 1rem;
              color: #222b45;
              letter-spacing: 0;
              text-align: left;
            }

            .font-zt-value {
              font-family: PingFangSC-Regular;
              font-size: 1rem;
              color: #f15245;
              letter-spacing: 0;
              text-align: right;
            }

            .font-title {
              font-family: PingFangSC-Regular;
              font-size: 0.875rem;
              color: #222b45;
              text-align: left;
            }

            .font-h {
              opacity: 0.5;
              font-family: PingFangSC-Regular;
              font-size: 0.875rem;
              color: #222b45;
              text-align: right;
            }

            /deep/ .van-button {
              line-height: 0;
              height: 1.875rem;
              width: 3.75rem;
              padding: 0;
            }

            /deep/ .van-button__text {
              font-family: PingFangSC-Regular;
              font-size: 0.75rem;
              color: #222b45;
              text-align: center;
              border: 0;
            }

            .font-h-btn {
              display: flow-root;
              float: right;

              /deep/ .van-button {
                display: flow-root;
                float: right;
                background: #ffffff;
                border: 1px solid #8f9bb3;
                border-radius: 0.25rem;
              }
            }

            .font-o-btn {
              display: flow-root;
              float: right;
              margin-left: 1rem;

              /deep/ .van-button {
                display: flow-root;
                float: right;
                background: #ffffff;
                border: 1px solid #ff8900;
                border-radius: 0.25rem;
              }
            }
          }

          .shadow-row {
            box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
          }
        }
      }
    }
  }
</style>
