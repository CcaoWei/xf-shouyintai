<template>
  <!--  <div class="baseBody">-->
  <div class="baseBody" v-if="$route.path == '/entrance/orderManage'">
    <van-tabs @click="checkTab" v-model="tabStatus">
      <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" :name="tab.status"></van-tab>
    </van-tabs>
    <div class="count-box" v-show="tabStatus == 1">
      <div class="info-area">
        <van-row>
          <van-col span="12">
            <div class="header-text">汇总报表</div>
          </van-col>
          <van-col span="12">
            <div class="header-gray">总订单：{{ totleList }}笔</div>
          </van-col>
        </van-row>
        <dataPicker
          :isAllCanShowPicker="false"
          @checkType="dataCheckType"
          @dataConfirm="onConfirm"
          :reload="reloadDate"
          @setReload="setReload"
        ></dataPicker>

        <div id="main" style="height: 17rem"></div>
      </div>
      <div class="order-area" v-if="orderList.length">
        <div class="title">订单列表</div>
        <van-pull-refresh v-if="orderList.length" v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                    offset="1">
            <van-row
              class="order-item shadow-row"
              v-for="(item, index) in orderList"
              :key="index"
              @click="details(item.id)"
            >
              <van-col span="2">
                <img class="order-img" src="/static/order-icon.png" alt/>
              </van-col>
              <van-col span="12" style="margin-left:0.625rem">
                <div class="order-name">{{ item.id }}</div>
                <div class="order-info">支付方式：{{ item.paymentName }}</div>
                <div class="order-info">销售店员：{{ item.createName }}</div>
              </van-col>
              <van-col span="10">
                <div class="order-date">{{ item.createTime }}</div>
                <div class="order-info">&nbsp;</div>
                <div class="order-price">+{{ item.amountActuallyPaid }}</div>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>

      </div>
    </div>

    <div class="search-area" v-show="tabStatus == 2">
      <div class="box-header">
        <van-search class="search" @input="inputChange" placeholder="请输入查询订单号" v-model="orderCode"/>
      </div>
      <div class="info-area">
        <div class="header-text" v-if="isShowSelect">订单列表</div>
        <div class="header-text" v-else>查询结果</div>


        <!-- 查询显示的日期选择 -->
        <dataPicker
          :isAllCanShowPicker="true"
          @checkType="dataCheckType"
          v-if="isShowSelect"
          @dataConfirm="onConfirm"
          :reload="reloadDate"
          @setReload="setReload"
        ></dataPicker>

        <van-pull-refresh v-if="orderList.length" v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                    offset="1">
            <div class="order-area">
              <van-row
                class="order-item shadow-row"
                v-for="(item, index) in orderList"
                :key="index"
                @click="details(item.id)"
              >
                <van-col span="2">
                  <img class="order-img" src="/static/order-icon.png" alt/>
                </van-col>
                <van-col span="12" style="margin-left:0.625rem">
                  <div class="order-name">{{ item.id }}</div>
                  <div class="order-info">支付方式：{{ item.paymentName }}</div>
                  <div class="order-info">销售店员：{{ item.createName }}</div>
                </van-col>
                <van-col span="10">
                  <div class="order-date">{{ item.createTime }}</div>
                  <div class="order-info">&nbsp;</div>
                  <div class="order-price">+{{ item.amountActuallyPaid }}</div>
                </van-col>
              </van-row>
            </div>
          </van-list>
        </van-pull-refresh>
        <no-goods v-else></no-goods>
      </div>
    </div>
  </div>
  <div class="detail-content" v-else>
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>
  <!--  </div>-->
</template>

