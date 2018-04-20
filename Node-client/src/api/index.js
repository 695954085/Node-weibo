import axios from 'axios';

export const requestLogin = (params) => axios.post('/dologin', params);

export const requestPoints = () => axios.get('/getpoints');

export const subimtPoint = (point) => axios.post('/addpoint', point);
