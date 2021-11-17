import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.infermedica.com/v3/',
});
instance.defaults.headers.common = {
    "App-Id": ``,
    "App-Key": ``
}
export default instance;
