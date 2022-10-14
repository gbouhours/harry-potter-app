<template>
  <div class="field">
    <div class="ui left icon input big">
      <i class="lock icon" />

      <input
        v-model="input"
        type="password"
        placeholder="Password"
        autocomplete="off"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
    <div
      v-if="errors.password"
      class="ui basic label pointing red"
    >
      {{ errors.password }}
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
    const { validatePasswordField, errors } = useFormValidation();
    const validateInput = () => {
      validatePasswordField("password", input.value);
    };
    return { input, errors, validateInput };
  },
};
</script>