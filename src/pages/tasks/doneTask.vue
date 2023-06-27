<template>
  <div
    class="flex flex-col mx-auto md:mx-0 w-4/5 md:w-2/5 bg-gray-300 rounded-lg py-5 pb-5"
  >
    <div class="flex justify-center">
      <p class="text-2xl font-bold">Done tasks</p>
    </div>

    <div class="flex justify-center px-10">
      <ul class="py-3">
        <li
          class="flex gap-2 py-1 items-center"
          v-for="done in doneArray"
          :key="done.id"
        >
          <input type="checkbox" :id="'checkbox-' + done.id" :checked="true" />
          <label
            class="grid grid-cols-4 gap-5 w-full"
            :for="'checkbox-' + done.id"
          >
            <span class="col-span-3 description"
              >Description: {{ done.description }}</span
            >
            <span>Enddate: {{ done.enddate }}</span>
          </label>
        </li>
      </ul>
    </div>

    <div class="flex justify-center">
      <Button class="bg-gray-600" @click="reopenTask">Reopen</Button>
    </div>
  </div>
</template>

<script>
import { Button } from "webcc-ui-components";

export default {
  components: {
    Button,
  },
  name: "DoneTask",
  computed: {
    doneArray() {
      return this.$store.getters["tasks/getDoneTasks"];
    },
  },
  methods: {
    checkCheckbox(id) {
      const checkboxId = `checkbox-${id}`;
      const checkboxElement = document.getElementById(checkboxId);
      return checkboxElement.checked;
    },
    reopenTask() {
      // Nicht erledigte Aufgaben aus doneArray filtern
      const uncheckedTasks = this.doneArray.filter(
        (task) => {
          return !this.checkCheckbox(task.id);
        }
      );

      this.$emit("reopen", uncheckedTasks);
    },
  },
};
</script>
