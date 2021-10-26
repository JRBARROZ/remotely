<template>
  <div class="relative mt-6">
    <input
      v-model="chosenOption"
      @input="handleInput"
      :placeholder="placeholder"
      ref="input"
      id="select-input"
      tabindex="0"
      @click="handleClickInput"
      :class="inputClass"
    />
    <label for="select-input" class="input-label">
      Prioridade
    </label>
    <span
      v-if="showResetButton"
      @click.prevent="reset()"
      class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
    >
      x
    </span>
    <div
      v-show="showOptions"
      @click.self="handleSelf()"
      @focusout="showOptions = false"
      tabindex="0"
      :class="dropdownClass"
    >
      <ul class="py-1">
        <li
          v-for="(item, index) in searchResults"
          :key="index"
          @click="handleClick(item)"
          class="px-3 py-2 cursor-pointer hover:bg-gray-200 text-left"
        >
          {{ item }}
        </li>
        <li v-if="!searchResults.length" class="px-3 py-2 text-center">
          No Matching Results
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      showResetButton: false,
      showOptions: false,
      chosenOption: "",
      searchTerm: "",
    };
  },
  props: {
    value: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: "Selecione ou digite",
    },
    data: {
      type: Array,
      required: true,
    },
    inputClass: {
      type: String,
      required: false,
      default: "peer input",
    },
    dropdownClass: {
      type: String,
      required: false,
      default:
        "absolute w-full z-50 bg-white border border-gray-300 mt-1 max-h-40 overflow-hidden overflow-y-scroll rounded-md shadow-md",
    },
  },
  computed: {
    searchResults() {
      return this.data.filter((item) => {
        return item.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    },
  },

  methods: {
    reset() {
      this.$emit("input", "");
      this.$emit("chosen", "");
      this.chosenOption = "";
      this.searchTerm = "";
    },
    handleInput(evt) {
      this.$emit("input", evt.target.value);
      this.searchTerm = evt.target.value;
      if (this.searchTerm !== "") this.showResetButton = true;
      else this.showResetButton = false;
      this.showOptions = true;
    },
    handleClick(item) {
      this.$emit("input", item);
      this.$emit("chosen", item);
      this.chosenOption = item;
      this.searchTerm = item;
      this.inputValue = item;
      this.showOptions = false;
      this.$refs.input.focus();
    },
    handleClickInput() {
      this.showOptions = !this.showOptions;
      if (this.searchTerm !== "") this.showResetButton = true;
      else this.showResetButton = false;
    },
    clickedOutside() {
      this.showOptions = false;

      if (!this.chosenOption) {
        this.$emit("input", "");
      }
    },
  },
};
</script>