<template>
  <div class="base-box">
    <div v-if="url" class="p-b-btn">
      <img class="img" :src="url">
    </div>
    <div v-else class="top-box">
      <img class="top-img" src="/static/add-shop.png">
      <div class="top-msg">正面拍摄照片要保证照片清晰可辨认</div>
      <div class="file-box">
        <div class="top-btn">添加照片</div>
        <input type="file" class="file" @change="handleFileChange" name id />
      </div>
    </div>
    <div class="btn-area" v-if="url">
      <button class="btn-edit" @click="ok">更换</button>
      <button class="btn-submit" @click="ok">提交</button>
      <input type="file" class="bottom-file" @change="handleFileChange" name id />
    </div>
    <div class="btn-area-l" v-else>
      <button class="btn-submit-l" @click="ok">提交</button>
    </div>
  </div>
</template>

<script>
import { uploadImgOnly } from "@/api/register";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["businessLicenseUrl", "cateringPermitUrl"])
  },
  data() {
    return {
      url: "",
      type: 1,
      e: null
    };
  },
  created() {
    console.log(88);
    this.type = this.$route.query.type;
    if (this.type == 1) {
      this.url = this.businessLicenseUrl + "";
    } else if (this.type == 2) {
      this.url = this.cateringPermitUrl + "";
    }
  },
  methods: {
    ok() {
      var param = new FormData(); // FormData 对象
      param.append("file", this.e.target.files[0]); // 文件对象
      uploadImgOnly(param).then(res => {
        if (this.type == 1) {
          this.$store.commit("SET_BUSINESSLICENSEURL", res.data.data);
        } else if (this.type == 2) {
          this.$store.commit("SET_CATERINGPERMITURL", res.data.data);
        }
        this.$router.go(-1);
      });
    },
    handleFileChange(e) {
      this.e = e;
      this.url = this.getFileURL(e.target.files[0]);
    },
    getFileURL(file) {
      let getUrl = null;
      if (window.createObjectURL !== undefined) {
        // basic
        getUrl = window.createObjectURL(file);
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
      }
      return getUrl;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.base-box {
  height: 100%;
  width: 100%;
  padding-bottom: 5.125rem;
  box-sizing: border-box;
  overflow: hidden;
  .top-box {
    margin: 1.25rem;
    background: rgba(34, 43, 69, 0.03);
    border: 0.0625rem dashed rgba(34, 43, 69, 0.15);
    border-radius: 0.375rem;

    .top-img {
      margin-top: 1.64375rem;
      width: 3.2125rem;
      height: 3.2125rem;
    }

    .top-msg {
      margin: 0.75rem auto 0;
      width: 11.375rem;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 0.875rem;
      color: #222b45;
      text-align: center;
    }

    .file-box {
      position: relative;

      .top-btn {
        margin: 1.5rem 0;
        font-family: PingFangSC-Medium;
        font-size: 1rem;
        color: #ff8900;
      }

      .file {
        position: absolute;
        height: 1rem;
        width: 4rem;
        opacity: 0;
        top: 50%;
        left: 50%;
        margin-left: -2rem;
        margin-top: -0.5rem;
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
    justify-content: space-between;
    box-shadow: 0 0 0.0625rem 0 rgba(10, 22, 70, 0.06),
      1.25rem 0 2.875rem -0.625rem rgba(10, 22, 70, 0.1);

    .btn-edit {
      background: #fff;
      border-radius: 1.375rem;
      font-family: PingFangSC-Semibold;
      font-size: 1rem;
      color: #8f9bb3;
      text-align: center;
      width: 42%;
      height: 2.75rem;
      border: 0.0625rem solid #8f9bb3;
      margin-left: 1.25rem;
    }

    .btn-submit {
      background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
      border-radius: 1.375rem;
      font-family: PingFangSC-Semibold;
      font-size: 1rem;
      color: #ffffff;
      text-align: center;
      width: 42%;
      height: 2.75rem;
      border: 0;
      margin-right: 1.25rem;
    }

    .bottom-file {
      position: absolute;
      height: 2.75rem;
      width: 42%;
      opacity: 0;
      top: 50%;
      left: 1.25rem;
      /* margin-left: -2rem;*/
      margin-top: -1.375rem;
    }
  }

  .btn-area-l {
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

    .btn-submit-l {
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
  .p-b-btn {
    height: 100%;
    width: 100%;
    /*overflow-y: auto;*/
    /*overflow-x: auto;*/
  }
  .img {
    height: 100%;
    width: 100%;
  }
}
</style>
