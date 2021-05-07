<template>
  <div class="base-box">
    <div class="price-manage" v-if="$route.path=='/entrance/productList'">
      <div class="box-header">
        <van-search class="search" placeholder="关键词查询商品" v-model="goodCode"/>
      </div>
      <div class="product-item">
        <van-row class="card-row">
          <van-col class="btn-select" span="12" @click="selectType"><span class="select-message">综合</span>
            <van-icon class="select-icon" name="arrow-down"/>
          </van-col>
          <van-col class="btn-screen" span="12" @click="shaixuan"><span class="select-message">价格筛选</span></van-col>
        </van-row>

        <div class="goods-area" ref="goodsArea" v-if="productList.length">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
            <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了"
                      @load="onLoad"
                      offset="1">
              <van-row class="goods-item shadow-row" v-for="(product,index) in productList" :key="index">
                <van-col v-if="showCheckbox" span="2" class="checkbox-area">
                  <van-checkbox v-model="product.checked"></van-checkbox>
                </van-col>
                <van-col span="5" @click="details(product)">
                  <img class="goods-img" :src="product.img?product.img:'/static/no-img-cn.png'">
                </van-col>
                <van-col :span="showCheckbox?10:12">
                  <div class="goods-name" @click="details(product)">{{product.name}}</div>
                  <div class="goods-price">现售价：¥{{product.newPrice}}</div>
                  <div class="goods-price">预售价：¥{{product.oldPrice}}</div>
                  <div class="goods-in-price">成本价：¥{{product.purchasePrice}}</div>
                </van-col>
                <van-col span="7">
                  <div class="goods-stock">库存：{{product.stock}}</div>
                  <div class="btn-edit" v-if="!showCheckbox"><span class="edit-message"
                                                                   @click="goodEdit(product)">编辑</span>
                  </div>
                </van-col>
              </van-row>
            </van-list>
          </van-pull-refresh>
        </div>
        <div class="no-goods" v-else>
          <img src="../../assets/images/暂无商品 2.png" alt="">
          <span>无搜索结果</span>
        </div>
      </div>
      <van-dialog :beforeClose="jgClose" confirmButtonText="确认" cancelButtonText="取消" v-model="showJiage" title="价格编辑"
                  show-cancel-button>
        <van-cell-group>
          <van-field v-model="pricevalue" class="priceInput" left-icon="gold-coin-o" type="number"/>
        </van-cell-group>
      </van-dialog>
      <van-dialog :beforeClose="zkClose" confirmButtonText="确认" cancelButtonText="取消" v-model="showZhekou" title="折扣编辑"
                  show-cancel-button>
        <van-cell-group>
          <van-field v-model="discountvalue" class="priceInput-Z" type="number"/>
          <span class="zhe-text">折</span>
        </van-cell-group>
      </van-dialog>
      <van-dialog :beforeClose="jsClose" confirmButtonText="筛选" cancelButtonText="取消" v-model="showShaixuan"
                  title="价格筛选" show-cancel-button>
        <van-cell-group>
          <van-row class="shaixuan-row">
            <van-col span="11">
              <van-field v-model="newPrice" class="shaixuan-left" left-icon="gold-coin-o" type="number"/>
            </van-col>
            <van-col span="2" @click="shaixuan" class="shaixuan-text">
              <div>-</div>
            </van-col>
            <van-col span="11" @click="shaixuan">
              <van-field v-model="oldPrice" class="shaixuan-right" type="number"/>
            </van-col>
          </van-row>
        </van-cell-group>
      </van-dialog>
      <van-button class="btn" v-if="showCheckbox" type="default" @click="banchConfirm()">折扣编辑</van-button>
      <van-action-sheet v-model="showSelect" :actions="selectActions" @select="selectChecked"/>
      <van-action-sheet v-model="showEdit" :actions="editActions" @select="editChecked"/>
      <div class="btn-save" @click="batchEdit">
        <span v-if="!showCheckbox">批量改价</span>
        <span v-else>取消</span>
      </div>
    </div>
    <div class="other-box" v-else>
      <keep-alive>
        <router-view v-if="$route.meta.isKeepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.isKeepAlive"/>
    </div>
  </div>
</template>

