<template>
  <div class="s-box">
    <div class="goodsTitle" style="margin-top: 18px">
      <span>本店库存</span>
      <warning-goods :goodsMsg="thisGood" isStock></warning-goods>
    </div>

    <div class="goodsTitle">
      <span>其他店铺库存</span>
      <van-pull-refresh v-if="otherGoods.length" v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                  offset="1">
          <warning-goods :other="true" :goodsMsg="otherGoods" isStock></warning-goods>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import warningGoods from "@/components/warningGoods";

allStoreInventory
import {allStoreInventory} from "@/api/stock";
import {Toast} from "vant";

export default {
  data() {
    return {
      thisGood: [],
      otherGoods: [],
      isLoading: true,
      loading: false,
      finished: false,
      listData: {
        current: 0,
        size: 30,
        total: 0
      }
    };
  },
  components: {
    warningGoods
  },
  mounted() {
    this.getData()
  },
  methods: {
    onRefresh() {
      Toast("刷新成功");
      this.otherGoods = [];
      this.isLoading = false;
      this.loading = true;
      this.listData = {
        current: 0,
        size: 30,
        total: 0
      };
      this.finished = false;
      this.onLoad();
    },
    onLoad() {
      // 异步更新数据
      this.listData.current = this.listData.current + 1;
      this.getData();
    },
    getData() {
      let params = {
        current: this.listData.current,
        size: this.listData.size,
        spuId: this.$route.query.spuId
      };
      allStoreInventory(params).then(res => {
        let newOfRes = JSON.parse(JSON.stringify(res.data.data.pages));
        this.thisGood = [{...res.data.data.storeInventoryVO}]
        this.otherGoods = [...this.otherGoods, ...newOfRes.records]
        this.listData.total = newOfRes.total;
        this.loading = false;
        if (this.otherGoods.length === this.listData.total) {
          this.finished = true;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.s-box {
  height: 100%;

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
    margin: 0 1.25rem 10px;
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
    border-radius: .375rem;

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
}
</style>
