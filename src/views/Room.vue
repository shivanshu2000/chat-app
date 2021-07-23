<template>
  <Nav />
  <div class="chat__window" style="margin-top:3.5rem">
    <ChatMessages />
    <div class="divider"></div>
    <ChatForm />
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import Nav from '../components/Header.vue';
import ChatForm from '../components/ChatForm.vue';
import ChatMessages from '../components/ChatMessages.vue';
import getUser from '../composables/getUser';

export default {
  name: 'Room',
  components: {
    Nav,
    ChatForm,
    ChatMessages,
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

<style>
.chat__window {
  border-radius: 15px;
  width: 90%;
  overflow: hidden;
  padding: 2.5rem 0.5rem 9px 0.5rem;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.125);
  margin: 0 auto;
}

@media only screen and (max-width: 320px) {
  .chat__window {
    width: 100%;
  }
}
</style>
