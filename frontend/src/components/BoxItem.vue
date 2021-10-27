<template>
  <div class="flex flex-col justify-center mx-2 mt-2 min-h-12 rounded-r-md dark:bg-primary
    bg-medium-purple cursor-pointer">
    <div class="flex items-center rounded-r-md justify-between h-full" @click="entity ? sendToProject(id): ''">
      <h1 class="text-xs text-white ml-3 truncate hover:whitespace-normal">{{ title }}</h1>
      <div class="clip bg-primary dark:bg-skin h-full w-5/12 min-w-24 min-h-12 flex flex-col justify-center rounded-r-md">
        <h1 class="text-white text-xs font-light">{{status}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    status: String,
    entity: String,
    id: Number
  },
  methods: {
    sendToProject(id) {
      this.$router.push(`/project/${id}`);
    }
  }
}
</script>
