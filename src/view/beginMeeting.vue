<template>
  <div class="metting-detail" :style="{height:cardAreaH}">
    <div class="add-meeting">
      <!-- 主题 -->
      <!--<van-field v-model="itemMsg.theme" label="主题" readonly input-align="right" />-->

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
          <span v-for="(item,index) in itemMsg.attendees" :key="index">
            {{item.name}}
            <a v-if="index != itemMsg.attendees.length-1">、</a>
          </span>
        </div>
      </div>
      <!-- 列会人员 -->
      <!-- <van-field readonly clickable label="列会人员" :value="itemMsg.cc" input-align="right" /> -->
      <div class="synopsis" style="border-bottom: none">
        <div class="title">告知人员</div>
        <div class="name-item">
          <span v-for="(item,index) in itemMsg.cc" :key="index">
            {{item.name}}
            <a v-if="index != itemMsg.cc.length-1">、</a>
          </span>
        </div>
      </div>
    </div>

    <!-- 记录人 -->
    <div class="add-recorder">
      <div class="add-recorder-title">记录人</div>
      <div class="block">
        <el-cascader
          :value="showRecorder"
          :options="personnelPartake"
          :props="optionProps"
          @change="setPersonnelPartake"
          :show-all-levels="false"
          clearable
        ></el-cascader>
      </div>
    </div>

    <div class="add-recorder-ts" v-if="isAndroidPhone">
      <van-row>
        <van-col style="padding-top: 2px;"><van-icon color="#1890FF" size="17"  name="info-o" /></van-col>
        <van-col style="padding-left: 5px; color: #222B45;font-size: 14px;">开始会议后,记录人有权限编写会议纪要。</van-col>
      </van-row>
    </div>

    <div class="add-recorder-ts" v-if="!isAndroidPhone">
      <van-row>
        <van-col style="padding-top: 3px;"><van-icon color="#1890FF" size="17"  name="info-o" /></van-col>
        <van-col style="padding-top: 2px;padding-left: 5px; color: #222B45;font-size: 14px;">开始会议后,记录人有权限编写会议纪要。</van-col>
      </van-row>
    </div>


    <div class="signcode">
      <img src="../assets/images/er_code.png" alt srcset />
      <div>会议签到二维码</div>
    </div>

    <div class="add-btn">
      <van-button class="vant-add-btn active" @click="beginMeeting" round>开始会议</van-button>
    </div>

    <messageAlert :message="message" @cancle="cancleAlert" @confirm="confirmAlert" v-if="showAlert"></messageAlert>

    <div style="height: 200px;width: 100%"></div>

    <div class="CSSRightNavTitleBt" @click="navToEditMeeting">编辑</div>
  </div>
</template>

<script>
import messageAlert from "../components/messageAlert";
import {isAndroidBrowser} from "../util/plateformCheck"

