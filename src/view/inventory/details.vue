<template>
  <div class="baseBody">
    <div class="cardArea">
      <div class="card-body">
        <van-card class="card-item">
          <div slot="desc">
            <van-row class="card-row shadow-row">
              <van-col class="font-zt" span="12">盘点类型</van-col>
              <van-col class="font-h" span="12">{{inventory.type}}</van-col>
            </van-row>
            <van-row class="card-row shadow-row">
              <van-col class="font-title" span="12">盘点时间</van-col>
              <van-col class="font-h" span="12">{{inventory.date}}</van-col>
            </van-row>
            <van-row class="card-row shadow-row">
              <van-col class="font-title" span="12">制单人</van-col>
              <van-col class="font-h" span="12">{{inventory.editor}}</van-col>
            </van-row>
            <van-row class="card-row shadow-row">
              <van-col class="font-title" span="12">单据状态</van-col>
              <van-col v-if="inventory.status == 1" class="font-zt-value" span="12">进行中</van-col>
              <van-col v-if="inventory.status == 2" class="font-zt-value" span="12">异常单</van-col>
              <van-col v-if="inventory.status == 3" class="font-h" span="12">已完成</van-col>
            </van-row>
            <van-row class="card-row shadow-row">
              <van-col class="font-title" span="12">备注</van-col>
              <van-col class="font-h" span="12">{{inventory.remark}}</van-col>
            </van-row>
          </div>
        </van-card>
        <van-card class="card-item m-b-2">
          <div slot="desc">
            <van-row class="card-row shadow-row">
              <van-col class="font-zt" span="12">盘点汇总</van-col>
              <van-col class="font-h" span="12">{{inventory.message}}</van-col>
            </van-row>
            <div v-if="inventory.status == 3">
              <div class="goods-area shadow-row" v-for="(item,index) in inventory.pxGoods"
                   :key="index">
                <van-row class="goods-row">
                  <van-col span="20" class="row-col">
                    <div style="float: left">
                      <div class="goods-title">{{item.title}}</div>
                      <div class="goods-code">商品条码：{{item.code}}</div>
                    </div>
                  </van-col>
                  <van-col span="4" class="row-col">
                    <div class="goods-number font-y-center">{{item.stock}}/{{item.unit}}</div>
                  </van-col>
                </van-row>
              </div>
            </div>
            <div v-else>
              <div class="goods-area  shadow-row">
                <van-swipe-cell v-for="(item,index) in inventory.pxGoods" :key='index' :before-close="beforeClose"
                                class="good-item shadow-row">
                  <template slot="right">
                    <van-button square type="danger" text="删除" class="deleteBtn" @click="clickDelete(item.id)"/>
                  </template>
                  <van-card>
                    <div slot="desc">
                      <van-row>
                        <van-col class="goods-title" span="16">{{item.name}}</van-col>
                        <van-col span="8">
                          <van-stepper class="card-stepper" v-model="item.realStock"/>
                        </van-col>
                      </van-row>
                      <div class="goods-code">商品条码:{{item.code}}</div>
                    </div>
                  </van-card>
                </van-swipe-cell>
              </div>
            </div>
          </div>
        </van-card>
      </div>
    </div>
    <!--<div v-if="inventory.status != 3" class="btn-save" @click="save">保存</div>-->
    <van-button v-if="inventory.status != 3" class="btn" type="default" @click="fix()">确认盘点</van-button>
    <dailog :message="tipsMessage" :dialogShow="dialogShow" :onClose="goList"></dailog>
  </div>

</template>

<script>
  import {Dialog} from "vant";
  import {getInventoryDetail, fixInventory} from "@/api/inventory";
  import dailog from "@/components/dialog";

  export default {
    components: {
      dailog
    },
    computed: {},
    data() {
      return {
        takeId: "",
        checkItemId: "",
        tipsMessage: "",
        dialogShow: false,
        inventory: {}
      };
    },
    beforeMount() {
    },
    methods: {
      getInventoryDetail() {
        getInventoryDetail(this.takeId).then(res => {
          if (res.data) {
            this.inventory = res.data.data;
          }
        });
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
                  if (this.inventory.pxGoods[i].id == this.checkItemId) {
                    deleteIndex = i;
                  }
                }
                this.inventory.pxGoods.splice(deleteIndex, 1);
                instance.close();
              })
              .catch(() => {
                instance.close();
              });
            break;
        }
      },
      clickDelete(index) {
        this.checkItemId = index;
      },
      save() {
        this.$router.push("/entrance/inventory");
      },
      fix() {
        let params = {
          takeId: this.takeId,
          goods: []
        };
        for (let i in this.inventory.pxGoods) {
          params.goods.push({
            id: this.inventory.pxGoods[i].id,
            number: this.inventory.pxGoods[i].realStock
          });
        }
        fixInventory(params).then(() => {
          this.dialogShow = true;
          this.tipsMessage = '处理成功'
        });
      },
      goList() {
        this.$router.push("/entrance/inventory");
      }
    },
    watch: {},
    created() {
      this.takeId = this.$route.query.takeId;
      this.getInventoryDetail();
    },
  };
