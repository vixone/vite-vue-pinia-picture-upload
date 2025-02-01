<template>
  <GuestLayout>
    <div class="border border-green-500 p-6 w-96">
      <h1 class="text-xl mb-4 text-center">Terminal Signup</h1>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label for="name">Full Name</label>
          <input type="name" name="name" id="name" v-model="data.name"
            class="w-full bg-transparent border-b border-green-400 outline-none py-1" />

          <p v-if="errors.name" class="mt-1 text-sm text-red-500">
            {{ errors.name[0] }}
          </p>
        </div>
        <div>
          <label for="email">Email address</label>
          <input type="email" name="email" id="email" autocomplete="email" v-model="data.email"
            class="w-full bg-transparent border-b border-green-400 outline-none py-1" />

          <p v-if="errors.email" class="mt-1 text-sm text-red-500">
            {{ errors.email[0] }}
          </p>
        </div>

        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model="data.password"
            class="w-full bg-transparent border-b border-green-400 outline-none py-1" />

          <p v-for="(error, index) in errors.password" :key="index" class="mt-1 text-sm text-red-500">
            {{ error }}
          </p>
        </div>

        <div>
          <label for="passwordConfirmation">Repeat Password</label>
          <input type="password" name="passwordConfirmation" id="passwordConfirmation"
            v-model="data.password_confirmation"
            class="w-full bg-transparent border-b border-green-400 outline-none py-1" />
        </div>

        <div>
          <button type="submit"
            class="w-full mt-6 border border-green-400 py-2 hover:bg-green-400 hover:text-black transition">
            Create an Account</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Already have an Account?
        {{ ' ' }}
        <RouterLink :to="{ name: 'Login' }" class="font-semibold text-indigo-600 hover:text-green-500">
          Login here
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
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const errors = ref({
  name: [],
  email: [],
  password: [],
});

const userStore = useUserStore();

function submit() {
  userStore.registerUser(data.value)
    .then(() => {
      router.push({ name: 'Home' });  // Redirect on successful login
    })
    .catch(error => {
      console.error('Signup failed:', error);
      errors.value = error.response.data.errors;
    });
}

</script>

<style scoped></style>
