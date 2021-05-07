<template>
 <div class="meeting-detail">
   <div class="add-meeting">


    <!-- 主题 -->
    <!--
      更换显示控件，主题字段可以自动换行
      更新日期：2020年2月29日10:35:59 by zcg
      <van-field autosize v-model="itemMsg.theme" label="主题" readonly input-align="right" />
     -->
     <div class="synopsis">
       <div class="title">主题</div>
       <div class="content">{{itemMsg.theme}}</div>
     </div>

    <!-- 简介 -->
    <!-- <van-field v-model="itemMsg.synopsis" label="简介" autosize readonly  input-align="right" /> -->
    <div class="synopsis">
      <div class="title">简介</div>
      <div class="content">{{itemMsg.synopsis}}</div>
    </div>
    <!-- 类型 -->
    <van-field
      readonly
      clickable
      label="类型"
      :value="itemMsg.type"
      input-align="right"
    />
    <!-- 时间 -->
    <van-field
      readonly
      clickable
      label="时间"
      :value="itemMsg.time"
      input-align="right"
    />
     <!-- 时长 -->
     <van-field
       readonly
       clickable
       :label="meetingTimeTitle"
       :value="itemMsg.meetingDuration"
       input-align="right"
     />
    <!-- 地点 -->
    <van-field v-model="itemMsg.place" readonly label="地点" input-align="right" />

    <!-- 组织人员 -->
    <van-field
      readonly
      clickable
      label="组织人"
      :value="itemMsg.organizer.name"
      input-align="right"
    />
    <!-- 主持人 -->
    <van-field
      readonly
      clickable
      label="主持人"
      :value="itemMsg.moderator.name"
      input-align="right"
    />
    <!-- 参会人员 -->
    <!-- <van-field
      readonly
      rows="1"
      autosize
      type="textarea"
      class="members-all"
      label="参会人员"
      :value="itemMsg.attendees"
      input-align="right"
    /> -->
     <div class="synopsis">
        <div class="title">参会人员</div>
        <div class="name-item">
          <span v-for="(item,index) in itemMsg.attendees" :key="item.id">{{item.name}}<a v-if="index != itemMsg.attendees.length-1">、</a></span>
        </div>
      </div>
    <!-- 列会人员 -->
    <!-- <van-field
      readonly
      clickable
      label="列会人员"
      :value="itemMsg.cc"
      input-align="right"
    /> -->
     <div class="synopsis">
        <div class="title">告知人员</div>
        <div class="name-item">
          <span v-for="(item,index) in itemMsg.cc" :key="item.id">{{item.name}}<a v-if="index != itemMsg.cc.length-1">、</a></span>
        </div>
      </div>

      <!-- 记录人 -->
    <van-field
      readonly
      clickable
      label="记录人"
      v-if="itemMsg.recorder.name"
      :value="itemMsg.recorder.name"
      input-align="right"
    />
    <!-- 会议纪要 -->
    <div class="meeting-content" v-if="itemMsg.record != ''">会议纪要</div>
    <div class="meeting-content meeting-item" v-html="itemMsg.record"></div>
    <!-- <van-field
      v-model="itemMsg.meeting"
      rows="2"
      autosize
      readonly
      type="textarea"
      show-word-limit
    /> -->
  </div>
 </div>

</template>

<script>
import {meetingDetail} from "@/api/meeting"
import {readMeetingNameByIndex} from "../config/meetingTypeConfig"



export default {
  name: "meetingDetail",
  data() {
    return {
      itemMsg: {
        theme: "",
        synopsis: "",
        type: "",
        time: "",
        moderator: {},
        organizer: {},
        attendees: [],
        meetingDuration: "",
        cc: [],
        avatar: "",
        recorder:{},
        record:"",
        meetingTimeTitle:"预计时长"
      }
    };
  },
  created() {
    meetingDetail(this.$route.query.id).then(res=>{
      if(res.status == 200) {
        console.log(res)
        this.itemMsg =  JSON.parse(JSON.stringify(res.data.data))
        this.itemMsg.type  = readMeetingNameByIndex(parseInt(this.itemMsg.typeId));
      }
    })
      // this.itemMsg = this.$route.query.item;
  },
  methods: {

  },
  mounted() {
    let  meetingType = this.$route.query.meetingType;
    if(meetingType!=undefined && parseInt(meetingType)==2)
    {
      this.meetingTimeTitle = "会议时长";
    }
    else
    {
      this.meetingTimeTitle = "预计时长";
    }
  }
};
</script>
<style lang="scss" scoped>
.add-meeting {
  width: 90%;
  margin: 1.8rem auto 0;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
  border-radius: 7px;
  min-height: 45.9rem;
  height: auto;
  /*padding-bottom: 15rem;*/ //update at 2020年2月19日16:26:08
  /*overflow-y: scroll;*/
  overflow-y: visible;
  background: #fff;
  box-sizing: border-box;
  // margin-bottom: 280px;//扩大表单与底部的空隙，保证会议内容全部可见
  // padding-bottom: 15rem;
  .meeting-content {
    height: 3rem;
    width: 95%;
    text-align: left;
    padding: 0 1rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 auto;
    font-family: PingFangSC-Regular;
font-size: 1.4rem;
color: #222B45;
line-height: 3rem;
  }
}
.synopsis {
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
  /* padding: 1rem 1rem 1rem 0; */
  /* margin-left: 1rem; */
  min-height: 4.2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  align-items: center;
  width: 91%;
  margin: 0 auto;
  .title {
    font-size: 1.4rem;
    color: #323233;
    padding: 0 0.3rem;
    word-break:break-all;
    word-wrap:break-word;
  }
  .content {
    width: 70%;
    text-align: right;
    color: #323233;
    font-size: 1.4rem;
    word-break:break-all;
    word-wrap:break-word;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .name-item {
    width: 70%;
    height: auto;
    text-align: right;
    padding-top: 0.5rem;
    span {
      // border: 1px solid #eee;
      // padding: 2px 7px;
      // margin-right: 3px;
      color: #323233;
      font-size: 1.4rem;
      display: inline-block;
      margin-bottom: 5px;
    }
  }
}
/deep/ .van-cell {
  height: 4.2rem;
  // font-size: 1.4rem;
  // color: #323233;
  display: flex;
  flex-direction: row;
  align-items: center;
  // padding: 1rem 16px;
  font-family: PingFangSC-Regular;
  font-size: 1.4rem;
  color: #222b45;
  width: 95%;
  padding: 0 0 0 2rem;
  .van-field__label {
    text-align: left;
    font-size: 1.4rem;
    color: #000;
  }
}
.add-meeting  .meeting-item{
  height: auto;
  opacity: 0.7;
font-family: PingFangSC-Light;
font-size: 1.4rem;
color: #222B45;
line-height: 2rem;
padding-bottom:5rem;
}
.meeting-detail {
  height: 100%;
  overflow-y: scroll;
      padding-bottom: 10rem;
    box-sizing: border-box;

  // width: 90%;
  // margin: 1.8rem auto 0;
  // background: #fff;
}
</style>


