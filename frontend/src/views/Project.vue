<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <PageWrapper :title="title">
      <div class="mt-6" v-if="projList.length === 0 && addProject === false">
        <h1 class="font-lexend mx-4 md:text-lg">Você não tem nenhum projeto,<br>
           crie um agora.</h1>
      </div>
      <ProjectComp :projList="projList" />
    </PageWrapper>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
import ProjectComp from '@/components/ProjectComp.vue';

export default {
  components: { NavBar, PageWrapper, ProjectComp },
  computed: {
    ...mapState("task", {
      addTask: (state) => state.addTask,
    }),
    title: function () {
      if(!this.addProject && !this.addTask){
        return "Meus Projetos";
      } else if(this.addProject){
        return "Adicionar Projeto";
      } else {
        return "Adicionar tarefa";
      }
    },
    ...mapState("project", {
      projList: (state) => state.projList,
      addProject: (state) => state.addProject,
    }),
  },
};
</script>