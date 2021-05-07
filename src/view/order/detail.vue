<template>
  <div class="s-box">
    <div class="s-cellList">
      <p class="o-title">订货单信息</p>
      <div class="cell-item">
        <span>订货单号</span>
        <div>
          <span class="desc-r">{{ data.id }}</span>
        </div>
      </div>
      <div class="cell-item">
        <span style="width: 5rem">订货单名称</span>
        <div>
          <span class="desc-r">{{ data.orderName }}</span>
        </div>
      </div>
      <div class="cell-item">
        <span>店铺</span>
        <div>
          <span class="desc-r">{{ data.shopName }}</span>
        </div>
      </div>
      <div class="cell-item">
        <span>时间</span>
        <div>
          <span class="desc-r">{{ data.orderCreateTime }}</span>
        </div>
      </div>
      <div class="cell-item">
        <span>制单人</span>
        <div>
          <span class="desc-r">{{ data.creator }}</span>
        </div>
      </div>
      <div class="cell-item">
        <span style="width: 2rem">备注</span>
        <div>
          <span class="desc-r">{{ data.comment }}</span>
        </div>
      </div>
    </div>


    <div class="goodsTitle">
      <div class="goodsTop">
        <span>商品名称</span>
        <span class="goodsTop-price">总价：￥{{totalPrice}}</span>
      </div>
      <order-goods :goodsMsg="data.goods" isStock :orderStatus="data.orderStatus"></order-goods>
    </div>
    <div class="btn-area" v-if="data.button">
      <button class="btn-edit" @click="confirm" v-if="data.orderStatus===101">出库</button>
      <button class="btn-edit" @click="confirm" v-if="data.orderStatus===102">入库</button>
    </div>
    <div class="btn-save" @click="cancel">取消订货</div>
    <van-dialog class="dialog" @close="initial" v-model="dialogShow" :show-confirm-button=false closeOnClickOverlay>
      <van-icon name="passed"/>
      <div class="dialogText">操作成功</div>
    </van-dialog>
  </div>
</template>

<script>
import {transferOrderDetail,cancelOrder} from "@/api/stock";
import orderGoods from "@/components/orderGoods";

export default {
  data() {
    return {
      data: {},
      dialogShow:false
    };
  },
  components: {
    orderGoods
  },
  computed: {
    totalPrice() {
      let num = 0
      for (const i in this.data.goods) {
        num += this.data.goods[i].price * this.data.goods[i].orderCount
      }
      return num
    }
  },
  mounted() {
    transferOrderDetail({id: this.$route.query.id}).then(res => {
      this.data = {...res.data.data}
    });
  },
  methods: {
    confirm() {
      if (this.data.orderStatus === 101) {
        this.$router.push('/entrance/issueManage')
      } else {
        this.$router.push('/entrance/receiptManage')
      }
    },
    cancel() {
      cancelOrder({id: this.$route.query.id}).then(() => {
        this.dialogShow = true
      });
    },
    initial() {
      this.$router.push('/entrance/stockOrder')
    }
  }
};
</script>

<style lang="scss" scoped>
.s-box {
  height: calc(100% - 5.625rem);
  overflow-y: auto;

  .s-cellList {
    margin: 0 1.25rem;
    background: #fff;
    margin-bottom: 1rem;
    box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
    border-radius: .375rem;

    .o-title {
      display: flex;
      padding: 0 6%;
      padding-top: 5%;
    }

    .cell-item {
      margin: 0 1.25rem;
      display: flex;
      padding: 5% 0;
      justify-content: space-between;
      border-bottom: .125rem solid #eee;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #222b45;

      .desc-r {
        margin-right: 0.3rem;
      }
    }

    .remarks {
      min-height: 4.375rem;
      margin: 0 .375rem;

      div {
        color: #aaa;
        font-size: .875rem;
      }
    }
  }

  .mid-box {
    margin: 1rem 0;
    box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.06);
    border-radius: 0.375rem;
    background: #fff;

    .mid-title {
      display: flex;
      padding: 5% 6%;
      justify-content: space-between;
    }

    .card-row {
      padding-left: 6%;
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
        padding-right: 16px;
      }

      .font-zt {
        font-family: PingFangSC-Semibold;
        font-size: .875rem;
        color: #222B45;
        letter-spacing: 0;
        text-align: left;
        margin-left: .5rem;
      }

      .row-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        opacity: 0.3;
        font-size: 0.875rem;
        color: #222b45;
        text-align: right;
        padding-right: 16px;
      }
    }

    .shadow-row {
      box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
      border-bottom: 1px solid rgba(143, 155, 179, 0.05);
    }
  }

  .goodsTitle {
    margin: 0 1.25rem;
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
    border-radius: .375rem;

    .goodsTop {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .goodsTop-price {
        opacity: 0.5;
        font-size: 14px;
        color: #424242;
        line-height: 14px;
      }
    }

    span {
      display: flex;
      padding: 5% 6%;
    }
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
  .dialog {
    width: 14rem;
    height: 16rem;

    .dialogText {
      margin-top: 2rem;
      font-size: 1.4rem;
    }
  }

  /deep/ .van-icon-passed {
    font-size: 6rem;
    color: #ff891c;
    margin-top: 3rem;
  }
}
</style>
