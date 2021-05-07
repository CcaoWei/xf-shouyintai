<template>
  <van-popup class="drawer-box" v-model="showSidbar" position="left">
    <div class="account-msg">
      <van-image
        class="member-tx"
        round
        width="80px"
        fit="cover"
        height="80px"
        :src="userInfo.avatar || 'https://img.cct58.com/201612/16/09-35-35-26-14.jpg'"
      />
      <div class="member-name">
        <div>{{userInfo.real_name}}</div>
        <div>{{currentUser.deptName}}</div>
      </div>
    </div>

    <!-- <van-cell class="drawer-item" :class="{selected:item.selected}" v-for="(item,index) in drawerList" :key="index" @click="changeDrawerItem(item.path,index) " :title="item.name"  >
      <van-icon name="notes-o" />
    </van-cell>-->
    <div v-for="(item,index) in drawerList" :key="index">
      <div class="title">
        <div>{{item.name}}</div>
        <!-- <van-icon name="notes-o" /> -->
        <img src="../assets/images/meeting_menu.png" alt="">
      </div>
      <div
        class="title_item"
        v-for="(childItem,idx) in item.uiChildren"
        :class="{selected:childItem.selected}"
        :key="idx"
        @click="changeDrawerItem(childItem.path,childItem.id)"
      >{{childItem.name}}</div>
    </div>
    <!-- 退出登录按钮 -->
    <van-cell class="drawer-item-logout" @click="logout()" title="退出登录" />
  </van-popup>
</template>

<script>
import { mapGetters } from "vuex";
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

    ...mapGetters(["userInfo"])
  },
  watch: {
    showSidbar() {
      if (this.showSidbar) {
        this.currentUser = this.$store.state.base.userDept;
      }
    }
  },
  data() {
    return {
      currentUser: "",
      drawerList: []
    };
  },
  methods: {
    onChange() {
      //   Notify({ type: "primary", message: index });
    },
    changeDrawerItem(path, id) {
      console.log(id);
      this.drawerList[0].uiChildren.forEach(item => {
        console.log(item.selected);
        item.selected = false;
        if (id == item.id) {
          // localStorage.setItem("drawer", id);
          item.selected = true;
        }
        // item.selected = false;
        // if (index == idx) {
        //   localStorage.setItem("drawer", idx);
        //   item.selected = true;
        // }
      });
      console.log(this.drawerList[0].uiChildren);
      if (this.$route.path != "/entrance/" + path) {
        this.$router.push("/entrance/" + path);
      }
      this.showSidbar =false;
    },
    logout() {
       this.$store.commit("SET_SHOWSIDBAR", false);
      this.changeDrawerItem("index", 0)
      setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
      }, 200);
      this.$router.push("/");
    }
  },
  created() {
    this.drawerList = [];
    let routerChildren = this.$router.options.routes[1];
    // console.log(routerChildren)
    let drawerListItem = {
      name: routerChildren.name,
      selected: false,
      path: routerChildren.path,
      icon: routerChildren.icon,
      children: routerChildren.children,
      uiChildren: []
    };
    this.drawerList.push(drawerListItem);

    this.drawerList[0].children.forEach((item, index) => {
      if (item.meta.type == 1) {
        console.log(item);
        let drawerChildItem = {
          name: item.name,
          id: index,
          selected: false,
          path: item.path,
          icon: item.icon
        };
        this.drawerList[0].uiChildren.push(drawerChildItem);
      }
    });
    console.log(this.drawerList);
    if (this.drawerList[0].uiChildren) {
      this.drawerList[0].uiChildren[0].selected = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-box {
  box-sizing: border-box;
  height: 100%;
  width: 60%;
  // padding: 2rem 2.4rem 0;
  overflow: hidden;
  .account-msg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.875rem;
    box-shadow: 0 0 1px 0 rgba(10, 22, 70, 0.06),
      20px 0 46px -10px rgba(10, 22, 70, 0.1);
    padding-top: 3.2rem;
    .member-tx {
      // margin: 0 auto;
      margin-bottom: 1rem;
    }
    .member-name {
      margin-bottom: 1rem;
      text-align: left;
      div:first-child {
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #222b45;
        letter-spacing: 0;
        text-align: center;
        line-height: 16px;
        // text-align: left;
      }
      div:last-child {
        width: 100%;
        // text-align: left;
        margin-top: 0.5rem;
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #222b45;
        letter-spacing: 0;
        text-align: center;
        line-height: 14px;
      }
    }
  }

  .drawer-item {
    height: 3.5rem;
    border-bottom: none;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    font-size: 17px;
    padding: 3px 5px;
    line-height: 33px;
    font-family: PingFangSC-Light;
    font-size: 1.6rem;
    color: #222b45;
    letter-spacing: 0;
    i {
      font-size: 2rem;
      margin-left: 2rem;
    }
  }
  .drawer-item-logout {
    background: url("../assets/images/loginout.png") right center no-repeat;
    background-size: 2rem;
    position: fixed;
    /* left: 1.5rem; */
    bottom: 0;
    width: 89%;
    height: 60px;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: PingFangSC-Light;
    font-size: 16px;
    color: #222b45;
    letter-spacing: 0;
    /* line-height: 60px; */
    display: flex;
    align-items: center;
    padding: 0 24px;
  }
  .drawer-item:after {
    border-bottom: none;
  }
  .selected {
    // background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
    // border-radius: 50px;
    color: #ff7901;
    font-weight: 700;
  }
}
/deep/ .van-cell__title {
  text-align: left;
}
.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 24px;
  div {
    text-align: left;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #222b45;
    letter-spacing: 0;
    line-height: 16px;
  }
  img{
    height: 2rem;
    width: 2rem;
  }
}
.title_item {
  text-align: left;
  // padding: 0 24px;
  width: 80%;
  margin: 0 auto;
  height: 48px;
  font-family: PingFangSC-Light;
  font-size: 16px;
  color: #222b45;
  letter-spacing: 0;
  line-height: 48px;
  border-bottom: 1px solid rgba(235, 235, 235, 0.5);
}
</style>
