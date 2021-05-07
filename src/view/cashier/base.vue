<template>
  <!-- <div class="baseBody"> -->
  <div class="baseBody" v-if="$route.path=='/entrance/cashierBase'">
    <van-row class="vrow">
      <van-col span="24">
        <!-- <van-field class="radius-5" placeholder="条形码/关键字查询商品" v-model="goodCode" /> -->
        <van-field class="search" placeholder="条形码查询商品" v-model="goodCode">
          <template #button>
            <van-icon class="search-icon" name="/static/search-black.png" @click="getGood"/>
          </template>
        </van-field>
      </van-col>
      <!-- <van-col span="5">
        <van-button class="radius-5 vsearch" type="default" icon="search" @click="search"></van-button>
      </van-col>
      <van-col span="5">
        <van-button
          class="radius-5 vlock"
          type="default"
          :icon="unLock == 1?'/static/unLock.png':'/static/lock.png'"
          @click="dayReport"
          :disabled="unLock != 1"
        ></van-button>
      </van-col>-->
    </van-row>
    <div class="base-box" v-if="unLock == 1">
      <div class="labelText-new">
        <div class="member-title">
          <div class="labelText-text">会员信息</div>
          <div class="add" v-if="!memberInfo" @click="inputMember">添加</div>
          <div class="add" v-else @click="deleteMember">更换</div>
        </div>
        <div class="member-info" v-if="memberInfo">
          <div class="info-text">
            <span v-if="memberInfo.name">{{memberInfo.name}}</span>
            <span v-else>会员</span>
          </div>
          <div class="info-text">{{memberInfo.integral}}积分</div>
        </div>
        <div class="member-info" v-if="memberInfo">
          <div class="info-phone">{{memberInfo.phone}}</div>
          <div class="info-message">可抵扣 ¥{{memberInfo.deduction}}</div>
        </div>
        <div class="member-info-no" v-else>暂无会员信息</div>
      </div>
      <van-popup v-model="showAdd" class="popup-box">
        <div class="search-text">查询会员</div>
        <van-field class="input-text" v-model="memberPhone" placeholder="请输入手机号"/>
        <div class="btn-box">
          <div class="cancel" @click="showAdd = !showAdd">取消</div>
          <div class="confirm" @click="addConfirm">确定</div>
        </div>
      </van-popup>
      <van-popup v-model="showFail" class="popup-box">
        <div class="fail-title">添加失败</div>
        <div class="fail-message">未查询到该会员信息</div>
        <div class="btn-box">
          <div class="cancel" @click="showFail = false">取消</div>
          <div class="confirm" @click="goCreate">去创建</div>
        </div>
      </van-popup>
      <div class="add-ok" v-if="showAddSuccess">会员添加成功</div>
      <!-- <div class="labelText">会员</div> -->
      <!-- <van-field class="radius-5 vcode" placeholder="请输手机号码/会员号" v-model="vipCode" /> -->
      <div class="labelText">零售员</div>
      <div class="imgs">
        <div class="head-pic van-image" v-for="(item,index) in heads" :key="index" @click="headPicCheck(item)">
          <img class="img-check" src="/static/check.png" v-if="item.selected"/>
          <img class="van-image__img head-pic-img" :src="item.pic" :name="index"/>
          <div class="imgText" :class="{'head-pic-hover':item.selected}">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="lockTipsImgAera" v-if="unLock != 1">
      <img src="/static/lockTips.png" class="lockTipsImg"/>
      <div class="lockTipsText">已完成日结，无法再次使用</div>
    </div>

    <div v-if="unLock == 1" class="labelText cardText">
      待收银订单
      <span class="clearShop" @click="clearData">清空商品</span>
    </div>
    <div class="cardArea" v-if="unLock == 1" :class="{'shortArea':memberInfo}">
      <div class="cardBody">
        <van-swipe-cell v-for="(item,index) in goods" :key="index" :before-close="beforeClose" class="card-item">
          <template slot="right">
            <van-button square type="danger" text="删除" class="deleteBtn" @click="clickDelete(item.id)"/>
          </template>
          <van-card>
            <div slot="desc">
              <van-row>
                <van-col class="goods-bt" span="16">{{item.name}}</van-col>
                <van-col class="goods-text" span="8">
                  <van-stepper class="card-stepper" v-model="item.num"/>
                </van-col>
              </van-row>
              <van-row>
                <van-col class="goods-bt" span="12">{{item.attributes}}</van-col>
                <van-col class="goods-bt goods-text" span="12">
                  <div>￥{{item.newPrice}}</div>
                  <div class="old-price">￥{{item.oldPrice}}</div>
                </van-col>
              </van-row>
            </div>
          </van-card>
        </van-swipe-cell>
      </div>
    </div>
    <!--    <businessFooter btnTitle="待收银" @on-confirm-click="submit" :goods="goods" v-if="$route.path == '/entrance/cashierBase' && unLock == 1"></businessFooter>-->
    <div class="btn-area">
      <button class="btn-edit" @click="submit">待收银</button>
    </div>
  </div>

  <div v-else :class="{'overflow':$route.path == '/entrance/cashierBase/dayReport'}" class="other-box">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>

  <!-- </div> -->
