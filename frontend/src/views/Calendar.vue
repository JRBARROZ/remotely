<template>
  <div class="flex flex-col items-center justify-center relative">
    <NavBar />
    <FullCalendar class=" dark:text-white mt-5 flex-1 p-4 md:w-2/4"/>
  </div> 
</template>

<script>
import PageWrapper from "@/components/PageWrapper";
import NavBar from "@/components/NavBar";
import FullCalendar from "@/components/FullCalendar"
export default {
  components: {NavBar, FullCalendar},
  name:"Calendar"
};
</script>

<style>
</style>