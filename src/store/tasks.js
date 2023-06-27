export const state = () => ({
  dataArray: [],
  doneArray: [],
});

export const getters = {
  getTasks(state) {
    return state.dataArray;
  },

  getDoneTasks(state) {
    return state.doneArray;
  },
};

export const mutations = {
  addTask(state, task) {
    state.dataArray.push(task);
  },

  removeTasks(state, tasksToRemove) {
    state.dataArray = state.dataArray.filter((task) => {
      return !tasksToRemove.some((removedTask) => removedTask.id === task.id);
    });
  },

  setTasks(state, dataArray) {
    state.dataArray = dataArray;
  },

  addDoneTasks(state, task) {
    state.doneArray = [...state.doneArray, task]; //gleich wie state.doneArray = doneArray, einfach, dass man sagen kann ob der Eintrag am Anfang oder am Ende sein soll (vor oder nach ...)
  },

  removeDoneTasks(state, tasksToRemove) {
    state.doneArray = state.doneArray.filter((task) => {
      return !tasksToRemove.some((removedTask) => removedTask.id === task.id);
    });
  },

  setDoneTasks(state, doneArray) {
    state.doneArray = doneArray;
  },
};
