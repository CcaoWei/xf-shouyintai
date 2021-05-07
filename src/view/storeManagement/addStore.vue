<template>
  <div class="add-store-box">
    <div class="add-store-top">
      <div class="add-title">店铺信息</div>
      <van-field
        class="meeting-input-keypoint"
        v-model="storeInfo.name"
        label="店铺名称"
        placeholder="请输入"
        input-align="right"
        maxlength="10"
      />
      <van-field
        class="meeting-input-keypoint"
        v-model="storeInfo.address"
        label="店铺地址"
        placeholder="请输入"
        input-align="right"
      />
      <van-field
        class="meeting-input-keypoint"
        v-model="storeInfo.monthlyTarget"
        label="单月营业额指标"
        placeholder="请输入"
        input-align="right"
      />
      <div class="shopowner">
        <div class="title">关联店长</div>
        <div class="c-select" @click="showType=true">
          <div class="title">{{shopOwnerValue}}</div>
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
      <van-uploader class="upload" v-model="files" multiple/>
    </div>

    <div class="add-store">
      <div class="add-btn" @click="addSure">确认增加</div>
    </div>
  </div>
</template>

<script>
  import {addStore, uploadImg, shopowner} from "@/api/store";
  import {Dialog, Toast} from "vant";

  export default {
    data() {
      return {
        shopOwnerValue: "不设店长",

        columns: ["不设店长"],
        showType: false,
        storeInfo: {
          name: "",
          address: "",
          monthlyTarget: "",
          pic: "",
          shopOwner: ""
        },
        isCanSavePic: false, //是否可以调用保存图片接口
        shopownerList: [], //保存店长列表
        files: []
      };
    },
    mounted() {
      shopowner().then(res => {
        console.log(res);
        if (res.status == 200) {
          this.shopownerList = JSON.parse(JSON.stringify(res.data.data.records));
          res.data.data.records.forEach(element => {
            this.columns.push(element.name);
          });
        }
      });
    },
    methods: {
      setType(value) {
        this.storeInfo.shopOwner = "";
        this.shopownerList.forEach(item => {
          if (item.name == value) {
            this.storeInfo.shopOwner = item.id;
            this.shopOwnerValue = item.name
          }
        });
        this.showType = false;
      },
      // addSure() {
      //   var param = new FormData(); // FormData 对象
      //   this.files.forEach(item => {
      //     param.append("files", item.file); // 文件对象
      //   })
      //   uploadImg(param).then(res =>{
      //     if(res.status == 200) {
      //       this.storeInfo.pic = res.data.data;
      //       addStore(this.storeInfo).then(res =>{
      //         console.log(res)
      //       })
      //     }
      //   }).then({

      //   })

      // }
      addSure() {
        // on confirm
        var param = new FormData(); // FormData 对象
        this.files.forEach(item => {
          if (item.file) {
            param.append("files", item.file); // 文件对象
            this.isCanSavePic = true;
          }
        });
        if (!this.storeInfo.name) {
          Toast.fail("请输入店铺名称!");
          return;
        }
        if (!this.storeInfo.address) {
          Toast.fail("请输入店铺地址!");
          return;
        }
        if (!this.storeInfo.monthlyTarget) {
          Toast.fail("请输入单月营业额指标!");
          return;
        }
        if (!this.isCanSavePic) {
          Toast.fail("请选择店铺图片!");
          return;
        }
        Dialog.confirm({
          title: "提示",
          message: "确定新建门店？"
        })
          .then(() => {
            uploadImg(param).then(res => {
              if (res.status == 200) {
                let picStr = "";
                this.files.forEach(item => {
                  console.log(item);
                  if (item.url) {
                    picStr += item.url + ",";
                  }
                });
                picStr += res.data.data;
                this.storeInfo.pic = picStr;
                addStore(this.storeInfo).then(() => {
                  this.$router.go(-1);
                });
              }
            });
          })
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
            border-top: 7px solid #8f95a2;
          }
        }
      }

      .upload {
        width: 100%;
        margin-top: 1.375rem;
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
</style>
