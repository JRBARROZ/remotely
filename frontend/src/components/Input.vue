<template>
  <div class="relative mt-6">
    <input
      :type="type"
      class="peer input"
      :class="disabled ? 'disabled:bg-input-disabled disabled:bg-opacity-50' : ''"
      :id="id"
      placeholder="{{labelText}}"
      v-model="input"
      @input="() => $emit('getValue', this.input)"
      :disabled="disabled"
    />
    <label
      :for="id"
      class="input-label"
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
    initialText: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
};
</script>