<template>
  <GuestLayout>
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login to your account</h2>

    <div v-if="errorMessage" class="py-2 px-3 mt-4 rounded text-white bg-red-400">
      {{ errorMessage }}
    </div>

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required="" v-model="data.email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input type="password" name="password" id="password" autocomplete="current-password" required=""
              v-model="data.password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
            in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Don't have an account?
        {{ ' ' }}
        <RouterLink :to="{ name: 'Signup' }" class="font-semibold text-indigo-600 hover:text-indigo-500">
          Signup here
        </RouterLink>
      </p>
    </div>
  </GuestLayout>
</template>


<script setup>
import GuestLayout from "../components/GuestLayout.vue";
import { ref } from "vue";
import useUserStore from "../store/user.js";
import router from "../router";

const data = ref({
  email: '',
  password: '',
});
const userStore = useUserStore();

const errorMessage = ref('');

function submit() {
  userStore.loginUser(data.value)
    .then(() => {
      router.push({ name: 'Home' });  // Redirect on successful login
    })
    .catch(error => {
      console.error('Loginfailed:', error);
      errorMessage.value = error.response?.data?.message || 'Login failed.';
    });
};

</script>

<style scoped></style>
