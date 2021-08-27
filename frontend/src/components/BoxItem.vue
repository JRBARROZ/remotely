<template>
  <div class="flex flex-col justify-center mx-2 mt-2 h-14 rounded-md bg-medium-purple">
    <div class="flex items-center justify-between h-full">
      <h1 class="text-xs text-white ml-3">{{ title }}</h1>
      <div class="clip bg-primary h-full w-6/12 flex flex-col justify-center rounded-tr-md rounded-br-md">
          <h1 class="text-white text-xs font-light">{{status}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    status: String
  }
}
</script>
