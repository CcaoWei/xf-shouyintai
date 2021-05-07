<template>
  <div class="box" ref="getBox" id="IDRootBox">

    <van-tabs v-model="tabChangeNum" @click="tabChange" color="darkorange">
      <van-tab title="我组织">

      </van-tab>
      <van-tab title="待参与">
      </van-tab>
      <van-tab title="其他">
      </van-tab>
    </van-tabs>


    <div v-if="list.length == 0" class="no-data-box">
          <img src="../assets/images/no_data.png" alt />
          <div class="no-data">暂无数据</div>
    </div>

    <van-pull-refresh   v-else v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <meetingItem
              v-for="(item,index) in list"
              :key="index"
              :item="item"
              @getItemId="getItemMsg"
            ></meetingItem>
          </van-list>
    </van-pull-refresh>

    <!--移除底部按钮-->
    <!-- <div class="add-btn" v-if="false">
      <van-button class="vant-add-btn" round type="warning" @click="goAddMeeting">+ 新建会议纪要</van-button>
    </div>-->
    <!-- <van-icon class="nav-top" name="upgrade"  @click="navTop" /> -->
    <img src="../assets/images/backToTop.png" class="nav-top"  @click="navTop" >

    <div class="CSSRightNavTitleBt" @click="navToAdd">+</div>

  </div>
</template>

<script>
import meetingItem from "@/components/meetingItem";
import { Toast } from "vant";
import {
  otherOfUnBeginning,
  joinInOfUnBeginning,
  partakeOfUnBeginning
} from "@/api/meeting";

