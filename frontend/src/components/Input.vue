<template>
  <div class="relative mt-6">
    <input
      :type="type"
      class="text-gray-600 peer
        h-10 w-full border rounded
        pl-2 bg-input placeholder-transparent
        focus:outline-none"
      :id="id"
      placeholder="{{labelText}}"
      v-model="input"
      @input="() => $emit('getValue', this.input)"
    />
    <label
      :for="id"
      class="absolute left-2 -top-5
        text-input-text text-sm transition-all
        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
        peer-placeholder-shown:top-2 peer-focus:-top-5
        peer-focus:left-0 peer-focus:text-title
        peer-focus:text-sm"
      >{{ labelText }}
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  props: {
    id: String,
    type: {
      type: String,
      default: "text"
    },
    labelText: String,
  },
};
</script>