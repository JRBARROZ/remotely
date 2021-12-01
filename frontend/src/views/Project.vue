<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <PageWrapper :title="title">
      <div class="mt-6" v-if="projList.length === 0 && addProject === false">
        <h1 class="font-lexend mx-4 md:text-lg dark:text-gray-200">Você não tem nenhum projeto,<br>
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
      if(!this.addProject){
        return "Meus Projetos";
      } else {
        return "Adicionar Projeto";
      }
    },
    ...mapState("project", {
      projList: (state) => state.projList,
      addProject: (state) => state.addProject,
    }),
  },
};
</script>