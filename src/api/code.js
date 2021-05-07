import request from '@/router/axios';

//获取验证码
export const getCode = (data) => {
  return request({
    url: "/login/api/blade-user/auth/sendSms",
    method: 'post',
    data,
  })
};

//验证码登录
export const loginByCode = (data) => {
  return request({
    url: "/login/api/blade-auth/authentication/mobile",
    method: 'post',
    params:data,
    headers: {
      "Authorization": "Basic c2FiZXI6c2FiZXJfc2VjcmV0",
      "Tenant-Id": 936701
    }
  })
};

//验证码验证
export const idenCode = (data) => {
  return request({
    url: "/login/api/blade-user/auth/verifySms",
    method: 'post',
    data,

  })
};

//重置密码
export const resetPwd = (data) => {
  return request({
    url: "/login/api/blade-user/auth/smsUpdatePassword",
    method: 'post',
    data,
  })
}
