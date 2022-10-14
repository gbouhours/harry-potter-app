<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="popup-modal"
    >
      <div class="window">
        <div class="flex justify-between pb-4 mb-6 border-b">
          <p class="font-bold">
            {{ titleAlert }}
          </p>
          <base-button 
            @click="closeModal"
          >
            X
          </base-button>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref } from 'vue'
import BaseButton from "@/components/BaseButton.vue";

export default defineComponent({
  components: { BaseButton },
  props: {
    titleAlert: {
      type: String,
      default: "",
    }
  },
  setup(props, context) {
    const isVisible = ref(false);
    const movieTitle = ref();
    const openModal = (movieTitle) => {
      isVisible.value = true;
      setTitleMovieToModal(movieTitle);
    };
    const setTitleMovieToModal = (title) => {
      movieTitle.value = title;
    };
    const closeModal = () => {
      isVisible.value = false;
    };

    context.expose({ openModal, closeModal })
    return { isVisible, movieTitle, setTitleMovieToModal, closeModal }
  }
})

</script>

<style scoped>
/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 1;
}

.window {
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}
</style>