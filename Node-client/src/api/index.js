import axios from 'axios';
// import store from '../store/store';

export const requestLogin = (params) => axios.post('/dologin', params);

export const requestPoints = () => axios.get('/getpoints');

export const subimtPoint = (point) => axios.post('/addpoint', point);

export const requestAuthorInf = params => axios.post('getauthorinf', params);

export const requestRegister = params => axios.post("/doregister", params);

// 登录成功后，axios设置头，如果以后认证失败了，那么需要重新设置头
export const axiosSetAuth = token => {
  axios.defaults.headers.common['Authorization'] = 'bearer ' + token;
}

export const requestUserList = () => axios.post('/getfriendlist');

export const requestPointComment = (params) => axios.post('/getpointcomment', params);

// 为某一个Point添加评论
export const submitPointComment = params => axios.post('/addcomment', params);

export const addLike = params => axios.post('/addlike', params);
