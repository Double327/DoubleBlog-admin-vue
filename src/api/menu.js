import request from '@/axios';

// 获取路由
export function getRouters() {
    return request({
        url: '/getRouters',
        method: 'get'
    })
}
