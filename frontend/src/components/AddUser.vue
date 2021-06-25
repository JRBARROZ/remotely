<template>
  <div class="flex flex-col items-center justify-center mt-7">
    <h1 class="text-3xl mb-4 text-gray-700">Add User</h1>
    <div class="w-11/12 sm:w-8/12 lg:w-6/12 px-6 sm:px-16">
      <form action="#" class="flex flex-col gap-1" autocomplete="off">
        <label for="name" class="text-sm mt-2 font-medium">Name: *</label>
        <input
          type="text"
          class="border pl-2 rounded text-gray-600 h-8" 
          id="name"
          v-model="currentUser.name"
        />
        <label for="email" class="text-sm mt-2 font-medium">E-mail: *</label>
        <input
          type="text"
          class="border pl-2 rounded text-gray-600 h-8" 
          id="email"
          v-model="currentUser.email"
        />
        <label for="password" class="text-sm mt-2 font-medium">Password: *</label>
        <input
          type="password"
          class="border pl-2 rounded text-gray-600 h-8" 
          id="password"
          v-model="currentUser.password"
        />
        <label for="confirm_password" class="text-sm mt-2 font-medium">Confirm Password: *</label>
        <input
          type="password"
          class="border pl-2 rounded text-gray-600 h-8" 
          id="confirm_password"
          v-model="currentUser.password_confirmation"
        />
        <button
          class="mt-3 py-2 bg-green-600 text-white focus:outline-none 
          border-none rounded"
          type="submit"
          @click.prevent="handleSubmit()"
        >Add</button>
      </form>
    </div>
    <div
      v-if="status.length > 0"
      class="border rounded py-3 px-8 mt-6"
      :class="status[0] === 'success' ? 'bg-green-300 text-green-700 border-green-700' : 
        status[0] === 'error' ? 'bg-red-300 text-red-700 border-red-700' :
        status[0] === 'warning' ? 'bg-yellow-300 text-yellow-700 border-yellow-700' : ''"
    >
      <span v-if="typeof status[1] === 'string'">
        {{ status[1] }}
      </span>
      <ul v-else class="list-inside">
        <li v-for="(stat, index) in status[1]" :key="index">
          {{ stat }}
        </li>
      </ul>
    </div>
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
      .then((res) => {
        if (res.status === 201) this.$router.push('/login');
      });
    },
  },
}
</script>