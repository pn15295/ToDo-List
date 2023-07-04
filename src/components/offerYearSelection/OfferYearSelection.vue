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
      <FormalCheckbox
        v-for="option in preparedOptions"
        v-model="optionData[option.value]"
        :disabled="option.disabled"
        :id="`${id}-${option.value}`"
        :invalid="invalid"
        :key="option.value"
        :label="option.label"
        :valid="valid"
      >
        <div slot="valid"></div>
        <div slot="invalid"></div>
      </FormalCheckbox>
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
import { FormalCheckbox, Icon } from "webcc-ui-components";

export default {
  name: "OfferYearSelection",
  components: {
    Icon,
    FormalCheckbox,
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
    preparedOptions() {
      return this.options.map((option) => {
        return {
          ...option,
          disabled: this.disabled || option.disabled,
        };
      });
    },
    validationClasses() {
      return {
        "absolute right-4 top-0 w-7 h-7 pointer-events-none": true,
        "text-suc": this.valid,
        "text-err": this.invalid,
      };
    },
  },
  watch: {
    optionData: {
      handler(newOptionData) {
        // Die Werte der Optionen werden in ein Array konvertiert
        const optionValues = Object.values(newOptionData);

        // Es werden die Indexe der ausgewählten Checkboxen ermittelt
        const checkedIndexes = optionValues.reduce((acc, val, index) => {
          if (val) {
            acc.push(index);
          }
          return acc;
        }, []);

        // Überprüfen, ob zwei oder mehr Checkboxen ausgewählt sind
        if (checkedIndexes.length >= 2) {
          const firstIndex = checkedIndexes[0];
          const lastIndex = checkedIndexes[checkedIndexes.length - 1];

          // Durchlaufen und automatisch die Checkboxen zwischen dem ersten und letzten Index auswählen
          for (let i = firstIndex + 1; i < lastIndex; i++) {
            // Mit $set die Eigenschaft der optionData aktualisieren, um Reaktivität sicherzustellen
            this.$set(this.optionData, Object.keys(newOptionData)[i], true);
          }
        }
      },
      deep: true, // Tiefes Überwachen der Änderungen in optionData
    },
  },
};
</script>
