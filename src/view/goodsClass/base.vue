<template>
  <div class="base-box" v-if="$route.path == '/entrance/goodsSetting/goodsClass'">
    <div class="card-box">
      <van-collapse v-if="data.length" v-model="activeNames" class="collapse">
        <van-collapse-item v-for="(item,index) in data" :key="index" :title="item.text" :name="index">
          <div slot="value">
            <button class="btn-edit" @click="edit(item)">编辑</button>
            <button class="btn-delete" @click="remove(item)">删除</button>
          </div>
          <div class="item-row" v-for="(it,i) in item.children" :key="i">
            <div>{{it.text}}</div>
            <div>
              <button class="btn-edit" @click="edit(it)">编辑</button>
              <button class="btn-delete" @click="remove(it)">删除</button>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
      <no-goods v-else></no-goods>
    </div>
    <div class="btn-area">
      <button class="btn-edit" @click="add">新增管理分类</button>
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
  import {categoryList, deleteCategory} from "@/api/goods";
  import {Dialog, Toast} from "vant";
  import noGoods from "@/components/stock/noDoods";
  // import {Toast} from "vant";

  export default {
    components: {noGoods},
    data() {
      return {
        data: [],
        activeNames: [],
      };
    },
    activated() {
      if (this.$route.path == '/entrance/goodsSetting/goodsClass') {
        this.activeNames = [];
        this.getData();
      }
    },
    methods: {
      getData() {
        categoryList(3).then(res => {
          this.data = [...res.data.data];
        });
      },
      add() {
        this.$router.push({
          path: "/entrance/goodsSetting/goodsClass/add",
          query: {
            item: {
              id: null,
              text: null,
              pid: '0',
              children: []
            }
          }
        });
      },
      edit(item) {
        this.$router.push({
          path: "/entrance/goodsSetting/goodsClass/edit",
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
            deleteCategory(params).then(() => {
              Toast.fail("删除成功!");
              this.getData();
              this.activeNames = [];
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
      border-radius: .375rem;
      overflow: hidden;

      .collapse {
        /deep/ .van-cell__title {
          flex: inherit;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 2.375rem;
          font-family: PingFangSC-Semibold;
          font-size: 1.125rem;
          color: #424242;
          letter-spacing: 0;
        }

        /deep/ .van-icon {
          position: absolute;
        }

        .item-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-left: 2.375rem;
          font-family: PingFangSC-Regular;
          font-size: .875rem;
          color: #424242;
          height: 2.875rem;
          box-shadow: 0 .0625rem 0 0 rgba(143, 155, 179, 0.05);
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
          margin-left: .625rem;
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
