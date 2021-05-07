<template>
  <div class="baseBody">
    <div class="form">
      <div class="form-body">
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6">所在省份</van-col>
          <van-col class="font-h" span="18" @click="showProvince = true">
            <span v-if="provincialId">{{province}}</span>
            <span v-else>请选择</span>
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6">所在城市</van-col>
          <van-col class="font-h" span="18" @click="showCity = true">
            <span v-if="cityId">{{city}}</span>
            <span v-else>请选择</span>
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6">店铺类型</van-col>
          <van-col class="font-h" span="18" @click="showType = true">
            <span v-if="typeId">{{type}}</span>
            <span v-else>请选择</span>
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6">店铺名</van-col>
          <van-col class="font-h" span="18">
            <van-field v-model="name" placeholder="请输入" input-align="right" maxlength="10"/>
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6">法定代表人</van-col>
          <van-col class="font-h" span="18">
            <van-field v-model="legalRepresentative" placeholder="请输入" input-align="right" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6">店铺电话</van-col>
          <van-col class="font-h" span="18">
            <van-field v-model="phone" placeholder="请输入" input-align="right" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row">
          <van-col class="font-title" span="6">店铺地址</van-col>
          <van-col class="font-h" span="18">
            <van-field v-model="address" placeholder="按营业执照地址填写" input-align="right" />
          </van-col>
        </van-row>
        <van-row class="card-row shadow-row" @click="goUpload(1)">
          <van-col class="font-title" span="6">营业执照</van-col>
          <van-col class="font-h" span="18">
            <span v-if="businessLicenseUrl">已上传</span>
            <span v-else>未上传</span>
            <van-icon name="arrow" />
          </van-col>
        </van-row>
        <van-row v-if="typeStatus == 2" class="card-row" @click="goUpload(2)">
          <van-col class="font-title" span="18">餐饮服务许可证/食品经营许可证</van-col>
          <van-col class="font-h" span="6">
            <span v-if="cateringPermitUrl">已上传</span>
            <span v-else>未上传</span>
            <van-icon name="arrow" />
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="btn-area">
      <button class="btn-edit" @click="addSure">完成</button>
    </div>
    <van-action-sheet v-model="showProvince" :actions="provinceActions" @select="provinceChecked" />
    <van-action-sheet v-model="showCity" :actions="cityActions" @select="cityChecked" />
    <van-action-sheet v-model="showType" :actions="typeActions" @select="typeChecked" />
  </div>
</template>

<script>
import { login } from "@/api/priceManage";
import { provinceList, cityList, typeList, addShop } from "@/api/register";
import { Toast } from "vant";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["businessLicenseUrl", "cateringPermitUrl", "loginType"])
  },
  data() {
    return {
      showProvince: false,
      showCity: false,
      showType: false,
      provinceActions: [],
      cityActions: [],
      typeActions: [],
      name: "",
      legalRepresentative: "",
      phone: "",
      address: "",
      provincialId: "",
      province: "",
      cityId: "",
      city: "",
      typeId: "",
      type: "",
      typeStatus: 1
    };
  },
  activated() {
    this.getData();
  },
  watch: {
    provincialId() {
      if (this.provincialId) {
        this.getCityList();
      }
    }
  },
  methods: {
    goUpload(type) {
      this.$router.push({
        path: "/register/uploadPaper",
        query: {
          type: type
        }
      });
    },
    getData() {
      provinceList().then(res => {
        this.provinceActions = [...res.data.data];
      });
      typeList().then(res => {
        this.typeActions = [...res.data.data];
      });
    },
    getCityList() {
      cityList(this.provincialId).then(res => {
        this.cityActions = [...res.data.data];
      });
    },
    provinceChecked(value) {
      this.cityActions = [];
      this.cityId = "";
      this.city = "";
      this.provincialId = value.provincialId;
      this.province = value.name;
      this.showProvince = false;
    },
    cityChecked(value) {
      this.cityId = value.cityId;
      this.city = value.name;
      this.showCity = false;
    },
    typeChecked(value) {
      this.typeId = value.id;
      this.type = value.name;
      this.typeStatus = value.status;
      this.showType = false;
    },
    addSure() {
      if (!this.provincialId) {
        Toast.fail("选择省份!");
        return;
      }
      if (!this.cityId) {
        Toast.fail("请选择城市!");
        return;
      }
      if (!this.typeId) {
        Toast.fail("请选择店铺类型!");
        return;
      }
      if (!this.name) {
        Toast.fail("请填写店铺名!");
        return;
      }
      if (!this.legalRepresentative) {
        Toast.fail("请填写法定代表人!");
        return;
      }
      if (!this.phone) {
        Toast.fail("请填写店铺电话!");
        return;
      }
      if (!this.address) {
        Toast.fail("请填写店铺地址!");
        return;
      }
      if (!this.businessLicenseUrl) {
        Toast.fail("请填上传营业执照!");
        return;
      }
      if (this.typeStatus == 2 && !this.cateringPermitUrl) {
        Toast.fail("请填上传餐饮服务许可证/食品经营许可证!");
        return;
      }
      let params = {
        shopOwner: this.$route.query.id,
        provincialId: this.provincialId,
        cityId: this.cityId,
        typeId: this.typeId,
        name: this.name,
        legalRepresentative: this.legalRepresentative,
        phone: this.phone,
        address: this.address,
        businessLicenseUrl: this.businessLicenseUrl,
        cateringPermitUrl: this.cateringPermitUrl
      };
      // on confirm
      addShop(params).then(() => {
        let data = {
          username: this.$route.query.phone,
          password: this.$route.query.password,
          grant_type: "password"
        };
        login(data).then(res => {
          let routers = [];
          localStorage.setItem("drawer", 0);
          this.$store.commit("LOGIN_TYPE", "2");
          this.$store.commit("SET_USERINFO", res.data);
          let routerChildren = [...this.$router.options.routes[1].children];
          for (let i in routerChildren) {
            if (this.loginType == routerChildren[i].meta.type) {
              routers.push(routerChildren[i]);
            }
          }
          this.$router.push(`/entrance/${routers[0].path}`);
        });
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.baseBody {
  height: 100%;
  padding-bottom: 5.125rem;
  padding-top: 1px;
  overflow-y: auto;

  .form {
    margin: 0.5rem auto 0;

    .form-body {
      border-radius: 0.375rem;
      background: #fff;
      margin: 1rem;
      padding: 1rem;

      /deep/ .van-cell {
        padding: 0;
      }

      .form-title {
        font-family: PingFangSC-Semibold;
        font-size: 1.125rem;
        color: #222b45;
        letter-spacing: 0;
        text-align: left;
      }

      .shadow-row {
        border-bottom: 1px solid rgba(143, 155, 179, 0.05);
      }

      .card-row {
        height: 2.75rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;

        .font-title {
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #222b45;
          text-align: left;
        }

        .font-h {
          opacity: 0.5;
          font-family: PingFangSC-Regular;
          font-size: 0.875rem;
          color: #222b45;
          text-align: right;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
        }
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
