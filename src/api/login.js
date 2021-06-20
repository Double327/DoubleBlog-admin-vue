import request from '@/axios';

export function login(username, password, code, uuid) {
    const data = {
        username,
        password,
        code,
        uuid
    }
    return request({
        url: '/login',
        method: 'post',
        data: data
    });
}

export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    });
}

export function getCaptcha() {
    return request({
        url: '/getCaptchaImg',
        method: 'get'
    });
}

export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    });
}
