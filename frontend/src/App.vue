<template>
  <div>
    <div class="flex justify-center items-center gap-4 my-3">
      <router-link
        class="text-xl font-medium text-gray-600 px-3"
        to="/"
      >
        Home
      </router-link>
      <router-link
        class="text-xl font-medium text-gray-600 px-3"
        to="/register"
        v-if="Object.keys(loggedUser).length === 0"
      >
        Register
      </router-link>
      <router-link
        class="text-xl font-medium text-gray-600 px-3"
        to="/profile"
        v-if="Object.keys(loggedUser).length > 0"
      >
        Profile
      </router-link>
      <router-link
        class="text-xl font-medium text-gray-600 px-3"
        to="/organization"
        v-if="Object.keys(loggedUser).length > 0"
      >
        Organizations
      </router-link>

      <router-link
        class="text-xl font-medium text-gray-600 px-3"
        to="/project"
        v-if="Object.keys(loggedUser).length > 0"
      >
        Projects
      </router-link>

      <button
        class="focus:outline-none text-xl font-medium text-gray-600 px-3"
        v-if="Object.keys(loggedUser).length > 0"
        @click="logout"
      >
        Logout
      </button>
      <router-link
        class="text-xl font-medium text-gray-600 px-3"
        to="/login"
        v-else
      >
        Login
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('auth', {loggedUser: state => state.loggedUser})
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