<script>
  // import {Dialog} from "vant";
  // import {getInventoryList, deleteInventory} from "@/api/inventory";
  import {cashCount, selectOrders} from "@/api/store";
  import echarts from "echarts";
  import dataPicker from "../../components/dataPicker";
  import noGoods from "@/components/stock/noDoods";
  import {Toast} from "vant";

  export default {
    components: {dataPicker, noGoods},
    data() {
      return {
        isShowSelect: true,//是否显示查询结果
        tabs: [
          {
            title: "订单统计",
            status: 1
          },
          {
            title: "订单查询",
            status: 2
          }
        ],
        dataType: {},
        tabStatus: 1,
        show: false,
        orderCode: "",
        tabStatusData: "",//保存日期
        canvasData: {}, //绘制图表的数据
        orderList: [], //订单列表
        totleList: 0, //总订单数
        reloadDate: false,
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
    methods: {
      onRefresh() {
        Toast("刷新成功");
        this.orderList = [];
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
        this.getSelectOrders();
      },
      setReload(flag) {
        this.reloadDate = flag;
      },
      inputChange(value) {//搜索框实现
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        if (value == "") {
          this.isShowSelect = true;
          this.orderList = [];
          let obj = {
            dateTime: this.tabStatusData
          }
          this.getSelectOrders(obj)
        } else {
          this.isShowSelect = false;
          this.orderList = [];
          let obj = {
            id: value
          }
          this.getSelectOrders(obj)
        }
      },
      getSelectOrders(data) {
        let params = {...data};
        params.current = this.listData.current;
        params.size = this.listData.size;
        //订单列表
        selectOrders(params).then(res => {
          let newOfRes = JSON.parse(JSON.stringify(res.data.data));
          this.orderList = [...this.orderList, ...newOfRes.records];
          this.listData.total = newOfRes.total;
          this.loading = false;
          if (this.orderList.length == this.listData.total) {
            this.finished = true;
          }
        });
      },
      getBaseDetail(data) {
        //统计图表
        cashCount(data).then(res => {
          if (res.status == 200) {
            let xAxisArr = [];
            let yAxisArr = [];

            res.data.data.forEach(element => {
              this.totleList = parseInt(element.total);
              // this.totleList += Number(element.count)
              xAxisArr.push(element.dateTime);
              yAxisArr.push(element.count);
            });
            this.canvasData = {
              x: xAxisArr,
              y: yAxisArr
            };
            this.drawLine(xAxisArr, yAxisArr);
          }
        });
      },
      checkTab(status) {
        this.reloadDate = true;
        this.dateType = "year";
        this.tabStatus = status;
        if (this.tabStatus == 1) {
          this.getBaseDetail({status: 1});
        }
        this.orderList = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        this.getSelectOrders();

      },
      drawLine(x, y) {
        this.charts = echarts.init(document.getElementById("main"));

        this.charts.setOption({
          tooltip: {},
          legend: {
            data: ["详情"]
          },
          xAxis: {
            // data: xAxis
            data: x
          },
          yAxis: {},
          series: [
            {
              // data: series,
              data: y,
              type: "line",
              smooth: true,
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset: 1, color: "#FFFFFF"},
                    {offset: 0, color: "#0F6EFF"}
                  ])
                }
              }, //填充区域样式
              lineStyle: {
                color: "#0F6EFF",
                width: 1
              }, //线条的样式
              itemStyle: {
                color: "rgb(255, 70, 131)",
                opacity: 0 //为0不会绘制图形拐点消失
              } //拐点的样式
            }
          ]
        });
      },
      onConfirm(value) {
        this.orderList = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        this.tabStatusData = value;
        if (this.tabStatus == 1) {//订单统计
          let data = {
            status: 1,
            dateTime: value
          }
          this.getBaseDetail(data)
        } else {//订单查询
          let data = {
            dateTime: value
          }
          this.getSelectOrders(data)
        }
      },
      details(id) {
        this.$router.push({
          path: "/entrance/orderManage/details",
          query: {
            id: id
          }
        });
      },
      dataCheckType(value) {
        let newData = new Date();
        if (this.tabStatus == 1) {
          let obj = {
            status: 1,
            dateTime: ""
          };
          switch (value) {
            case 1:
              this.getBaseDetail(obj);
              break;
            case 2:
              obj.dateTime = newData.format("yyyy");
              this.getBaseDetail(obj);
              break;
            case 3:
              obj.dateTime = newData.format("yyyy-MM");

              this.getBaseDetail(obj);
              break;
            default:
              break;
          }
        } else {
          this.orderList = [];
          this.finished = false;
          this.listData.current = 1;
          this.listData.total = 0;
          let objData = {
            dateTime: ""
          };
          switch (value) {
            case 1:
              objData.dateTime = newData.format("yyyy");
              this.getSelectOrders(objData);
              break;
            case 2:
              objData.dateTime = newData.format("yyyy-MM");
              this.getSelectOrders(objData);
              break;
            case 3:
              objData.dateTime = newData.format("yyyy-MM-dd");
              this.getSelectOrders(objData);
              break;
            default:
              break;
          }
        }
      }
    },
    activated() {
      if (this.$route.path == '/entrance/orderManage') {
        this.reloadDate = true;
        this.dateType = "year";
        if (this.tabStatus == 1) {
          this.getBaseDetail({status: 1});
        }
        this.isLoading = true;
        this.loading = false;
        this.finished = false;
        this.orderList = [];
        this.listData = {
          current: 1,
          size: 30,
          total: 0
        };
        this.getSelectOrders();
      }

      // if (this.$route.path == "/entrance/orderManage") {
      //   this.$nextTick(function() {
      //     this.drawLine();
      //   });
      // }
    }
  };
