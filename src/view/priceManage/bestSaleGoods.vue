<template>
  <div class="sales-data">
    <div class="line-img">
      <div id="main" style="width: 100%;height: 27rem"></div>

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
</template>
<style lang="scss" scoped>
.sales-data {
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.06);
  background: #fff;
  width: 88%;
  border-radius: 15px;
  margin: 2rem auto 0;
  padding: 2rem 0;
  min-height: 26rem;
  .line-img {
    width: 100%;
    overflow: hidden;
    overflow-x: scroll;
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
import { topSeller } from "@/api/priceManage";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      popupShow: false,
      dateSelected:0,
      show:false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2050, 0, 31),
    };
  },
  created() {
    this.dateSelected = this.dateSelect.date;
    this.$nextTick(function() {
      topSeller(this.dateSelect).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.drawLine("main", res.data.data.xAxis, res.data.data.series);
        }
      });
    });
  },
  computed: {
    ...mapGetters(["dateSelect"])
  },
  methods: {
    navToDatePage() {
      this.popupShow = true;
    },
    // 请求销售统计数据
    getSalesData(type) {
      window.console.log(type);
    },
    drawLine(id, yAxis, series) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        // title: {
        //   text: "畅销商品"
        // },
        tooltip: {
          trigger: "axis",
          show: true,
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          nameRotate: 2
        },
        yAxis: {
          type: "category",
          data: yAxis,
          // axisLabel: {
          //   interval: 0,
          //   rotate: -40
          // }
        },
        series: [
          {
            name: "2011年",
            type: "bar",
            data: series,
            barWidth: "20",
            itemStyle: {
              normal: {
                barBorderRadius:[0, 10, 10, 0],
                color: "#ff891c",
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
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
      topSeller(this.dateSelect).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.drawLine("main", res.data.data.xAxis, res.data.data.series);
        }
      });
    }
  }
};
</script>

