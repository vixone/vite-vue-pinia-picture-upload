import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "./components/DefaultLayout.vue";
import Home from "./pages/Home.vue";
import MyImages from "./pages/MyImages.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import Terminal from "./pages/Terminal.vue";
import useUserStore from "./store/user.js";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: '/', name: 'Home', component: Home },
      { path: '/images', name: 'MyImages', component: MyImages },
    ],
    beforeEnter: async (to, from, next) => {
      try {
        const userStore = useUserStore();

        const token = localStorage.getItem('api_token');

        if (!token || (userStore.user === null && !token)) {
          throw error; // redirect to login if no token
        }

        await userStore.fetchUser();

        next();
      } catch (error) {
        next('/login'); // Cancel navigation if data fetching fails
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/terminal',
    name: 'Terminal',
    component: Terminal,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
