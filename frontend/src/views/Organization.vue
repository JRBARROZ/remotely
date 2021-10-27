<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <PageWrapper
      :title="addOrganization ? 'Adicionar Organização' : 'Minhas Organizações'"
    >
      <div class="mt-6" v-if="orgList.length === 0 && addOrganization === false">
        <h1 class="font-lexend mx-4 md:text-lg dark:text-gray-200">Você não tem nenhuma organização,<br /> crie uma agora.</h1>
      </div>
      <div class="flex justify-center" v-if="addOrganization === false && orgList.length !== 0">
        <div class="h-108 max-h-108 border-b-4 mt-5 border-opacity-50 pb-4 border-primary gap-2 sm:mx-8 md:mx-14 lg:mx-32 overflow-y-auto mx-4 sm:grid sm:gap-3 sm:justify-center"
        :class="customGridClasses">
          <Box
            v-for="(org, index) in orgList"
            :key="index"
            :ref="org + index"
            :title="org.name"
            :link="'/organization/' + org.id"
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
                  @click="showDeleteOrgAlert(org.id, org.name)"
                  alt="Delete-Button"
                />
                <Alert
                  v-if="this.deleteOrgAction"
                  @result="(value) => getResponseAlert(value, 'deleteOrg')"
                  title="Você deseja remover a organização"
                  :data="this.orgName" />
              </div>
            </template>
            <BoxItem
              v-for="(proj, index) in org.projects"
              entity="project"
              :key="index"
              :title="proj.name"
              :status="proj.status"
              :id="proj.id"
            />
          </Box>
        </div>
      </div>
      <div v-else-if="addOrganization">
        <div>
          <Alert
            v-if="this.showCustomAlert"
            @result="(value) => getResponseAlert(value, 'alert')"
            title="O campo Nome é obrigatório"
            type="alert" />
          <form
            class="flex flex-col gap-1 px-6 sm:w-3/4 md:w-1/2 sm:mx-auto"
            autocomplete="off"
            @submit.prevent="handleSubmit"
          >
          <Input
            id="org-name"
            labelText="Nome"
            v-model:value="this.orgData.name" />
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
                v-if="this.cancelAction"
                @result="(value) => getResponseAlert(value, 'cancel')"
                title="Você realmente deseja cancelar a criação?" />
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
              class="flex flex-col gap-1 px-4 w-full sm:mx-auto"
              autocomplete="off"
              @submit.prevent="handleEditSubmit(this.orgData)"
            >
              <Input
                id="org-name-edit"
                labelText="Nome"
                :initialText="this.orgData.name"
                v-model:value="this.orgData.name" />
              <button
                class="bg-success h-10 text-title rounded mt-2 py-2 hover:bg-green-200"
                type="submit"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
    <MainButton entity="Organização" storeRoute="organization/setAddOrganization" v-if="!addOrganization" />
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
import Alert from '@/components/Alert';

export default {
  components: { NavBar, PageWrapper, Box, BoxItem, MainButton, Input, Alert },
  data() {
    return {
      showModal: false,
      showCustomAlert: false,
      cancelAction: false,
      orgName: '',
      orgId: -1,
      deleteOrgAction: false,
      responseAlert: false,
      orgData: {
        name: "",
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
    customGridClasses: function() {
      return this.orgList.length === 2 ? 'sm:grid-cols-2 w-full' : 
        this.orgList.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-3 w-full' : 
        'sm:grid-cols-1 w-full sm:w-1/2';
    },
  },
  methods: {
    handleCancel() {
      if (this.responseAlert === "true") this.responseAlert = true;
      else this.responseAlert = false;
      // Você realmente deseja cancelar a criação
      if (this.responseAlert) this.$store.commit("organization/setAddOrganization", false);

      this.responseAlert = false;
      this.cancelAction = false;
    },
    handleSubmit() {
      if (this.orgData.name.trim() === "") {
        this.showAlert();
        return;
      }
      this.$store.dispatch("organization/add", this.orgData.name);
      this.$store.commit("organization/setAddOrganization", false);
      this.orgData.name = "";
    },
    remove(index) {
      if (this.responseAlert === "true") this.responseAlert = true;
      else this.responseAlert = false;
      if (this.responseAlert)
        this.$store.dispatch("organization/remove", index);
      
      this.deleteOrgAction = false;
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
    showDeleteOrgAlert(id, name) {
      this.orgId = id;
      this.orgName = name;
      this.deleteOrgAction = true;
    },
    showAlert() {
      this.showCustomAlert = true;
    },
    getResponseAlert(value, text) {
      this.responseAlert = value;
      switch(text) {
        case 'cancel':
          this.handleCancel();
          break;
        case 'deleteOrg':
          this.remove(this.orgId);
          break;
        default:
          this.showCustomAlert = false;
          break;
      } 
    }
  },
};
</script>
