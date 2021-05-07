import request from '@/router/axios';

export const testPost = (data) => {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    })
};