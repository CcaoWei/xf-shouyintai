
<template>
  <div class="sales-data">
    <div class="profit-detail">详细数据：</div>
    <van-grid :border="false" :column-num="3">
      <van-grid-item>姓名 </van-grid-item>
      <van-grid-item> 会员码</van-grid-item>
      <van-grid-item>余额</van-grid-item>
    </van-grid>
    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <div v-for="(nItem,index) in memberData" :key="index" class="date-text">{{nItem.name}}</div>
      </van-grid-item>

      <van-grid-item>
        <div v-for="(cItem,index) in memberData" :key="index" class="compare-yesterday">{{cItem.membersCode}}</div>
      </van-grid-item>
      <van-grid-item>
        <div v-for="(bItem,index) in memberData" :key="index" class="gross-price">{{bItem.balance}}</div>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<style lang="scss" scoped>
.sales-data {
  background: #fff;
  width: 88%;
  border-radius: .8rem;
  margin: 2rem auto 0;
  padding: 2rem 0;
  min-height: 26rem;
  .line-img {
    width: 100%;
    height: 17rem;
    overflow: hidden;
    overflow-x: scroll;
  }
  .profit-detail {
    font-size: 1.5rem;
    text-align: left;
    margin-left: 1.5rem;
  }
}
/deep/ .van-grid-item__content {
  padding: 16px 0;
}
</style>

<script>
import { memberCount } from "@/api/priceManage";
export default {
  data() {
    return {
      memberData: [
        {
          name: "小灰灰", //姓名
          balance: "23.8", //余额
          membersCode: "2300300" //会员码
        },
        {
          name: "小胡胡", //姓名
          balance: "23.8", //余额
          membersCode: "2300300" //会员码
        },
        {
          name: "小飞飞", //姓名
          balance: "23.8", //余额
          membersCode: "2300300" //会员码
        },
        {
          name: "火狐", //姓名
          balance: "23.8", //余额
          membersCode: "2300300" //会员码
        },
        {
          name: "没地方", //姓名
          balance: "23.8", //余额
          membersCode: "2300300" //会员码
        },
        {
          name: "水电费", //姓名
          balance: "23.8", //余额
          membersCode: "2300300" //会员码
        },
        {
          name: "法规", //姓名
          balance: "23.8", //余额
          membersCode: "2300300" //会员码
        },
        {
          name: "都是", //姓名
          balance: "23.8", //余额
          membersCode: "2300300" //会员码
        },
        {
          name: "负数", //姓名
          balance: "23.8", //余额
          membersCode: "2300300" //会员码
        },
        {
          name: "派克服", //姓名
          balance: "23.8", //余额
          membersCode: "2300300" //会员码
        }
      ]
    };
  },
  mounted() {
    memberCount().then(res => {
      console.log(res);
      if (res.status === 200) {
        this.memberData = res.data.data;
      }
    });
  },
  methods: {
    // 请求销售统计数据
    getSalesData(type) {
      window.console.log(type);
    }
  }
};
</script>

