import request from '@/router/axios';

// 老板注册
export const registerBoss = (data) => {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data
  })
};

// 新增店铺
export const addShop = (data) => {
  return request({
    url: '/api/auth/save-store',
    method: 'post',
    data
  })
};

// 获取省级列表
export const provinceList = () => {
  return request({
    url: '/api/auth/provincials',
    method: 'get',
  })
};

// 获取市级列表
export const cityList = (provincialId) => {
  return request({
    url: '/api/auth/citys',
    method: 'get',
    params: {
      provincialId
    }
  })
};

// 店铺类型列表
export const typeList = () => {
  return request({
    url: '/api/auth/store-type/list',
    method: 'get',
  })
};

//但图片上传
export const uploadImgOnly = (data) => {
  return request({
    url: '/api/auth/putFile',
    method: 'post',
    data: data
  })
};