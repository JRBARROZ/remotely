<template>
  <div class="flex flex-col items-center justify-center mt-7">
    <h1 class="text-3xl mb-4">Home page</h1>
    <h2 class="text-xl" v-if="Object.keys(this.loggedUser).length !== 0">
      Hello, {{ this.loggedUser.name }}
    </h2>
    <h2 class="text-xl" v-else>There are no user logged in</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
// @ is an alias to /src

export default {
  name: "Home",
  async created() {
    if (this.isLoggedIn) {
      try {
        const response = this.$store.dispatch("getLoggedUser");
        console.log("res", response);
      } catch (error) {
        console.log(error.response);
      }
    }
  },
  computed: {
    ...mapState('auth', {loggedUser: state => state.loggedUser}),
  },
  methods: {
    async getLoggedUser() {},
  },
};
</script>
