<template>
  <div>
    <div class="flex justify-center items-center gap-2">
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Add User</router-link> |
      <button class="focus:outline-none" v-if="this.token.length > 0" @click="logout">Logout</button>
      <router-link to="/profile" v-if="this.token.length > 0">Profile</router-link>
      <router-link v-else to="/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
const axios = require('axios').default;

export default {
  // created() {
  //   axios.interceptors.response.use(undefined, (error) => {
  //     return new Promise((resolve, reject) => {
  //       if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
  //         this.$store.dispatch('auth/logout');  
  //       }
  //       throw error;
  //     })
  //   })
  // },
  updated() {

  },
  computed: {
    ...mapState('auth', { token: state => state.token})
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      .then(() => {
        this.$router.push('/login');
      });
    }
  }
}
</script>

<style lang="scss">
</style>
