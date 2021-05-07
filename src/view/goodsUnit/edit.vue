<template>
  <div class="base-box">
    <div class="base-box">
      <van-field class="v-input" placeholder="填写计量单位名称" v-model="name"/>
      <div class="title">其他设置</div>
      <div class="card-box">
        <div class="card-msg">设为默认新增商品单位</div>
        <van-switch class="card-btn" v-model="checked" size="1.375rem" inactive-color="#BBBBBB"/>
      </div>
    </div>
    <div class="btn-area">
      <button class="btn-edit" @click="save">保存</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .base-box {
    height: 100%;
    overflow-y: auto;

    .base-box {
      margin: 1.25rem;

      .v-input {
        background: #FFFFFF;
        border-radius: .375rem;
        box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
      }

      .title {
        font-family: PingFangSC-Semibold;
        font-size: 1.125rem;
        color: #424242;
        letter-spacing: 0;
        text-align: left;
        margin-top: 1.5rem;
      }

      .card-box {
        margin-top: .75rem;
        height: 3.75rem;
        background: #FFFFFF;
        box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
        border-radius: .375rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .card-msg {
          font-family: PingFangSC-Regular;
          font-size: .875rem;
          color: #424242;
          margin-left: 1.25rem;
        }

        .card-btn {
          margin-right: 1.25rem;
        }
      }
    }

    .btn-area {
      background-color: #FFF;
      position: fixed;
      bottom: 0;
      height: 5.125rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-shadow: 0 0 .0625rem 0 rgba(10, 22, 70, 0.06), 1.25rem 0 2.875rem -0.625rem rgba(10, 22, 70, 0.10);

      .btn-edit {
        background-image: linear-gradient(90deg, #FF7901 3%, #FE5845 100%);
        border-radius: 1.375rem;
        font-family: PingFangSC-Semibold;
        font-size: 1rem;
        color: #FFFFFF;
        text-align: center;
        width: 90%;
        height: 2.75rem;
        border: 0;
      }
    }
  }
</style>

<script>
  import {updateUnit} from "@/api/goods";
  import {Toast} from "vant";

  export default {
    data() {
      return {
        checked: false,
        name:""
      };
    },
    created() {
      this.name = this.$route.query.item.name;
      if(this.$route.query.item.isDefault){
        this.checked = true;
      }
    },
    methods: {
      save() {
        if(!this.name){
          Toast.fail("请填写计量单位名称!");
          return;
        }
        let isDefault = 0;
        if(this.checked){
          isDefault = 1;
        }
        let params = {
          id:this.$route.query.item.id,
          isDefault: isDefault,
          name: this.name,
        };
        updateUnit(params).then(() => {
          Toast.success("操作成功!");
          this.$router.push("/entrance/goodsSetting/goodsUnit");
        });
      },
    }
  };
</script>

