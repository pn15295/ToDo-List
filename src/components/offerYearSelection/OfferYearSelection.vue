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
        v-for="(option, index) in preparedOptions"
        v-model="optionData[option.value]"
        :disabled="isCheckboxDisabled(index)"
        :id="`${id}-${option.value}`"
        :invalid="invalid"
        :key="option.value"
        :label="option.label"
        :value="option.value"
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
    // Anzahl der Spalten für das Rasterlayout
    cols: {
      type: Number,
      default: 5,
    },
    // Deaktiviert den gesamten Bereich
    disabled: {
      type: Boolean,
      default: false,
    },
    // Fehlermeldungstext
    errorMessage: {
      type: String,
      default: undefined,
    },
    // Eindeutige ID für das div-Element
    id: {
      type: String,
      required: true,
    },
    // Gibt an, ob das Feld ungültig ist
    invalid: {
      type: Boolean,
      default: false,
    },
    // Titeltext
    title: {
      type: String,
      default: undefined,
    },
    // Optionen für die Checkboxen
    options: {
      type: Array,
      default: () => [],
    },
    // Typ der Checkbox (hier standardmäßig "checkbox")
    type: {
      type: String,
      default: "checkbox",
    },
    // Gibt an, ob das Feld gültig ist
    valid: {
      type: Boolean,
      default: false,
    },
    // Der Wert der Checkboxen (über v-model gebunden)
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // Interne Daten für die Optionen der Checkboxen
      optionData: this.value,
    };
  },
  computed: {
    // Klassen für die Spalten des Rasterlayouts
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
    // Klassen für die Fehlermeldung
    errorClasses() {
      return {
        "absolute left-1 text-err-text leading-tight": true,
        "text-xs lg:text-sm": !this.compact,
        "text-xs": this.compact,
      };
    },
    // Vorbereitete Optionen für die Checkboxen
    preparedOptions() {
      return this.options.map((option) => {
        return {
          ...option,
          disabled: false,
        };
      });
    },
    // Klassen für die Validierungs-Icons
    validationClasses() {
      return {
        "absolute right-4 top-0 w-7 h-7 pointer-events-none": true,
        "text-suc": this.valid,
        "text-err": this.invalid,
      };
    },
  },
  watch: {
    // Überwacht Änderungen des Wertes der Checkboxen
    value(newValue) {
      this.optionData = newValue;
    },
    // Überwacht Änderungen der optionData
    optionData(newOptionData) {
      // Sendet den geänderten Wert über das "input"-Event
      this.$emit("input", newOptionData);
    },
  },
  methods: {
    // Überprüft, ob die Checkbox deaktiviert sein soll
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
          // Setzt den Wert der deaktivierten Checkbox auf true
          this.$set(this.optionData, checkboxValue, true);
        }

        return disabled;
      }
      return false;
    },
  },
};
</script>
