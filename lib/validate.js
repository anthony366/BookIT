export default function login_validate(values) {
  const errors = {};

  //validation for login email
  if (!values.email) {
    errors.email = "Email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  //validation for login password
  if (!values.password) {
    errors.password = " Password required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Password must be between 6 to 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  }

  return errors;
}

export function register_validate(values) {
  const errors = {};

  //validation for register username
  if (!values.name) {
    errors.name = "name required";
  } else if (values.name.length < 2) {
    errors.name = "name must be 2 characters or more";
  } else if (values.name.includes(" ")) {
    errors.name = "Invalid name";
  }

  //validation for register email
  if (!values.email) {
    errors.email = "Email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  //validation for register password
  if (!values.password) {
    errors.password = " Password required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Password must be between 6 to 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  }

  return errors;
}
