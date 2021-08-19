<template>
  <div class="flex flex-col justify-center mx-2 mt-2 h-14 rounded-md bg-medium-purple">
    <div class="flex items-center justify-between h-full">
      <h1 class="text-xs text-white ml-3">{{ title }}</h1>
      <svg class="h-full min-w-max" viewBox="0 0 108 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g> 
          <path d="M8.5 0L103 0C105.761 0 108 2.23858 108 5V37C108 39.7614 105.761 42 103 42H0L8.5 0Z" fill="#8C8BFF"/>
          <text class="text-xsm text-right font-thin text-white ml-2" x="20" y="25"  fill="white">{{ status }}</text>
        </g>
      </svg>
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
