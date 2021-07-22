<template>
  <Nav />
  <div style="margin-top:3.5rem">
    <ChatForm />
    <div>Room</div>
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import Nav from '../components/Header.vue';
import ChatForm from '../components/ChatForm.vue';
import getUser from '../composables/getUser';

export default {
  name: 'Room',
  components: {
    Nav,
    ChatForm,
  },

  setup() {
    const router = useRouter();
    const { user } = getUser();

    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'Login' });
      }
    });
  },
};
</script>

<style></style>
