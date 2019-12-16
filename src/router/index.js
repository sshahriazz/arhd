import Vue from 'vue'
import Router from 'vue-router'
import Head from 'vue-head'
import Home from '@/views/Home'
import CheckLogin from '@/views/CheckLogin'
import { isNil } from 'lodash'
import store from '@/store'

Vue.use(Router)

/* If you don't know about VueHead, please refer to https://github.com/ktquez/vue-head */

Vue.use(Head, {
  complement: process.env.VUE_APP_TITLE
})

/* If you don't know about VueRouter, please refer to https://router.vuejs.org/ */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/check-login',
      name: 'check-login',
      component: CheckLogin,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/authentication/SignIn.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/authentication/SignUp.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/updateprofile',
      name: 'updateprofile',
      component: () => import('@/views/authentication/UpdateProfile.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: () => import('@/views/products/AddProduct.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/productview/:id',
      name: 'productview',
      component: () => import('@/views/products/ProductsView.vue'),
      props: true,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/products/Products.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/bseller',
      name: 'bseller',
      component: () => import('@/views/BSeller.vue')
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('@/views/products/Inventory.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/products/:id',
      name: 'product',
      props: true,
      component: () => import('@/views/products/Product.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      props: true,
      meta: {
        authNotRequired: true
      },
      component: () => import('@/views/authentication/Profiles')
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

/**
 * Handle user redirections
 */
router.beforeEach((to, from, next) => {
  if (
    !(to.meta && to.meta.authNotRequired) &&
    isNil(store.state.authentication.user)
  ) {
    const path =
      store.state.authentication.user === null ? '/login' : '/check-login'
    return next(`${path}?redirectUrl=${to.path}`)
  }
  next()
})

export default router
