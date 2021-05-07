<template>
  <van-popup class="drawer-box" v-model="showSidbar" position="left">
    <div class="account-msg">
      <van-image class="member-tx" round fit="cover" :src="userInfo.avatar"/>
      <div class="member-name">{{userInfo.nick_name}}</div>

      <div class="role-name">{{userInfo.role_name}}</div>
    </div>
    <div class="drawer-i" :style="{minHeight:cardAreaH}">
      <div
        class="drawer-item van-cell"
        :class="{selected:item.selected}"
        v-for="(item,index) in drawerList"
        :key="index"
        @click="changeDrawerItem(item.path,index) "
      >
        <div class="van-cell__title">
          <span>{{item.name}}</span>
        </div>
        <van-icon :name="item.icon"/>
      </div>
    </div>
    <!--<van-cell class="drawer-item" :class="{selected:item.selected}" v-for="(item,index) in drawerList" :key="index"-->
    <!--@click="changeDrawerItem(item.path,index) " :title="item.name" :icon="item.icon"/>-->

    <!--<div data-v-58dcd661="" class="drawer-item van-cell">-->
    <!--<i data-v-58dcd661="" class="van-icon van-icon-description van-cell__left-icon">-->
    <!--</i>-->
    <!--<div data-v-58dcd661="" class="van-cell__title"><span data-v-58dcd661="">出入库明细</span></div>-->
    <!--</div>-->
    <!-- 退出登录按钮 -->
    <!-- <van-cell class="" @click="logout()" title="退出登录" /> -->
    <div class="drawer-item-logout" @click="logout()">
      <div>退出登录</div>
      <img src="../assets/images/loginout.png" alt srcset/>
    </div>
  </van-popup>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    computed: {
      showSidbar: {
        get() {
          return this.$store.getters.showSidbar;
        },
        set(val) {
          this.$store.commit("SET_SHOWSIDBAR", val);
        }
      },

      ...mapGetters(["loginType", "userInfo", "selectLeft"])
    },
    watch:{
      selectLeft(){
        this.drawerList.forEach((item, idx) => {
          item.selected = false;
          if (this.selectLeft == idx) {
            localStorage.setItem("drawer", idx);
            item.selected = true;
          }
        });
      }
    },
    data() {
      return {
        drawerList: [],
        cardAreaH: ""
      };
    },
    methods: {
      onChange() {
        //   Notify({ type: "primary", message: index });
      },
      changeDrawerItem(path, index) {
        if (this.$route.path != "/entrance/" + path) {
          this.$store.commit("SET_RELOADPAGE", true);
          this.$router.push("/entrance/" + path);
        }

        this.drawerList.forEach((item, idx) => {
          item.selected = false;
          if (index == idx) {
            localStorage.setItem("drawer", idx);
            item.selected = true;
          }
        });
        this.showSidbar = false;
      },
      logout() {
        this.$router.push("/");
        localStorage.removeItem("drawer");
      }
    },
    created() {
      let routerChildren = [...this.$router.options.routes[1].children];
      for (let i in routerChildren) {
        if (this.loginType == routerChildren[i].meta.type) {
          let drawerListItem = {
            name: routerChildren[i].meta.name,
            id: i,
            selected: false,
            path: routerChildren[i].path,
            icon: routerChildren[i].icon
          };

          this.drawerList.push(drawerListItem);
          // console.log(this.loginType);
        }
      }
      let selectNum = 0;
      if (localStorage.getItem("drawer")) {
        selectNum = localStorage.getItem("drawer");
      } else {
        localStorage.setItem("drawer", 0);
      }

      if (this.drawerList[selectNum]) {
        this.drawerList[selectNum].selected = true;
      }

      // 显示头像和名字
      // console.log(this.userInfo);
    },
    mounted() {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      // let top = h * 0.14;
      this.cardAreaH = h - 171 - 140 + "px";
    }
  };
</script>

<style lang="scss" scoped>
  // .drawer-i{
  //   min-height: 51%;
  // }
  .drawer-box {
    box-sizing: border-box;
    height: 100%;
    width: 60%;
    // padding: 2rem 0 0;
    // background: #F8F8FA;

    .account-msg {
      padding-bottom: 0.875rem;
      background: #fff;
      padding-top: 2rem;
      box-shadow: 0 0 .0625rem 0 rgba(10, 22, 70, 0.06), 1.25rem 0 2.875rem -0.625rem rgba(10, 22, 70, 0.10);
      margin-bottom: 1.5rem;

      .member-tx {
        // margin: 0 auto;
        height: 5rem;
        width: 5rem;
        // margin-bottom: 1rem;
      }

      .member-name {
        // margin-bottom: 1rem;
        font-family: PingFangSC-Regular;
        font-size: 1rem;
        color: #222b45;
        letter-spacing: 0;
        text-align: center;
      }

      .role-name {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        color: #222b45;
        letter-spacing: 0;
        text-align: center;
        line-height: 0.875rem;
        margin-top: 0.2rem;
      }
    }

    /deep/ .van-cell {
      padding: 0.625rem 0;
    }

    .drawer-item {
      height: 4.25rem;
      font-family: PingFangSC-Light;
      font-size: 1rem;
      color: #222b45;
      letter-spacing: 0;
      border-bottom: 1px solid #ebebeb;
      vertical-align: middle;
      flex-direction: row;
      align-items: center;
      text-align: left;
      // background: #F8F8FA;
      width: 78.3%;
      margin: 0 auto;

      i {
        font-size: 1.5rem;
        margin-left: 2rem;
      }
    }

    .drawer-item-logout {
      // background: url("../assets/images/loginout.png") 12rem center no-repeat;
      // background-size: 2rem;
      box-shadow: 0 0 .0625rem 0 rgba(10, 22, 70, 0.06), 1.25rem 0 2.875rem -0.625rem rgba(10, 22, 70, 0.10);
      /* bottom: 0; */
      width: 100%;
      height: 60px;
      // background-color: #fff;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 24px;
      margin-top: 3rem;
      justify-content: space-between;
      display: flex;
      flex-direction: row;
      // position: fixed;
      // bottom: 0.5rem;
      div {
        font-family: PingFangSC-Light;
        font-size: 16px;
        color: #222b45;
        letter-spacing: 0;
      }

      img {
        height: 2rem;
        width: 2rem;
      }
    }

    .drawer-item:after {
      border-bottom: none;
    }

    .selected {
      // background: #D8D8D8;
      color: #fe5845;
    }
  }
</style>
