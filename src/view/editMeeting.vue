<template>
  <div id="IDRootContainer" style="overflow-y: scroll;" :style="{height:cardAreaH}">
    <div class="add-meeting" >
      <!-- 主题 -->
      <van-field
        class="meeting-input-keypoint"
        v-model="meetingMsg.theme"
        label="主题"
        placeholder="请输入"
        input-align="right"
      />
      <!-- 简介 -->
      <van-field v-model="meetingMsg.synopsis" label="简介" placeholder="请输入" input-align="right" />
      <!-- 类型 -->
      <van-field
        clickable
        readonly
        label="类型"
        :value="typeName"
        placeholder="选择类型"
        @click="showType = true"
        input-align="right"
      />
      <van-popup v-model="showType" position="bottom">
        <van-picker show-toolbar :columns="columns" @cancel="showType = false" @confirm="setType" />
      </van-popup>
      <!-- 时间 -->
      <van-field
        clickable
        label="时间"
        readonly
        :value="meetingMsg.time"
        placeholder="选择开始时间"
        @click="showTime = true"
        input-align="right"
      />
      <van-popup v-model="showTime" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showTime = false"
          @confirm="setTime"
        />
      </van-popup>
      <!-- 时长 -->
      <van-field
        clickable
        readonly
        label="预计时长"
        :value="duration"
        placeholder="选择时长"
        @click="showDuration = true"
        input-align="right"
      />
      <van-popup v-model="showDuration" position="bottom">
        <van-picker
          show-toolbar
          :columns="durationList"
          @cancel="showDuration =false"
          @confirm="setDuration"
        />
      </van-popup>
      <!-- 地点 -->
      <van-field v-model="meetingMsg.place" label="地点" placeholder="请输入" input-align="right" />
      <!-- 组织人 -->
      <div class="add-members">
        <div class="add-members-title">组织人</div>
        <div class="block">
          <el-cascader
            disabled
            :options="organizationList"
            :value="currentOrg"
            @change="setOrganization"
            :show-all-levels="false"
            clearable
          ></el-cascader>
        </div>
      </div>
      <!-- 会议主持 -->
      <div class="add-members">
        <div class="add-members-title">主持人</div>
        <div class="block">
          <el-cascader
            disabled
            :options="hostList"
            v-model="currentHost"
            @change="setHost"
            :show-all-levels="false"
            clearable
          ></el-cascader>
        </div>
      </div>
      <!-- 参会人员 -->
      <div class="add-members">
        <div class="add-members-title">参会人员</div>
        <div class="block">
          <el-cascader
            :options="members"
            @change="setMember"
            :props="props"
            v-model="currentMembers"
            :show-all-levels="false"
            clearable
          ></el-cascader>
        </div>
      </div>
      <!-- 列会人员 -->
      <div class="add-members">
        <div class="add-members-title">告知人员</div>
        <div class="block">
          <el-cascader
            :options="copyRen"
            @change="setCopy"
            :props="props"
            v-model="currentCc"
            :show-all-levels="false"
            clearable
          ></el-cascader>
        </div>
      </div>
      <!-- 会议纪要 -->
      <!-- <div class="metting-content">会议纪要</div>
      <van-field
        class="meeting-input"
        v-model="meetingMsg.record"
        autosize
        type="textarea"
        placeholder="填写会议纪要"
        show-word-limit
      />-->
    </div>

    <div class="add-btn" @click="meetingDelete">
      <div>删除会议</div>
    </div>




    <div style="width: 100%;height: 250px;"></div><!-- 此行代码不删除，为了给底部留些空间-->
    <messageAlert :message="message" @cancle="cancleAlert" @confirm="confirmAlert" v-if="showAlert"></messageAlert>

    <div class="CSSRightNavTitleBt" @click="btActionMeetingDataSave">保存</div>


  </div>
</template>

<script>
import {
  getPerson,
  addMeeting,
  meetingDetail,
  deleteMeeting
} from "@/api/meeting";
import { Dialog } from "vant";
import { mapGetters } from "vuex";
import messageAlert from "../components/messageAlert";
import {meetingTypeAry,readMeetingNameByIndex,readMeetingTypeIndexByName} from "../config/meetingTypeConfig"

