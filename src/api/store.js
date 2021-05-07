import request from '@/router/axios';

//新建店铺
export const addStore = (data) => {
    return request({
        url: '/api/manger/user/save-shop',
        method: 'post',
        data: data
    })
};
//店铺照片上传
export const uploadImg = (data) => {
    return request({
        url: '/api/manger/user/putFiles',
        method: 'post',
        data: data
    })
};
//但图片上传
export const uploadImgOnly = (data) => {
    return request({
        url: '/api/manger/user/putFile',
        method: 'post',
        data: data
    })
};
//发布通知
export const editNotice = (data) => {
    return request({
        url: '/api/manger/user/notice',
        method: 'post',
        data: {notice:data}
    })
};
//门店设置
export const setStore = (data) => {
    return request({
        url: '/api/manger/user/update-shop',
        method: 'post',
        data: data
    })
};

//门店详情
export const storeDetail = () => {
    return request({
        url: '/api/manger/user/shop/detail',
        method: 'get',
    })
};

//判断是否有店铺
export const isStore = () => {
    return request({
        url: '/api/manger/user/user-if-store',
        method: 'get'
    })
};

//获取店长列表 /manger/user/list/shopowner
export const shopowner = (data) => {
    return request({
        url: '/api/manger/user/list/shopowner',
        method: 'get',
        params:data

    })
};

//订单/退单统计接口
export const cashCount = (data) => {
    return request({
        url: '/api/manager/cash-count',
        method: 'get',
        params:data
    })
};

//订单查询列表
export const selectOrders = (data) => {
    return request({
        url: '/api/manager/select-orders',
        method: 'get',
        params:data
    })
};

//订单详情
export const orderDetail = (id) => {
    return request({
        url: '/api/manager/order-details',
        method: 'get',
        params:{id:id}
    })
};



// 店员管理

// 店员管理首页 1 销售 2 收银
export const listUser = (params) => {
    return request({
        url: '/api/manger/user/list/user',
        method: 'get',
        params:params
    })
};
// 店员管理 详情
export const userDetail = (id) => {
    return request({
        url: '/api/manger/user/detail',
        method: 'get',
        params:{id:id}
    })
};
// 店员管理 修改人员状态
export const updateUser = (data) => {
    return request({
        url: '/api/manger/user/update/user',
        method: 'get',
        params:data
    })
};

// 店员管理 新建店员
export const addUser = (data) => {
    return request({
        url: '/api/manger/user/save-clerk',
        method: 'post',
        data:data
    })
};

// 店员管理 获取 店员和收银员
export const listRole = () => {
    return request({
        url: '/api/manger/user/list/role',
        method: 'get',
    })
};


// 店员管理 交班记录
export const listChange = (data) => {
    return request({
        url: '/api/manger/user/list/change',
        method: 'get',
        params:data
    })
};
// 店员管理 交班详情
export const listChangeDetail = (id) => {
    return request({
        url: '/api/manger/user/change/detail',
        method: 'get',
        params:{id:id}
    })
};
