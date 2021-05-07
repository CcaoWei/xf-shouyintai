<template>
  <div class="product-box">
    <div class="product-detail">
      <van-swipe class="swiper-box" :autoplay="3000">
        <!--        <van-swipe-item v-for="(image, index) in images" :key="index">-->
        <!--          <img class="img-item" v-lazy="image"/>-->
        <!--        </van-swipe-item>-->
        <van-swipe-item>
          <img class="img-item" :src="productDetail.img?productDetail.img:'/static/no-img.png'"/>
        </van-swipe-item>
      </van-swipe>
      <div class="van-multi-ellipsis--l3 product-title">{{productDetail.name}}</div>
      <van-row class="price-edit">
        <van-col span="12">
          <div class="product-price">￥{{productDetail.newPrice}}</div>
        </van-col>
        <van-col span="12">
          <div class="btn-edit">
            <span class="edit-message" @click="goodEdit">编辑</span>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">商品编号:</van-col>
        <van-col span="18" class="after">{{productDetail.salesCode}}</van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">成本价格:</van-col>
        <van-col span="18" class="after">￥{{ productDetail.costPrice}}</van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">毛利润:</van-col>
        <van-col span="18" class="after">￥{{productDetail.priceMargin}}</van-col>
      </van-row>
    </div>
    <div class="product-info">
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">商品类型:</van-col>
        <van-col span="18" class="after">{{productDetail.typeName}}</van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">商品规格:</van-col>
        <van-col span="18" class="after">{{ productDetail.attributes}}</van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">管理分类:</van-col>
        <van-col span="18" class="after">
          <span v-if="productDetail.pname">{{productDetail.pname}}/</span>
          <span>{{productDetail.categoryName}}</span>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">商品条形码:</van-col>
        <van-col span="18" class="after">{{productDetail.code}}</van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">商品品牌:</van-col>
        <van-col span="18" class="after">{{productDetail.brandName}}</van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">计量单位:</van-col>
        <van-col span="18" class="after">{{productDetail.unit}}</van-col>
      </van-row>
    </div>
    <div class="product-info">
      <div class="gray-title p-t-1-5">商品简介</div>
      <div class="text-message">{{productDetail.title}}</div>
      <div class="gray-title p-t-0-5">商品详情介绍</div>
      <div class="text-message">{{productDetail.content}}</div>
    </div>

    <!--      <van-row type="flex" justify="space-between" class="text-row">-->
    <!--        <van-col span="6" class="front">进货价:</van-col>-->
    <!--        <van-col span="6" class="after">￥{{productDetail.purchasePrice}}</van-col>-->
    <!--      </van-row>-->
    <!--      <van-row type="flex" justify="space-between" class="text-row">-->
    <!--        <van-col span="6" class="front">毛利润:</van-col>-->
    <!--        <van-col span="6" class="after">￥{{ productDetail.newPrice - productDetail.purchasePrice}}</van-col>-->
    <!--      </van-row>-->
    <!--      <van-row type="flex" justify="space-between" class="text-row">-->
    <!--        <van-col span="6" class="front">sku码:</van-col>-->
    <!--        <van-col span="18" class="after">{{productDetail.sku}}</van-col>-->
    <!--      </van-row>-->

    <!--      <van-row type="flex" justify="space-between" class="text-row">-->
    <!--        <van-col span="6" class="front">分类:</van-col>-->
    <!--        <van-col span="6" class="after">{{productDetail.name}}</van-col>-->
    <!--      </van-row>-->
    <div class="info-area">
      <div class="info-title">库存：{{productDetail.stock}}件</div>
      <!--        <table class="info-table">-->
      <!--          <tr class="info-title-tr">-->
      <!--            <td class="info-title-td">尺码</td>-->
      <!--            <td class="info-title-td">库存(件)</td>-->
      <!--            <td class="info-title-td">操作</td>-->
      <!--          </tr>-->
      <!--          <tr class="info-ordinary-tr" v-for="(item,index) in productDetail.goodsSpus" :key="index">-->
      <!--            <td class="info-ordinary-td">{{item.size}}</td>-->
      <!--            <td class="info-ordinary-td">{{item.stock}}</td>-->
      <!--            <td class="info-ordinary-td"  v-if="item.stock > 0">提醒补货</td>-->
      <!--            <td class="info-ordinary-red" v-else>提醒补货</td>-->
      <!--          </tr>-->
      <!--&lt;!&ndash;          <tr class="info-ordinary-tr">&ndash;&gt;-->
      <!--&lt;!&ndash;            <td class="info-ordinary-td">S</td>&ndash;&gt;-->
      <!--&lt;!&ndash;            <td class="info-ordinary-td">22</td>&ndash;&gt;-->
      <!--&lt;!&ndash;            <td class="info-ordinary-td">提醒补货</td>&ndash;&gt;-->
      <!--&lt;!&ndash;          </tr>&ndash;&gt;-->
      <!--        </table>-->
    </div>
    <van-action-sheet v-model="showEdit" :actions="editActions" @select="editChecked"/>
    <van-dialog :beforeClose="jgClose" confirmButtonText="确认" cancelButtonText="取消" v-model="showJiage"
                title="价格编辑"
                show-cancel-button>
      <van-cell-group>
        <van-field v-model="pricevalue" class="priceInput" left-icon="gold-coin-o" type="number"/>
      </van-cell-group>
    </van-dialog>
    <van-dialog :beforeClose="zkClose" confirmButtonText="确认" cancelButtonText="取消" v-model="showZhekou"
                title="折扣编辑"
                show-cancel-button>
      <van-cell-group>
        <van-field v-model="discountvalue" class="priceInput-Z" type="number"/>
        <span class="zhe-text">折</span>
      </van-cell-group>
    </van-dialog>
  </div>

