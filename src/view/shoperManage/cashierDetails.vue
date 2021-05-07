<template>
  <div class="baseBody">
    <div class="form">
      <div class="form-body">
        <van-row class="card-row">
          <van-col class="font-title" span="12">
            <div class="form-title">个人信息</div>
          </van-col>
          <van-col span="12">
            <div class="btn-select" @click="selectType(info.user.id)">
              <span class="select-message">{{info.status}}</span>
              <van-icon class="select-icon" name="arrow-down"/>
            </div>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="4">
            <img class="card-img" :src="info.user.avatar"/>
          </van-col>
          <van-col span="20">
            <van-row>
              <van-col span="24" class="t-a-l">
                <img class="sex-img" v-if="info.user.sex == 1" src="/static/shoper-female.png"/>
                <img class="sex-img" v-else src="/static/shoper-male.png"/>
                <span class="shoper-name">{{info.user.name}}</span>
                <span class="shoper-type">（{{info.user.roleName}}）</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24" class="t-a-l">
                <span class="shoper-phone">&nbsp;</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24" class="t-a-l">
                <van-icon size="1.25erm" name="phone-o"/>
                <span class="shoper-phone">{{info.user.phone}}</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24" class="t-a-l">
                <van-icon size="1.25erm" name="user-circle-o"/>
                <span class="shoper-phone">{{info.user.cardNo}}</span>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="form">
      <div class="form-body">
        <van-row class="card-row">
          <van-col span="12">
            <div class="form-title">账号信息</div>
          </van-col>
          <van-col span="12">
            <div class="btn-update" @click="navToSetPwd">
              <span class="update-message" @click="goUpPwd">修改密码</span>
            </div>
          </van-col>
        </van-row>

        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="24">
            <span>账号</span>
            <span class="font-gray">{{info.user.account}}</span>
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="18">
            <span>密码</span>
            <!-- <input :type="typeValue" readonly :value="info.user.password" /> -->
            <input type="text" readonly value="********"/>

            <!-- <span class="font-gray">{{info.user.password}}</span> -->
          </van-col>
          <!-- <van-col
            span="6"
            @click="typeValue=='password' ? typeValue='text' : typeValue='password'"
            class="show-password"
          >
            <van-icon name="browsing-history-o" />
          </van-col> -->
        </van-row>
      </div>
    </div>
    <div class="form">
      <div class="form-body">
        <div class="form-title">销售信息</div>
        <van-row class="card-row shadow-row">
          <van-col class="font-title-gray" span="12">收款单数</van-col>
          <van-col class="font-h" span="12">{{info.other.orderNum}}笔</van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title-gray" span="12">销售额</van-col>
          <van-col class="font-h" span="12">{{info.other.total}}元</van-col>
        </van-row>
      </div>
    </div>
    <div class="form">
      <div class="form-body">
        <van-row>
          <van-col span="12">
            <div class="form-title">交班记录</div>
          </van-col>
          <van-col span="12" @click="showCalendar">
            <van-icon class="btn-calendar" name="/static/calendar.png" size="1.5rem"/>
          </van-col>
        </van-row>

        <!-- <van-pull-refresh   v-model="isLoading" @refresh="onRefresh" success-text="刷新成功"> -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-row class="card-row shadow-row" v-for="(item,index) in shiftRecord" :key="index">
            <van-col class="font-h-left" span="12">{{item.uiTime}} {{item.uiStartTime}}~{{item.uiEndTime}}</van-col>
            <van-col class="font-title-gray-right" span="12">
              <span class="link-message" @click="navToHandoverDetail(item.id)">详情</span>
              <van-icon class="link-icon" name="arrow"/>
            </van-col>
          </van-row>
        </van-list>
        <!-- </van-pull-refresh> -->


      </div>
    </div>
    <van-action-sheet v-model="showSelect" :actions="selectActions" @select="selectChecked"/>
    <!-- <van-calendar v-model="show" @confirm="onConfirm" :show-confirm="false" /> -->
    <!-- 日期弹框 -->
    <van-popup v-model="show" position="bottom">
      <!-- 年月日 -->
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="show = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-dialog :beforeClose="upPwdClose" confirmButtonText="确认" cancelButtonText="取消" v-model="showUpPwd"
                title="修改密码"
                show-cancel-button>
      <van-cell-group>
        <van-field v-model="password" class="priceInput" type="password"/>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
  // import {addInventory, saveInventory} from "@/api/inventory";
  // import {userDetail} from "@/api/store";
  import {userDetail, updateUser, listChange} from "@/api/store";
  import {updateShopownerPwd} from "@/api/shopowner";
  import {Toast} from "vant";

  export default {
    data() {
      return {
        typeValue: "password", //密码显示问题
        showSelect: false,
        showUpPwd: false,
        selectActions: [
          {name: "正常", status: 10},
          {name: "停止", status: 20}
        ],
        selectId: 0, //保存点击的id
        name: "",
        password: "",
        info: {
          other: {
            total: "",
            reNum: "",
            orderNum: ""
          },
          user: {},
          status: 10
        },
        // showSelect: false,
        // selectActions: [{ name: "正常" }, { name: "停止" }],
        // name: "",
        show: false,
        dataInfo: {
          id: this.$route.query.id,
          current: 0,
          size: 10,

          time: "2020-02"
        },
        shiftRecord: [],
        minDate: new Date(2017, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        loading: false,
        finished: false,

      };
    },
    created() {
      this.getUserDetail(this.$route.query.id);
      let time = new Date();
      this.dataInfo.time = time.format("yyyy-MM")
      // this.onLoad()
    },
    methods: {
      onConfirm(value) {
        this.dataInfo.time = value.format("yyyy-MM");
        this.show = false;
        this.dataInfo.current = 1;
        this.shiftRecord = []
        this.getListChange(this.dataInfo)
      },
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`
        }
        return val;
      },
      navToHandoverDetail(id) {
        this.$router.push({
          path: "/entrance/shoperManage/handoverDetail",
          query: {
            id: id
          }
        });
      },
      getListChange(data) {
        listChange(data).then(res => {
          console.log(res)
          if (res.status == 200) {
            let newJoinRes = JSON.parse(JSON.stringify(res.data.data))
            this.shiftRecord = this.shiftRecord.concat(newJoinRes.records);

            this.shiftRecord.forEach(element => {
              if (element.startTime) {
                let dateArr = element.startTime.split(" ");
                let dateMo = dateArr[0].split("-");
                element.uiTime = `${dateMo[1]}月${dateMo[2]}日`;
                element.uiStartTime = dateArr[1].substr(0, 5);
              }
              if (element.endTime) {
                let dateArr = element.endTime.split(" ");
                element.uiEndTime = dateArr[1].substr(0, 5);
              } else {
                element.uiEndTime = "暂无"
              }
            });
            this.loading = false;
            // // 数据全部加载完成
            if (this.shiftRecord.length == newJoinRes.total) {
              this.finished = true;
            }

          }
        });
      },
      onLoad() {
        this.dataInfo.current = this.dataInfo.current + 1;
        this.getListChange(this.dataInfo);
      },

      selectType(idx) {
        // 保存点击的是第几个元素
        this.selectId = idx;
        this.showSelect = true;
      },
      navToSetPwd() {
        //修改密码
      },
      getUserDetail(id) {
        userDetail(id).then(res => {
          if (res.status == 200) {
            this.info = res.data.data;
            if (res.data.data.user.status) {
              if (res.data.data.user.status == 20) {
                this.info.status = "停止";
              } else {
                this.info.status = "正常";
              }
            }
          }
        });
      },
      selectChecked(value) {
        let obj = {
          id: this.selectId,
          status: value.status
        };
        this.showSelect = false;
        updateUser(obj).then(res => {
          if (res.status == 200) {
            this.getUserDetail(this.$route.query.id);
          }
        });
      },
      showCalendar() {
        this.show = true;

      },
      upPwdClose(action, done) {
        if (action == "confirm") {
          if (!this.password) {
            Toast.fail('密码不能为空！');
            done(false);
            return;
          } else if (this.password.length < 8) {
            Toast.fail("密码最少8位!");
            done(false);
            return;
          }else{
            let data = {
              id: this.info.user.id,
              password: this.password
            };
            updateShopownerPwd(data).then(() => {
              Toast.success('修改成功！');
              this.getUserDetail(this.$route.query.id);
              done()
            });
          }
        } else{
          done();
        }
        this.showUpPwd = false;
      },
      goUpPwd(){
        this.showUpPwd = true;
      }
    }
  };
</script>

<style lang='scss' scoped>
  .baseBody {
    height: 100%;
    overflow-y: scroll;

    .form {
      margin: 0.5rem auto 0;

      .form-body {
        border-radius: 0.375rem;
        background: #fff;
        margin: 1rem;
        padding: 1rem;

        /deep/ .van-cell {
          padding: 0;
        }

        .form-title {
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #222b45;
          letter-spacing: 0;
          text-align: left;
        }

        .shadow-row {
          border-bottom: 1px solid rgba(143, 155, 179, 0.05);
        }

        .btn-calendar {
          height: 1.5rem;
          float: right;
        }

        .card-row {
          height: 2.75rem;
          display: flex;
          flex-direction: row;
          align-items: center;

          .font-title {
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            text-align: left;
          }

          .font-title-gray {
            opacity: 0.5;
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            text-align: left;
          }

          .font-title-gray-right {
            opacity: 0.5;
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            text-align: right;
            display: flex;
            flex-direction: row;
            right: 0;

            .link-message {
              flex: 1;
              text-align: right;
              align-self: center;
            }

            .link-icon {
              flex: 0;
              text-align: right;
              align-self: center;
            }
          }

          .font-gray {
            opacity: 0.5;
            font-family: PingFangSC-Light;
            font-size: 0.875rem;
            color: #222b45;
          }

          .show-password {
            text-align: right;
          }

          .font-h {
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            text-align: right;
          }

          .font-h-left {
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            text-align: left;
          }

          .btn-update {
            border: 1px solid rgba(143, 155, 179, 0.5);
            border-radius: 0.25rem;
            width: 4.5rem;
            height: 1.5rem;
            float: right;

            .update-message {
              font-family: PingFangSC-Regular;
              font-size: 0.75rem;
              color: #222b45;
              letter-spacing: 0;
              text-align: center;
            }
          }

          .btn-select {
            border: 1px solid rgba(143, 155, 179, 0.5);
            border-radius: 0.25rem;
            width: 4.25rem;
            height: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            float: right;

            .select-message {
              margin-left: 1rem;
              font-family: PingFangSC-Regular;
              font-size: 0.875rem;
              color: #222b45;
              letter-spacing: 0;
              text-align: left;
            }

            .select-message-red {
              margin-left: 1rem;
              font-family: PingFangSC-Regular;
              font-size: 0.875rem;
              color: #fe5845;
              letter-spacing: 0;
              text-align: left;
            }

            .select-icon {
              margin-right: 0.5rem;
              font-size: 0.875rem;
              color: #222b45;
              letter-spacing: 0;
              text-align: right;
            }
          }
        }
      }
    }

    .card-img {
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
    }

    .t-a-l {
      text-align: left;
      padding-left: 0.5rem;
    }

    .shoper-name {
      font-family: PingFangSC-Medium;
      font-size: 1rem;
      color: #222b45;
    }

    .shoper-type {
      font-family: PingFangSC-Light;
      font-size: 1rem;
      color: #100000;
    }

    .sex-img {
      width: 1rem;
      height: 1rem;
    }
    .priceInput {
      width: 15.5rem;
      height: 2.6rem;
      margin: 2rem auto;
      background: rgba(143, 155, 179, 0.1);
      border: 1px solid rgba(143, 155, 179, 0.1);
      border-radius: 6px;
      font-size: 1.25rem;
      border-radius: 6px;

      .van-field__left-icon {
        color: #8f9bb3;
        line-height: 1.25rem;

        i {
          font-size: 1.5rem;
        }
      }
    }
  }
</style>
