<template>
  <!-- <div class="baseBody"> -->
    <div class="baseBody" v-if="$route.path == '/entrance/returnManageBase'">
      <van-tabs @click="checkTab" v-model="tabStatus">
        <van-tab
          v-for="(tab, index) in tabs"
          :title="tab.title"
          :key="index"
          :name="tab.status"
        >
        </van-tab>
      </van-tabs>
      <!-- 退单统计 -->
      <div class="count-box" v-show="tabStatus == 1">
        <div class="info-area">
          <van-row>
            <van-col span="12">
              <div class="header-text">退单统计</div>
            </van-col>
            <van-col span="12">
              <div class="header-gray">
                总退单：{{ returnForms.totalCount }}笔
              </div>
            </van-col>
          </van-row>
          <dataPicker
            :isAllCanShowPicker="false"
            @dataConfirm="onConfirm"
            @checkType="checkType"
            :reload="reloadDate"
            @setReload="setReload"
          ></dataPicker>
          <div id="main" style="height: 17rem"></div>
        </div>
        <div class="order-area">
          <div class="header-text">退单列表</div>
          <van-pull-refresh v-if="returnFormsList.length" v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
            <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                      offset="1">
              <van-row
                @click="details(item.id)"
                v-for="(item, index) in returnFormsList"
                :key="index"
                class="order-item shadow-row"
              >
                <van-col span="2"
                ><img class="order-img" src="/static/return-icon.png" alt=""
                /></van-col>
                <van-col span="12" style="margin-left:0.625rem">
                  <div class="order-name">{{ item.id }}</div>
                  <div class="order-info">退回方式：{{ item.uiPaymentMethod }}</div>
                  <div class="order-info">退款店员：{{ item.retailerName }}</div>
                </van-col>
                <van-col span="10">
                  <div class="order-date">{{ item.createTime }}</div>
                  <div class="order-info">&nbsp;</div>
                  <div class="order-price">-{{ item.amountActuallyPaid }}</div>
                </van-col>
              </van-row>
            </van-list>
          </van-pull-refresh>

        </div>
      </div>

      <!-- 退单查询 -->
      <div class="search-area" v-show="tabStatus == 2">
        <div class="box-header">
          <van-search
            class="search"
            placeholder="请输入查询订单号"
            v-model="orderCode"
            @input="inputChange"
          />
        </div>
        <div class="info-area">
          <div class="header-text"  v-if="isShowSelect">退单列表</div>
          <div class="header-text" v-else>查询结果</div>
          <dataPicker
            :isAllCanShowPicker="true"
            @dataConfirm="onConfirm"
            @checkType="checkType"
            v-if="isShowSelect"
            :reload="reloadDate"
            @setReload="setReload"
          ></dataPicker>
          <div v-if="returnFormsList.length">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
              <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                        offset="1">
                <div class="order-area" v-for="(item,index) in returnFormsList" :key="index">
                  <van-row class="order-item shadow-row" @click="details(item.id)">
                    <van-col span="2"
                    ><img class="order-img" src="/static/return-icon.png" alt=""
                    /></van-col>
                    <van-col span="12" style="margin-left:0.625rem">
                      <div class="order-name">{{item.id}}</div>
                      <div class="order-info">退回方式：{{item.uiPaymentMethod}}</div>
                      <div class="order-info">退款店员：{{item.createName}}</div>
                    </van-col>
                    <van-col span="10">
                      <div class="order-date">{{item.createTime}}</div>
                      <div class="order-info">&nbsp;</div>
                      <div class="order-price">-{{item.amountActuallyPaid}}</div>
                    </van-col>
                  </van-row>
                </div>
              </van-list>
            </van-pull-refresh>

          </div>
          <no-goods v-else></no-goods>
        </div>
      </div>
    </div>

    <div class="other-box" v-else>
      <keep-alive>
        <router-view v-if="$route.meta.isKeepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.isKeepAlive" />
    </div>
  <!-- </div> -->
</template>

