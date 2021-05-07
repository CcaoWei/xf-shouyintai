import request from '@/router/axios';


// 登录
export const login = (data) => {
  return request({
    url: "/login/api/blade-auth/oauth/token",
    method: 'post',
    params: data,
    headers: {
      "Authorization": "Basic c2FiZXI6c2FiZXJfc2VjcmV0",
      "Tenant-Id":"679973 "
    }

  })
}
//获取验证码
export const getCode = (data) => {
  return request({
    url: "/login/api/blade-user/auth/sendSms",
    method: 'post',
    data,

  })
}
//验证码验证
export const idenCode = (data) => {
  return request({
    url: "/login/api/blade-user/auth/verifySms",
    method: 'post',
    data,

  })
}
//修改密码
export const changePassword = (data) => {
  return request({
    url: "/login/api/blade-user/auth/smsUpdatePassword",
    method: 'post',
    data,

  })
}
//注册
export const register = (data) => {
  return request({
    url: "/login/api/blade-user/auth/registByPhoneAndCode",
    method: 'post',
    data,

  })
}
//已结束 我参与的
export const getPartakeMeeting = (data) => {
  console.log(data)
  return request({
    url: '/api/meeting/partakeOfEnding',
    method: 'get',
    params: data
  })
};
// 已结束 与我有关
export const getAboutMeMeeting = (page) => {
  return request({
    url: '/api/meeting/joinInOfEnding',
    method: 'get',
    params: {
      current: page.current,
      size: page.size,
      id: page.id
    }
  })
};
//已结束 其他
export const getOtherMeeting = (page) => {
  return request({
    url: '/api/meeting/otherOfEnding',
    method: 'get',
    params: page,

  })
};

//未开始 我参与
export const partakeOfUnBeginning = (page) => {
  return request({
    url: '/api/meeting/partakeOfUnBeginning',
    method: 'get',
    params: page,

  })
};
//未开始 我组织
export const joinInOfUnBeginning = (page) => {
  return request({
    url: '/api/meeting/joinInOfUnBeginning',
    method: 'get',
    params: page,

  })
};
//未开始 其他
export const otherOfUnBeginning = (page) => {
  return request({
    url: '/api/meeting/otherOfUnBeginning',
    method: 'get',
    params: page,
  })
};


//进行中 待记录
export const ofMeeting = (page) => {
  return request({
    url: '/api/meeting/of',
    method: 'get',
    params: page,
  })
}
//进行中  我参与
export const partake = (page) => {
  return request({
    url: '/api/meeting/partake',
    method: 'get',
    params: page,
  })
}
//进行中 其他
export const other = (page) => {
  return request({
    url: '/api/meeting/other',
    method: 'get',
    params: page,
  })
}
//会议详情
export const meetingDetail = (id) => {
  return request({
    url: '/api/meeting/detail',
    method: 'get',
    params: {id: id}
  })
}
//增加会议
export const addMeeting = (data) => {
    console.log(data)
    return request({
      url: '/api/meeting/newBuilt',
      method: 'post',
      data:data,
      
    })
  }
//人员
export const getPerson = () => {
    return request({
      url: '/api/meeting/personnel',
      method: 'get',
    })
  }

//获取当时登录人信息
export const getUser = ()=>{
  return request({
    url: '/api/meeting/user',
    method: 'get',
  })
}

//开始会议
export const startMeeting = (id)=>{
  return request({
    url: '/api/meeting/startMeeting',
    method: 'post',
    params:{
      id:id
    }
  })
}
// 结束会议
export const finishMeeting = (id)=>{
  return request({
    url: '/api/meeting/finishMeeting',
    method: 'post',
    params:{
      id:id
    }
  })
}
//删除一条会议
export const deleteMeeting = (id)=>{
  return request({
    url: '/api/meeting/deleteMeeting',
    method: 'post',
    params:{
      id:id
    }
  })
}

// 获取参会人员
export const personnelOfPartake = (id)=>{
  return request({
    url: '/api/meeting/personnelOfPartake',
    method: 'get',
    params:{
      meetingId:id
    }
  })
}