</template>

<script>
  import {Dialog, Toast} from "vant";
  // ContactCard
  import businessFooter from "@/components/businessFooter";
  import {mapGetters} from "vuex";
  import {vipQuery, retailers, getGoodsByCodeNew, calculation} from "@/api/cashier";
  // getGoodsByCode
  export default {
    components: {
      businessFooter
    },
    computed: {
      ...mapGetters(["unLock", "reloadCashier"])
    },
    data() {
      return {
        cardAreaH: "",
        vipCode: "",
        goodCode: "",
        heads: [],
        retailer: "",
        goods: [],
        checkItemId: "",
        showAdd: false, //添加会员弹层
        memberInfo: "", //添加会员信息
        showAddSuccess: false, //添加成功后提示
        memberPhone: "", //记录添加会员是的会员号
        showFail: false
      };
    },
    beforeMount() {
    },
    methods: {
      inputMember() {
        this.showAdd = true;
        this.memberPhone = '';
      },
      goCreate() {
        this.showFail = false;
        this.$store.commit("SET_SELECTLEFT", 5);
        this.$router.push('/entrance/addMember');
      },
      clearData() {
        this.goodCode = "";
        this.goods = [];
      },
      addConfirm() {
        //添加会员
        if (this.memberPhone == "") {
          Dialog.alert({
            title: "添加失败",
            message: "请确认输入信息是否正确"
          }).then(() => {
            // on close
          });
          return;
        }
        this.showAdd = false;
        vipQuery(this.memberPhone).then(res => {
          if (res.data.data.memberCode>0) {
            this.memberInfo = res.data.data;
            // this.memberInfo = {
            //   phone:123,
            //   memberTypeName:'张三',
            // };
            this.showAddSuccess = true;
            setTimeout(() => {
              this.showAddSuccess = false;
            }, 2000);
          } else {
            this.showFail = true;
          }
        });

      },
      deleteMember() {
        // Dialog.confirm({
        //   title: "提示",
        //   message: "确定移除吗？"
        // })
        //   .then(() => {
        //     this.memberInfo = "";
        //     this.memberPhone = "";
        //   })
        //   .catch(() => {
        //     // on cancel
        //   });
        this.memberPhone = '';
        this.showAdd = true;
      },
      headPicCheck(item) {
        if (item.selected) {
          item.selected = false;
          this.retailer = "";
        } else {
          for (let i in this.heads) {
            this.heads[i].selected = false;
          }
          this.retailer = item.id;
          item.selected = true;
        }
      },
      submit() {
        if (!this.retailer) {
          Toast.fail("请选择零售员!");
          return;
        }
        if (!this.goods || !this.goods.length) {
          Toast.fail("请添加商品!");
          return;
        }
        let params = {
          deductionMoney:this.memberInfo.deduction||0,
          goods:this.goods
        }
        calculation(params).then(res => {
          let cashierData = {
            member: this.memberInfo.memberCode,
            retailer: this.retailer,
            goods: this.goods,
            deduction: this.memberInfo.deduction,
            integral: this.memberInfo.integral,
            eventOffers:res.data.data.eventOffers,
            eventOffersCount:res.data.data.eventOffersCount,
            numCount:res.data.data.numCount,
            totalGoods:res.data.data.totalGoods,
            totalGoodsVip:res.data.data.totalGoodsVip,
          };
          this.$store.commit("SET_CASHIERDATA", cashierData);
          this.$router.push("/entrance/cashierBase/order");
        });
      },
      search() {
        this.$router.push("/entrance/cashierBase/goods");
      },
      beforeClose({position, instance}) {
        switch (position) {
          case "outside":
            instance.close();
            break;
          case "right":
            Dialog.confirm({
              message: "确定删除吗？"
            })
              .then(() => {
                let deleteIndex;
                for (let i in this.goods) {
                  if (this.goods[i].id == this.checkItemId) {
                    deleteIndex = i;
                  }
                }
                this.goods.splice(deleteIndex, 1);
                instance.close();
              })
              .catch(() => {
                instance.close();
              });
            break;
        }
      },
      clickDelete(index) {
        this.goodCode = "";
        this.checkItemId = index;
      },
      getGood() {
        getGoodsByCodeNew(this.goodCode).then(res => {
          if (
            res.status == 200 &&
            res.data.data &&
            res.data.data.id &&
            res.data.data.id != -1
          ) {
            if (!this.goods.length) {
              this.goods.push(res.data.data);
            } else {
              let haveItem = false;
              for (let i in this.goods) {
                if (parseInt(this.goods[i].id) == res.data.data.id) {
                  haveItem = true;
                  break;
                }
              }
              if (!haveItem) {
                this.goods.push(res.data.data);
              }
            }
          } else {
            Toast.fail("未查询到商品!");
          }
        });
      },
      onload() {
        retailers().then(res => {
          this.heads = [];
          if (res.data) {
            for (let i in res.data) {
              let item = {
                pic: res.data[i].avatar,
                selected: false,
                id: res.data[i].id,
                name: res.data[i].name
              };
              this.heads.push(item);
            }
          }
        });
      }
    },
    watch: {},
    created() {
      this.onload();
    },
    activated() {
      if (this.reloadCashier) {
        this.goodCode = "";
        this.vipCode = "";
        this.retailer = "";
        this.memberPhone = "";
        this.memberInfo = "";

        this.goods = [];
        for (let i in this.heads) {
          this.heads[i].selected = false;
        }
        this.$store.commit("SET_RELOADCASHIER", false);
      }
    }
  };
