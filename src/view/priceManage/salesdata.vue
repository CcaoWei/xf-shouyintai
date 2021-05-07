<template>
  <div class="base" v-if="$route.path=='/entrance/salesdata'">
    <div class="sales-data">

      <div class="line-img" v-if="isShowTurnover">
        <div id="main" style="width: 100%;height: 17rem"></div>

      </div>
      <div class="cardAera" :class="{'m-t-2':!isShowTurnover}">
        <div class="sales-item" @click="showTurnover">
          <div class="sales-item-left">
            <div>
              <van-icon name="https://cbcdn.cafewallet.cn/app/0113/yingee.png" />
            </div>
            <div>营业额</div>
          </div>
          <div class="sales-item-left">
            <div>
              <span class="num">{{salesData.turnover}}</span> 元
            </div>
            <div class="no-margin-right">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="sales-item" @click="navToGrossProfit">
          <div class="sales-item-left">
            <div>
              <van-icon name="https://cbcdn.cafewallet.cn/app/0113/maoli.png" />
            </div>
            <div>毛利</div>
          </div>
          <div class="sales-item-left">
            <div>
              <span class="num">{{salesData.grossProfit}}</span> 元
            </div>
            <div class="no-margin-right">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="sales-item" @click="navToOrderList">
          <div class="sales-item-left">
            <div>
              <van-icon name="https://cbcdn.cafewallet.cn/app/0113/order.png" />
            </div>
            <div>订单</div>
          </div>
          <div class="sales-item-left">
            <div>
              <span class="num">{{salesData.order}}</span>笔
            </div>
            <div class="no-margin-right">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="sales-item" @click="navTochargeList">
          <div class="sales-item-left">
            <div>
              <van-icon name="https://cbcdn.cafewallet.cn/app/0113/chargeback.png" />
            </div>
            <div>退单</div>
          </div>
          <div class="sales-item-left">
            <div>
              <span class="num">{{salesData.chargeback}}</span> 笔
            </div>
            <div class="no-margin-right">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="sales-item">
          <div class="sales-item-left">
            <div>
              <van-icon name="https://cbcdn.cafewallet.cn/app/0113/kucun.png" />
            </div>
            <div>库存总量</div>
          </div>
          <div class="sales-item-left">
            <div>
              <span class="num">{{salesData.totalInventory}}</span> 元
            </div>
          </div>
        </div>
        <div class="sales-item" @click="navToMemberData">
          <div class="sales-item-left">
            <div>
              <van-icon name="https://cbcdn.cafewallet.cn/app/0113/member.png" />
            </div>
            <div>会员人数</div>
          </div>
          <div class="sales-item-left">
            <div>
              <span class="num">{{salesData.members}}</span> 人
            </div>
            <div class="no-margin-right">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </div>
      <van-icon class="date-select" @click="navToDatePage" name="/static/checkDate.png"/>
      <van-popup
        v-model="popupShow"
        position="top"
        :style="{ height: '26%' }"
      >
        <div class="popup_area">
          <div class="popup_title">选择时间</div>
        </div>
        <div class="popup_body">
          <van-row class="date-row">
            <van-col span="6"><div class="date-btn" :class="{'date-btn-selected':dateSelected==1}" @click="changeSelectDtae(1)">今天</div></van-col>
            <van-col span="6"><div class="date-btn" :class="{'date-btn-selected':dateSelected==2}" @click="changeSelectDtae(2)">昨天</div></van-col>
            <van-col span="6"><div class="date-btn" :class="{'date-btn-selected':dateSelected==3}" @click="changeSelectDtae(3)">近三天</div></van-col>
            <van-col span="6"><div class="date-btn" :class="{'date-btn-selected':dateSelected==4}" @click="changeSelectDtae(4)">近七天</div></van-col>
          </van-row>
          <van-row class="date-row">
            <van-col span="6"><div class="date-btn" :class="{'date-btn-selected':dateSelected==5}" @click="changeSelectDtae(5)">周</div></van-col>
            <van-col span="6"><div class="date-btn" :class="{'date-btn-selected':dateSelected==7}" @click="changeSelectDtae(7)">月</div></van-col>
            <van-col span="6"><div class="date-btn" :class="{'date-btn-selected':dateSelected==9}" @click="changeSelectDtae(9)">年</div></van-col>
          </van-row>
          <van-row class="date-row">
            <van-col span="6"><div class="date-btn" @click="show = true">自定义</div></van-col>
          </van-row>
          <van-calendar v-model="show" color="#FF7901" type="range" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" />
        </div>
      </van-popup>
    </div>
  </div>
  <router-view v-else />
