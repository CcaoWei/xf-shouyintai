<template>
  <van-row type="flex" class="continer" justify="space-between">
    <van-col span="8" v-if="!showBack">
      <div class="menu-box">
        <img src="../assets/images/menu.png" @click="showSidbar" />
        <!-- <van-icon @click="showSidbar" name="wap-nav" /> -->
      </div>
    </van-col>

    <van-col class="menu-box" span="8" v-else>
      <!-- <van-button type="default" @click="goback">后退</van-button> -->
      <van-icon class="go-back" name="arrow-left" @click="goback" />
    </van-col>

    <van-col span="8" class="page-name">{{headName}}</van-col>

    <!-- <van-col class="navBt-right" span="8" @click="navRightBtAction">
      <van-icon v-if="navRightBtVisible" class="go-back" v-bind:name="RightNavBtName" />
      <span v-if="navRightTitleBtVisible" class="CSSRightNavTitleBt">保存</span>
      <span v-if="navRightEditBtVisible" class="CSSRightNavTitleBt">编辑</span>
    </van-col> -->
  </van-row>
</template>

<script>
export default {
  name: "businessHeader",
  data() {
    return {
      headName: "",
      showBack: false,
      navRightBtVisible: true,
      RightNavBtName: "plus",
      navRightTitleBtVisible: false,
      navRightEditBtVisible: false,
      lasterRouterPath: ""
    };
  },
  created() {},
  watch: {
    //监听路由变化
    $route: {
      handler(to) {
        this.headName = to.name;
        if (to.meta.type != 1) {
          this.showBack = true;
        } else {
          this.showBack = false;
        }

        //新添加的部分代码，控制导航条右侧按钮
        // let routerPath = to.path.split("/");
        // const lastPath = routerPath[routerPath.length - 1];
        // //首页
        // if (lastPath == "index") {
        //   // this.navRightBtVisible = true;
        //   // this.navRightTitleBtVisible = false;
        //   this.navRightEditBtVisible = false;
        //   this.RightNavBtName = "plus";
        // } else if (lastPath == "addMeeting" || lastPath == "editMeeting") {
        //   //添加会议页面
        //   // this.navRightBtVisible = false;
        //   // this.navRightTitleBtVisible = true;
        //   this.navRightEditBtVisible = false;
        // } else if (lastPath == "beginMeeting") {
        //   // this.navRightBtVisible = false;
        //   // this.navRightTitleBtVisible = false;
        //   this.navRightEditBtVisible = true;
        // } else {
        //   //默认
        //   // this.navRightBtVisible = false;
        // }
        // this.lasterRouterPath = lastPath;
      },
      immediate: true
    }
  },
  methods: {
    showSidbar() {
      this.$store.commit("SET_SHOWSIDBAR", true);
    },
    goback() {

      console.log("点击返回按钮");
      console.log(this.$route.path);

      // if(this.$route.path != "/entrance/editMeeting"){
      // if(this.$route.path == "/entrance/editMeeting"){
      //   let eventParams = {};
      //   eventParams = {"msg":'GoBack'};
      //   this.$eventHub.$emit('NavGoBack', eventParams);
      //   return;
      // }
      //this.$router.go(-1);
      // }

      //code bellow update by zcg at 2020年2月27日22:37:50
      if(this.$route.path == "/entrance/toRecorded")
      {
        this.$eventHub.$emit("NavBtMessageToRecorded", "back");
      }
      else if(this.$route.path == "/entrance/editMeeting")
      {
        this.$eventHub.$emit("NavBtMessageEditMeeting", "back");
      }
      else
      {
        this.$router.go(-1);
      }


    },
    // navRightBtAction() {
    //   let eventParams = {};
    //   if (this.lasterRouterPath == "index") {
    //     eventParams = { msg: "MSGMeetingAdd" };
    //     this.$eventHub.$emit("NavBtMessage", eventParams);
    //   } else if (this.lasterRouterPath == "addMeeting" ) {
    //     eventParams = { msg: "MSGMeetingSave" };
    //     this.$eventHub.$emit("NavBtMessageMeetingSave", eventParams);
    //   } else if (this.lasterRouterPath == "beginMeeting") {
    //     eventParams = { msg: "MSGMeetingEdit" };
    //     this.$eventHub.$emit("NavBtMessageMeetingEdit", eventParams);
    //   } else if (this.lasterRouterPath == "editMeeting") {
    //     eventParams = { msg: "MSGMeetingEditSave" };
    //     this.$eventHub.$emit("NavBtMessageMeetingEditSave", eventParams);
    //   }else  if ( this.lasterRouterPath == "toRecorded") {
    //     eventParams = { msg: "MSGMeetingRecordedSave" };
    //     this.$eventHub.$emit("NavBtMessageToRecorded", eventParams);
    //   }
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.CSSRightNavTitleBt {
  font-family: PingFangSC-Medium;
  font-size: 1.8rem;
  color: #8f9bb3;
  text-align: right;
  line-height: 1.8rem;
}
.continer {
  /*padding: 2rem 1rem 0;*/
  /*height: 4.4rem;*/
  height: 60px;


  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  justify-content: flex-start;

  width: 100%;
  z-index: 1;
  position: fixed;
  top: 0;

  .page-name {
    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    /*line-height: 4.4rem;*/

    line-height:60px;

  }

}
.go-back {
  color: #fff;
  font-size: 2.3rem;
  // margin: 0.4rem 0 0 -5rem;
}

.menu-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  color: #fff;
  padding-left: 10px;
  img {
    height: 3rem;
    width: 3rem;
  }
}

/*
 * 导航栏右侧按钮
*/
.navBt-right {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  /*height: 4.4rem;*/
  height: 60px;
  color: #fff;
  padding-right: 2rem;
  /* margin-top: 30px; */
  line-height: 60px;
}
</style>
