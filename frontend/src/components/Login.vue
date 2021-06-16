<template>
  <div class="flex flex-col items-center justify-center mt-7">
    <h1 class="text-3xl text-gray-700 mb-4">Login</h1>
    <form action="#" class="flex flex-col gap-1 w-screen px-16" autocomplete="off">
      <label for="email">E-mail: *</label>
      <input type="text" class="focus:outline-none border rounded h-8" 
        id="emailLogin" v-model="loginData.email" />
      <label for="password">Password: *</label>
      <input type="password" class="focus:outline-none border rounded h-8" 
        id="passwordLogin" v-model="loginData.password" />
      <button class="mt-3 py-2 bg-green-600 text-white focus:outline-none 
      border-none rounded hover:opacity-70" type="submit" @click.prevent="handleLogin()">Login</button>
    </form>
    <span class="mt-6">
      {{ status }}
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
    ...mapState('auth', {status: state => state.status})
  },
  methods: {
    handleLogin() {
      if (this.loginData.email.trim() === '' || this.loginData.password.trim() === '')
        return alert('all fields must be filled in');
      this.$store.dispatch('auth/signIn', this.loginData)
      .then(() => {
        this.$router.push('/profile');
      });
    }
  },
}
</script>