<template>
  <div class="flex flex-col items-center justify-center mt-7">
    <h1 class="text-3xl mb-4 text-gray-700">Add User</h1>
    <div class="w-screen px-16">
      <form action="#" class="flex flex-col gap-1" autocomplete="off">
        <label for="name">Name: *</label>
        <input type="text" class="focus:outline-none border rounded h-8" 
          id="name" v-model="currentUser.name" />
        <label for="email">E-mail: *</label>
        <input type="text" class="focus:outline-none border rounded h-8" 
          id="email" v-model="currentUser.email" />
        <label for="password">Password: *</label>
        <input type="password" class="focus:outline-none border rounded h-8" 
          id="password" v-model="currentUser.password" />
        <label for="confirm_password">Confirm Password: *</label>
        <input type="password" class="focus:outline-none border rounded h-8" 
          id="confirm_password" v-model="currentUser.password_confirmation" />
        <button class="mt-3 py-2 bg-green-600 text-white focus:outline-none 
        border-none rounded" type="submit" @click.prevent="handleSubmit()">Add</button>
      </form>
    </div>
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
      currentUser: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  name: 'AddUser',
  computed: {
    ...mapState('auth', {status: state => state.status})
  },
  methods: {
    handleSubmit() {
      if (this.currentUser.name.trim() === '' || this.currentUser.email.trim() === '' || 
        this.currentUser.password.trim() === '') return alert('all fields must be filled in');
      this.$store.dispatch('auth/signUp', this.currentUser)
      .then(this.$router.push('/login'));
    },
  },
}
</script>