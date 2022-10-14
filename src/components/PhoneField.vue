<template>
  <div class="field">
    <div class="ui left icon input big">
      <i class="phone icon" />

      <input
        v-model="input"
        type="text"
        placeholder="Phone"
        autocomplete="off"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
    <div
      v-if="errors.phone"
      class="ui basic label pointing red"
    >
      {{ errors.phone }}
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
    const { validatePhoneField, errors } = useFormValidation();
    const validateInput = () => {
      validatePhoneField("phone", input.value);
    };
    return { input, errors, validateInput };
  },
};
</script>