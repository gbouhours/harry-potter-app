<template>
  <div
    :key="movie.id"
    class="px-4 py-3 mb-3 bg-white rounded-md"
  >
    <h3 class="mb-3 text-lg font-bold">
      {{ movie.title }}
    </h3>
    <p class="mb-3">
      {{ movie.director }}
    </p>
    <p class="mb-3">
      {{ movie.composer }}
    </p>
    <p>{{ releaseDateFormated }}</p>
    <div class="flex justify-end gap-4">
      <base-button 
        @click="editMovieButtonPressed(movie.id, movie.title, movie.director, movie.composer,releaseDateFormated)"
      >
        Editer le film
      </base-button>
      <base-button 
        @click="removeMovieButtonPressed(movie.id, movie.title)"
      >
        Supprimer le film
      </base-button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import dayjs from "dayjs";
import BaseButton from "@/components/BaseButton";
export default {
  components: {
    BaseButton
  },
  props: {
    movie: {
      type: Object,
      default: () => ({}),
    }
  },
emits: ['remove-movie-list-item', 'edit-movie-list-item'],
  setup(props, { emit }) {
    let releaseDateFormated = ref();
    releaseDateFormated = dayjs(props.movie.release_date).format('DD/MM/YYYY');
    const removeMovieButtonPressed = (movieId, movieTitle) => {
      emit('remove-movie-list-item', movieId, movieTitle)
    }
    const editMovieButtonPressed = (movieId, movieTitle, movieDirector, movieComposer,releaseDateFormated) => {
      emit('edit-movie-list-item', movieId, movieTitle, movieDirector, movieComposer,releaseDateFormated)
    }
    return { removeMovieButtonPressed, editMovieButtonPressed, releaseDateFormated }
  }
}
</script>