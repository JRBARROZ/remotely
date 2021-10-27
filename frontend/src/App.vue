<template>
  <div :class="this.theme" class="">
    <div class="relative dark:bg-dark h-screen transition-all duration-300" >
      <Menu :logout="logout" v-if="Object.keys(loggedUser).length > 0" />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Menu from "@/components/Menu";

export default {
  components: {
    Menu,
  },
  computed: {
    ...mapState("auth", { loggedUser: (state) => state.loggedUser }),
    ...mapState(["emailValidated", "theme"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style lang="scss">
</style>
