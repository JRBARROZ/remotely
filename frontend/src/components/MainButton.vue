<template>
  <div @click="showComponentList" class="fixed bottom-16 right-0 m-5 text-8xl bg-primary rounded-full p-3 text-white z-20 shadow  shadow-lg drop-shadow-md hover:opacity-80 hover:cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/>
      <path  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  </div>
</template>

<script>
export default {
  props:{
    storeRoute: String,
  },
  methods:{
    showComponentList(){
      this.$store.commit(this.storeRoute, true);
    }
  }
}
</script>
