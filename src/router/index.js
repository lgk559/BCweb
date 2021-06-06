import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
Vue.use(VueRouter)

export default new VueRouter({
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '*',
            redirect: 'login'
        },
        // {
        //     name: '首頁', //元件呈現的名稱
        //     path: '/', //對應的虛擬路徑
        //     component: Home, //對應的元件
        //     meta: { requiresAuth: true }
        // },
        {
            name: 'Login', //元件呈現的名稱
            path: '/login', //對應的虛擬路徑
            component: Login, //對應的元件
        },
        {
            name: 'Dashboard', //元件呈現的名稱
            path: '/admin', //對應的虛擬路徑
            component: Dashboard, //對應的元件
            children: [
                {
                    name: 'products',
                    path: 'products', //對應的虛擬路徑
                    component: Products, //對應的元件
                    meta: { requiresAuth: true },
                }
            ]

        },
    ]
})

