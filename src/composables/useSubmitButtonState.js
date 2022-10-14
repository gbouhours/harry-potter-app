import { computed } from "vue";
// The useSubmitButtonState() takes two parameters: movie object errors object
export default function useSubmitButtonState(object, errors) {
  // Create a computed property called isSignupButtonDisabled
  const isButtonDisabled = computed(() => {
    let disabled = true;
    // It loops through the movie object and checks if any of its properties are empty or if any of the same properties in the errors object have error messages.
    for (let prop in object) {
      if (!object[prop] || errors[prop]) {
        disabled = true;
        break;
      }
      disabled = false;
    }
    return disabled;
  });

  return { isButtonDisabled };
}
