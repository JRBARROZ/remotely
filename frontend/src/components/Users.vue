<template>
  <div class="flex flex-col items-center mt-7">
    <h2>{{ removeStatus }}</h2>
    <h1 class="text-3xl text-gray-700 mb-4">Users</h1>
    <div class="flex flex-col w-96 px-6 py-2 bg-gray-300 rounded border border-gray-700 mb-2"
      v-for="(user, index) of allUsers" :key="user.id">
      <span><b>Name:</b> {{ user.name }}</span>
      <span><b>E-mail:</b> {{ user.email }}</span>
      <button @click="remove(user.id, index)"
        class="px-4 py-2 bg-red-500 text-white rounded w-max mt-4"
      >Remove</button>
    </div>
    <div v-if="allUsers.length == 0">
      <h2 class="text-2xl text-gray-700">There are no users to show</h2>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Users',
  created() {
    this.$store.dispatch('getUsers');
  },
  computed: {
    ...mapState(['allUsers', 'removeStatus'])
  },
  methods: {
    remove(id, index) {
      this.$store.dispatch('removeUser', [id, index]);
    }
  }
}
</script>