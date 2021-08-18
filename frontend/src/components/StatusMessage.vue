<template>
  <div
    class="mt-6 rounded border pt-4 pb-3 mx-8 px-6 text-center relative"
    :class="
      status[0] === 'success'
        ? 'bg-green-100 text-green-700 border-green-700'
        : status[0] === 'error'
        ? 'bg-red-100 text-red-700 border-red-700'
        : status[0] === 'warning'
        ? 'bg-yellow-100 text-yellow-700 border-yellow-700'
        : ''
    "
    v-if="status.length > 0 && status[1] !== 'loading'"
  >
    <svg
      @click="closeMessage()"
      class="cursor-pointer w-6 h-6 absolute top-0 right-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="fill-current"
        :class="
          status[0] === 'success'
            ? 'text-green-700'
            : status[0] === 'error'
            ? 'text-red-700'
            : status[0] === 'warning'
            ? 'text-yellow-700'
            : ''
        "
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      />
    </svg>
    <span v-if="typeof status[1] === 'string'">
      {{ status[1] }}
    </span>
    <ul v-else class="list-inside">
      <li v-for="(stat, index) in status[1]" :key="index">
        {{ stat }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    status: Array,
  },
  methods: {
    closeMessage() {
      this.$store.commit("resetStatus");
    },
  }
}
</script>