<template>
  <form @submit.prevent="handleLogin">
    <div class="title">Login</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="validationError" class="error">
      {{ validationError }}
      <span
        style="margin-left: auto; cursor:pointer"
        @click="validationError = ''"
        >X</span
      >
    </div>
    <div class="inputs__container">
      <label>Email :</label>
      <input type="email" placeholder="Enter your email" v-model="email" />
    </div>
    <div class="inputs__container">
      <label>Password :</label>
      <input
        type="password"
        placeholder="Enter your password"
        v-model="password"
      />
    </div>

    <button>{{ loading ? 'Logging in...' : 'Log in' }}</button>
    <p style="margin-top:1rem">
      Don't have an account?
      <span>
        <router-link class="links" :to="{ name: 'Signup' }"
          >Register here!</router-link
        ></span
      >
    </p>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import useLogin from '../composables/useLogin';
import { onUnmounted } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
export default {
  name: 'Signup',
  setup() {
    const email = ref('');
    const password = ref('');
    const validationError = ref(null);
    const loading = ref(false);

    const router = useRouter();
    const { login, error } = useLogin();

    onUnmounted(() => {
      error.value = null;
    });
    const handleLogin = async () => {
      if (!!email.value === false || !!password.value == false) {
        validationError.value = 'Please enter all the fields';
        return;
      }
      if (!!email.value && !!password.value) {
        loading.value = true;
        await login(email.value, password.value);
        loading.value = false;

        // email.value = '';
        password.value = '';
        if (!error.value) {
          router.push({ name: 'Room' });
        }
        return;
      }
    };

    return { email, password, handleLogin, validationError, error, loading };
  },
};
</script>

<style>
form {
  max-width: 600px;
}
</style>
