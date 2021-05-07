<template>
  <div class="sales-data">
    <div class="line-img">
      <div id="main" style="width: 100%;height: 17rem"></div>

    </div>
    <div class="profit-detail">详细数据</div>
    <van-grid :border="false" :column-num="3">
      <van-grid-item>日期 </van-grid-item>
      <van-grid-item> 毛利金额</van-grid-item>
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
    <van-icon class="date-select" @click="navToDatePage" name="underway-o" />
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
    margin-left: 1.5rem;
  }
  .compare-yesterday {
    color: green;
  }
  .compare {
    color: red;
  }
}
</style>

<script>
// 折线
import echarts from "echarts";
import { getMlCount } from "@/api/priceManage";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      detailsData: []
    };
  },
  computed: {
    ...mapGetters(["dateSelect"])
  },
  created() {
    this.$nextTick(function() {
      getMlCount(this.dateSelect)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.drawLine(
              "main",
              res.data.data.chart.xAxis,
              res.data.data.chart.series
            );

            this.detailsData = res.data.data.detailsData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  mounted() {
    // this.getSalesData();
  },
  methods: {
    navToDatePage() {
      this.isShowTurnover = false;
      this.$router.push("/entrance/salesdata/datePage");
    },
    // 请求销售统计数据
    // getSalesData() {
    //   let data = {
    //     afterDay: "2020-01-10",
    //     day: "2020-01-09"
    //   };
    //   getMlCount(data)
    //     .then(res => {
    //       console.log(res);
    //       if (res.status === 200) {
    //         this.chart = res.data.data.chart;
    //         this.detailsData = res.data.data.detailsData;
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    drawLine(id, xAxis, series) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        // title: {
        //   text: "毛利统计"
        // },
        tooltip: {},
        legend: {
          data: ["详情"]
        },
        xAxis: {
          data: xAxis,
          nameGap: 1
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
    // 显示毛利页面详情
    navToGrossProfit() {}
  }
};
</script>

