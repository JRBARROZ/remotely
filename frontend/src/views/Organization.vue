<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <PageWrapper
      :title="addOrganization ? 'Adicionar Organização' : 'Minhas Organizações'"
    >
      <div class="mt-6" v-if="orgList.length === 0 && addOrganization === false">
        <h1 class="font-lexend mx-4">Você não tem nenhuma organização,<br /> crie uma agora.</h1>
      </div>
      <div class="h-108 border-b-4 mt-5 border-opacity-50 pb-4 border-primary mx-4 overflow-y-scroll" v-if="addOrganization === false && orgList.length !== 0">
        <Box
          v-for="(org, index) in orgList"
          :key="index"
          :ref="org + index"
          :title="org.name"
          :link="'/organizations/' + org.id"
        >
          <template v-slot:header>
            <div class="flex items-center gap-2 mr-2">
              <img
                src="@/assets/edit.svg"
                class="inline h-7 w-7 hover:cursor-pointer"
                @click="toggleEditBox(org)"
                alt="Edit-Button"
              />

              <img
                src="@/assets/delete.svg"
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
      <div v-else-if="addOrganization">
        <div>
          <form
            class="flex flex-col gap-1 px-6"
            autocomplete="off"
            @submit.prevent="handleSubmit"
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
              Editar Organização
            </h1>
            <form
              action="#/organizations"
              class="flex flex-col gap-1 px-4 w-full"
              autocomplete="off"
              @submit.prevent="handleEditSubmit(this.orgData)"
            >
              <Input id="org-name-edit" labelText="Nome" :initialText="this.orgData.name" @getValue="(e) => this.orgData.name = e" />
              <button
                class="bg-primary h-10 text-white rounded mt-2 py-2"
                type="submit"
              >
                Salvar
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
import Box from "@/components/Box";
import BoxItem from "@/components/BoxItem";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
import MainButton from "@/components/MainButton";
import Input from '@/components/Input';

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
