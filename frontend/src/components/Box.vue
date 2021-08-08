<template>
  <div class="flex flex-col h-72 mx-4 blue bg-light-purple rounded-t-md">
    <div class="flex items-center justify-between w-full h-14 bg-primary rounded-t-md">
      <h1 class="font-comfoorta ml-4 text-white">{{ title }}</h1>
      <div class="flex gap-1 mr-4">
        <p class="font-comfoorta text-white text-xs w-24">Create a new {{ subtitle }}</p>
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
        >
          <path
            d="M14.85 6.75H12.15V12.15H6.75V14.85H12.15V20.25H14.85V14.85H20.25V12.15H14.85V6.75ZM13.5 0C6.048 0 0 6.048 0 13.5C0 20.952 6.048 27 13.5 27C20.952 27 27 20.952 27 13.5C27 6.048 20.952 0 13.5 0ZM13.5 24.3C7.5465 24.3 2.7 19.4535 2.7 13.5C2.7 7.5465 7.5465 2.7 13.5 2.7C19.4535 2.7 24.3 7.5465 24.3 13.5C24.3 19.4535 19.4535 24.3 13.5 24.3Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    subtitle: String,
  },
};
</script>