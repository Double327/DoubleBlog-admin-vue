import request from '@/axios';

export function getParentCategory() {
    return request({
        url: '/blog/category/parent',
        method: 'get'
    })
}
