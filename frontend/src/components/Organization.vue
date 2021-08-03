<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl mb-4 text-gray-700">My organizations</h1>
    <table>
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
          <img
            src="../assets/edit.svg"
            class="inline h-6 w-7"
            @click="toggleEditBox(org)"
            alt="Edit-Button"
          />

          <img
            src="../assets/delete.svg"
            class="inline h-8 w-9"
            @click="remove(org.id)"
            alt="Delete-Button"
          />
        </td>
      </tr>
    </table>
    <div class="flex flex-col">
      <h1 class="text-2xl text-gray-700 mt-5">Create a new organization</h1>
      <label for="org-name" class="text-sm mt-2 font-medium"> Name: </label>
      <input
        type="text"
        v-model="orgData.name"
        class="border pl-2 rounded text-gray-600 h-8"
        id="org-name"
        placeholder="Organization Name"
      />
      <input
        type="submit"
        @click="handleSubmit"
        class="bg-gray-700 h-8 text-white rounded-md mt-2"
        value="Send"
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
          <h1 class="text-2xl text-center mt-2 text-gray-700">
            Edit Organization
          </h1>
          <form
            action="#/organization"
            class="flex flex-col gap-1 mx-auto"
            autocomplete="off"
          >
            <label class="text-sm mt-2 font-medium">
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
              class="bg-gray-700 h-8 text-white rounded-md mt-2"
              type="submit"
              @click="handleEditSubmit(this.orgData)"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
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
    ...mapState("organization", { orgList: (state) => state.orgList }),
  },
  methods: {
    handleSubmit() {
      if (this.orgData.name.trim() === "")
        return alert("all fields must be filled in");
      this.$store.dispatch("organization/add", this.orgData.name);
      this.orgData.name = "";
    },
    remove(index) {
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
        })
        .catch(() => console.log("Não foi possível editar a organização"));
    },
  },
};
</script>
