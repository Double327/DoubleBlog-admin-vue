import Layout from '@/layout'
import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect')
            }
        ]
    },
    {
        path: '',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/index'),
                name: '首页',
                meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true}
            },
            {
                path: 'blog',
                component: () => import('@/views/blog/blog'),
                name: '博客',
                meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true}
            },
        ]
    },
    {
        path: '/blogOperation',
        component: Layout,
        hidden: true,
        redirect: 'noRedirect',
        children: [
            {
                path: 'blog/add',
                component: () => import('@/views/blog/blog/Add'),
                name: 'AddBlog',
                meta: {title: '新增文章', noCache: false, activeMenu: '/blog/blog'},
            }, {
                path: 'blog/edit/:id(\\d+)',
                component: () => import('@/views/blog/blog/Edit'),
                name: 'EditBlog',
                meta: {title: '修改文章', noCache: false, activeMenu: '/blog/blog'},
            }
        ]
    }
]

export default new Router({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})
