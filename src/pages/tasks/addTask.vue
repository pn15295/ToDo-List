<template>
  <div class="flex flex-col w-4/5 md:w-1/2 bg-gray-300 rounded-lg py-5">
    <div class="flex justify-center">
      <p class="text-2xl font-bold">Add task</p>
    </div>

    <div class="flex flex-col w-4/5 mx-auto py-5">
      <FormalTextInput
        v-model="description"
        type="text"
        label="description"
        class="pb-5"
      />
      <NativeDatepicker v-model="enddate" id="enddate" label="enddate" />
    </div>

    <div class="flex justify-center">
      <Button class="bg-blue-700" @click="saveData">Save</Button>
      <ThemeColors />
    </div>
  </div>
</template>

<script>
import { Button, FormalTextInput, NativeDatepicker } from "webcc-ui-components";
import ThemeColors from "../../components/themeColors/ThemeColors.vue";

export default {
  components: {
    NativeDatepicker,
    Button,
    FormalTextInput,
    ThemeColors,
  },
  data() {
    return {
      description: "",
      enddate: "",
    };
  },
  methods: {
    generateUniqueId() {
      return Date.now(); // Beispiel für eine zeistempel-basierte ID
    },

    saveData() {
      const newTask = {
        id: this.generateUniqueId(),
        description: this.description,
        enddate: this.enddate,
      };
      this.$emit("save", newTask); // Ereignis auslösen und die Daten übergeben
      this.description = "";
      this.enddate = "";
    },
  },
};
</script>