<script>
  import {
    priceGoodsList,
    banchUpdatePrice
  } from "@/api/priceManage";
  import {Toast} from "vant";
  import {mapGetters} from "vuex";

  export default {
    computed: {
      ...mapGetters(["reloadPage"])
    },
    data() {
      return {
        checkGood: false,
        showJiage: false,
        showZhekou: false,
        showShaixuan: false,
        showCheckbox: false,
        goodCode: "",
        pricevalue: "",
        discountvalue: "",
        product: {},
        showSelect: false,
        showEdit: false,
        editActions: [
          {name: "价格编辑", key: 1},
          {name: "折扣编辑", key: 2}
        ],
        selectActions: [
          {name: "综合", key: null},
          {name: "价格升序", key: 1},
          {name: "价格降序", key: 2},
          {name: "销量", key: 3}
        ],
        oldPrice: "",
        newPrice: "",
        sortType: null,
        productList: [],
        isBanch: false,
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
    mounted() {
    },
    activated() {
      if (this.$route.path == '/entrance/productList') {
        if (this.reloadPage) {
          this.goodCode = "";
          this.sortType = null;
          this.oldPrice = "";
          this.newPrice = "";
          this.discountvalue = "";
          this.$store.commit("SET_RELOADPAGE", false);
        }
        this.isLoading = true;
        this.loading = false;
        this.finished = false;
        this.productList = [];
        this.listData = {
          current: 1,
          size: 15,
          total: 0
        };
        this.getProductList();
      }
    },
    methods: {
      onRefresh() {
        Toast("刷新成功");
        this.productList = [];
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
        this.getProductList();
      },
      // 请求商品数据列表
      getProductList() {
        let data = {
          title: this.goodCode,
          newPrice: this.newPrice,
          oldPrice: this.oldPrice,
          sort: this.sortType, //1降序，2升序，3效率(升序)
          current: this.listData.current,
          size: this.listData.size
        };
        priceGoodsList(data).then(res => {
          let newOfRes = JSON.parse(JSON.stringify(res.data.data));
          this.productList = [...this.productList, ...newOfRes.records];
          this.listData.total = newOfRes.total;
          this.loading = false;
          if (this.productList.length == this.listData.total) {
            this.finished = true;
          }
        });
      },
      // 修改商品售价
      editPrice(id) {
        this.showEdit = false;
        this.showJiage = true;
        this.goodsId = id;
      },
      //修改折扣
      editZhekou(id) {
        this.showEdit = false;
        this.showZhekou = true;
        this.goodsId = id;
      },
      //价格筛选关闭事件
      jsClose(action, done) {
        if (action == "confirm") {
          this.productList = [];
          this.finished = false;
          this.listData.current = 1;
          this.listData.total = 0;
          this.getProductList();
          if (this.$refs.goodsArea) {
            this.$refs.goodsArea.scrollTop = 0
          }
        } else if (action == "cancel") {
          done();
        }
        done();
      },
      jgClose(action, done) {
        if (this.pricevalue != "" && action == "confirm") {
          let data = [{
            id: this.product.id,
            oldPrice: this.pricevalue
          }];
          banchUpdatePrice(data).then(() => {
            this.productList = [];
            this.finished = false;
            this.listData.current = 1;
            this.listData.total = 0;
            this.getProductList();
          });
        } else if (action == "cancel") {
          done();
        } else {
          Toast.fail("价格不能为空！");
          done(false);
        }
        done();
      },
      zkClose(action, done) {
        if (action == "confirm") {
          if (!this.discountvalue) {
            Toast.fail("折扣不能为空！");
            done(false);
          } else if (this.discountvalue > 10 || this.discountvalue < 0) {
            Toast.fail("折扣最大为10最小为0！");
            done(false);
          } else {
            if (this.isBanch) {
              this.showCheckbox = false;
              let datas = [];
              for (let i in this.productList) {
                if (this.productList[i].checked) {
                  let data = {
                    id: this.productList[i].id,
                    newPrice: this.discountvalue * this.productList[i].oldPrice * 0.1
                  };
                  datas.push(data);
                }
              }
              banchUpdatePrice(datas).then(() => {
                this.productList = [];
                this.finished = false;
                this.listData.current = 1;
                this.listData.total = 0;
                this.getProductList();
              });
            } else {
              let data = [{
                id: this.product.id,
                newPrice: this.discountvalue * this.product.oldPrice * 0.1
              }];
              banchUpdatePrice(data).then(() => {
                this.productList = [];
                this.finished = false;
                this.listData.current = 1;
                this.listData.total = 0;
                this.getProductList();
              });
            }
          }

        } else if (action == "cancel") {
          done();
        }
        done();
      },
      //编辑按钮
      goodEdit(product) {
        this.showEdit = true;
        this.pricevalue = "";
        this.discountvalue = "";
        this.product = product;
        this.isBanch = false;
      },
      selectChecked(item) {
        this.sortType = item.key;
        this.showSelect = false;
      },
      editChecked(item) {
        if (item.key == 1) {
          this.editPrice(1);
        } else if (item.key == 2) {
          this.editZhekou(1);
        }
      },
      selectType() {
        this.showSelect = true;
      },
      shaixuan() {
        this.showShaixuan = true;
      },
      batchEdit() {
        if (this.showCheckbox) {
          this.showCheckbox = false;
        } else {
          this.showCheckbox = true;
        }
      },
      banchConfirm() {
        let haveCheck = false;
        for (let i in this.productList) {
          if (this.productList[i].checked) {
            haveCheck = true;
          }
        }
        if (haveCheck) {
          this.isBanch = true;
          this.showZhekou = true;
        } else {
          Toast.fail("请选择商品！");
        }
      },
      details(product) {
        this.$router.push({
          path: "/entrance/productList/productDetail",
          query: {
            product: product
          }
        });
      }
    },
    watch: {
      goodCode() {
        this.productList = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        this.getProductList();
      },
      sortType() {
        this.productList = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        this.getProductList();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .base-box {
    height: 100%;

    .price-manage {
      height: 100%;
      // overflow: hidden;

      overflow-y: scroll;

      .btn {
        position: fixed;
        bottom: 0;
        border-radius: 1.375rem;
        background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
        color: #fff;
        font-size: 1.2rem;
        padding: 0 1rem;
        width: 92%;
        margin-bottom: .375rem;
        left: 50%;
        margin-left: -46%;
      }

      .box-header {
        padding: 1rem 0;
        margin: 0 auto;
        width: 90%;
        justify-content: space-around;
        height: 3rem;
        // background: #fff;
        align-items: center;

        .search {
          padding: 0;
          height: 3rem;
          border-radius: 0.375rem;
          background: #fff;
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
        }
      }

      .product-item {
        height: calc(100% - 8.5rem);
        background: #fff;
        margin: 0 auto;
        width: 90%;
        box-sizing: border-box;
        border-radius: 0.375rem;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
        padding: 2rem 0;
        overflow: hidden;

        .card-row {
          padding: 0 1rem;
        }

        /deep/ .van-card__title {
          white-space: normal;
        }

        //以下最新
        .btn-select {
          border: 1px solid rgba(143, 155, 179, 0.5);
          border-radius: 0.25rem;
          width: 4.7rem;
          height: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .select-message {
            margin-left: 1rem;
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
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

        .btn-screen {
          border: 1px solid rgba(143, 155, 179, 0.5);
          border-radius: 0.25rem;
          width: 5rem;
          height: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          float: right;

          .select-message {
            margin: 0 auto;
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            letter-spacing: 0;
          }
        }

        .shadow-row {
          box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
          border-bottom: 1px solid rgba(143, 155, 179, 0.05);
        }

        .goods-area {
          height: 95%;
          overflow-y: scroll;
          margin-top: 2rem;

          .goods-item {
            // padding: 1rem .5rem 1rem 0;
            padding: 1rem;

            .checkbox-area {
              margin-top: 1.1rem;
            }

            .goods-img {
              height: 3.5rem;
              width: 3.5rem;
              float: left;
            }

            .goods-name {
              font-family: PingFangSC-Semibold;
              font-size: 0.875rem;
              color: #222b45;
              text-align: left;
            }

            .goods-stock {
              font-family: PingFangSC-Regular;
              font-size: 0.75rem;
              color: #222b45;
              text-align: right;
            }

            .goods-price {
              font-family: PingFangSC-Regular;
              font-size: 0.75rem;
              color: #222b45;
              text-align: left;
              margin-top: 0.2rem;
            }

            .goods-in-price {
              font-family: PingFangSC-Regular;
              font-size: 0.75rem;
              color: #8f9bb3;
              text-align: left;
              margin-top: 0.2rem;
            }

            .btn-edit {
              border: 1px solid rgba(143, 155, 179, 0.5);
              border-radius: 0.25rem;
              width: 3.75rem;
              height: 1.875rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              float: right;
              margin: 0.7rem auto 0;

              .edit-message {
                font-family: PingFangSC-Regular;
                font-size: 0.75rem;
                color: #222b45;
                text-align: center;
                margin: 0 auto;
              }
            }
          }
        }

        //以上最新

        .p-title {
          padding: 5% 4%;
          display: flex;
          font-weight: bold;
        }

        .item-text {
          text-align: left;
          padding-left: 0.7rem;
          margin: 0.3rem 0;
          font-size: 0.875rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          position: relative;
          top: 40%;
          color: #222b45;
        }

        .v-btn {
          border: 1px solid #8f9bb3;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          color: #222b45;
          width: 3.75rem;
          height: 1.875rem;
          line-height: 1.875rem;
          position: relative;
          display: flex;
          left: 75%;
        }

        .in-p {
          font-size: 0.75rem;
          opacity: 0.5;
          font-family: PingFangSC-Regular;
          color: #8f9bb3;
        }
      }

      .no-goods {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        top: 8%;

        span {
          opacity: 0.5;
          color: #000;
          margin-top: 2.5rem;
        }
      }
    }

    .arrow {
      position: absolute;
      right: -1rem;
      top: 38%;
      font-size: 1.1rem;
    }

    .van-card {
      position: relative;
      box-sizing: border-box;
      padding: 8px 16px;
      color: #323233;
      font-size: 12px;
      background-color: #fff;
    }

    .van-search__content {
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

    .van-card__thumb {
      height: auto;
    }

    /deep/ .van-sidebar {
      width: 85px;
      background: #fafafa;
    }

    /deep/ .van-card__title {
      text-align: left;
      padding-left: 0.7rem;
      font-size: 1rem;
      padding-top: 0.5rem;
      color: #222b45;
      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /deep/ .van-dialog {
      .van-dialog__content {
        .priceInput {
          width: 15.5rem;
          height: 2.6rem;
          margin: 2rem auto;
          background: rgba(143, 155, 179, 0.1);
          border: 1px solid rgba(143, 155, 179, 0.1);
          border-radius: 6px;
          font-size: 1.25rem;
          border-radius: 6px;

          .van-field__left-icon {
            color: #8f9bb3;
            line-height: 1.25rem;

            i {
              font-size: 1.5rem;
            }
          }
        }

        .priceInput-Z {
          width: 9.375rem;
          height: 2.6rem;
          margin: 2rem auto;
          background: rgba(143, 155, 179, 0.1);
          border: 1px solid rgba(143, 155, 179, 0.1);
          border-radius: 0.375rem;
          font-size: 1.25rem;

          .van-field__left-icon {
            color: #8f9bb3;
            line-height: 1.25rem;

            i {
              font-size: 1.5rem;
            }
          }
        }

        .shaixuan-row {
          margin: 2rem auto;

          .shaixuan-left {
            width: 7.125rem;
            height: 2.6rem;
            background: rgba(143, 155, 179, 0.1);
            border: 1px solid rgba(143, 155, 179, 0.1);
            border-radius: 0.375rem;
            font-size: 1.25rem;
            margin: 0 auto;

            .van-field__left-icon {
              color: #8f9bb3;
              line-height: 1.25rem;

              i {
                font-size: 1.5rem;
              }
            }
          }

          .shaixuan-text {
            font-family: PingFangSC-Semibold;
            font-size: 2rem;
            color: #222b45;
            text-align: right;
            display: flex;
            flex-direction: row;
            align-items: center;

            div {
              margin: 0 auto;
            }
          }

          .shaixuan-right {
            width: 7.125rem;
            height: 2.6rem;
            background: rgba(143, 155, 179, 0.1);
            border: 1px solid rgba(143, 155, 179, 0.1);
            border-radius: 0.375rem;
            font-size: 1.25rem;
            margin: 0 auto;

            .van-field__left-icon {
              color: #8f9bb3;
              line-height: 1.25rem;

              i {
                font-size: 1.5rem;
              }
            }
          }
        }

        .zhe-text {
          position: absolute;
          top: 15%;
          right: 16%;
          font-family: PingFangSC-Semibold;
          font-size: 1.25rem;
          color: #8f9bb3;
          text-align: right;
        }

        .van-dialog__footer {
          .van-button {
            width: 7.5rem;
            height: 2.25rem;
            border: 1px solid #8f9bb3;
            border-radius: 1.125rem;
          }
        }
      }
    }
  }
</style>
