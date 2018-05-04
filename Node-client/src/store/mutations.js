import { INITPOINTS, ADDPOINT, GETPOINT, STORETOKEN, INITUSER, INITUSERList,INITPOINTCOMMENT } from './mutation-types'

export default {
  [INITPOINTS](state, points) {
    state.points.push(...points);
  },
  [ADDPOINT](state, point) {
    state.points.push(point);
  },
  [STORETOKEN](state, token) {
    state.user.token = token;
  },
  [INITUSER](state, user) {
    state.user = user;
  },
  [INITUSERList](state, userList) {
    state.userList = userList;
  }
}
