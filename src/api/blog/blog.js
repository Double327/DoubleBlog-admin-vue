import request from '@/axios';

export function addBlog(blog) {
    return request({
        url: '/blog/',
        method: 'post',
        data: blog
    });
}

export function deleteBlog(ids) {
    return request({
        url: '/blog/blog/' + ids,
        method: 'delete',
    });
}

export function editBlog(blog) {
    return request({
        url: '/blog/blog/',
        method: 'put',
        data: blog
    });
}

export function blogDetails(id) {
    return request({
        url: '/blog/blog/' + id,
        method: 'get'
    });
}

export function blogList(blog) {
    return request({
        url: '/blog/blog/list',
        method: 'get',
        params: blog
    });
}
