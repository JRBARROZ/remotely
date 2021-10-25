<template>
  <div class="flex flex-col">
    <NavBar />
    <PageWrapper :title="entity.name" v-if="entity != null">
      <div class="mt-6 h-full">
        <h1 class="md:text-lg">Convide pessoas para {{this.$route.params.entity === 'org' ? 'a organização:' : 'o projeto:'}}</h1>
          <form action="#" @submit.prevent="handleSubmit" class="flex justify-center mx-6 gap-1 relative mt-4 h-10 sm:w-3/4 md:w-1/2 sm:mx-auto">
            <Input id="invite-user" type="email" labelText="E-mail" v-model:value="this.inviteData.email" class="mt-0 w-80"/>
            <button
              class="py-2 bg-primary text-white focus:outline-none rounded hover:opacity-70 w-28 border-none flex items-center justify-center"
              :class="this.disabledButton ? 'disabled:bg-input-disabled disabled:bg-opacity-50' : ''"
              type="submit"
              :disabled="this.disabledButton"
            >
              <span v-if="status.length === 0 || status[1] !== 'loading'">Enviar</span>
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-else>
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </form>
      </div>
      <StatusMessage :status="this.status" />
    </PageWrapper>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageWrapper from '@/components/PageWrapper.vue';
import NavBar from '@/components/NavBar.vue';
import StatusMessage from '../components/StatusMessage.vue';
import Input from '../components/Input.vue';

export default {
  components: { PageWrapper, NavBar, StatusMessage, Input},
  computed:{
    ...mapState(["status"]),
    ...mapState("organization", { orgList: (state) => state.orgList }),
    ...mapState("project", { projList: (state) => state.projList }),
  },
  watch: {
    $route: function(to, from){
      this.$store.commit('resetStatus');
    }
  },
  data(){
    return {
      disabledButton: false,
      entity: null,
      inviteData: {
        email: "",
        entityType: this.$route.params.entity ?? null,
        entityId: null
      }
    }
  },
  methods: {
    getEntity(){
      if (this.inviteData.entityType === "org"){
        this.orgList.forEach( org => {
          if(org.id == this.$route.params.id){
            this.entity = org;
            return;
          }
        });
      } else if (this.inviteData.entityType === "proj"){
        this.projList.forEach( proj => {
          if(proj.id == this.$route.params.id){
            this.entity = proj;
            return;
          }
        });
      }
      if(this.entity === null) this.$router.push('/404');
    },
    handleSubmit(){
      if (this.inviteData.email.trim() === "")
        return alert("all fields must be filled in");
        this.inviteData.entityId = this.entity.id;
        this.$store
          .dispatch('invitation/invite', this.inviteData)
          .finally(() => this.disabledButton = false);
        this.$store.commit('request');
        this.disabledButton = true;
    }
  },
  created(){
    this.getEntity();
  },

}
</script>