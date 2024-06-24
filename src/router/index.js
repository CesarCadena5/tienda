import isAuthenticatedGuard from '@/modules/auth/guards/isAuthenticatedGuard';
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: { name: 'login' }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import("@/modules/auth/layouts/AuthLayout.vue"),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import("@/modules/auth/pages/LoginPage.vue")
      },
      {
        path: 'register',
        name: 'register',
        component: () => import("@/modules/auth/pages/RegisterPage.vue")
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("@/modules/shared/pages/Home.vue")
  },
  {
    path: '/store',
    name: 'store',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("@/modules/shared/layouts/StoreLayout.vue"),
    children: [
      {
        path: 'products',
        name: 'products',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import("@/modules/products/layouts/ProductLayout.vue"),
        children: [
          {
            path: 'create',
            name: 'create-product',
            component: () => import("@/modules/products/pages/CreateProduct.vue")
          },
          {
            path: 'list',
            name: 'list-product',
            component: () => import("@/modules/products/pages/ListProduct.vue")
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import("@/modules/shared/pages/404.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
