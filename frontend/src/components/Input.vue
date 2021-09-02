<template>
  <div class="relative mt-6">
    <input
      :type="type"
      class="peer input"
      :class="disabled ? 'disabled:bg-input-disabled disabled:bg-opacity-50' : ''"
      :id="id"
      placeholder="{{labelText}}"
      :value="this.value"
      @input="$emit('update:value', $event.target.value)"
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
  props: {
    id: String,
    value: String,
    type: {
      type: String,
      default: "text"
    },
    labelText: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value']
};
</script>