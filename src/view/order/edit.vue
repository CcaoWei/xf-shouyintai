<template>
  <div class="rm-box">
    <div class="box-header">
      <van-field class="search" placeholder="条形码查询商品" v-model="value">
        <template #button>
          <van-icon class="search-icon" name="/static/search-black.png" @click="getData"/>
        </template>
      </van-field>
    </div>
    <div class="s-box">
      <div class="s-cellList">
        <div class="remarks">
          <van-cell-group>
            <van-field v-model="data.orderName" autosize type="text" maxlength="100" placeholder="请输入订货单名称"/>
          </van-cell-group>
        </div>
        <div class="cell-item" @click="showPopup2">
          <span>建单时间</span>
          <div class="cell-right">
            <span>{{ data.orderCrateTime == '' ? "请选择建单时间" : data.orderCrateTime }}</span>
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
        <div class="remarks">
          <van-cell-group>
            <van-field v-model="data.name" autosize type="text" maxlength="100" placeholder="请输入值单人姓名"/>
          </van-cell-group>
        </div>
        <div class="remarks">
          <van-cell-group>
            <van-field v-model="data.comment" rows="2" autosize type="textarea" maxlength="100"
                       placeholder="请输入备注信息(选填)" show-word-limit/>
          </van-cell-group>
        </div>
      </div>

      <div class="goodsMsg">
        <div class="goodsTitle">
          <span>已扫商品列表</span>
          <span class="goodsTop-price">总价：￥{{ totalPrice }}</span>
        </div>
        <div class="goods-box">
          <goods-list v-if="goods.length" :goodsMsg="goods" @clearSearch="clearSearch"></goods-list>
          <no-goods v-else></no-goods>
        </div>
      </div>

      <!-- 弹出层 -->
      <van-calendar :min-date="minDate" :max-date="maxDate" :default-date="new Date()" v-model="show2"
                    @confirm="onConfirm"/>
    </div>

    <div class="btn-area">
      <button class="btn-edit" @click="report">新建订货单</button>
    </div>
    <van-dialog class="dialog" @close="initial" v-model="dialogShow" :show-confirm-button=false closeOnClickOverlay>
      <van-icon name="passed"/>
      <div class="dialogText">操作成功</div>
    </van-dialog>
  </div>
</template>

<script>
import goodsList from "../../components/stock/goodsList";
import businessFooter from "@/components/businessFooter";
import noGoods from "../../components/stock/noDoods";
import {orderGoodsSearch, addOutOrPut} from "@/api/stock";
import {Toast} from "vant";

export default {
  data() {
    return {
      data: {
        orderName: "",
        name: "",
        comment: "",
        orderCrateTime: ""
      },
      btnTitle: "入库",
      value: "",
      dialogShow: false,
      show2: false,
      goods: [],
    };
  },
  components: {
    goodsList,
    businessFooter,
    noGoods
  },
  computed: {
    minDate() {
      let date = new Date();
      let date2 = new Date(date);
      date2.setDate(date.getDate() - 7);
      return date2;
    },
    maxDate() {
      let date = new Date();
      let date2 = new Date(date);
      date2.setDate(date.getDate() + 7);
      return date2;
    },
    quantity() {
      let sum = 0;
      this.goodsMsg.forEach(item => {
        return (sum += Number(item.quantity));
      });
      return sum;
    },
    totalPrice() {
      let num = 0
      this.goods.forEach(item => {
        num += item.newPrice * item.quantity
      });
      return num
    }
  },
  methods: {
    clearSearch() {
      this.value = "";
    },
    getData() {
      let params = {
        code: this.value,
        dept: null,
      }
      orderGoodsSearch(params).then(res => {
        let result = res.data.data;
        if (Object.keys(result).length === 0) {
          Toast.fail("未查询到商品!");
          return;
        }
        result.quantity = 1;
        let canAdd = true;
        for (let j in this.goods) {
          if (result.id === this.goods[j].id) {
            canAdd = false;
            this.goods[j].quantity++;
          }
        }
        if (canAdd) {
          this.goods.push(result);
        }
      });
    },
    showPopup2() {
      this.show2 = true;
    },
    formatDate(date) {
      let year = new Date(date).getFullYear();
      let month =
        new Date(date).getMonth() + 1 < 10
          ? "0" + (new Date(date).getMonth() + 1)
          : new Date(date).getMonth() + 1;
      let day =
        new Date(date).getDate() < 10
          ? "0" + new Date(date).getDate()
          : new Date(date).getDate();

      return year + "-" + month + "-" + day;
    },
    onConfirm(date) {
      this.show2 = false;
      this.data.orderCrateTime = this.formatDate(date);
      // console.log(typeof this.date);
    },
    report() {
      let params = {...this.data}
      params.goods = []
      for (var i in this.goods) {
        params.goods.push({
          goodsId: this.goods[i].id,
          goodsName: this.goods[i].name,
          goodsUnit: this.goods[i].unit,
          img: this.goods[i].img,
          orderCount: this.goods[i].quantity,
          price: this.goods[i].newPrice,
          attributes: this.goods[i].attributes,
        })
      }
      params.orderType = 0
      addOutOrPut(params).then(() => {
        this.dialogShow = true
      });
    },
    initial() {
      this.$router.push('/entrance/stockOrder')
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.rm-box {
  height: 100%;
  width: 100%;
  // margin-left: 5%;

  .box-header {
    padding: 1rem 0 0 0;
    margin: 0 1.25rem;
    justify-content: space-around;
    height: 3rem;
    // background: #fff;
    align-items: center;

    .search {
      border-radius: 0.375rem;

      .search-icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.5rem;
      }
    }
  }

  .s-box {
    padding: 1.25rem;
    height: calc(100% - 10.125rem);
    overflow-y: auto;

    .s-cellList {
      width: 100%;
      overflow-y: scroll;
      border-radius: 0.375rem;
      background: #fff;

      .redioList {
        display: flex;
        padding: 1.25rem;
        justify-content: space-around;
      }

      .cell-item {
        display: flex;
        flex-direction: row;
        color: #222b45;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0.0625rem 0 0 rgba(143, 155, 179, 0.05);
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        padding-left: 1.25rem;
        height: 2.625rem;

        .cell-right {
          display: flex;
          flex-direction: row;
          align-items: center;
          opacity: 0.3;
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #222b45;
          text-align: right;
        }
      }

      .remarks {
        span {
          color: #aaa;
          line-height: 7rem;
          font-size: 14px;
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

    .goodsMsg {
      margin: 1rem 0;
      box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.06);
      border-radius: 0.375rem;
      background: #fff;

      .goodsTitle {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 5% 6%;

        .goodsTop-price {
          opacity: 0.5;
          font-size: 14px;
          color: #424242;
          line-height: 14px;
        }
      }

      .goods-box {
        height: calc(100% - 3.25rem);
        overflow-y: auto;
      }
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

  .van-search__content {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding-left: 0.5rem;
    background-color: #fff;
    border-radius: 0.125rem;

    .van-field__left-icon {
      margin: 0 0.5rem;
      font-size: 1rem;
    }
  }
}
</style>
