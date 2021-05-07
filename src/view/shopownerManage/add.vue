<template>
  <div class="base-center">
    <div class="content">
      <div class="form">
        <div class="form-body">
          <div class="form-title">个人信息</div>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="12">新增类别</van-col>
            <van-col class="font-h" span="12">
              <div class="btn-select">
                <span class="select-message">店长</span>
                <van-icon class="select-icon" name="arrow-down" />
              </div>
            </van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="12">头像</van-col>
            <van-col span="12">
              <input type="file" class="file" @change="handleFileChange" name id />
              <img class="card-img" :src="avatar" />
            </van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="12">姓名</van-col>
            <van-col class="font-h" span="12">
              <van-field v-model="name" placeholder="请输入姓名" maxlength="10" input-align="right" />
            </van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="12">性别</van-col>
            <van-col class="font-h" span="12" @click="showSex = true">
              <!-- <van-field v-model="sex" placeholder="请输入性别" input-align="right" /> -->
              <span>{{sexText}}</span>
              <van-icon name="arrow" />
            </van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="12">年龄</van-col>
            <van-col class="font-h" span="12">
              <van-field v-model="age" placeholder="请输入年龄" type="number" input-align="right" />
            </van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="12">证件号码</van-col>
            <van-col class="font-h" span="12">
              <van-field v-model="cardNo" placeholder="请输入证件号码" input-align="right" />
            </van-col>
          </van-row>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="12">手机号码</van-col>
            <van-col class="font-h" span="12">
              <van-field v-model="phone" placeholder="请输入手机号码" input-align="right" />
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="form">
        <div class="form-body">
          <div class="c-top">
            <span>店铺信息</span>
            <div class="btn-select" @click="selectShop">
              <span class="select-message">选择店铺</span>
              <van-icon class="select-icon" name="arrow-down" />
            </div>
          </div>
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="12">关联店铺</van-col>
            <van-col class="font-h" span="12">{{shopName}}</van-col>
          </van-row>
        </div>
      </div>
      <div class="form">
        <div class="form-body">
          <div class="form-title">账号信息</div>
          <!--          <van-row class="card-row shadow-row">-->
          <!--            <van-col class="font-title" span="12">账号</van-col>-->
          <!--            <van-col class="font-h" span="12">-->
          <!--              <van-field-->
          <!--                v-model="accountNum"-->
          <!--                placeholder="请输入账号"-->
          <!--                input-align="right"-->
          <!--              />-->
          <!--            </van-col>-->
          <!--          </van-row>-->
          <van-row class="card-row shadow-row">
            <van-col class="font-title" span="12">密码</van-col>
            <van-col class="font-h" span="12">
              <van-field v-model="password" placeholder="请输入密码" type="password" input-align="right" />
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="create">
        <button @click="add">新增店长</button>
      </div>
    </div>

    <!-- 店铺信息弹框 -->
    <van-action-sheet v-model="showSex" :actions="sexActions" @select="sexChecked" />
    <van-popup v-model="showStore" position="bottom">
      <van-picker show-toolbar :columns="storeActions" @cancel="showStore = false" @confirm="updateStore" value-key="name" />
    </van-popup>
  </div>
</template>

<script>
import { shopList, addShopowner } from "@/api/shopowner";
import { uploadImgOnly } from "@/api/store";
import { Toast } from "vant";

export default {
  data() {
    return {
      showStore: false,
      storeActions: [""],
      name: "",
      sex: "",
      age: "",
      cardNo: "",
      phone: "",
      shopId: "",
      shopName: "",
      avatar: "https://ecdn.cafewallet.cn//upload/20200519/4b203a687dd611863a907ab343b075fb.png",
      // accountNum:"",
      password: "",
      showSex: false,
      sexText: "",
      sexActions: [
        { name: "男", key: 1 },
        { name: "女", key: 2 }
      ]
    };
  },
  created() {
    this.getShops();
  },
  methods: {
    sexChecked(item) {
      this.showSex = false;
      this.sexText = item.name;
      this.sex = item.key;
    },
    getShops() {
      shopList().then(res => {
        if (res.status === 200) {
          this.storeActions = ["", ...res.data.data];
        }
      });
    },
    add() {
      if (!this.name) {
        Toast.fail("请填写姓名!");
        return;
      }
      if (!this.cardNo) {
        Toast.fail("请填写证件号码!");
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        Toast.fail("请填写正确的手机号码!");
        return;
      }
      if (!this.password) {
        Toast.fail("请填写密码!");
        return;
      }

      let data = {
        name: this.name,
        sex: this.sex,
        age: this.age,
        cardNo: this.cardNo,
        phone: this.phone,
        password: this.password,
        shopId: this.shopId,
        avatar: this.avatar
      };
      addShopowner(data).then(res => {
        if (res.status === 200) {
          this.$router.push("/entrance/shopownerManage");
        }
      });
    },
    selectShop() {
      this.showStore = true;
    },
    updateStore(item) {
      this.shopId = item.id;
      this.shopName = item.name;
      this.showStore = false;
    },
    handleFileChange(e) {
      var param = new FormData(); // FormData 对象
      param.append("file", e.target.files[0]); // 文件对象
      uploadImgOnly(param).then(res => {
        if (res.status == 200) {
          this.avatar = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.file {
  position: absolute;
  height: 2.75rem;
  width: 2.75rem;
  top: 0;
  right: 0;
  opacity: 0;
}

.base-center {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .content {
    margin: 1.25rem;

    .form {
      margin-bottom: 0.75rem;
      background: #fff;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
      border-radius: 0.375rem;
      padding: 1rem;

      .form-body {
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
            // width: 4.25rem;
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

        .card-img {
          width: 2.75rem;
          height: 2.75rem;
          float: right;
        }

        .c-top {
          display: flex;
          justify-content: space-between;

          span {
            font-family: PingFangSC-Semibold;
            font-size: 1.125rem;
            color: #222b45;
            letter-spacing: 0;
          }

          .btn-select {
            border: 1px solid rgba(143, 155, 179, 0.5);
            border-radius: 0.25rem;
            // width: 4.25rem;
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
  }

  .create {
    margin-bottom: 1.25rem;

    button {
      width: 100%;
      height: 2.75rem;
      background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
      border-radius: 22px;
      border: none;
      color: #fff;
    }
  }
}
</style>