</script>

<style lang='scss' scoped>
  .baseBody {
    height: 100%;
    // background: #;
    background: url("../../assets/images/top_bg.png") left -4rem no-repeat;
    background-size: 100%;

    .labelText {
      text-align: left;
      font-size: 1.15rem;
      padding-bottom: 1rem;
      font-family: PingFangSC-Semibold;
      color: #222b45;
      letter-spacing: 0;
    }

    .clearShop {
      float: right;
      background: #fe5845;
      padding: 0.375rem 0.75rem;
      border-radius: 4px;
      font-family: PingFangSC-Regular;
      font-size: 0.75rem;
      color: #ffffff;
      letter-spacing: 0;
      text-align: left;
      line-height: 0.75rem;
    }

    .overflow {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .radius-5 {
      border-radius: 0.5rem;
    }

    .vrow {
      width: 86%;
      margin: 0 auto;

      /deep/ .van-button--disabled {
        opacity: 1;
      }

      .vsearch {
        float: right;
      }

      .vlock {
        float: right;
      }
    }

    .base-box {
      padding-top: 0.5rem;
      width: 86%;
      margin: 0 auto;

      .vcode {
        margin-bottom: 1.5rem;
        background: #ffffff;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
      }

      .imgs {
        overflow-y: hidden;
        overflow-x: auto;
        white-space: nowrap;
        padding-bottom: 1rem;
        padding-top: 0.2rem;
        text-align: left;

        .head-pic {
          width: 5.5rem;
          height: 5.5rem;
          border-radius: 6px;
          margin: 0 0.375rem;
          background: #ffffff;

          /deep/ .van-image__img {
            border-radius: 100%;
          }

          /deep/ .van-image__error {
            border-radius: 100%;
          }

          .imgText {
            margin: 0.5rem 0;
            font-family: PingFangSC-Regular;
            font-size: 0.857rem;
            color: #8f9bb3;
            text-align: center;
            line-height: 0.857rem;
          }

          .head-pic-hover {
            // box-shadow: 0rem 0rem 0.5rem red;
            color: #222b45;
          }

          .head-pic-img {
            width: 3rem;
            height: 3rem;
            margin: 0 auto;
            margin-top: 0.625rem;
          }
        }

        .img-check {
          position: absolute;
          right: 1rem;
          top: 0.6rem;

          width: 1rem;
          height: 1rem;
        }
      }
    }

    .lockTipsImgAera {
      margin: 0 auto;
      position: relative;
      top: 40%; /*偏移*/
      transform: translateY(-50%);

      .lockTipsImg {
        width: 14rem;
        height: 10rem;
      }

      .lockTipsText {
        font-size: 1.2rem;
      }
    }

    .cardText {
      width: 86%;
      margin: 0 auto;
    }

    .shortArea{
      height: calc(100% - 31.5rem) !important;
    }
    .cardArea {
      overflow-y: auto;
      height: calc(100% - 29rem);

      .cardBody {
        width: 86%;
        margin: 0 auto;

        .card-item {
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
          border-radius: 6px;
          margin-bottom: 1rem;

          /deep/ .van-card {
            background: #fff;
          }

          .goods-bt {
            font-size: 1rem;
            font-family: PingFangSC-Regular;
            color: #222b45;
            text-align: left;
            margin-top: 0.5rem;
          }

          .goods-text {
            text-align: right;

            .old-price {
              color: #999;
              text-decoration: line-through;
              font-size: 0.8rem;
              margin-right: 1px;
            }
          }

          .card-stepper {
            text-align: center;
            width: 5rem;
            position: absolute;
            right: 0%;
            top: 8%;
          }

          /deep/ .van-stepper {
            background: #fff;
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
            border-radius: 1.25rem;
          }

          /deep/ .van-stepper__minus {
            background: #fff;
            color: #ff8900;
            height: 1.2rem;
            width: 1.2rem;
          }

          /deep/ .van-stepper__minus::before {
            width: 0.5625rem;
            height: 1px;
          }

          /deep/ .van-stepper__input {
            background: #fff;
            height: 1.2rem;
            width: 1.2rem;
          }

          /deep/ .van-stepper__plus {
            background: #fff;
            color: #ff8900;
            height: 1.2rem;
            width: 1.2rem;
          }

          /deep/ .van-stepper__plus::before {
            width: 0.5625rem;
            height: 1px;
          }

          /deep/ .van-stepper__plus::after {
            width: 1px;
            height: 0.5625rem;
          }

          .deleteBtn {
            height: 100%;
            background-color: #8f9bb3;
            font-size: 1rem;
            font-family: PingFangSC-Regular;
            color: #fff;
          }

          /deep/ .van-button--danger {
            border-color: #8f9bb3;
          }
        }
      }
    }

    .labelText-new {
      background: #ffffff;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
      border-radius: 0.375rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 0 1.25rem 1rem;
      margin-bottom: 1.5rem;
      margin-top: 1.25rem;

      .member-title {
        height: 3rem;
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .labelText-text {
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #222b45;
          letter-spacing: 0;
          line-height: 1.125rem;
        }

        .add {
          border: 1px solid rgba(143, 155, 179, 0.5);
          border-radius: 4px;
          font-family: PingFangSC-Regular;
          font-size: 0.75rem;
          color: #222b45;
          letter-spacing: 0;
          text-align: left;
          line-height: 0.75rem;
          padding: 0.375rem 0.75rem;
        }
      }

      .member-info {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 2.625rem;

        .info-phone {
          font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #8F9BB3;
        }

        .info-message {
          font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #FE5845;
        }

        .info-text {
          font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #222B45;
        }
      }

      .member-info-no {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 1rem;
        color: #222b45;
        line-height: 1rem;
        height: 2.625rem;
        line-height: 2.625rem;
      }
    }

    .popup-box {
      width: 80%;
      background: #ffffff;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
      border-radius: 10px;
      padding: 1.875rem 0 1.5rem;

      .search-text {
        font-family: PingFangSC-Regular;
        font-size: 1rem;
        color: #222b45;
        text-align: center;
        line-height: 1rem;
      }

      .input-text {
        background: #f6f7f9;
        border: 1px solid #e9ebf0;
        border-radius: 6px;
        font-family: PingFangSC-Semibold;
        color: #222b45;
        text-align: right;
        line-height: 1.25rem;
        height: 2.5rem;
        width: 15.75rem;
        margin: 1.25rem auto 30px;
      }

      .fail-title {
        font-family: PingFangSC-Semibold;
        font-size: 1.25rem;
        color: #222B45;
      }

      .fail-message {
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #8F9BB3;
        margin-top: .375rem;
        margin-bottom: 1.875rem;
      }

      .btn-box {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        .confirm {
          background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
          border-radius: 18px;
          font-family: PingFangSC-Semibold;
          font-size: 0.857rem;
          color: #ffffff;
          line-height: 0.857rem;
          padding: 0.6875rem 2.875rem;
        }

        .cancel {
          opacity: 0.5;
          background: #ffffff;
          border: 1px solid #8f9bb3;
          border-radius: 18px;
          font-family: PingFangSC-Regular;
          font-size: 0.857rem;
          color: #8f9bb3;
          line-height: 0.857rem;
          padding: 0.6875rem 2.875rem;
        }
      }
    }

    .add-ok {
      background-color: #ffffff;
      box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 0.5625rem 28px 8px rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      font-family: PingFangSC-Regular;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.65);
      padding: 0.5625rem 0 0.5625rem 2.5rem;
      background: url("../../assets/store/add_ok.png") 1rem center no-repeat;
      background-size: 0.875rem;
      width: 37.3%;
      position: fixed;
      bottom: 6.625rem;
      left: 50%;
      margin-left: -18.65%;
      text-align: left;
      box-sizing: border-box;
    }
  }

  /deep/ .van-search__content {
    background: #fff;
  }

  .search {
    border-radius: 0.375rem;

    .search-icon {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 1.5rem;
    }
  }
</style>
