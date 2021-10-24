<template>
  <div>
    <div class="flex items-center justify-between w-full min-h-14 bg-primary rounded-t-md">
      <h1 class="font-comfoorta ml-4 text-left text-white flex-1 truncate hover:whitespace-normal focus:whitespace-normal cursor-pointer" @click="handleClick">{{ title }}</h1>
      <slot name="header"></slot>
    </div>
    <div class="flex flex-col pb-2 blue min-h-28 max-h-88 overflow-y-auto bg-light-purple w-full">
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