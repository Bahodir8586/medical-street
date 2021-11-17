import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.infermedica.com/v3/',
});
instance.defaults.headers.common = {
  'App-Id': process.env.APP_ID,
  'App-Key': process.env.APP_KEY,
};
export default instance;
