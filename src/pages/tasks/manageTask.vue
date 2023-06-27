<template>
  <div
    class="flex flex-col mx-auto md:mx-0 w-4/5 md:w-2/5 bg-gray-300 rounded-lg py-5 mb-5 md:mb-0"
  >
    <div class="flex justify-center">
      <p class="text-2xl font-bold">Tasks</p>
    </div>

    <div class="flex justify-center px-5 md:px-10">
      <ul class="py-3">
        <li
          class="flex gap-2 py-1 items-center"
          v-for="data in dataArray"
          :key="data.id"
        >
          <input type="checkbox" :id="'checkbox-' + data.id" />
          <label
            class="grid grid-cols-4 gap-2 md:gap-5 w-full"
            :for="'checkbox-' + data.id"
          >
            <span class="col-span-3 description"
              >Description: {{ data.description }}</span
            >
            <span>Enddate: {{ data.enddate }}</span>
          </label>
        </li>
      </ul>
    </div>

    <div class="flex justify-center gap-2">
      <Button class="bg-green-500" @click="doneTask">Done</Button>
      <Button class="bg-red-500" @click="deleteTask">Delete</Button>
    </div>
  </div>
</template>

<script>
import { Button } from "webcc-ui-components";
export default {
  components: {
    Button,
  },
  name: "ManageTask",
  computed: {
    dataArray() {
      return this.$store.getters["tasks/getTasks"];
    },
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
    doneTask() {
      const checkedTasks = this.dataArray.filter((task) => {
        return this.checkCheckbox(task.id);
      });

      this.$emit("done", checkedTasks);
    },
    deleteTask() {
      const checkedTasks = this.dataArray.filter((task) => {
        return this.checkCheckbox(task.id);
      });

      this.$emit("delete", checkedTasks);
    },
  },
};
</script>