import {readMeetingNameByIndex} from "../config/meetingTypeConfig"
import {
  meetingDetail,
  startMeeting,
  personnelOfPartake,
  addMeeting
} from "@/api/meeting"; //addMeeting
export default {
  name: "beginMeeting",
  components: { messageAlert },
  data() {
    return {
      isAndroidPhone:false,
      message: {
        title: "开始会议",
        content: "确认开始会议",
        isCancel: false
      },
      showAlert: false,
      recordList: [],
      currentRec: false,
      showRecorder: "1227854113664929794", //显示记录人
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
        record: "",
        recorder: {}
      },
      personnelPartake: [],
      optionProps: {
        value: "id",
        label: "name"
      },
      cardAreaH: ""
    };
  },
  beforeMount() {
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    // let top = h * 0.13;
    // this.cardAreaH = h - 120 - top + "px";

    //重新计算内高度 code update by cgz at 2020年2月11日21:26:50
    this.cardAreaH = h - 44 + "px";
  },
  created() {
    personnelOfPartake(this.$route.query.id).then(res => {
      if (res.status == 200) {
        console.log(res);

        this.personnelPartake = JSON.parse(JSON.stringify(res.data.data));
      }
    });
    this.getDetail();
  },
  mounted() {

    this.isAndroidPhone = isAndroidBrowser();
  },
  methods: {
    navToEditMeeting() {
      this.$router.push({
        path: "/entrance/editMeeting",
        name: "编辑会议",
        query: {
          id: this.$route.query.id
        }
      });
    },
    // 取消
    cancleAlert() {
      this.showAlert = false;
    },
    // 确认
    confirmAlert() {
      this.showAlert = false;
    },

    // 获取详情
    getDetail() {
      meetingDetail(this.$route.query.id).then(res => {
        if (res.status == 200) {
          console.log(res);
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

          // if(this.itemMsg.recorder.id){
          //   this.showRecorder = this.recorder.id;
          //   console.log(this.showRecorder)
          // }
          if(this.itemMsg.recorder && this.itemMsg.recorder.id){
              this.showRecorder = this.itemMsg.recorder.id;
          }

        }
      });
    },
    setPersonnelPartake(value) {
      // this.personnelPartake.
      console.log(value);

      this.personnelPartake.forEach(element => {
        if (element.id == value[0]) {
          console.log(element);
          this.itemMsg.recorder = element;
        }
      });

      // 选择人之后 更新会议
      addMeeting(this.itemMsg).then(res => {
        console.log("选择记录人成功");
        if (res.status == 200) {
          // this.showAlert = true;
          // this.message = {
          //   title: "提示",
          //   content: "记录人选择成功",
          //   isCancel: false
          // };
          this.currentRec = true;
          console.log(this.currentRec);

          this.getDetail();
        }
      });
    },
    beginMeeting() {
      //if (this.currentRec == false) {
      if (!this.itemMsg.recorder.hasOwnProperty("name")) {
        this.showAlert = true;
        this.message = {
          title: "提示",
          content: "请选择记录人",
          isCancel: false
        };
      } else {
        //开始会议
        startMeeting(this.$route.query.id).then(res => {
          if (res.status == 200) {
            this.$router.go(-1);
          }
        });
      }
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
  /*min-height: 45.9rem;*/
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
    font-size: 1.4rem;
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
  min-height: 50px;
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
    word-break: break-all;
    word-wrap: break-word;
  }
  .content {
    width: 75%;
    text-align: right;
    color: #323233;
    font-size: 15px;
    word-break: break-all;
    word-wrap: break-word;
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
  min-height: 50px;
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
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 10rem;
  box-sizing: border-box;

  // width: 90%;
  // margin: 1.8rem auto 0;
  // background: #fff;
}

.signcode {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // margin-left: 1.3rem;
  padding-top: 3rem;
  margin-bottom: 1.2rem;
  div {
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #000;
    margin-top: 1.2rem;
  }
  img {
    height: 11rem;
    width: 11rem;
    display: block;
  }
}
.add-members {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // margin-left: 2rem;
  min-height: 4.2rem;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #ebedf0;
  .add-members-title {
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #222b45;
    line-height: 1.4rem;
    display: flex;
  }
}

.add-recorderContainer
{
  border-radius: 6px;
}
.jlrts{
  width: 90%;
  background-color: white;
  margin-left: 5%;
  height: 20px;
  line-height: 20px;
  text-align: left;
}


.add-recorder-ts {
  border-radius: 3px;
  background: #E6F7FF;
  height: 35px;
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  margin: 1rem auto 0;
  padding: 0 0.5rem 0 2rem;
  justify-content: space-between;
  border: 1px solid #91D5FF;

  van-icon{
    margin-top: 5px;
  }
}



.add-recorder {
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
  height: 5.8rem;
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  margin: 1rem auto 0;
  padding: 0 0.5rem 0 2rem;
  justify-content: space-between;
  .add-recorder-title {
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #222b45;
    line-height: 1.4rem;
  }
}
/deep/ .el-input__inner {
  border: 0;
  text-align: right;
  padding-right: 1rem;
  color: #323233;
}
/deep/ .el-input__inner::placeholder {
  color: #969799;
}
.add-btn {
  height: 8.2rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
.CSSRightNavTitleBt {
  font-family: PingFangSC-Medium;
  font-size: 1.8rem;
  color: #8f9bb3;
  text-align: right;
  line-height: 4.4rem;
  position: fixed;
  top: 0;
  padding: 1rem;
  height: 4.4rem;
  right: 1rem;
  z-index: 99;
}
/deep/ .el-input__suffix{
  display: none;
}
</style>
