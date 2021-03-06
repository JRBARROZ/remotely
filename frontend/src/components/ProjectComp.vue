<template>
  <div
    class="flex flex-col items-center mx-4 sm:mx-0"
    v-if="projList != null">
      <div
        class="h-108 max-h-108 border-b-4 mt-5 border-opacity-50 pb-4 border-primary
        gap-2 sm:mx-8 md:mx-14 lg:mx-32 overflow-y-auto mx-4 sm:grid sm:gap-3 sm:justify-center"
        :class="customGridClasses"
        v-if="!addTask && !addProject && projList.length !== 0"
      >
        <Box
          v-for="(proj, index) in projList"
          :key="index"
          :ref="proj + index"
          :title="proj.name"
          subtitle="Novo Projeto"
          class="flex-grow relative"
          :link="'/project/' + proj.id"
        >
          <template v-slot:header>
            <div class="flex items-center gap-2 mr-2">
              <img
                src="../assets/edit.svg"
                class="inline h-6 w-7 hover:cursor-pointer"
                @click="toggleEditBox(proj)"
                alt="Edit-Button"
              />
              <img
                src="../assets/delete.svg"
                class="inline h-8 w-9 hover:cursor-pointer"
                @click="showDeleteProjAlert(proj.id, proj.name)"
                alt="Delete-Button"
              />
              <Alert
                v-if="this.deleteProjAction"
                @result="(value) => getResponseAlert(value, 'deleteProj')"
                title="Você deseja remover o projeto" :data="this.projName" />
            </div>
          </template>
          <BoxItem
            v-for="(task, index) in proj.tasks"
            :key="index"
            :title="task.title"
            :status="task.status"
            :deadline="task.deadline"
            @click="toggleTaskEditBox(task)"
          />
          <div
            class="flex mt-3 hover:cursor-pointer gap-2 items-center self-end mr-3"
            @click="createTask(proj)"
          >
            <!-- <p class="text-lg text-skin font-semibold" >Adicionar Tarefa</p> -->
            <img
              :class="proj.tasks.length === 0 ? 'h-10 w-10' : 'h-8 w-8'"
              src="../assets/add_task.svg"
              title="Adicionar Tarefa"
              alt="Add-Task-Button"
            />
          </div>
        </Box>
      </div>
      <!-- add project start -->
      <div class="w-full mt-6" v-if="addProject && !addTask">
        <Alert
          v-if="this.showCustomAlert"
          @result="(value) => getResponseAlert(value, 'alert')"
          :title="this.alertTitle"
          type="alert" />
        <form
          class="flex flex-col gap-1 px-6 sm:w-3/4 md:w-1/2 sm:mx-auto"
          autocomplete="off"
          @submit.prevent="handleSubmit"
        >
          <Input id="nome" labelText="Nome" v-model:value="this.projData.name"/>
          <div class="relative mt-5" v-if="this.ownerOrg == null">
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

          <Input
            id="proj-defined-org"
            labelText="Organização"
            :value="this.ownerOrg.name"
            :disabled="true" v-else/>
          
          <div class="flex gap-2">
            <button
              type="submit"
              class="bg-success rounded-md p-2 mt-2 hover:bg-green-200"
            >
              Confirmar
            </button>
            <button
              class="bg-error rounded-md p-2 mt-2 hover:bg-red-200"
              type="button"
              @click="this.cancelAction = true"
            >
              Cancelar
            </button>
            <Alert
              @result="(value) => getResponseAlert(value, 'cancel')"
              v-if="this.cancelAction"
              title="Você realmente deseja cancelar a criação?" />
          </div>
        </form>
      </div>
      <!-- add project end -->
      <!-- edit project start -->
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
              class="flex flex-col gap-1 px-4 w-full sm:mx-auto"
              autocomplete="off"
            >
              <Input
                id="nome-edit"
                labelText="Nome"
                v-model:value="this.projData.name" />
              <Input
                id="status-edit"
                labelText="Status"
                v-model:value="this.projData.status" />
              <button
                class="bg-success h-10 text-title rounded-md mt-2 py-2 hover:bg-green-200"
                type="submit"
                @click.prevent="handleEditSubmit(this.projData)"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
      <!-- edit project end -->
      <!-- edit task start -->
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
                @click="this.deleteTaskAction = true"
                alt="Add-Task-Button"
              />
              <Alert
                v-if="this.deleteTaskAction"
                @result="(value) => getResponseAlert(value, 'deleteTask', this.taskData.id)"
                title="Deseja realmente deletar a tarefa "
                :data="this.taskData.title" />
            </div>
            <form
              class="flex flex-col gap-1 px-4 w-full sm:mx-auto"
              autocomplete="off"
              @submit.prevent
            >
            <Input
              id="task-edit-title"
              labelText="Título"
              v-model:value="this.taskData.title" />
            <Input
              id="task-edit-status"
              labelText="Status"
              v-model:value="this.taskData.status" />
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
                class="bg-success h-10 text-title rounded-md mt-2 py-2 hover:bg-green-200"
                type="submit"
                @click.prevent="handleTaskEditSubmit(this.taskData)"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
      <!-- edit task end -->
      <!-- add task start -->


      <div
        class="bg-gray-900 bg-opacity-50 min-h-screen min-w-full z-30
          fixed top-0 flex flex-col justify-center items-center px-6"
        v-if="addTask"
        @click="handleTaskCancel"
      >
        <div
          class="bg-white w-full h-full z-40 sm:w-96 md:w-110 p-5 rounded"
          @click.stop="eventPropagation"
        >
          <!-- <div class="flex flex-col items-center gap-3 m-auto"> -->
            <h1 class="text-2xl text-center mt-2 text-gray-700">
              Adicionar Tarefa
            </h1>
            <Alert
              v-if="this.showCustomAlert"
              @result="(value) => getResponseAlert(value, 'alert')"
              :title="this.alertTitle"
              type="alert" />
            <form
              class="flex flex-col gap-1 px-6 sm:w-full md:w-full sm:mx-auto"
              autocomplete="off"
              @submit.prevent="handleTaskSubmit"
            >
              <Input
                id="task-project"
                labelText="Projeto"
                v-model:value="choosenProj.name"
                :disabled="true" /> 
              <Input
                id="task-title"
                labelText="Título"
                v-model:value="this.taskData.title" />
              <div class="flex gap-2 items-center justify-start">
                <Input
                  type="date"
                  id="task-deadline"
                  labelText="Data de entrega"
                  v-model:value="this.taskData.deadline" />
                <SelectInput :data="this.selectData" @chosen="getSelected" class="flex-grow" />
              </div>
              <div class="relative mt-6">
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
                    type="submit"
                    class="bg-success rounded-md p-2 mt-2 hover:bg-green-200"
                  >
                    Confirmar
                  </button>
                  <button
                    class="bg-error rounded-md p-2 mt-2 hover:bg-red-200"
                    type="button"
                    @click="handleTaskCancel"
                  >
                    Cancelar
                  </button>
                  <!-- <Alert
                    v-if="this.cancelTaskAction"
                    @result="(value) => getResponseAlert(value, 'cancelTask')"
                    title="Você realmente deseja cancelar a criação?" /> -->
                </div>
              </div>
            </form>
          <!-- </div> -->
        </div>
      </div>
      <!-- add task end -->
      <MainButton
        entity="Projeto"
        storeRoute="project/setAddProject"
        v-if="!addTask && !addProject && showAddProjectButton" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Box from "./Box";
