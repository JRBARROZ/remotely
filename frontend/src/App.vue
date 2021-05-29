<template>
  <div>
    <div class="flex justify-center items-center gap-2">
      <router-link to="/">Home</router-link> |
      <router-link to="/add">Add User</router-link> |
      <router-link to="/users">Users</router-link> |
      <span v-if="Object.keys(user).length !== 0">Hello, {{ user.name }} - </span>
      <button class="focus:outline-none" v-if="Object.keys(user).length !== 0" @click="logout">Logout</button>
      <router-link v-else to="/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style lang="scss">
</style>
