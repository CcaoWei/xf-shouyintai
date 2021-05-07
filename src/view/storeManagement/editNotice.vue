<template>
  <div class="add-store-box">
    <div class="add-store-top">
      <div class="add-title">编辑通知</div>
      <van-field
        class="meeting-input-keypoint"
        v-model="msg.name"
        label="主题"
        placeholder="工作总结"
        input-align="right"
      />
      <div class="shopowner">
        <div class="title">接收人</div>
        <div class="c-select" @click="showType=true">
          <div class="c-title">{{value}}</div>
          <div class="select-icon"></div>
        </div>
        <van-popup v-model="showType" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showType = false"
            @confirm="setType"
          />
        </van-popup>
      </div>
      <!-- <van-field class="meeting-input-keypoint" label="内容：" readonly /> -->
      <div class="notice-content">内容：</div>
      <van-field
        v-model="message"
        rows="2"
        autosize
        class="input-insert"
        type="textarea"
        maxlength="200"
        placeholder="请输入"
        show-word-limit
      />
    </div>

    <div class="add-store">
      <div class="add-btn">完成</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "国贸店全员",
      columns: ["国贸店全员", "设店长"],
      showType: false,
      msg: {
        name: "",
        address: "",
        index: ""
      },
      message:"",
    };
  },
  methods: {
    setType(){
      this.showType = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.add-store-box {
  background: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  width: 100%;
  height: 100%;
  background: #f7f9fc;
  box-sizing: border-box;
  padding-top: 1.25rem;
  .add-store-top {
    width: 89.3%;
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 1.25rem;
    height: 100%;

    .add-title {
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #222b45;
      letter-spacing: 0;
      line-height: 1.125rem;
    }
    .shopowner {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      min-height: 2.625rem;
      border-bottom: 1px solid #ebedf0;

      .title {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        line-height: 0.875rem;
              margin-right: 0.3rem;
        }
      .c-select {
        border: 1px solid rgba(143, 155, 179, 0.5);
        border-radius: 4px;
        border-radius: 4px;
        padding: 0.2rem 0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .c-title {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        line-height: 0.875rem;
              margin-right: 0.3rem;
        }

        .select-icon {
          width: 0;
          height: 0;
          border-right: 5px solid transparent;
          border-left: 5px solid transparent;
          border-top: 7px solid #8F95A2;
        }
      }
    }
    .notice-content {
      font-family: PingFangSC-Regular;
      font-size: 0.875rem;
      color: #222b45;
      line-height: 2.625rem;
      height: 2.625rem;
      width: 100%;
      text-align: left;
    }
    .input-insert {
      margin: 1px auto 0;
      border: 1px solid #E9EAEC;
      border-radius: 6px;
      min-height: 12.5rem;
      padding: 0.6875rem;
      /deep/ .van-field__word-limit {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
  .add-store {
    height: 5.125rem;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background: #fff;
    width: 100%;
    .add-btn {
      background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
      border-radius: 22px;
      height: 2.75rem;
      width: 20.9rem;
      margin: 0 auto;
      font-family: PingFangSC-Semibold;
      font-size: 1rem;
      color: #ffffff;
      text-align: center;
      line-height: 2.75rem;
    }
  }
  .add-title {
    float: left;
  }
}
/deep/ .van-cell {
  padding: 10px 0;
  min-height: 2.625rem;
  width: 100%;
  border-bottom: 1px solid #ebedf0;
  .van-field__label {
    text-align: left;
    width: auto;
  }
}
/deep/ .van-cell:not(:last-child)::after {
  border: 0;
}
/deep/ .el-select {
  border: 0;
  border-radius: 4px;
  width: 6rem;
  // height: 1.5rem;
  // box-sizing: border-box;
  .el-input__inner {
    // height: 100%;
    border: 0;
    // box-sizing: border-box;
    // line-height: 1.5rem;
    // height: 1.4rem;
  }
  // .el-input__suffix {
  //   top: 0.5rem;
  // }
}
</style>
