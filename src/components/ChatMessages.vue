<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div class="top__header">
    <div>{{ user?.displayName }}</div>
    <div class="email">
      <span style="color:black">Signed in as: </span> {{ user?.email }}
    </div>
  </div>
  <div class="divider"></div>
  <div v-if="!documents" class="spinner__container">
    <Spinner />
  </div>
  <div v-if="formattedDocuments?.length === 0" class="indicator">
    <div>
      Start a chat...
    </div>
  </div>

  <div v-if="documents" class="messages" ref="messages">
    <div
      :class="{ right: document.name === user?.displayName }"
      v-for="document in formattedDocuments"
      :key="document.id"
      class="message"
    >
      <div class="message__block">
        <div class="upper__text">
          <div class="inner__message-block">
            <div>{{ document.message }}</div>
          </div>
        </div>
        <div class="name__date-container">
          <div class="name__date">
            <div class="createdAt">{{ document.createdAt }} ago</div>
            <div class="name" style="margin-left:17px">
              ~
              {{ document.name === user?.displayName ? 'You' : document.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection';
import getUser from '../composables/getUser';
import Spinner from './Spinner.vue';

import { formatDistanceToNow } from 'date-fns';
import { computed, onUpdated, ref, watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

export default {
  name: 'ChatMessages',
  components: {
    Spinner,
  },
  setup() {
    const { user } = getUser();
    const { error, documents } = getCollection('messages');
    const router = useRouter();

    const messages = ref(null);
    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'Login' });
      }
    });

    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight;
    });

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value
          .map((doc) => {
            const time = formatDistanceToNow(doc.createdAt.toDate());
            return { ...doc, createdAt: time };
          })
          .reverse();
      }
    });

    return { error, documents, user, formattedDocuments, messages };
  },
};
</script>

<style>
.spinner__container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.messages {
  max-height: 350px;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 0 0.65rem;
}

.indicator {
  color: #4d4983;
  font-size: 1.2rem;
  padding: 2.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  align-items: flex-start;
}

.right {
  align-items: flex-end;
}

.name__date {
  color: #00000080;
  flex-wrap: wrap;
  padding-right: 7px;
  margin-top: 7px;
  display: flex;
  width: 90%;
  justify-content: flex-end;
}

.right .message__block {
  justify-content: flex-end;
}

.name__date-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.message__block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  background: white;
  padding: 5px 15px;
  margin: 9px 0;
  border-radius: 23px;
  width: 40%;
  /* text-align: left; */
}

.upper__text {
  display: flex;
  justify-content: flex-start;
}

.right .message__block .upper__text {
  justify-content: flex-end;
}

.message__block .upper__text {
  width: 100%;
}

@media only screen and (max-width: 750px) {
  .message__block {
    width: 50%;
  }
}

@media only screen and (max-width: 545px) {
  .message__block {
    width: 63%;
    margin: 13px 0;
  }
}

.inner__message-block {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media only screen and (max-width: 545px) {
  .inner__message-block {
    width: 90%;
  }
}

@media only screen and (max-width: 350px) {
  .name__date-container {
    width: 100%;
  }
}

.right .message__block .inner__message-block {
  align-items: flex-end;
}

.top__header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0rem 1.5rem;
  font-weight: bold;
  color: #4d4983;
}

.email {
  font-weight: normal;
  margin-top: 15px;
}
</style>
