<template>
  <div>
    <van-tabs @click="checkTab" v-model="tabStatus">
      <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" :name="tab.status">
      </van-tab>
    </van-tabs>
    <div class="echart-data" v-show="tabStatus == 1">
      <div class="rexiao-area">
        <div class="rexiao-title">流量统计</div>
        <dataPicker :isAllCanShowPicker="false" @dataConfirm="onConfirm" @checkType="checkType"></dataPicker>
      </div>
      <div class="line-img">
        <div id="keliuliang" style="width: 88vw;height: 17rem"></div>
      </div>
      <div class="info-area">
        <div class="header-text">详细信息（人次）</div>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="16">总流量</van-col>
          <van-col class="font-number" span="8">{{
            shopData.totalCount
            }}
          </van-col>
<!--          <van-col class="font-red" v-if="shopData.totalCountPercent.indexOf('+')!=-1" span="4">-->
<!--            {{shopData.totalCountPercent }}-->
<!--          </van-col>-->
<!--          <van-col class="font-red" v-else span="4">-->
<!--            {{shopData.totalCountPercent}}-->
<!--          </van-col>-->
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="16">今日流量</van-col>
          <van-col class="font-number" span="8">
            {{shopData.totalCountOfDay}}
          </van-col>
<!--          <van-col class="font-red" v-if="shopData.totalCountPercentOfDay.indexOf('+')!=-1" span="4">-->
<!--            {{shopData.totalCountPercentOfDay}}-->
<!--          </van-col>-->
<!--          <van-col class="font-green" v-else span="4">-->
<!--            {{shopData.totalCountPercentOfDay}}-->
<!--          </van-col>-->
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="16">单月流量</van-col>
          <van-col class="font-number" span="8">
            {{shopData.totalCountOfMonth}}
          </van-col>
<!--          <van-col class="font-red" v-if="shopData.totalCountPercentOfMonth.indexOf('+')!=-1" span="4">-->
<!--            {{shopData.totalCountPercentOfMonth}}-->
<!--          </van-col>-->
<!--          <van-col class="font-green" v-else span="4">-->
<!--            {{shopData.totalCountPercentOfMonth}}-->
<!--          </van-col>-->
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="16">单年流量</van-col>
          <van-col class="font-number" span="8">
            {{shopData.totalCountOfYear}}
          </van-col>
<!--          <van-col class="font-red" v-if="shopData.totalCountPercentOfYear.indexOf('+')!=-1" span="4">-->
<!--            {{shopData.totalCountPercentOfYear}}-->
<!--          </van-col>-->
<!--          <van-col class="font-green" v-else span="4">-->
<!--            {{shopData.totalCountPercentOfYear}}-->
<!--          </van-col>-->
        </van-row>
      </div>
    </div>
    <div class="echart-data" v-show="tabStatus == 2">
      <div class="rexiao-area">
        <div class="rexiao-title">订单统计</div>
        <dataPicker :isAllCanShowPicker="false" @dataConfirm="onConfirm" @checkType="checkType"></dataPicker>
      </div>
      <div class="line-img">
        <div id="kedanbaobiao" style="width: 88vw ;height: 17rem;"></div>
      </div>
      <van-row class="kedan-message">
        <van-col class="kedan-left" span="8">
          <div class="kedan-gray">客流量(人)</div>
          <div class="kedan-number">{{ reportForms.customerCount }}</div>
        </van-col>
        <van-col class="kedan-center" span="8">
          <div class="kedan-gray">订单量(笔)</div>
          <div class="kedan-number">{{ reportForms.orderCount }}</div>
        </van-col>
        <van-col class="kedan-right" span="8">
          <div class="kedan-gray">客单价(元)</div>
          <div class="kedan-number">{{ reportForms.perSales }}</div>
        </van-col>
      </van-row>
    </div>
    <div class="echart-data" v-show="tabStatus == 3">
      <div class="rexiao-area">
        <div class="rexiao-title">商品排名</div>
        <dataPicker :isAllCanShowPicker="true" @dataConfirm="onConfirm" @checkType="checkType"></dataPicker>
        <div class="goods-area" v-if="hotGoods.length">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
            <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                      offset="1">
              <van-row v-for="(item, index) in hotGoods" :key="index" class="goods-item shadow-row" @click="details(item)">
                <van-col span="4">
                  <div class="goods-ranking">{{ index + 1 }}</div>
                </van-col>
                <van-col span="5">
                  <img class="goods-img" :src="item.img?item.img:'/static/no-img-cn.png'" />
                </van-col>
                <van-col span="15">
                  <div class="goods-name">{{ item.name }}</div>
                  <div class="goods-info">
                    <span class="goods-price">售价：¥{{ item.newPrice }}</span>
                    <span class="goods-sales">销量：{{ item.stock }}</span>
                  </div>
                </van-col>
              </van-row>
            </van-list>
          </van-pull-refresh>

        </div>
        <no-goods v-else></no-goods>
      </div>
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

