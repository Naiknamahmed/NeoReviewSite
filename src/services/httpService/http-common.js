import axios from 'axios';
// import authHeader from '../auth/authHeader';
import { endPoint } from '../../config/config';

let Api;

Api = axios.create({
  baseURL: endPoint,
  headers: {
    'Content-type': 'application/json',
  },
});

export default Api;
