import axios from 'axios'

const postResult = (result) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/game/result', result)
      .then(response => resolve(response.data))
      .catch(err => reject(err.response));
  });
};

const getResult = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/game/result')
      .then(response => resolve(response.data))
      .catch(err => reject(err.response));
  });
}

export default {
  postResult,
  getResult,
}