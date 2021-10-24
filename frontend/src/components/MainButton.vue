<template>
  <div>
    <div @click="showComponentList" class="fixed bottom-16 right-0 m-5 text-8xl bg-primary
     rounded-full p-3 text-white z-20 shadow-lg drop-shadow-md hover:opacity-80
     hover:cursor-pointer md:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="40px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/>
        <path  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    </div>
    <button @click="showComponentList" class="hidden md:block fixed bottom-24 -ml-24 left-auto
     mt-3 py-2 bg-skin text-white focus:outline-none rounded hover:opacity-80 w-48
     md:w-56 border-none transition-all">Criar {{ entity }}</button>
  </div>
</template>

<script>
export default {
  props:{
    storeRoute: String,
    entity: String
  },
  methods:{
    showComponentList(){
      this.$store.commit(this.storeRoute, true);
    }
  }
}
</script>
