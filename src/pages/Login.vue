<template>
  <GuestLayout>
    <div class="border border-green-500 p-6 w-96">
      <form @submit.prevent="submit" class="space-y-4">
        <h1 class="text-xl mb-4 text-center">Terminal Login</h1>

        <div>
          <label class="block">Email:</label>
          <input v-model="data.email" class="w-full bg-transparent border-b border-green-400 outline-none py-1"
            type="text" autofocus />
        </div>

        <div class="mt-4">
          <label class="block">Password:</label>
          <input v-model="data.password" class="w-full bg-transparent border-b border-green-400 outline-none py-1"
            type="password" @keyup.enter="login" />
        </div>

        <button type="submit" @click="login"
          class="w-full mt-6 border border-green-400 py-2 hover:bg-green-400 hover:text-black transition">
          Login
        </button>

        <p v-if="errorMessage" class="text-red-400 mt-3">{{ errorMessage }}</p>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Don't have an account?
        {{ ' ' }}
        <RouterLink :to="{ name: 'Signup' }" class="font-semibold text-indigo-600 hover:text-green-400">
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

function login() {
  userStore.loginUser(data.value)
    .then(() => {
      router.push({ name: 'TheRoom' });  // Redirect on successful login
    })
    .catch(error => {
      console.error('Loginfailed:', error);
      errorMessage.value = error.response?.data?.message || 'Login failed.';
    });
};

</script>

<style scoped></style>
