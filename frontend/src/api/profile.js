import axios from 'axios';

const profile = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/profile')
      .then(response => resolve(response.data))
      .catch(err => reject(err.response));
  });
};

const modifyProfile = credentials =>
  new Promise((resolve, reject) => {
    axios
      .post('/user/modify', credentials)
      .then(response => resolve(response.data))
      .catch(err => reject(err.response));
  });

export default {
  profile,
  modifyProfile,
};
