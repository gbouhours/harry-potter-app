<template>
  <div>
    <div>
      <label class="block mb-2 font-bold text-left">Date de sortie du film</label>
      <!-- Bind it to the name input field at the top in the vue template using the v-model directive -->
      <!-- Bind Input Field Data To The User Object with @input="$emit('update:modelValue', $event.target.value)" -->
      <input
        v-model="input"
        type="text"
        class="w-full px-4 py-3 mb-3 rounded-md form-input"
        placeholder="29/06/1964"
        autocomplete="off"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
    <div
      v-if="errors.dateRelease"
      class="text-base font-bold text-red-600"
    >
      {{ errors.dateRelease }}
    </div>
  </div>
</template>
 <script>
import { ref, watch } from "vue";
// Import useFormValidation inside the NameField.vue file.
import useFormValidation from "@/composables/useFormValidation";

export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    // Declaration variable input as null
    let input = ref();
    watch(() => {
      input.value = props.modelValue;
    })
    // Call the useFormValdiation() function inside the setup() function on the right and get the validateComposerField() function and errors variable by destructuring the returned object on the left.
    const { validateDateReleaseField, errors } = useFormValidation();
    const validateInput = () => {
    // call the validateNameField() function inside the validateInput() callback function with the first parameter fieldName…in this case name.
    // The second parameter fieldValue in this case is the value of the name input field.
    validateDateReleaseField("dateRelease", input.value);
    };
    return { input, errors, validateInput };
  },
  };
</script>