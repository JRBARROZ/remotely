<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <PageWrapper :title="addProject ? 'Adicionar Projeto' : 'Meus Projetos'" v-if="addTask === false">
      <div class="mt-6" v-if="projList.length === 0 && addProject === false">
        <h1 class="font-lexend mx-4">Você não tem nenhum projeto,<br>
           crie um agora.</h1>
      </div>
      <div class="h-108 max-h-108 mt-5 border-b-4 border-opacity-50 pb-4 border-primary mx-4 overflow-y-scroll" v-if="addProject === false && projList.length !== 0">
        <Box
          v-for="(proj, index) in projList"
          :key="index"
          :ref="proj + index"
          :title="proj.name"
          subtitle="Novo Projeto"
          link="projects"
        >
          <template v-slot:header>
            <div class="flex items-center gap-2 mr-2">
              <img
                src="../assets/add_task.svg"
                class="inline h-6 w-7 hover:cursor-pointer"
                @click="createTask(proj)"
                alt="Add-Task-Button"
              />
              <img
                src="../assets/edit.svg"
                class="inline h-6 w-7 hover:cursor-pointer"
                @click="toggleEditBox(proj)"
                alt="Edit-Button"
              />
              <img
                src="../assets/delete.svg"
                class="inline h-8 w-9 hover:cursor-pointer"
                @click="remove(proj.name, proj.id)"
                alt="Delete-Button"
              />
            </div>
          </template>
          <BoxItem
            v-for="(task, index) in proj.tasks"
            :key="index"
            :title="task.title"
            :status="task.status"
            @click="toggleTaskEditBox(task)"
          />
        </Box>
      </div>
      <div v-if="addProject">
        <form
          class="flex flex-col gap-1 px-6"
          autocomplete="off"
          @submit.prevent="handleSubmit"
        >
          <Input id="nome" labelText="Nome"  @getValue="(e) => this.projData.name = e"/>
          <div class="relative mt-5">
            <select
              v-model="projData.orgId"
              required
              class="peer select"
              id="proj-organization"
            >
              <option
                v-for="(org, index) in orgList"
                :key="index"
                :value="org.id"
              >
                {{ org.name }}
              </option>
            </select>
            <label
              for="proj-organization"
              class="select-label"
              >Organizações</label
            >
          </div>
          
          <div class="flex gap-2">
            <button
              class="bg-red-200 rounded-md p-2 mt-2 hover:bg-red-300"
              type="button"
              @click="handleCancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-green-200 rounded-md p-2 mt-2 hover:bg-green-300"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
      
      <div
        class="bg-gray-900 bg-opacity-50 min-h-screen min-w-full z-30
          fixed top-0 flex flex-col justify-center items-center px-6"
        v-if="showModal"
        @click="toggleEditBox"
      >
        <div
          class="bg-white w-full h-full z-40 md:w-96 p-5 rounded"
          @click.stop="eventPropagation"
        >
          <div class="flex flex-col items-center gap-3 m-auto">
            <h1 class="text-2xl text-center mt-2 text-gray-700">
              Editar Projeto
            </h1>
            <form
              action="#/projects"
              class="flex flex-col gap-1 px-4 w-full"
              autocomplete="off"
            >
              <Input id="nome-edit" labelText="Nome" :initialText="this.projData.name"  @getValue="(e) => this.projData.name = e"/>
              <Input id="status-edit" labelText="Status" :initialText="this.projData.status"  @getValue="(e) => this.projData.status = e"/>
              <button
                class="bg-primary h-10 text-white rounded mt-2 py-2"
                type="submit"
                @click.prevent="handleEditSubmit(this.projData)"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>

      <div
        class="bg-gray-900 bg-opacity-50 min-h-screen min-w-full z-30
          fixed top-0 flex flex-col justify-center items-center px-6"
        v-if="showTaskModal"
        @click="toggleTaskEditBox"
      >
        <div
          class="bg-white w-full h-full z-40 md:w-96 p-5 rounded"
          @click.stop="eventPropagation"
        >
          <div class="flex flex-col items-center gap-3 m-auto">
            <div class="flex items-center justify-center relative w-full">
              <h1 class="text-2xl text-center text-gray-700">
                Editar Tarefa
              </h1>
              <img
                src="../assets/trash_can.svg"
                class="inline hover:cursor-pointer right-2 top-1 absolute"
                @click="removeTask(this.taskData.title, this.taskData.id)"
                alt="Add-Task-Button"
              />
            </div>
            <form
              action="#/projects"
              class="flex flex-col gap-1 px-4 w-full"
              autocomplete="off"
              @submit.prevent
            >
            <Input id="task-edit-title" labelText="Título"  :initialText="this.taskData.title" @getValue="(e) => this.taskData.title = e"/>
            <Input id="task-edit-status" labelText="Status" :initialText="this.taskData.status"  @getValue="(e) => this.taskData.status = e"/>
            <div class="relative mt-5">
            <textarea
              type="text"
              v-model="this.taskData.description"
              class="peer textarea"
              id="task-edit-description"
              placeholder="Nome da organização"
            />
            <label
              for="task-edit-description"
              class="input-label"
              >Descrição</label
            >
            </div>
              <button
                class="bg-primary h-10 text-white rounded-md mt-2 py-2"
                type="submit"
                @click.prevent="handleTaskEditSubmit(this.taskData)"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
      <MainButton storeRoute="project/setAddProject" />
    </PageWrapper>
    <PageWrapper title="Adicionar Tarefa" v-else>
      <div>
        <form
          class="flex flex-col gap-1 px-6"
          autocomplete="off"
          @submit.prevent="handleTaskSubmit"
        >
          <Input id="task-title" labelText="Título"  @getValue="(e) => this.taskData.title = e"/>
          <div class="relative mt-6">
            <select
              v-model="taskData.projId"
              required
              class="peer select"
              id="task-project"
            >
              <option
                v-for="(proj, index) in projList"
                :key="index"
                :value="proj.id"
              >
                {{ proj.name }}
              </option>
            </select>
            <label
              for="task-project"
              class="select-label"
              >Projetos</label
            >
          </div>
          <Input type="date" id="task-deadline" labelText="Data de entrega" @getValue="(e) => this.taskData.deadline = e"/>
          <div class="relative mt-5">
            <textarea
              type="text"
              v-model="this.taskData.description"
              class="peer textarea"
              id="task-description"
              placeholder="Nome da organização"
            />
            <label
              for="task-description"
              class="input-label"
              >Descrição</label
            >
            <div class="flex gap-2">
              <button
                class="bg-red-200 rounded-md p-2 mt-2 hover:bg-red-300"
                type="button"
                @click="handleTaskCancel"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="bg-green-200 rounded-md p-2 mt-2 hover:bg-green-300"
              >
                Confirmar
              </button>
            </div>
          </div>
        </form>
      </div>
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

export default {
  components: { NavBar, PageWrapper, Box, BoxItem, MainButton, Input },
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