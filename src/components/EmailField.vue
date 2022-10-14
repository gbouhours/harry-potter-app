<template>
  <div class="field">
    <div class="ui left icon input big">
      <i class="email icon" />
      <input
        v-model="input"
        type="email"
        placeholder="Email"
        autocomplete="off"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
    <div
      v-if="errors.email"
      class="ui basic label pointing red"
    >
      {{ errors.email }}
    </div>
  </div>
</template>
 <script>
import { ref } from "vue";
import useFormValidation from "@/composables/useFormValidation";
export default {
emits: ['update:modelValue'],
  setup() {
    let input = ref("");
    const { validateEmailField, errors } = useFormValidation();
    const validateInput = () => {
      validateEmailField("email", input.value);
    };
    return { input, errors, validateInput };
  },
};
</script>
