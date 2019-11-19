import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/articles/ArticlesByCategory'
import ArticleById from '@/components/articles/ArticleById'
import Auth from '@/components/auth/Auth'

import { userKey, baseApiUrl, tokenExpirado } from "@/global"
import axios from 'axios'

Vue.use(VueRouter)

const routes = [{ 
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
}, {
    name: 'Auth',
    path: '/auth',
    component: Auth
}, {
    path: '/redirecionar',
    redirect: '/admin'
}, {
    path: '*',
    redirect: '/auth'
}]

const router = new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        // Esta função tem o papel de rolar a página para a posição onde está definido o objeto
        // no qual se deseja rolar... isso é muito útil em telas 'longas' a fim de posicionar para
        // o objeto desejado.
        if (savedPosition) {
            return savedPosition
        } else if (to.hash) {
            // assim vai rolar a tela até o seletor que tenha o # (hash) definido
            return { selector: to.hash }
        }
        return { x: 0, y: 0}
        // return { x: 0, y: 1000 }
    },
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
    const user = JSON.parse(json)

    if (to.name === 'Auth') {
        next()
    } else if (user) {
        axios.post(`${baseApiUrl}/validateToken`, user)
            .then( res => {
                if (res.data) {
                    if(to.matched.some(record => record.meta.requiresAdmin)) {
                        user && user.admin ? next() : next({ path: '/' })
                    } else {
                        next()
                    }
                } else {
                    localStorage.removeItem(userKey)
                    localStorage.setItem(tokenExpirado, 'S')
                    next('/auth')
                }
            })
    } else {
        const expirado = localStorage.getItem(tokenExpirado)
        if (expirado === 'S' || !user) {
            next('/auth')
        } else {
            next()
        }
    }
})

export default router