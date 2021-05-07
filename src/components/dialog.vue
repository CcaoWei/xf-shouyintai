<template>
  <van-dialog class="dialog" v-model="show" :show-confirm-button=false closeOnClickOverlay @close="onClose()">
    <van-icon name="passed"/>
    <div class="dialogText">{{message}}</div>
  </van-dialog>
</template>

<script>
  export default {
    props: {
      message: {
        type: String
      },
      dialogShow: {
        type: Boolean
      },
      onClose: {
        type: Function
      }
    },
    data() {
      return {
        show: false
      };
    },
    methods: {},
    watch: {
      dialogShow() {
        this.show = this.dialogShow;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .dialog {
    width: 14rem !important;
    height: 16rem !important;
    .dialogText {
      margin-top: 2rem !important;
      font-size: 1.4rem !important;
    }
  }

  /deep/ .van-icon-passed {
    font-size: 6rem !important;
    color: #ff891c !important;
    margin-top: 3rem !important;
  }
</style>
