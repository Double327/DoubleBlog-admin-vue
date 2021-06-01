import request from '@/axios';

export function addProject(project) {
    return request({
        url: '/project',
        methods: 'post',
        data: project
    });
}

export function deleteProject(ids) {
    return request({
        url: '/project/' + ids,
        methods: 'delete',
    });
}

export function editProject(project) {
    return request({
        url: '/project',
        methods: 'put',
        data: project
    });
}

export function projectDetails(id) {
    return request({
        url: '/project/' + id,
        method: 'get'
    });
}
