<template>
  <p>Count avec Pinia {{ store.count }}</p>
  {{ store.doubleCount }}
  <button @click="store.increment">
    Increment
  </button>
</template>
<script>
import { useCounterStore } from "@/stores/counter";
export default {
  setup() {
    const store = useCounterStore();
    return { store }
  }
  }
</script>