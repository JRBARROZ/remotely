<template>
  <div class="flex flex-col items-center justify-center mt-7">
    <h1 class="text-3xl mb-4">Home page</h1>
    <h2 class="text-xl" v-if="Object.keys(this.user).length !== 0">Hello, {{ this.user.name }}</h2>
    <h2 class="text-xl" v-else>There are no user logged in</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// @ is an alias to /src

export default {
  name: 'Home',
  created() {
    if (Object.keys(this.user).length !== 0) {
      // this.$cookies.set(`logged_user`, this.user, '30min');
      console.log('logged user');
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
