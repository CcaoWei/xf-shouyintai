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
              <span class="select-message" v-if="info.user.status ==10">正常</span>
              <span class="select-message select-message-red" v-else>停止</span>
              <van-icon class="select-icon" name="arrow-down" />
            </div>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="4">
            <img class="card-img" :src="info.user.avatar" />
          </van-col>
          <van-col span="20">
            <van-row>
              <van-col span="24" class="t-a-l">
                <img class="sex-img" v-if="info.user.sex == 1" src="/static/shoper-female.png" />
                <img class="sex-img" v-else src="/static/shoper-male.png" />
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
                <van-icon size="1.25erm" name="phone-o" />
                <span class="shoper-phone">{{info.user.phone}}</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24" class="t-a-l">
                <van-icon size="1.25erm" name="user-circle-o" />
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
            <input type="text" readonly value="********" />

            <!-- <span class="font-gray">{{info.user.password}}</span> -->
          </van-col>
          <!-- <van-col span="6" @click="typeValue=='password' ? typeValue='text' : typeValue='password'" class="show-password">
            <van-icon name="browsing-history-o" />
          </van-col> -->
        </van-row>
      </div>
    </div>
    <div class="form">
      <div class="form-body">
        <div class="form-title">销售信息</div>
        <van-row class="card-row shadow-row">
          <van-col class="font-title-gray" span="12">销售订单</van-col>
          <van-col class="font-h" span="12">{{info.other.orderNum}}笔</van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title-gray" span="12">退单处理</van-col>
          <van-col class="font-h" span="12">{{info.other.reNum}}笔</van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title-gray" span="12">销售额</van-col>
          <van-col class="font-h" span="12">{{info.other.total}}元</van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title-gray" span="12">总退款金额</van-col>
          <van-col class="font-h" span="12">{{info.other.refundPrice}}元</van-col>
        </van-row>
      </div>
    </div>
    <van-action-sheet v-model="showSelect" :actions="selectActions" @select="selectChecked" />
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
import { userDetail,updateUser} from "@/api/store";
import {updateShopownerPwd} from "@/api/shopowner";
import {Toast} from "vant";

export default {
  data() {
    return {
      typeValue:"password",//密码显示问题
      showSelect: false,
      showUpPwd: false,
      selectActions: [
        { name: "正常", status: 10 },
        { name: "停止", status: 20 }
      ],
      selectId: 0, //保存点击的id
      name: "",
      password: "",
      info: {
        other: {
          total: "5767.50",
          reNum: "7",
          orderNum: "27"
        },
        user: {
        id: "1231550268840099841",
        status: 10,
        name: "史凯鹏",
        avatar: "",
        password: "",
        roleName: "店员",
        roleId: 1230813245531492400,
        shopId: "",
        sex: 1,
        age: "",
        phone: "15234340201",
        account: "cc",
        cardNo: "11"
      }
      },

    };
  },
  created() {
    this.getUserDetail(this.$route.query.id);
  },
  methods: {
    selectType(idx) {
      // 保存点击的是第几个元素
      this.selectId = idx;
      this.showSelect = true;
    },
    navToSetPwd(){//修改密码

    },
    getUserDetail(id) {
      userDetail(id).then(res => {
        if (res.status == 200) {
          this.info = res.data.data;
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
