<template>
  <!-- <div> -->
  <div class="store" v-if="$route.path=='/entrance/storeManagement'">
    <div v-if="isStore">
      <div class="store-top">
        <div class="top-title">
          <div class="title-text">
            <div class="title-bt">{{storeInfo.name}}</div>
            <div class="title-content">{{storeInfo.address}}</div>
          </div>
          <div class="setting" @click="navToSetup">设置</div>
        </div>

        <van-swipe class="store-img" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in picList" :key="index">
            <img :src="item.url" />
          </van-swipe-item>
        </van-swipe>
        <div class="store-turnover-info">
          <div class="turnover-left">
            <div class="turnover-bt">总销售额</div>
            <div class="turnover-num">¥{{storeInfo.total}}</div>
          </div>
          <div class="turnover-right">
            <div class="turnover-bt">上月销售额</div>
            <div class="turnover-num">¥{{storeInfo.preTotal}}</div>
          </div>
        </div>
      </div>
      <div class="index-content">
        <div class="index-set">
          <div class="index-left">指标设置</div>
          <div class="setting" @click="navToSetup">设置</div>
        </div>
        <div class="index-turnover">
          <div class="turnover-left">单月营业额指标</div>
          <div class="turnover-right">¥ {{storeInfo.monthlyTarget}}</div>
        </div>
      </div>
      <div class="shopowner" v-if="storeInfo.user.name">
        <div class="shopowner-title">人员信息</div>
        <div class="shopowner-info">
          <img :src="storeInfo.user.avatar" alt />
          <div class="shopowner-info-content">
            <div class="name">
              {{storeInfo.user.name}}
              <span>（{{storeInfo.user.roleName}}）</span>
            </div>
            <div class="phone">{{storeInfo.user.phone}}</div>
            <div class="id">{{storeInfo.user.cardNo}}</div>
          </div>
        </div>
      </div>
      <div class="clerk-management">
        <div class="clert-title">
          <div class="clert-title-bt">店员管理</div>
          <div class="setting" @click="navToShoperManage">去管理</div>
        </div>
        <div class="clert-people">
          <div class="people-text">收银员</div>
          <div class="people-num">{{storeInfo.cashNum}}人</div>
        </div>
        <div class="clert-people">
          <div class="people-text">销售店员</div>
          <div class="people-num">{{storeInfo.retailNum}}人</div>
        </div>
      </div>
    </div>

    <div class="add-store" v-else>
      <div class="add-text">快去创建你的第一家门店吧</div>
      <div class="add-btn" @click="navToAddStore">新增门店</div>
    </div>

    <div class="btn-save" @click="navToNotice">发布通知</div>
  </div>
  <div class="page" v-else>
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive" />
  </div>
</template>

<script>
import { isStore, storeDetail } from "@/api/store";

