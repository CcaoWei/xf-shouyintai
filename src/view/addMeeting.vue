<template>
  <div id="IDRootContainer" style="overflow-y: scroll;" :style="{height:cardAreaH}">

    <div class="add-meeting" style="background-color: white">
      <!-- 主题 -->
      <van-field
        class="meeting-input-keypoint"
        v-model="meetingMsg.theme"
        label="主题"
        placeholder="需明确项目名称及会议类型"
        input-align="right"
        rows="1" autosize
      />
      <!-- 简介 -->
      <van-field v-model="meetingMsg.synopsis" label="简介" placeholder="需填写会议内容及安排" input-align="right" />
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
      <van-field v-model="meetingMsg.place" label="地点" placeholder="会议室或网络会议" input-align="right" />

      <!-- 组织人 -->
      <div class="add-members">
        <div class="add-members-title">组织人</div>
        <div class="block">
          <el-cascader
            id="IDZzr"
            :options="organizationList"
            :value="currentOrg"
            @change="setOrganization"
            :show-all-levels="false"
            clearable></el-cascader>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>

      <!-- 会议主持 -->
      <div class="add-members">
        <div class="add-members-title">主持人</div>
        <div class="block">
          <el-cascader
            :options="hostList"
            :value="currentHost"
            @change="setHost"
            :show-all-levels="false"
            clearable
          ></el-cascader>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
       <!--参会人员-->
      <div class="add-members">
        <div class="add-members-title">参会人员</div>
        <div class="block">
          <el-cascader
            :options="members"
            @change="setMember"
            :props="props"
            :show-all-levels="false"
            clearable
          ></el-cascader>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>

       <!--列会人员-->
      <div class="add-members" style="border: none">
        <div class="add-members-title">告知人员</div>
        <div class="block">
          <el-cascader
            :options="copyRen"
            @change="setCopy"
            :props="props"
            :show-all-levels="false"
            clearable
          ></el-cascader>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>


      <!-- 会议纪要 -->
      <!-- <div class="save-btn" style="position:fixed;top:0,right:0" @click="addSave">会议纪要</div> -->
      <!-- <van-field
        class="meeting-input"
        v-model="meetingMsg.record"
        autosize
        type="textarea"
        placeholder="填写会议纪要"
        show-word-limit
      /> -->

    </div>

    <div class="CSSRightNavTitleBt" @click="addSave">保存</div>
    <!-- <div class="add-btn" >
      <van-button class="vant-add-btn" round type="warning">保存</van-button>
    </div>-->


    <div style="width: 100%;height: 250px;background-color: transparent;">
<!--此处代码不要注销，为了增加padding，避免看不到内容-->
    </div>

    <messageAlert :message="message" @cancle="cancleAlert" @confirm="confirmAlert" v-if="showAlert"></messageAlert>


  </div>
</template>

<script>
import { getPerson, addMeeting, getUser } from "@/api/meeting";
import { mapGetters } from "vuex";
import messageAlert from "../components/messageAlert";
import {isAndroidBrowser} from "../util/plateformCheck"
import {meetingTypeAry,readMeetingTypeIndexByName} from  "../config/meetingTypeConfig"