export default {
  name: "index",
  components: {
    meetingItem
  },
  data() {
    return {
      pageSize: {
        current: 0,
        size: 10,
        id: ""
      },
      tabChangeNum: 0,
      list: [],
      isLoading: true,
      loading: false,
      finished: false,
      scollTopNum: "",
      isFromDetailPath:false
    };
  },
  created() {
    //add event listener for the navigation button message
    // console.log(this.$store.state.base.userInfo.user_id)
    this.pageSize.id = this.$store.state.base.userInfo.user_id;
    // this.onLoad();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  watch: {
    $route: {
      handler(to, from) {
 console.log(to)
          console.log(from)
        //console.log("index router 路由变化，from = "+from.path +" & to ="+to.path);
        if (from && to.path =="/entrance/index")
        {
          console.log("index:路有变化&开始请求数据");
           console.log(to)
          console.log(from)
          this.list = [];
          this.pageSize = {
            current: 0,
            size: 10
          };
          this.onLoad();

          // setTimeout(() => {
          //   if (this.$refs.getBox) {
          //     var historyScrollPositon = sessionStorage.getItem("scollTopNum");
          //     console.log("index.vue ，读取滚动的位置 = "+historyScrollPositon);
          //     this.$refs.getBox.scrollTop = sessionStorage.getItem(
          //       "scollTopNum"
          //     );
          //   }
          // }, 300);

        }else if(from == undefined && to.path =="/entrance/index"){
            this.list = [];
          this.pageSize = {
            current: 0,
            size: 10
          };
          this.onLoad();
        }
        else
        {
          console.log("index:路有变化&没有请求数据");
        }
      },
      immediate: true
    }
  },



  destroyed() {
    //移除当前页面的监听，App不能重复添加监听
    window.removeEventListener("NavBtMessage", () => {}, true);
    window.removeEventListener("scroll", () => {}, true);
  },
  methods: {
    navToAdd(){
      //添加会议
        this.$router.push({ path: "/entrance/addMeeting" }).catch(err => {
          err;
        });
    },
    handleScroll(e) {
      //console.log("page is scrolling = "+e.path[0].scrollTop);
      this.scollTopNum = e.path[0].scrollTop;//备注，此函数手机上面读取值失败
      // console.log(e)
      // sessionStorage.setItem("scroll", e.path[0].scrollTop);
      // sessionStorage.setItem("scrollle", e.path[0].scrollTop);
    },

    scrollToHistoryPositon(){
      if(this.isFromDetailPath)
      {
        setTimeout(()=>{
          var storePostion = sessionStorage.getItem("scollTopNum");
          this.$refs.getBox.scrollTop =storePostion;
          this.isFromDetailPath = false;
        },300);
      }

    },
    scrollToTargetPositon(targetPositon){
      this.$refs.getBox.scrollTop =targetPositon;
    },

    //返回顶部
    navTop()
    {
      this.$refs.getBox.scrollTop=0+"px";
      window.scrollBy(100,-100);

      // var _IDRootBox= document.getElementById('IDRootBox');
      // console.log(_IDRootBox.scrollHeight);
      //
      //   if(this.$el.scrollTop >= 0){
      //       this.$el.scrollTop =  0
      //     }
    },

    // 获取 我参与
    partakeOfUnBeginningUi(page) {
      partakeOfUnBeginning(page).then(res => {
        console.log(res);
        if (res.status === 200) {
          let newOfRes = JSON.parse(JSON.stringify(res.data.data))
          this.list = this.list.concat(newOfRes.records);
          // 加载状态结束
          this.loading = false;

          // // 数据全部加载完成
          if (this.list.length == newOfRes.total) {
            this.finished = true;
          }

          console.log("数据请求完成::我参加的");
          this.scrollToHistoryPositon();
        }
      });
    },
    //我组织
    joinInOfUnBeginningUi(page) {

      let data = {
        current: page.current,
        size: page.size,
        id: this.$store.state.base.userInfo.user_id
      };
      joinInOfUnBeginning(data).then(res => {
        console.log(res)
        if (res.status === 200) {
          let newJoinRes = JSON.parse(JSON.stringify(res.data.data))
          this.list = this.list.concat(newJoinRes.records);
          // 加载状态结束
          this.loading = false;
          // // 数据全部加载完成
          if (this.list.length == newJoinRes.total) {
            this.finished = true;
          }

          console.log("数据请求完成::我组织的");
          this.scrollToHistoryPositon();
        }
      });
    },
    //其他
    otherOfUnBeginningUi(page) {
      otherOfUnBeginning(page).then(res => {
        console.log(res);
        if (res.status === 200) {
          let newOtherRes = JSON.parse(JSON.stringify(res.data.data))

          this.list = this.list.concat(newOtherRes.records);
          // 加载状态结束
          this.loading = false;
          // // 数据全部加载完成
          if (this.list.length == newOtherRes.total) {
            this.finished = true;
          }

          console.log("数据请求完成::其他");
          this.scrollToHistoryPositon();
        }
      });
    },
    onRefresh() {
      // setTimeout(() => {
      Toast("刷新成功");
      this.isLoading = false;
      this.list = [];
      this.pageSize = {
        current: 0,
        size: 10
      };
      this.finished = false;
      this.onLoad();
    },
    getItemMsg(id) {

      console.log("index.vue = getItemMsg()");
      console.log(id);

      let cardScrollPositon = this.scollTopNum;
      console.log("this.scollTopNum = "+cardScrollPositon);
      if(cardScrollPositon == undefined || cardScrollPositon=="")
      {
        console.log("卡片位子信息读取失败,重新计算卡片高度");
        const cardHeight = 210;
        //读取点击卡片的索引值
        let cardRowIndex = 0;
        for(let i=0;i<this.list.length;i++)
        {
          const cardItem = this.list[i];
          console.log("i="+i+" &id = "+cardItem.id);
          if(cardItem.id == id)
          {
            cardRowIndex = i;
            break;
          }
        }
        cardScrollPositon = cardRowIndex *cardHeight;
      }

      sessionStorage.setItem("scollTopNum", cardScrollPositon);
      localStorage.setItem("tabChangeNum",this.tabChangeNum);
      console.log("this.tabChangeNum = "+this.tabChangeNum);
      this.isFromDetailPath = true;

      if(this.tabChangeNum ==0){//我组织 进开始会议并且带编辑按钮
        console.log("path = beginMeeting");

        this.$router.push({
          path: "/entrance/beginMeeting",
          name:"会议启动详情",
          query: {
            id: id
          }
        });
      }else {
        console.log("path = meetingDetail")
          this.$router.push({
          path: "/entrance/meetingDetail",
          name:"会议详情",
          query: {
            id: id
          }
        });
      }



    },
    onLoad() {
      // 异步更新数据
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      const nextPaging = {
        current: this.pageSize.current + 1,
        size: 10
      };
      this.pageSize = nextPaging;
      if (this.tabChangeNum == 0)
      {
        
        this.joinInOfUnBeginningUi(this.pageSize);
      } else if (this.tabChangeNum == 1)
      {
        this.partakeOfUnBeginningUi(this.pageSize);

      } else
        {
        this.otherOfUnBeginningUi(this.pageSize);
      }
      // }, 1000);
    },
    tabChange(name, title) {
      console.log(title);
      this.list = [];
      this.finished = false;
      sessionStorage.removeItem("scollTopNum");
      this.pageSize = {
        current: 0,
        size: 10
      };
      this.onLoad();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.box {
  /*padding-bottom: 5rem;*/
  height: 100%;
  /*overflow-y: scroll;*/
  overflow: scroll;
  box-sizing: border-box;

  .add-btn {
    height: 5rem;
    background: #fff;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding-top: 1rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    .vant-add-btn {
      padding: 0 3rem;
    }
  }
}
/deep/ .van-tabs__nav--line {
  background: #f7f9fc;
}
/deep/ .van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0;
}
/deep/ .van-tab--active {
  color: darkorange;
}
/deep/ .van-tab__pane,
.van-tab__pane-wrapper {
  min-height: 100%;
}
.nav-top {
  position: fixed;
  right: 20px;
  bottom: 41px;
  height: 44px;
  width: 44px;
}
.no-data-box {
  img {
    height: 18.4rem;
    width: 20rem;
    margin: 15rem auto 0;
  }
  .no-data {
    opacity: 0.5;
    font-family: PingFangSC-Regular;
    font-size: 1.6rem;
    color: #000000;
    text-align: center;
    line-height: 1.6rem;
    margin-top: 4rem;
  }
}
/deep/ .van-tabs--line .van-tabs__wrap {
  position: fixed;
  width: 100%;
  z-index: 3;
}
/deep/ .van-pull-refresh{
  z-index: 2;
  /*padding-top: 5.4rem;*/
  /*padding-top: 60px;*/
  //background-color: #00a0e9;
  margin-top: 60px;
  /*height: 100%;*/
  .van-pull-refresh__track{
    height: 100%;
  }
}
.CSSRightNavTitleBt {
      font-family: PingFangSC-Medium;
    font-size: 2.8rem;
    color: #fff;
    text-align: right;
    line-height: 3.4rem;
    position: fixed;
    top: 0;
    padding: 1rem;
    height: 4.4rem;
    right: 1rem;
    z-index: 99;

}
</style>
