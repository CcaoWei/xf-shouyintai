import request from '@/router/axios';

export const getInventoryList = (data) => {
  return request({
    url: '/api/take/takes',
    method: 'get',
    params: data
  })
};


export const getInventoryDetail = (takeId) => {
  return request({
    url: '/api/take/detail',
    method: 'get',
    params: {
      takeId
    }
  })
};

export const addInventory = (params) => {
  return request({
    url: '/api/take/stocks',
    method: 'post',
    data: params
  })
};

export const fixInventory = (params) => {
  return request({
    url: '/api/take/dispose',
    method: 'post',
    data: params
  })
};

export const saveInventory = (params) => {
  return request({
    url: '/api/take/preserveStake',
    method: 'post',
    data: params
  })
};
export const deleteInventory = (takeId) => {
  return request({
    url: '/api/take/delete',
    method: 'get',
    params: {
      takeId
    }
  })
};