// import axios from "@/router/axios";
export default {
  name: "editMeeting",
  computed: {
    ...mapGetters(["userInfo"])
  },
  components:{
    messageAlert
  },
  data() {
    return {
       message: {
        title: "删除会议",
        content: "确认删除该会议",
        isCancel: true,
         doneType:0 //0=cancel类型 1:返回上一页类型
      },
      showAlert: false,
      id: this.$route.query.id,
      props: { multiple: true },
      hostList: [],
      members: [],
      copyRen: [],
      organizationList: [],
      currentHost: {},
      currentOrg: {},
      currentMembers: [],
      currentCc: [],
      cardAreaH: "",
      //columns: ["经验交流会", "电话会议", "网络会议", "电视会议", "其他会议"],
      columns:meetingTypeAry,
      durationList: ["30分钟", "45分钟", "60分钟", "90分钟", "120分钟"],
      meetingMsg: {
        theme: "",
        synopsis: "",
        typeId: "1",
        time: "",
        place: "",
        moderator: {},
        organizer: {},
        attendees: [],
        meetingDuration: "",
        cc: [],
        avatar: ""
      },
      typeName: "",
      duration: "",
      showType: false,
      showDuration: false,
      showTime: false,
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      currentUser: "", //当前登录人信息
      sendBefore: true, //增加前判断 放置多次点击
      oldData: {}
    };
  },
  beforeMount() {
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    // let top = h * 0.13;
    // this.cardAreaH = h - 120 - top + "px";

    //重新计算内高度 code update by cgz at 2020年2月11日21:26:50
    this.cardAreaH = h - 40 + "px";
  },
  destroyed(){
    console.log("editMeeting page destroyed");
    window.removeEventListener("NavBtMessageEditMeeting", () => {}, true);
  },
  mounted()
  {
    this.$eventHub.$on("NavBtMessageEditMeeting", eData => {
      Dialog.confirm({
        title: "温馨提示",
        message: "编辑内容未保存，确认要退出么？"
      }).then(() => {
          // on confirm
          this.$router.back(-1);
        })
        .catch(() =>
        {
          // on cancel
        }
        );

      if (eData == "back")
      {
        // if (JSON.stringify(this.meetingMsg) == JSON.stringify(this.oldData)) {
        //   this.$router.back(-1);
        // } else {
        //   Dialog.confirm({
        //     title: "取消编辑",
        //     message: "编辑内容未保存，确认取消"
        //   })
        //     .then(() => {
        //       // on confirm
        //       this.$router.back(-1);
        //     })
        //     .catch(() => {
        //       // on cancel
        //     });
        // }
      }
    });

    getPerson().then(res => {
      if (res.status == 200) {
        let newObj = JSON.parse(JSON.stringify(res.data.data));
        newObj.forEach(element => {
          // item.value = item.id;
          element.children.forEach(item => {
            item.label = item.name;
            item.value = item.id;
          });
        });
        this.hostList = newObj;
        this.organizationList = newObj;
        this.members = newObj;
        this.copyRen = newObj;
        meetingDetail(this.id).then(res => {
          console.log(res);
          let newDetailObj = JSON.parse(JSON.stringify(res.data.data));
          this.oldData = JSON.parse(JSON.stringify(res.data.data));

          if (res.status == 200)
          {
            this.meetingMsg = newDetailObj;
            this.typeName = readMeetingNameByIndex(parseInt(this.meetingMsg.typeId));

            // switch (this.meetingMsg.typeId) {
            //   case 1:
            //     this.typeName = "经验交流会";
            //     break;
            //   case 2:
            //     this.typeName = "电话会议 ";
            //     break;
            //   case 3:
            //     this.typeName = "网络会议";
            //     break;
            //   case 4:
            //     this.typeName = "电视会议";
            //     break;
            //   case 5:
            //     this.typeName = "其他会议";
            //     break;
            //   default:
            //     break;
            // }
            this.duration = this.meetingMsg.meetingDuration;
            this.currentOrg = this.setCurrent(this.meetingMsg.organizer.id);
            this.currentHost = this.setCurrent(this.meetingMsg.moderator.id);
            let newCurrentMembers = [];
            let newcCurrentCc = [];
            this.meetingMsg.attendees.forEach(el => {
              newCurrentMembers.push(this.setCurrent(el.id));
            });
            this.meetingMsg.cc.forEach(el => {
              newcCurrentCc.push(this.setCurrent(el.id));
            });
            this.currentMembers = newCurrentMembers;
            this.currentCc = newcCurrentCc;
          }
        });
      }
    });
  },
  methods: {

    meetingDelete(){
      this.showAlert = true;
      this.message = {
        title: "提示",
        content: "确认删除该会议",
        isCancel: true,
        doneType:3
      };
    },


    // 取消
    cancleAlert() {
      this.showAlert = false;
    },
    // 确认
    confirmAlert() {
      this.showAlert = false;
      if(this.message.doneType==0)
      {
        this.cancleAlert();
        return;
      }
      if(this.message.doneType==3)
      {
        deleteMeeting(this.id).then(res => {
          if (res.status == 200) {
            this.$router.push({ path: "/entrance/index", name: "未开始" });
          }
        });
      }


    },

    // 删除该条会议
    // deletMeetingUi() {
    //   this.showAlert = true;



    // },
    //设置默认数据
    setCurrent(id) {
      let newCurrent = [];
      this.hostList.forEach(element => {
        element.children.forEach(item => {
          if (item.id == id) {
            newCurrent.push(element.value);
            newCurrent.push(item.id);
          }
        });
      });
      return newCurrent;
    },
    // 设置类型
    setType(value)
    {
      console.log("value = "+value);
      this.meetingMsg.typeId = readMeetingTypeIndexByName(value);
      console.log("value = "+this.meetingMsg.typeId+" &index = "+this.meetingMsg.typeId);

      // switch (value) {
      //   case "经验交流会":
      //     this.meetingMsg.typeId = 1;
      //     break;
      //   case "电话会议":
      //     this.meetingMsg.typeId = 2;
      //     break;
      //   case "网络会议":
      //     this.meetingMsg.typeId = 3;
      //     break;
      //   case "电视会议":
      //     this.meetingMsg.typeId = 4;
      //     break;
      //   case "其他会议":
      //     this.meetingMsg.typeId = 5;
      //     break;
      //   default:
      //     this.meetingMsg.typeId = 1;
      //     break;
      // }
      this.typeName = value;
      this.showType = false;
    },
    // 设置会议时长
    setDuration(value) {
      console.log(value);
      this.duration = value;
      this.showDuration = false;
      this.meetingMsg.meetingDuration = value;
    },
    // 设置时间
    setTime(value) {
      this.meetingMsg.time = value.format("yyyy-MM-dd hh:mm");
      this.showTime = false;
    },
    // 设置主持人
    setHost(value) {
      this.meetingMsg.moderator = this.getData(this.hostList, value[1]);
      this.currentHost = value;
    },
    // 获取数据
    getData(list, id) {
      let dataInfo = {};
      list.forEach(item => {
        item.children.forEach(child => {
          if (child.id == id) {
            dataInfo.id = child.id;
            dataInfo.name = child.name;
          }
        });
      });
      return dataInfo;
    },
    setOrganization(value) {
      console.log(value);
      this.meetingMsg.organizer = this.getData(this.organizationList, value[1]);
      this.currentOrg = value;
    },
    setMember(value) {
      this.meetingMsg.attendees = [];
      let newArr = [];
      value.forEach(element => {
        newArr.push(element[1]);
      });
      let dataArr = [...new Set(newArr)];
      dataArr.forEach(item => {
        this.meetingMsg.attendees.push(this.getData(this.members, item));
      });
    },
    setCopy(value) {
      this.meetingMsg.cc = [];
      let newArr = [];
      value.forEach(element => {
        newArr.push(element[1]);
      });
      let dataArr = [...new Set(newArr)];
      dataArr.forEach(item => {
        this.meetingMsg.cc.push(this.getData(this.copyRen, item));
      });
    },
    isCanSave() {
      if (
        this.meetingMsg.theme == "" ||
        this.meetingMsg.synopsis == "" ||
        this.meetingMsg.typeId == undefined ||
        this.meetingMsg.time == "" ||
        this.meetingMsg.place == "" ||
        this.meetingMsg.moderator == {} ||
        this.meetingMsg.attendees == [] ||
        this.meetingMsg.attendees.length == 0 ||

        //列席人员是选填的
        // this.meetingMsg.cc == [] ||
        // this.meetingMsg.cc.length == 0 ||

        this.meetingMsg.organizer == {} ||
        this.meetingMsg.meetingDuration == ""
      ) {
        return true;
      }
      return false;
    },
    btActionMeetingDataSave() {
      this.meetingMsg.avatar = this.userInfo.avatar;
      this.meetingMsg.moderator = this.getData(
        this.members,
        this.currentHost[1]
      );
      this.meetingMsg.organizer = this.getData(
        this.organizationList,
        this.currentOrg[1]
      );
      if (this.meetingMsg.recorder && !this.meetingMsg.recorder.name) {
        delete this.meetingMsg.recorder;
      }

      console.log(this.meetingMsg);

      if (this.isCanSave()) {
        // Dialog.alert({
        //   message: "数据不完整，请检查"
        // }).then(() => {
        //   // on close
        //   return;
        // });
        this.showAlert = true;
          this.message = {
            title: "提示",
            content: "数据不完整，请检查",
            isCancel: false,
            doneType:0
          };
        return;
      } else {
        if (this.sendBefore) {
          this.sendBefore = false;
          console.log(this.meetingMsg);
          addMeeting(this.meetingMsg).then(res => {
            if (res.status == 200) {



              Dialog.alert({
                message: "更新成功"
              }).then(() => {
                this.sendBefore = true;
                (this.meetingMsg = {
                  theme: "",
                  synopsis: "",
                  typeId: "",
                  time: "",
                  place: "",
                  moderator: {},
                  organization: {},
                  attendees: [],
                  meetingDuration: "",
                  cc: [],
                  avatar: ""
                }),
                  // on close
                  this.$router.go(-1);
              });
            }
          });
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.meeting-input-keypoint {
  border-radius: 5px;
}

.add-meeting {
  width: 90%;
  margin: 1.8rem auto 0;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
  border-radius: 7px;
  /*min-height: 45.9rem;*/
  height: auto;
  /*padding-bottom: 15rem;*/ //update at 2020年2月19日16:26:08
  overflow: scroll;
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
.meeting-input {
  padding-top: 0px;
  border-radius: 5px;
  min-height: 130px;
  padding-bottom: 1rem;
}
.add-btn {
  height: 8.2rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  border-top: 1px solid lightgray;
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  bottom: 0;
  div {
    font-family: PingFangSC-Regular;
    font-size: 1.8rem;
    color: #fe5845;
    text-align: center;
    line-height: 8.2rem;
  }
  .vant-add-btn {
    padding: 0 7rem;
  }
}
/deep/ .van-cell {
  min-height: 50px;
  // font-size:1.5rem;
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
    font-size:1.5rem;
    color: #000;
  }
}


.add-members {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // margin-left: 2rem;
  min-height: 50px;
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

/deep/ .el-input__inner {
  border: 0;
  text-align: right;
  padding-right: 0;
  color: #323233;
}
/deep/ .el-input__inner::placeholder {
  color: #969799;
}

/deep/ .el-input__suffix {
  display: none;
}
.block {
  width: 65%;
  background-color: transparent;
  text-align: right;
  .el-cascader {
    margin-right: 0px;
    right: 0px;
    width: 100%;
    text-align: right;

    /deep/ .el-cascader__tags {
      justify-content: flex-end;
      width: 100%;
      text-align: right;
    }
  }
}
/deep/ .el-cascader-node.in-active-path,
.el-cascader-node.is-active,
.el-cascader-node.is-selectable.in-checked-path {
  color: #ff8a01;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ff8a01;
  border-color: #ff8a01;
}
/deep/ .el-input.is-disabled .el-input__inner {
  background-color: #fff;
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
#IDRootContainer{
      padding-bottom: 15rem;
    box-sizing: border-box;
}
</style>