</template>
<style lang="scss" scoped>
  .product-box {
    height: 100%;
    overflow-y: auto;

    .product-detail {
      background: #ffffff;

      .swiper-box {
        height: 100vw;
        width: 100%;

        .img-item {
          width: 100%;
          height: 100%;
        }
      }

      .price-edit {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;

        .product-price {
          font-family: PingFangSC-Medium;
          font-size: 1.25rem;
          color: #F15245;
          letter-spacing: 0;
          text-align: left;
          padding-left: .875rem;
          display: flex;
          flex-direction: row;
          align-items: center;

        }

        .btn-edit {
          border: 1px solid rgba(143, 155, 179, 0.50);
          border-radius: 0.25rem;
          width: 3.75rem;
          height: 1.875rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          float: right;
          margin-right: .875rem;

          .edit-message {
            font-family: PingFangSC-Regular;
            font-size: .75rem;
            color: #222B45;
            text-align: center;
            margin: 0 auto;
          }
        }
      }

      .product-title {
        font-family: PingFangSC-Regular;
        color: #222b45;
        margin: 1rem 1.4rem 1.5rem;
        font-size: 1.125rem;
        letter-spacing: 0;
        text-align: left;
      }


      .item-text {
        text-align: left;
        padding-left: 1.4rem;
        height: 2rem;
        line-height: 2rem;
        color: #999;
      }
    }

    .product-info {
      background: #ffffff;
      margin-top: .8rem;

      .gray-title {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #424242;
        text-align: left;
        margin-left: 1.25rem;
      }

      .text-message {
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #424242;
        text-align: left;
        margin: 0 1.25rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
      }

      .p-t-1-5 {
        padding-top: 1.5rem;
      }

      .p-t-0-5 {
        padding-top: 0.5rem;
      }
    }

    .text-row {
      box-shadow: 0 .0625rem 0 0 rgba(143, 155, 179, 0.05);
      height: 2.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;

      .front {
        font-family: PingFangSC-Regular;
        text-align: left;
        padding-left: 1.25rem;
        opacity: 0.5;
        font-size: .875rem;
        color: #424242;
      }

      .after {
        font-family: PingFangSC-Regular;
        text-align: right;
        padding-right: 1.25rem;
        font-size: .875rem;
        color: #424242;
      }
    }

    .info-area {
      background: #ffffff;
      margin-top: .8rem;
      margin-bottom: 1.1875rem;

      .info-title {
        font-family: PingFangSC-Regular;
        font-size: 1.125rem;
        color: #222B45;
        letter-spacing: 0;
        text-align: left;
        padding: 1rem 1.25rem;
      }
    }

    .insert-price {
      width: 100%;
      position: fixed;
      bottom: 0;

      .submit-btn {
        border-radius: 17px;
        padding: 0 15px;
      }
    }
  }


</style>

<script>
  import {banchUpdatePrice} from "@/api/priceManage";
  import {goodDetail} from "@/api/goods";
  import {Toast} from "vant";

  export default {
    data() {
      return {
        images: [
          "https://img.yzcdn.cn/vant/apple-1.jpg",
          "https://img.yzcdn.cn/vant/apple-2.jpg"
        ],
        productDetail: {},
        hideFooter: false,
        editActions: [
          {name: '价格编辑', key: 1},
          {name: '折扣编辑', key: 2}
        ],
        showEdit: false,
        pricevalue: "",
        discountvalue: "",
        showJiage: false,
        showZhekou: false
      };
    },
    created() {
      this.getData();
      this.$store.commit("SET_BORDTABSTATUS", 3);
    },
    methods: {
      getData() {
        goodDetail(this.$route.query.product.id).then(res => {
          this.productDetail = res.data.data;
        });
      },
      goodEdit() {
        this.discountvalue = '';
        this.pricevalue = '';
        this.showEdit = true;
      },
      editChecked(item) {
        if (item.key == 1) {
          this.showJiage = true;
          this.showEdit = false;
        } else {
          this.showZhekou = true;
          this.showEdit = false;
        }
      },
      jgClose(action, done) {
        if (this.pricevalue != "" && action == "confirm") {
          let data = [{
            id: this.productDetail.id,
            oldPrice: this.pricevalue
          }];
          banchUpdatePrice(data).then(() => {
            this.getData();
          });
        } else if (action == "cancel") {
          done();
        } else {
          Toast.fail('价格不能为空！')
        }
        done()
      },
      zkClose(action, done) {
        if (action == "confirm") {
          if (!this.discountvalue) {
            Toast.fail("折扣不能为空！");
            done(false);
          } else if (this.discountvalue > 10 || this.discountvalue < 0) {
            Toast.fail("折扣最大为10最小为0！");
            done(false);
          } else {
            let data = [{
              id: this.productDetail.id,
              newPrice: this.discountvalue * this.productDetail.offLinePrice * 0.1
            }];
            banchUpdatePrice(data).then(() => {
              this.getData();
            });
          }

        } else if (action == "cancel") {
          done();
        }
        done();
      },
    }
  };
</script>