</script>

<style lang="scss" scoped>
  .baseBody {
    height: 100%;
    overflow-y: scroll;

    .info-area {
      background: #fff;
      width: 89.3%;
      border-radius: 0.3rem;
      padding: 1.25rem;
      box-sizing: border-box;
      margin: 1.25rem auto 0;
      min-height: 77%;

      .shadow-row {
        box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
        border-bottom: 1px solid rgba(143, 155, 179, 0.05);
      }

      .header-text {
        font-family: PingFangSC-Semibold;
        font-size: 1.125rem;
        color: #222b45;
        letter-spacing: 0;
        text-align: left;
        margin-left: 0.5rem;
      }

      .header-gray {
        opacity: 0.5;
        font-family: PingFangSC-Light;
        font-size: 0.875rem;
        color: #222b45;
        letter-spacing: 0;
        text-align: right;
        padding-right: 0.5rem;
      }

      .check-date {
        margin-top: 1rem;
        padding-right: 0.5rem;

        .check-btn {
          border-radius: 0.25rem;
          background-color: #fff;
          color: #222b45;
          font-size: 0.875rem;
          padding: 0 1rem;
          height: 1.5rem;
          line-height: 0 !important;
          float: left;
        }

        .check-btn-checked {
          background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
          color: #fff;
        }

        .btn-calendar {
          height: 1.5rem;
          float: right;
        }
      }
    }

    .search-area {
      height: 100%;
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

    /deep/ .van-hairline--top-bottom::after {
      border-width: 0 !important;
    }

    .count-box {
      .order-area {
        background: #fff;
        width: 89.3%;
        border-radius: 0.3rem;
        margin: 0.75rem auto 1rem;
        padding: 1.25rem;
        box-sizing: border-box;

        .title {
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #222b45;
          letter-spacing: 0;
          line-height: 1.125rem;
          width: 100%;
          text-align: left;
        }

        .order-item {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 1rem 0.5rem 1rem 0;
          box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);

          .order-img {
            height: 1.5rem;
            width: 1.5rem;
          }

          .order-name {
            font-family: PingFangSC-Semibold;
            font-size: 0.875rem;
            color: #222b45;
            text-align: left;
          }

          .order-info {
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            text-align: left;
            opacity: 0.5;
          }

          .order-date {
            font-family: PingFangSC-Regular;
            font-size: 0.75rem;
            color: #222b45;
            text-align: right;
          }

          .order-price {
            font-family: PingFangSC-Semibold;
            font-size: 1rem;
            color: #222b45;
            text-align: right;
          }
        }
      }
    }

    .search-area {
      .box-header {
        border-radius: 0.3rem !important;
        background: #fff !important;
        margin: 1rem auto 0 !important;
        width: 88% !important;
        justify-content: space-around !important;
        height: 3rem !important;
        align-items: center !important;

        .search {
          padding: 0 !important;
          height: 3rem !important;
          border-radius: 0.375rem !important;
          background: #fff !important;
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06) !important;
        }
      }

      .order-area {
        background: #fff;
        // width: 89.3%;
        border-radius: 0.3rem;
        // margin: 0.75rem auto 1rem;
        // padding: 1.25rem;
        box-sizing: border-box;

        .title {
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #222b45;
          letter-spacing: 0;
          line-height: 1.125rem;
          width: 100%;
          text-align: left;
        }

        .order-item {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 1rem 0.5rem 1rem 0;
          box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);

          .order-img {
            height: 1.5rem;
            width: 1.5rem;
          }

          .order-name {
            font-family: PingFangSC-Semibold;
            font-size: 0.875rem;
            color: #222b45;
            text-align: left;
          }

          .order-info {
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            text-align: left;
            opacity: 0.5;
          }

          .order-date {
            font-family: PingFangSC-Regular;
            font-size: 0.75rem;
            color: #222b45;
            text-align: right;
          }

          .order-price {
            font-family: PingFangSC-Semibold;
            font-size: 1rem;
            color: #222b45;
            text-align: right;
          }
        }
      }
    }

    /deep/ .van-search__content {
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
  }

  .detail-content {
    height: 100%;
    width: 100%;
  }


</style>
