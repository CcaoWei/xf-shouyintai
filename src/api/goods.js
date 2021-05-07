import request from '@/router/axios';

//品牌列表
export const brandList = () => {
  return request({
    url: '/api/manager/goods/list/brand',
    method: 'get',
  })
};

// 新增/编辑品牌
export const updateBrand = (data) => {
  return request({
    url: '/api/manager/goods/save/brand',
    method: 'post',
    data
  })
};

// 删除品牌
export const deleteBrand = (data) => {
  return request({
    url: '/api/manager/goods/remove/brand',
    method: 'post',
    data
  })
};

//计量单位列表
export const unitList = () => {
  return request({
    url: '/api/manager/goods/list/unit',
    method: 'get',
  })
};

// 新增/编辑品牌
export const updateUnit = (data) => {
  return request({
    url: '/api/manager/goods/save/unit',
    method: 'post',
    data
  })
};

// 删除单位
export const deleteUnit = (data) => {
  return request({
    url: '/api/manager/goods/remove/unit',
    method: 'post',
    data
  })
};

//类型列表
export const typeList = () => {
  return request({
    url: '/api/manager/goods/list/type',
    method: 'get',
  })
};

// 新增类型
export const updateType = (data) => {
  return request({
    url: '/api/manager/goods/save/type',
    method: 'post',
    data
  })
};

// 新增类型
export const deleteType = (data) => {
  return request({
    url: '/api/manager/goods/remove/type',
    method: 'post',
    data
  })
};

//商品列表
export const goodList = (data) => {
  return request({
    url: '/api/manager/goods/list',
    method: 'get',
    params: data
  })
};

//关键字搜索
export const searchGoods = (data) => {
  return request({
    url: '/api/manager/goods/list/keyword',
    method: 'get',
    params: data
  })
};

//商品详情
export const goodDetail = (id) => {
  return request({
    url: '/api/manager/goods/detail',
    method: 'get',
    params: {
      id: id
    }
  })
};

//新增/编辑商品
export const updateGood = (data) => {
  return request({
    url: '/api/manager/goods/save',
    method: 'post',
    data
  })
};

//删除商品
export const deleteGood = (data) => {
  return request({
    url: '/api/manager/goods/remove',
    method: 'post',
    data
  })
};

//根据类型id获取规格(添加商品用)
export const getGuiById = (id) => {
  return request({
    url: '/api/manager/goods/tree/type',
    method: 'get',
    params: {
      id: id
    }
  })
};

//分类列表
export const categoryList = (type) => {
  return request({
    url: '/api/manager/goods/list/category',
    method: 'get',
    params: {
      type: type
    }
  })
};

//获取一级分类
export const firstCategoryList = (id) => {
  return request({
    url: '/api/manager/goods/tree/category',
    method: 'get',
    params: {
      id
    }
  })
};

// 新增/编辑分类
export const updateCategory = (data) => {
  return request({
    url: '/api/manager/goods/save/category',
    method: 'post',
    data
  })
};

// 删除商品分类
export const deleteCategory = (data) => {
  return request({
    url: '/api/manager/goods/remove/category',
    method: 'post',
    data
  })
};

//检测商品-条形码，名字是否存在
export const judgeExist = (code, name) => {
  return request({
    url: '/api/manager/goods/check/goods',
    method: 'get',
    params: {
      code: code,
      name: name
    }
  })
};

//新增时校验是否存在商品属性
export const judgeCanAdd = () => {
  return request({
    url: '/api/manager/goods/check/goodsAttr',
    method: 'get',
  })
};
