<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <PageWrapper :title="!addProject ? 'Meus Projetos' : 'Adicionar Projeto'">
      <div v-if="addProject === false && addTask === false">
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
            @click="editTask(task)"
          />
        </Box>
      </div>
      <div v-else-if="addProject && addTask === false">
        <form
          class="flex flex-col gap-1 px-6"
          autocomplete="off"
          @submit.prevent="handleSubmit"
        >
          <Input id="nome" labelText="Nome"  @getValue="(e) => this.projData.name = e"/>
          <div class="relative mt-5">
            <select
              v-model="projData.orgId"
              class="text-gray-600 peer
              h-10 w-full border rounded
              pl-2 bg-input placeholder-transparent
              focus:outline-none"
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
              class="absolute left-2 -top-5
                text-input-text text-sm transition-all
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-2 peer-focus:-top-5
                peer-focus:left-0 peer-focus:text-title
                peer-focus:text-sm"
              >Organizações
            </label>
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
      
      <div v-else-if="addProject === false && addTask === true">
        <form
          class="flex flex-col gap-1 px-6"
          autocomplete="off"
          @submit.prevent="handleTaskSubmit"
        >
          <div class="relative mt-5">
            <input
              type="text"
              v-model="taskData.title"
              class="
                text-gray-600
                peer
                h-10
                w-full
                border
                rounded
                pl-2
                bg-input
                placeholder-transparent
                focus:outline-none
              "
              id="task-title"
              placeholder="Nome da organização"
            />
            <label
              for="task-title"
              class="
                absolute
                left-2
                -top-5
                text-input-text text-sm
                transition-all
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-2
                peer-focus:-top-5
                peer-focus:left-0
                peer-focus:text-title
                peer-focus:text-sm
              "
              >Título</label
            >
            <select
              v-model="taskData.projId"
              class="
                text-gray-600
                peer
                h-10
                w-full
                border
                rounded
                mt-6
                pl-2
                bg-input
                placeholder-transparent
                focus:outline-none
              "
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
              class="
                absolute
                left-2
                -top-5
                mt-16
                text-input-text text-sm
                transition-all
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-2
                peer-focus:-top-5
                peer-focus:left-0
                peer-focus:text-title
                peer-focus:text-sm
              "
              >Projetos</label
            >
            <input
              type="text"
              v-model="taskData.deadline"
              class="
                text-gray-600
                peer
                h-10
                w-full
                border
                rounded
                mt-6
                pl-2
                bg-input
                placeholder-transparent
                focus:outline-none
              "
              @input="format('xx/xx/xxxx', this.taskData.deadline)"
              id="task-deadline"
              placeholder="Nome da organização"
            />
            <label
              for="task-deadline"
              class="
                absolute
                left-2
                -top-5
                mt-32
                text-input-text text-sm
                transition-all
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-2
                peer-focus:-top-5
                peer-focus:left-0
                peer-focus:text-title
                peer-focus:text-sm
              "
              >Data de entrega</label
            >
            <textarea
              type="text"
              v-model="this.taskData.description"
              class="
                text-gray-600
                peer
                h-10
                w-full
                border
                rounded
                mt-6
                h-32
                pl-2
                bg-input
                placeholder-transparent
                focus:outline-none
              "
              id="task-description"
              placeholder="Nome da organização"
            />
            <label
              for="task-description"
              class="
                absolute
                left-2
                -top-5
                mt-48
                text-input-text text-sm
                transition-all
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:top-2
                peer-focus:-top-5
                peer-focus:left-0
                peer-focus:text-title
                peer-focus:text-sm
              "
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

      <div
        class="
          bg-gray-900 bg-opacity-50
          min-h-screen min-w-full
          z-30
          fixed
          top-0
          flex flex-col
          justify-center
          items-center
        "
        v-if="showModal"
        @click="toggleEditBox"
      >
        <div
          class="bg-white w-3/4 h-72 z-40 md:w-96 p-5"
          @click.stop="eventPropagation"
        >
          <div class="flex flex-col items-center gap-3 m-auto">
            <h1 class="text-2xl text-center mt-2 text-gray-700">
              Editar Projeto
            </h1>
            <form
              action="#/projects"
              class="flex flex-col gap-1 mx-auto"
              autocomplete="off"
            >
              <label class="text-sm text-left mt-2 flex flex-col font-medium">
                Name:
                <input
                  id="proj-name"
                  type="text"
                  class="
                    outline-none
                    w-full
                    h-10
                    border
                    pl-2
                    rounded
                    text-gray-600
                  "
                  v-model="this.projData.name"
                />
              </label>
              <label class="text-sm mt-2 font-medium"
                >Status:
                <input
                  type="text"
                  class="
                    outline-none
                    w-full
                    h-10
                    border
                    pl-2
                    rounded
                    text-gray-600
                  "
                  v-model="this.projData.status"
                />
              </label>
              <button
                class="bg-primary h-8 text-white rounded-md mt-2"
                type="submit"
                @click="handleEditSubmit(this.projData)"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <MainButton storeRoute="project/setAddProject" />
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
        name: null,
        status: "Ongoing",
        orgId: null,
      },
      taskData: {
        title: "",
        description: "",
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
      if (confirm("Você realmente deseja cancelar a criação ? "))
        this.$store.commit("project/setAddProject", false);
    },
    handleSubmit() {
      if (this.projData.name.trim() === "" || this.projData.orgId === null)
        return alert("all fields must be filled in");
      this.$store.dispatch("project/add", this.projData);
      this.projData.name = "";
      this.projData.orgId = null;
      this.$store.commit("project/setAddProject", false);
    },
    remove(name, index) {
      if (confirm(`Deseja Realmente Deletar o Projeto: " ${name} " ?`))
        this.$store.dispatch("project/remove", index);
    },
    toggleEditBox(proj) {
      this.showModal = !this.showModal;
      this.projData.name = proj.name;
      this.projData.status = proj.status ?? "Ongoing";
      this.projData.id = proj.id;
    },
    handleEditSubmit(data) {
      this.$store
        .dispatch("project/update", data)
        .then(() => {
          this.projData.name = "";
          this.projData.id = null;
          this.showModal = false;
          this.projData.status = "Ongoing";
          this.$router.push("projects");
        })
        .catch(() => console.log("Não foi possível editar o projeto"));
    },
    createTask(proj) {
      this.$store.commit("task/setAddTask", true);
    },
    // toggleEditBox(task) {
    //   this.showModal = !this.showModal;
    //   this.taskData.name = task.name;
    //   this.taskData.status = task.status ?? "Ongoing";
    //   this.taskData.id = task.id;
    // },
    handleTaskSubmit() {
      if (
        this.taskData.title.trim() === "" ||
        this.taskData.projId === null ||
        this.taskData.description.trim() === "" ||
        this.deadline === null
      )
        return alert("all fields must be filled in");
      this.$store.dispatch("task/add", this.taskData);
      this.taskData.title = "";
      this.taskData.description = "";
      this.taskData.projId = null;
      this.taskData.deadline = null;
      this.$store.commit("task/setAddTask", false);
    },
    format(mask, number) {
      var stringNumber = "" + number.replaceAll("/", "");
      var result = "";
      // im = index mask
      // is = index string (number)
      for (
        var im = 0, is = 0;
        im < mask.length && is < stringNumber.length;
        im++
      ) {
        result +=
          mask.charAt(im) == "x" ? stringNumber.charAt(is++) : mask.charAt(im);
      }
      this.taskData.deadline = result;
    },
    handleTaskCancel() {
      if (confirm("Você realmente deseja cancelar a criação ? "))
        this.$store.commit("task/setAddTask", false);
    },
  },
};
</script>