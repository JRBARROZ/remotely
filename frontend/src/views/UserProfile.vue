<template>
  <div class="flex flex-col items-center h-max">
    <NavBar />
    <h2
      class="text-xl text-gray-700 mt-4"
      v-if="Object.keys(loggedUser).length === 0"
    >
      Carregando... Por favor, aguarde.
    </h2>
    <div class="flex flex-col items-center gap-2 mr-2 mt-4" v-else>
      <img src="../assets/profile_pic.svg" alt="generic-profile-pic">
      <h2 class="text-xl text-gray-700 dark:text-gray-200 mt-4">Seja bem-vindo(a), {{ loggedUser.name }}</h2>
      <div class="flex flex-col w-screen px-6 sm:px-8 md:px-28 lg:px-48 xl:px-80">
        <div class="bg-primary dark:bg-skin h-10 rounded-tl-md rounded-tr-md px-4 py-2">
          <h1 class="text-white text-center md:text-lg">Suas Organizações</h1>
        </div>
        <div class="flex flex-col gap-1 sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 
          bg-ice dark:bg-medium-purple px-4 py-3 max-h-80 md:max-h-108 overflow-y-auto shadow-lg">
          <div
            class="bg-light-purple px-3 py-1 transition-all rounded hover:bg-skin cursor-pointer
              group hover:bg-opacity-70"
            v-for="(org, index) in orgList"
            :key="index"
            @click="this.$router.push('/organization/' + org.id)">
            <span class="font-comfoorta text-medium-dark-purple font-light
             group-hover:text-white" >{{org.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from '@/components/NavBar.vue';
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
    this.$store.dispatch("invitation/getList");
  },
  methods: {},
};
</script>