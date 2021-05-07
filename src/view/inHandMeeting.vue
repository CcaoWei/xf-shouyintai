<template>
  <div class="box" ref="getBox">
    <van-tabs v-model="tabChangeNum" @click="tabChange" color="darkorange">
      <van-tab title="待记录">

      </van-tab>
      <van-tab title="我参与">
      </van-tab>
      <van-tab title="其他">
      </van-tab>
    </van-tabs>
    <div v-if="list.length == 0" class="no-data-box">
          <img src="../assets/images/no_data.png" alt />
          <div class="no-data">暂无数据</div>
        </div>
        <van-pull-refresh v-else v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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

  </div>
</template>

<script>
import meetingItem from "@/components/meetingItem";
import { Toast } from "vant";
import { other, ofMeeting, partake } from "@/api/meeting";

export default {
  name: "inHandMeeting",
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
      scollTopNum: ""
    };
  },
  created() {
    //add event listener for the navigation button message
    this.pageSize.id = this.$store.state.base.userInfo.user_id;
    this.$eventHub.$on("NavBtMessage", eventData => {
      const msg = eventData.msg;
      if (msg == "MSGMeetingAdd") {
        //添加会议
        this.$router.push({ path: "/entrance/addMeeting" }).catch(err => {
          err;
        });
      }
    });
    this.onLoad()
    window.addEventListener("scroll", this.handleScroll, true);
  },
  watch: {
    $route: {
      handler(to, from) {
        if (from && to.path =="/entrance/inHandMeeting"){
          this.list = [];
          this.pageSize = {
            current: 0,
            size: 10
          };
          this.onLoad();
          setTimeout(() => {
            if (this.$refs.getBox) {
              this.$refs.getBox.scrollTop = sessionStorage.getItem(
                "scollTopNum"
              );
            }
          }, 300);
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
    handleScroll(e) {
      this.scollTopNum = e.path[0].scrollTop;
      // console.log(e)
      // sessionStorage.setItem("scroll", e.path[0].scrollTop);
      // sessionStorage.setItem("scrollle", e.path[0].scrollTop);
    },
    //返回顶部
    navTop() {
        if(this.$el.scrollTop >= 0){
            this.$el.scrollTop =  0
          }
    },

    // 获取与我相关的数据
    ofMeetingUi(page) {
      let data = {
        current: page.current,
        size: page.size,
        id: this.$store.state.base.userInfo.user_id
      };
      ofMeeting(data).then(res => {
        console.log(res);
        if (res.status === 200) {
          // this.list = res.data.data.records
          let newOfRes = JSON.parse(JSON.stringify(res.data.data))

          this.list = this.list.concat(newOfRes.records);
          // 加载状态结束
          this.loading = false;

          // // 数据全部加载完成
          if (this.list.length == newOfRes.total) {
            this.finished = true;
          }
        }
      });
    },
    //获取我参与的
    partakeUi(page) {
      partake(page).then(res => {
        if (res.status === 200) {
          let newPartakeRes = JSON.parse(JSON.stringify(res.data.data))

          this.list = this.list.concat(newPartakeRes.records);
          // 加载状态结束
          this.loading = false;

          // // 数据全部加载完成
          if (this.list.length == newPartakeRes.total) {
            this.finished = true;
          }
        }
      });
    },
    //其他
    otherUi(page) {
      other(page).then(res => {
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
      // }, 1000);
    },
    getItemMsg(id)
    {

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

      //sessionStorage.setItem("scollTopNum", this.scollTopNum);
      sessionStorage.setItem("scollTopNum", cardScrollPositon);

      if(this.tabChangeNum == 0){
        this.$router.push({
        path: "/entrance/toRecorded",
        name: "纪要编写",
        query: {
          id: id
        }
      });
      }else{
        this.$router.push({
        path: "/entrance/meetingDetail",
        name: "会议详情",
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
      if (this.tabChangeNum == 0) {
        this.ofMeetingUi(this.pageSize);
      } else if (this.tabChangeNum == 1) {
        this.partakeUi(this.pageSize);
      } else {
        this.otherUi(this.pageSize);
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
  padding-bottom: 5rem;
  height: 100%;
  overflow-y: scroll;
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
}
/deep/ .van-tabs--line .van-tabs__wrap {
  position: fixed;
  width: 100%;
  z-index: 3;
}
/deep/ .van-pull-refresh{
  z-index: 2;
  /*padding-top: 5.4rem;*/
  padding-top: 60px;
  /*height: 100%;*/
  .van-pull-refresh__track{
    height: 100%;
  }
}
</style>