export default {
  data() {
    return {
      picList: [],
      isStore: false,
      storeInfo: {
        name: "",
        address: "",
        total: "",
        preTotal: "",
        monthlyTarget: "",
        user: {
          name: "",
          roleName: "",
          phone: "",
          cardNo: ""
        },
        cashNum: "",
        retailNum: ""
      }
    };
  },
  mounted() {
    console.log("mounted");
  },
  activated() {
    console.log("activated");
  },
  created() {
    if (this.$route.path == "/entrance/storeManagement") {
      this.onload();
    }
  },
  watch: {
    "$route.path": function() {
      if (this.$route.path == "/entrance/storeManagement") {
        this.onload();
      }
    }
  },
  methods: {
    onload() {
      this.picList = [];
      isStore().then(res => {
        if (res.status == 200) {
          if (res.data.data) {
            this.isStore = true;
            storeDetail().then(info => {
              if (info.status == 200) {
                this.storeInfo = JSON.parse(JSON.stringify(info.data.data));
                if (info.data.data.pic) {
                  let picArr = info.data.data.pic.split(",");
                  picArr.forEach(element => {
                    let newObj = { url: element };
                    this.picList.push(newObj);
                  });
                }
              }
            });
          }
        }
      });
    },
    navToAddStore() {
      this.$router.push({
        path: "/entrance/storeManagement/addStore"
      });
    },
    navToSetup() {
      this.$router.push({
        path: "/entrance/storeManagement/storeSetup"
      });
    },
    navToNotice() {
      this.$router.push({
        path: "/entrance/storeManagement/editNotice"
      });
    },
    navToShoperManage() {
      this.$router.push({
        path: "/entrance/shoperManage"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.page {
  height: 100%;
  width: 100%;
}

.store {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  background: #f7f9fc;
  padding-bottom: 6rem;
  box-sizing: border-box;

  .store-top {
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    width: 89.3%;
    margin: 1.25rem auto 0.75rem;
    padding: 1.25rem;
    box-sizing: border-box;

    .top-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;

      .title-text {
        width: calc(100% - 3.75rem);

        .title-bt {
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #222b45;
          letter-spacing: 0;
          text-align: left;
        }

        .title-content {
          font-family: PingFangSC-Light;
          font-size: 0.75rem;
          color: #222b45;
          letter-spacing: 0;
          text-align: left;
          margin-top: 0.375rem;
          height: 1.25rem;
          background: url("../../assets/store/position.png") left center
            no-repeat;
          background-size: 1.25rem;
          padding-left: 0.9375rem;
        }
      }
    }

    .store-img {
      width: 100%;
      height: 10.25rem;
      display: block;
      margin: 1.875rem auto 1rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .store-turnover-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .turnover-left,
      .turnover-right {
        width: 50%;
        height: 2.4375rem;
        padding-left: 1.8215rem;

        .turnover-bt {
          opacity: 0.5;
          font-family: PingFangSC-Regular;
          font-size: 0.75rem;
          color: #222b45;
          letter-spacing: 0;
          text-align: left;
          margin-bottom: 0.375rem;
        }

        .turnover-num {
          font-family: PingFangSC-Medium;
          font-size: 1rem;
          color: #212121;
          letter-spacing: 0;
          text-align: left;
          background: url("../../assets/store/turnover_right.png") left center
            no-repeat; //右边
          background-size: 1.25rem;
          padding-left: 1.625rem;
        }
      }

      .turnover-left {
        padding-left: 0.5rem;
        border-right: 1px solid #e9eaec;

        .turnover-num {
          background: url("../../assets/store/turnover_left.png") left center
            no-repeat; //左边
          background-size: 1.25rem;
          padding-left: 1.625rem;
        }
      }
    }
  }

  .index-content {
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    height: 6.625rem;
    width: 89.3%;
    margin: 0 auto;
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    padding: 1.25rem 1.25rem 0 1.25rem;
    box-sizing: border-box;

    .index-set,
    .index-turnover {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .index-set {
      .index-left {
        font-family: PingFangSC-Semibold;
        font-size: 1.125rem;
        color: #222b45;
        letter-spacing: 0;
      }

      .index-right {
        border: 1px solid rgba(143, 155, 179, 0.5);
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-size: 0.75rem;
        color: #222b45;
        letter-spacing: 0;
        text-align: left;
        width: 3rem;
        height: 0.9375rem;
        text-align: center;
      }
    }

    .index-turnover {
      background: #ffffff;
      box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
      align-items: center;
      height: 2.625rem;

      .index-left {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
      }

      .index-right {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        text-align: right;
      }
    }
  }

  .shopowner {
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    width: 89.3%;
    height: 10.1875rem;
    margin: 0 auto;
    margin-top: 0.75rem;
    padding: 1.25rem 0 0 1.25rem;
    box-sizing: border-box;

    .shopowner-title {
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #222b45;
      letter-spacing: 0;
      text-align: left;
      margin-bottom: 1.5625rem;
    }

    .shopowner-info {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      img {
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
        border-radius: 100%;
      }

      .shopowner-info-content {
        .name {
          font-family: PingFangSC-Medium;
          font-size: 1rem;
          color: #222b45;
          text-align: left;
          padding-left: 1.375rem;
          background: url("../../assets/store/women.png") left center no-repeat; //左边
          background-size: 1rem;

          span {
            font-family: PingFangSC-Light;
            font-size: 1rem;
            color: #100000;
            text-align: left;
          }
        }

        .phone {
          opacity: 0.5;
          font-family: PingFangSC-Light;
          font-size: 0.875rem;
          color: #222b45;
          text-align: left;
          margin: 1.1875rem 0 0.5rem;
          padding-left: 1.375rem;
          background: url("../../assets/store/phone_icon.png") left center
            no-repeat; //左边
          background-size: 1rem;
        }

        .id {
          opacity: 0.5;
          font-family: PingFangSC-Light;
          font-size: 0.875rem;
          color: #222b45;
          padding-left: 1.375rem;
          background: url("../../assets/store/id_card_icon.png") left center
            no-repeat; //左边
          background-size: 1rem;
          text-align: left;
        }
      }
    }
  }

  .clerk-management {
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    height: 9.25rem;
    width: 89.3%;
    margin: 0.75rem auto 0;
    padding: 1.25rem 1.25rem 0 1.25rem;
    box-sizing: border-box;

    .clert-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .clert-title-bt {
        font-family: PingFangSC-Semibold;
        font-size: 1.125rem;
        color: #222b45;
        letter-spacing: 0;
      }
    }

    .clert-people {
      box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 2.625rem;

      .people-text {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
      }

      .people-num {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        text-align: right;
      }
    }
  }

  .add-store {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    .add-text {
      width: 100%;
      text-align: center;
      margin-bottom: 3rem;
    }

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
    }
  }
}

.setting {
  border: 1px solid rgba(143, 155, 179, 0.5);
  border-radius: 4px;
  font-family: PingFangSC-Regular;
  font-size: 0.75rem;
  color: #222b45;
  letter-spacing: 0;
  text-align: left;
  padding: 0.2rem 0.75rem;
}

// .editNotice {
//   font-family: PingFangSC-Medium;
//   font-size: 0.875rem;
//   color: #8f9bb3;
//   text-align: right;
//   position: fixed;
//   top: 1.5rem;
//   right: 1rem;
// }
</style>
