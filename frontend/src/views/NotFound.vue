<template>
  <div class="flex flex-col items-center">
    <NavBar />
    <div class="flex flex-col items-center mt-6 mx-2">
      <img src="@/assets/undraw_404.svg" alt="">
      <h1 class="font-lexend text-2xl text-title">Página não encontrada</h1>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: { NavBar }
  
}
</script>