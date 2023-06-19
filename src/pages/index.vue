<template>
  <main>
    <div class="flex justify-center pb-10">
      <h1 class="text-3xl font-bold">Tobi's ToDo List</h1>
    </div>

    <div class="flex justify-center pb-10">
      <div class="flex flex-col w-4/5 md:w-1/2 bg-gray-200 rounded-lg py-5">
        <div class="flex justify-center">
          <!-- Abschnitt zum Hinzufügen einer Aufgabe -->
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
    </div>

    <div class="flex flex-col md:flex-row md:justify-evenly">
      <div
        class="flex flex-col mx-auto md:mx-0 w-4/5 md:w-2/5 bg-gray-200 rounded-lg py-5 mb-5 md:mb-0"
      >
        <!-- Abschnitt mit den aktiven Aufgaben -->
        <div class="flex justify-center">
          <p class="text-2xl font-bold">Tasks</p>
        </div>

        <div class="flex justify-center px-10">
          <ul class="py-3">
            <li
              class="flex gap-2 py-1 items-center"
              v-for="data in dataArray"
              :key="data.id"
            >
              <input type="checkbox" :id="'checkbox-' + data.id" />
              <label
                class="grid grid-cols-4 gap-5 w-full"
                :for="'checkbox-' + data.id"
              >
                <span class="col-span-3"
                  >Description: {{ data.description }}</span
                >
                <span>Enddate: {{ data.enddate }}</span>
              </label>
            </li>
          </ul>
        </div>
        <div class="flex justify-center gap-2">
          <Button class="bg-green-700" @click="doneTask">Done</Button>
          <Button class="bg-red-700" @click="deleteTask">Delete</Button>
        </div>
      </div>

      <div
        class="flex flex-col mx-auto md:mx-0 w-4/5 md:w-2/5 bg-gray-200 rounded-lg py-5 pb-5"
      >
        <div class="flex justify-center">
          <!-- Abschnitt mit den erledigten Aufgaben -->
          <p class="text-2xl font-bold">Done tasks</p>
        </div>

        <div class="flex justify-center px-10">
          <ul class="py-3">
            <li
              class="flex gap-2 py-1 items-center"
              v-for="done in doneArray"
              :key="done.id"
            >
              <input
                type="checkbox"
                :id="'checkbox-' + done.id"
                :checked="true"
              />
              <label
                class="grid grid-cols-4 gap-5 w-full"
                :for="'checkbox-' + done.id"
              >
                <span class="col-span-3"
                  >Description: {{ done.description }}</span
                >
                <span>Enddate: {{ done.enddate }}</span>
              </label>
            </li>
          </ul>
        </div>

        <div class="flex justify-center">
          <Button class="bg-gray-500" @click="reopenTask">Reopen</Button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Button, FormalTextInput, NativeDatepicker } from "webcc-ui-components";
import ThemeColors from "../components/themeColors/ThemeColors.vue";

export default {
  name: "IndexPage",
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
      dataArray: [],
      doneArray: [],
    };
  },
  methods: {
    generateUniqueId() {
      return Date.now(); // Beispiel für eine zeistempel-basierte ID
    },

    saveData() {
      const newItem = {
        id: this.generateUniqueId(),
        description: this.description,
        enddate: this.enddate,
      };
      this.dataArray.push(newItem);
    },

    checkCheckbox(id) {
      const checkboxId = `checkbox-${id}`;
      const checkboxElement = document.getElementById(checkboxId);
      return checkboxElement.checked;
    },

    doneTask() {
      // Erledigte Aufgaben filtern
      const checkedTasks = this.dataArray.filter((task) => {
        return this.checkCheckbox(task.id);
      });

      // Erledigte Aufgaben zur doneArray hinzufügen
      this.doneArray.push(...checkedTasks);

      // Erledigte Aufgaben aus dataArray entfernen
      this.dataArray = this.dataArray.filter((task) => {
        return !this.checkCheckbox(task.id);
      });
    },

    reopenTask() {
      // Nicht erledigte Aufgaben aus doneArray filtern
      const uncheckedTasks = this.doneArray.filter((task) => {
        return !this.checkCheckbox(task.id);
      });

      // Nicht erledigte Aufgaben zu dataArray hinzufügen
      this.dataArray.push(...uncheckedTasks);

      // Erledigte Aufgaben aus doneArray entfernen
      this.doneArray = this.doneArray.filter((task) => {
        return this.checkCheckbox(task.id);
      });
    },

    deleteTask() {
      // Erledigte Aufgaben filtern
      const checkedTasks = this.dataArray.filter((task) => {
        return this.checkCheckbox(task.id);
      });

      // Erledigte Aufgaben aus dataArray entfernen
      this.dataArray = this.dataArray.filter((task) => {
        return !this.checkCheckbox(task.id);
      });
    },
  },
};
</script>
