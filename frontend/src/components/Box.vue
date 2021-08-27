<template>
  <div class="flex flex-col pb-2 mb-4 blue bg-light-purple rounded-t-md overflow-auto">
    <div class="flex items-center justify-between w-full min-h-14 bg-primary rounded-t-md">
      <h1 class="font-comfoorta ml-4 text-white" @click="handleClick">{{ title }}</h1>
      <slot name="header"></slot>
    </div>
    <slot />
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