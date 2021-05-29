<template>
  <div class="flex flex-col items-center justify-center mt-7">
    <h1 class="text-2xl text-gray-700 mb-4">Login</h1>
    <form action="#" class="flex flex-col gap-2" autocomplete="off">
      <label for="email">E-mail: *</label>
      <input type="text" class="focus:outline-none border-b-2 border-black" 
        id="emailLogin" v-model="loginData.email" />
      <label for="password">Password: *</label>
      <input type="password" class="focus:outline-none border-b-2 border-black" 
        id="passwordLogin" v-model="loginData.password" />
      <button class="mt-3 py-2 bg-green-600 text-white focus:outline-none 
      border-none rounded" type="submit" @click.prevent="handleLogin()">Login</button>
    </form>
    <span class="mt-6">
      {{ loginStatus }}
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
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
    ...mapState(['loginStatus', 'user'])
  },
  methods: {
    handleLogin() {
      if (this.loginData.email.trim() === '' || this.loginData.password.trim() === '')
        return alert('all fields must be filled in');
      this.$store.dispatch('authenticateUser', this.loginData);
    }
  },
}
</script>