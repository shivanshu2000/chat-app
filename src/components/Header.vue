<template>
  <nav>
    <div class="header" v-if="user">
      <!-- <div style="color:white" class="title">Room</div> -->
      <div class="left__items">
        <p class="header__name">Hello, {{ user.displayName.split(' ')[0] }}</p>
      </div>
      <div class="right__items">
        <button @click.prevent="handleSignout" style="margin-right:0">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import useLogout from '../composables/useLogout';
import getUser from '../composables/getUser';
import { useRouter } from 'vue-router';

export default {
  name: 'Nav',
  setup() {
    const router = useRouter();
    const { error, logout } = useLogout();
    const { user } = getUser();
    const handleSignout = async () => {
      await logout();
    };
    return { handleSignout, user };
  },
};
</script>

<style>
nav {
  z-index: 999;
  width: 100%;
  background: white;
  position: fixed;
  top: 0;
  color: white;
  padding: 0.3rem 0;
  background: #4d4983;
  box-shadow: 10px 10px 60px #413e6f, -20px -20px 60px #595497;
  left: 0;
}

nav .right__items {
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: flex-end;
}

nav .right__items button {
  background-color: white;
  color: #4d4983;
}

nav .header {
  width: 100%;
  background: transparent;
  padding: 0 1.5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__name {
  font-style: italic;
  color: white;
  font-size: 2.5rem;
  letter-spacing: 1.5px;
  font-family: 'Italianno', cursive;
  font-weight: bold;
  margin: 0;
}

@media only screen and (max-width: 530px) {
  .left__items {
    display: none;
  }

  nav .header {
    justify-content: flex-end;
  }
}
</style>
