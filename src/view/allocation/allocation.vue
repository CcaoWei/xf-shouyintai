<template>
  <div class="baseBody" v-if="$route.path == '/entrance/allocation'">

    <van-pull-refresh v-if="data.length" v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <van-list v-model="loading" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad"
                offset="1">
        <div class="form" v-for="(item,index) in data" :key="index" @click="goDetail(item.id)">
          <div class="form-body">
            <van-row class="card-row shadow-row">
              <van-col class="font-title" span="6">调拨单号</van-col>
              <van-col class="font-h" span="18">{{ item.id }}</van-col>
            </van-row>
            <van-row class="card-row shadow-row">
              <van-col class="font-title" span="7">调拨单名称</van-col>
              <van-col class="font-h" span="17">{{ item.orderName }}</van-col>
            </van-row>
            <van-row class="card-row shadow-row">
              <van-col class="font-title" span="12">调拨单状态</van-col>
              <van-col class="font-h" span="18" v-if="item.orderStatus === 101">待出库</van-col>
              <van-col class="font-h" span="18" v-if="item.orderStatus === 102">已出库</van-col>
              <van-col class="font-h" span="18" v-if="item.orderStatus === 103">已入库</van-col>
              <van-col class="font-h" span="18" v-if="item.orderStatus === 201">取消订单</van-col>
            </van-row>
            <van-row class="card-row shadow-row">
              <van-col class="font-title" span="6">店铺</van-col>
              <van-col class="font-h" span="18">{{ item.shopName }}</van-col>
            </van-row>
            <van-row class="card-row shadow-row">
              <van-col class="font-title" span="6">时间</van-col>
              <van-col class="font-h" span="18">{{ item.orderCreateTime }}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="6">制单人</van-col>
              <van-col class="font-h" span="18">{{ item.creator }}</van-col>
            </van-row>
            <van-row class="card-row">
              <van-col class="font-title" span="6">备注</van-col>
              <van-col class="font-h" span="18">{{ item.comment }}</van-col>
            </van-row>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <div class="btn-area">
      <button class="btn-edit" @click="addSure">新建调拨单</button>
    </div>
  </div>
  <div v-else class="other-box">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"/>
  </div>
</template>

<script>
import {transferOrderList} from "@/api/stock";
import {Toast} from "vant";

export default {
  computed: {},
  data() {
    return {
      data: [],
      isLoading: true,
      loading: false,
      finished: false,
      listData: {
        current: 1,
        size: 30,
        total: 0
      }
    };
  },
  activated() {
    this.data = []
    this.listData =  {
      current: 1,
        size: 30,
        total: 0
    }
    if (this.$route.path === '/entrance/allocation') {
      this.getData()
    }
  },
  watch: {},
  methods: {
    onRefresh() {
      Toast("刷新成功");
      this.data = [];
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
      let params = {code: this.code};
      params.current = this.listData.current;
      params.size = this.listData.size;
      params.orderType = 1
      transferOrderList(params).then(res => {
        let newOfRes = JSON.parse(JSON.stringify(res.data.data));
        this.data = [...this.data, ...newOfRes.records];
        this.listData.total = newOfRes.total;
        this.loading = false;
        if (this.data.length === this.listData.total) {
          this.finished = true;
        }
      });
    },
    goDetail(id) {
      this.$router.push({
        path: "allocation/detail",
        query: {
          id: id,
        }
      });
    },
    addSure() {
      this.$router.push('allocation/add')
    }
  }
};
</script>

<style lang='scss' scoped>
.baseBody {
  height: calc(100% - 5.125rem);
  padding-bottom: 5.125rem;
  padding-top: 1px;
  overflow-y: auto;

  .form {
    margin: 0.5rem auto 0;

    .form-body {
      border-radius: 0.375rem;
      background: #fff;
      margin: 1rem;
      padding: 1rem;

      /deep/ .van-cell {
        padding: 0;
      }

      .title {
        font-family: PingFangSC-Semibold;
        font-size: 1.125rem;
        color: #222B45;
        letter-spacing: 0;
        text-align: left;
        margin-bottom: .625rem;
      }

      .form-title {
        font-family: PingFangSC-Semibold;
        font-size: 1.125rem;
        color: #222b45;
        letter-spacing: 0;
        text-align: left;
      }

      .shadow-row {
        border-bottom: 1px solid rgba(143, 155, 179, 0.05);
      }

      .card-row {
        height: 2.75rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;

        .font-title {
          opacity: 0.5;
          font-size: 14px;
          color: #424242;
          line-height: 14px;
          text-align: left;
        }

        .font-h {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #4A4A4A;
          letter-spacing: 0;
          text-align: right;
          line-height: 14px;
        }
      }
    }
  }

  .tips {
    opacity: 0.5;
    font-family: PingFangSC-Regular;
    font-size: .875rem;
    color: #222B45;
    position: fixed;
    bottom: 6.625rem;
    text-align: center;
    width: 100%;
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

.other-box {
  height: 100%;
}
</style>
