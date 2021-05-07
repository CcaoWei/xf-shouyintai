<template>
  <div>
    <van-row class="check-date">
      <van-col span="4">
        <van-button
          class="check-btn"
          :class="{ 'check-btn-checked': pickerData.btnCheck == 1 }"
          type="default"
          @click="checkType(1)"
        >年
        </van-button
        >
      </van-col>

      <van-col span="4">
        <van-button
          class="check-btn"
          :class="{ 'check-btn-checked': pickerData.btnCheck == 2 }"
          type="default"
          @click="checkType(2)"
        >月
        </van-button
        >
      </van-col>

      <van-col span="4">
        <van-button
          class="check-btn"
          :class="{ 'check-btn-checked ': pickerData.btnCheck == 3 }"
          type="default"
          @click="checkType(3)"
        >日
        </van-button
        >
      </van-col>
      <van-col span="12" v-show="showDateBtn">
        <van-icon
          class="btn-calendar"
          name="/static/calendar.png"
          size="1.5rem"
          @click="pickerData.showDatePicker = true"
        />
      </van-col>
    </van-row>
    <!-- 日期弹框 -->
    <van-popup v-model="pickerData.showDatePicker" position="bottom">
      <!-- 年月日 -->
      <van-datetime-picker
        :class="{ isCan: isHideM }"
        :type="pickerData.dateType"
        :min-date="pickerData.minDate"
        v-model="currentDate"
        :max-date="pickerData.maxDate"
        :formatter="formatter"
        @cancel="pickerData.showDatePicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  export default {
    props: {
      pickerData: {
        type: Object,
        default: function () {
          return {
            minDate: new Date(2017, 0, 1), //日期选择最小值
            maxDate: new Date(2999, 10, 1), //日期选择最大值
            dateType: "year-month", //弹框类型，默认为date
            showDatePicker: false, //是否显示日期选择器弹窗
            btnCheck: 1 //判断年 月 日 是谁选中
          };
        }
      },
      reload: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      isAllCanShowPicker: {
        //必选  点击年是否显示日期选择

        required: true
      }
    },
    mounted() {
      // console.log(this);
    },
    data() {
      return {
        isHideM: this.isAllCanShowPicker,
        showDateBtn: this.isAllCanShowPicker,
        currentDate: new Date()
      };
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
      checkType(type) {
        this.$emit("setReload", false);
        this.pickerData.btnCheck = type;
        this.$emit("checkType", type);
        if (this.isAllCanShowPicker) {
          //点击年月日都要显示 日历按钮
          this.showDateBtn = true;
          if (this.pickerData.btnCheck == 1) {
            // 1年 2月 3日
            this.pickerData.dateType = "year-month";
            this.isHideM = true;
          } else if (this.pickerData.btnCheck == 2) {
            this.pickerData.dateType = "year-month";
            this.isHideM = false;
          } else if (this.pickerData.btnCheck == 3) {
            this.pickerData.dateType = "date";
            this.isHideM = false;
          }
        } else {
          if (this.pickerData.btnCheck == 1) {
            // 1年 2月 3日
            this.showDateBtn = false;
            this.isHideM = false;
          } else if (this.pickerData.btnCheck == 2) {
            this.pickerData.dateType = "year-month";
            this.showDateBtn = true;
            this.isHideM = true;
          } else {
            this.pickerData.dateType = "year-month";
            this.showDateBtn = true;
            this.isHideM = false;
          }
        }
      },
      onConfirm(value) {

        if (this.isAllCanShowPicker) {
          //传参为  年  年月  年月日
          if (this.pickerData.btnCheck == 1) {
            //年
            this.$emit("dataConfirm", value.format("yyyy"), this.pickerData.btnCheck);
          } else if (this.pickerData.btnCheck == 2) {
            //年月
            this.$emit("dataConfirm", value.format("yyyy-MM"), this.pickerData.btnCheck);
          } else if (this.pickerData.btnCheck == 3) {
            //年月日
            this.$emit("dataConfirm", value.format("yyyy-MM-dd"), this.pickerData.btnCheck);
          }
        } else {
          //传参为  空  年  年月
          if (this.pickerData.btnCheck == 1) {
            //空
            this.$emit("dataConfirm", "", this.pickerData.btnCheck);
          } else if (this.pickerData.btnCheck == 2) {
            //年
            this.$emit("dataConfirm", value.format("yyyy"), this.pickerData.btnCheck);
          } else if (this.pickerData.btnCheck == 3) {
            //年月
            this.$emit("dataConfirm", value.format("yyyy-MM"), this.pickerData.btnCheck);
          }
        }

        this.pickerData.showDatePicker = false;
      }
    },
    watch:{
      reload(){
        if(this.reload){
          this.pickerData.btnCheck = 1;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
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

  .isCan {
    /deep/ .van-picker__columns {
      /deep/ div:nth-child(2) {
        display: none;
      }
    }
  }
</style>
