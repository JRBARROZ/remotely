<template>
  <div
    class="bg-gray-900 bg-opacity-50 min-h-screen min-w-screen z-60 fixed
      top-0 flex flex-col pt-16 items-center left-0 px-6"
    @click="$emit('result', 'false')"
  >
    <div
      class="bg-white w-full h-full z-70 md:w-96 p-5 rounded"
      @click.stop="eventPropagation"
    >
      <div class="flex flex-col items-center gap-3 m-auto">
        <h1 class="text-2xl text-center text-gray-700">{{ this.title }} <span v-if="this.data !== ''" class="font-semibold text-medium-dark-purple">{{ this.data }}?</span></h1>
        <p v-if="this.content !== 'null'">{{ this.content }}</p>
        <div v-if="this.type !== 'alert'" class="flex items-end justify-center relative gap-3 w-full min-h-14">
          <button
            class="bg-success rounded-md min-w-28 p-2 mt-2
            hover:bg-green-200 transition-all"
            @click="$emit('result', 'true')"
          >Confirmar</button>
          <button
            class="bg-error rounded-md min-w-28 p-2 mt-2
            hover:bg-red-200 transition-all"
            @click="$emit('result', 'false')"
          >Cancelar</button>
        </div>
        <div v-else class="flex items-end justify-center relative gap-3 w-full min-h-14">
          <button
            class="bg-error rounded-md min-w-28 p-2 mt-2
            hover:bg-red-200 transition-all"
            @click="$emit('result', 'true')"
          >Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    content: {
      type: String,
      default: "null"
    },
    data: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'null'
    }
  },
  emits: ['result']
}
</script>