import BoxItem from "./BoxItem";
import MainButton from "./MainButton.vue";

import Input from "./Input";
import Alert from "./Alert";
import SelectInput from "./SelectInput";

export default {
  components: { Box, BoxItem, MainButton, Input, Alert, SelectInput },
  computed: {
    ...mapState("task", {
      taskList: (state) => state.taskList,
      addTask: (state) => state.addTask,
    }),
    ...mapState({ addItem: (state) => state.addItem }),
    ...mapState("organization", { orgList: (state) => state.orgList }),
    ...mapState("project", {
      addProject: (state) => state.addProject,
    }),
    customGridClasses: function() {
      return this.projList.length === 2 ? 'sm:grid-cols-2 w-full' : 
        this.projList.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-3 w-full' : 
        'sm:grid-cols-1 w-full sm:w-1/2';
    },
  },
  data() {
    return {
      showModal: false,
      alertTitle: "",
      selectData: ['Alta', 'Média', 'Baixa'],
      showCustomAlert: false,
      responseAlert: false,
      projName: '',
      projId: -1,
      deleteTaskAction: false,
      deleteProjAction: false,
      cancelTaskAction: false,
      cancelAction: false,
      showTaskModal: false,
      choosenProj: null,
      projData: {
        id: null,
        name: '',
        status: "Iniciado",
        orgId: null,
      },
      taskData: {
        id: null,
        title: "",
        description: "",
        priority: -1,
        status: "Iniciado",
        projId: null,
        deadline: null,
      },
    };
  },
  props: {
    showAddProjectButton: {
      type: Boolean,
      default: true
    },
    projList: {
      type: Object,
      default: null
    },
    ownerOrg: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleCancel() {
      if (this.responseAlert === "true") this.responseAlert = true;
      else this.responseAlert = false;

      if (this.responseAlert) this.$store.commit("project/setAddProject", false);
      this.responseAlert = false;
      this.cancelAction = false;
    },
    handleSubmit() {
      console.log('projData', this.projData);
      if(this.ownerOrg){
        this.projData.orgId = this.ownerOrg.id;
      }
      if (this.projData.name.trim() === "" || this.projData.orgId === null) {
        this.showAlert("Todos os campos deve ser preenchidos!");
        return;
      }
      this.$store.dispatch("project/add", this.projData);
      this.projData.name = "";
      this.projData.orgId = null;
      this.$store.commit("project/setAddProject", false);
    },
    remove(index) {
      if (this.responseAlert === "true") this.responseAlert = true;
      else this.responseAlert = false;
      if (this.responseAlert)  {
        this.$store.dispatch("project/remove", index);
      }
      this.deleteProjAction = false;
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
        })
        .catch(() => console.log("Não foi possível editar o projeto"));
    },
    createTask(proj) {
      this.$store.commit("task/setAddTask", true);
      this.choosenProj = proj;
      this.taskData.projId = this.choosenProj.id;
    },
    handleTaskSubmit() {
      if (
        this.taskData.title.trim() === "" ||
        this.taskData.projId === null ||
        this.taskData.description.trim() === "" ||
        this.taskData.deadline === null
      ) {
        this.showAlert("Todos os campos deve ser preenchidos!");
        return;
      }

      let existentPriorities = [1, 2, 3]

      if (!existentPriorities.includes(this.taskData.priority)) {
        this.showAlert("Por favor, escolha uma das prioridades existentes");
        return;
      }

      if(this.taskData.priority) {
        this.$store.dispatch("task/add", this.taskData);
      }
      this.taskData.title = "";
      this.taskData.description = "";
      this.taskData.projId = null;
      this.taskData.deadline = null;
      this.$store.commit("task/setAddTask", false);
    },
    removeTask(index) {
      if (this.responseAlert === "true") this.responseAlert = true;
      else this.responseAlert = false;
      if (this.responseAlert)
        this.$store.dispatch("task/remove", index).then(() => 
        this.showTaskModal = false);
      this.deleteTaskAction = false;
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
        })
        .catch(() => console.log("Não foi possível editar a tarefa"));
    },
    handleTaskCancel() {
      this.$store.commit("task/setAddTask", false);
      // if (this.responseAlert === "true") this.responseAlert = true;
      // else this.responseAlert = false;
      // if (this.responseAlert){
      //   this.taskData.id = null;
      //   this.taskData.title = "";
      //   this.taskData.description = ""
      //   this.taskData.status = "Iniciado";
      //   this.taskData.deadline = null;
      //   this.taskData.projId = null;
      //   this.showTaskModal = false;
      //   this.$store.commit("task/setAddTask", false);
      // }
      // this.cancelTaskAction = false;
    },
    showDeleteProjAlert(id, name) {
      this.projId = id;
      this.projName = name;
      this.deleteProjAction = true;
    },
    showAlert(text) {
      this.alertTitle = text;
      this.showCustomAlert = true;
    },
    getSelected(value) {
      switch (value) {
        case "Alta":
          value = 1
          break;
        case "Média":
          value = 2
          break;
        case "Baixa":
          value = 3
          break;
        default:
          break;
      }
      this.taskData.priority = value;
    },
    getResponseAlert(value, text, data = null) {
      this.responseAlert = value;
      switch(text) {
        case 'cancelTask':
          this.handleTaskCancel();
          break;
        case 'deleteTask':
          this.removeTask(data);
          break;
        case 'cancel':
          this.handleCancel();
          break;
        case 'deleteProj':
          this.remove(this.projId);
          break;
        default:
          this.showCustomAlert = false;
          break;
      }
    }
  },
};
</script>