<template>
  <div
    v-if="alert"
    class="px-6 py-4 mb-6 text-white border-0 w-fit rounded-l-md"
    :class="colorVariant"
  >
    <p class="inline-block mr-8 font-extrabold align-middle">
      {{ msg }}
    </p>
    <button
      class="right-0 text-2xl top-6"
      @click="close(id)"
    >
      x
    </button>
  </div>
</template>
<script>
import { reactive, computed, onBeforeUnmount, onMounted } from 'vue'
import { useNotificationStore } from "@/stores/notification";

export default {
  props: {
    alert: {
      type: Boolean,
    },
    msg: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  emits: ['close', 'alert'],
  setup(props, { emit }) {
    const state = reactive({
      timer: ''
    })
    const store = useNotificationStore();

    const colorVariant = computed(() => {
      let color = 'bg-blue-500'
      switch (props.color) {
        case 'success':
          color = 'bg-green-500'
          break
        case 'warning':
          color = 'bg-yellow-500'
          break
        case 'danger':
          color = 'bg-red-500'
          break
        default:
          color = 'bg-green-500'
          break
      }
      return color
    });

    const close = (id) => {
      store.removeNotification(id);
      emit('close', false);
    };

    onMounted(() => {
      if (props.duration != 0) {
        state.timer = setTimeout(() => {
          close()
        }, props.duration)
      }
    })

    onBeforeUnmount(() => {
      clearTimeout(state.timer)
    })
    return { state, colorVariant, close }
  },
}
</script>