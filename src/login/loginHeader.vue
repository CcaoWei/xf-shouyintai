<template>
  <div class="header">
    <van-icon @click="backEvent" name="arrow-left" class="back" v-if="$route.path != '/'"/>
    <img class="header-logo" src="../assets/login/header_logo.png" alt srcset />
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {},
  methods: {
    backEvent(){
      this.$router.go(-1);//返回上一层
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  width: 100%;
  background: #f9f9f8;
  box-shadow: 0 0 0 0 #b6b6b6;
  display: flex;
  flex-direction: row;
  //height: 4.4rem;
  height: 50px;
  justify-content: center;
  align-items: center;
  position: relative;
  .back {
    font-size: 2.5rem;
    color: #1e1e1e;
    position: absolute;
    left: .5rem;
    top: 50%;
    margin-top: -1.2rem;
  }
  .header-logo {
    height: 3.5rem;
    width: 7.6rem;
    // margin-left: -2rem;
  }
}
</style>
