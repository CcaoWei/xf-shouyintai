<template>
  <div class="base-box">
    <div class="top-box">
      <img class="top-img" src="/static/add-shop.png">
      <div class="top-msg">添加店铺最好先准备以下资料申请更加方便</div>
      <div class="top-btn" @click="goAdd">添加店铺</div>
    </div>
    <div class="msg-text m-t">1.营业执照 开店必定少不了它。</div>
    <div class="msg-text">2.餐馆、饮料、蛋糕店还要准备餐饮服务许可证或者食品经营许可证。</div>
    <div class="msg-text">3.超市类就需要食品流通许可证或食品经营许可证。</div>
    <div class="msg-text">4.药店是药品经营许可证。</div>
    <div class="msg-text">5.执照上明确写明双证合一，不再另发餐饮服务许可证的，请分别在【营业执照】端口及【餐饮服务许可】端口上传此执照图片。</div>
  </div>
</template>

<script>

  export default {
    name: "forget",
    data() {
      return {};
    },

    computed: {},
    methods: {
      goAdd() {
        this.$store.commit("SET_BUSINESSLICENSEURL", "");
        this.$store.commit("SET_CATERINGPERMITURL", "");
        this.$router.push({
          path: "/register/edit",
          query: {
            id: this.$route.query.id,
            phone: this.$route.query.phone,
            password: this.$route.query.password
          }
        });
      }
    },
    activated() {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .base-box {
    height: 100%;
    overflow-y: auto;

    .top-box {
      margin: 1.25rem;
      background: rgba(34, 43, 69, 0.03);
      border: .0625rem dashed rgba(34, 43, 69, 0.15);
      border-radius: .375rem;

      .top-img {
        margin-top: 1.64375rem;
        width: 3.2125rem;
        height: 3.2125rem;
      }

      .top-msg {
        margin: .75rem auto 0;
        width: 11.375rem;
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #222B45;
        text-align: center;
      }

      .top-btn {
        margin: 1.5rem 0;
        font-family: PingFangSC-Medium;
        font-size: 1rem;
        color: #FF8900;
      }
    }

    .msg-text {
      margin: 0 1.25rem 1rem;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #222B45;
      text-align: justify;
    }
  }
</style>
