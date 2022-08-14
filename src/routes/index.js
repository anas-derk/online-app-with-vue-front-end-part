const routes = [

    {
        path: '/',
        component: () => import("../views/Home/index.vue")
    },

    {
        path: "/login",
        component: () => import("../views/Authentication/Login/index.vue")
    },

    {
        path: "/sign-up",
        component: () => import("../views/Authentication/Signup/index.vue")
    },

    {
        path: "/admin/add-product",
        component: () => import("../views/Admin/AddProduct/index.vue")
    },

    {
        path: "/admin/manage-orders",
        component: () => import("../views/Admin/ManageOrders/index.vue")
    },

    {
        path: "/orders",
        component: () => import("../views/Orders/index.vue")
    },

    {
        path: "/cart",
        component: () => import("../views/Cart/index.vue")
    },

    {
        path: "/product-info/:productId",
        component: () => import("../views/ProductInfo/index.vue")
    },

    {
        path: "/:catchAll(.*)",
        component: () => import("../views/PageNotFound/index.vue")
    }

]

export default routes;