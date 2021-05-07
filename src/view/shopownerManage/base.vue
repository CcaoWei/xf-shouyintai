<template>
  <div class="base-box" v-if="$route.path == '/entrance/shopownerManage'">
    <div class="shopowner-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="shopowner-item" v-for="(item, index) in shopowners" :key="index">
            <div class="s-means">
              <div class="s-left">
                <div class="s-icon">
                  <img :src="item.avatar" v-if="item.avatar" width="56" alt/>
                  <img v-else src="/static/shoper-demo.png" width="56" alt/>
                </div>
                <div class="s-msg">
                  <div class="s-name">
                    <img :src="
                    item.sex == 1
                      ? require('@/assets/images/店员详情/男.png')
                      : require('@/assets/images/店员详情/女.png')
                  " alt/>
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
                <div class="s-state">
                  <span v-if="item.status==10">状态：正常</span>
                  <span v-else style="color: red">状态：停用</span>
                </div>
                <div class="s-btn">
                  <button @click="Manage(item)">管理</button>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="add">
      <button @click="Add">新增店长</button>
    </div>
  </div>
  <router-view v-else></router-view>
</template>
<script>
  import {shopowner} from "@/api/store";
  import {Toast} from "vant";

  export default {
    data() {
      return {
        shopowners: [],
        isLoading: true,
        loading: false,
        finished: false,
        pageSize: {
          current: 1,
          size: 15
        }
      };
    },
    created() {
    },
    activated() {
      // this.getListUser(this.tabStatus)
      this.isLoading = false;
      this.loading = false;
      this.shopowners = [];
      this.finished = false;
      this.pageSize = {
        current: 0,
        size: 15
      };
      this.onLoad();
    },
    methods: {
      onRefresh() {
        // setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.loading = true;
        this.shopowners = [];
        this.pageSize = {
          current: 0,
          size: 15
        };
        this.finished = false;
        this.onLoad();
      },
      onLoad() {
        // 异步更新数据
        const nextPaging = {
          current: this.pageSize.current + 1,
          size: 15,
          type: 2
        };
        this.pageSize = nextPaging;

        this.getShopownerList(this.pageSize);
      },

      getShopownerList(data) {
        shopowner(data).then(res => {
          let newOfRes = JSON.parse(JSON.stringify(res.data.data));
          this.shopowners = this.shopowners.concat(newOfRes.records);
          // for (let i = 0; i < 22; i++) {
          //   this.shopowners.push(this.shopowners[0]);
          // }
          this.loading = false;
          // // 数据全部加载完成
          if (this.shopowners.length == newOfRes.total) {
            this.finished = true;
          }
        });
      },
      Manage(shopownerMsg) {
        this.$router.push({
          path: "/entrance/shopownerManage/details",
          query: {
            shopownerMsg: shopownerMsg
          }
        });
      },
      Add() {
        this.$router.push("/entrance/shopownerManage/add");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .base-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .shopowner-list {
      margin: 1.25rem;
      padding-bottom: 10rem;
      box-sizing: border-box;

      .shopowner-item {
        height: 4.562rem;
        margin-bottom: 0.5rem;
        box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
        background-color: #fff;
        border-radius: 0.375rem;

        .s-means {
          padding: 0.625rem 1rem 0.625rem 1.25rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          .s-left {
            display: flex;

            .s-icon {
              width: 3.5rem;
              height: 3.5rem;
              border-radius: 50%;
              background: #ccc;

              img {
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 50%;
              }
            }

            .s-msg {
              text-align: left;
              margin-left: 0.5rem;

              .s-name {
                span {
                  font-size: 0.875rem;
                  font-family: PingFangSC-Medium;
                  color: #222b45;
                  line-height: 0.875rem;
                }
              }

              .s-tel {
                span {
                  font-size: 0.75rem;
                  font-family: PingFangSC-Light;
                  opacity: 0.5;
                  color: #222b45;
                }
              }

              .s-shop {
                span {
                  font-size: 0.75rem;
                  font-family: PingFangSC-Light;
                  opacity: 0.5;
                  color: #222b45;
                }
              }
            }
          }

          .s-manage {
            height: 3.5rem;
            text-align: right;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .s-state {
              width: 4rem;
              font-family: PingFangSC-Light;
              font-size: 12px;
              color: #222b45;
              text-align: right;
              line-height: 12px;
            }

            .s-btn {
              button {
                width: 3.25rem;
                height: 1.5rem;
                background: #fff;
                border-radius: 0.25rem;
                border: 1px solid #eee;
                font-size: 0.75rem;
                color: #222b45;
              }
            }
          }
        }
      }
    }

    .add {
      width: 100%;
      text-align: center;
      /* margin-bottom: 1rem; */
      position: fixed;
      bottom: 0;
      height: 4rem;
      background: #fff;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      button {
        width: 20.937rem;
        height: 2.75rem;
        background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
        border-radius: 22px;
        border: none;
        color: #fff;
      }
    }
  }
</style>
