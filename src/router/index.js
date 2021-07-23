import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Room from '../views/Room.vue';

import { auth } from '../firebase/config';

const requireAuth = (to, from, next) => {
  const user = auth.currentUser;
  if (!user) {
    next({ name: 'Login' });
  } else {
    next();
  }
};

const backAuth = (to, from, next) => {
  const user = auth.currentUser;
  if (user) {
    next({ name: 'Room' });
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Room',
    component: Room,
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: backAuth,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: backAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
