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
  addTasks(state, tasks) {
    state.dataArray.push(...tasks);
    localStorage.setItem("Tasks", JSON.stringify(state.dataArray));
  },

  removeTasks(state, tasksToRemove) {
    state.dataArray = state.dataArray.filter((task) => {
      return !tasksToRemove.some((removedTask) => removedTask.id === task.id);
    });
    localStorage.setItem("Tasks", JSON.stringify(state.dataArray));
  },

  reopenTasks(state, tasks) {
    state.dataArray.push(...tasks);
    localStorage.setItem("Tasks", JSON.stringify(state.dataArray));
  },

  addDoneTasks(state, tasks) {
    state.doneArray = tasks;
    localStorage.setItem("DoneTasks", JSON.stringify(state.doneArray));
    //state.doneArray = [...state.doneArray, ...tasks]; //gleich wie state.doneArray = doneArray, einfach, dass man sagen kann ob der Eintrag am Anfang oder am Ende sein soll (vor oder nach ...)
  },

  removeDoneTasks(state, tasksToRemove) {
    state.doneArray = state.doneArray.filter((task) => {
      return !tasksToRemove.some((removedTask) => removedTask.id === task.id);
    });
    localStorage.setItem("DoneTasks", JSON.stringify(state.doneArray));
  },
};
