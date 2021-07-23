<template>
  <form class="chat__form">
    <div class="chat__bar" style="width: 100%">
      <div style="width:70%">
        <textarea
          style="width:100%"
          class="chat__input"
          @keypress.enter.prevent="handleSubmit"
          v-model="message"
          placeholder="Type a message..."
        ></textarea>
      </div>
      <div class="button__container">
        <button
          :class="{ grey: disable }"
          :disabled="disable"
          @click.prevent="handleSubmit"
        >
          <span class="material-icons send">
            send
          </span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import getUser from '../composables/getUser';
import useCollection from '../composables/useCollection';
import { timestamp } from '../firebase/config';
import { watch } from '@vue/runtime-core';

export default {
  name: 'ChatForm',
  setup() {
    const message = ref('');
    const { user } = getUser();
    const { addDoc, error } = useCollection('messages');

    const disable = ref(true);

    watch(message, () => {
      if (message.value.length === 0) {
        disable.value = true;
      } else {
        disable.value = false;
      }
    });
    const handleSubmit = async () => {
      if (message.value.length === 0) {
        return;
      }

      const chat = {
        message: message.value,
        name: user.value.displayName,
        createdAt: timestamp(),
      };

      await addDoc(chat);

      if (!error.value) {
        message.value = '';
      }
    };

    return { message, handleSubmit, error, disable };
  },
};
</script>

<style>
.chat__form {
  display: flex;
  background: #d1cfe9;
  border: none;
  padding: 7px 0;
  border: none;
}

.chat__input {
  border: none;
  background: #ffffff;
  max-height: 45px;
  outline: none;
  width: 80%;
  border-radius: 25px 0 0 25px;
  box-sizing: border-box;
  padding: 0.5rem 2rem;
  overflow-y: scroll;
  max-width: 100%;
  min-width: 100%;
}
.chat__input::-webkit-scrollbar {
  height: 0px;
  width: 0px;
}

.chat__bar {
  display: flex;
  justify-content: center;
}

.button__container {
  background: #ffffff;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 45px;
  border-radius: 0 25px 25px 0;
}

.button__container button {
  border-radius: 50%;
  height: 95%;
  padding: 5px;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;

  width: 40px;
  margin-right: 0.5px;
}

.send {
  color: white;
  cursor: pointer;
}

.grey {
  background-color: #ccc;
}
</style>
