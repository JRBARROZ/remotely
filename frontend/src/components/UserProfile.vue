<template>
  <div class="flex flex-col items-center mt-7">
    <h2>Welcome, {{ loggedUser.name }}</h2>
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