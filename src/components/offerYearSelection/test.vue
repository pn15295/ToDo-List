<template>
  <div class="relative">
    <div class="flex flex-row">
      <slot name="title">
        <label v-if="title">{{ title }}</label>
      </slot>

      <slot name="valid">
        <Icon v-if="valid" graphic="check" :class="validationClasses" />
      </slot>
      <slot name="invalid">
        <Icon
          v-if="invalid"
          graphic="error-warning"
          :class="validationClasses"
        />
      </slot>
    </div>

    <div class="grid gap-4" :class="columns[cols]">
      <label
        v-for="(option, index) in preparedOptions"
        :key="option.value"
        class="flex items-center"
      >
        <input
          type="checkbox"
          :id="`${id}-${option.value}`"
          :value="option.value"
          v-model="optionData[option.value]"
          :disabled="isCheckboxDisabled(index)"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage && invalid && !disabled">
      <slot name="error" :error-message="errorMessage">
        <span :class="errorClasses">{{ errorMessage }}</span>
      </slot>
    </div>
  </div>
</template>

<script>
import { Icon } from "webcc-ui-components";

export default {
  name: "OfferYearSelection",
  components: {
    Icon,
  },
  props: {
    cols: {
      type: Number,
      default: 5,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: undefined,
    },
    id: {
      type: String,
      required: true,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: undefined,
    },
    options: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "checkbox",
    },
    valid: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      optionData: this.value,
    };
  },
  computed: {
    columns() {
      return {
        0: "lg:grid-cols-none",
        1: "lg:grid-cols-1",
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
        5: "lg:grid-cols-5",
        6: "lg:grid-cols-6",
        7: "lg:grid-cols-7",
        8: "lg:grid-cols-8",
        9: "lg:grid-cols-9",
        10: "lg:grid-cols-10",
        11: "lg:grid-cols-11",
        12: "lg:grid-cols-12",
      };
    },
    errorClasses() {
      return {
        "absolute left-1 text-err-text leading-tight": true,
        "text-xs lg:text-sm": !this.compact,
        "text-xs": this.compact,
      };
    },
    validationClasses() {
      return {
        "w-4 h-4 ml-2": true,
        "text-suc": this.valid,
        "text-err": this.invalid,
      };
    },
    
  },
  watch: {
    value(newValue) {
      this.optionData = newValue;
    },
    optionData(newOptionData) {
      this.$emit("input", newOptionData);
    },
  },
  methods: {
    isCheckboxDisabled(index) {
      const optionKeys = Object.keys(this.optionData);
      const checkedKeys = optionKeys.filter((key) => this.optionData[key]);

      if (checkedKeys.length >= 2) {
        const firstIndex = optionKeys.indexOf(checkedKeys[0]);
        const lastIndex = optionKeys.indexOf(
          checkedKeys[checkedKeys.length - 1]
        );

        const disabled = index > firstIndex && index < lastIndex;
        const checkboxValue = this.preparedOptions[index].value;

        if (disabled) {
          this.$set(this.optionData, checkboxValue, true);
        }

        return disabled;
      }
      return false;
    },
  },
};
</script>

<style>
.label-warning {
  color: #ff9800;
}
</style>
