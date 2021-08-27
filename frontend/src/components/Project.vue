<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <PageWrapper :title="addProject ? 'Adicionar Projeto' : 'Meus Projetos'">
      <div class="mt-6" v-if="projList.length === 0 && addProject === false">
        <h1 class="font-lexend mx-4">Você não tem nenhum projeto,<br>
           crie um agora.</h1>
      </div>
      <ProjectComp :projList="projList" />
    </PageWrapper>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "./NavBar";
import Box from "./Box";
import BoxItem from "./BoxItem";
import MainButton from "./MainButton.vue";
import PageWrapper from "./PageWrapper";
import Input from "./Input";
import ProjectComp from './ProjectComp.vue';

export default {
  components: { NavBar, PageWrapper, Box, BoxItem, MainButton, Input, ProjectComp },
  data() {
    return {
      showModal: false,
      showTaskModal: false,
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
    };
  },
  computed: {
    ...mapState("task", {
      taskList: (state) => state.taskList,
      addTask: (state) => state.addTask,
    }),
    ...mapState({ addItem: (state) => state.addItem }),
    ...mapState("organization", { orgList: (state) => state.orgList }),
    ...mapState("project", {
      projList: (state) => state.projList,
      addProject: (state) => state.addProject,
    }),
  },
  methods: {
    handleCancel(e) {
      e.preventDefault;
      if (confirm("Você realmente deseja cancelar a criação? "))
        this.$store.commit("project/setAddProject", false);
    },
    handleSubmit() {
      if (this.projData.name.trim() === "" || this.projData.orgId === null)
        return alert("Todos os campos devem ser preenchidos");
      this.$store.dispatch("project/add", this.projData);
      this.projData.name = "";
      this.projData.orgId = null;
      this.$store.commit("project/setAddProject", false);
    },
    remove(name, index) {
      if (confirm(`Deseja Realmente Deletar o Projeto: "${name}"?`))
        this.$store.dispatch("project/remove", index);
    },
    toggleEditBox(proj) {
      this.showModal = !this.showModal;
      this.projData.name = proj.name;
      this.projData.status = proj.status ?? "Iniciado";
      this.projData.id = proj.id;
    },
    handleEditSubmit(data) {
      this.$store
        .dispatch("project/update", data)
        .then(() => {
          this.projData.name = "";
          this.projData.id = null;
          this.showModal = false;
          this.projData.status = "Iniciado";
          this.$router.push("projects");
        })
        .catch(() => console.log("Não foi possível editar o projeto"));
    },
    createTask() {
      this.$store.commit("task/setAddTask", true);
    },
    handleTaskSubmit() {
      if (
        this.taskData.title.trim() === "" ||
        this.taskData.projId === null ||
        this.taskData.description.trim() === "" ||
        this.deadline === null
      )
        return alert("Todos os campos devem ser preenchidos");
      this.$store.dispatch("task/add", this.taskData);
      this.taskData.title = "";
      this.taskData.description = "";
      this.taskData.projId = null;
      this.taskData.deadline = null;
      this.$store.commit("task/setAddTask", false);
    },
    removeTask(title, index) {
      if (confirm(`Deseja realmente deletar a tarefa: "${title}"?`))
        this.$store.dispatch("task/remove", index).then(() => 
        this.showTaskModal = false);
    },
    toggleTaskEditBox(task) {
      this.showTaskModal = !this.showTaskModal;
      this.taskData.id = task.id;
      this.taskData.title = task.title;
      this.taskData.description = task.description;
      this.taskData.status = task.status;
      this.taskData.deadline = task.deadline;
      this.taskData.projId = task.project_id;
    },
    handleTaskEditSubmit(data) {
      this.$store
        .dispatch("task/update", data)
        .then(() => {
          this.taskData.id = null;
          this.taskData.title = "";
          this.taskData.description = ""
          this.taskData.status = "Iniciado";
          this.taskData.deadline = null;
          this.taskData.projId = null;
          this.showTaskModal = false;
          this.$router.push("projects");
        })
        .catch(() => console.log("Não foi possível editar a tarefa"));
    },
    handleTaskCancel() {
      if (confirm("Você realmente deseja cancelar a criação? ")){
        this.taskData.id = null;
        this.taskData.title = "";
        this.taskData.description = ""
        this.taskData.status = "Iniciado";
        this.taskData.deadline = null;
        this.taskData.projId = null;
        this.showTaskModal = false;
        this.$store.commit("task/setAddTask", false);
      }
    },
  },
};
</script>