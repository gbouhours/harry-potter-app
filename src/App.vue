<template>
  <div class="fixed flex flex-col items-end top-20 right-2 z-100">
    <div 
      v-for="toast in store.toasts.filter((s) => s.show)"
      :key="toast.text + Math.random()"
    >
      <notification-toast
        :id="toast.id"
        :alert="toast.show"
        :msg="toast.text"
        :color="toast.color"
        :duration="toast.duration"
        @close="toast.show = $event"
      />
    </div>
  </div>
  <forms-movie />
  <movies-list />
</template>

<script>
import FormsMovie from '@/components/FormsMovie.vue';
import MoviesList from '@/components/MoviesList.vue';
import NotificationToast from "@/components/NotificationToast.vue";
import { useNotificationStore } from "@/stores/notification";

export default {
  name: 'App',
  components: {
    FormsMovie,
    MoviesList,
    NotificationToast,
  },
  setup() {
    const store = useNotificationStore();
    return { store }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @apply text-slate-600;
}
</style>
