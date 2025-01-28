import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "./components/DefaultLayout.vue";
import Home from "./pages/Home.vue";
import MyImages from "./pages/MyImages.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import useUserStore from "./store/user.js";

// helper function to check if the user is authenticated
async function checkIfLoggedIn(userStore, next) {
  try {
    await userStore.fetchUser();
    if (userStore.user !== null) {
      next({ name: 'Home' });  // Redirect to homepage if logged in
    } else {
      next(); // Allow access to login or register
    }
  } catch (error) {
    next();  // Proceed even if there's an error (could log the error if needed)
  }
}

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
        await userStore.fetchUser();
        next();
      } catch (error) {
        next(false); // Cancel navigation if data fetching fails
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      checkIfLoggedIn(userStore, next);
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      checkIfLoggedIn(userStore, next);
    },
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
