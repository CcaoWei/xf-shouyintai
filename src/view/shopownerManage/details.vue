<template>
  <div class="details-box">
    <div class="content">
      <div class="personal-msg">
        <div class="p-content">
          <div class="c-top">
            <span>个人信息</span>
            <div class="btn-select" @click="changeStatus">
              <span class="select-message" v-if="shopownerMsg.user.status == 10">正常</span>
              <span class="select-message" v-else style="color: red">停用</span>
              <van-icon class="select-icon" name="arrow-down" />
            </div>
          </div>
          <div class="c-bottom">
            <div class="p-icon">
              <img :src="shopownerMsg.user.avatar" alt="" />
            </div>
            <div class="p-msg">
              <div class="p-name">
                <img :src="
                    shopownerMsg.user.sex == 1
                      ? require('@/assets/images/店员详情/男.png')
                      : require('@/assets/images/店员详情/女.png')
                  " alt="" />
                <span>{{ shopownerMsg.user.name }}</span>
                <span class="post">（{{shopownerMsg.user.roleName}}）</span>
              </div>
              <div class="p-tel">
                <van-icon name="phone-o" />
                <span>{{ shopownerMsg.user.phone }}</span>
              </div>
              <div class="job-num">
                <van-icon name="user-circle-o" />
                <span>{{ shopownerMsg.user.cardNo }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="account-msg">
        <div class="a-content">
          <div class="c-top">
            <span>账号信息</span>
            <div class="dropdown-menu">
              <button class="pwd-btn" @click="goUpPwd">修改密码</button>
            </div>
          </div>
          <div class="c-bottom">
            <van-field v-model="shopownerMsg.user.phone" name="账号" label="账号" placeholder="账号" :rules="[{ required: true, message: '请填写账号' }]" readonly />
            <!--              <van-field-->
            <!--                v-model="shopownerMsg.pwd"-->
            <!--                type="password"-->
            <!--                name="密码"-->
            <!--                label="密码"-->
            <!--                placeholder="密码"-->
            <!--                :rules="[{ required: true, message: '请填写密码' }]"-->
            <!--              />-->
          </div>
        </div>
      </div>
      <div class="shop-msg">
        <div class="s-content">
          <div class="s-top">
            <span>店铺信息</span>
            <div class="btn-select" @click="changeStore">
              <span class="select-message">{{shopownerMsg.other.name?shopownerMsg.other.name:"不关联店铺"}}</span>
              <van-icon class="select-icon" name="arrow-down" />
            </div>
          </div>
          <div class="c-bottom">
            <van-cell-group>
              <van-cell title="关联店铺" :value="shopownerMsg.other.name?shopownerMsg.other.name:'不关联店铺'" />
            </van-cell-group>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增类别弹框 -->
    <van-action-sheet v-model="showStatus" :actions="statusActions" @select="updateStatus" />
    <van-popup v-model="showStore" position="bottom">
      <van-picker show-toolbar :columns="storeActions" @cancel="showStore = false" @confirm="updateStore" value-key="name" />
    </van-popup>
    <van-dialog :beforeClose="upPwdClose" confirmButtonText="确认" cancelButtonText="取消" v-model="showUpPwd" title="修改密码" show-cancel-button>
      <van-cell-group>
        <van-field v-model="password" class="priceInput" type="password" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { userDetail, updateUser } from "@/api/store";
import {
  shopList,
  updatePeopleShop,
  updateShopownerPwd
} from "@/api/shopowner";
import { Toast } from "vant";

export default {
  data() {
    return {
      showStatus: false,
      showStore: false,
      showUpPwd: false,
      statusActions: [
        { name: "正常", key: 10 },
        { name: "停用", key: 20 }
      ],
      storeActions: [],
      shopownerMsg: {
        user: {},
        other: {}
      },
      password: ""
    };
  },
  created() {
    this.getData();
    this.getShops();
  },
  methods: {
    getData() {
      userDetail(this.$route.query.shopownerMsg.id).then(res => {
        if (res.status === 200) {
          this.shopownerMsg = { ...res.data.data };
        }
      });
    },
    getShops() {
      shopList().then(res => {
        if (res.status === 200) {
          this.storeActions = [
            { id: "", name: "不关联店铺" },
            ...res.data.data
          ];
        }
      });
    },
    changeStatus() {
      this.showStatus = true;
    },
    updateStatus(item) {
      let data = {
        id: this.shopownerMsg.user.id,
        status: item.key
      };
      updateUser(data).then(res => {
        if (res.status === 200) {
          this.getData();
        }
      });
      this.showStatus = false;
    },
    changeStore() {
      this.showStore = true;
    },
    updateStore(item) {
      if (
        !item.id &&
        (!this.shopownerMsg.other.name ||
          this.shopownerMsg.other.name == "不关联店铺")
      ) {
        this.showStore = false;
      } else {
        let data = {
          id: item.id,
          shopOwner: this.shopownerMsg.user.id
        };
        updatePeopleShop(data).then(() => {
          this.getData();
        });
        this.showStore = false;
      }
    },
    upPwdClose(action, done) {
      if (action == "confirm") {
        if (!this.password) {
          Toast.fail("密码不能为空！");
          done(false);
          return;
        } else if (this.password.length < 8) {
          Toast.fail("密码最少8位!");
          done(false);
          return;
        } else {
          let data = {
            id: this.shopownerMsg.user.id,
            password: this.password
          };
          updateShopownerPwd(data).then(() => {
            Toast.success("修改成功！");
            this.getData();
          });
        }
      } else {
        done();
      }
      this.showUpPwd = false;
      done();
    },
    goUpPwd() {
      this.showUpPwd = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.details-box {
  width: 100%;
  height: 100%;

  .content {
    height: 100%;
    margin: 1.25rem;

    .personal-msg {
      height: 10.187rem;
      background: #fff;
      box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
      margin-bottom: 0.75rem;
      border-radius: 0.375rem;

      .p-content {
        padding: 1.25rem;
        height: 7.75rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;

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

          // // 下拉框样式
          // .dropdown-menu {
          //   .van-dropdown-menu {
          //     // width: 4.25rem;
          //     padding: 0 .5rem;
          //     height: 1.5rem;
          //     background: #fff;
          //     border: none;
          //     font-size: 0.75rem;
          //     border: 1px solid rgba(143, 155, 179, 0.5);
          //     border-radius: 0.25rem;
          //     line-height: 1.5rem;
          //     -webkit-user-select: none;
          //     user-select: none;
          //     .van-dropdown-menu__item {
          //       .van-dropdown-menu__title {
          //         font-size: 0.75rem;
          //         .van-ellipsis {
          //           font-family: PingFangSC-Regular;
          //           font-size: 0.75rem;
          //           color: #222b45;
          //           letter-spacing: 0;
          //           text-align: left;
          //         }
          //       }
          //       .van-popup--top {
          //         top: 0;
          //         right: 20px;
          //         width: 25%;
          //       }
          //     }
          //   }
          // }
        }

        .c-bottom {
          display: flex;
          align-items: center;

          .p-icon {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: #ccc;
            img {
              width: 3rem;
              height: 3rem;
            }
          }

          .p-msg {
            margin-left: 0.75rem;

            .p-name {
              span {
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #222b45;
                line-height: 16px;
              }

              .post {
                font-family: PingFangSC-Light;
                font-size: 16px;
                color: #100000;
                line-height: 16px;
              }
            }

            .p-tel {
              margin-top: 1.25rem;
              color: #222b45;
              opacity: 0.5;
              font-size: 0.875rem;
              font-family: PingFangSC-Light;
            }

            .job-num {
              color: #222b45;
              opacity: 0.5;
              font-size: 0.875rem;
              font-family: PingFangSC-Light;
            }
          }
        }
      }
    }

    .account-msg {
      background: #fff;
      box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
      margin-bottom: 0.75rem;
      border-radius: 0.375rem;

      .a-content {
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;

        .c-top {
          display: flex;
          justify-content: space-between;

          span {
            font-family: PingFangSC-Semibold;
            font-size: 1.125rem;
            color: #222b45;
            letter-spacing: 0;
          }

          .dropdown-menu {
            button {
              padding: 0 !important;
              width: 4.25rem;
              height: 1.5rem;
              background: #fff;
              border: none;
              font-size: 0.75rem;
              border: 1px solid rgba(143, 155, 179, 0.5);
              border-radius: 0.25rem;
              color: #222b45;
              font-family: PingFangSC-Regular;
            }
          }
        }

        .c-bottom {
          .van-cell__title {
            -webkit-box-flex: 0;
            -webkit-flex: none;
            flex: none;
            width: 50px;
          }
        }
      }
    }

    .shop-msg {
      height: 6.625rem;
      background: #fff;
      box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
      margin-bottom: 0.75rem;
      border-radius: 0.375rem;

      .s-content {
        padding: 1.25rem;
        height: 4.125rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;

        .s-top {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          min-height: 2rem;

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

        .c-bottom {
          margin-top: 0.25rem;
        }
      }
    }
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

// 输入框样式
.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
</style>
