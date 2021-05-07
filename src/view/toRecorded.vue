<template>
  <div class="metting-detail" :style="{height:cardAreaH}">

   <div   ref="iddetailcontent" style=" overflow: scroll">
     <div class="add-meeting">
       <!-- 主题 -->
       <van-field v-model="itemMsg.theme" label="主题" readonly input-align="right" />
       <!-- 简介 -->
       <!-- <van-field v-model="itemMsg.synopsis" label="简介" autosize readonly  input-align="right" /> -->
       <div class="synopsis">
         <div class="title">简介</div>
         <div class="content">{{itemMsg.synopsis}}</div>
       </div>

       <van-collapse v-model="activeNames">
         <van-collapse-item title name="0">
           <!-- 类型 -->
           <van-field readonly clickable label="类型" :value="itemMsg.type" input-align="right" />
           <!-- 时间 -->
           <van-field readonly clickable label="时间" :value="itemMsg.time" input-align="right" />

           <!-- 时长 -->
           <van-field
             readonly
             clickable
             label="预计时长"
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
           />-->
           <div class="synopsis">
             <div class="title">参会人员</div>
             <div class="name-item">
               <span v-for="(item,index)  in itemMsg.attendees" :key="item.id">{{item.name}}<a v-if="index != itemMsg.attendees.length-1">、</a></span>
             </div>
           </div>
           <!-- 列会人员 -->
           <!-- <van-field readonly clickable label="列会人员" :value="itemMsg.cc" input-align="right" /> -->
           <div class="synopsis">
             <div class="title">告知人员</div>
             <div class="name-item">
               <span v-for="(item,index)  in itemMsg.cc" :key="item.id">{{item.name}}<a v-if="index != itemMsg.cc.length-1">、</a></span>
             </div>
           </div>
         </van-collapse-item>
       </van-collapse>
     </div>

     <!-- 会议纪要 -->
     <div class="record-box">
       <div class="meeting-content">会议纪要</div>

       <UE :defaultMsg="itemMsg.record" :config=UEditorStyleConfig ref="ueditor" style="border: 1px solid white;"></UE>

     </div>

     <div style="height: 250px;width: 100%;">

     </div>
   </div>


    <div class="add-btn">
      <van-button
        class="vant-add-btn"
        :disabled="disabled"
        @click="overMeeting"
        :class="{ 'active': isActive }"
        round>完成会议</van-button>
    </div>


    <messageAlert :message="message" @cancle="confirmAlert_cancel" @confirm="confirmAlert" v-if="showAlert"></messageAlert>
    <div class="CSSRightNavTitleBt" @click="saveMeeting">保存</div>

  </div>
</template>

<script>
import { meetingDetail, addMeeting, finishMeeting } from "@/api/meeting"; //finishMeeting
import messageAlert from "../components/messageAlert";
import {readMeetingNameByIndex} from "../config/meetingTypeConfig"

import UE from '../components/ue'


