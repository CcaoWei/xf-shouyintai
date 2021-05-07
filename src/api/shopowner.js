import request from '@/router/axios';

//店长，老板修改密码
export const updateShopownerPwd = (data) => {
  return request({
    url: '/api/manger/user/update-password',
    method: 'post',
    data
  })
};
//修改关联门店
export const updatePeopleShop = (data) => {
  return request({
    url: '/api/manger/user/cut-shop',
    method: 'post',
    data
  })
};
//新建店长
export const addShopowner = (data) => {
  return request({
    url: '/api/manger/user/save-shopowner',
    method: 'post',
    data
  })
};
//获取所有店铺
export const shopList = () => {
  return request({
    url: '/api/manger/user/list/shop',
    method: 'get',
  })
};


