<template>

  <div class="flex flex-col items-center">
    <NavBar />
    <PageWrapper title="Meus Projetos">
    <h1 class="text-3xl mb-4 text-gray-700">Your projects</h1>

    <table>
      <thead>
        <tr class="text-lg text-gray-700 mt-5">
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tr v-for="(proj, index) in projList" :key="index" :ref="proj + index">
        <td class="px-3">{{ proj.name }}</td>
        <td class="px-3">{{ proj.status }}</td>
        <td class="px-3">
          <img
            src="../assets/edit.svg"
            class="inline h-6 w-7"
            @click="toggleEditBox(proj)"
            alt="Edit-Button"
          />

          <img
            src="../assets/delete.svg"
            class="inline h-8 w-9"
            @click="remove(proj.id)"
            alt="Delete-Button"
          />
        </td>
      </tr>
    </table>
    <div class="flex flex-col">
      <h1 class="text-2xl text-gray-700 mt-5">Create a new project</h1>
      <label for="proj-name" class="text-sm mt-2 font-medium">
        Choose the organization:
      </label>

      <select
        v-model="this.projData.orgId"
        class="bg-white border pl-2 rounded text-gray-600 h-8 w-64"
      >
        <option v-for="(org, index) in orgList" :key="index" :value="org.id">
          {{ org.name }}
        </option>
      </select>
      <label for="proj-name" class="text-sm mt-2 font-medium">
        Write the name:
      </label>
      <input
        type="text"
        v-model="projData.name"
        placeholder="Project Name"
        class="border pl-2 rounded text-gray-600 h-8"
      />

      <input
        type="submit"
        class="bg-gray-700 h-8 text-white rounded-md mt-2"
        value="Send"
        @click="handleSubmit"
      />
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
        class="bg-white w-3/4 h-72 z-40 md:w-96"
        @click.stop="eventPropagation"
      >
        <div class="flex flex-col items-center gap-3 m-auto">
          <h1 class="text-2xl text-center mt-2 text-gray-700">Edit Project</h1>
          <form
            action="#/projects"
            class="flex flex-col gap-1 mx-auto"
            autocomplete="off"
          >
            <label class="text-sm mt-2 font-medium">
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
              class="bg-gray-700 h-8 text-white rounded-md mt-2"
              type="submit"
              @click="handleEditSubmit(this.projData)"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
    </PageWrapper>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavBar from './NavBar'
import PageWrapper from './PageWrapper'
export default {
  components: { NavBar, PageWrapper },
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
    ...mapState("organization", { orgList: (state) => state.orgList }),
    ...mapState("project", { projList: (state) => state.projList }),
  },
  methods: {
    handleSubmit() {
      if (this.projData.name.trim() === "" || this.projData.orgId === null)
        return alert("all fields must be filled in");
      this.$store.dispatch("project/add", this.projData);
      this.projData.name = "";
    },
    remove(index) {
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
          this.projData.status = "Ongoing"
        })
        .catch(() => console.log("Não foi possível editar o projeto"));
    },
  },
};
</script>