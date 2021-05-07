<template>
  <div class="all-box">
    <!-- <van-button type="default">库存</van-button>
    <van-button type="primary">价格管理</van-button>
    <van-button type="info">收银台</van-button>-->

    <businessHeader class="header-box"></businessHeader>
    <div class="content-box">
      <keep-alive>
        <router-view v-if="$route.meta.isKeepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.isKeepAlive" />
    </div>

    <businessDrawer></businessDrawer>
  </div>
</template>

<script>
import businessHeader from "./businessHeader"; //暂时入口
import businessDrawer from "./businessDrawer"; //暂时入口
export default {
  name: "Entrance",
  components: {
    businessHeader,
    businessDrawer
  },
  data() {
    return {
      cardAreaH: ""
    };
  },
  created() {
    // var h = document.documentElement.clientHeight || document.body.clientHeight;
    // // let top = h * 0.14;
    // this.cardAreaH = h - 60 + "px";
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all-box {
  height: 100%;
  overflow: hidden;
}
.content-box {
  height: calc(100% - 3.75rem);
  position: static;
  margin-top: 3.7rem;
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
