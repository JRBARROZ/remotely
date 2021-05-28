<template>
  <div class="flex flex-col items-center justify-center mt-7">
    <h1>Add user</h1>
    <form action="#" class="flex flex-col gap-2" autocomplete="off">
      <label for="name">Name: *</label>
      <input type="text" class="focus:outline-none border-b-2 border-black" 
        id="name" v-model="currentUser.name" />
      <label for="email">E-mail: *</label>
      <input type="text" class="focus:outline-none border-b-2 border-black" 
        id="email" v-model="currentUser.email" />
      <label for="password">Password: *</label>
      <input type="password" class="focus:outline-none border-b-2 border-black" 
        id="password" v-model="currentUser.password" />
      <button class="mt-3 py-2 bg-green-600 text-white focus:outline-none 
      border-none rounded" type="submit" @click.prevent="handleSubmit()">Add</button>
    </form>
    <span class="mt-6">
      {{ addStatus }}
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
      }
    }
  },
  name: 'AddUser',
  computed: {
    ...mapState(['addStatus'])
  },
  methods: {
    handleSubmit() {
      if (this.currentUser.name.trim() === '' || this.currentUser.email.trim() === '' || 
        this.currentUser.password.trim() === '') return alert('all fields must be filled in');
      this.$store.dispatch('addUser', this.currentUser);
    }
  },
}
</script>