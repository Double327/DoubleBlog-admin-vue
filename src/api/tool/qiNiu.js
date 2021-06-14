import request from '@/axios';

export function getQiNiuConfig() {
    return request({
        url: '/tool/qiNiu/config',
        method: 'get'
    });
}

export function editQiNiuConfig(data) {
    return request({
        url: '/tool/qiNiu/config',
        method: 'put',
        data: data
    });
}

export function getUploadToken() {
    return request({
        url: '/tool/qiNiu/token',
        method: 'get'
    });
}
