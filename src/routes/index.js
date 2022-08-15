const routes = [

    {
        name: "Home",
        path: '/',
        component: () => import("../views/Home/index.vue")
    },

    {
        name: "Login",
        path: "/login",
        component: () => import("../views/Authentication/Login/index.vue")
    },

    {
        name: "Signup",
        path: "/sign-up",
        component: () => import("../views/Authentication/Signup/index.vue")
    },

    {
        name: "Add Product",
        path: "/admin/add-product",
        component: () => import("../views/Admin/AddProduct/index.vue")
    },

    {
        name: "Manage Orders",
        path: "/admin/manage-orders",
        component: () => import("../views/Admin/ManageOrders/index.vue")
    },

    {
        name: "Orders",
        path: "/orders",
        component: () => import("../views/Orders/index.vue")
    },

    {
        name: "Cart",
        path: "/cart",
        component: () => import("../views/Cart/index.vue")
    },

    {
        name: "Product Info",
        path: "/product-info/:productId",
        component: () => import("../views/ProductInfo/index.vue")
    },

    {
        path: "/:catchAll(.*)",
        component: () => import("../views/PageNotFound/index.vue")
    }

]

export default routes;