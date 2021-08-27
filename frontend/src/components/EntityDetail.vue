<template>
  <div>
    <NavBar />
    <PageWrapper :title="organization.name" :invite="true" :link="'/invite/org/' + organization.id">
      <ProjectComp :projList="updatedProjList" :ownerOrg="this.organization"/>
    </PageWrapper>
  </div>
</template>

<script>

import { mapState } from "vuex";
import PageWrapper from './PageWrapper.vue';
import NavBar from './NavBar.vue';
import ProjectComp from './ProjectComp.vue';

export default {
  components: { PageWrapper, ProjectComp, NavBar },
  computed:{
    ...mapState("organization", { orgList: (state) => state.orgList }),
    ...mapState("task", { addTask: (state) => state.addTask}),
    updatedProjList: function(){
      this.getOrg();
      return this.projList;
    }
  },

  data(){
    return {
      organization: null,
      projList: null,
      projData: {
        id: null,
        name: null,
        status: "Iniciado",
        orgId: null,
      },
      taskData: {
        id: null,
        title: "",
        description: "",
        status: "Iniciado",
        projId: null,
        deadline: null,
      },
    }
  },
  methods: {
    getOrg(){
      this.orgList.forEach( org => {
        if(org.id == this.$route.params.id){
          this.organization = org;
          this.projList = this.organization.projects;
          return;
        }
      });
    },
  },
  created(){
    this.getOrg();
  }
}
</script>