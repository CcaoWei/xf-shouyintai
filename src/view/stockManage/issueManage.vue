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
        <div class="cell-item" @click="showPopup1">
          <span>出库原因</span>
          <div class="cell-right">
            <span>{{ reason === '' ? "请选择出库原因" : reason }}</span>
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
        <div class="cell-item" v-if="reason === '订货单出库' || reason === '调拨出库'" @click="showPopup3">
          <span style="width: 7rem; text-align: left;">出库单据</span>
          <div class="cell-right">
            <span>{{ orderName === '' ? "请选择出库单据" : orderName }}</span>
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
        <div class="cell-item" @click="showPopup2">
          <span>出库时间</span>
          <div class="cell-right">
            <span>{{ date === '' ? "请选择出库时间" : date }}</span>
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
        <div class="remarks">
          <van-cell-group>
            <van-field v-model="remarks" rows="2" autosize type="textarea" maxlength="100" placeholder="请输入备注信息(选填)"
                       show-word-limit/>
          </van-cell-group>
        </div>
      </div>

      <div class="goodsMsg">
        <div class="goodsTitle">
          <span>已扫商品列表</span>
        </div>
        <div class="goods-box">
          <goods-list v-if="goodsMsg.length" :goodsMsg="goodsMsg" @clearSearch="clearSearch"></goods-list>
          <no-goods v-else></no-goods>
        </div>
      </div>

      <!-- 弹出层 -->
      <van-action-sheet v-model="show1" :actions="actions" @select="onSelect"/>
      <van-action-sheet v-model="show3" :actions="actions2" @select="onSelect2"/>
      <van-calendar :min-date="minDate" :max-date="maxDate" :default-date="new Date()" v-model="show2"
                    @confirm="onConfirm"/>
    </div>

    <div class="foot-area">
      <div class="bottom-btn">
        <span>共 <span class="quantity">{{ quantity ? quantity : 0 }}</span> 件商品出库</span>
        <div class="btn" @click="report()">出库</div>
      </div>
    </div>
    <van-dialog class="dialog" @close="initial" v-model="dialogShow" :show-confirm-button=false closeOnClickOverlay>
      <van-icon name="passed"/>
      <div class="dialogText">出库成功</div>
    </van-dialog>
  </div>
</template>

<script>
import sDetails from "@/components/stock/s-detail";
import goodsList from "@/components/stock/goodsList";
import businessFooter from "@/components/businessFooter";
import noGoods from "../../components/stock/noDoods";
import {outOrPut, goodsSearch, transferOrderSelect,getGoodsByOrder} from "@/api/stock";
import {Toast} from "vant";

export default {
  data() {
    return {
      value: "",
      reason: "",
      date: "",
      remarks: "",
      show1: false,
      show2: false,
      show3: false,
      dialogShow: false,
      btnTitle: "出库",
      goodsShow: false,
      goodsMsg: [],
      actions: [
        {name: "订货单出库", key: '0'},
        {name: "调拨出库", key: '1'},
        {name: "出货单出库"},
        {name: "报损出库"},
        {name: "其他原因"}
      ],
      actions2: [],
      orderId: '',
      orderName: ''
    };
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
    }
  },
  components: {
    sDetails,
    goodsList,
    businessFooter,
    noGoods
  },
  methods: {
    clearSearch() {
      this.value = "";
    },
    getData() {
      let params = {
        code: this.value,
        orderId: this.orderId,
      }
      goodsSearch(params).then(res => {
        let result = res.data.data;
        if (Object.keys(result).length === 0) {
          Toast.fail("未查询到商品!");
          return;
        }
        result.quantity = 1;
        let canAdd = true;
        for (let j in this.goodsMsg) {
          if (result.id === this.goodsMsg[j].id) {
            canAdd = false;
            this.goodsMsg[j].quantity++;
          }
        }
        if (canAdd) {
          this.goodsMsg.push(result);
        }
      });
    },
    showPopup1() {
      this.show1 = true;
    },
    showPopup2() {
      this.show2 = true;
    },
    showPopup3() {
      this.show3 = true;
    },
    onSelect(item) {
      this.show1 = false;
      this.reason = item.name;
      this.orderId = ''
      this.orderName = ''
      this.goodsMsg = []
      if (item.key) {
        const params = {
          orderType: item.key,
          type: 0
        }
        transferOrderSelect(params).then(res => {
          let arr = []
          res.data.data.forEach(item => {
            arr.push({
              id:item.id,
              name:item.id+'┃'+item.name
            })
          })
          this.actions2 = arr
        })
      } else {
        this.actions2 = []
      }
    },
    onSelect2(item) {
      this.show3 = false;
      this.orderName = item.name;
      this.orderId = item.id;
      this.goodsMsg = []
      getGoodsByOrder({orderId: item.id}).then(res => {
        this.goodsMsg = [...res.data.data]
      })
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
      this.date = this.formatDate(date);
    },
    report() {
      if (!this.reason) {
        Toast.fail("请选择出库原因!");
        return;
      }
      if (!this.date) {
        Toast.fail("请选择出库时间!");
        return;
      }
      let params = {
        comment: this.remarks,
        createTime: this.date,
        reason: this.reason,
        goods: [],
        orderId: this.orderId,
        type: 0
      };
      for (const i in this.goodsMsg) {
        params.goods.push({
          goodsId: this.goodsMsg[i].id,
          goodsName: this.goodsMsg[i].name,
          goodsUnit: this.goodsMsg[i].unit,
          img: this.goodsMsg[i].img,
          orderCount: this.goodsMsg[i].quantity,
          price: this.goodsMsg[i].newPrice,
          attributes: this.goodsMsg[i].attributes,
        })
      }
      // console.log(this.outOrdersMsg);
      // 出库
      if (params.goods[0] && this.quantity !== 0) {
        outOrPut(params).then(() => {
          this.dialogShow = true;
        });
      } else {
        Toast.fail("请选择出库商品!");
      }
    },
    initial() {
      this.$store.commit("OUT_ORDERSMSG", {});
      history.go(0);
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
        padding: 5% 6%;
        justify-content: space-between;
      }

      .goods-box {
        height: calc(100% - 3.25rem);
        overflow-y: auto;
      }
    }
  }

  .foot-area {
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

    .bottom-btn {
      width: 100%;
      margin: 0.875rem 1.25rem;
      height: 2.75rem;
      border-radius: 1.325rem;
      background: #fff;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.06);

      span {
        line-height: 2.75rem;
        margin-left: 3rem;
        color: #8f9bb3;
        text-align: center;
      }

      .quantity {
        margin-left: 0rem;
        color: #ff8900;
      }

      .btn {
        height: 2.75rem;
        width: 30%;
        line-height: 2.75rem;
        border-radius: 0 1.325rem 1.325rem 0;
        background: #ff8900;
        color: #fff;
      }
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
