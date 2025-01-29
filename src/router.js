import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "./components/DefaultLayout.vue";
import Home from "./pages/Home.vue";
import MyImages from "./pages/MyImages.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
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

        if (userStore.user === null && token) {
          await userStore.fetchUser();
        } else {
          throw error; // redirect to login if no token
        }

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
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
