<template>
  <div class="base-box">
    <div class="page-area">
      <van-field class="v-input" placeholder="填写类型名称" v-model="goodCode"/>

      <div class="title">规格项</div>
      <div class="card-box" v-for="(item, index) in data" :key="index">
        <div class="card-row">
          <van-field class="card-input" placeholder="输入规格名称" v-model="item.name"/>
          <button class="btn-clear" @click="clear(index)">清空</button>
        </div>
        <div class="card-row" v-for="(spec, i) in item.values" :key="i">
          <van-field class="card-input" placeholder="填写规格值" v-model="spec.value"/>
          <button class="btn-delete" @click="remove(index,i)">删除</button>
        </div>
        <button class="btn-add-value" @click="add(index)">
          <van-icon name="plus"/>
        </button>
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


    .page-area {
      margin: 1.25rem 1.25rem 5.5rem 1.25rem;

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
        background: #FFFFFF;
        box-shadow: 0 .3125rem .625rem 0 rgba(0, 0, 0, 0.06);
        border-radius: .375rem;
        margin-top: .75rem;
        padding-bottom: 1.125rem;

        .card-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;


          /deep/ .van-cell {
            padding: 1.125rem 1.25rem;
            font-family: PingFangSC-Regular;
            font-size: .875rem;
            color: #424242;
            border: 0;
            width: calc(100% - 4.5rem);
          }

          .btn-clear {
            background: rgba(66, 66, 66, 0.30);
            border-radius: .375rem;
            width: 3.25rem;
            height: 1.625rem;
            font-family: PingFangSC-Medium;
            font-size: .875rem;
            color: #FFFFFF;
            letter-spacing: 0;
            border: 0;
            margin-right: 1.25rem;
          }

          .btn-delete {
            background: #FE5845;
            border-radius: .375rem;
            width: 3.25rem;
            height: 1.625rem;
            font-family: PingFangSC-Medium;
            font-size: .875rem;
            color: #FFF;
            letter-spacing: 0;
            border: 0;
            margin-right: 1.25rem;
          }
        }

        .btn-add-value {
          background: rgba(34, 43, 69, 0.05);
          border: .0625rem solid rgba(34, 43, 69, 0.10);
          border-radius: .375rem;
          width: calc(100% - 2.5rem);
          height: 2.25rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
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
  import Vue from "vue"
  import {updateType} from "@/api/goods";
  // import {banchUpdatePrice, priceGoodDetail} from "@/api/priceManage";
  // import {Toast} from "vant";

  import {Toast} from "vant";

  export default {
    data() {
      return {
        goodCode: "",
        data: [
          {
            name: "",
            value: "",
            values: [
              {
                id:"",
                name:"",
                sid:"",
                tid:"",
                value: ""
              }
            ]
          },
          {
            name: "",
            value: "",
            values: [
              {
                id:"",
                name:"",
                sid:"",
                tid:"",
                value: ""
              }
            ]
          },
          {
            name: "",
            value: "",
            values: [
              {
                id:"",
                name:"",
                sid:"",
                tid:"",
                value: ""
              }
            ]
          },
        ],
      };
    },
    created() {
      console.log(this.$route.query.item);
      this.goodCode = this.$route.query.item.text;
      if(this.$route.query.item.id&&this.$route.query.item.specs.length){
        for(let i in this.data){
          if(this.$route.query.item.specs[i]) {
            Vue.set(this.data, i, {...this.$route.query.item.specs[i]});
            if(!this.data[i].values.length){
              this.data[i].values = [
                {
                  id:"",
                  name:"",
                  sid:"",
                  tid:"",
                  value: ""
                }
              ];
            }
          }
        }
      }
    },
    methods: {
      edit() {
        this.$router.push({
          path: "/entrance/goodsSetting/goodsList/edit",
          query: {
            id: this.productDetail.id,
          }
        });
      },
      clear(index) {
        this.data[index].values = [
          {
            id:"",
            name:"",
            sid:"",
            tid:"",
            value: ""
          }
        ];
      },
      remove(index, i) {
        if (this.data[index].values.length > 1) {
          this.data[index].values.splice(i, 1);
        } else {
          this.data[index].values = [];
          this.data[index].values.push({
            id:"",
            name:"",
            sid:"",
            tid:"",
            value: ""
          })
        }
      },
      add(index) {
        console.log(index);
        console.log( this.data);
        this.data[index].values.push({
          id:"",
          name:"",
          sid:"",
          tid:"",
          value: ""
        })
      },
      save() {
        if(!this.goodCode){
          Toast.fail("请填写类型名称!");
          return;
        }
        let params = {
          id:this.$route.query.item.id,
          name: this.goodCode,
          spec:this.data
        };
        updateType(params).then(() => {
          Toast.success("操作成功!");
          this.$router.push("/entrance/goodsSetting/goodsType");
        });
      }
    }
  };
</script>

