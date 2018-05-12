import { requestPoints, subimtPoint, requestUserList, requestPointComment, addLike } from '../api/index'
import { INITPOINTS, ADDPOINT, INITUSERList, INITPOINTCOMMENT, ADDLIKE } from './mutation-types'

export default {
  async getPointsFromServer({ commit, state }) {
    let result = await requestPoints(state.user.token);
    // token无法认证
    if (result.status == 401) {
      return false;
    } else if (result.status == 200) {
      commit(INITPOINTS, result.data);
      return true;
    }
  },
  async submitPointToServer({ commit }, point) {
    let result = await subimtPoint(point);
    if (result.status == 401) {
      return fasle;
    } else if (result.status == 200) {
      commit(ADDPOINT, result.data);
      return true;
    }
  },
  async requestUserListFromServer({ commit, state }) {
    let result = await requestUserList();
    if (result.status == 200)
      commit(INITUSERList, result.data);
  },
  async requestCurrentPointComment({ commit }, _id) {
    let result = await requestPointComment();
    if (result.status == 200) {
      commit(INITPOINTCOMMENT, result.data);
      return true;
    } else {
      return false;
    }
  },
  async requestAddLike({ commit }, params) {
    let result = await addLike(params);
    if (result.status == 200) {
      commit(ADDLIKE, params);
      return true;
    } else {
      return fasle;
    }
  }
}
