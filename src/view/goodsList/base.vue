<template>
  <div class="base-box" v-if="$route.path == '/entrance/goodsList'">
    <img class="btn-save" src="/static/search.png" style="width: 1.125rem !important;height: 1.125rem !important;"
         @click="search"/>
    <van-dropdown-menu class="dropdown-menu" active-color="#FF8900">
      <van-dropdown-item v-model="brand" :options="brandOption"/>
      <van-dropdown-item v-model="type" :options="typeOption"/>
      <van-dropdown-item class="classification" v-model="classification" :options="classificationOption">
        <van-tree-select
          :items="classData"
          :active-id.sync="activeId"
          :main-active-index.sync="activeIndex"
        />
      </van-dropdown-item>
      <van-dropdown-item class="classification" v-model="classification" :options="moreOption">
        <div class="more-box">
          <div class="text-gray">商品销售渠道</div>
          <div class="check-btn" :class="{activited:wayStatus == null}" @click="checkWay(null)">全部</div>
          <div class="check-btn" :class="{activited:wayStatus == 1}" @click="checkWay(1)">线上</div>
          <div class="check-btn" :class="{activited:wayStatus == 2}" @click="checkWay(2)">线下</div>
          <div class="check-btn check-btn-large" :class="{activited:wayStatus == 3}" @click="checkWay(3)">线上+线下</div>
          <div class="text-gray m-t-2">商品销售状态</div>
          <div class="check-btn" :class="{activited:typeStatus == null}" @click="checkType(null)">全部</div>
          <div class="check-btn" :class="{activited:typeStatus == 1}" @click="checkType(1)">在售</div>
          <div class="check-btn" :class="{activited:typeStatus == 2}" @click="checkType(2)">未售</div>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="card-box">
      <div class="goods-area" v-if="data.length">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                    offset="1">
            <van-row
              v-for="(item, index) in data"
              :key="index"
              class="goods-item shadow-row"
              @click="detail(item)"
            >
              <van-col class="img-area">
                <img class="goods-img" :src="item.img?item.img:'/static/no-img-cn.png'" alt=""/>
              </van-col>
              <van-col class="goods-right">
                <div class="goods-name">{{ item.name }}</div>
                <div class="goods-info">
                  <div>
                    <div class="goods-unit">计量单位({{item.unit}})</div>
                    <div class="tips-area">
                      <div class="goods-tips gray" v-if="item.saleStatus == 2">未售</div>
                      <div class="goods-tips blue" v-if="item.saleStatus == 1">在售</div>
                      <div class="goods-tips green" v-if="item.channelId == 1 || item.channelId == 3">线上</div>
                      <div class="goods-tips green" v-if="item.channelId == 2 || item.channelId == 3">线下</div>

                    </div>
                  </div>
                  <div class="goods-price">
                    <div class="price-item" v-if="item.onLinePrice">
                      <van-icon name="/static/online-price.png"/>
                      <span class="goods-price">¥{{item.onLinePrice}}</span>
                    </div>
                    <div class="price-item" v-if="item.offLinePrice">
                      <van-icon name="/static/under-line-price.png"/>
                      <span class="goods-sales">¥{{item.offLinePrice}}</span>
                    </div>
                    <div class="price-item opacity" v-if="item.costPrice">
                      <van-icon name="/static/bus.png"/>
                      <span class="goods-sales">¥{{item.costPrice}}</span>
                    </div>
                  </div>
                </div>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </div>
      <no-goods v-else></no-goods>
    </div>
    <div class="btn-area">
      <button class="btn-edit" @click="add">新增商品</button>
    </div>
  </div>
  <div v-else class="other-box">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>
