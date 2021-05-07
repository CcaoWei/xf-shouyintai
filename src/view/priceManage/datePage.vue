<template>
  <div class="sales-data">
    <van-grid :gutter="10" :column-num="3">
      <van-grid-item :class="{'date-selected':value.selected}" v-for="(value,index) in dateList" @click="changeSelectDtae(value.id)" :text="value.name" :key="index" />
    </van-grid>
    <van-button plain class="set-date" :class="{'selected':selected}" type="primary" @click="show = true">{{date}}</van-button>
    <!-- <van-cell title="选择日期区间" :value="date" @click="show = true" /> -->
    <van-calendar v-model="show" color="#FF7901" type="range" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" />
    <!-- <van-datetime-picker v-if="showPicker" v-model="currentDate" type="year-month" :min-date="minDate" :max-date="maxDate" :formatter="formatter" /> -->

  </div>
</template>
<style lang="scss" scoped>
.sales-data {
  background: #fff;
  width: 88%;
  border-radius: 20px;
  margin: -2rem auto 0;
  padding: 2rem 0;
  min-height: 33rem;
}
.set-date {
  margin-top: 1rem;
  border: 1px solid #ffd1ad;
  color: #646566;
  width: 95%;
  height: 3rem;
}
.date-selected {
  /deep/ .van-grid-item__content {
    background: #ffd1ad;
    /deep/ .van-grid-item__text {
      color: #fff;
    }
  }
}
.selected {
  background-color: #ffd1ad;
  /deep/ .van-button__text {
    color: #fff;
  }
}
/deep/ .van-grid-item__content--surround::after {
  border: 1px solid #ff891c;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["dateSelect"])
  },
  data() {
    return {
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
      ]
    };
  },
  mounted() {
    //init 数据
    if (this.dateSelect.date != 10) {
      this.dateList.forEach(item => {
        item.selected = false;
        if (this.dateSelect.date == item.id) {
          item.selected = true;
        }
      });
    } else {
      this.selected = true;
      let start = this.dateSelect.day;
      let end = this.dateSelect.afterDay;
      this.date = `${start} - ${end}`;
    }
  },
  methods: {
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
      this.dateList.forEach(item => {
        item.selected = false;
        if (idx == item.id) {
          item.selected = true;
        }
      });
      this.$store.commit("SET_DATE", {
        date: idx
      });
    }
  }
};
</script>

