<template>
  <form @submit.prevent="handleSubmit">
    <div class="title">Signup</div>
    <div class="inputs__container">
      <label>Name:</label>
      <input type="text" placeholder="Enter your name" v-model="displayName" />
    </div>
    <div class="inputs__container">
      <label>Email:</label>
      <input type="email" placeholder="Enter your email" v-model="email" />
    </div>
    <div class="inputs__container">
      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter your password"
        v-model="password"
      />
    </div>

    <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  name: 'Signup',
  setup() {
    const displayName = ref('');
    const email = ref('');
    const password = ref('');

    const handleSubmit = () => {
      console.log('here');
    };
    return { displayName, email, password, handleSubmit };
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
