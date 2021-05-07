<template>
  <div class="base-box" v-if="$route.path == '/entrance/goodsSetting/goodsType'">
    <div class="card-area">
      <div v-if="data.length">
        <div class="card-box" v-for="(item,index) in data" :key="index">
          <div class="card-top">
            <div class="title">{{item.text}}</div>
            <div>
              <button class="btn-edit" @click="edit(item)">编辑</button>
              <button class="btn-delete" @click="remove(item)">删除</button>
            </div>
          </div>
          <div v-if="item.specs.length">
            <div class="box-shadow" v-for="(spec,i) in item.specs" :key="i">
              <div class="card-msg">
                <div class="text-left">规格名称</div>
                <div class="text-right">{{spec.name}}</div>
              </div>
              <div class="card-msg">
                <div class="text-left">规格值</div>
                <div class="text-right">{{spec.value}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <no-goods v-else></no-goods>
    </div>
    <div class="btn-area">
      <button class="btn-edit" @click="add">新增类型</button>
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
  import {typeList, deleteType} from "@/api/goods";
  import {Dialog, Toast} from "vant";
  import noGoods from "@/components/stock/noDoods";
  // import {Toast} from "vant";

  export default {
    components: {noGoods},
    data() {
      return {
        data: [],
      };
    },
    created() {
    },
    activated() {
      if (this.$route.path == '/entrance/goodsSetting/goodsType') {
        this.getData();
      }
    },
    methods: {
      getData() {
        typeList().then(res => {
          this.data = [...res.data.data];
        });
      },
      add() {
        this.$router.push({
          path: "/entrance/goodsSetting/goodsType/add",
          query: {
            item: {
              id: null,
              text: null,
              specs: []
            }
          }
        });
      },
      edit(item) {
        this.$router.push({
          path: "/entrance/goodsSetting/goodsType/edit",
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
            deleteType(params).then(() => {
              Toast.fail("删除成功!");
              this.getData();
            });
          })
          .catch(() => {
            // on cancel
          });
      }
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
        padding: 1.25rem;
        background: #FFFFFF;
        box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
        border-radius: .375rem;
        margin-bottom: .75rem;

        .card-top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: .375rem;

          .title {
            font-family: PingFangSC-Semibold;
            font-size: 1.125rem;
            color: #424242;
            letter-spacing: 0;
          }

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
          }
        }

        .box-shadow {
          box-shadow: 0 .0625rem 0 0 rgba(143, 155, 179, 0.05);
        }

        .card-msg {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          height: 2.625rem;

          .text-left {
            font-family: PingFangSC-Regular;
            font-size: .875rem;
            color: #424242;
          }

          .text-right {
            font-family: PingFangSC-Light;
            font-size: .875rem;
            color: #424242;
            opacity: 0.5;
            text-align: right;
            width: 60%;
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

      .btn-delete {
        opacity: 0.5;
        background: #FFFFFF;
        border: .0625rem solid #8F9BB3;
        border-radius: 1.375rem;
        width: 7.5rem;
        height: 2.75rem;
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #8F9BB3;
      }

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
