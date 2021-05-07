<template>
  <div class="page">
    <div class="cardBody">
      <van-field class="v-input" placeholder="输入商品编号搜索" left-icon="search" v-model="goodCode"/>
      <div class="goods-area">
        <div class="labelText">搜索结果</div>
        <div v-if="goods.length">
          <div class="result" v-for="(item, index) in goods" :key="index" @click="detail(item)">
            {{item.name}}
          </div>
        </div>
        <no-goods v-else></no-goods>
       </div>
    </div>
  </div>

</template>

<script>
  import {searchGoods} from "@/api/goods";
  import noGoods from "../../components/stock/noDoods";

  export default {
    components: {noGoods},
    data() {
      return {
        goodCode: "",
        goods: []
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      detail(item) {
        this.$router.push({
          path: "/entrance/goodsList/details",
          query: {
            id: item.id,
          }
        });
      },
    },
    watch: {
      goodCode(){
        searchGoods({keyword: this.goodCode}).then(res => {
          this.goods = [...res.data.data];
        });
      }
    }
  };
</script>

<style lang='scss' scoped>
  .page {
    height: 100%;
    width: 100%;
    overflow-y: scroll;

    .v-input {
      background: #FFFFFF;
      border-radius: .375rem;
      box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
    }

    .cardBody {
      padding-top: 1rem;
      margin: 1.25rem;

      .goods-area {
        margin-top: 1rem;
        background: #FFFFFF;
        box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
        border-radius: .375rem;

        /deep/ .van-card {
          background: #ffffff;
        }

        .labelText {
          padding: 1rem;
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #222B45;
          letter-spacing: 0;
          text-align: left;
        }

        .result {
          display: flex;
          flex-direction: row;
          align-items: center;
          box-shadow: 0 .0625rem 0 0 rgba(143, 155, 179, 0.10);
          height: 2.875rem;
          font-family: PingFangSC-Regular;
          font-size: .8125rem;
          color: #000000;
          text-align: left;
          margin-left: 1.25rem;
        }
      }
    }
  }
</style>
