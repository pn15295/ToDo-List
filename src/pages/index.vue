<template>
  <div>
    <OfferYearSelectionComponent
      :options="mockOptions"
      v-model="FormData"
      id="id"
    />
  </div>
</template>

<script>
import OfferYearSelectionComponent from "../components/offerYearSelection/OfferYearSelection.vue";

export default {
  name: "OfferYearSelection",
  components: {
    OfferYearSelectionComponent,
  },
  props: {
    offerYears: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      FormData: {
        first: false,
        second: false,
        third: false,
        /*fourth: false,
        fifth: false,*/
      },
    };
  },
  computed: {
    mockOptions() {
      return [
        { label: "first", value: "first" },
        { label: "second", value: "second" },
        { label: "third", value: "third" },
        /*{ label: "fourth", value: "fourth" },
        { label: "fifth", value: "fifth" },*/
      ];
    },
  },
};
</script>
