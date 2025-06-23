import { createRouter, createWebHashHistory } from 'vue-router'


export const systemRoutes = [
  {
    path: '/',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/System/:name',
    name: 'System',
    component: () => import('@/views/System/index.jsx')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth/index.vue'),
    redirect: 'SignIn',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Auth/Login/index.vue')
      },
      {
        path: 'signUp',
        name: 'SignUp',
        component: () => import('@/views/Auth/SignUp/index.vue')
      },
      {
        path: 'signIn',
        name: 'SignIn',
        component: () => import('@/views/Auth/SignIn/index.vue')
      },
    ]
  },
  {
    path: '/redirect/:path(.*)',
    redirect: '/',
    component: () => import('@/views/default/redirect/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
    component: () => import('@/views/default/error/404.vue')
  },
  {
    path: '/403',
    redirect: '/',
    component: () => import('@/views/default/error/403.vue')
  },

]


const otherRoutes = [
  {
    path: '/static/index', 
    component: () => import('@/static/index.vue')
  },
  {
    path: '/nav/index', 
    component: () => import('@/views/Nav/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [ ...systemRoutes, ...otherRoutes  ]
})




export default router

