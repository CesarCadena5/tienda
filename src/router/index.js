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
  ,
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
