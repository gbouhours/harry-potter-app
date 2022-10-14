<template>
  <div>
    <div v-if="store.isEditForm">
      <div>
        <FormEditMovie />
      </div>
    </div>
    <div v-else>
      <FormAddMovie />
    </div>
  </div>
</template>

<script>
import FormAddMovie from '@/components/FormAddMovie.vue';
import FormEditMovie from '@/components/FormEditMovie.vue';
import { useMovieStore } from "@/stores/movie";
export default {
  components: { FormEditMovie, FormAddMovie },
    setup() {
      const store = useMovieStore();
      return { store };
    },
}

</script>