import request from '@/router/axios';

// // 登录
// export const login = (data) => {
//     return request({
//         url: "api/user/login",
//         method: 'post',
//         params: data
//     })
// }
// 登录
export const login = (data) => {
  return request({
    url: "/login/api/blade-auth/oauth/token",
    method: 'post',
    params: data,
    headers: {
      "Authorization": "Basic c2FiZXI6c2FiZXJfc2VjcmV0",
      "Tenant-Id": 936701
    }
  })
};
//价格管理左侧类型列表
export const getGoodsType = () => {
  return request({
    url: '/api/price/goodsType',
    method: 'get',
  })
};
//价格管理右侧商品列表
export const getGoodsList = (data) => {
  return request({
    url: '/api/price/sellGoods',
    method: 'get',
    params: data
  })
};

// 主页数据price/sell
export const getHome = () => {
  return request({
    url: '/api/price/sell',
    method: 'get',
  })
};

//销售统计数据
export const getSalesData = (data) => {
  console.log(data)
  return request({
    url: '/api/price/marketCount',
    method: 'get',
    params: data
  })
};
//营业额走势数据
export const getTurnover = (data) => {
  console.log(data)
  return request({
    url: '/api/price/turnover',
    method: 'get',
    params: data
  })
};
//毛利走势及其数据
export const getMlCount = (data) => {
  return request({
    url: '/api/price/MlCount',
    method: 'get',
    params: data
  })
};
//订单列表
export const getOrderList = (data) => {
  return request({
    url: '/api/price/count',
    method: 'get',
    params: data
  })
};
//订单详情
export const orderDetail = (data) => {
  return request({
    url: '/api/price/orderDetail',
    method: 'get',
    params: data
  })
};
//退单列表
export const getChargebackList = (data) => {
  return request({
    url: '/api/price/returnCount',
    method: 'get',
    params: data
  })
};
//退单详情
export const chargebackDetail = (data) => {
  return request({
    url: '/api/price/orderDetail',
    method: 'get',
    params: data
  })
};
//商品价格修改
export const goodsSubmit = (data) => {
  return request({
    url: '/api/price/goodsSubmit',
    method: 'post',
    data
  })
};


// /price/memberCount 会员统计
export const memberCount = () => {
  return request({
    url: '/api/price/memberCount',
    method: 'get',
  })
};
//price/topSeller 畅销商品
export const topSeller = (data) => {
  return request({
    url: '/api/price/topSeller',
    method: 'get',
    params: data
  })
};
//price/per客单价
export const passengerPrice = (data) => {
  return request({
    url: '/api/price/per',
    method: 'get',
    params: data
  })
};

// 客流量 price/detailsCount
export const passengerFlow = (data) => {
  return request({
    url: '/api/price/detailsCount',
    method: 'get',
    params: data
  })
};

// 今日销售数据 manager/today-sales-data
export const todaySalesData = (data)=>{
  return request({
    url:"/api/manager/today-sales-data",
    method:'get',
    data
  })
}

// 今日销售排行前5
export const todayGoodsTop5 = (data)=>{
  return request({
    url:"/api/manager/todayGoodsTop5",
    method:'get',
    data
  })
}

// 客流量
export const guestFlowStatistics = (data)=>{
  return request({
    url:"/api/api/report/guestFlowStatistics",
    method:'get',
    params:data
  })
}

// 客单报表
export const guestOrders = (data)=>{
  return request({
    url:"/api/api/report/guestOrders",
    method:'get',
    params:data
  })
}

// 热销商品
export const hotGoods = (data)=>{
  return request({
    url:"/api/manager/hotGoods",
    method:'get',
    params:data
  })
}

// 订退单统计接口
export const cashCount = (data)=>{
  return request({
    url:"/api/manager/cash-count",
    method:'get',
    params:data
  })
}

// 退单列表查询
export const selectRefund = (data)=>{
  return request({
    url:"/api/manager/select-refund",
    method:'get',
    params:data
  })
}

// 退单详情查询
export const refundDetails = (data)=>{
  return request({
    url:"/api/manager/refund-details",
    method:'get',
    params:data
  })
}

// 价格管理列表
export const priceGoodsList = (data)=>{
  return request({
    url:"/api/manager/goods-list",
    method:'get',
    params:data
  })
}

// 批量改价
export const banchUpdatePrice = (data)=>{
  return request({
    url:"/api/manager/price-update",
    method:'post',
    data
  })
}

// 尺寸库存情况
export const priceGoodDetail = (id)=>{
  return request({
    url:"/api/manager/goods-detail",
    method:'get',
    params:{
      id:id
    }
  })
}
// 营业额统计
export const businessChart = (data)=>{
  return request({
    url:"/api/manager/turnover-statistics",
    method:'get',
    params:data
  })
}
// 当日详情查询
export const businessChartDetail = (data)=>{
  return request({
    url:"/api/manager/hot-detail",
    method:'get',
    params:data
  })
}
// 客流量详细信息
export const shopDetails = (data)=>{
  return request({
    url:"/api/api/report/shopDetails",
    method:'get',
    params:data
  })
}
