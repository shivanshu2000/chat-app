<template>
  <form @submit.prevent="handleSubmit">
    <div class="title">Login</div>
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

    <button>Log in</button>
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
export default {
  name: 'Signup',
  setup() {
    const email = ref('');
    const password = ref('');

    const handleSubmit = () => {
      console.log('here');
    };
    return { email, password, handleSubmit };
  },
};
</script>

<style>
form {
  max-width: 600px;
}
</style>
