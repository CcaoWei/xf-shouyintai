<template>
  <div class="product-box" v-if="$route.path == '/entrance/goodsList/edit'||$route.path == '/entrance/goodsList/add'">
    <div class="product-detail">
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="24" class="front">
          <van-field :readonly="$route.path == '/entrance/goodsList/edit'" v-model="productDetail.mingcheng" type="text" label="商品名称" placeholder="请填写" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="24" class="front">
          <van-field :readonly="$route.path == '/entrance/goodsList/edit'" v-model="productDetail.tiaoxingma" type="text" label="商品条形码" placeholder="请填写" />
        </van-col>
      </van-row>
      <van-row  type="flex" justify="space-between" class="text-row" @click="judgeExist" v-if="productDetail.mingcheng && productDetail.tiaoxingma && $route.path == '/entrance/goodsList/add'">
        <van-col span="12" class="tips-row">
          <van-icon size=".875rem" name="/static/red-tips.png" />
          <span class="text-grey">请检查录入商品是否重复</span>
        </van-col>
        <van-col span="12" class="after">
          <button class="tips-btn">
            <van-icon size=".875rem" name="/static/inspect.png" />
            <span class="btn-text">检查</span>
          </button>
        </van-col>
      </van-row>
    </div>
    <div class="product-detail m-t">
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="24" class="front">
          <van-field v-model="productDetail.bianhao" type="text" label="商品编号" placeholder="请填写" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row" @click="showPopup(actions1,'leixing')">
        <van-col span="12" class="front">商品类型</van-col>
        <van-col span="11" class="after">{{productDetail.leixing.name}}</van-col>
        <van-col span="1" class="after">
          <van-icon class="icon-select" name="/static/select.png" size=".875rem" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row" @click="fenlei()">
        <van-col span="12" class="front">管理分类</van-col>
        <van-col span="11" class="after">{{productDetail.fenlei.fuText}}{{productDetail.fenlei.text}}</van-col>
        <van-col span="1" class="after">
          <van-icon class="icon-select" name="/static/select.png" size=".875rem" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row" @click="showPopup(actions3,'pinpai')">
        <van-col span="12" class="front">商品品牌</van-col>
        <van-col span="11" class="after">{{productDetail.pinpai.name}}</van-col>
        <van-col span="1" class="after">
          <van-icon class="icon-select" name="/static/select.png" size=".875rem" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row" @click="showPopup(actions6,'danwei')">
        <van-col span="12" class="front">计量单位</van-col>
        <van-col span="11" class="after">{{productDetail.danwei.name}}</van-col>
        <van-col span="1" class="after">
          <van-icon class="icon-select" name="/static/select.png" size=".875rem" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="24" class="front">
          <van-field v-model="productDetail.stock" :readonly="$route.path == '/entrance/goodsList/edit'" type="number" label="库存数量" placeholder="请填写" />
        </van-col>
      </van-row>
    </div>
    <div class="product-detail m-t">
      <van-row type="flex" justify="space-between" class="text-row" @click="showPopup(actions4,'zhuangtai')">
        <van-col span="12" class="front">销售状态</van-col>
        <van-col span="11" class="after">{{productDetail.zhuangtai.name}}</van-col>
        <van-col span="1" class="after">
          <van-icon class="icon-select" name="/static/select.png" size=".875rem" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row" @click="showPopup(actions5,'qudao')">
        <van-col span="12" class="front">销售渠道</van-col>
        <van-col span="11" class="after">{{productDetail.qudao.name}}</van-col>
        <van-col span="1" class="after">
          <van-icon class="icon-select" name="/static/select.png" size=".875rem" />
        </van-col>
      </van-row>
    </div>
    <div class="product-detail m-t p-b-btn">
      <div v-if="guigeData.length">
        <van-row v-for="(item,index) in guigeData" :key="index" type="flex" justify="space-between" class="text-row" @click="showPopup(item.values,index,true)">
          <van-col span="12" class="front">{{item.name}}</van-col>
          <van-col span="11" class="after">{{productDetail.guige[index].value}}</van-col>
          <van-col span="1" class="after">
            <van-icon class="icon-select" name="/static/select.png" size=".875rem" />
          </van-col>
        </van-row>
      </div>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="24" class="front">
          <van-field v-model="productDetail.chengben" type="number" label="成本价格（元）" placeholder="请填写" />
        </van-col>
      </van-row>
      <van-row type="flex" v-if="productDetail.qudao.key == 1 || productDetail.qudao.key == 3" justify="space-between" class="text-row">
        <van-col span="24" class="front">
          <van-field v-model="productDetail.xianshang" type="number" label="线上价格（元）" placeholder="请填写" />
        </van-col>
      </van-row>
      <van-row type="flex" v-if="productDetail.qudao.key == 2 || productDetail.qudao.key == 3" justify="space-between" class="text-row">
        <van-col span="24" class="front">
          <van-field v-model="productDetail.xianxia" type="number" label="线下价格（元）" placeholder="请填写" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="text-row">
        <van-col span="12" class="front">商品介绍</van-col>
        <van-col span="12" class="after">
          <button class="btn-edit" @click="edit">
            <van-icon name="/static/edit.png" size=".875rem" />
            <span class="text-edit">编辑</span></button>
        </van-col>
      </van-row>
    </div>
    <van-action-sheet v-model="show" :actions="actionData" @select="onSelect" />
    <van-action-sheet v-model="showFenlei" class="fenlei-area" :round="false">
      <div class="btn-fenlei">
        <div class="btn-fenlei-default left" @click="cancel">取消</div>
        <div class="btn-fenlei-default right" @click="sure">确定</div>
      </div>
      <van-tree-select class="tree-select" :items="treeItems" :active-id.sync="activeId" :main-active-index.sync="activeIndex" />
    </van-action-sheet>
    <div class="btn-area">
      <button class="btn-edit" @click="save">保存</button>
    </div>
  </div>
  <div v-else class="other-box">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive" />
  </div>
