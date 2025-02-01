import { createRouter, createWebHistory } from "vue-router";
import TerminalLayout from "./components/TerminalLayout.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import TheRoom from "./pages/TheRoom.vue";
import useUserStore from "./store/user.js";

const routes = [
  {
    path: "/",
    component: TerminalLayout,
    children: [
      { path: '/the-room', name: 'TheRoom', component: TheRoom },
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
    path: '/:pathMatch(.*)*',
    redirect: '/the-room',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
