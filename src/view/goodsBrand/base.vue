<template>
  <div class="base-box" v-if="$route.path == '/entrance/goodsSetting/goodsBrand'">
    <div class="card-box">
      <div v-if="data.length">
        <div class="good-row" v-for="(item,index) in data" :key="index">
          <div class="good-left">
            <img class="good-img" v-if="item.img" :src="item.img">
            <img class="good-img" v-else src="/static/no-brand.png">
            <div class="good-title">{{item.text}}</div>
          </div>
          <div class="good-right">
            <button class="btn-edit" @click="edit(item)">编辑</button>
            <button class="btn-delete" @click="remove(item)">删除</button>
          </div>
        </div>
      </div>
      <no-goods v-else></no-goods>
    </div>
    <div class="btn-area">
      <button class="btn-edit" @click="add">新增商品品牌</button>
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
  import {brandList, deleteBrand} from "@/api/goods";
  import {Dialog, Toast} from "vant";
  import noGoods from "@/components/stock/noDoods";
  // import {Toast} from "vant";

  export default {
    components: {noGoods},
    data() {
      return {
        data: []
      };
    },
    activated() {
      if (this.$route.path == '/entrance/goodsSetting/goodsBrand') {
        this.getData();
      }
    },
    methods: {
      getData() {
        brandList().then(res => {
          this.data = [...res.data.data];
        });
      },
      add() {
        this.$router.push({
          path: "/entrance/goodsSetting/goodsBrand/add",
          query: {
            item: {
              id: null,
              text: null,
              img: null
            }
          }
        });
      },
      edit(item) {
        this.$router.push({
          path: "/entrance/goodsSetting/goodsBrand/edit",
          query: {
            item: item
          }
        });
      },
      remove(item) {
        Dialog.confirm({
          message: "确定删除吗？"
        })
          .then(() => {
            let params = {
              id: item.id
            };
            deleteBrand(params).then(() => {
              Toast.fail("删除成功!");
              this.getData();
            });
          })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .base-box {
    height: 100%;
    overflow-y: auto;

    .card-box {
      margin: 1.25rem 1.25rem 5.5rem 1.25rem;
      background: #FFFFFF;
      box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
      border-radius: .375rem;

      .good-row {
        height: 4.75rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .625rem 1.25rem;
        justify-content: space-between;
        box-shadow: 0 .0625rem 0 0 rgba(143, 155, 179, 0.05);

        .good-left {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;

          .good-img {
            width: 3.5rem;
            height: 3.5rem;
            justify-content: flex-start;
          }

          .good-title {
            font-family: PingFangSC-Regular;
            font-size: .875rem;
            color: #424242;
            margin-left: 1.25rem;
          }
        }

        .good-right {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;

          .btn-edit {
            width: 3.25rem;
            height: 1.625rem;
            background: #FFFFFF;
            border: .0625rem solid rgba(66, 66, 66, 0.50);
            border-radius: .375rem;
            font-family: PingFangSC-Medium;
            font-size: .875rem;
            color: #424242;
            letter-spacing: 0;
          }

          .btn-delete {
            width: 3.25rem;
            height: 1.625rem;
            background: #FE5845;
            border-radius: .375rem;
            font-family: PingFangSC-Medium;
            font-size: .875rem;
            color: #FFFFFF;
            letter-spacing: 0;
            border: 0;
            margin-left: .625rem;
          }
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

  .other-box {
    height: 100%;
  }
</style>
