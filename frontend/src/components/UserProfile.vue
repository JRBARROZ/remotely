<template>
  <div class="flex flex-col items-center mt-7">
    <h2 class="text-xl text-gray-700" v-if="Object.keys(loggedUser).length === 0">Loading... Please, wait</h2>
    <h2 class="text-xl text-gray-700" v-else>Welcome, {{ loggedUser.name }}</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserProfile",
  computed: {
    ...mapState("auth", { loggedUser: (state) => state.loggedUser }),
  },
  methods: {},
};
</script>