.echart-data {
  background: #fff;
  width: 88%;
  border-radius: 0.3rem;
  margin: 2rem auto 0;
  padding: 1em 0 0 0.5rem;

  .line-img {
    width: 100%;
    height: 17rem;
    overflow: hidden;
    overflow-x: scroll;
  }

  .shadow-row {
    box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
    border-bottom: 1px solid rgba(143, 155, 179, 0.05);
  }

  .info-area {
    .header-text {
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #222b45;
      letter-spacing: 0;
      text-align: left;
      margin-left: 0.5rem;
    }

    .card-row {
      padding: 1rem 0.5rem;

      .font-title {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        text-align: left;
      }

      .font-number {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        text-align: right;
      }

      .font-red {
        font-family: PingFangSC-Regular;
        font-size: 0.75rem;
        color: #f15245;
        letter-spacing: 0;
        text-align: right;
      }

      .font-green {
        font-family: PingFangSC-Regular;
        font-size: 0.75rem;
        color: #4bc194;
        letter-spacing: 0;
        text-align: right;
      }
    }
  }

  .kedan-message {
    padding: 1rem 0;

    .kedan-left {
      border-right: 1px solid rgba(34, 43, 69, 0.2);
    }

    .kedan-center {
    }

    .kedan-right {
      border-left: 1px solid rgba(34, 43, 69, 0.2);
    }

    .kedan-gray {
      font-family: PingFangSC-Light;
      font-size: 0.75rem;
      color: rgba(34, 43, 69, 0.5);
    }

    .kedan-number {
      font-family: PingFangSC-Medium;
      font-size: 1rem;
      color: #222b45;
      letter-spacing: 0;
    }
  }

  .rexiao-area {
    .rexiao-title {
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #222b45;
      letter-spacing: 0;
      text-align: left;
    }

    .rexiao-date {
      margin-top: 1rem;
      padding-right: 0.5rem;

      .rexiao-btn {
        border-radius: 0.25rem;
        background-color: #fff;
        color: #222b45;
        font-size: 0.875rem;
        padding: 0 1rem;
        height: 1.5rem;
        line-height: 0 !important;
        float: left;
      }

      .rexiao-btn-checked {
        background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
        color: #fff;
      }

      .rexiao-calendar {
        height: 1.5rem;
        float: right;
      }
    }

    .goods-area {
      margin-top: 2rem;

      .goods-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 1rem 0.5rem 1rem 0;

        .goods-ranking {
        }

        .goods-img {
          height: 3.5rem;
          width: 3.5rem;
        }

        .goods-name {
          font-family: PingFangSC-Semibold;
          font-size: 0.875rem;
          color: #222b45;
          text-align: left;
        }

        .goods-info {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .goods-price {
            font-family: PingFangSC-Regular;
            font-size: 0.75rem;
            color: #222b45;
            text-align: left;
          }

          .goods-sales {
            font-family: PingFangSC-Regular;
            font-size: 0.75rem;
            color: #222b45;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>

<script>
import echarts from "echarts";
import {
  hotGoods,
  guestOrders,
  guestFlowStatistics,
  shopDetails
} from "@/api/priceManage";
import { mapGetters } from "vuex";
import { dateFormat } from "../../util/date";
import dataPicker from "../../components/dataPicker";
import noGoods from "@/components/stock/noDoods";
import {Toast} from "vant";

export default {
  components: { dataPicker, noGoods },
  data() {
    return {
      tabs: [
        {
          title: "客流量",
          status: 1
        },
        {
          title: "客单报表",
          status: 2
        },
        {
          title: "热销商品",
          status: 3
        }
      ],
      tabStatus: 1,
      btnCheck: 1,
      // 日期选择器
      minDate: new Date(2017, 0, 1),
      maxDate: new Date(2022, 10, 1),
      dateType: "date", //弹框类型，默认为date
      currentDate: new Date(),
      //---------------以上为最新代码
      gradientColor: {
        "0%": "#FF7901 ",
        "100%": "#FE5845"
      },
      dateSelected: "", //选中日期
      showDateBtn: false, //是否显示日期选择图标
      showDatePicker: false, //是否显示日期弹框
      dateNowYear: dateFormat(new Date(), "yyyy"), //当前年
      dateNowMonth: dateFormat(new Date(), "yyyy-MM"), //当前月份
      dateNowDay: dateFormat(new Date(), "yyyy-MM-dd"), // 当前日期
      hotGoods: [],
      hotTime: "",
      reportForms: {
        xAxis: [],
        series1: [],
        series2: []
      }, //客单报表
      guestForms: {
        xAxis: [],
        series: []
      }, //客流量
      shopData: {
        totalCountPercent:"+0%",
        totalCountPercentOfDay:"+0%",
        totalCountPercentOfMonth:"+0%",
        totalCountPercentOfYear:"+0%",
      },
      dateStr: "",
      confirmType: 3,
      tipText: "客流量",
      isLoading: true,
      loading: false,
      finished: false,
      listData: {
        current: 0,
        size: 15,
        total: 0
      },
      listParams:{}
    };
  },
  computed: {
    ...mapGetters(["dateSelect", "bordTabStatus"])
  },
  mounted() {
    this.tabStatus = this.bordTabStatus;
  },
  created() {
    this.dateSelected = this.dateSelect.date;
    this.$nextTick(function() {
      // 客流量
      this.getGuestData({ type: 3, dateStr: this.dateNowYear });
      this.getGuestData({ type: 3, dateStr: this.dateNowYear });
      this.shopDetails();
      // 客单报表
      this.getGuestOrdersData(3, this.dateNowYear);
      // this.getGuestOrders({type: 3, dateStr: this.dateNowYear});
      // 热销商品
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.listData = {
        current: 1,
        size: 15,
        total: 0
      }
      this.listParams = {
        type: 1,
        date: this.dateNowYear
      };
      this.getHotGoods();
    });
  },
  methods: {
    onRefresh() {
      Toast("刷新成功");
      this.hotGoods = [];
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
      this.getHotGoods();
    },
    details(item) {
      this.$router.push({
        path: "/entrance/productList/productDetail",
        query: {
          product: item
        }
      });
    },
    getGuestOrdersData(type, dateStr, datefrom) {
      guestOrders({ type: type, dateStr: dateStr, datefrom: datefrom }).then(
        res => {
          // console.log(res.data.data);
          this.reportForms = res.data.data;
          let arr1 = [];
          let arr2 = [];
          let arr3 = [];
          res.data.data.vo.forEach(item => {
            arr1.push(item.perDate);
            arr2.push(item.grossNum);
            arr3.push(item.grossMargin);
          });
          this.reportForms.xAxis = arr1;
          this.reportForms.series1 = arr2;
          this.reportForms.series2 = arr3;
          this.loadKedanbaobiao(
            this.reportForms.xAxis,
            this.reportForms.series1,
            this.reportForms.series2
          );
        }
      );
    },
    // 日期格式化
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    onConfirm(value, type) {
      // 热销商品页
      this.hotGoods = [];
      this.listData.current = 1;
      this.listData.total = 0;
      this.finished = false;
      if (this.tabStatus == 3) {
        this.confirmType = type;
        this.dateStr = value;
        if (type == 1) {
          this.listParams = {
            type: 1,
            date: value
          };
          this.getHotGoods();
        } else if (type == 2) {
          this.listParams = {
            type: 2,
            date: value
          };
          this.getHotGoods();
        } else if (type == 3) {
          this.listParams = {
            type: 3,
            date: value
          };
          this.getHotGoods();
        }
      }
      // 客单报表页
      else if (this.tabStatus == 2) {
        this.dateStr = value + "-01";
        if (type == 2) {
          this.confirmType = 2;
          this.getGuestOrdersData(this.confirmType, this.dateStr);
        } else if (type == 3) {
          this.confirmType = 1;
          this.getGuestOrdersData(this.confirmType, this.dateStr);
        }
      }
      // 客流量统计页
      else if (this.tabStatus == 1) {
        this.dateStr = value;
        if (type == 2) {
          guestFlowStatistics({ type: 2, dateStr: value + "-01" }).then(res => {
            if (res.status === 200) {
              this.guestForms = res.data.data;
              let arr1 = [];
              let arr2 = [];
              this.guestForms.customerCountVo.forEach(item => {
                arr1.push(item.perDate);
                arr2.push(item.count);
              });
              this.guestForms.xAxis = arr1;
              this.guestForms.series = arr2;

              this.drawLine(this.guestForms.xAxis, this.guestForms.series);
            }
          });
        } else if (type == 3) {
          guestFlowStatistics({ type: 1, dateStr: value + "-01" }).then(res => {
            if (res.status === 200) {
              this.guestForms = res.data.data;
              let arr1 = [];
              let arr2 = [];
              this.guestForms.customerCountVo.forEach(item => {
                arr1.push(item.perDate), arr2.push(item.count);
              });
              this.guestForms.xAxis = arr1;
              this.guestForms.series = arr2;
              this.drawLine(this.guestForms.xAxis, this.guestForms.series);
            }
          });
        }
      }
    },

    // 请求销售统计数据
    // getSalesData(type) {
    //   window.console.log(type);
    // },

    // 切换年月日类型（热销商品）
    checkType(type) {
      //热销商品页的情况
      if (this.tabStatus == 3) {
        this.hotGoods = [];
        this.listData.current = 1;
        this.listData.total = 0;
        this.finished = false;
        if (type == 1) {
          this.listParams = { type: this.btnCheck, date: this.dateNowYear };
          this.getHotGoods();
        } else if (type == 2) {
          this.listParams = { type: this.btnCheck, date: this.dateNowMonth };
          this.getHotGoods();
        } else {
          this.listParams = { type: this.btnCheck, date: this.dateNowDay };
          this.getHotGoods();
        }
      }
      // 客单报表处理
      else if (this.tabStatus == 2) {
        if (type == 1) {
          this.dateStr = this.dateNowYear + "";
          this.confirmType = 3;
          //选择年按钮
          this.getGuestOrdersData(3, this.dateNowYear);
        } else if (type == 2) {
          this.confirmType = 2;
          this.dateStr = this.dateNowMonth + "";
          //选择月按钮
          guestOrders({ type: 2, dateStr: this.dateNowMonth }).then(res => {
            // console.log(res.data.data);
            this.reportForms = res.data.data;
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            res.data.data.vo.forEach(item => {
              arr1.push(item.perDate);
              arr2.push(item.grossNum);
              arr3.push(item.grossMargin);
            });
            this.reportForms.xAxis = arr1;
            this.reportForms.series1 = arr2;
            this.reportForms.series2 = arr3;
            this.loadKedanbaobiao(
              this.reportForms.xAxis,
              this.reportForms.series1,
              this.reportForms.series2
            );
          });
        } else {
          this.confirmType = 1;
          this.dateStr = this.dateNowDay + "";
          //选择日按钮
          guestOrders({ type: 1, dateStr: this.dateNowDay }).then(res => {
            // console.log(res.data.data);
            this.reportForms = res.data.data;
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            res.data.data.vo.forEach(item => {
              arr1.push(item.perDate);
              arr2.push(item.grossNum);
              arr3.push(item.grossMargin);
            });
            this.reportForms.xAxis = arr1;
            this.reportForms.series1 = arr2;
            this.reportForms.series2 = arr3;
            this.loadKedanbaobiao(
              this.reportForms.xAxis,
              this.reportForms.series1,
              this.reportForms.series2
            );
          });
        }
      }
      // 客流量处理
      else {
        if (type == 1) {
          this.confirmType = 3;
          this.dateStr = "";
          this.getGuestData({ type: 3, dateStr: this.dateNowYear });
        } else if (type == 2) {
          this.confirmType = 2;
          this.dateStr = this.dateNowYear;
          this.getGuestData({ type: 2, dateStr: this.dateNowMonth });
        } else if (type == 3) {
          this.confirmType = 1;
          this.dateStr = this.dateNowMonth;
          this.getGuestData({ type: 1, dateStr: this.dateNowDay });
        }
      }
    },

    // 客流量统计
    drawLine(xAxis, series) {
      this.charts = echarts.init(document.getElementById("keliuliang"));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          show: true
          // axisPointer: {
          //   type: "shadow"
          // }
        },
        legend: {
          data: ["详情"]
        },
        xAxis: {
          data: xAxis
          // data: [1, 2, 3]
        },
        yAxis: {},
        series: [
          {
            // data: [222, 234, 156],
            name: this.tipText,
            data: series,
            type: "line",
            symbol: "circle",
            // symbolSize : 44,
            smooth: true,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "#FFFFFF" },
                  { offset: 0, color: "#0F6EFF" }
                ])
              }
            }, //填充区域样式
            lineStyle: {
              color: "#0F6EFF",
              width: 1
            }, //线条的样式
            itemStyle: {
              color: "#FF8900"
              // opacity: 0 //为0不会绘制图形拐点消失
            } //拐点的样式
          }
        ]
      });
      // this.charts.off('click');
      // this.charts.on("click", params => {
      //   this.shopDetails({type: this.confirmType, dateStr: this.dateStr + "-" + params.name});
      // });
      this.charts.getZr().off("click");
      this.charts.getZr().on("click", params => {
        const pointInPixel = [params.offsetX, params.offsetY];
        if (this.charts.containPixel("grid", pointInPixel)) {
          let xIndex = this.charts.convertFromPixel({ seriesIndex: 0 }, [
            params.offsetX,
            params.offsetY
          ])[0];
          /*事件处理代码书写位置*/
            this.shopDetails({
              type: this.confirmType,
              dateStr: this.confirmType==3?xAxis[xIndex]:this.dateStr + "-" + xAxis[xIndex]
            });
        }
      });
    },
    // 客单报表
    loadKedanbaobiao(xAxis, series1, series2) {
      // xAxis,series
      this.charts = echarts.init(document.getElementById("kedanbaobiao"));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xAxis
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        // series:series
        series: [
          {
            name: "毛利润",
            type: "bar",
            stack: "列1",
            data: series2,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#76ACFD" },
                { offset: 1, color: "#0F6EFF" }
              ])
            }
          },
          {
            name: "营业额",
            type: "bar",
            stack: "列1",
            data: series1,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FF8900" },
                { offset: 1, color: "#FC5D0E" }
              ])
            }
          }
        ]
      });
      this.charts.off("click");
      this.charts.on("click", params => {
        this.getGuestOrdersData(this.confirmType, this.dateStr, params.name);
      });
    },
    // 切换界面
    checkTab(status) {
      this.btnCheck = 1;
      this.dateType = "year-month";
      if (status == 2) {
        this.loadKedanbaobiao(
          this.reportForms.xAxis,
          this.reportForms.series1,
          this.reportForms.series2
        );
      } else if (status == 1) {
        this.showDateBtn = false;
        this.drawLine(this.guestForms.xAxis, this.guestForms.series);
      }
      this.tabStatus = status;
    },

    // 接口请求方法
    // 热销商品
    getHotGoods() {
      let params = {...this.listParams};
      params.current = this.listData.current;
      params.size = this.listData.size;
      hotGoods(params).then(res => {
        let newOfRes = JSON.parse(JSON.stringify(res.data.data));
        this.hotGoods = [...this.hotGoods, ...newOfRes.records];
        this.listData.total = newOfRes.total;
        this.loading = false;
        if (this.hotGoods.length == this.listData.total) {
          this.finished = true;
        }
      });
    },
    // 客流量
    getGuestData(data) {
      guestFlowStatistics(data).then(res => {
        if (res.status === 200) {
          this.guestForms = res.data.data;
          let arr1 = [];
          let arr2 = [];
          this.guestForms.customerCountVo.forEach(item => {
            arr1.push(item.perDate), arr2.push(item.count);
          });
          this.guestForms.xAxis = arr1;
          this.guestForms.series = arr2;
          this.drawLine(this.guestForms.xAxis, this.guestForms.series);
        }
      });
    },
    // 客单报表
    // getGuestOrders(data) {
    //   guestOrders(data).then(res => {
    //     // console.log(res.data.data);
    //     this.reportForms = res.data.data;
    //     let arr1 = [];
    //     let arr2 = [];
    //     let arr3 = [];
    //     res.data.data.vo.forEach(item => {
    //       arr1.push(item.perDate);
    //       arr2.push(item.grossNum);
    //       arr3.push(item.grossMargin);
    //     });
    //     this.reportForms.xAxis = arr1;
    //     this.reportForms.series1 = arr2;
    //     this.reportForms.series2 = arr3;
    //     this.loadKedanbaobiao(
    //       this.reportForms.xAxis,
    //       this.reportForms.series1,
    //       this.reportForms.series2
    //     );
    //   });
    // },
    // 客流量详细信息
    shopDetails(data) {
      shopDetails(data).then(res => {
        this.shopData = res.data.data;
      });
    }
  },
  watch: {
    dateSelected() {
      // passengerPrice(this.dateSelect).then(res => {
      //   if (res.status === 200) {
      this.drawLine(
        "keliuliang"
        // res.data.data.chart.xAxis,
        // res.data.data.chart.series
      );
      //   }
      // });
    }
  }
};
</script>
