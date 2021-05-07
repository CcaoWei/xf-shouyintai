<template>
  <div class="product-box">
    <div class="product-detail">
      <div class="title">上传商品照片</div>
      <van-uploader class="upload" v-model="files" multiple/>
      <div class="title m-t-1-1-2-5">商品简介</div>
      <div class="text-area">
        <van-field
          v-model="title"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入内容"
          show-word-limit
          maxlength="300"
        />
      </div>
      <div class="title m-t-1-1-2-5">商品详细介绍</div>
      <div class="text-area">
        <van-field
          v-model="content"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入内容"
          show-word-limit
          maxlength="300"
        />
      </div>
    </div>
    <div class="btn-area">
      <button class="btn-edit" @click="edit">完成</button>
    </div>
    <van-loading v-if="showLoad" style="position: absolute;left: 50%;top: 50%;z-index: 999" type="spinner" />
    <van-overlay :show="showLoad" />
  </div>
</template>

<script>
  import {uploadImg} from "@/api/store";
  import {mapGetters} from "vuex";

  export default {
    computed: {
      ...mapGetters(["goodIntroduce"])
    },
    data() {
      return {
        files: [],
        title: "",
        content: "",
        imgs: [],
        showLoad: false
      };
    },
    created() {
      this.title = this.goodIntroduce.title;
      this.content = this.goodIntroduce.content;
      this.imgs = this.goodIntroduce.imgs;
      this.imgs.forEach(element => {
        let newObj = {url: element};
        this.files.push(newObj);
      });
    },
    methods: {
      edit() {
        let isCanSavePic = false;
        let imgs = [];
        if (this.files.length) {
          var param = new FormData(); // FormData 对象
          this.files.forEach(item => {
            if (item.file) {
              param.append("files", item.file); // 文件对象
              isCanSavePic = true;
            }else if(item.url){
              imgs.push(item.url);
            }
          });
        }
        if (isCanSavePic) {
          this.showLoad = true;
          uploadImg(param).then(res => {
            this.$store.commit("SET_GOODINTRODUCE", {
              title: this.title,
              content: this.content,
              imgs: imgs.length?[...imgs, ...res.data.data.split(',')]:[...res.data.data.split(',')]
            });
            this.$router.go(-1);
          });
        } else {
          this.$store.commit("SET_GOODINTRODUCE", {
            title: this.title,
            content: this.content,
            imgs: imgs
          });
          this.$router.go(-1);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .product-box {
    height: 100%;
    overflow-y: auto;
    padding: 1.25rem;

    .m-t-1-1-2-5 {
      margin-top: 1.125rem;
    }

    .product-detail {
      background: #ffffff;

      padding: 1.25rem 1.25rem 7rem 1.25rem;
      box-sizing: border-box;

      .title {
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #222B45;
        text-align: left;
      }

      .upload {
        width: 100%;
        margin-top: 1rem;
      }

      .text-area {
        border: .0625rem solid #F4F4F5;
        border-radius: .125rem;
        margin-top: .625em;

        /deep/ .van-cell {
          padding: .375rem;
        }
      }
    }

    .btn-area {
      background-color: #FFF;
      position: fixed;
      left: 0;
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
