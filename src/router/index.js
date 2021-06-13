import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import customerOrder from '@/components/pages/customerOrder';
import Coupon from '@/components/pages/Coupon';
import Order from '@/components/pages/Order'
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
                    name: 'products', //產品管理
                    path: 'products', 
                    component: Products, 
                    meta: { requiresAuth: true },
                },
                {
                    name: 'Coupon', //折價券
                    path: 'coupon', 
                    component: Coupon, 
                    meta: { requiresAuth: true },
                },
                {
                    name: 'Order', //折價券
                    path: 'order', 
                    component: Order, 
                    meta: { requiresAuth: true },
                }
            ]

        },
        {   //以下為不需經過驗證的，因為是使用相同模版，所以另外寫。
            //可用相同的模版(如下component的地方)，路徑可以不同，這裡不需經過admin。
            name: 'DashboardCustomer', 
            path: '/', 
            component: Dashboard, 
            children: [
                {
                    name: 'customerOrder',
                    path: 'customer_order', 
                    component: customerOrder, 
                },
                
            ]

        },
    ]
})

