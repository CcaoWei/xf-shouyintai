<template>
  <div class="all-box">
    <!-- <van-button type="default">库存</van-button>
    <van-button type="primary">价格管理</van-button>
    <van-button type="info">收银台</van-button> -->

    <businessHeader id="IDRootHeader" class="header-box"></businessHeader>

    <div class="content-box"  id="IDRootContent" ref="refrootcontent">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

    </div>

    <businessDrawer></businessDrawer>
  </div>
</template>

<script>
import businessHeader from "./businessHeader"; //暂时入口
import businessDrawer from "./businessDrawer"; //暂时入口
export default {
  name: "Entrance",
  components: {
    businessHeader,
    businessDrawer
  },
  data() {
    return {
      navTop:sessionStorage.getItem("navTop")
    };
  },
  activated(){

  },
  mounted(){
    console.log("------------");
    console.log("初始化容器");
    let screen_w =  document.body.clientWidth;
    let screen_h =  document.body.clientHeight;
    let navbar_h = document.getElementById("IDRootHeader").offsetHeight;
    let content_h =screen_h - navbar_h;
    console.log("screen_w = "+screen_w+" &screen_h = "+screen_h+" &navbar_h = "+navbar_h+" &content_h ="+content_h);
    this.$refs.refrootcontent.style.height = content_h + 'px';

  },
  // watch: {
  //   $route: {
  //     handler(to, from) {
  //       console.log(to)
  //       console.log(from);
  //       if (to &&  to.fullPath == "/entrance/noBeginMeeting") {

  //           if(this.$el){
  //             console.log("??12333")
  //             console.log(sessionStorage.getItem("scollTopNum"))
  //             console.log(this)
  //               this.$el.querySelector(".content-box").scrollTop = sessionStorage.getItem("scollTopNum");
  //               this.$el.children[1].children[0].scrollTop =sessionStorage.getItem("scollTopNum");
  //               console.log(this.$el.children[1].children[0])
  //           }

  //       }
  //     },
  //     immediate: true
  //   },
  // },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all-box {
  height: 100%;
  /*控制底部滚动*/
  overflow: hidden;
}


.header-box{
  position:absolute;
  top: 0px;
  z-index: 100;
}

.content-box {

   /*background-color: yellowgreen;*/
  /*height: 100%;*/
    /*下方代码废弃与 2020年2月28日09:00:12 by zcg*/
    /*position: fixed;*/
    /*top: 4.4rem;*/


    /*内容区域距离顶部50像素*/
    margin-top: 60px;
    z-index: 2;
    width: 100%;
    /*padding-bottom: 44px;*/
    box-sizing: border-box;
    overflow: hidden;

}
</style>
