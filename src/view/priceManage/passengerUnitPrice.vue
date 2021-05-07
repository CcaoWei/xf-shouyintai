<template>
  <div class="sales-data">
    <div class="line-img">
      <div id="main" style="width: 100%;height: 17rem"></div>

    </div>
    <div class="profit-detail">详细数据</div>
    <van-grid :border="false" :column-num="3">
      <van-grid-item>日期 </van-grid-item>
      <van-grid-item> 客单价（元）</van-grid-item>
      <van-grid-item>较昨日</van-grid-item>
    </van-grid>
    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <div v-for="(dateItem,index) in detailsData" :key="index" class="date-text">{{dateItem.data}}</div>
      </van-grid-item>
      <van-grid-item>
        <div v-for="(priceItem,index) in detailsData" :key="index" class="gross-price">{{priceItem.passenger}}</div>
      </van-grid-item>
      <van-grid-item>
        <div v-for="(compareItem,index) in detailsData" :key="index" class="compare-yesterday" :class="{'compare':compareItem.compareType == 0}">{{compareItem.compareYesterday}}</div>
      </van-grid-item>
    </van-grid>
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
</template>
<style lang="scss" scoped>
.sales-data {
  background: #fff;
  width: 88%;
  border-radius: .8rem;
  margin: 2rem auto 0;
  padding: 2rem 0;
  min-height: 26rem;
  .line-img {
    width: 100%;
    height: 17rem;
    overflow: hidden;
    overflow-x: scroll;
  }
  .profit-detail {
    font-size: 1.5rem;
    text-align: left;
    margin-left: 0.5rem;
  }
  .compare-yesterday {
    color: green;
  }
  .compare {
    color: red;
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

/deep/ .van-grid-item__content {
  padding-left: 0;
  padding-right: 0;
}
</style>

<script>
// 折线
import echarts from "echarts";
import { passengerPrice } from "@/api/priceManage";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      detailsData: [],
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
  created() {
    this.dateSelected = this.dateSelect.date;
    this.$nextTick(function() {
      passengerPrice(this.dateSelect).then(res => {
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
        // title: {
        //   text: "客流量统计"
        // },
        tooltip: {},
        legend: {
          data: ["详情"]
        },
        xAxis: {
          data: xAxis
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: series,
            barWidth: "20",
            itemStyle: {
              normal: {
                color: "#ff891c",
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 12
                  }
                }
              }
            }
          }
        ]
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
      passengerPrice(this.dateSelect).then(res => {
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

