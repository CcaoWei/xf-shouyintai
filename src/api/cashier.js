import request from '@/router/axios';

export const getGoodsByCode = (code) => {
    return request({
        url: '/api/cashier/detail/code',
        method: 'get',
        params: {
            code
        }
    })
};

//新版pad端接口
export const getGoodByCode = (id) => {
    return request({
        url: '/api/cashier/ipad/stock/query',
        method: 'get',
        params: {
            id
        }
    })
};

export const getGoodsByCodeNew = (code) => {
    return request({
        url: '/api/cashier/ipad/detail/code',
        method: 'get',
        params: {
            code
        }
    })
};

export const goodsDetail = (id) => {
    return request({
        url: '/api/price/goodsDetail',
        method: 'get',
        params: {
            id
        }
    })
};

export const getRetailers = () => {
    return request({
        url: '/api/cashier/retailers',
        method: 'get'
    })
};

export const getDayCash = () => {
    return request({
        url: '/api/cashier/dayCash',
        method: 'get'
    })
};

export const getDayCashNew = () => {
    return request({
        url: '/api/cashier/ipad/dayCash',
        method: 'get'
    })
};

export const dayClose = () => {
    return request({
        url: '/api/cashier/dayClose',
        method: 'get'
    })
};

export const dayCloseNew = () => {
    return request({
        url: '/api/cashier/ipad/dayClose',
        method: 'get'
    })
};

export const cash = (params) => {
    return request({
        url: '/api/cashier/cash',
        method: 'POST',
        data: params
    })
};
export const cashIpad = (params) => {
    return request({
        url: '/api/cashier/ipad/cash',
        method: 'POST',
        data: params
    })
};

//交班列表
export const dutyList = (params) => {
    return request({
        url: '/api/cashier/ipad/change/list',
        method: 'get',
        params
    })
};
//交班详情
export const dutyDetail = (params) => {
    return request({
        url: '/api/cashier/ipad/change/detail',
        method: 'get',
        params
    })
};
//确定交班
export const dutySure = (params) => {
    return request({
        url: '/api/cashier/ipad/change/hand',
        method: 'get',
        params
    })
};
//订单查询
export const orderList = (params) => {
    return request({
        url: '/api/cashier/ipad/order/list',
        method: 'get',
        params
    })
};

//会员查询
export const vipQuery = (id) => {
    return request({
        url: '/api/cashier/ipad/member',
        method: 'get',
        params: {
            code: id
        }
    })
};

//零售员获取列表
export const retailers = () => {
    return request({
        url: '/api/cashier/ipad/retailers',
        method: 'get',
    })
};

//查看当日是否日结
export const getDayClose = () => {
    return request({
        url: '/api/cashier/ipad/dayClose/query',
        method: 'get',
    })
};

// 获取微信支付二维码
export const getWxPayCode = (params) => {
    return request({
        url: '/api/pay/v1/wx-pay-qr-code',
        method: 'post',
        data: params
    })
};

//微信查询订单支付情况
export const getWxPayStatus = (orderNum) => {
    return request({
        url: '/api/pay/v1/wx-order-number',
        method: 'get',
        params: {
            orderNum
        }
    })
};

//获取支付宝支付二维码
export const getAliPayCode = (params) => {
    return request({
        url: '/api/pay/v1/ali-pay-qr-code',
        method: 'post',
        data: params
    })
};

//收银计算处理
export const calculation = (params) => {
    return request({
        url: '/api/cashier/ipad/cash-count',
        method: 'post',
        data: params
    })
};

//支付宝查询订单支付情况
export const getAliPayStatus = (orderNum) => {
    return request({
        url: '/api/pay/v1/ali-order-number',
        method: 'get',
        params: {
            orderNum
        }
    })
};

//历史订单查询-列表
export const historyOrder = (data) => {
    return request({
        url: '/api/cashier/ipad/history-order-list',
        method: 'get',
        params: data
    })
};

//查询/切换订单
export const getHistoryStatus = (orderNum) => {
    return request({
        url: '/api/pay/v1/order-number',
        method: 'get',
        params: {
          orderNum:orderNum
        }
    })
};
