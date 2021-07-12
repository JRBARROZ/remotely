import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    next();
    return
  }
  next('/');
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['isAuthenticated']) {
    next();
    return
  }
  next('/login');
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../components/AddUser.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../components/UserProfile.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/organization',
    name: 'Organization',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../components/Organizations.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/project',
    name: 'Project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../components/Project.vue'),
    beforeEnter: ifAuthenticated
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
