import useValidators from "@/composables/validators";
import { reactive } from "@vue/reactivity";

// Declare errors variable initialized with an empty object using reactive().
const errors = reactive({});

export default function useFormValidation() {
  // Destructure the functions by calling useValidator().
  const { isEmpty, minLength, isEmail, isNum, isDate } = useValidators();
  // Use these functions inside the function.
  const validateNameField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 4);
  };
  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isEmail(fieldName, fieldValue);
  };
  const validatePhoneField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isNum(fieldName, fieldValue);
  };
  const validatePasswordField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 8);
  };
  const validateTitleField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : null;
  };
  const validateDirectorField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : null;
  };
  const validateComposerField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : null;
  };
  const validateDateReleaseField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isDate(fieldName, fieldValue);
  };
  return {
    errors,
    validateNameField,
    validateEmailField,
    validatePhoneField,
    validatePasswordField,
    validateTitleField,
    validateDirectorField,
    validateComposerField,
    validateDateReleaseField,
  };
}
