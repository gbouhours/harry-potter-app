import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  let toasts = ref([]);
  function removeNotification(idNotification) {
    // Call the findIndex() method to get the index of the object in the array
    const indexOfObject = toasts.value.findIndex((object) => {
      return object.id === idNotification;
    });
    // Use the splice() method to remove the element at that index
    // The splice method changes the contents of the array by removing or replacing existing elements
    toasts.value.splice(indexOfObject, 1);
  }
  return { toasts, removeNotification };
});