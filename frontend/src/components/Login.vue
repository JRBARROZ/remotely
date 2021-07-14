<template>
  <div class="flex flex-col items-center justify-center mt-7">
    <h1 class="text-3xl text-gray-700 mb-4">Login</h1>
    <form action="#" class="flex flex-col gap-1 w-11/12 sm:w-8/12 lg:w-6/12 px-6 sm:px-16" autocomplete="off">
      <label for="email" class="text-sm mt-2 font-medium">E-mail: *</label>
      <input
        type="text"
        class="pl-2 text-gray-600 border rounded h-8" 
        id="emailLogin"
        v-model="loginData.email"
      />
      <label for="password" class="text-sm mt-2 font-medium">Password: *</label>
      <input
        type="password"
        class="pl-2 text-gray-600 border rounded h-8" 
        id="passwordLogin"
        v-model="loginData.password"
      />
      <button
        class="mt-3 py-2 bg-green-600 text-white focus:outline-none 
        border-none rounded hover:opacity-70"
        type="submit"
        @click.prevent="handleLogin()"
      >Login</button>
    </form>
    <div
      class="mt-6 rounded border py-3 px-8"
      :class="status[0] === 'success' ? 'bg-green-300 text-green-700 border-green-700' : 
        status[0] === 'error' ? 'bg-red-300 text-red-700 border-red-700' :
        status[0] === 'warning' ? 'bg-yellow-300 text-yellow-700 border-yellow-700' : ''"
      v-if="status.length > 0"
    >
      {{ status[1] }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    setTimeout(() => {
      this.$store.commit('resetStatus');
    }, 2500);
  },
  data(){
    return {
      loginData: {
        email: '',
        password: '',
      }
    }
  },
  name: 'Login',
  computed: {
    ...mapState(["status"])
  },
  methods: {
    handleLogin() {
      if (this.loginData.email.trim() === '' || this.loginData.password.trim() === '')
        return alert('all fields must be filled in');
      this.$store.dispatch('auth/signIn', this.loginData)
      .then((a) => {
        this.$router.push('/profile');
      });
    }
  },
}
</script>