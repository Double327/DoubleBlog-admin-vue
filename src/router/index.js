import router from "@/router/routes";
import store from '@/store';
import NProgress from 'nprogress';
import {getToken} from '@/utils/auth';

NProgress.configure({showSpinner: false});

const whiteList = [
    '/login', '/auth-redirect', '/bind', '/register', '/',
];

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/index'});
            NProgress.done();
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('user/GetInfo').then(() => {
                });
                store.dispatch('GenerateRoutes').then(accessRoutes => {
                    // 根据roles权限生成可访问的路由表
                    router.addRoutes(accessRoutes) // 动态添加可访问路由表
                    next({path: to.path}); // hack方法 确保addRoutes已完成
                });
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
})

// router.afterEach((to, from) => {
//
// });

