<template>
  <div class="product-box">
    <div class="product-detail">
      <van-swipe v-if="productDetail.imgs.length" class="swiper-box" :autoplay="3000">
        <!--        <van-swipe-item v-for="(image, index) in images" :key="index">-->
        <!--          <img class="img-item" v-lazy="image"/>-->
        <!--        </van-swipe-item>-->
        <van-swipe-item v-for="(image, index) in productDetail.imgs" :key="index">
          <img class="img-item" :src="image"/>
        </van-swipe-item>
      </van-swipe>
      <img v-else class="swiper-box" src="/static/no-img.png">
      <div class="tips-area">
        <div class="goods-tips blue" v-if="productDetail.saleStatus == '1'">在售</div>
        <div class="goods-tips gray" v-if="productDetail.saleStatus == '2'">未售</div>
        <div class="goods-tips green" v-if="productDetail.channelId == '1' || productDetail.channelId == '3'">线上</div>
        <div class="goods-tips green" v-if="productDetail.channelId == '2' || productDetail.channelId == '3'">线下</div>
      </div>
      <div class="van-multi-ellipsis--l3 product-title">{{productDetail.name}}</div>

      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">商品编号:</van-col>
        <van-col span="18" class="after">{{productDetail.salesCode}}</van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">成本价格:</van-col>
        <van-col span="18" class="after">￥{{ productDetail.costPrice}}</van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">线上售价:</van-col>
        <van-col span="18" class="after">￥{{productDetail.onLinePrice}}</van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">线下售价:</van-col>
        <van-col span="18" class="after">￥{{productDetail.offLinePrice}}</van-col>
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
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="6" class="front">库存数量:</van-col>
        <van-col span="18" class="after">{{productDetail.stock}}</van-col>
      </van-row>
    </div>
    <div class="product-info p-b-btn">
      <div class="gray-title p-t-1-5">商品简介</div>
      <div class="text-message">{{productDetail.title}}</div>
      <div class="gray-title p-t-0-5">商品详情介绍</div>
      <div class="text-message">{{productDetail.content}}</div>
    </div>
    <div class="btn-area">
      <button class="btn-delete" @click="remove">删除</button>
      <button class="btn-edit" @click="edit">编辑</button>
    </div>
  </div>

</template>
<style lang="scss" scoped>
  .product-box {
    height: 100%;
    overflow-y: auto;
  }

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

    .tips-area {
      margin-top: 1rem;
      margin-left: 1.25rem;
      text-align: left;

      .goods-tips {
        border-radius: .0625rem;
        font-family: PingFangSC-Regular;
        font-size: .625rem;
        width: 1.75rem;
        height: 1rem;
        display: inline-block;
        text-align: center;
      }

      .blue {
        background: rgba(64, 158, 255, 0.10);
        border: .0625rem solid #409EFF;
        color: #409EFF;
      }

      .green {
        background: rgba(126, 211, 33, 0.10);
        border: .0625rem solid #7ED321;
        color: #7ED321;
      }

      .gray {
        background: rgba(34, 43, 69, 0.05);
        border: .0625rem solid #D0D0D0;
        color: #D0D0D0;
      }
    }

    .product-title {
      font-family: PingFangSC-Regular;
      color: #222b45;
      margin: 1rem 1.25rem 1.5rem;
      font-size: 1.125rem;
      letter-spacing: 0;
      text-align: left;
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

  .p-b-btn {
    margin-bottom: 5.125rem;
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
      width: 12.6875rem;
      height: 2.75rem;
      border: 0;
    }
  }
</style>

<script>
  import {goodDetail, deleteGood} from "@/api/goods";
  import {Dialog, Toast} from "vant";
  // import {banchUpdatePrice, priceGoodDetail} from "@/api/priceManage";
  // import {Toast} from "vant";

  export default {
    data() {
      return {
        productDetail: {
          imgs:[]
        },
      };
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        goodDetail(this.$route.query.id).then(res => {
          this.productDetail = res.data.data;
        });
      },
      edit() {
        this.$router.push({
          path: "/entrance/goodsList/edit",
          query: {
            item: this.productDetail,
          }
        });
      },
      remove() {
        Dialog.confirm({
          message: "确定删除吗？"
        })
          .then(() => {
            deleteGood({id: this.$route.query.id}).then(() => {
              Toast.fail("删除成功!");
              this.$router.push("/entrance/goodsList");
            });
          })
      }
    }
  };
</script>

