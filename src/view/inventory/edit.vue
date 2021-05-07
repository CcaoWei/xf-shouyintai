<template>
  <div class="baseBody">
    <van-field class="vinput radius-5" placeholder="请输入商品条码查询商品" v-model="goodCode">
      <template #button>
        <van-icon class="search-icon" name="/static/search-black.png" @click="search" />
      </template>
    </van-field>
    <div class="form">
      <div class="form-body">
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="12">盘点类型</van-col>
          <van-col class="font-h" span="12">
            <div>{{type}}</div>
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row" @click="show = true">
          <van-col class="font-title" span="12">盘点时间</van-col>
          <van-col class="font-h" span="12">
            <div v-if="date">{{date}}</div>
            <div v-else>></div>
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="12">制单人</van-col>
          <van-col class="font-h" span="12">
            <van-field v-model="editor" input-align="right" placeholder="请输入制单人"/>
          </van-col>
        </van-row>
        <van-field
          class="form-textarea"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="50"
          placeholder="请输入备注"
          show-word-limit
          v-model="remark"
          input-align="right"
        />
      </div>
    </div>
    <div class="cardArea">
      <div class="card-body">
        <van-card class="card-item">
          <div slot="desc">
            <van-row class="card-row shadow-row-more">
              <van-col class="font-zt" span="12">已扫商品列表</van-col>
              <van-col class="font-h" span="12">{{total}}/件</van-col>
            </van-row>
            <van-swipe-cell v-for="(item,index) in goods" :key='index' :before-close="beforeClose"
                            class="good-item shadow-row">
              <template slot="right">
                <van-button square type="danger" text="删除" class="deleteBtn" @click="clickDelete(item.id)"/>
              </template>
              <van-card>
                <div slot="desc">
                  <van-row>
                    <van-col class="goods-title" span="16">{{item.name}}</van-col>
                    <van-col span="8">
                      <van-stepper max="99999" class="card-stepper" v-model="item.number"/>
                    </van-col>
                  </van-row>
                  <div class="goods-code">商品条码:{{item.code}}</div>
                </div>
              </van-card>
            </van-swipe-cell>
          </div>
        </van-card>
      </div>

    </div>
    <div class="btn-save" @click="save">保存</div>
    <van-dialog class="dialog" v-model="dialogShow" @close="goFix" :confirmButtonColor="'#FF7901'">
      <div class="error-title">盘点异常</div>
      <div class="error-message">{{message}}</div>
      <div class="error-error">{{error}}</div>
    </van-dialog>
    <van-calendar v-model="show" @confirm="onConfirm" :show-confirm="false"/>
    <div class="add-box">
               <van-button class="btn" type="default" @click="add()">确认盘点</van-button>

          </div>
    <dailog :message="tipsMessage" :dialogShow="saveDialogShow" :onClose="goList"></dailog>
  </div>

</template>

