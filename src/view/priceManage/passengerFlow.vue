<template>
  <div class="base">
    <div class="sales-data">
      <div class="line-img">
        <div id="main" style="width: 100%;height: 17rem"></div>
      </div>
    </div>
    <div class="info-data">
      <div class="info-data-message">
        <div id="ccc">
          <van-row>
            <van-col class="left" span="8">日期</van-col>
            <van-col class="center" span="8">客流量(人)</van-col>
            <van-col class="right" span="8">较昨日</van-col>
          </van-row>
        </div>
        <div>
          <van-row v-for="(dateItem,index) in detailsData" :key="index">
            <van-col class="date-text" span="8">{{dateItem.data}}</van-col>
            <van-col class="gross-price" span="8">{{dateItem.passenger}}</van-col>
            <van-col class="compare-yesterday" :class="{'compare':dateItem.compareType == 0}" span="8">
              {{dateItem.compareYesterday}}
            </van-col>
          </van-row>
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
  </div>
</template>
<style lang="scss" scoped>
  .base {
    height: 100%;
    overflow-y: auto;
    .sales-data {
      background: #fff;
      width: 88%;
      border-radius: .8rem;
      margin: 2rem auto 0;
      .line-img {
        width: 100%;
        height: 17rem;
        overflow: hidden;
        overflow-x: scroll;
      }
    }
    .info-data {
      background: #fff;
      width: 88%;
      border-radius: .8rem;
      margin: .5rem auto 0;
      padding: 1rem 0;
      .info-data-message {
        padding: 0 1rem;
        .left {
          font-family: PingFangSC-Regular;
          font-size: .9rem;
          color: #8F9BB3;
          text-align: left;

        }
        .center {
          font-family: PingFangSC-Regular;
          font-size: .9rem;
          color: #8F9BB3;
          text-align: right;

        }
        .right {
          font-family: PingFangSC-Regular;
          font-size: .9rem;
          color: #8F9BB3;
          text-align: right;

        }
        .date-text {
          font-family: PingFangSC-Regular;
          font-size: .9rem;
          color: #222B45;
          letter-spacing: 0;
          text-align: left;
        }
        .gross-price {
          font-family: PingFangSC-Regular;
          font-size: .9rem;
          color: #222B45;
          letter-spacing: 0;
          text-align: right;
        }
        .compare-yesterday {
          font-family: PingFangSC-Regular;
          font-size: .9rem;
          letter-spacing: 0;
          color: green;
          text-align: right;
        }
        .compare {
          font-family: PingFangSC-Regular;
          font-size: .9rem;
          letter-spacing: 0;
          color: red;
          text-align: right;
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
  import {passengerFlow} from "@/api/priceManage";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        detailsData: [],
        popupShow: false,
        minDate: new Date(1990, 0, 1),
        maxDate: new Date(2050, 0, 31),
        selected: false,
        date: "自定义时间段",
        show: false,
        dateList: [
          { name: "今天", id: 1, selected: true },
          { name: "昨天", id: 2, selected: false },
          { name: "近3天", id: 3, selected: false },
          { name: "近7天", id: 4, selected: false },
          { name: "本周", id: 5, selected: false },
          { name: "上周", id: 6, selected: false },
          { name: "本月", id: 7, selected: false },
          { name: "上个月", id: 8, selected: false },
          { name: "全年", id: 9, selected: false }
        ],
        dateSelected:0
      };
    },
    computed: {
      ...mapGetters(["dateSelect"])
    },
    created() {
      this.dateSelected = this.dateSelect.date;
      this.$nextTick(function () {
        passengerFlow(this.dateSelect).then(res => {
          console.log(res);
          if (res.status === 200) {
            this.drawLine(
              "main",
              res.data.data.chart.xAxis,
              res.data.data.chart.series
            );
            this.detailsData = res.data.data.detailsData;
          }
        });
      });
    },
    methods: {
      navToDatePage() {
        this.popupShow = true;
      },
      // 请求销售统计数据
      getSalesData(type) {
        window.console.log(type);
      },
      drawLine(id, xAxis, series) {
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          xAxis: {
            type: 'category',
            data: xAxis
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: series,
            type: 'line',
            color:'#FF8900' //改变折线颜色

          }]
        });
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
        passengerFlow(this.dateSelect).then(res => {
          console.log(res);
          if (res.status === 200) {
            this.drawLine(
              "main",
              res.data.data.chart.xAxis,
              res.data.data.chart.series
            );
            this.detailsData = res.data.data.detailsData;
          }
        });
      }
    }
  };
</script>

