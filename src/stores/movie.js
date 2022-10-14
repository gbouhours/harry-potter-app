import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useMovieStore = defineStore("movie", () => {
  let isEditForm = ref(false);
  let movie = reactive({
    id: "",
    title: "",
    director: "",
    composer: "",
    dateRelease: "",
  });
  function resetMovieStore() {
    isEditForm.value = false;
    movie.id = '';
    movie.title = '';
    movie.director = '';
    movie.composer = '';
    movie.dateRelease = '';
  }
  return { movie, isEditForm, resetMovieStore }
});