</template>
<style lang="scss" scoped>
.base {
  overflow-y: auto;
  height: 100%;
  .sales-data {
    width: 88%;
    margin: 0 auto;
    min-height: 26rem;
    .line-img {
      width: 100%;
      height: 17rem;
      overflow: hidden;
      overflow-x: scroll;
    }
    .m-t-2 {
      margin-top: 2rem;
    }
    .cardAera {
      .sales-item {
        margin: 0 auto 0.7rem;
        height: 4rem;
        background: #ffffff;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
        border-radius: 0.4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .sales-item-left {
          margin-left: 1rem;
          font-size: 0.9rem;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          div {
            margin-right: 0.7rem;
            color: #999;
            /deep/ i {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
          }
          .no-margin-right {
            margin-right: 6px;
          }
        }
        .num {
          font-family: PingFangSC-Semibold;
          font-size: 1.2rem;
          color: #222b45;
        }
      }
    }
  }
  .popup_area{
    padding: 1rem;
    .popup_title{
      text-align: left;
      font-family: PingFangSC-Semibold;
      font-size: 1.2rem;
      color: #222B45;
      letter-spacing: 0;
    }
  }
  /deep/ .van-grid-item__content {
    padding-left: 0;
    padding-right: 0;
  }
  .popup_body{
    .date-row{
      margin:.5rem 0;
      .date-btn{
        margin: 0 .3rem;
        border-radius: .2rem;
        background: #FFFFFF;
        border: 1px solid #8F9BB3;
      }
      .date-btn-selected{
        border: 1px solid #FF8900;
      }
    }
  }
}
</style>

<script>
// 折线
import echarts from "echarts";
import { getSalesData, getTurnover } from "@/api/priceManage";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isShowTurnover: false, //是否显示营业额走势
      salesData: {},
      chart: "",
      aaa: "",
      bbb: "",
      popupShow: false,
      dateSelected:0,
      show:false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2050, 0, 31),
    };
  },
  computed: {
    ...mapGetters(["dateSelect"])
  },
  mounted() {
    this.dateSelected = this.dateSelect.date;
    // 请求销售统计数据 init
    getSalesData(this.dateSelect).then(res => {
      // console.log(res);
      if (res.status === 200) {
        this.salesData = res.data.data;
      }
    });
    // console.log(this.$store.state.base.userInfo);
  },
  methods: {
    drawLine(id, xAxis, series) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        // title: {
        //   text: "营业额"
        // },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: xAxis
          // name: "月份"
        },
        yAxis: {},
        series: [
          {
            type: "line",
            data: series,
            itemStyle: {
              normal: {
                color: "#ff891c"
              }
            }
          }
        ]
      });
    },
    //显示营业额数据 走势
    showTurnover() {
      this.isShowTurnover = true;
      this.$nextTick(function() {
        getTurnover(this.dateSelect).then(res => {
          // console.log(res);
          if (res.status === 200) {
            this.drawLine(
              "main",
              res.data.data.chart.xAxis,
              res.data.data.chart.series
            );
          }
        });
      });
    },
    // 显示毛利页面详情
    navToGrossProfit() {
      this.isShowTurnover = false;
      this.$router.push("/entrance/salesdata/grossProfit");
    },
    // 显示订单列表页面详情
    navToOrderList() {
      this.isShowTurnover = false;
      this.$router.push("/entrance/salesdata/orderList");
    },
    // 显示退单列表页面详情
    navTochargeList() {
      this.isShowTurnover = false;
      this.$router.push("/entrance/salesdata/chargeback");
    },
    navToMemberData() {
      this.isShowTurnover = false;
      this.$router.push("/entrance/salesdata/memberData");
    },
    navToDatePage() {
      this.popupShow = true;
    },
    //选择自定义时间
    onConfirm(date) {
      const [start, end] = date;
      console.log(date);
      this.show = false;
      this.date = `${start.format("yyyy-MM-dd")} - ${end.format("yyyy-MM-dd")}`;
      this.$store.commit("SET_DATE", {
        afterDay: end.format("yyyy-MM-dd hh:mm:ss"),
        day: start.format("yyyy-MM-dd hh:mm:ss"),
        date: 10
      });
      this.dateList.forEach(item => {
        item.selected = false;
      });
      this.selected = true;
    },
    // 改变时间选择项目
    changeSelectDtae(idx) {
      console.log(idx);
      this.dateSelected = idx;
      this.$store.commit("SET_DATE", {
        date: idx
      });
    }
  },
  watch:{
    dateSelected(){
      getTurnover(this.dateSelect).then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.drawLine(
            "main",
            res.data.data.chart.xAxis,
            res.data.data.chart.series
          );
        }
      });
    }
  }
};
</script>

