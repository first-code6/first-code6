import { createRouter, createWebHistory } from 'vue-router'
import axiso_web from '@/view/axios.vue'
import index_web from '@/view/index.vue'
import massage_web from '@/view/massage.vue'
import home_web from '@/view/home.vue'

//定义路由规则
let routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/axios',
        name: 'axios',
        component: axiso_web
    },
    {
        path: '/index',
        name: 'index',
        component: index_web
    },
    {
        path: '/massage',
        name: 'massage',
        component: massage_web
    },
    {
        path: '/home/:id',
        name: 'home',
        component: home_web
    }
]

//创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router