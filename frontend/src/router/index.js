import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

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
    meta: {
      isNotLogged: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue'),
    meta: {
      isNotLogged: true,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../components/UserProfile.vue'),
    meta: {
      isLogged: true,
      hasEmailVerified: true
    }
  },
  {
    path: '/organizations',
    name: 'Organization',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "organizations" */ '../components/Organization.vue'),
    meta: {
      isLogged: true,
      hasEmailVerified: true
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "projects" */ '../components/Project.vue'),
    meta: {
      isLogged: true,
      hasEmailVerified: true
    }
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "forgotPassword" */ '../components/ForgotPassword.vue'),
    meta: {
      isNotLogged: true,
    }
  },
  {
    path: '/verify',
    name: 'Verify',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "verify" */ '../components/VerifyEmail.vue'),
    meta: {
      isLogged: true,
      hasEmailUnverified: true
    }
  },
  {
    path: '/email/verify/success',
    name: 'Verify successfull',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "verify-successfull" */ '../components/EmailVerified.vue'),
    meta: {
      hasEmailVerified: true
    }
  },
  {
    path: '/email/verify/middleware',
    name: 'middle route',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "middleware" */ '../components/EmailVerifiedMiddleware.vue'),
    meta: {
      hasEmailUnerified: true
    }
  },
  {
    path: '/reset-password',
    name: 'Reset password',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "reset-password" */ '../components/ResetPassword.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active-exact"
})

router.beforeEach((to, from, next) => {
  if (to.matched.length == 0) {
    next('/');
    return;
  }
  const record = to.matched[0];

  if (record.meta.isLogged && !store.getters['isAuthenticated']) {
    next('/login');
    return;
  }

  if (record.meta.isNotLogged && store.getters['isAuthenticated']) {
    next('/');
    return;
  }

  if (record.meta.hasEmailVerified && !store.getters['hasEmailVerified']) {
    next('/verify');
    return;
  }

  if (record.meta.hasEmailUnverified && store.getters['hasEmailVerified']) {
    next('/');
    return;
  }

  // if (record.meta.hasEmailVerified && store.getters['hasEmailVerified']) {
  //   next('/email/verify/success');
  //   return;
  // }

  next();
})
export default router;
