<template>
  <div class="field">
    <div class="ui left icon input big">
      <i class="user icon" />
      <!-- Bind it to the name input field at the top in the vue template using the v-model directive -->
      <!-- Bind Input Field Data To The User Object with @input="$emit('update:modelValue', $event.target.value)" -->
      <input
        v-model="input"
        type="text"
        placeholder="Full Name"
        autocomplete="off"
        @keyup="validateInput"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
    <div
      v-if="errors.name"
      class="ui basic label pointing red"
    >
      {{ errors.name }}
    </div>
  </div>
</template>
 <script>
import { ref } from "vue";
// Import useFormValidation inside the NameField.vue file.
import useFormValidation from "@/composables/useFormValidation";

  export default {
emits: ['update:modelValue'],
  setup() {
    // Declaration variable input as null
    let input = ref();
    // Call the useFormValdiation() function inside the setup() function on the right and get the validateNameField() function and errors variable by destructuring the returned object on the left.
    const { validateNameField, errors } = useFormValidation();
    const validateInput = () => {
    // call the validateNameField() function inside the validateInput() callback function with the first parameter fieldName…in this case name.
    // The second parameter fieldValue in this case is the value of the name input field.
    validateNameField("name", input.value);
    };
    return { input, errors, validateInput };
  },
  };
</script>