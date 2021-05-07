<template>
  <div class="baseBody">
    <div class="form">
      <div class="form-body">
        <div class="form-title">个人信息</div>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="12">新增类别</van-col>
          <van-col class="font-h" span="12">
            <div class="btn-select" @click="showSelect = true">
              <span class="select-message">{{addInfo.roleName}}</span>
              <van-icon class="select-icon" name="arrow-down" />
            </div>
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row tx-box">
          <van-col class="font-title" span="12">头像</van-col>
          <van-col span="12">
            <input type="file" class="file" @change="handleFileChange" name="" id="">
            <img class="card-img" :src="addInfo.avatar" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="12">姓名</van-col>
          <van-col class="font-h" span="12">
            <van-field v-model="addInfo.name" placeholder="请输入姓名" input-align="right" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="12">性别</van-col>
          <van-col class="font-h" span="12" @click="showSex = true">
            <!-- <van-field v-model="sexText" placeholder="请输入性别" input-align="right" /> -->
            <span>{{sexText}}</span>
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="12">年龄</van-col>
          <van-col class="font-h" span="12">
            <van-field v-model="addInfo.age" placeholder="请输入年龄" type="number" input-align="right" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="12">证件号码</van-col>
          <van-col class="font-h" span="12">
            <van-field v-model="addInfo.cardNo" placeholder="请输入证件号码" input-align="right" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="12">手机号码</van-col>
          <van-col class="font-h" span="12">
            <van-field v-model="addInfo.phone" placeholder="请输入手机号码" input-align="right" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="12">密码</van-col>
          <van-col class="font-h" span="12">
            <van-field v-model="addInfo.password" placeholder="请输入密码" type="password" input-align="right" />
          </van-col>
        </van-row>
      </div>
    </div>
    <!--    <div class="form">-->
    <!--      <div class="form-body">-->
    <!--        <div class="form-title">账号信息</div>-->
    <!--        <van-row class="card-row shadow-row">-->
    <!--          <van-col class="font-title" span="12">账号</van-col>-->
    <!--          <van-col class="font-h" span="12">-->
    <!--            <van-field v-model="addInfo.account" placeholder="请输入账号" input-align="right"/>-->
    <!--          </van-col>-->
    <!--        </van-row>-->
    <!--        <van-row class="card-row shadow-row">-->
    <!--          <van-col class="font-title" span="12">密码</van-col>-->
    <!--          <van-col class="font-h" span="12">-->
    <!--            <van-field-->
    <!--              v-model="addInfo.password"-->
    <!--              placeholder="请输入密码"-->
    <!--              type="password"-->
    <!--              input-align="right"-->
    <!--            />-->
    <!--          </van-col>-->
    <!--        </van-row>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="add-store">
      <div class="add-btn" @click="addSure">创建账号</div>
    </div>
    <van-action-sheet v-model="showSelect" :actions="selectActions" @select="selectChecked" />
    <van-action-sheet v-model="showSex" :actions="sexActions" @select="sexChecked" />
  </div>
</template>

<script>
import { listRole, addUser, uploadImgOnly } from "@/api/store";
import { Dialog, Toast } from "vant";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showSelect: false,
      selectActions: [],
      name: "",
      addInfo: {
        roleId: "", //角色id
        roleName: "", //角色名称
        name: "", //创建的name
        avatar: "https://ecdn.cafewallet.cn//upload/20200519/12c9e482f98ed7f7f1932edcb27fe88b.png",
        sex: "", //性别
        age: "", //年龄
        phone: "", //电话号码
        cardNo: "", //证件号码
        account: "", //账号
        password: "", //密码
        shopId: ""
      },
      showSex: false,
      sexText: "",
      sexActions: [
        { name: "男", key: 1 },
        { name: "女", key: 2 }
      ]
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  beforeMount() {
    listRole().then(res => {
      if (res.status == 200) {
        res.data.data.forEach((element, idx) => {
          let obg = { name: element.roleName, id: element.id };
          this.selectActions.push(obg);
          if (idx == 0) {
            this.addInfo.roleId = element.id;
            this.addInfo.roleName = element.roleName;
          }
        });
      }
    });
  },
  methods: {
    sexChecked(item) {
      this.showSex = false;
      this.sexText = item.name;
      this.sex = item.key;
    },
    selectChecked(value) {
      this.addInfo.roleId = value.id;
      this.addInfo.roleName = value.name;
      this.showSelect = false;
    },
    handleFileChange(e) {
      var param = new FormData(); // FormData 对象
      param.append("file", e.target.files[0]); // 文件对象
      uploadImgOnly(param).then(res => {
        if (res.status == 200) {
          this.addInfo.avatar = res.data.data;
        }
      });
    },
    addSure() {
      if (!this.addInfo.name) {
        Toast.fail("请填写姓名!");
        return;
      }
      if (!this.addInfo.cardNo) {
        Toast.fail("请填写证件号码!");
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.addInfo.phone)) {
        Toast.fail("请填写正确的手机号码!");
        return;
      }
      // if (!this.addInfo.account) {
      //   Toast.fail("请填写账号!");
      //   return;
      // }
      if (!this.addInfo.password) {
        Toast.fail("请填写密码!");
        return;
      }
      this.addInfo.shopId = this.userInfo.dept_id;
      this.addInfo.account = this.addInfo.phone;

      this.addInfo.sex = this.sex;
      Dialog.confirm({
        title: "提示",
        message: "确认增加店员？"
      })
        .then(() => {
          // on confirm
          addUser(this.addInfo).then(() => {
            this.$router.push("/entrance/shoperManage");
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.file {
  position: absolute;
  height: 3.8rem;
  width: 3.8rem;
  top: 0;
  right: 0;
  opacity: 0;
}

.add-store {
  height: 5.125rem;
  /*position: fixed;*/
  /*bottom: 0;*/
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  /*background: #fff;*/
  width: 100%;

  .add-btn {
    background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
    border-radius: 22px;
    height: 2.75rem;
    width: 20.9rem;
    margin: 0 auto;
    font-family: PingFangSC-Semibold;
    font-size: 1rem;
    color: #ffffff;
    text-align: center;
    line-height: 2.75rem;
  }
}

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
        }

        .btn-select {
          border: 1px solid rgba(143, 155, 179, 0.5);
          border-radius: 0.25rem;
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

      .tx-box {
        height: 3.8rem;
      }
    }
  }

  .card-img {
    width: 3rem;
    height: 3rem;
    float: right;
    border-radius: 100%;
  }
}
</style>
