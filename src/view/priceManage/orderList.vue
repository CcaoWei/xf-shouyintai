<template>
  <div class="root-box" v-if="$route.path=='/entrance/salesdata/orderList'">
    <van-card v-for="(item,index) in orderList" :key="index" class="card-box" @click="navToOrderDetail(item.orderNumber)">
      <div slot="desc">
        <div class="order-item"><div class="order-bt">订单编号：</div><div class="order-text">{{item.orderNumber}}</div> </div>
        <div class="order-item"><div class="order-bt">订单时间：</div><div class="order-text">{{item.orderDate}}</div> </div>
        <div class="order-item"><div class="order-bt">订单金额：</div><div class="order-number">￥{{item.orderPrice}}元</div> </div>
      </div>
    </van-card>
    <van-icon class="date-select" @click="navToDatePage" name="underway-o" />
  </div>
  <router-view v-else />
</template>
<style lang="scss" scoped>
.root-box {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
.card-box {
  width: 90%;
  margin: .8rem auto;
  border-radius: .8rem;
  /deep/ .van-card__content{
    min-height: 0;
  }
  .order-item {
    display: flow-root;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0.6rem;
    .order-bt{
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #222B45;
      float: left;
    }
    .order-text {
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #222B45;
      text-align: right;
      float: right;
    }
    .order-number {
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #FF8900;
      text-align: right;
    }
  }
}
/deep/ .van-card {
  background: #fff;
}
</style>

<script>
import { getOrderList } from "@/api/priceManage";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      orderList: []
    };
  },
  computed: {
    ...mapGetters(["dateSelect"])
  },
  mounted() {
    // 请求订单列表
    getOrderList(this.dateSelect).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.orderList = res.data.data;
      }
    });
  },
  methods: {
    navToDatePage() {
      this.isShowTurnover = false;
      this.$router.push("/entrance/salesdata/datePage");
    },

    navToOrderDetail(id) {
      console.log(id);
      this.$router.push({
        path: "/entrance/salesdata/orderList/orderDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

