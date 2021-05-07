<template>
  <div class="baseBody" v-if="$route.path == '/entrance/addMember'">
    <div class="form">
      <div class="form-body">
        <div class="title">个人信息</div>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6"><span style="color:red">*</span>手机号</van-col>
          <van-col class="font-h" span="18">
            <van-field v-model="phone" placeholder="请输入手机号" input-align="right" type="number"/>
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6">姓名</van-col>
          <van-col class="font-h" span="18">
            <van-field v-model="name" placeholder="请输入姓名" input-align="right" maxlength="10"/>
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="12">性别</van-col>
          <van-col class="font-h" span="12" @click="showSex = true">
            <!-- <van-field v-model="sex" placeholder="请输入性别" input-align="right" /> -->
            <span v-if="sexText">{{sexText}}</span>
            <span v-else>请选择性别</span>
            <van-icon name="arrow"/>
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6">邮箱</van-col>
          <van-col class="font-h" span="18">
            <van-field v-model="email" placeholder="请输入邮箱" input-align="right"/>
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6">生日</van-col>
          <van-col class="font-h" span="18" @click="showCalendar = true">
            <span v-if="birthday">{{birthday}}</span>
            <span v-else>请选择时间</span>
            <van-icon name="arrow"/>
          </van-col>
        </van-row>
        <van-row class="card-row">
          <van-col class="font-title" span="6">年龄</van-col>
          <van-col class="font-h" span="18">
            <van-field v-model="age" placeholder="" input-align="right"/>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="tips">信息越完善，会员资质将会越优质哦</div>
    <div class="btn-area">
      <button class="btn-edit" @click="addSure">保存</button>
    </div>
    <van-action-sheet v-model="showSex" :actions="sexActions" @select="sexChecked"/>
    <van-popup v-model="showCalendar" position="bottom">
      <!-- 年月日 -->
      <van-datetime-picker
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="showCalendar = false"
      />
    </van-popup>
  </div>
  <div v-else class="other-box">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>
</template>

<script>
  import {addMember} from "@/api/member";
  import {Toast} from "vant";

  export default {
    computed: {},
    data() {
      return {
        showCalendar: false,
        showSex: false,
        sexText: '',
        sexActions: [
          {name: "男", key: 1},
          {name: "女", key: 2}
        ],
        phone: '',
        name: '',
        sex: '',
        email: '',
        birthday: '',
        age: '',
        birthDate: null,
        minDate: new Date(1920, 0, 1),
        maxDate: new Date(),
      };
    },
    activated() {
      this.phone = '';
      this.name = '';
      this.sex = '';
      this.email = '';
      this.birthday = '';
      this.age = '';
      this.sexText = '';
      this.birthDate = null;
    },
    watch: {
      birthDate() {
        if (this.birthDate) {
          this.age = new Date().getFullYear() - this.birthDate.getFullYear();
        }
      }
    },
    methods: {
      sexChecked(item) {
        this.showSex = false;
        this.sexText = item.name;
        this.sex = item.key;
      },
      onConfirm(date) {
        this.showCalendar = false;
        this.birthday = date.format("yyyy-MM-dd");
        this.birthDate = date;
      },
      addSure() {
        if (!/^1[3456789]\d{9}$/.test(this.phone)) {
          Toast.fail("手机号格式错误!");
          return;
        }
        if (this.email && !/^([A-Za-z0-9_+-.])+@([A-Za-z0-9\-.])+\.([A-Za-z]{2,22})$/.test(this.email)) {
          Toast.fail("邮箱格式错误!");
          return;
        }
        let params = {
          age: this.age,
          birthday: this.birthday,
          mail: this.email,
          name: this.name,
          phone: this.phone,
          sex: this.sex
        };
        // on confirm
        addMember(params).then((res) => {
          this.$router.push({
            path: "/entrance/addMember/result",
            query: {
              result: res.data.data,
            }
          });
        });
      }
    }
  };
</script>

<style lang='scss' scoped>
  .baseBody {
    height: 100%;
    padding-bottom: 5.125rem;
    padding-top: 1px;
    overflow-y: auto;

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

        .title {
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #222B45;
          letter-spacing: 0;
          text-align: left;
          margin-bottom: .625rem;
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

        .card-row {
          height: 2.75rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;

          .font-title {
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            text-align: left;
          }

          .font-h {
            opacity: 0.5;
            font-family: PingFangSC-Regular;
            font-size: 0.875rem;
            color: #222b45;
            text-align: right;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            /deep/ input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
              color: #222b45;
            }
            /deep/ input:-moz-placeholder { /* Mozilla Firefox 4 to 18 适配火狐 */
              color: #222b45;
            }
            /deep/ input::-moz-placeholder { /* Mozilla Firefox 19+ 适配火狐 */
              color: #222b45;
            }
            /deep/ input:-ms-input-placeholder { /* Internet Explorer 10+  适配ie*/
              color: #222b45;
            }
          }
        }
      }
    }

    .tips {
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #222B45;
      position: fixed;
      bottom: 6.625rem;
      text-align: center;
      width: 100%;
    }

    .btn-area {
      background-color: #fff;
      position: fixed;
      bottom: 0;
      height: 5.125rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-shadow: 0 0 0.0625rem 0 rgba(10, 22, 70, 0.06),
      1.25rem 0 2.875rem -0.625rem rgba(10, 22, 70, 0.1);

      .btn-edit {
        background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
        border-radius: 1.375rem;
        font-family: PingFangSC-Semibold;
        font-size: 1rem;
        color: #ffffff;
        text-align: center;
        width: 90%;
        height: 2.75rem;
        border: 0;
      }
    }
  }

  .other-box {
    height: 100%;
  }
</style>