</template>
<script>
  import {goodList, categoryList, brandList, typeList, judgeCanAdd} from "@/api/goods";
  import noGoods from "@/components/stock/noDoods";
  import {mapGetters} from "vuex";
  import {Toast} from "vant";
  // import {shopowner} from "@/api/store";
  // import {Toast} from "vant";

  export default {
    computed: {
      ...mapGetters(["reloadPage"])
    },
    components: {
      noGoods
    },
    data() {
      return {
        value: "",
        brand: null,
        type: null,
        classification: 0,
        brandOption: [],
        typeOption: [],
        classData: [],
        classificationOption: [
          {text: '分类', value: 0}
        ],
        moreOption: [
          {text: '更多', value: 0}
        ],
        activeId: "0",
        activeIndex: 0,
        wayStatus: null,
        typeStatus: null,
        data: [],
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
    created() {
    },
    activated() {
      if (this.$route.path == '/entrance/goodsList') {
        if (this.reloadPage) {
          this.brand = null;
          this.type = null;
          this.activeId = "0";
          this.wayStatus = null;
          this.typeStatus = null;
          this.$store.commit("SET_RELOADPAGE", false);
        }
        this.isLoading = true;
        this.loading = false;
        this.finished = false;
        this.listData = {
          current: 1,
          size: 15,
          total: 0
        }
        this.data = [];
        this.getData();
        this.getClass();
        this.getBrand();
        this.getType();
      }
    },
    methods: {
      onRefresh() {
        Toast("刷新成功");
        this.data = [];
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
        this.getData();
      },
      getData() {
        let params = {
          brandId: this.brand,
          categoryId: this.activeId,
          channelId: this.wayStatus,
          saleStatus: this.typeStatus,
          typeId: this.type,
          current: this.listData.current,
          size: this.listData.size,
        };
        goodList(params).then(res => {
          let newOfRes = JSON.parse(JSON.stringify(res.data.data));
          this.data = [...this.data, ...newOfRes.records];
          this.listData.total = newOfRes.total;
          this.loading = false;
          if (this.data.length == this.listData.total) {
            this.finished = true;
          }
        });
      },
      getClass() {
        categoryList(1).then(res => {
          this.classData = [...res.data.data];
        });
      },
      getBrand() {
        brandList().then(res => {
          let brandList = [];
          if (res.data.data.length) {
            for (let i in res.data.data) {
              brandList.push({
                text: res.data.data[i].text,
                value: res.data.data[i].id,
              })
            }
          }
          this.brandOption = [{text: '全部品牌', value: null}, ...brandList];
        });
      },
      getType() {
        typeList().then(res => {
          let typeList = [];
          if (res.data.data.length) {
            for (let i in res.data.data) {
              typeList.push({
                text: res.data.data[i].text,
                value: res.data.data[i].id,
              })
            }
          }
          this.typeOption = [{text: '全部类型', value: null}, ...typeList];
        });
      },
      checkWay(key) {
        // if (this.wayStatus != key) {
        this.wayStatus = key;
        // } else {
        //   this.wayStatus = 0;
        // }
      },
      checkType(key) {
        // if (this.typeStatus != key) {
        this.typeStatus = key;
        // } else {
        //   this.typeStatus = 0;
        // }
      },
      detail(item) {
        this.$router.push({
          path: "/entrance/goodsList/details",
          query: {
            id: item.id,
          }
        });
      },
      search() {
        this.$router.push("/entrance/goodsList/search");
      },
      add() {
        judgeCanAdd().then(() => {
          this.$store.commit("SET_GOODINTRODUCE", {
            title: "",
            content: "",
            imgs: []
          });
          this.$router.push({
            path: "/entrance/goodsList/add",
            query: {
              item: {
                id: null
              },
            }
          });
        });
      }
    },
    watch: {
      brand() {
        this.data = [];
        this.listData.current = 1;
        this.listData.total = 0;
        this.finished = false;
        this.getData();
      },
      activeId() {
        this.data = [];
        this.listData.current = 1;
        this.listData.total = 0;
        this.finished = false;
        this.getData();
      },
      wayStatus() {
        this.data = [];
        this.listData.current = 1;
        this.listData.total = 0;
        this.finished = false;
        this.getData();
      },
      typeStatus() {
        this.data = [];
        this.listData.current = 1;
        this.listData.total = 0;
        this.finished = false;
        this.getData();
      },
      type() {
        this.data = [];
        this.listData.current = 1;
        this.listData.total = 0;
        this.finished = false;
        this.getData();
      },
    }
  };
</script>

<style lang="scss" scoped>
  .base-box {
    height: 100%;
    overflow-y: auto;

    .dropdown-menu {
      .classification {
        /deep/ .van-cell {
          display: none;
        }

        /deep/ .van-sidebar-item--select {
          border-color: #FF8900;
        }

        /deep/ .van-tree-select__item--active {
          color: #FF8900;
        }

        .more-box {
          padding: 1rem;
          text-align: left;

          .text-gray {
            opacity: 0.3;
            font-family: PingFangSC-Regular;
            font-size: .875rem;
            color: #424242;
          }

          .check-btn {
            display: inline-block;
            border-radius: .8125rem;
            background: #F0F0F0;
            width: 4rem;
            height: 1.625rem;
            line-height: 1.625rem;
            font-size: .875rem;
            color: #424242;
            font-family: PingFangSC-Regular;
            text-align: center;
            margin-top: 1rem;
          }

          .check-btn-large {
            width: 6rem;
          }

          .m-t-2 {
            margin-top: 2rem;
          }

          .activited {
            color: #FFF !important;
            background-color: #FF8900;
          }
        }
      }
    }

    .card-box {
      background-color: #FFF;
      padding: .1rem .8rem .1rem .3rem;
      margin: 1.25rem 1.25rem 5.5rem 1.25rem;
      border-radius: .375rem;

      .goods-area {

        .goods-item {
          margin-top: 1rem;
          margin-bottom: 1rem;
          display: flex;

          .img-area {
            width: 30%;

            .goods-img {
              height: 5.75rem;
              width: 5.75rem;
              border-radius: .375rem;
            }
          }

          .goods-right {
            margin-left: .5rem;
            width: 70%;

            .goods-name {
              font-family: PingFangSC-Regular;
              font-size: 0.875rem;
              color: #424242;
              text-align: left;
            }

            .goods-info {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: flex-end;
              margin-top: 1rem;

              .tips-area {
                margin-top: 1rem;

                .goods-tips {
                  border-radius: .0625rem;
                  font-family: PingFangSC-Regular;
                  font-size: .625rem;
                  width: 1.75rem;
                  height: 1rem;
                  display: inline-block;
                  text-align: center;
                }

                .blue {
                  background: rgba(64, 158, 255, 0.10);
                  border: .0625rem solid #409EFF;
                  color: #409EFF;
                }

                .green {
                  background: rgba(126, 211, 33, 0.10);
                  border: .0625rem solid #7ED321;
                  color: #7ED321;
                }

                .gray {
                  background: rgba(34, 43, 69, 0.05);
                  border: .0625rem solid #D0D0D0;
                  color: #D0D0D0;
                }
              }

              .goods-unit {
                opacity: 0.5;
                font-family: PingFangSC-Light;
                font-size: .625rem;
                color: #424242;
                text-align: left;
              }

              .goods-price {
                font-family: PingFangSC-Light;
                font-size: .75rem;

                .price-item {
                  margin-top: .2rem;
                }
              }

              .opacity {
                opacity: 0.5;
              }
            }
          }
        }
      }
    }

    .btn-area {
      background-color: #FFF;
      position: fixed;
      bottom: 0;
      height: 5.125rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-shadow: 0 0 .0625rem 0 rgba(10, 22, 70, 0.06), 1.25rem 0 2.875rem -0.625rem rgba(10, 22, 70, 0.10);

      .btn-edit {
        background-image: linear-gradient(90deg, #FF7901 3%, #FE5845 100%);
        border-radius: 1.375rem;
        font-family: PingFangSC-Semibold;
        font-size: 1rem;
        color: #FFFFFF;
        text-align: center;
        width: 90%;
        height: 2.75rem;
        border: 0;
      }
    }
  }

  .other-box {
    height: 100%;
  }
</style>
