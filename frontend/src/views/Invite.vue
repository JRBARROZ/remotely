<template>
  <div class="flex flex-col">
    <NavBar />
    <PageWrapper :title="entity.name" v-if="entity != null">
      <div class="mt-6 h-full">
        <h1 class="md:text-lg">Convide pessoas para {{this.$route.params.entity === 'org' ? 'a organização:' : 'o projeto:'}}</h1>
          <form action="#" @submit.prevent="handleSubmit" class="flex mx-6 gap-1 relative mt-4 h-10 sm:w-3/4 md:w-1/2 sm:mx-auto">
            <input type="email" id="invite-user" class="peer input focus:border-none invalid:border invalid:border-red-300 " placeholder="E-mail" v-model="inviteData.email">
            <label 
              for="invite-user"
              class="absolute left-2 -top-5
              text-input-text text-sm transition-all
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-3 peer-focus:-top-5
                peer-focus:left-0 peer-focus:text-title
                peer-focus:text-sm"
            >E-mail
            </label>
            <button
              class="py-2 bg-primary text-white focus:outline-none rounded hover:opacity-70 w-28 border-none"
              type="submit"
            >
              Enviar
            </button>
          </form>
      </div>
    </PageWrapper>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageWrapper from '@/components/PageWrapper.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  components: { PageWrapper, NavBar },
  computed:{
    ...mapState("organization", { orgList: (state) => state.orgList }),
    ...mapState("project", { projList: (state) => state.projList }),
  },
  data(){
    return {
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
      if (this.inviteData.email.trim() === "") {
        return alert("Todos os campos devem ser preenchidos");
      }
      
      this.inviteData.entityId = this.entity.id;
      this.$store.dispatch('invitation/invite', this.inviteData);
    }
  },
  created(){
    this.getEntity();
  },
}
</script>