</template>

<script>
import {
  categoryList,
  brandList,
  typeList,
  unitList,
  getGuiById,
  updateGood,
  judgeExist
} from "@/api/goods";
import { mapGetters } from "vuex";
import { Toast } from "vant";

export default {
  computed: {
    ...mapGetters(["goodIntroduce"])
  },
  data() {
    return {
      productDetail: {
        id: "",
        leixing: {
          id: "",
          name: ""
          // specs: []
        },
        bianhao: "",
        fenlei: {
          id: "",
          text: "",
          fuText: ""
        },
        mingcheng: "",
        tiaoxingma: "",
        pinpai: {
          id: "",
          name: ""
        },
        zhuangtai: {
          key: "",
          name: ""
        },
        qudao: {
          key: "",
          name: ""
        },
        xianshang: "",
        chengben: "",
        xianxia: "",
        danwei: {
          id: "",
          name: ""
        },
        guige: [],
        stock: null
      },
      show: false,
      showFenlei: false,
      treeItems: [],
      activeId: "0",
      activeIndex: 0,
      actions1: [], //类型
      // actions2: [
      //   {name: "管理分类1"},
      //   {name: "管理分类2"},
      //   {name: "管理分类3"}
      // ],
      actions3: [], //品牌
      actions4: [
        { name: "在售", key: 1 },
        { name: "未售", key: 2 }
      ],
      actions5: [
        { name: "线上销售", key: 1 },
        { name: "线下销售", key: 2 },
        { name: "线上+线下销售", key: 3 }
      ],
      actions6: [], //单位
      actionData: [],
      guigeData: [],
      aimKey: "",
      isGuige: false,
      isLeixing: false,
      goodExsit: false
    };
  },
  created() {
    if (this.$route.query.item.id) {
      let zhuangtai = "";
      let qudao = "";
      if (this.$route.query.item.saleStatus == "1") {
        zhuangtai = "在售";
      } else if (this.$route.query.item.saleStatus == "2") {
        zhuangtai = "未售";
      }
      if (this.$route.query.item.channelId == "1") {
        qudao = "线上销售";
      } else if (this.$route.query.item.channelId == "2") {
        qudao = "线下销售";
      } else if (this.$route.query.item.channelId == "3") {
        qudao = "线上+线下销售";
      }
      this.productDetail = {
        id: this.$route.query.item.id,
        leixing: {
          id: this.$route.query.item.typeId,
          name: this.$route.query.item.typeName
        },
        bianhao: this.$route.query.item.salesCode,
        fenlei: {
          id: this.$route.query.item.categoryId,
          text: this.$route.query.item.categoryName,
          fuText: this.$route.query.item.pname + "/"
        },
        mingcheng: this.$route.query.item.name,
        tiaoxingma: this.$route.query.item.code,
        pinpai: {
          id: this.$route.query.item.brandId,
          name: this.$route.query.item.brandName
        },
        zhuangtai: {
          key: this.$route.query.item.saleStatus,
          name: zhuangtai
        },
        qudao: {
          key: this.$route.query.item.channelId,
          name: qudao
        },
        xianshang: this.$route.query.item.onLinePrice,
        chengben: this.$route.query.item.costPrice,
        xianxia: this.$route.query.item.offLinePrice,
        danwei: {
          id: this.$route.query.item.unitId,
          name: this.$route.query.item.unit
        },
        guige: this.$route.query.item.values,
        stock: this.$route.query.item.stock
      };
      getGuiById(this.$route.query.item.typeId).then(res => {
        this.guigeData = [...res.data.data];
      });
      this.$store.commit("SET_GOODINTRODUCE", {
        title: this.$route.query.item.title,
        content: this.$route.query.item.content,
        imgs: this.$route.query.item.imgs
      });
    }
    this.getData();
  },
  methods: {
    getData() {
      categoryList(2).then(res => {
        this.treeItems = [...res.data.data];
      });
      brandList().then(res => {
        let brandList = [];
        if (res.data.data.length) {
          for (let i in res.data.data) {
            brandList.push({
              id: res.data.data[i].id,
              name: res.data.data[i].text
            });
          }
        }
        this.actions3 = brandList;
      });
      typeList().then(res => {
        let typeList = [];
        if (res.data.data.length) {
          for (let i in res.data.data) {
            typeList.push({
              id: res.data.data[i].id,
              // specs: res.data.data[i].specs,
              name: res.data.data[i].text
            });
          }
        }
        this.actions1 = typeList;
      });
      unitList().then(res => {
        this.actions6 = res.data.data;
        if (this.actions6.length) {
          for (let i in this.actions6) {
            if (this.actions6[i].isDefault && !this.productDetail.danwei.id) {
              this.productDetail.danwei = this.actions6[i];
            }
          }
        }
      });
    },
    getGuiGe(id) {
      this.productDetail.guige = [];
      getGuiById(id).then(res => {
        this.guigeData = [...res.data.data];
        res.data.data.forEach(() => {
          this.productDetail.guige.push({
            id: "",
            sid: "",
            tid: "",
            value: "",
            name: ""
          });
        });
      });
    },
    judgeExist() {
      judgeExist(
        this.productDetail.tiaoxingma,
        this.productDetail.mingcheng
      ).then(res => {
        this.goodExsit = res.data.data;
        if (this.goodExsit) {
          Toast.fail("商品重复");
        } else {
          Toast.success("商品未重复");
        }
      });
    },
    fenlei() {
      this.showFenlei = true;
    },
    cancel() {
      this.showFenlei = false;
    },
    sure() {
      for (let i in this.treeItems) {
        for (let j in this.treeItems[i].children) {
          if (this.treeItems[i].children[j].id == this.activeId) {
            this.productDetail.fenlei = { ...this.treeItems[i].children[j] };
            this.productDetail.fenlei.fuText = this.treeItems[i].text + "/";
            this.showFenlei = false;
          }
        }
      }
    },
    showPopup(action, key, isGuige) {
      this.actionData = action;
      this.aimKey = key;
      this.show = true;
      this.isGuige = isGuige;
      this.isLeixing = key === "leixing";
    },
    onSelect(item) {
      this.show = false;
      if (this.isGuige) {
        this.productDetail.guige[this.aimKey] = item;
      } else {
        this.productDetail[this.aimKey] = item;
        if (this.isLeixing) {
          this.getGuiGe(item.id);
        }
      }
    },
    edit() {
      this.$router.push(this.$route.path + "/introduce");
    },
    save() {
      if (this.goodExsit) {
        Toast.fail("商品重复");
        return;
      }
      let params = {
        id: this.productDetail.id, //商品id,新增时没有id,编辑时有id
        brandId: this.productDetail.pinpai.id, //品牌id
        categoryName: this.productDetail.fenlei.text, //分类名称
        categoryId: this.productDetail.fenlei.id, //分类id
        channelId: this.productDetail.qudao.key, //销售渠道 1线上 2 线下 3 线上+线下
        code: this.productDetail.tiaoxingma, //商品条形码,
        unitId: this.productDetail.danwei.id,
        content: this.goodIntroduce.content, //详细介绍
        costPrice: this.productDetail.chengben, //成本价格
        imgs: this.goodIntroduce.imgs, //图片集合
        name: this.productDetail.mingcheng, //名称
        offLinePrice: this.productDetail.xianxia, //线下价格
        onLinePrice: this.productDetail.xianshang, //线上价格
        saleStatus: this.productDetail.zhuangtai.key, //销售状态 1在售 2未售
        salesCode: this.productDetail.bianhao, //商品编号
        title: this.goodIntroduce.title, //简介
        typeId: this.productDetail.leixing.id, //商品类型id
        unit: this.productDetail.danwei.name, //单位
        values: this.productDetail.guige,
        stock: this.productDetail.stock
      };
      updateGood(params).then(() => {
        Toast.success("操作成功！");
        this.$router.push("/entrance/goodsList");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.product-box {
  height: 100%;
  overflow-y: auto;

  .m-t {
    margin-top: 0.6rem;
  }

  .product-detail {
    background: #ffffff;

    .swiper-box {
      height: 20rem;
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
        border-radius: 0.0625rem;
        font-family: PingFangSC-Regular;
        font-size: 0.625rem;
        width: 1.75rem;
        height: 1rem;
        display: inline-block;
        text-align: center;
      }

      .blue {
        background: rgba(64, 158, 255, 0.1);
        border: 0.0625rem solid #409eff;
        color: #409eff;
      }

      .green {
        background: rgba(126, 211, 33, 0.1);
        border: 0.0625rem solid #7ed321;
        color: #7ed321;
      }

      .gray {
        background: rgba(34, 43, 69, 0.05);
        border: 0.0625rem solid #d0d0d0;
        color: #d0d0d0;
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

  .p-b-btn {
    margin-bottom: 5.125rem;
  }

  .text-row {
    box-shadow: 0 0.0625rem 0 0 rgba(143, 155, 179, 0.05);
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    .front {
      font-family: PingFangSC-Regular;
      text-align: left;
      padding-left: 1.25rem;
      font-size: 0.875rem;
      color: #424242;

      /deep/ .van-cell {
        padding: 0;
      }

      /deep/ .van-field__label {
        width: 7.875rem;
      }

      /deep/ .van-field__control {
        text-align: right;
        margin-right: 1.25rem;
      }
    }

    .tips-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 1.25rem;

      .text-grey {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #424242;
      }
    }

    .after {
      font-family: PingFangSC-Regular;
      text-align: right;
      padding-right: 1.25rem;
      font-size: 0.875rem;
      color: #424242;

      .icon-select {
        display: flex;
        align-items: center;
        float: right;
      }

      .btn-edit {
        width: 4.625rem;
        height: 1.625rem;
        background: #409eff;
        border-radius: 0.375rem;
        color: #ffffff;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        float: right;
        border: 0;
      }

      .text-edit {
        margin-left: 0.2rem;
      }

      .tips-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        background: #409eff;
        border-radius: 0.375rem;
        width: 4.625rem;
        height: 1.625rem;
        float: right;

        .btn-text {
          font-family: PingFangSC-Medium;
          font-size: 0.875rem;
          color: #ffffff;
        }
      }
    }
  }

  .p-b-btn {
    margin-bottom: 5.125rem;
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

  .fenlei-area {
    .btn-fenlei {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 2.875rem;

      .btn-fenlei-default {
        font-family: PingFangSC-Regular;
        font-size: 1rem;
        color: #409eff;
      }

      .left {
        margin-left: 1.25rem;
      }

      .right {
        margin-right: 1.25rem;
      }
    }

    .tree-select {
      /deep/ .van-sidebar-item--select {
        border-color: #ff8900;
      }

      /deep/ .van-tree-select__item--active {
        color: #ff8900;
      }
    }
  }
}

.other-box {
  height: 100%;
}
</style>
