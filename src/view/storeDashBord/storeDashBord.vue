<template>
  <div class="base">
    <div v-if="$route.path == '/entrance/storeDashBord'">
      <div class="message-data">
        <div class="message-box">
          <div class="message-text">
            <div @click="clientInfo">
              <div class="message-title" v-if="todaySalesData.status==1">今日销售数据</div>
              <div class="message-title" v-else>昨日销售数据</div>
              <div class="message-gray">客流量(人)</div>
              <div class="message-number">
                <span>
                  <van-icon name="/static/storeDashBordIcon1.png" /></span>
                <span>{{ todaySalesData.guestStatistics }}</span>
              </div>
              <div class="message-green" v-if="todaySalesData.guestRatio.indexOf('-') != -1">{{ todaySalesData.guestRatio }}</div>
              <div class="message-red" v-else>{{ todaySalesData.guestRatio }}</div>
            </div>
            <div class="m-t-2" @click="moneyInfo">
              <div class="message-gray">均客单价(元)</div>
              <div class="message-number">
                <span>
                  <van-icon name="/static/storeDashBordIcon2.png" /></span>
                <span>{{ todaySalesData.guestUnitPrice }}</span>
              </div>
              <div class="message-green" v-if="todaySalesData.guestUnitPriceRatio.indexOf('-') != -1">{{todaySalesData.guestUnitPriceRatio }}</div>
              <div class="message-red" v-else>{{ todaySalesData.guestUnitPriceRatio }}</div>
            </div>
          </div>
          <div class="circle-area">
            <van-circle v-model="currentRate" :rate="todaySalesData.achievingRate" :stroke-width="120" :size="148" layer-color="#F4F4F5" :color="gradientColor">
              <div class="circle-text">
                <div class="circle-title">营业额(元)</div>
                <div class="circle-money">{{ todaySalesData.turnover }}</div>
                <div class="circle-number">
                  {{ todaySalesData.orderQuantity }}单
                </div>
              </div>
            </van-circle>
          </div>
        </div>
      </div>
      <div class="echart-data">

        <van-row class="title-row">
          <van-col span="20">
            <div class="header-text">今日畅销商品Top5</div>
            <!--            <dataPicker :isAllCanShowPicker="false" @checkType="dataCheckType" @dataConfirm="onConfirm"></dataPicker>-->
          </van-col>
          <van-col span="4" class="title-item">
            <van-icon name="arrow" @click="goDetail()" />
          </van-col>
        </van-row>

        <div class="line-img">
          <div id="main" style="height: 17rem"></div>
        </div>
      </div>
      <van-calendar v-model="show" @confirm="onConfirm" :show-confirm="false" />
      <div id="hidden-show-calendar" style="visibility: hidden" @click="showCalendar"></div>
    </div>
    <div v-else>
      <keep-alive>
        <router-view v-if="$route.meta.isKeepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.isKeepAlive" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.base {
  height: 100%;
  overflow-y: auto;

  .message-data {
    background: #fff;
    width: 88%;
    border-radius: 0.3rem;
    margin: 2rem auto 1rem;
    padding: 0.25rem;

    .message-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0.75rem;

      .message-text {
        text-align: left;

        .m-t-2 {
          margin-top: 2rem;
        }

        .message-title {
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #222b45;
          letter-spacing: 0;
          margin-bottom: 2rem;
        }

        .message-gray {
          opacity: 0.5;
          font-family: PingFangSC-Regular;
          font-size: 0.75rem;
          color: #222b45;
          letter-spacing: 0;
          text-align: left;
          margin-bottom: 0.3rem;
        }

        .message-number {
          font-family: PingFangSC-Medium;
          font-size: 1.25rem;
          color: #212121;
          letter-spacing: 0;
          text-align: left;
          margin-bottom: 0.3rem;
        }

        .message-red {
          font-family: PingFangSC-Regular;
          font-size: 0.75rem;
          color: #f15245;
          letter-spacing: 0;
        }

        .message-green {
          font-family: PingFangSC-Regular;
          font-size: 0.75rem;
          color: #4bc194;
          letter-spacing: 0;
        }
      }

      .circle-area {
        /deep/ .van-circle {
          position: relative;
          bottom: 0;
        }

        .circle-text {
          text-align: center;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          position: absolute;

          .circle-title {
            opacity: 0.5;
            font-family: PingFangSC-Regular;
            font-size: 0.75rem;
            color: #222b45;
            letter-spacing: 0;
          }

          .circle-money {
            font-family: PingFangSC-Medium;
            font-size: 1.125rem;
            color: #222b45;
            letter-spacing: 0;
          }

          .circle-number {
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #ff8900;
            letter-spacing: 0;
          }
        }
      }
    }
  }

  .echart-data {
    background: #fff;
    width: 88%;
    border-radius: 0.3rem;
    margin: 0 auto 2rem;
    padding: 1em 0 0 0.5rem;

    .line-img {
      width: 100%;
      height: 17rem;
      overflow: hidden;
      overflow-x: scroll;
    }

    .header-text {
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #222b45;
      letter-spacing: 0;
      text-align: left;
    }

    .title-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .title-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

<script>
// 折线
import echarts from "echarts";
import { todaySalesData, todayGoodsTop5 } from "@/api/priceManage";
import { mapGetters } from "vuex";
import dataPicker from "@/components/dataPicker";

export default {
  components: { dataPicker },
  data() {
    return {
      currentRate: 0,
      gradientColor: {
        "0%": "#FF7901 ",
        "100%": "#FE5845"
      },
      show: false,
      // 今日销售数据
      todaySalesData: {
        guestStatistics: 0,
        guestRatio: "0.0%",
        turnover: 0,
        orderQuantity: 0,
        guestUnitPrice: 0,
        guestUnitPriceRatio: "0.0%",
        top5Goods: [],
        xAxis: []
      }
    };
  },
  computed: {
    ...mapGetters(["dateSelect"])
  },
  methods: {
    goDetail() {
      this.$store.commit("SET_BORDTABSTATUS", 3);
      this.$router.push("/entrance/storeDashBord/details");
    },
    dataCheckType(value) {
      let newData = new Date();
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
    },
    onConfirm(value) {
      this.tabStatusData = value;
      if (this.tabStatus == 1) {
        //订单统计
        let data = {
          status: 1,
          dateTime: value
        };
        this.getBaseDetail(data);
      } else {
        //订单查询
        let data = {
          dateTime: value
        };
        this.getSelectOrders(data);
      }
    },
    clientInfo() {
      this.$store.commit("SET_BORDTABSTATUS", 1);
      this.$router.push("/entrance/storeDashBord/details");
    },
    moneyInfo() {
      this.$store.commit("SET_BORDTABSTATUS", 2);
      this.$router.push("/entrance/storeDashBord/details");
    },
    showCalendar() {
      this.show = true;
    },
    // onConfirm(date) {
    //   this.show = false;
    //   console.log(date.format("yyyy-MM-dd hh:mm:ss"));
    //   // this.date = date.format("yyyy-MM-dd hh:mm:ss");
    // },
    drawLine(id, xAxis, series) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        // title: {
        //   text: "今日畅销商品Top5"
        // },
        tooltip: {},

        grid: {
          left: 53 // 调整这个属性
        },
        legend: {
          data: ["详情"]
        },
        xAxis: {},
        yAxis: {
          data: xAxis,
          axisLabel: {
            //关键代码
            show: true,
            interval: 0, //强制所有标签显示
            formatter: function(params) {
              //文字超出用...代替
              if (params.length > 3) return params.substring(0, 3) + "...";
              else return params;
            }
          }
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: series,
            barWidth: "20",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            }
          }
        ]
        // toolbox: {
        //   padding: 30,
        //   show: true,
        //   feature: {
        //     //敲黑板，重点！！！
        //     myYear: {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
        //       show: true,//是否显示
        //       title: ' ', //鼠标移动上去显示的文字
        //       icon: 'path://M4.5,0.5h11c2.2,0,4,1.8,4,4v11c0,2.2-1.8,4-4,4h-11c-2.2,0-4-1.8-4-4v-11C0.5,2.3,2.3,0.5,4.5,0.5zM6,9L5.5,8.4c1-0.8,1.7-1.8,2-3.1l0.7,0.1C8.2,5.9,8,6.2,7.9,6.6h6.2v0.7H11v1.6h2.8v0.7H11v2.2h3.5v0.7H11v2.2h-0.7v-2.2H5.6v-0.7h1.6V8.9h3V7.3H7.6C7.1,8,6.6,8.6,6,9zM10.2,11.7V9.6H8v2.2H10.2z', //图标
        //       onclick: function () {//点击事件,这里的option1是chart的option信息
        //         // $('.big').css('display','block');
        //         console.log(888)
        //       }
        //     },
        //     myMonth: {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
        //       show: true,//是否显示
        //       title: ' ', //鼠标移动上去显示的文字
        //       icon: 'M4.5,0.5h11c2.2,0,4,1.8,4,4v11c0,2.2-1.8,4-4,4h-11c-2.2,0-4-1.8-4-4v-11C0.5,2.3,2.3,0.5,4.5,0.5zM7.2,14.4l-0.5-0.5c0.7-0.9,1-2,1-3.4V5.6h5.7v7.8c0,0.6-0.3,0.9-0.8,0.9h-1.3L11,13.6c0.5,0,0.9,0,1.3,0c0.2,0,0.4-0.2,0.4-0.4v-2H8.3C8.2,12.5,7.8,13.5,7.2,14.4z M12.6,6.3H8.4V8h4.3V6.3z M8.4,10.5h4.3V8.7H8.4V10.5z',
        //       onclick: function () {//点击事件,这里的option1是chart的option信息
        //         // $('.big').css('display','block');
        //         console.log(888)
        //       }
        //     },
        //     myDay: {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
        //       show: true,//是否显示
        //       title: ' ', //鼠标移动上去显示的文字
        //       icon: 'M4.5,0.5h11c2.2,0,4,1.8,4,4v11c0,2.2-1.8,4-4,4h-11c-2.2,0-4-1.8-4-4v-11C0.5,2.3,2.3,0.5,4.5,0.5zM13.1,14.4h-0.7v-0.8H7.6v0.8H6.9V5.6h6.2V14.4z M12.4,9.2V6.3H7.6v2.8H12.4z M12.4,12.9v-3H7.6v3H12.4z',
        //       onclick: function () {//点击事件,这里的option1是chart的option信息
        //         // $('.big').css('display','block');
        //         console.log(888)
        //       }
        //     },
        //     // myCalendar:{//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
        //     //   show:true,//是否显示
        //     //   title:' ', //鼠标移动上去显示的文字
        //     //   icon:'M4.5,0.5h11c2.2,0,4,1.8,4,4v11c0,2.2-1.8,4-4,4h-11c-2.2,0-4-1.8-4-4v-11C0.5,2.3,2.3,0.5,4.5,0.5zM8.2,4.7v1.7h-1V4.7H8.2z M11.3,5.3v1l-2.5,0v-1H11.3z M12.9,4.7v1.7h-1V4.7H12.9L12.9,4.7z M13.3,10v1h-1.7v-1H13.3z M10.8,10v1H9.2v-1H10.8z M8.3,10v1H6.7v-1H8.3z M13.3,12v1h-1.7v-1H13.3z M10.8,12v1H9.2v-1H10.8z M8.3,12v1H6.7v-1H8.3z M14.3,9H5.7v5.3h8.7V9z M5.7,5.3h0.9v1l-0.9,0V8h8.7V6.3h-0.9v-1h0.9c0.6,0,1,0.4,1,1v8c0,0.6-0.4,1-1,1H5.7c-0.6,0-1-0.4-1-1v-8C4.7,5.8,5.1,5.3,5.7,5.3z',
        //     //   onclick:()=> {//点击事件,这里的option1是chart的option信息
        //     //     document.getElementById("hidden-show-calendar").click();
        //     //   }
        //     // },
        //     myMore: {
        //       //自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
        //       show: true, //是否显示
        //       title: "查看更多", //鼠标移动上去显示的文字
        //       icon:
        //         "M620.8 512L268.8 160l64-70.4L755.2 512l-422.4 422.4-64-70.4z",
        //       onclick: () => {
        //         //点击事件,这里的option1是chart的option信息
        //         this.$router.push({
        //           path: "/entrance/storeDashBord/details",
        //           query: {
        //             status: 3
        //           }
        //         });
        //       }
        //     }
        //   }
        // }
      });
    }
  },
  watch: {
    dateSelected() {
      // passengerPrice(this.dateSelect).then(res => {
      //   console.log(res);
      //   if (res.status === 200) {
      this.drawLine(
        "main"
        // res.data.data.chart.xAxis,
        // res.data.data.chart.series
      );
      // }
      // });
    }
  },
  activated() {
    this.dateSelected = this.dateSelect.date;
    this.$nextTick(function() {
      todayGoodsTop5().then(res => {
        //   console.log(res);
        if (res.status === 200) {
          let arr1 = [];
          let arr2 = [];
          this.todaySalesData.top5Goods = res.data.data;
          this.todaySalesData.top5Goods.forEach(item => {
            arr1.push(item.message);
            arr2.push(item.num);
          });
          this.drawLine("main", arr1, arr2);
        }
      });
    });

    // 今日销售额
    todaySalesData().then(res => {
      if (res.status == 200) {
        this.todaySalesData = res.data.data;
      }
    });
  }
};
</script>