// import axios from "@/router/axios";
export default {
  name: "addMeeting",
  computed: {
    ...mapGetters(["userInfo"])
  },
  components: {
    messageAlert
  },

  mounted(){
    console.log("meeting browser edit");
    if(isAndroidBrowser())
    {
      console.log("is android browser");
      //var obj = document.getElementById("IDZzr");
      //obj.style.backgroundColor = "red";
      //obj.style.right = "-30px";
    }
    else
    {
      console.log("is not android browser");
    }
  },


  data() {
    return {
      message: {
        title: "增加成功",
        content: "增加会议成功",
        isCancel: false,
        doneType: 1
      },
      showAlert: false,
      props: { multiple: true },
      hostList: [],
      members: [],
      copyRen: [],
      organizationList: [],
      currentHost: {},
      currentOrg: {},
      cardAreaH: "45.9rem",
      //columns: ["启动会", "例会", "评审会", "进度会", "验收会","交流会"],
      columns:meetingTypeAry,
      durationList: ["30分钟", "45分钟", "60分钟", "90分钟", "120分钟"],
      meetingMsg: {
        theme: "",
        synopsis: "",
        typeId: "",
        time: "",
        place: "",
        moderator: {},
        organizer: {},
        attendees: [],
        meetingDuration: "30分钟",
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
      sendBefore: true //增加前判断 放置多次点击
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
      }
    });
    getUser().then(res => {
      if (res.status == 200) {
        let currentUser = JSON.parse(JSON.stringify(res.data.data));

        this.currentOrg = [currentUser.deptName, currentUser.userId];
        this.currentHost = [currentUser.deptName, currentUser.userId];
        console.log(this.currentOrg)
      }
    });
  },


  methods: {
    // 取消
    cancleAlert() {
      this.showAlert = false;
    },
    // 确认
    confirmAlert() {
      if (this.message.doneType == 1) {
        this.showAlert = false;
      } else if (this.message.doneType == 2) {
        this.sendBefore = true;
        this.showAlert = false;
        this.meetingMsg = {
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
        };
        this.$router.go(-1);
      }
    },
    // 设置类型
    setType(value) {

      console.log("value = "+value);
      this.meetingMsg.typeId = readMeetingTypeIndexByName(value);
      console.log("value = "+this.meetingMsg.typeId+" &index = "+this.meetingMsg.typeId);

      // switch (value)
      // {
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
      console.log(dataInfo)
      return dataInfo;
    },
    setOrganization(value) {
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
      console.log(this.meetingMsg.attendees)
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
      console.log(this.meetingMsg.cc)
    },
    isCanSave(){
      if(this.meetingMsg.theme == "" ||
        this.meetingMsg.synopsis == "" ||
        this.meetingMsg.typeId == undefined ||
        this.meetingMsg.time == "" ||
        this.meetingMsg.place == "" ||
        this.meetingMsg.moderator == {} ||
        this.meetingMsg.attendees == [] ||
        this.meetingMsg.attendees.length == 0 ||
        this.meetingMsg.organizer == [] ||
        this.meetingMsg.meetingDuration == ""){
        return true;
      }
      return false
    },
    addSave() {
      this.meetingMsg.avatar = this.userInfo.avatar;
      this.meetingMsg.moderator = this.getData(
        this.members,
        this.currentHost[1]
      );
      this.meetingMsg.organizer = this.getData(
        this.organizationList,
        this.currentOrg[1]
      );
      console.log(this.meetingMsg);
      if (this.isCanSave()) {
        this.showAlert = true;
        this.message = {
          title: "提示",
          content: "数据不完整，请检查",
          isCancel: false,
          doneType: 1
        };
        return;
      }else{
        if (this.sendBefore) {
        this.sendBefore = false;

        console.log(" ");
        console.log("添加会议页面->保存");
        console.log(JSON.stringify(this.meetingMsg));

        addMeeting(this.meetingMsg).then(res => {
          console.log(res);
          if (res.status == 200) {
            //  this.$router.go(-1);
            this.showAlert = true;
            this.message = {
              title: "提示",
              content: "增加会议成功",
              isCancel: false,
              doneType: 2
            };
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
  overflow-y: visible;
}

/*.el-icon-edit_page*/
/*{*/
  /*position:relative;*/
  /*float: right;*/
  /*right: 0px;*/
/*}*/

.add-meeting {
  width: 90%;
  margin: 1.8rem auto 0;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.06);
  border-radius: 7px;
  height: auto;
  /*padding-bottom: 15rem;*/ //update at 2020年2月19日16:26:08
  /*overflow-y: scroll;*/
  overflow-y: visible;
  background: #fff;
  box-sizing: border-box;
  padding: 0px;
  // margin-bottom: 280px;//扩大表单与底部的空隙，保证会议内容全部可见
  // padding-bottom: 15rem;
  /*.metting-content {*/
    /*height: 3rem;*/
    /*width: 100%;*/
    /*text-align: left;*/
    /*line-height: 3rem;*/
    /*color: #323233;*/
    /*font-size: 1.4rem;*/
    /*padding: 0 1rem;*/
    /*box-sizing: border-box;*/
  /*}*/
}
.meeting-input {
  padding-top: 0px;
  border-radius: 5px;
  min-height: 130px;
  padding-bottom: 1rem;
}
/deep/ .van-cell {
  background-color: transparent;
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
  width: 100%;
  /*padding: 0 0 0 2rem;*/
  .van-field__label {
    text-align: left;
    font-size: 15px;
    color: #000;
  }
}

.add-members {
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // margin-left: 2rem;
  min-height: 50px;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
  .add-members-title {
    font-family: PingFangSC-Regular;
    font-size: 1.4rem;
    color: #222b45;
    line-height: 1.4rem;
    display: flex;
  }
}


// .add-members::after {
//   position: absolute;
//   box-sizing: border-box;
//   pointer-events: none;
//   right: 0;
//   bottom: 0;
//   left: 16px;
//   -webkit-transform: scaleY(0.5);
//   transform: scaleY(0.5);
// }
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
  text-align: right;
  //background-color: brown;

  .el-cascader {
   // background-color: yellowgreen;
    margin-right: 0px;
    right: 0px;
    width: 90%;
    text-align: right;
    padding-left: 0px;

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
.CSSRightNavTitleBt {
      font-family: PingFangSC-Medium;
    font-size: 1.8rem;
    color: #8f9bb3;
    text-align: right;
    line-height: 6.4rem;
    position: fixed;
    top: 0;
    // background: #fff;
    height: 6.4rem;
    right: 2rem;
    z-index:9999;
    width: 7rem;
}
</style>