export default {
  name: "toRecorded",
  components: { messageAlert,UE},
  data() {
    return {

      UEditorStyleConfig: {
        initialFrameWidth: null,
        initialFrameHeight: 300,
        toolbars: null,
        elementPathEnabled : false,//是否启用元素路径，默认是true显示
        enableAutoSave:false,
        saveInterval:1000000,
        maximumWords:10000,
        wordCount:true,
        zIndex:0
      },

      message: {
        title: "保存成功",
        content: "更新会议纪要成功",
        isCancel: false,
        doneType:0 //0=cancel,1=done
      },
      showAlert: false,
      sendBefore: true,
      activeNames: ["1"],
      isActive: false,
      disabled: true,
      itemMsg: {
        theme: "",
        synopsis: "",
        type: "",
        time: "",
        place: "",
        moderator: {},
        organizer: {},
        attendees: [],
        cc: [],
        record: "数据读取中...",
        recorder: {}
      },
      cardAreaH: "",
    };
  },
  beforeMount() {
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    // let top = h * 0.13;
    // this.cardAreaH = h - 120 - top + "px";

    //重新计算内高度 code update by cgz at 2020年2月11日21:26:50
    this.cardAreaH = h - 44 + "px";
  },
  mounted(){

    this.$eventHub.$on("NavBtMessageToRecorded", eventData => {
      const msg = eventData;
      console.log("toRecorded message ->"+msg);
      let content = this.$refs.ueditor.getUEContent();
      this.itemMsg.record = content;
      console.log(content);
      if (this.itemMsg.record !=undefined && this.itemMsg.record !="" &&this.itemMsg.record.length>0 )
      {
        this.showAlert = true;
        this.message = {
          title: "提示",
          content: "您要放弃编写么？",
          isCancel: true,
          doneType:1
        };
      }
      else
      {
        console.log("编辑框中没有内容，直接退出");
        this.$router.back(-1);
      }
    });

    //动态计算高
    let screen_h2 =  document.body.clientHeight;
    this.$refs.iddetailcontent.style.height =screen_h2 - 80 - 80+'px';

    //初始化数据
    this.getMeetingDetail();

  },
  destroyed() {
    window.removeEventListener("NavBtMessageToRecorded", () => {}, true);//移除当前页面的监听，App不能重复添加监听
  },
  methods: {


    getMeetingDetail()
    {
      meetingDetail(this.$route.query.id).then(res => {
        if (res.status == 200) {
          this.itemMsg = JSON.parse(JSON.stringify(res.data.data));
          this.itemMsg.type = readMeetingNameByIndex(parseInt(this.itemMsg.typeId));


          // switch (this.itemMsg.typeId) {
          //   case 1:
          //     this.itemMsg.type = "经验交流会";
          //     break;
          //   case 2:
          //     this.itemMsg.type = "电话会议 ";
          //     break;
          //   case 3:
          //     this.itemMsg.type = "网络会议";
          //     break;
          //   case 4:
          //     this.itemMsg.type = "电视会议";
          //     break;
          //   case 5:
          //     this.itemMsg.type = "其他会议";
          //     break;
          //   default:
          //     break;
          // }
           this.$refs.ueditor.setUEContent(this.itemMsg.record);
        }
      });
      // this.itemMsg = this.$route.query.item;
    },

    saveMeeting(){
      console.log("保存会议")
      let content = this.$refs.ueditor.getUEContent();
      this.itemMsg.record = content;

      if (this.itemMsg.record == "") {
        // Dialog.alert({
        //   message: "请填写会议纪要"
        // }).then(() => {
        //   // on close
        //   return;
        // });
        this.showAlert = true;
          this.message = {
            title: "提示",
            content: "请填写会议纪要",
            isCancel: false,
            doneType:0
          };
        return;
      }
      // 填写会议纪要后 完成会议
      addMeeting(this.itemMsg).then(res => {
        if (res.status === 200) {
          this.showAlert = true;
          this.message = {
            title: "提示",
            content: "更新会议成功",
            isCancel: false,
            doneType:0
          };
          this.disabled = false;
          this.isActive = true;
        }
      });
    },

    // 确认
    confirmAlert() {
      this.showAlert = false;
      if(this.message.doneType==1)
      {
        //确定按钮&&可以返回
        this.$router.back(-1);
      }
    },
    //确认对话框的取消按钮
    confirmAlert_cancel()
    {
      this.showAlert = false;
    },
    fillRecord() {
      if (this.itemMsg.record != "") {
        this.disabled = false;
        this.isActive = true;
      } else {
        this.disabled = false;
        this.isActive = false;
      }
    },
    overMeeting(){


      finishMeeting(this.$route.query.id).then(res => {
            if (res.status == 200) {
              this.showAlert = true;
          this.message = {
            title: "提示",
            content: "完成会议成功",
            isCancel: false,
            doneType:1
          };
            }
          });


    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.add-meeting {
  width: 90%;
  margin: 1.8rem auto 0;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
  border-radius: 7px;
  // min-height: 45.9rem;
  height: auto;
  /*padding-bottom: 15rem;*/ //update at 2020年2月19日16:26:08
  /*overflow-y: scroll;*/
  overflow-y: visible;
  background: #fff;
  box-sizing: border-box;
  // margin-bottom: 280px;//扩大表单与底部的空隙，保证会议内容全部可见
  // padding-bottom: 15rem;
  .metting-content {
    height: 3rem;
    width: 100%;
    text-align: left;
    line-height: 3rem;
    color: #323233;
    font-size: 1.5rem;
    padding: 0 1rem;
    box-sizing: border-box;
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
    font-size: 15px;
    color: #323233;
    padding: 0 0.3rem;
    word-break:break-all;
    word-wrap:break-word;
  }
  .content {
    width: 75%;
    text-align: right;
    color: #323233;
    font-size: 15px;
    word-break:break-all;
    word-wrap:break-word;
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
      font-size: 15px;
      display: inline-block;
      margin-bottom: 5px;
    }
  }
}
/deep/ .van-cell {
  height: 4.2rem;
  // font-size: 15px;
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
    font-size: 15px;
    color: #000;
  }
}
.add-meeting .meeting-item {
  height: auto;
}
.metting-detail {
  height:300px;
  overflow-y: scroll;
  padding-bottom: 15rem;
  box-sizing: border-box;
  /*background-color: #0000cc;*/

  // width: 90%;
  // margin: 1.8rem auto 0;
  // background: #fff;
}
/deep/ .van-collapse-item__content {
  padding: 16px 0;
}
.title {
  font-family: PingFangSC-Regular;
  font-size: 15px;
  color: #000;
  padding: 0 0.3rem;
}
/deep/ .van-collapse-item__title {
  padding: 10px 0;
}
.add-btn {
  height: 8.2rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 10;
  .vant-add-btn {
    padding: 0 7rem;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: rgba(34, 43, 69, 0.2);
    text-align: center;
    line-height: 16px;
    background: rgba(143, 155, 179, 0.4);
    border-radius: 22px;
  }
  .active {
    background-image: linear-gradient(90deg, #ff7901 3%, #fe5845 100%);
    color: #fff;
    border-radius: 22px;
  }
}
/deep/ .van-hairline--top-bottom {
  margin-left: 1rem;
}
/deep/ .van-collapse-item__wrapper {
  margin-left: -1rem;
}
.record-box {
  background: #ffffff;
  -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  /* margin-top: 1rem; */
  padding: 1rem;
  /* margin-bottom: 10rem; */
  width: 85%;
  margin: 1rem auto 0;
  .meeting-content {
    height: 3rem;
    width: 100%;
    text-align: left;
    line-height: 3rem;
    color: #000;
    font-size: 17px;
    padding: 0 1rem;
    box-sizing: border-box;
  }
}
.meeting-input {
  border: 1px solid #e9eaec;
  border-radius: 6px;
  width: 90%;
  min-height: 18rem;
  margin: 0 auto;
  align-items: flex-start;
  height: auto;
}
/deep/ .van-cell__right-icon {
  margin-right: 1rem;
}
.CSSRightNavTitleBt {
  font-family: PingFangSC-Medium;
  font-size: 1.8rem;
  color: #8F9BB3;
  text-align: right;
  line-height: 4.4rem;
  position: fixed;
  top: 0;
  padding: 1rem;
  height: 4.4rem;
  right: 1rem;
  z-index: 99;
}
</style>
