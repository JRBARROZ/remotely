<template>
  <div>
    <NavBar :isProject="this.isProject" :isOrganization="this.isOrganization" />
    <PageWrapper :title="title" :invite="true" :link="'/invite/' + inviteLink">
      <h2 v-if="this.updatedProjList.length === 0" class="mt-10 text-xl text-title dark:text-gray-200">Esta organização ainda não tem nenhum projeto.</h2>
      <ProjectComp :projList="updatedProjList" :ownerOrg="ownerOrg" :showAddProjectButton="showAddButton"/>
    </PageWrapper>
  </div>
</template>

<script>

import { mapState } from "vuex";
import PageWrapper from './PageWrapper';
import NavBar from './NavBar';
import ProjectComp from './ProjectComp';

export default {
  components: { PageWrapper, ProjectComp, NavBar },
  computed:{
    ...mapState("organization", { orgList: (state) => state.orgList }),
    ...mapState("task", { addTask: (state) => state.addTask}),
    ...mapState("project", { 
      addProject: (state) => state.addProject,
      projList: (state) => state.projList
    }),
    inviteLink: function () {
      if(this.$route.params.entity === "organization"){
        return "org/" + this.organization.id
      } else if(this.$route.params.entity === "project"){
        return "proj/" + this.project.id
      } else {
        return null
      }
    },
    ownerOrg: function () {
      if(this.$route.params.entity === "organization"){
        return this.organization;
      } else {
        return null;
      }
    },
    updatedProjList: function () {
      if(this.organization){
        return this.organization.projects;
      } else {
        return [this.project];
      }
    },
    title: function () {
      if(this.organization){
        if(!this.addProject && !this.addTask){
          return this.organization.name;
        } else if(!this.addProject && this.addTask){
          return "Adicionar tarefa";
        } else {
          return "Adicionar projeto";
        }
      } else {
        if(!this.addProject && !this.addTask){
          return this.project.name;
        } else if(!this.addProject && this.addTask){
          return "Adicionar tarefa";
        } else {
          return "Adicionar projeto";
        }
      }
    },
    getEntityInfo: function () {
      if(this.$route.params.entity === "organization"){
        this.orgList.forEach( org => {
          if(org.id === parseInt(this.$route.params.id)){
            this.organization = org;
            return;
          }
        });
        return this.organization
      } else if(this.$route.params.entity === "project"){
          this.projList.forEach( proj => {
            if(proj.id == parseInt(this.$route.params.id)){
              this.project = proj;
              return;
            }
          })
        return this.project
      } 
      return null;
    },
    showAddButton: function () {
      return this.organization ? true : false;
    }
  },
  data(){
    return {
      organization: null,
      project: null,
      isProject: false,
      isOrganization: false,
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
  created(){
    this.getEntityInfo
  },
  mounted() {
    const path = this.$router.currentRoute._value.fullPath;
		const val = path.slice(1);

    if (val.indexOf('organization') !== -1) this.handleChange('organization')
    if (val.indexOf('project') !== -1) this.handleChange('project')
  },
  updated() {
    const path = this.$router.currentRoute._value.fullPath;
		const val = path.slice(1);

    if (val.indexOf('organization') !== -1) this.handleChange('organization')
    if (val.indexOf('project') !== -1) this.handleChange('project')
  },
  beforeUpdate(){
    this.organization = null;
    this.getEntityInfo;
  },
  methods: {
    handleChange(value) {
      if (value === "organization") {
        this.isOrganization = true;
        this.isProject = false;
      }
      if (value === "project") {
        this.isProject = true;
        this.isOrganization = false;
      }
    }
  }
}
</script>