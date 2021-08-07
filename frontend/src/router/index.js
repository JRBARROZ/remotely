import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['isAuthenticated']) {
    next();
    return;
  }
  next('/');
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['isAuthenticated']) {
    next();
    return;
  }
  next('/login');
}

const ifHasEmailVerified = (to, from , next) => {
  if (store.getters['hasEmailVerified']) {
    next();
    return;
  }
  next('/verify');
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
    path: '/organizations',
    name: 'Organization',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "organizations" */ '../components/Organization.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/projects',
    name: 'Projects',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "projects" */ '../components/Project.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "forgotPassword" */ '../components/ForgotPassword.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/verify',
    name: 'Verify',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "verify" */ '../components/VerifyEmail.vue'),
    beforeEnter: ifHasEmailVerified
  },
  {
    path: '/email/verify/success',
    name: 'Verify successfull',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "verify-successfull" */ '../components/EmailVerified.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active-exact"
})

export default router;
