<template>
  <section class="bg-purple-100">
    <div class="grid w-full grid-cols-1 gap-6 px-4 py-6 mx-auto lg:px-0 md:w-3/5 xl:w-1/2">
      <p
        v-if="error"
        class="text-base font-bold text-red-600"
      >
        Something went wrong...
      </p>
      <p
        v-if="loading" 
        class="text-base font-bold"
      >
        Loading...
      </p>
      <movie-list-item
        v-for="movie in result.movies"
        v-else
        :key="movie.id"
        :movie="movie"
        @remove-movie-list-item="removeMovieButtonEventHandler"
        @edit-movie-list-item="editMovieButtonEventHandler"
      />
      <base-alert
        ref="PopupModalChild"
        title-alert="Suppression du film"
      >
        <p class="mb-4 text-xl font-bold">
          Voulez vous supprimer le film ?
        </p>
        <p class="mb-8 text-lg">
          {{ titleMoviePopupModal }}
        </p>
        <div class="flex justify-end gap-4">
          <base-button
            @click="confirmRemoveMovieButtonPressed"
          >
            Supprimer
          </base-button>
          <base-button  
            @click="closeModalButtonPressed"
          >
            Annuler
          </base-button>
        </div>
      </base-alert>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import { useQuery } from '@vue/apollo-composable';
import { useMutation } from "@vue/apollo-composable";
import { logErrorMessages } from '@vue/apollo-util';
import MovieListItem from "./MovieListItem";
import BaseAlert from "@/components/BaseAlert";
import BaseButton from '@/components/BaseButton.vue';
import { GET_MOVIES, REMOVE_MOVIE } from '@/constants/graphql';
import { successRemoveMovie, errorRemoveMovie } from '@/constants/index';
import { useMovieStore } from "@/stores/movie";
import { useNotificationStore } from "@/stores/notification";

export default {
  components: { MovieListItem, BaseAlert, BaseButton },
  setup() {
    const PopupModalChild = ref();
    let titleMoviePopupModal = ref();
    let idMoviePopupModal = ref();
    let toast = reactive({
      show: false,
      text: "",
      color: "",
      duration: 0,
    });
    const store = useMovieStore();
    const storeNotification = useNotificationStore();

    const { result, loading, error } = useQuery(GET_MOVIES);

    const removeMovieButtonEventHandler = (movieId, movieTitle) => {
      PopupModalChild.value.openModal(movieTitle);
      titleMoviePopupModal.value = movieTitle;
      idMoviePopupModal.value = movieId;
    };

    const editMovieButtonEventHandler = (movieId, movieTitle, movieDirector, movieComposer, releaseDateFormated) => {
      store.isEditForm = true;
      store.movie.id = movieId;
      store.movie.title = movieTitle;
      store.movie.director = movieDirector;
      store.movie.composer = movieComposer;
      store.movie.dateRelease = releaseDateFormated;
      const elementScrollTarget = document.querySelector('form');
      elementScrollTarget.scrollIntoView({behavior: 'smooth', block: 'end'});
    };

    const closeModalButtonPressed = () => {
      PopupModalChild.value.closeModal();
    };

    const { mutate: confirmRemoveMovieButtonPressed, onDone, onError } = useMutation(REMOVE_MOVIE, () => ({
      variables: {
        id: idMoviePopupModal.value,
      },
      refetchQueries: ["getMovies"],
    }));

    onDone(() => {
      PopupModalChild.value.closeModal();
      storeNotification.toasts.push({ id: Math.random(), show: true, text: successRemoveMovie, color: 'success', duration: 4000 });
    });

    onError(error => {
      logErrorMessages(error);
      PopupModalChild.value.closeModal();
      storeNotification.toasts.push({ id: Math.random(), show: true, text: errorRemoveMovie, color: 'warning', duration: 10000 });
    });

    return { result, loading, error, PopupModalChild, removeMovieButtonEventHandler, titleMoviePopupModal, idMoviePopupModal, closeModalButtonPressed, confirmRemoveMovieButtonPressed, toast, editMovieButtonEventHandler, store }
  }
};
</script>