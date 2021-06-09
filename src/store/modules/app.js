import Cookies from 'js-cookie';

export default {
    namespaced: true,
    state: {
        sidebar: {
            opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false,
            withoutAnimation: false
        },
        device: 'desktop',
        size: Cookies.get('size') || 'medium'
    },
    mutations: {},
    actions: {}
}
