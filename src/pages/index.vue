<template>
  <main>
    <div class="flex justify-center pb-10">
      <h1 class="text-3xl font-bold">Tobi's ToDo List</h1>
    </div>

    <div class="flex justify-center pb-10">
      <addTask @save="saveTask" />
    </div>

    <style>
      .description {
        hyphens: auto;
      }
    </style>

    <div class="flex flex-col md:flex-row md:justify-evenly">
      <manageTask
        :dataArray="dataArray"
        :doneArray="doneArray"
        @done="doneTask"
        @delete="deleteTask"
      />

      <doneTask :doneArray="doneArray" @reopen="reopenTask" />
    </div>

    <div class="flex justify-center pt-10">
      <Button class="bg-green-500" @click="$fetch">Cat Fact</Button>
    </div>
    <div class="flex justify-center">
      <h2  class="text-lg">{{ catOutput }}</h2>
    </div>
  </main>
</template>

<script>
import { Button, FormalTextInput, NativeDatepicker } from "webcc-ui-components";
import ThemeColors from "../components/themeColors/ThemeColors.vue";
import addTask from "./tasks/addTask.vue";
import manageTask from "./tasks/manageTask.vue";
import doneTask from "./tasks/doneTask.vue";

export default {
  name: "IndexPage",
  components: {
    NativeDatepicker,
    Button,
    FormalTextInput,
    ThemeColors,
    addTask,
    manageTask,
    doneTask,
  },
  data() {
    return {
      catOutput: null,
    };
  },
  async fetch() {
    const url = "https://catfact.ninja/fact?max_length=200";

    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    this.catOutput = result.fact;
  },

  beforeMount() {
    const dataArray = JSON.parse(localStorage.getItem("Tasks")) || [];
    this.$store.commit("tasks/addTasks", dataArray);

    const doneArray = JSON.parse(localStorage.getItem("DoneTasks")) || [];
    this.$store.commit("tasks/addDoneTasks", doneArray);
  },
  computed: {
    dataArray() {
      return this.$store.getters["tasks/getTasks"];
    },
    doneArray() {
      return this.$store.getters["tasks/getDoneTasks"];
    },
  },
  methods: {
    // Generiert eine eindeutige ID basierend auf dem aktuellen Zeitstempel
    generateUniqueId() {
      return Date.now();
    },

    // Überprüft den Status eines Kontrollkästchens mit der angegebenen ID und gibt den Zustand (ausgewählt oder nicht ausgewählt) zurück
    checkCheckbox(id) {
      const checkboxId = `checkbox-${id}`;
      const checkboxElement = document.getElementById(checkboxId);
      return checkboxElement.checked;
    },

    // Fügt die neue Aufgabe dem dataArray hinzu (Aufgaben hinzufügen / speichern)
    saveTask(newTask) {
      this.$store.commit("tasks/addTasks", [newTask]);
    },

    // Verschiebt die markierten Aufgaben vom dataArray zum doneArray (Aufgaben als erledigt markieren)
    doneTask(checkedTasks) {
      this.$store.commit("tasks/removeTasks", checkedTasks);
      this.$store.commit("tasks/addDoneTasks", checkedTasks);
    },

    // Entfernt die markierten Aufgaben aus dem dataArray (Aufgaben löschen)
    deleteTask(checkedTasks) {
      this.$store.commit("tasks/removeTasks", checkedTasks);
    },

    // Fügt die nicht markierten Aufgaben dem dataArray hinzu und entfernt sie aus dem doneArray (Aufgaben wieder öffnen)
    reopenTask(uncheckedTasks) {
      this.$store.commit("tasks/reopenTasks", uncheckedTasks);
      this.$store.commit("tasks/removeDoneTasks", uncheckedTasks);
    },
  },
};
</script>
