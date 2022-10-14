import dayjs from "dayjs";

export default function useValidators() {
  // isEmpty function will return an error message if the fieldValue is empty otherwise return an empty string
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? "The " + fieldName + " field is required" : "";
  };
  // minLength function takes a third parameter with any flexible minimum length number to validate the character length of the input data.
  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min
      ? `The ${fieldName} field must be atleast ${min} characters long`
      : "";
  };
  const isEmail = (fieldName, fieldValue) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(fieldValue)
      ? "The input is not a valid " + fieldName + " address"
      : "";
  };
  const isNum = (fieldName, fieldValue) => {
    let isNum = /^\d+$/.test(fieldValue);
    return !isNum
      ? "The " + fieldName + " field only have numbers"
      : "";
  };
  const isDate = (fieldName, fieldValue) => {
    let isDate = dayjs(fieldValue, "DD/MM/YYYY", true).isValid();
    return !isDate
      ? "Le format de la " + fieldName + " est incorrect."
      : "";
  };
  return { isEmpty, minLength, isEmail, isNum, isDate };
}
