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

export function editBlogSupport(id, support) {
    let data = {
        'id': id,
        'support': support
    }
    return request({
        url: '/blog/blog/support',
        method: 'put',
        data: data
    });
}

export function editBlogPrivate(id, pri) {
    let data = {
        'id': id,
        'private': pri
    }
    return request({
        url: '/blog/blog/private',
        method: 'put',
        data: data
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
