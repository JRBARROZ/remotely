<template>
  <div class="bg-remotely-pattern rounded-t-md">
    <div class="flex items-center justify-between w-full min-h-14 bg-primary dark:bg-skin rounded-t-md">
      <h1 class="font-comfoorta ml-4 text-left text-white flex-1 truncate hover:whitespace-normal focus:whitespace-normal cursor-pointer" @click="handleClick">{{ title }}</h1>
      <slot name="header"></slot>
    </div>
    <div class="flex flex-col bg-light-purple pb-2 mb-6 sm:mb-0 min-h-56 max-h-88 overflow-y-auto w-full">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    subtitle: String,
    link: {String},
  },
  methods:{
    handleClick(){
      this.$router.push(this.link)
    }
  }
};
</script>