<template>
  <div class="relative mt-6">
    <input
      :type="type"
      class="peer input"
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
      input: this.initialText ?? "",
    };
  },
  props: {
    id: String,
    type: {
      type: String,
      default: "text"
    },
    labelText: String,
    initialText: String
  },
};
</script>