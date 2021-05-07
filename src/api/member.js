import request from '@/router/axios';

// 会员录入
export const addMember = (data) => {
  return request({
    url: '/api/member/enter-member',
    method: 'post',
    data
  })
};
