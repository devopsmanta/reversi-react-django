import axios from 'axios';
import validator from 'validator';
export const setBaseURL = url => {
  axios.defaults.baseURL = url;
};

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const saveAuthentication = token => {
  localStorage.setItem('jwtToken', token);
  setAuthToken(token);
};

export const clearAuthentication = () => {
  localStorage.removeItem('jwtToken');
  setAuthToken();
};

export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export function validateLoginInput(data) {
  let errors = {};
  let isFull = true;
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isEmail(data.email)) {
    errors.erro = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
    isFull = false;
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 chars';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
    isFull = false;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    isFull,
  };
}

export function validateRegisterInput(data) {
  let errors = {};
  let isFull = true;
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : '';

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 to 30 chars';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
    isFull = false;
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
    isFull = false;
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 chars';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
    isFull = false;
  }

  if (!validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
    errors.password_confirm = 'Password must have 6 chars';
  }

  if (!validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = 'Password and Confirm Password must match';
  }

  if (validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = 'Confirm password is required';
    isFull = false;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    isFull,
  };
}
