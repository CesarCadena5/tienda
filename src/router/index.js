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
            path: '',
            name: 'redirect-products',
            beforeEnter: [isAuthenticatedGuard],
            redirect: { name: 'list-product' }
          },
          {
            path: 'create',
            name: 'create-product',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/products/pages/CreateProduct.vue")
          },
          {
            path: 'list',
            name: 'list-product',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/products/pages/ListProduct.vue")
          },
          {
            path: ':id',
            name: 'edit-product',
            props: true,
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/products/pages/EditProduct.vue")
          }
        ]
      },
      {
        path: 'categories',
        name: 'categories',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import("@/modules/categories/layouts/CategoryLayout.vue"),
        children: [
          {
            path: '',
            name: 'redirect-category',
            beforeEnter: [isAuthenticatedGuard],
            redirect: { name: 'list-category' }
          },
          {
            path: 'create',
            name: 'create-category',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/categories/pages/CreateCategory.vue")
          },
          {
            path: 'list',
            name: 'list-category',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/categories/pages/ListCategory.vue")
          },
          {
            path: ':id',
            name: 'edit-category',
            props: true,
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/categories/pages/EditCategory.vue")
          }
        ]
      },
      {
        path: 'suppliers',
        name: 'suppliers',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import("@/modules/suppliers/layouts/SupplierLayout.vue"),
        children: [
          {
            path: '',
            name: 'redirect-supplier',
            beforeEnter: [isAuthenticatedGuard],
            redirect: { name: 'list-supplier' }
          },
          {
            path: 'create',
            name: 'create-supplier',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/suppliers/pages/CreateSupplier.vue")
          },
          {
            path: 'list',
            name: 'list-supplier',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/suppliers/pages/ListSupplier.vue")
          },
          {
            path: ':id',
            name: 'edit-supplier',
            props: true,
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/suppliers/pages/EditSupplier.vue")
          }
        ]
      },
      {
        path: 'customers',
        name: 'customers',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import("@/modules/customers/layouts/CustomerLayout.vue"),
        children: [
          {
            path: '',
            name: 'redirect-customer',
            beforeEnter: [isAuthenticatedGuard],
            redirect: { name: 'list-customer' }
          },
          {
            path: 'create',
            name: 'create-customer',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/customers/pages/CreateCustomer.vue")
          },
          {
            path: 'list',
            name: 'list-customer',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/customers/pages/ListCustomer.vue")
          },
          {
            path: ':id',
            name: 'edit-customer',
            props: true,
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/customers/pages/EditCustomer.vue")
          }
        ]
      },
      {
        path: 'orders',
        name: 'orders',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import("@/modules/orders/layout/OrderLayout.vue"),
        children: [
          {
            path: '',
            name: 'redirect-order',
            beforeEnter: [isAuthenticatedGuard],
            redirect: { name: 'list-order' }
          },
          {
            path: 'create',
            name: 'create-order',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/orders/pages/CreateOrder.vue")
          },
          {
            path: 'list',
            name: 'list-order',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/orders/pages/ListOrder.vue")
          },
          {
            path: 'view/:id',
            name: 'view-order',
            props: ({ params }) => {
              return { id: params.id, view: true };
            },
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/orders/pages/CreateOrder.vue")
          },
          {
            path: ':id',
            name: 'edit-order',
            props: true,
            beforeEnter: [isAuthenticatedGuard],
            component: () => import("@/modules/orders/pages/CreateOrder.vue")
          }
        ]
      },
      {
        path: 'sales',
        name: 'sales',
        beforeEnter: [isAuthenticatedGuard],
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
