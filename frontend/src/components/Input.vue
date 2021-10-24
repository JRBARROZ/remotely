<template>
  <div class="relative mt-6">
    <input
      :type="type"
      :min="type === 'date' ? this.today: ''"
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
  data() {
    return {
      today: '' 
    }
  },
  mounted() {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    this.today = `${yyyy}-${mm}-${dd}`
  },
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