<script>
  import {Dialog, Toast} from "vant";
  import {addInventory, saveInventory,getInventoryDetail} from "@/api/inventory";
  import {getGoodsByCode} from "@/api/cashier";
  import dailog from "@/components/dialog";

  export default {
    components: {
      dailog
    },
    computed: {
      total:function () {
        let num = 0;
        for(let i in this.goods){
          num += this.goods[i].number;
        }
        return Number(num);
      }
    },
    data() {
      return {
        goodCode: "",
        type: "日常盘点",
        date: "",
        editor: "",
        remark: "",
        goods: [],
        checkItemId: "",
        show: false,
        dialogShow: false,
        saveDialogShow: false,
        message: "",
        error: "",
        pxGoods: [],
        takeId: "",
        tipsMessage: "",
      };
    },
    beforeMount() {
    },
    methods: {
      getData(){
        getInventoryDetail(this.$route.query.takeId).then(res => {
          this.type = res.data.data.type;
          this.date = res.data.data.date;
          this.editor = res.data.data.editor;
          this.remark = res.data.data.remark;
          this.goods = res.data.data.pxGoods;
          this.message = res.data.data.message;
        });
      },
      search() {
        getGoodsByCode(this.goodCode).then(res => {
          if (res.status == 200 && res.data.data && res.data.data.id && res.data.data.id != -1) {
            if (!this.goods.length) {
              this.goods.push(res.data.data);
            } else {
              let haveItem = false;
              for (let i in this.goods) {
                if (parseInt(this.goods[i].id) == res.data.data.id) {
                  haveItem = true;
                  this.goods[i].number++;
                  break;
                }
              }
              if (!haveItem) {
                this.goods.push(res.data.data);
              }
            }
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
        this.checkItemId = index;
      },
      onChange(picker, value) {
        // Toast(`当前值：${value}, 当前索引：${index}`);
        this.type = value;
      },
      add() {
        if (!this.date) {
          Toast.fail("请选择盘点时间!");
        } else if (!this.editor) {
          Toast.fail("请填写制单人!");
        } else if (!this.goods.length) {
          Toast.fail("请添加商品!");
        } else {
          let params = {
            takeId:this.$route.query.takeId,
            type: this.type,
            date: this.date,
            editor: this.editor,
            remark: this.remark,
            goods: this.goods,
          };
          addInventory(params).then((res) => {
            if (res.data && res.data.data) {
              if (res.data.data.error) {
                this.dialogShow = true;
                this.message = res.data.data.message;
                this.error = res.data.data.error;
                this.pxGoods = res.data.data.pxGoods;
                this.takeId = res.data.data.id;
              } else {
                this.saveDialogShow = true;
                this.tipsMessage = '盘点成功'
              }
            }
          });
        }
      },
      onConfirm(date) {
        this.show = false;
        // console.log(date.format("yyyy-MM-dd hh:mm:ss"));
        this.date = date.format("yyyy-MM-dd hh:mm:ss");
      },
      goFix() {
        this.$router.push({
          path: "/entrance/inventory/errorDetail",
          query: {
            takeId: this.takeId,
            pxGoods: this.pxGoods,
          }
        });
      },
      save() {
        if (!this.date) {
          Toast.fail("请选择盘点时间!");
        } else if (!this.editor) {
          Toast.fail("请填写制单人!");
        } else if (!this.goods.length) {
          Toast.fail("请添加商品!");
        } else {
          let params = {
            takeId:this.$route.query.takeId,
            type: this.type,
            date: this.date,
            editor: this.editor,
            remark: this.remark,
            goods: this.goods,
          };
          saveInventory(params).then(() => {
            this.saveDialogShow = true;
            this.tipsMessage = '保存成功'
          });
        }
      },
      goList() {
        this.$router.push("/entrance/inventory");
      }
    },
    watch: {
      // goodCode() {
      //   this.search();
      // }
    },
    created() {
      // this.takeId = this.$route.query.takeId;
      this.getData();
    },
  };
</script>

<style lang='scss' scoped>
  .baseBody {
    height: 100%;
    padding-top: 1rem;
    box-sizing: border-box;

    .vinput {
      width: 92%;
      padding-left: 2rem;
      margin: 0 auto;
      border-radius: 0.3rem;
      .search-icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.5rem;
      }
    }

    .form {
      width: 92%;
      margin: .5rem auto 0;
      background: #fff;

      .form-body {
        margin: 1rem;

        /deep/ .van-cell {
          padding: 0;
        }

        .form-textarea {
          margin-top: .5rem;
          text-align: left;
        }
      }
    }

    .card-row {
      height: 2.75rem;
      display: flex;
      flex-direction: row;
      align-items: center;

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

      .font-zt {
        font-family: PingFangSC-Semibold;
        font-size: .875rem;
        color: #222B45;
        letter-spacing: 0;
        text-align: left;
        margin-left: .5rem;
      }
    }

    .shadow-row {
      box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
      border-bottom: 1px solid rgba(143, 155, 179, 0.05);
    }

    .shadow-row-more {
      box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.20);
      border-bottom: 1px solid rgba(143, 155, 179, 0.20);
    }

    .cardArea {
      overflow-y: auto;
      height: 28vh;

      .card-body {
        width: 92%;
        margin: .5rem auto 0;

        /deep/ .van-card {
          background: #fff;
          padding: 0;
        }

        .card-item {
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
          border-radius: .3rem;
          margin-bottom: 1rem;

          //抽屉商品样式start
          /deep/ .van-card__content {
            min-height: 0;
            padding: 1rem 0.5rem;
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
                  min-width: 6rem;
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
              min-width: 2.4rem;
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

          //抽屉商品样式end
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
      }
    }

    .dialog {
      width: 18.75rem;
      height: 10.625rem;

      .error-title {
        margin-top: 1.5rem;
        font-family: PingFangSC-Semibold;
        font-size: 1.25rem;
        color: #222B45;
        text-align: center;
      }

      .error-message {
        margin-top: .5rem;
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #8F9BB3;
        letter-spacing: 0;
        text-align: center;
      }

      .error-error {
        margin-bottom: 1.5rem;
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: red;
        letter-spacing: 0;
        text-align: center;
      }
    }
  }

  /deep/ .van-swipe-cell__right {
    transform: translate3d(113%, 0, 0);

  }
</style>
