<template>
  <div class="container">
    hello, welcome
    <Signup />
    <Login />
  </div>
</template>

<script>
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';

export default {
  name: 'Home',
  components: {
    Signup,
    Login,
  },
};
</script>

<style>
.container {
  background-color: #4d4983;
  min-height: 100vh;
}
</style>
