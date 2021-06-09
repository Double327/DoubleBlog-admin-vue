import request from '@/axios'

export function get(url, id) {
    return request({
        url: url + '/' + id,
        method: 'get'
    });
}

export function list(url, params) {
    return request({
        url: url,
        method: 'get',
        params: params
    });
}

export function add(url, data) {
    return request({
        url: url,
        method: 'post',
        data: data
    });
}

export function del(url, ids) {
    return request({
        url: url + '/' + ids,
        method: 'delete'
    });
}

export function edit(url, data) {
    return request({
        url: url,
        method: 'put',
        data: data
    });
}

