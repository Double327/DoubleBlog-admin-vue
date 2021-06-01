import request from '@/axios';

export function addProject(project) {
    return request({
        url: '/project',
        method: 'post',
        data: project
    });
}

export function deleteProject(ids) {
    return request({
        url: '/project/' + ids,
        method: 'delete',
    });
}

export function editProject(project) {
    return request({
        url: '/project',
        method: 'put',
        data: project
    });
}

export function projectDetails(id) {
    return request({
        url: '/project/' + id,
        method: 'get'
    });
}
