import axios from 'axios';

const login = credentials => {
  return new Promise((resolve, reject) => {
    axios
      .post('/user/login', credentials)
      .then(response => resolve(response.data))
      .catch(err => reject(err.response));
  });
};

const register = credentials => {
  return new Promise((resolve, reject) => {
    axios
      .post('/user/register', credentials)
      .then(response => resolve(response.data))
      .catch(err => reject(err.response));
  });
};

export default {
  login,
  register,
};
