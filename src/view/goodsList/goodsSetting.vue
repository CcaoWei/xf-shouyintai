<template>
  <div class="base-box" v-if="$route.path == '/entrance/goodsSetting'">
    <div class="card-area">
      <div class="card-box">
        <div class="good-row">
          <div class="good-title" @click="$router.push('/entrance/goodsSetting/goodsType')">商品类型</div>
        </div>
      </div>
      <div class="card-box">
        <div class="good-row">
          <div class="good-title" @click="$router.push('/entrance/goodsSetting/goodsClass')">商品管理分类</div>
        </div>
      </div>
      <div class="card-box">
        <div class="good-row">
          <div class="good-title" @click="$router.push('/entrance/goodsSetting/goodsBrand')">商品品牌</div>
        </div>
      </div>
      <div class="card-box">
        <div class="good-row">
          <div class="good-title" @click="$router.push('/entrance/goodsSetting/goodsUnit')">商品计量单位</div>
        </div>
      </div>
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

  export default {
    data() {
      return {
      };
    },
    created() {
    },
    activated() {
    },
    methods: {
    }
  };
</script>

<style lang="scss" scoped>
  .base-box {
    height: 100%;
    overflow-y: auto;

    .card-area {
      margin: 1.25rem 1.25rem 5.5rem 1.25rem;

      .card-box {
        background: #FFFFFF;
        box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
        border-radius: .375rem;
        margin-top: .75rem;

        .good-row {
          height: 1.625rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 1rem 1.25rem;
          justify-content: space-around;

          .good-title {
            font-family: PingFangSC-Semibold;
            font-size: 1.125rem;
            color: #424242;
            letter-spacing: 0;
          }
        }

      }
    }

  }

  .other-box {
    height: 100%;
  }
</style>
