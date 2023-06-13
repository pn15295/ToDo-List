<template>
  <main class="">
    <h1 class="text-3xl font-bold">Tobi's ToDo List</h1>

    <!-- Abschnitt zum Hinzufügen einer Aufgabe -->
    <div>
      <p class="text-2xl font-bold">Add task</p>
      <FormalTextInput v-model="description" type="text" label="description" />
      <NativeDatepicker v-model="enddate" id="enddate" label="enddate" />
      <Button variant="cta" @click="saveData">Save</Button>
      <ThemeColors />
    </div>

    <!-- Abschnitt mit den aktiven Aufgaben -->
    <div>
      <p class="text-2xl font-bold">Tasks</p>
      <ul>
        <li v-for="data in dataArray" :key="data.id">
          <input type="checkbox" :id="'checkbox-' + data.id" />
          <label :for="'checkbox-' + data.id">
            <span>Description: {{ data.description }}</span>
            <span>Enddate: {{ data.enddate }}</span>
          </label>
        </li>
      </ul>
      <Button variant="cta" @click="doneTask">Done</Button>
    </div>

    <!-- Abschnitt mit den erledigten Aufgaben -->
    <div>
      <p class="text-2xl font-bold">Done tasks</p>
      <ul>
        <li v-for="done in doneArray" :key="done.id">
          <input type="checkbox" :id="'checkbox-' + done.id" :checked="true" />
          <label :for="'checkbox-' + done.id">
            <span>Description: {{ done.description }}</span>
            <span>Enddate: {{ done.enddate }}</span>
          </label>
        </li>
      </ul>
      <Button variant="cta" @click="reopenTask">Reopen</Button>
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
  },
};
</script>