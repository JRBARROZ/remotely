<template>
  
  <div class="flex flex-col items-center">
  <NavBar />
  <PageWrapper :title="addItem ? 'Minhas Organizações' : 'Adicionar Organização' ">
      <div v-if="addItem">
        <Box v-for="(org, index) in orgList" :key="index" :ref="org + index" :title="org.name" subtitle="Novo Projeto" link="projects">
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
                @click="remove(org.name,org.id)"
                alt="Delete-Button"
              />
          </div>
        </template>
        <!-- <table>
          <thead>
            <tr class="text-lg text-gray-700 mt-5">
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tr v-for="(org, index) in orgList" :key="index" :ref="org + index">
            <td class="px-3">{{ org.name }}</td>
            <td class="px-3">{{ org.status }}</td>
            <td class="px-3">

            </td>
          </tr>
        </table> -->
      </Box>
    </div>
    <div v-else>
      <div>
        <form  class="flex flex-col gap-1 px-6 " autocomplete="off" @submit="handleSubmit">
          <div class="relative mt-5">
            <input
              type="text"
              v-model="orgData.name"
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
                focus:outline-none"
              id="org-name"
              placeholder="Nome da organização"
            />
            <label
            for="org-name"
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
            >Nome</label>
          </div>
          <div class="flex gap-2"> 
            <button class="bg-red-200 rounded-md p-2 mt-2 hover:bg-red-300" type="button" @click="handleCancel">Cancelar</button>
            <button type="submit" class=" bg-green-200 rounded-md p-2 mt-2 hover:bg-green-300">Confirmar</button>
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
            action="#/organization"
            class="flex flex-col gap-1 mx-auto"
            autocomplete="off"
          >
            <label class="text-sm text-left mt-2 flex  flex-col font-medium">
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
    <MainButton />
  </PageWrapper>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Box from './Box';
import NavBar from './NavBar';
import PageWrapper from './PageWrapper';
import MainButton from './MainButton'
export default {
  components: { NavBar, PageWrapper, Box, MainButton },
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
      addItem: state => state.addItem
    }),
    ...mapState("organization", { orgList: (state) => state.orgList }),
  },
  methods: {
    handleCancel(e){
      e.preventDefault;
      if(confirm("Você realmente deseja cancelar a criação ? ")) this.$store.commit('setAddItem', true);
    },
    handleSubmit() {
      if (this.orgData.name.trim() === "") return alert("all fields must be filled in");
      this.$store.dispatch("organization/add", this.orgData.name);
      this.$store.commit('setAddItem', true);
      this.orgData.name = "";

    },
    remove(name,index) {
      if(confirm(`Deseja Realmente Deletar a Organização: " ${name} " ?`)) this.$store.dispatch("organization/remove", index);
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
          this.$router.push('organizations');
        })
        .catch(() => console.log("Não foi possível editar a organização"));
    },
  },
};
</script>
