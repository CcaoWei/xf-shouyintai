<template>
  <div class="chart-box">
    <div class="echart-data">
      <div class="info-area">
        <div class="header-text">营业额统计</div>
        <van-row class="check-date">
          <van-col span="4">
            <van-button class="check-btn" :class="{'check-btn-checked':btnCheck == 4}" type="default"
                        @click="checkType(4)">总
            </van-button>
          </van-col>
          <van-col span="4">
            <van-button class="check-btn" :class="{'check-btn-checked':btnCheck == 3}" type="default"
                        @click="checkType(3)">年
            </van-button>
          </van-col>
          <van-col span="4">
            <van-button class="check-btn" :class="{'check-btn-checked':btnCheck == 2}" type="default"
                        @click="checkType(2)">月
            </van-button>
          </van-col>
          <van-col span="4">
            <van-button class="check-btn" :class="{'check-btn-checked':btnCheck == 1}" type="default"
                        @click="checkType(1)">日
            </van-button>
          </van-col>
          <van-col span="8" v-show="showDateBtn">
            <van-icon
              class="btn-calendar"
              name="/static/calendar.png"
              size="1.5rem"
              @click="showDatePicker = true"
            />
          </van-col>
        </van-row>
        <div v-show="btnCheck==4">
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">总营业额</van-col>
            <van-col class="font-number" span="8">{{firstTab.grossNum}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">总订单金额</van-col>
            <van-col class="font-number" span="8">{{firstTab.orderPrice}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">毛利润</van-col>
            <van-col class="font-number" span="8">{{firstTab.grossMargin}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">总退款金额</van-col>
            <van-col class="font-number" span="8">{{firstTab.refundPrice}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">总客流量</van-col>
            <van-col class="font-number" span="8">{{firstTab.ridership}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">总订单量</van-col>
            <van-col class="font-number" span="8">{{firstTab.cashNum}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">总退单量</van-col>
            <van-col class="font-number" span="8">{{firstTab.returnNum}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">均客单价</van-col>
            <van-col class="font-number" span="8">{{firstTab.guestUnit}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">库存总量</van-col>
            <van-col class="font-number" span="8">{{firstTab.stock}}</van-col>
          </van-row>
        </div>
        <div v-show="btnCheck != 4">
          <div class="chart-area">
            <div id="yingyetongji" style="height: 17rem;" :style="{with:chartWidth}"></div>
          </div>
          <div class="header-text">
            <span v-if="btnCheck==3">当年详情信息</span>
            <span v-if="btnCheck==2">当月详情信息</span>
            <span v-if="btnCheck==1">当日详情信息</span>
          </div>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">营业额</van-col>
            <van-col class="font-number" span="8">{{otherTab.grossNum}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">订单金额</van-col>
            <van-col class="font-number" span="8">{{otherTab.orderPrice}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">毛利润</van-col>
            <van-col class="font-number" span="8">{{otherTab.grossMargin}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">退款金额</van-col>
            <van-col class="font-number" span="8">{{otherTab.refundPrice}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">客流量</van-col>
            <van-col class="font-number" span="8">{{otherTab.ridership}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">订单量</van-col>
            <van-col class="font-number" span="8">{{otherTab.orderNum}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">退单量</van-col>
            <van-col class="font-number" span="8">{{otherTab.returnNum}}</van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="16">均客单价</van-col>
            <van-col class="font-number" span="8">{{otherTab.guestPrice}}</van-col>
          </van-row>
        </div>
      </div>
    </div>
    <!-- 日期弹框 -->
    <van-popup v-model="showDatePicker" position="bottom">
      <!-- 年月日 -->
      <van-datetime-picker
        :type="dateType"
        :min-date="minDate"
        v-model="currentDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="showDatePicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<style lang="scss" scoped>
  .chart-box {
    height: 100%;
    padding-top: 2rem;
    width: 100%;
    overflow-y: auto;

    .echart-data {
      background: #fff;
      border-radius: 0.3rem;
      margin: 0 1.25rem 4rem;
      padding: 1rem 0 0 0.5rem;
      box-sizing: border-box;

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
        }
      }

      .check-date {
        margin-top: 1rem;
        padding-right: 0.5rem;

        .btn-calendar {
          height: 1.5rem;
          float: right;
        }

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
      }

      .chart-area {
        width: 100%;
        height: 17rem;
        overflow: hidden;
        overflow-x: scroll;
      }
    }
  }
</style>

<script>
  import echarts from "echarts";
  import {businessChart, businessChartDetail} from "@/api/priceManage";
  // import {Notify, Toast} from "vant";
  // import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        btnCheck: 4,
        grossNum: [],
        grossMargin: [],
        perDate: [],
        firstTab: {
          grossNum: "",
          grossMargin: "",
          ridership: "",
          cashNum: "",
          guestUnit: "",
          stock: ""
        },
        otherTab: {
          grossNum: "",
          grossMargin: "",
          ridership: "",
          cashNum: "",
          guestUnit: "",
          stock: ""
        },
        result: [],
        dateType: null,
        minDate: new Date(2017, 0, 1), //日期选择最小值
        maxDate: new Date(2999, 10, 1), //日期选择最大值
        currentDate: new Date(),
        showDatePicker: false,
        showDateBtn: false,
        year: new Date().getFullYear() + "-",
        month: new Date().format('yyyy-MM') + "-",
        chartWidth: 'auto'
      };
    },
    computed: {},
    mounted() {
      this.getData();
    },
    created() {
    },
    methods: {
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
      onConfirm(value) {
        if (this.dateType == "year-month") {
          this.getChartData(value.format("yyyy-MM"));
        } else if (this.dateType == "date") {
          this.getChartData(value.format("yyyy-MM-dd"));
        } else {
          this.getChartData(value.format("yyyy-MM-dd"));
        }
        this.showDatePicker = false;
      },
      checkType(type) {
        if (type == 2) {
          this.showDateBtn = true;
          this.dateType = "year-month";
        } else if (type == 1) {
          this.showDateBtn = true;
          this.dateType = "date";

        } else {
          this.showDateBtn = false;
          this.dateType = null;
        }
        this.btnCheck = type;
        this.otherTab = {
          grossNum: "",
          grossMargin: "",
          ridership: "",
          cashNum: "",
          guestUnit: "",
          stock: ""
        };
        this.getData();
      },
      getData() {
        let data = (data = {
          type: this.btnCheck
        });
        businessChart(data).then(res => {
          if (res.status == 200) {
            this.result = [...res.data.data.vo];
            let grossNumArray = [];
            let grossMarginArray = [];
            let perDateArray = [];
            if (res.data.data.vo.length) {
              for (let i in res.data.data.vo) {
                grossNumArray.push(res.data.data.vo[i].grossNum);
                grossMarginArray.push(res.data.data.vo[i].grossMargin);
                perDateArray.push(res.data.data.vo[i].perDate);
              }
              this.grossNum = [...grossNumArray];
              this.grossMargin = [...grossMarginArray];
              this.perDate = [...perDateArray];
              if (this.btnCheck == 4) {
                this.firstTab = res.data.data.vo[0];
              } else {
                if (this.btnCheck == 1) {
                  this.chartWidth = this.perDate.length + 'rem';
                } else {
                  this.chartWidth = 'auto';
                }

                let date = null;
                if (this.dateType == "year-month") {
                  date = this.year + res.data.data.vo[0].perDate;
                } else if (this.dateType == "date") {
                  date = this.month + res.data.data.vo[0].perDate;
                } else {
                  date = res.data.data.vo[0].perDate
                }
                this.getChartData(date);
              }
            } else {
              this.grossNum = [];
              this.grossMargin = [];
              this.perDate = [];
              this.loadYingyetongji();
            }
          }
        });
      },
      getChartData(date) {
        let data = {
          type: this.btnCheck,
          dateStr: date
        };
        businessChartDetail(data).then(res => {
          if (res.status == 200) {
            this.otherTab = res.data.data;
          }
        });
        this.loadYingyetongji();
      },
      loadYingyetongji() {
        this.charts = echarts.init(document.getElementById("yingyetongji"));
        this.charts.setOption({
          // title: {
          //   text: "订单统计"
          // },
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
              data: this.perDate
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "毛利润",
              type: "bar",
              stack: "列1",
              data: this.grossMargin,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: "#76ACFD"},
                  {offset: 1, color: "#0F6EFF"}
                ])
              },
            },
            {
              name: "营业额",
              type: "bar",
              stack: "列1",
              data: this.grossNum,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: "#FF8900"},
                  {offset: 1, color: "#FC5D0E"}
                ])
              },
            }
          ]
        });
        this.charts.off("click");
        this.charts.on("click", params => {
          let date = null;
          if (this.dateType == "year-month") {
            date = this.year + params.name;
          } else if (this.dateType == "date") {
            date = this.month + params.name;
          } else {
            date = params.name;
          }
          let data = {
            type: this.btnCheck,
            dateStr: date
          };
          businessChartDetail(data).then(res => {
            if (res.status == 200) {
              this.otherTab = res.data.data;
            }
          });
        });
      }
    },
    watch: {}
  };
</script>

