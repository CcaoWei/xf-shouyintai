<template>
  <div class="welcome" v-if="$route.path=='/'">
    <img src="../assets/login/welcome.png" alt srcset />
  </div>
  <div  class="welcome"  v-else>
     <keep-alive>
        <router-view v-if="$route.meta.isKeepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.isKeepAlive"/>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted(){
    setTimeout(() => {
       this.$router.push({
          path: "/login",
        });

    }, 3000);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.welcome {
  height: 100%;
  width: 100%;
  background: #fff;
  img {
    width: 9.5rem;
    height: 6.8rem;
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
</style>
