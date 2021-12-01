<template>
  <div class="wrapper">
    <div class="text-center mt-4 text-title">
      <div class="flex flex-wrap gap-2 justify-center relative">
        <div v-for="(word, index) in titleProcessed" :key="index">
          <h1 class="font-lexend text-2xl md:mt-3 dark:text-gray-200">
            {{ word }}
          </h1>
          <span
            class="w-max"
            v-if="titleProcessed.length == 1 && titleProcessed[0] != ''"
          >
            <img
              src="../assets/dash.svg"
              alt="dash"
              class="animate-slide-left"
            />
          </span>
          <span class="w-max" v-if="index == 1">
            <img
              src="../assets/dash.svg"
              alt="dash"
              class="animate-slide-left"
            />
          </span>
        </div>
        <div
          v-if="invite"
          @click="inviteUser"
          class="cursor-pointer text-center absolute right-80 flex align-center flex-col"
        >
          <span class="ml-3">
            <img src="../assets/invite.svg" alt="invite" />
          </span>
          <h1 class="font-light dark:text-gray-200">Convidar</h1>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    titleProcessed: function () {
      return this.title.split(" ");
    },
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    invite: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: "",
    },
  },
  methods: {
    inviteUser() {
      if (this.link != "") this.$router.push(this.link);
    },
  },
};
</script>