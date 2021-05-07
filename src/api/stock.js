import request from '@/router/axios';

// 出入库明细
export const riDetails = (data) => {
  return request({
    async: false,
    url: '/api/details/verifys',
    method: 'get',
    params: data
  })
};

// 出入库明细
export const riDetailsV2 = (data) => {
  return request({
    async: false,
    url: '/api/details/v2/verifys',
    method: 'get',
    params: data
  })
};

// 出/入库单明细
export const orderDetails = (code) => {
  return request({
    async: false,
    url: '/api/details/goods-msg',
    method: 'get',
    params: {
      code
    }
  })
};

// 出/入库单明细
export const orderDetailsV2 = (code,detailType) => {
  return request({
    async: false,
    url: '/api/details/v2/goods-msg',
    method: 'get',
    params: {
      code,
      detailType
    }
  })
};

// 条形码接口
export const barCode = (barCode) => {
  return request({
    async: false,
    url: '/api/details/goods-barCode',
    method: 'get',
    params: {
      barCode: barCode
    }
  })
};

// 入库管理接口
export const inStorage = (data) => {
  console.log(data);
  return request({
    async: false,
    url: `/api/details/goods-in`,
    method: 'post',
    data: data
  })
};

// 出库管理接口
export const outStorage = (data) => {
  return request({
    async: false,
    url: `/api/details/goods-out`,
    method: 'post',
    data: data
  })
};

// // 申请退款(旧)
// export const refund = (data) => {
//     return request({
//         async:false,
//         url: `/api/details/goods-refund`,
//         method: 'post',
//         data
//     })
// };
// 申请退款
export const refund = (data) => {
  return request({
    async: false,
    url: `/api/refund/refund`,
    method: 'post',
    data
  })
};

// 退货单详细
export const returnDetails = (code) => {
  return request({
    async: false,
    url: `/api/details/goods-details`,
    method: 'get',
    params: {
      code
    }
  })
};
// 已退单详细
export const returnedDetails = (id) => {
  return request({
    async: false,
    url: `/api/refund/detail`,
    method: 'get',
    params: {
      id
    }
  })
};
// 退单列表
export const returnList = (data) => {
  return request({
    async: false,
    url: `/api/refund/cash-list`,
    method: 'get',
    params: data

  })
};
// 已退列表
export const returnedList = (data) => {
  return request({
    async: false,
    url: `/api/refund/refund-list`,
    method: 'get',
    params: data
  })
};
// 库存预警
export const stockWarning = (data) => {
  return request({
    async: false,
    url: `/api/details/goods-warning`,
    method: 'get',
    params: data
  })
};
// 库存预警
export const stockWarningV2 = (data) => {
  return request({
    async: false,
    url: `/api/details/v2/goods-warning`,
    method: 'get',
    params: data
  })
};
// 商品列表
export const goodsStockList = (data) => {
  return request({
    async: false,
    url: `/api/take/all-goods`,
    method: 'get',
    params: data
  })
};
// 全店库存
export const allStoreInventory = (data) => {
  return request({
    async: false,
    url: `/api/details/v2/all-store-inventory`,
    method: 'get',
    params: data
  })
};
// 调拨单/订货列表
export const transferOrderList = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/list`,
    method: 'get',
    params: data
  })
};

// 调拨单/订货列表
export const transferOrderSelect = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/dic`,
    method: 'get',
    params: data
  })
};

// 订单/调拨单详情
export const transferOrderDetail = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/detail`,
    method: 'get',
    params: data
  })
};

// 出入库接口
export const outOrPut = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/stock`,
    method: 'post',
    data
  })
};

// 新增调拨单/订单
export const addOutOrPut = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/save`,
    method: 'post',
    data
  })
};

// 获取店铺
export const getShopList = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/dept`,
    method: 'get',
    params: data
  })
};

// 单据搜索商品
export const orderGoodsSearch = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/goods/detail/deptId`,
    method: 'get',
    params: data
  })
};

// 根据订单号查询商品（出入库使用）
export const goodsSearch = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/goods/detail/orderId`,
    method: 'get',
    params: data
  })
};

// 取消订单
export const cancelOrder = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/cancel`,
    method: 'post',
    data
  })
};

// 获取店铺（根据spuid）
export const getShopBySpu = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/deptBySpuIds`,
    method: 'get',
    params: data
  })
};

// 获取商品集合（根据spuid）
export const getGoodsBySpu = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/goodsByDeptId`,
    method: 'get',
    params: data
  })
};

// 根据订单号获取商品集合
export const getGoodsByOrder = (data) => {
  return request({
    async: false,
    url: `/api/shop/order/goodsByOrderId`,
    method: 'get',
    params: data
  })
};