<script>
// import {Dialog} from "vant";
// import {getInventoryList, deleteInventory} from "@/api/inventory";
import { cashCount, selectRefund } from "@/api/priceManage";
import { dateFormat } from "@/util/date";
import dataPicker from "../../components/dataPicker";
import echarts from "echarts";
import noGoods from "@/components/stock/noDoods";
import {Toast} from "vant";
export default {
  components: { dataPicker,noGoods },
  computed: {},
  data() {
    return {
      tabs: [
        {
          title: "退单统计",
          status: 1
        },
        {
          title: "退单查询",
          status: 2
        }
      ],
      // 日期选择器
      tabStatus: 1,
      isShowSelect:true, //是否显示查询结果
      orderCode: "",
      dateNowYear: dateFormat(new Date(), "yyyy"), //当前年
      dateNowMonth: dateFormat(new Date(), "yyyy-MM"), //当前月份
      dateNowDay: dateFormat(new Date(), "yyyy-MM-dd"), // 当前日期
      returnForms: {
        //退单统计数据
        xAxis: [],
        series: [],
        formData: [],
        totalCount: 0
      },
      returnFormsList: [],
      reloadDate:false,
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
  beforeMount() {},
  methods: {
    onRefresh() {
      Toast("刷新成功");
      this.returnFormsList = [];
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
      this.getRefound();
    },
    setReload(flag){
      this.reloadDate = flag;
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
    onConfirm(value) {
      // console.log(value);
      if (this.tabStatus == 1) {
        this.getCachCount({ status: 2, dateTime: value });
      } else {
        //退单查询
        this.returnFormsList = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        this.getRefound({dateTime:value})
      }
    },
    // 切换界面
    checkTab(status) {
      this.reloadDate = true;
      this.tabStatus = status;
      if(this.tabStatus == 1){
        this.getCachCount({status:2})
      }else{
        this.returnFormsList = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        this.getRefound({dateTime:this.dateNowYear})
      }
    },
    // 监听搜索框数据变化
    inputChange(){
      if(this.orderCode == ''){
        this.isShowSelect = true
      }else{
        this.isShowSelect = false;
        this.returnFormsList = [];
        this.finished = false;
        this.listData.current = 1;
        this.listData.total = 0;
        this.getRefound({id:this.orderCode})
      }
    },
    drawLine(xAxis, series) {
      this.charts = echarts.init(document.getElementById("main"));

      this.charts.setOption({
        tooltip: {},
        legend: {
          data: ["详情"]
        },
        xAxis: {
          data: xAxis
          // data: ["01", "02", "03", "04", "05", "06", "07", "08", "09"]
        },
        yAxis: {},
        series: [
          {
            data: series,
            // data: [1500, 1700, 1200, 1900, 2700, 1600, 2000, 1800, 1000],
            type: "line",
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
              color: "rgb(255, 70, 131)",
              opacity: 0 //为0不会绘制图形拐点消失
            } //拐点的样式
          }
        ]
      });
    },
    // 切换年月日
    checkType(type) {
      this.returnFormsList = [];
      this.finished = false;
      this.listData.current = 1;
      this.listData.total = 0;
      //退单查询页的处理
      if (this.tabStatus == 2) {
        if(type ==1 ){
          this.getRefound({dateTime:this.dateNowYear})
        }else if(type == 2){
          this.getRefound({dateTime:this.dateNowMonth})
        }else{
          this.getRefound({dateTime:this.dateNowDay})
        }
      } else {
        //退单统计页日期处理
        if (type == 1) {
          //选择年按钮
          this.getCachCount({ status: 2 });
        } else if (type == 2) {
          //选择月按钮
          this.getCachCount({ status: 2, dateTime: this.dateNowYear });
        } else {
          //选择日按钮
          this.getCachCount({ status: 2, dateTime: this.dateNowMonth });
        }
      }
    },
    details(id) {
      this.$router.push({
        path: "/entrance/returnManageBase/details",
        query: {
          id: id
        }
      });
    },
    // 请求接口
    // 退单统计
    getCachCount(data) {
      // 请求退单统计接口
      cashCount(data).then(res => {
        // console.log(res.data.data);
        this.returnForms.formData = res.data.data;
        let arr1 = [];
        let arr2 = [];
        let count = 0;
        // console.log(this.returnForms.data);
        this.returnForms.formData.forEach(item => {
          arr1.push(item.dateTime);
          arr2.push(item.count);
          count = item.total;
        });
        this.returnForms.totalCount = count;
        this.returnForms.xAxis = arr1;
        this.returnForms.series = arr2;
        this.drawLine(this.returnForms.xAxis, this.returnForms.series);
      });
    },
    // 退单列表查询
    getRefound(data) {
      let params = {...data};
      params.current = this.listData.current;
      params.size = this.listData.size;
      selectRefund(params).then(res => {
        let newOfRes = JSON.parse(JSON.stringify(res.data.data));
        this.returnFormsList = [...this.returnFormsList, ...newOfRes.records];
        this.listData.total = newOfRes.total;
        this.loading = false;
        if (this.returnFormsList.length == this.listData.total) {
          this.finished = true;
        }
        this.returnFormsList.forEach(element => {
          switch (element.paymentMethod) {
          case 1:
            element.uiPaymentMethod = "微信";
            break;
          case 2:
            element.uiPaymentMethod = "支付宝";

            break;
          default:
            element.uiPaymentMethod = "苹果";
            break;
        }
        });
      });
    }
  },
  watch: {},
  activated() {
    if(this.$route.path == '/entrance/returnManageBase'){
      this.reloadDate = true;
      this.dateType = "year";
      if (this.tabStatus == 1) {
        // 退单统计
        this.getCachCount({ status: 2 });
      }
      // 退单列表查询
      this.isLoading = true;
      this.loading = false;
      this.finished = false;
      this.returnFormsList = [];
      this.finished = false;
      this.listData = {
        current: 1,
        size: 15,
        total: 0
      };
      this.getRefound();
    }
  }

};
</script>

<style lang="scss" scoped>
.baseBody {
  height: 100%;
  overflow-y: scroll;
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

  .info-area {
    background: #fff;
    width: 89.3%;
    border-radius: 0.3rem;
    padding: 1.25rem;
    box-sizing: border-box;
    margin: 1.25rem auto 0;

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
  .count-box {
    .order-area {
      background: #fff;
      width: 89.3%;
      border-radius: 0.3rem;
      margin: 0.75rem auto 1rem;
      padding: 1.25rem;
      box-sizing: border-box;
      .header-text {
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
</style>
