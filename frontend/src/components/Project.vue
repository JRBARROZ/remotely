<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <PageWrapper :title="addItem ? 'Meus Projetos' : 'Adicionar projeto'">
      <div v-if="addItem">
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
        </Box>
      </div>
      <div v-else>
        <div>
          <form
            class="flex flex-col gap-96 px-6"
            autocomplete="off"
            @submit="handleSubmit"
          >
            <div class="relative mt-5">
              <input
                type="text"
                v-model="projData.name"
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
                id="proj-name"
                placeholder="Nome da organização"
              />
              <label
                for="proj-name"
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
                >Nome</label
              >
              <select
                v-model="projData.orgId"
                class="
                  text-gray-600
                  peer
                  h-10
                  w-full
                  border
                  rounded
                  mt-5
                  pl-2
                  bg-input
                  placeholder-transparent
                  focus:outline-none
                "
                id="proj-organization"
                placeholder="Nome da organização"
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
                >Organização</label
              >
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
            </div>
          </form>
        </div>
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
      <MainButton />
    </PageWrapper>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "./NavBar";
import Box from "./Box";
import MainButton from "./MainButton.vue";
import PageWrapper from "./PageWrapper";

export default {
  components: { NavBar, PageWrapper, Box, MainButton },
  data() {
    return {
      showModal: false,
      projData: {
        name: null,
        status: "Ongoing",
        orgId: null,
      },
    };
  },
  computed: {
    ...mapState({ addItem: (state) => state.addItem }),
    ...mapState("organization", { orgList: (state) => state.orgList }),
    ...mapState("project", { projList: (state) => state.projList }),
  },
  methods: {
    handleCancel(e){
      e.preventDefault;
      if(confirm("Você realmente deseja cancelar a criação ? ")) this.$store.commit('setAddItem', true);
    },
    handleSubmit() {
      if (this.projData.name.trim() === "" || this.projData.orgId === null)
        return alert("all fields must be filled in");
      this.$store.dispatch("project/add", this.projData);
      this.$store.commit("setAddItem", true);
      this.projData.name = "";
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
  },
};
</script>