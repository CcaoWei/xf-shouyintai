<template>
  <div class="root-box" v-if="$route.path=='/entrance/salesdata/chargeback'">
    <van-card v-for="(item,index) in chargebackList" :key="index" class="card-box" @click="navTochargebackDetail(item.orderNumber)">
      <div slot="desc">
        <div class="chargeback-item"><span class="chargeback-bt">退单编号：</span><span class="chargeback-text">{{item.orderNumber}}</span> </div>
        <div class="chargeback-item"><span class="chargeback-bt">退单时间：</span><span class="chargeback-text">{{item.orderDate}}</span> </div>
        <div class="chargeback-item"><span class="chargeback-bt">退单金额：</span><span class="chargeback-text">{{item.orderPrice}}元</span> </div>
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
  margin: 0.5rem auto;
  border-radius: 5px;
  .chargeback-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.2rem;
    .chargeback-bt,
    .chargeback-text {
      color: #000;
      font-size: 1rem;
    }
  }
}
/deep/ .van-card {
  background: #fff;
}
</style>

<script>
import { getChargebackList } from "@/api/priceManage";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      chargebackList: []
    };
  },

  mounted() {
    // 请求退单列表
    getChargebackList(this.dateSelect).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.chargebackList = res.data.data;
      }
    });
  },
  computed: {
    ...mapGetters(["dateSelect"])
  },

  methods: {
    navToDatePage() {
      this.isShowTurnover = false;
      this.$router.push("/entrance/salesdata/datePage");
    },

    navTochargebackDetail(id) {
      // this.$router.push("/entrance/salesdata/chargeback/chargebackDetail");
      this.$router.push({
        path: "/entrance/salesdata/chargeback/chargebackDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

