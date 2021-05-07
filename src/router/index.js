import Vue from 'vue'
import Router from 'vue-router'
// import login from "@/view/login"
import entrance from '@/components/entrance'//暂时入口
import index from "@/view/index";
import addMeeting from "@/view/addMeeting";
import meetingDetail from "@/view/meetingDetail";
import endMeeting from "@/view/endMeeting";
import inHandMeeting from "@/view/inHandMeeting";
import toRecorded from "@/view/toRecorded";
import beginMeeting from "@/view/beginMeeting";
import editMeeting from "@/view/editMeeting";


// 登录入口
// import welcome from "@/login/welcome"
import login from "@/login/login"
import getCode from "@/login/getCode"
import setPwd from "@/login/setPwd"
import sign from "@/login/sign"
import agreement from "@/login/agreement"

Vue.use(Router);
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: login,
      props: true,
      children: [
        {
          path: 'sign',
          name: '注册',
          component: sign,
          props: true,
          meta: {
            keepAlive: true
          }
        },{
          path: 'setPwd',
          name: '忘记密码',
          component: setPwd,
          props: true,
          meta: {
            keepAlive: true
          }
        },{
          path: 'getCode',
          name: '获取验证码',
          component: getCode,
          props: true,
          meta: {
            keepAlive: true
          }
        },{
          path: 'agreement',
          name: '协议',
          component: agreement,
          props: true,
          meta: {
            keepAlive: true
          }
        },
        
      ]
    },
    {
      path: '/entrance',
      name: '会议管理',
      component: entrance,
      icon: "notes-o",
      children: [
        {
          path: 'index',
          name: '未开始',
          component: index,
          props: true,
          meta: {
            type: 1,
            keepAlive: true
          }
        },
        {
          path: 'inHandMeeting',
          name: '进行中',
          component: inHandMeeting,
          props: true,
          meta: {
            type: 1,
            keepAlive: true
          }
        },
        {
          path: 'endMeeting',
          name: '已结束',
          component: endMeeting,
          props: true,
          meta: {
            type: 1,
            keepAlive: true
          }
        },
        {
          path: 'addMeeting',
          name: '新建会议',
          component: addMeeting,
          props: true,
          meta: {
            type: 2,
          }
        },
        {
          path: 'meetingDetail',
          name: '会议详情',
          component: meetingDetail,
          prop: true,
          meta: {
            type: 2,
          }
        },
        {
          path: 'toRecorded',
          name: '纪要编写',
          component: toRecorded,
          prop: true,
          meta: {
            type: 2,
          }
        },
        {
          path: 'beginMeeting',
          name: '会议启动详情',
          component: beginMeeting,
          prop: true,
          meta: {
            type: 2,
          }
        },
        {
          path: 'editMeeting',
          name: '编辑会议',
          component: editMeeting,
          prop: true,
          meta: {
            type: 2,
          }
        }

      ]
    },

  ],
  // scrollBehavior(to,from,savePosition){
  //   console.log(to)
  //   console.log(from)
  //   console.log(savePosition)
  //   if(savePosition){
  //     return savePosition;
  //   }else{
  //     return{
  //       x:0,
  //       y:0
  //     }
  //   }

  // }
})
