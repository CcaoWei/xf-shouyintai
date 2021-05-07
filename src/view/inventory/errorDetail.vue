<template>
  <div class="baseBody">
    <div class="cardArea">
      <div class="card-body">
        <van-card class="card-item">
          <div slot="desc">
            <van-row class="card-row shadow-row-more">
              <van-col class="font-zt" span="10">商品名称</van-col>
              <van-col class="font-center" span="6">账面库存</van-col>
              <van-col class="font-right" span="8">实盘库存</van-col>
            </van-row>
            <!--<van-swipe-cell v-for="(item,index) in goods" :key='index' :before-close="beforeClose"-->
            <van-card class="good-item shadow-row" v-for="(item,index) in pxGoods" :key='index'>
              <div slot="desc">
                <van-row>
                  <van-col span="12">
                    <div class="goods-title" span="16">{{item.name}}</div>
                    <div class="goods-code" span="12">{{item.attributes}}</div>
                    <div class="goods-code">商品条码:{{item.code}}</div>
                  </van-col>
                  <van-col span="4">
                    <div class="goods-number">{{item.stock}}</div>
                  </van-col>
                  <van-col span="8">
                    <van-stepper max="99999" class="card-stepper" v-model="item.realStock"/>
                  </van-col>
                </van-row>
              </div>
            </van-card>
          </div>
        </van-card>
      </div>

    </div>
    <van-button class="w-btn" type="default" @click="cancel()">暂不处理</van-button>
    <van-button class="btn" type="default" @click="fix()">处理完成</van-button>
    <dailog :message="tipsMessage" :dialogShow="dialogShow" :onClose="cancel"></dailog>
  </div>

</template>

<script>
  import {fixInventory} from "@/api/inventory";
  import dailog from "@/components/dialog";
  export default {
    computed: {},
    data() {
      return {
        pxGoods: [],
        dialogShow: false,
        tipsMessage: "",
      };
    },
    components: {
      dailog
    },
    beforeMount() {
    },
    methods: {
      fix(){
        let params = {
          takeId:this.takeId,
          goods:[]
        };
        for(let i in this.pxGoods){
          params.goods.push({
            id:this.pxGoods[i].id,
            number:this.pxGoods[i].realStock
          });
        }
        fixInventory(params).then(() => {
          this.dialogShow = true;
          this.tipsMessage = '处理成功'
        });
      },
      cancel(){
        this.$router.push("/entrance/inventory");
      },
    },
    watch: {
    },
    created() {
      this.takeId = this.$route.query.takeId;
      this.pxGoods = this.$route.query.pxGoods;
    },
  };
</script>

<style lang='scss' scoped>
  .baseBody {
    height: 100%;
    overflow-y: auto;
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
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #222B45;
        letter-spacing: 0;
        text-align: left;
        margin-left: .5rem;
      }
      .font-center {
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #222B45;
        letter-spacing: 0;
        text-align: center;
      }
      .font-right {
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #222B45;
        letter-spacing: 0;
        text-align: right;
        margin-right: .5rem;
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
              width: auto;
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
              // width: 1.2rem;
              min-width: 3rem;
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
            font-size: .75rem;
            color: #222B45;
            text-align: center;
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
    .btn {
      width: 46%;
      border-radius: 1.375rem;
      background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
      color: #fff;
      font-size: 1.2rem;
      position: relative;
      top: .5rem;
      bottom: 1.5rem;
      padding: 0 1rem;
    }
    .w-btn {
      width: 46%;
      border-radius: 1.375rem;
      background-color:  #FFFFFF;
      color: #8F9BB3;
      font-size: 1.2rem;
      position: relative;
      top: .5rem;
      bottom: 1.5rem;
      padding: 0 1rem;
      border: 1px solid #8F9BB3;
    }
  }

  /deep/ .van-swipe-cell__right {
    transform: translate3d(113%, 0, 0);

  }
</style>
