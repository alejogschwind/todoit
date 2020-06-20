import _ from "lodash";
import jwt from "jsonwebtoken";

export const getRefreshToken = ({ id, count }) =>
  jwt.sign(
    {
      id,
      count
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

export const getAccessToken = ({ id }) =>
  jwt.sign(
    {
      id
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );

export const validateNewPassword = (password, confirmPassword) => {
  let errors = [];

  if (password !== confirmPassword)
    errors.push("Passwords do not match.");

  if (!RegExp(".{8,32}").test(password))
    errors.push(
      "Password must have at least 8 characters, but no more than 32."
    );

  if (!RegExp("(?=.*[A-Z])").test(password))
    errors.push("Password require at least one uppercase character.");

  if (!RegExp("(?=.*[a-z])").test(password))
    errors.push("Password require at least one lowercase character.");

  if (!RegExp("(.*[0-9].*)").test(password))
    errors.push("Password require at least one number.");

  return {
    errors,
    valid: _.isEmpty(errors)
  }
}

export const validateRegister = (
  // email,
  password,
  confirmPassword,
  ) => {
  let errors = {
    // email: [],
    password: [],
  };
  let valid = false;
  
  // if (!RegExp("^[^@]+@[^@]+\.[^@]+$").test(email))
  //   errors.email.push("Email not valid.");
  
  const {
    passwordErrors,
    vaildPassword
  } = validateNewPassword(password, confirmPassword);

  errors.password = passwordErrors;

  if (
    // _.isEmpty(errors.email) &&
    vaildPassword
  )
    valid = true;

  return {
    errors,
    valid,
  };
};