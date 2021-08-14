<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <PageWrapper
      :title="addOrganization ? 'Adicionar Organização' : 'Minhas Organizações'"
    >
      <div v-if="addOrganization === false">
        <Box
          v-for="(org, index) in orgList"
          :key="index"
          :ref="org + index"
          :title="org.name"
          subtitle="Novo Projeto"
        >
          <template v-slot:header>
            <div class="flex items-center gap-2 mr-2">
              <img
                src="../assets/edit.svg"
                class="inline h-6 w-7 hover:cursor-pointer"
                @click="toggleEditBox(org)"
                alt="Edit-Button"
              />

              <img
                src="../assets/delete.svg"
                class="inline h-8 w-9 hover:cursor-pointer"
                @click="remove(org.name, org.id)"
                alt="Delete-Button"
              />
            </div>
          </template>
          <BoxItem
            v-for="(proj, index) in org.projects"
            :key="index"
            :title="proj.name"
            :status="proj.status"
          />
        </Box>
      </div>
      <div v-else>
        <div>
          <form
            class="flex flex-col gap-1 px-6"
            autocomplete="off"
            @submit="handleSubmit"
          >
          <Input id="org-name" labelText="Nome" @getValue="(e) => this.orgData.name = e" />
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
              Editar Organização
            </h1>
            <form
              action="#/organizations"
              class="flex flex-col gap-1 mx-auto"
              autocomplete="off"
            >
              <label class="text-sm text-left mt-2 flex flex-col font-medium">
                Name:
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
                  v-model="this.orgData.name"
                />
              </label>
              <button
                class="bg-primary h-8 text-white rounded-md mt-2"
                type="submit"
                @click="handleEditSubmit(this.orgData)"
              >
                Editar
              </button>
            </form>
          </div>
        </div>
      </div>
      <MainButton storeRoute="organization/setAddOrganization" />
    </PageWrapper>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Box from "./Box";
import BoxItem from "./BoxItem";
import NavBar from "./NavBar";
import PageWrapper from "./PageWrapper";
import MainButton from "./MainButton";
import Input from './Input';

export default {
  components: { NavBar, PageWrapper, Box, BoxItem, MainButton, Input },
  data() {
    return {
      showModal: false,
      orgData: {
        name: null,
        id: null,
      },
    };
  },
  computed: {
    ...mapState({
      addItem: (state) => state.addItem,
    }),
    ...mapState("organization", {
      orgList: (state) => state.orgList,
      addOrganization: (state) => state.addOrganization,
    }),
    ...mapState("project", { projList: (state) => state.projList }),
  },
  methods: {
    handleCancel(e) {
      e.preventDefault;
      if (confirm("Você realmente deseja cancelar a criação ? "))
        this.$store.commit("organization/setAddOrganization", false);
    },
    handleSubmit() {
      if (this.orgData.name.trim() === "")
        return alert("all fields must be filled in");
      this.$store.dispatch("organization/add", this.orgData.name);
      this.$store.commit("organization/setAddOrganization", false);
      this.orgData.name = "";
    },
    remove(name, index) {
      if (confirm(`Deseja Realmente Deletar a Organização: " ${name} " ?`))
        this.$store.dispatch("organization/remove", index);
    },
    toggleEditBox(org) {
      this.showModal = !this.showModal;
      this.orgData.name = org.name;
      this.orgData.id = org.id;
    },
    handleEditSubmit(data) {
      this.$store
        .dispatch("organization/update", data)
        .then(() => {
          this.orgData.name = "";
          this.orgData.id = null;
          this.showModal = false;
          this.$router.push("organizations");
        })
        .catch(() => console.log("Não foi possível editar a organização"));
    },
  },
};
</script>
