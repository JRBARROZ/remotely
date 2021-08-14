<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <h2
      class="text-xl text-gray-700 mt-4"
      v-if="Object.keys(loggedUser).length === 0"
    >
      Loading... Please, wait
    </h2>
    <h2 class="text-xl text-gray-700 mt-4" v-else>Welcome, {{ loggedUser.name }}</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from './NavBar.vue';
export default {
  components: { NavBar },
  name: "UserProfile",
  computed: {
    ...mapState("auth", { loggedUser: (state) => state.loggedUser }),
  },
  created() {
    this.$store.dispatch("organization/setList");
    this.$store.dispatch("project/setList");
    this.$store.dispatch("task/setList");
  },
  methods: {},
};
</script>