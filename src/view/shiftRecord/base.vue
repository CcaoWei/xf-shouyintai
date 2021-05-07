<template>
  <div class="base-box" v-if="$route.path == '/entrance/shiftRecord'">
    <div class="shopowner-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="shopowner-item" v-for="(item, index) in dutyList" @click="navToDetail(item.id)" :key="index">
            <div class="s-means">
              <div class="s-left">
                <div class="s-icon">
                  <img :src="item.headPortrait" v-if="item.headPortrait" width="56" alt />
                  <img v-else src="/static/shoper-demo.png" width="56" alt />
                </div>
                <div class="s-msg">
                  <div class="s-name">
                    <img :src="
                    item.sex == '1'
                      ? require('@/assets/images/店员详情/男.png')
                      : require('@/assets/images/店员详情/女.png')
                  " alt />
                    <span>{{ item.name }}</span>
                  </div>
                  <div class="s-tel">
                    <span>{{ item.start }}<span v-if="item.end != null">至</span>{{ item.end }}</span>
                  </div>
                  <div class="s-shop">
                    <span>{{ item.shop }}</span>
                  </div>
                </div>
              </div>
              <div class="s-manage">
                <div class="s-btn">
                  <button>{{item.isChange == 1 ? "未交班" : "已交班"}}</button>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
  <router-view v-else></router-view>
</template>
<script>
import { dutyList } from "@/api/cashier";
import { Toast } from "vant";

export default {
  data() {
    return {
      dutyList: [],
      isLoading: true,
      loading: false,
      finished: false,
      pageSize: {
        current: 1,
        size: 10
      }
    };
  },
  created() {
    if (this.$route.path == "/entrance/shopownerManage") {
      this.getShopownerList(this.pageSize);
    }
  },
  activated() {
    // this.getListUser(this.tabStatus)
    // console.log("??????");
    this.isLoading = false;
    this.dutyList = [];
    this.finished = false;
    this.pageSize = {
      current: 0,
      size: 10
    };
    this.onLoad();
  },
  methods: {
    navToDetail(id) {
      this.$router.push({
        path: "/entrance/shiftRecord/sRDetail",
        query: {
            id: id
          }
      });
    },
    onRefresh() {
      // setTimeout(() => {
      Toast("刷新成功");
      this.isLoading = false;
      this.dutyList = [];
      this.pageSize = {
        current: 0,
        size: 10
      };
      this.finished = false;
      this.onLoad();
    },
    onLoad() {
      // 异步更新数据
      const nextPaging = {
        current: this.pageSize.current + 1,
        size: 10
      };
      this.pageSize = nextPaging;

      this.getShopownerList(this.pageSize);
    },

    getShopownerList(data) {
      dutyList(data).then(res => {
        if (res.status === 200) {
          console.log(res)

          let newOfRes = JSON.parse(JSON.stringify(res.data.data));
          // console.log(this.dutyList.length)
          this.dutyList = this.dutyList.concat(newOfRes.records);
          this.loading = false;
          this.dutyList.forEach(item => {
            if(item.endTime != '') {
              item.end = item.endTime.substr(11,5)
            } 
            if(item.startTime != '') {
              item.start = item.startTime.substr(0,16)
            }
          });
          // console.log(newOfRes.records[0].endTime.trim().split(" "));
          // console.log(this.dutyList)
          // console.log(newOfRes)
          // // 数据全部加载完成
          if (this.dutyList.length == newOfRes.total) {
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
          flex-direction: row;
          align-items: center;

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
          justify-content: center;

          .s-btn {
            button {
              // width: 3rem;
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
}
</style>
