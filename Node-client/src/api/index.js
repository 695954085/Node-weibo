import axios from 'axios';

export const requestLogin = (params) => axios.post('/dologin', params);
