import axios from 'axios';
// import store from '../store/store';

export const requestLogin = (params) => axios.post('/dologin', params);

export const requestPoints = () => axios.get('/getpoints');

export const subimtPoint = (point) => axios.post('/addpoint', point);

export const requestAuthorInf = params => axios.get('getauthorinf', params);

export const requestRegister = params => axios.post("/doregister", params);

export const axiosSetAuth = token => {
  axios.defaults.headers.common['Authorization'] = 'bearer ' + token;
}

export const requestUserList = () => axios.post('/getfriendlist');
