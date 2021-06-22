<template>
  <div>
    <div class="flex justify-center items-center gap-4 my-3">
      <router-link to="/">Home</router-link>
      <router-link to="/register" v-if="this.token.length === 0">Add User</router-link>
      <button class="focus:outline-none" v-if="this.token.length > 0" @click="logout">Logout</button>
      <router-link to="/profile" v-if="this.token.length > 0">Profile</router-link>
      <router-link v-else to="/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
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