</script>

<style lang='scss' scoped>
  .font-y-center {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .baseBody {
    height: 100%;

    /deep/ .van-tabs__nav {
      background-color: #F7F9FC;
    }

    /deep/ .van-tabs__line {
      background-color: #FF8900;
    }

    /deep/ .van-tab {
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #222B45;
      text-align: center;
    }

    /deep/ .van-tab--active {
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #FF8900;
      text-align: center;
      color: #FF8900;
    }

    .cardArea {
      overflow-y: auto;
      // height: 70vh;
      height: 100%;
      box-sizing: border-box;
      padding-bottom: 2rem;

      .card-body {
        width: 92%;
        margin: .5rem auto 0;

        /deep/ .van-card {
          background: #fff;
        }

        .card-item {
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
          border-radius: .3rem;
          margin-bottom: 1rem;

          /deep/ .van-card {
            background: #fff;
            padding: 0;
          }

          .card-row {
            height: 2.75rem;
            display: flex;
            flex-direction: row;
            align-items: center;

            .font-red {
              color: #F15245;
            }

            .font-zt {
              font-family: PingFangSC-Regular;
              font-size: 1rem;
              color: #222B45;
              letter-spacing: 0;
              text-align: left;
            }

            .font-zt-value {
              font-family: PingFangSC-Regular;
              font-size: 1rem;
              color: #F15245;
              letter-spacing: 0;
              text-align: right;
            }

            .font-title {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
              text-align: left;
            }

            .font-h {
              opacity: 0.5;
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #222B45;
              text-align: right;
            }

            /deep/ .van-button {
              line-height: 0;
              height: 1.875rem;
              width: 3.75rem;
              padding: 0;
            }

            /deep/ .van-button__text {
              font-family: PingFangSC-Regular;
              font-size: .75rem;
              color: #222B45;
              text-align: center;
              border: 0;
            }

            .font-h-btn {
              display: flow-root;
              float: right;

              /deep/ .van-button {
                display: flow-root;
                float: right;
                background: #FFFFFF;
                border: 1px solid #8F9BB3;
                border-radius: .25rem;
              }
            }

            .font-o-btn {
              display: flow-root;
              float: right;
              margin-left: 1rem;

              /deep/ .van-button {
                display: flow-root;
                float: right;
                background: #FFFFFF;
                border: 1px solid #FF8900;
                border-radius: .25rem;
              }
            }
          }

          .shadow-row {
            box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
            border-bottom: 1px solid rgba(143, 155, 179, 0.05);
          }

          .goods-area {
            .goods-row {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;

              .row-col {
                padding: .5rem 0;
              }
            }

            .goods-title {
              font-family: PingFangSC-Regular;
              font-size: 1rem;
              color: #222B45;
              text-align: left;
            }

            .goods-number {
              font-family: PingFangSC-Regular;
              font-size: 16px;
              color: #222B45;
              text-align: right;
            }

            .goods-code {
              font-family: PingFangSC-Regular;
              font-size: .875rem;
              color: #8F9BB3;
              text-align: left;
            }
          }

          /deep/ .van-card__content {
            min-height: 0;
            padding: .5rem 0;
          }

          .good-item {
            .card-stepper {
              text-align: center;
              width: 5rem;
              position: absolute;
              right: 0%;
              top: 1rem;
            }

            /deep/ .van-stepper {
              background: #fff;
              box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
              border-radius: 20px;
            }

            /deep/ .van-stepper__minus {
              background: #fff;
              color: #ff8900;
              height: 1.2rem;
              width: 1.2rem;
            }

            /deep/ .van-stepper__minus::before {
              width: 9px;
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
              width: 9px;
              height: 1px;
            }

            /deep/ .van-stepper__plus::after {
              width: 1px;
              height: 9px;
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
    }

    .m-b-2 {
      margin-bottom: 2.5rem !important;
    }

    .btn {
      border-radius: 1.375rem;
      background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
      color: #fff;
      font-size: 1.2rem;
      position: relative;
      bottom: 3.6rem;
      padding: 0 1rem;
      width: 92%;
    }
  }

</style>
