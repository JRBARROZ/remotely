<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl">My organizations</h1>
    <ul class="mb-2 border-b-2 border-black">
      <li v-for="(org, index) in orgList" :key="index" :ref="org + index">
        <p>
          {{ org.name }}
          <button @click="toggleEditBox(org)" class="mr-2">Edit</button>
          <button @click="remove(org.id)">X</button>
        </p>
      </li>
    </ul>
    <h1>Add a new Organization</h1>
    <input type="text" v-model="orgData.name" class="outline-black" />
    <input type="submit" @click="handleSubmit" />
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
      <div class="bg-white w-3/4 h-80 z-40 md:w-96" @click.stop="eventPropagation">
        <h1 class="text-xl text-center">
          What is the new name of the organization?
        </h1>
        <div>
          <input
            type="text"
            class="outline-none border-2 border-black w-3/4 h-10"
            v-model="this.orgData.name"
          />
          <button
            class="bg-gray-700 w-1/4 h-10 text-white"
            @click="handleEditSubmit(this.orgData)"
          >
            Send
          </button>
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
      this.$store.dispatch("organization/update", data);
      this.orgData.name = '';
      this.orgData.id = null;
      this.showModal = false;
    },
  },
};
</script>
