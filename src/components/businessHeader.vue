<template>
  <van-row type="flex" class="continer" justify="space-between">
    <van-col span="3" v-if="!showBack">
      <!-- <div class="menu-box"> -->
        <!-- <van-icon @click="showSidbar" name="wap-nav" /> -->
        <img  class="menu-box" @click="showSidbar" src="../assets/images/menu.png" alt="" srcset="">
      <!-- </div> -->
    </van-col>
    <van-col span="3" class="menu-box" v-else>
      <!-- <van-button type="default" @click="goback">后退</van-button> -->
      <van-icon class="go-back" name="arrow-left" @click="goback" />
    </van-col>

    <van-col span="18" class="page-name">{{headName}}</van-col>
    <div class="btn-save" v-if="$route.path.indexOf('goodsSetting/')!=-1" @click="$router.push('/entrance/goodsSetting')">关闭</div>
  </van-row>
</template>

<script>
import { Dialog } from "vant";

export default {
  name: "businessHeader",
  data() {
    return { headName: "", showBack: false };
  },
  created() {},
  watch: {
    $route: {
      handler(to) {
        // console.log(to);
        this.headName = to.meta.name;
        if (to.matched.length > 2) {
          this.showBack = true;
        } else {
          this.showBack = false;
        }
      },
      immediate: true
    }
  },
  methods: {
    showSidbar() {
      this.$store.commit("SET_SHOWSIDBAR", true);
    },
    goback() {
      if (this.$route.path == "/entrance/inventory/add") {
        Dialog.confirm({
          message: "确认放弃本次编辑？"
        })
          .then(() => {
            this.$router.go(-1);
          })
          .catch(() => {
            // on cancel
          });
      } else if(this.$router.history.current.path == "/entrance/cashierBase/orderResult") {
        this.$store.commit("SET_RELOADCASHIER",true)
        this.$router.go(-2);
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.continer {
  padding: 0 1rem;
  height: 3.75rem;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  justify-content:  flex-start;
  position: static;
  background: url("../assets/images/top_bg.png") left center no-repeat;
  background-size: 100%;
  width: 100%;
  z-index: 1;
  position: fixed;
  top: 0;
  /deep/ .van-col {
    height: 3rem;
    padding-top: 1rem;
    box-sizing: border-box;
  }
  .page-name {
    // flex: 1;
    // text-align: left;
    font-family: PingFangSC-Regular;
    font-size:1.125rem;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    height: 100%;
    line-height: 3.75rem;
    padding-top: 0;
  }
}

.go-back {
  color: #fff;
  font-size: 1.5rem;
  // margin: 0.4rem 0 0 -5rem;
}

.menu-box {
  font-size: 29px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  color: #fff;
}
</style>
