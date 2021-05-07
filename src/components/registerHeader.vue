<template>
  <van-row type="flex" class="continer" justify="space-between">
    <van-col span="3" class="menu-box">
      <van-icon class="go-back" name="arrow-left" @click="goback"/>
    </van-col>
    <van-col span="18" class="page-name">{{headName}}</van-col>
  </van-row>
</template>

<script>

  export default {
    data() {
      return {headName: ""};
    },
    created() {
    },
    watch: {
      $route: {
        handler(to) {
          this.headName = to.meta.name;
        },
        immediate: true
      }
    },
    methods: {
      goback() {
        this.$router.go(-1);
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
    justify-content: flex-start;
    background: url("../assets/images/top_bg.png") left center no-repeat;
    background-size: 100%;
    width: 100%;
    z-index: 1;
    position: fixed;
    top: 0;

    /deep/ .van-col {
      height: 3rem;
      box-sizing: border-box;
    }

    .menu-box {
      font-size: 29px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      color: #fff;

      .go-back {
        color: #fff;
        font-size: 1.5rem;
        // margin: 0.4rem 0 0 -5rem;
      }
    }

    .page-name {
      // flex: 1;
      font-family: PingFangSC-Regular;
      font-size: 1.125rem;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      height: 100%;
      line-height: 3.75rem;
      padding-top: 0;
    }
  }


</style>
