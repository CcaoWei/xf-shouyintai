<template>
  <div class="base-box">
    <div class="base-box">
      <van-field class="v-input" placeholder="填写品牌名称" v-model="name"/>
      <div class="title">上传品牌图片</div>
      <van-uploader class="upload" v-model="files" :max-count="1"/>
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

    .base-box {
      margin: 1.25rem;

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

      .upload {
        float: left;
        margin-top: .75rem;
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
  import {uploadImg} from "@/api/store";
  import {updateBrand} from "@/api/goods";
  import {Toast} from "vant";


  export default {
    data() {
      return {
        files: [],
        name: "",
        isCanSavePic: false
      };
    },
    created() {
      this.name = this.$route.query.item.name;
      if (this.$route.query.item.img) {
        this.files = [{url: this.$route.query.item.img}];
      }
    },
    methods: {
      save() {
        var param = new FormData(); // FormData 对象
        this.files.forEach(item => {
          if (item.file) {
            param.append("files", item.file); // 文件对象
            this.isCanSavePic = true;
          }
        });
        if (!this.name) {
          Toast.fail("请填写品牌名称!");
          return;
        }
        if (this.isCanSavePic) {
          uploadImg(param).then(res => {
            if (res.status == 200) {
              let params = {
                id: this.$route.query.item.id,
                img: res.data.data,
                name: this.name,
              };
              updateBrand(params).then(() => {
                Toast.success("操作成功!");
                this.$router.push("/entrance/goodsSetting/goodsBrand");
              });
            }
          });
        } else {
          if (this.files.length > 0) {
            let params = {
              id: this.$route.query.item.id,
              img: this.files[0].url,
              name: this.name,
            };
            updateBrand(params).then(() => {
              this.$router.push("/entrance/goodsSetting/goodsBrand");
            });
          } else {
            Toast.fail("请上传品牌图片!");
          }
        }
      },
    }
  };
</script>

