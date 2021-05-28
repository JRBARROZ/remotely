<template>
  <div>
    <div class="flex justify-center items-center gap-2">
      <router-link to="/">Home</router-link> |
      <router-link to="/add">Add User</router-link> |
      <router-link to="/users">Users</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
</style>
