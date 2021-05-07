<template>
  <div class="base-box">
    <div class="base-box">
      <van-field class="v-input" placeholder="填写分类名称" v-model="name" />
      <div class="title">分类级别</div>
      <div class="card-row">
        <div class="card-left">{{firstData}}</div>
        <van-icon class="card-right" name="/static/select.png" @click="showFirst = true" />
      </div>
      <div class="card-row" v-if="firstData == '二级类目'">
        <div class="card-left">
          <span v-if="secondData.id">{{secondData.name}}</span>
          <span v-else>选择父级</span>
        </div>
        <van-icon class="card-right" name="/static/select.png" @click="showSecond = true" />
      </div>
    </div>
    <van-action-sheet v-model="showFirst" :actions="firstActions" @select="selectFirst" />
    <van-action-sheet v-model="showSecond" :actions="secondActions" @select="selectSecond" />
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
      background: #ffffff;
      border-radius: 0.375rem;
      box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.06);
    }

    .title {
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #424242;
      letter-spacing: 0;
      text-align: left;
      margin-top: 1.5rem;
    }

    .card-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.06);
      border-radius: 0.375rem;
      height: 3.75rem;
      margin-top: 0.75rem;

      .card-left {
        margin-left: 1.25rem;
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #424242;
      }

      .card-right {
        margin-right: 1.25rem;
        font-size: 0.875rem;
      }
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

<script>
import { updateCategory, firstCategoryList } from "@/api/goods";
import { Toast } from "vant";
// import {banchUpdatePrice, priceGoodDetail} from "@/api/priceManage";
// import {Toast} from "vant";

export default {
  data() {
    return {
      name: "",
      showFirst: false,
      showSecond: false,
      firstActions: [{ name: "一级类目" }, { name: "二级类目" }],
      secondActions: [],
      firstData: "一级类目",
      secondData: {},
      isInit: false
    };
  },
  created() {
    this.name = this.$route.query.item.text;
    if (this.$route.query.item.pid != "0") {
      this.firstData = "二级类目";
      this.isInit = true;
    }
    this.getData();
  },
  methods: {
    getData() {
      firstCategoryList(this.$route.query.item.id).then(res => {
        this.secondActions = [...res.data.data];
        if (this.isInit) {
          for (let i in this.secondActions) {
            this.isInit = false;
            if (this.secondActions[i].id === this.$route.query.item.pid) {
              this.secondData = this.secondActions[i];
            }
          }
        }
      });
    },
    save() {
      if (!this.name) {
        Toast.fail("请填写分类名称!");
        return;
      }
      let params = {
        id: this.$route.query.item.id,
        name: this.name,
        parentId: this.secondData.id || "0"
      };
      updateCategory(params).then(() => {
        Toast.success("操作成功!");
        this.$router.push("/entrance/goodsSetting/goodsClass");
      });
    },
    selectFirst(item) {
      if (item.name == "一级类目") {
        this.secondData = {};
      }
      this.firstData = item.name;
      this.showFirst = false;
    },
    selectSecond(item) {
      this.secondData = item;
      this.showSecond = false;
    }
  }
};
</script>

