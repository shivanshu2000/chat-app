<template>
  <form @submit.prevent="handleSubmit">
    <div class="title">Signup</div>
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
      <label>Name:</label>
      <input type="text" placeholder="Enter your name" v-model="displayName" />
    </div>
    <div class="inputs__container">
      <label>Email:</label>
      <input type="text" placeholder="Enter your email" v-model="email" />
      <div class="input__error" v-if="emailError">
        {{ emailError }}
      </div>
    </div>
    <div class="inputs__container">
      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter your password"
        v-model="password"
      />
      <div class="input__error" v-if="passwordError">
        {{ passwordError }}
      </div>
    </div>

    <button>
      {{ loading ? 'Signing up...' : 'Sign up' }}
    </button>

    <p>
      Already registerd?
      <span>
        <router-link class="links" :to="{ name: 'Login' }"
          >Login here!</router-link
        ></span
      >
    </p>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import useSignup from '@/composables/useSignup';
import { watch, onUnmounted } from '@vue/runtime-core';

export default {
  name: 'Signup',
  setup() {
    const displayName = ref('');
    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const validationError = ref(null);
    const passwordError = ref(null);
    const emailError = ref(null);

    const { error, signup } = useSignup();

    onUnmounted(() => {
      error.value = null;
    });

    watch(password, () => {
      if (password.value.length >= 6 && password.value.length <= 20) {
        passwordError.value = null;
      }
    });
    watch(email, () => {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email.value
        ) === true
      ) {
        emailError.value = null;
      }
    });

    const handleSubmit = async () => {
      console.log('here');
      passwordError.value = null;

      if (
        !!displayName.value === false ||
        !!email.value === false ||
        !!password.value === false
      ) {
        validationError.value = 'All fields are required';
        loading.value = false;
        return;
      }

      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email.value
        ) === false
      ) {
        emailError.value = 'Enter a valid email';
        return;
      }

      if (password.value.length < 6 || password.value.length > 20) {
        passwordError.value = 'Password should be 6 to 20 characters long';
        password.value = '';
        return;
      }
      if (!!displayName.value && !!email.value && !!password.value) {
        loading.value = true;
        await signup(displayName.value, email.value, password.value);

        displayName.value = '';
        email.value = '';
        password.value = '';

        loading.value = false;
        console.log(error);
        return;
      }
    };
    return {
      displayName,
      email,
      password,
      handleSubmit,
      error,
      validationError,
      loading,
      passwordError,
      emailError,
    };
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  border-radius: 15px;

  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.125);
}

label {
  display: block;
  margin-left: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #00000080;
  font-size: 13px;
  margin-bottom: 10px;
}

input {
  width: 100%;
  border: none;
  box-sizing: border-box;
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 0.7rem 0.8rem;
  color: #000000;
  margin-bottom: 1rem;
  background: #ffffff;
  box-shadow: inset 7px 7px 14px #e6e6e6, inset -7px -7px 14px #ffffff;
}

input:focus {
  outline: none;
  border-color: #00000050;
}

.title {
  font-style: italic;
  color: #4d4983;
  font-size: 4.5rem;
  font-family: 'Italianno', cursive;
  font-weight: bold;
  margin-bottom: 1rem;
}

::placeholder {
  color: #ccc;
}

input:focus ::placeholder {
  color: #4d4983;
}

button {
  letter-spacing: 0.5px;
  text-transform: capitalize;
  font-size: 1rem;
  display: block;
  border: none;
  cursor: pointer;
  background: #4d4983;
  color: white;
  padding: 0.7rem 1.2rem;
  border-radius: 25px;
  margin: 0 auto;
}

button:hover {
  background: #4d498395;
}

.inputs__container {
  width: 100%;
  box-sizing: border-box;
  margin: 10px 0;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
