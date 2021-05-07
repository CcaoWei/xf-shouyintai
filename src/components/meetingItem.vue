<template>
  <div>
    <div class="item" @click="goDetail(item.id)">
      <div class="con">
        <div class="title">{{item.theme}}</div>
        <div class="main">{{item.synopsis}}</div>
        <div class="person">{{item.attendees}}</div>
      </div>
      <div class="metting-date" :class="{'recorder':isRecorder}">
        <div class="host" v-if="item.recorderName != ''">
          <img :src="item.img" v-if="item.img" alt srcset />
          <img v-else src="../assets/login/morentx.png" alt="">
          <!-- <span>{{position}}</span> -->
          <span>{{item.gid}}</span>
          <span>{{item.recorderName}}</span>
        </div>
        <div v-if="item.type ==1" class="metting-type today">{{item.time}}</div>
        <div v-else class="metting-type">{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { getPerson } from "@/api/meeting"; //finishMeeting

  export default {
    name: "index",
    props: ["item"],
    data() {
      return {
        isRecorder: true
      };
    },
    created() {
      let eleTime = this.item.time.substr(0, 10);
      this.item.time = eleTime.replace(/-/gi, "/");
      this.item.type = 0;
      if (this.isToday(eleTime)) {
        this.item.type = 1;
      }
      if (this.item.recorderName && this.item.recorderName != "") {
        this.isRecorder = false;
      }
    },
    methods: {
      goDetail(id) {
        console.log("单击卡片详情");
        this.$emit("getItemId", id);
      },
      isToday(str) {
        var d = new Date(str.replace(/-/g, "/"));
        var todaysDate = new Date();
        if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .item {
    /* 新ui */
    width: 89.3%;
    height: auto;
    margin: 0 auto 1rem;
    background: #fff;
    padding: 2rem;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    /* 旧ui */
    /* width: 94%;
  height: auto;
  -webkit-box-shadow: 0 0 3px #f9fafb;
  box-shadow: 0 0 3px #f9fafb;
  margin: 1rem auto 0;
  background: #fff;
  padding: 1rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 5px; */

  }
  .con {
    /* border-bottom: 1px solid #F9FAFB; */
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    text-align: left;
    background: #ffffff;
    box-shadow: 0 1px 0 0 rgba(143, 155, 179, 0.05);
    padding-bottom: 0.8rem;
  }
  .title {
    /* text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 98%;
    font-family: PingFangSC-Semibold;
    font-size: 1.8rem;
    color: #222b45;
    letter-spacing: 0;
    line-height: 1.8rem; */

    font-size: 20px;
    text-align: left;
    color: #222b45;
    margin: .2rem 0;
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;


  }
  .main {
    /* margin: 1rem 0 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

    opacity: 0.8;
    font-family: PingFangSC-Light;
    font-size: 1.6rem;
    color: #222b45;
    letter-spacing: 0;
    line-height: 2.2rem; */

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 16px;
    color: #222b45;
    margin: .8rem 0;
    height: 45px;
    max-lines: 2;


  }
  .person {
    /* width: 100%;
      overflow: hidden;
      white-space: normal;
      text-overflow:ellipsis; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 98%;
    margin-top: 2rem;
    opacity: 0.3;
    font-family: PingFangSC-Light;
    font-size: 1.4rem;
    color: #222b45;
    line-height: 2rem;
  }
  .metting-date {
    text-align: right;
    width: 100%;
    margin: 0 auto;
    /* padding: 1rem 0 0; */
    margin-top: 1.6rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .recorder {
    justify-content: flex-end;
  }
  .host {
    float: left;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
  }
  .host img {
    height: 3rem;
    width: 3rem;
    border-radius: 100%;
    margin-right: 0.6rem;
  }
  .host span {
    text-align: left;
    font-family: PingFangSC-Light;
    font-size: 1.4rem;
    color: #222b45;
    line-height: 2rem;
    margin-right: 0.6rem;
  }
  /* .host span:last-child{
     width: 5rem;
      overflow: hidden;
  } */
  .metting-type {
    height: 3.2rem;
    text-align: center;
    width: 10.2rem;
    line-height: 3.2rem;
    float: right;
    color: #8d939f;
    border-radius: 4px;
    background: #f9fafb;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 1.2rem;
    text-align: center;
  }
  .today {
    color: #ff8a01;
    background: #fff9f4;
  }
</style>
