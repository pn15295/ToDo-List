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
      this.$store.commit("tasks/addTask", newTask);
      // window.localStorage.setItem("dataArray", JSON.stringify(this.dataArray));
    },

    // Verschiebt die markierten Aufgaben vom dataArray zum doneArray (Aufgaben als erledigt markieren)
    doneTask(checkedTasks) {
      /*this.dataArray = this.dataArray.filter((task) => {
        return !checkedTasks.some((checkedTask) => checkedTask.id === task.id);
      });*/
      this.$store.commit("tasks/removeTasks", checkedTasks);
      this.$store.commit("tasks/addDoneTasks", checkedTasks);
      /*window.localStorage.setItem("doneArray", JSON.stringify(this.doneArray));
      window.localStorage.setItem("dataArray", JSON.stringify(this.dataArray));*/
    },

    // Entfernt die markierten Aufgaben aus dem dataArray (Aufgaben löschen)
    deleteTask(checkedTasks) {
      // this.dataArray = this.dataArray.filter((task) => {
      //   return !checkedTasks.some((checkedTask) => checkedTask.id === task.id);
      // });
      this.$store.commit("tasks/removeTasks", checkedTasks);
      //window.localStorage.setItem("dataArray", JSON.stringify(this.dataArray));
    },

    // Fügt die nicht markierten Aufgaben dem dataArray hinzu und entfernt sie aus dem doneArray (Aufgaben wieder öffnen)
    reopenTask(uncheckedTasks) {
      // this.dataArray.push(...uncheckedTasks);
      // this.doneArray = this.doneArray.filter((task) => {
      //   return this.checkCheckbox(task.id);
      // });
      this.$store.commit("tasks/addTask", uncheckedTasks);
      this.$store.commit("tasks/removeDoneTasks", this.doneArray);
      /* window.localStorage.setItem("doneArray", JSON.stringify(this.doneArray));
      window.localStorage.setItem("dataArray", JSON.stringify(this.dataArray));*/
    },
  },
};
</script>
