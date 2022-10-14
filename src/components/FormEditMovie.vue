<template>
  <section class="flex items-center justify-center h-screen px-4 bg-purple-50 lg:px-0">
    <form
      class="grid grid-cols-1 gap-6 w-96"
      novalidate
      @submit.prevent
    >
      <!-- Bind movie Object to the appropriate input PopupModalPopupModalChild components using the v-model directive. -->
      <!-- Add a key attribute to our component, and then change that key whenever we need the component to be re-rendered. -->
      <title-field
        :key="componentKey"
        v-model="movie.title"
      />
      <director-field
        :key="componentKey"
        v-model="movie.director"
      />
      <composer-field
        :key="componentKey"
        v-model="movie.composer"
      />
      <date-release-field
        :key="componentKey"
        v-model="movie.dateRelease"
      />
      <!-- add the :disabled attribute passing the isButtonDisabled variable in quotes -->
      <base-button
        :disabled="isButtonDisabled"
        @click="editMovieButtonPressed"
      >
        Editer un film
      </base-button>
    </form>
  </section>
  <notification-toast
    :alert="toast.show"
    :msg="toast.text"
    :color="toast.color"
    :duration="toast.duration"
    @close="toast.show = $event"
  />
</template>

<script>
import { reactive, ref, watch } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { logErrorMessages } from '@vue/apollo-util';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useFormValidation from "@/composables/useFormValidation";
import useSubmitButtonState from "@/composables/useSubmitButtonState";
import BaseButton from "@/components/BaseButton";
import TitleField from "@/components/TitleField.vue";
import DirectorField from "@/components/DirectorField.vue";
import ComposerField from "@/components/ComposerField.vue";
import DateReleaseField from "@/components/DateReleaseField.vue";
import NotificationToast from "@/components/NotificationToast.vue";
import { EDIT_MOVIE } from '@/constants/graphql';
import { successEditMovie, errorEditMovie } from '@/constants/index';
import { useMovieStore } from "@/stores/movie";
import { useNotificationStore } from "@/stores/notification";

export default {
  components: {
    TitleField,
    DirectorField,
    ComposerField,
    DateReleaseField,
    BaseButton,
    NotificationToast,
  },
  setup() {
    dayjs.extend(customParseFormat)
    // declare the movie object with 4 properties
    let movie = reactive({
      title: "",
      director: "",
      composer: "",
      dateRelease: "",
    });

    let toast = reactive({
      show: false,
      text: "",
      color: "",
      duration: 0,
    });

    // Declare variable as integer
    let componentKey = ref(0);
    const { errors } = useFormValidation();
    const store = useMovieStore();
    const storeNotification = useNotificationStore();
    // Destructure the isButtonDisabled variable by calling the useSubmitButtonState() with the movie and errors parameters.
    const { isButtonDisabled } = useSubmitButtonState(movie, errors);

    watch(() => {
      if (store.isEditForm) {
        movie.title = store.movie.title;
        movie.director = store.movie.director;
        movie.composer = store.movie.composer;
        movie.dateRelease = store.movie.dateRelease;
      }
    })

    const { mutate: editMovieButtonPressed, onDone, onError } = useMutation(EDIT_MOVIE, () => ({
      variables: {
        id: store.movie.id,
        title: movie.title,
        director: movie.director,
        composer: movie.composer,
        release_date: dayjs(movie.dateRelease, 'DD/MM/YYYY').year() + '-' + (dayjs(movie.dateRelease, 'DD/MM/YYYY').month() + 1) + '-' + dayjs(movie.dateRelease, 'DD/MM/YYYY').date(),
      },
      refetchQueries: ["getMovies"],
    }));

    onDone(() => {
      componentKey.value += 1;
      store.resetMovieStore();
      storeNotification.toasts.push({ id: Math.random(), show: true, text: successEditMovie, color: 'success', duration: 4000 });
    });

    onError(error => {
      logErrorMessages(error)
      storeNotification.toasts.push({ id: Math.random(), show: true, text: errorEditMovie, color: 'warning', duration: 10000 });
    });

    return { movie, toast, isButtonDisabled, componentKey, editMovieButtonPressed, store }
  }
}
</script>
