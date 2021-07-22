<template>
  <form class="chat__form">
    <div class="chat__bar" style="width: 100%">
      <div style="width:70%">
        <textarea
          style="width:100%"
          class="chat__input"
          @keypress.enter.prevent="handleSubmit"
          v-model="message"
          placeholder="type a message..."
        ></textarea>
      </div>
      <div class="button__container">
        <div @click.prevent="handleSubmit">
          <span class="material-icons send">
            send
          </span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import getUser from '../composables/getUser';
import useCollection from '../composables/useCollection';
import { timestamp } from '../firebase/config';

export default {
  name: 'ChatForm',
  setup() {
    const message = ref('');
    const { user } = getUser();
    const { addDoc, error } = useCollection('messages');

    const handleSubmit = async () => {
      const chat = {
        message: message.value,
        name: user.value.displayName,
        createdAt: timestamp(),
      };

      await addDoc(chat);

      if (!error.value) {
        message.value = '';
      }

      console.log(chat);
    };

    return { message, handleSubmit, error };
  },
};
</script>

<style>
.chat__form {
  display: flex;
  border-radius: 7px;
  flex-direction: column;
  justify-content: flex-end;
  padding: 7px 1rem;
}

.chat__input {
  border: none;
  /* margin-bottom: 1rem; */
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

.button__container div {
  border-radius: 50%;
  height: 30px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4d4983;
  width: 30px;
  margin-right: 0.5px;
}

.send {
  color: white;
  cursor: pointer;
}
</style>
