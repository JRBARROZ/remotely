<template>
  <div class="flex flex-col items-center h-max">
    <NavBar />
    <h2
      class="text-xl text-gray-700 mt-4"
      v-if="Object.keys(loggedUser).length === 0"
    >
      Loading... Please, wait
    </h2>
    <div class="flex flex-col items-center gap-2 mr-2" v-else>
      <img src="../assets/profile_pic.svg" alt="generic-profile-pic">
      <h2 class="text-xl text-gray-700 mt-4">Seja bem-vindo(a), {{ loggedUser.name }}</h2>
      <div class="flex flex-col shadow-lg">
        <div class="bg-primary w-72 h-7 rounded-tl-md rounded-tr-md pl-4 pt-1">
          <h1 class="font-comfoorta text-white">Organizações</h1>
        </div>
        <div class="flex flex-wrap gap-1 bg-ice w-72 h-20 pl-4 pt-1">
          <p class="font-comfoorta text-medium-dark-purple font-light" v-for="(org, index) in orgList" :key="index" >{{org.name}}</p>

        </div>
      </div>
    </div>
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
    ...mapState("organization", { orgList: (state) => state.orgList }),
  },
  created() {
    this.$store.dispatch("organization/setList");
    this.$store.dispatch("project/setList");
    this.$store.dispatch("task/setList");
  },
  methods: {},
};
</script>