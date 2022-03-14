import errorsList from "../utils/errors-code.json";
const { errors } = errorsList;

// get Error message from error code
export const getErrorMessage = (code, language = "fr") => {
  const error = errors.find((error) => error.code === code);
  return error ? error.message[language] : errors[0].message[language];
};
